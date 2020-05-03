<?php

namespace Extender;

use Curl\Curl;
use Exception;
use Filemanager\file;

class request extends Curl
{
  private $result_request = [];
  /**
   * request instances
   *
   * @var request
   */
  private static $_instance = null;
  public function __construct($base = null)
  {
    parent::__construct($base);
  }

  public function disableSSL()
  {
    $this->setOpt(CURLOPT_SSL_VERIFYPEER, false);
    $this->setOpt(CURLOPT_SSL_VERIFYHOST, false);

    return $this;
  }

  public static function getInstance($base = null)
  {
    if (self::$_instance === null) {
      self::$_instance = new self($base);
    }

    return self::$_instance;
  }

  public static function static_request($opt)
  {
    return self::getInstance()->request($opt);
    //return self::request($opt);
  }

  /**
   * cURL shooter request.
   *
   * @param array $opt
   *
   * @return array
   */
  public function request($opt)
  {
    if (!isset($opt['url'])) {
      throw new Exception('URL needed', 1);
    }
    $msisdn = isset($_SESSION['msisdn']) ? $_SESSION['msisdn'] : 'default';
    //$verbose = __DIR__ . '/otp/http/' . $msisdn . '.' . substr(clean_string(urldecode(urldecode($opt['url']))), 0, 50) . '.txt';
    //file_put_contents($verbose, '');
    //$curl_log = fopen($verbose, 'a');
    $ch = curl_init();
    $result = ['request' => [], 'response' => []];
    if (isset($opt['headers']) && is_array($opt['headers'])) {
      $headers = $opt['headers'];
      if (isset($opt['headers_trim'])) {
        /*$headers = array_map(function ($key) {
        return preg_replace('/\r$/', '', $key);
        }, $headers);*/
        $headers = array_map('trim', $headers);
      }
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      $result['request']['headers'] = $headers;
    }
    curl_setopt($ch, CURLOPT_URL, trim($opt['url']));
    $result['url'] = $opt['url'];
    if (isset($opt['post']) && $opt['post']) {
      curl_setopt($ch, CURLOPT_POST, 1);
    }
    if (isset($opt['postdata'])) {
      if (is_array($opt['postdata'])) {
        $opt['postdata'] = http_build_query($opt['postdata'], '', '&');
      }
      curl_setopt($ch, CURLOPT_POSTFIELDS, $opt['postdata']);
      $result['request']['postdata'] = $opt['postdata'];
    }
    //evj($_SESSION, isset($opt['cookie']) && true === $opt['cookie'] && isset($_SESSION['cookie']));
    if (isset($opt['cookie']) && true === $opt['cookie'] && isset($_SESSION['cookie'])) {
      $cookie = isset($_SESSION['cookie']) ? $_SESSION['cookie'] : null;
      if (is_string($opt['cookie']) && !empty($opt['cookie'])) {
        $cookie = $opt['cookie'];
      }

      if ($cookie = file::file($cookie, '')) {
        if (!file_exists($cookie)) {
          throw new Exception("$cookie not exists", 1);

          //file_put_contents($cookie, '');
        }
        curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($cookie));
        curl_setopt($ch, CURLOPT_COOKIEFILE, realpath($cookie));
        $result['request']['cookie-file'] = realpath($cookie);
        $result['response']['cookie-file'] = realpath($cookie);
      }
    }
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    //curl_setopt($ch, CURLOPT_VERBOSE, true);
    //curl_setopt($ch, CURLOPT_STDERR, $curl_log);
    curl_setopt($ch, CURLINFO_HEADER_OUT, true);
    //curl_setopt($ch, CURLOPT_ENCODING, '');
    if (isset($opt['setopt']) && is_array($opt['setopt']) && !empty($opt['setopt'])) {
      foreach ($opt['setopt'] as $key => $value) {
        curl_setopt($ch, $key, $value);
      }
    }

    if (isset($opt['proxy'])) {
      curl_setopt($ch, CURLOPT_PROXY, $opt['proxy']);
      curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, 1);
      if (isset($opt['proxy_type'])) {
        switch ($opt['proxy_type']) {
          case 'socks5':
            curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
            break;
          case 'http':
            curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_HTTP);
            break;
          case 'https':
            curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_HTTPS);
            break;
          case 'socks4':
            curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS4);
            break;
        }
      }
    }

    $data = curl_exec($ch);
    $result['curl_exec'] = $data;

    file_put_contents(ROOT . '/otp/http/' . $msisdn, $data);
    //rewind($curl_log);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headerSent = curl_getinfo($ch, CURLINFO_HEADER_OUT);
    $headerSent = explode("\n", $headerSent);
    $headerSent = array_map(function ($v) {
      return preg_replace("/\r$/s", '', $v);
    }, $headerSent);
    $result['request']['raw'] = $headerSent;
    $header = substr($data, 0, $header_size);
    $body = substr($data, $header_size);
    if (is_string($body)) {
      $body = json_decode($body, true);
    }

    $header = explode("\n", $header);
    $header = array_map(function ($v) {
      return preg_replace("/\r$/s", '', $v);
    }, $header);

    $result['response']['headers'] = $header;
    $result['response']['body'] = $body;
    $result['options'] = $opt;
    if (isset($opt['verbose'])) {
      $_SESSION['verbose'][$opt['url']] = $result;
    }
    curl_close($ch);

    return $result;
  }

  public function set_header_array($headers, $trim = false)
  {
    if (!is_array($headers)) {
      throw new \Exception('Header must array formatted', 1);
    }
    if ($trim) {
      $headers = array_map('trim', $headers);
    }
    $this->setOpt(CURLOPT_HTTPHEADER, $headers);
    $this->result_request['request']['headers'] = $headers;

    return $this;
  }

  public function set_cookie_file($cookie = null)
  {
    if (!$cookie) {
      $cookie = __DIR__ . '/cookie/default.txt';
      if (isset($_SERVER['HTTP_USER_AGENT'])) {
        $cookie = __DIR__ . '/cookie/' . $_SERVER['HTTP_USER_AGENT'] . '.txt';
      }
    }
    if ($cookie) {
      \Filemanager\file::file($cookie, '# Netscape HTTP Cookie File
      # https://curl.haxx.se/docs/http-cookies.html
      # This file was generated by libcurl! Edit at your own risk.');
    }
    $this->setCookieFile($cookie);
    $this->setCookieJar($cookie);
    $this->result_request['cookie'] = $cookie;

    return $this;
  }

  /**
   * Check array is assoc
   * * var_dump(isAssoc(['a', 'b', 'c'])); // false
   * * var_dump(isAssoc(["0" => 'a', "1" => 'b', "2" => 'c'])); // false
   * * var_dump(isAssoc(["1" => 'a', "0" => 'b', "2" => 'c'])); // true
   * * var_dump(isAssoc(["a" => 'a', "b" => 'b', "c" => 'c'])); // true.
   *
   * @param array $arr
   *
   * @return bool
   */
  public function isAssoc(array $arr)
  {
    if ([] === $arr) {
      return false;
    }

    return array_keys($arr) !== range(0, count($arr) - 1);
  }

  /**
   * Check array has some string key.
   *
   * @param array $array
   *
   * @return bool
   */
  public function has_string_keys(array $array)
  {
    return count(array_filter(array_keys($array), 'is_string')) > 0;
  }
}
