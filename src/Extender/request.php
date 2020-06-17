<?php

namespace Extender;

use Curl\Curl;
use MVC\Exception;
use Filemanager\file;
use JSON\json;
use MVC\helper;

class request extends Curl
{
  private $result_request = [];
  /**
   * request instances.
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

  public function set_url(string $url)
  {
    $this->setUrl($url);

    return $this;
  }

  public function set_method(string $method)
  {
    $this->setOpt(CURLOPT_CUSTOMREQUEST, strtoupper($method));

    return $this;
  }

  public static function getInstance($base = null)
  {
    if (null === self::$_instance) {
      self::$_instance = new self($base);
    }

    return self::$_instance;
  }

  public static function static_request($opt)
  {
    return self::getInstance()->request($opt);
    //return self::request($opt);
  }

  private $require_content_length = false;
  private $dumpNow = false;

  public function isDUMPNow()
  {
    return true === $this->dumpNow;
  }

  public function DUMPNow(...$what)
  {
    if ($this->isDUMPNow()) {
      $this->exitJSON($what);
    }
  }

  public function exitJSON(...$what)
  {
    foreach ($what as $these) {
      json::json($these);
      echo "\n\n";
    }
    exit;
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
    $msisdn = isset($_SESSION['telkomsel']['msisdn']) ? $_SESSION['telkomsel']['msisdn'] : 'default';
    //$verbose = __DIR__ . '/otp/http/' . $msisdn . '.' . substr(clean_string(urldecode(urldecode($opt['url']))), 0, 50) . '.txt';
    //file_put_contents($verbose, '');
    //$curl_log = fopen($verbose, 'a');
    $ch = curl_init();

    $result = ['request' => [], 'response' => []];
    if (isset($opt['postdata'])) {
      if (is_array($opt['postdata'])) {
        $opt['postdata'] = http_build_query($opt['postdata'], '', '&');
      }
      curl_setopt($ch, CURLOPT_POSTFIELDS, $opt['postdata']);
      $result['request']['postdata'] = $opt['postdata'];
      $this->require_content_length = true;
    }
    if (isset($opt['headers']) && is_array($opt['headers'])) {
      $headers = $opt['headers'];
      if (isset($opt['headers_trim'])) {
        $headers = array_map('trim', $headers);
        $headers = array_filter($headers);
        $headers = array_values($headers);
      }
      for ($i = 0; $i < count($headers); ++$i) {
        $header = array_map('trim', explode(':', $headers[$i]));
        $small_header = strtolower($header[0]);
        if ('content-length' == $small_header && true === $this->require_content_length) {
          $headers[$i] = $header[0] . ': ' . strlen($opt['postdata']);
        }
        if ('user-agent' == $small_header) {
          curl_setopt($ch, CURLOPT_USERAGENT, $header[1]);
        }
      }
      //$this->DUMPNow($headers, $opt);

      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      $result['request']['headers'] = $headers;
    }
    curl_setopt($ch, CURLOPT_URL, trim($opt['url']));
    $result['url'] = $opt['url'];
    if (isset($opt['post']) && $opt['post']) {
      curl_setopt($ch, CURLOPT_POST, 1);
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
    if (!is_string($data) && $data) {
      $data = json::assoc($data);
    }
    $result['curl_exec'] = $data;
    // save to log
    $parse_url = helper::parse_url2($opt['url']);
    $filesave = "{$parse_url['host']}/{$parse_url['path']}";
    $filepath = helper::platformSlashes(__DIR__ . "/log/curl_exec/$msisdn/$filesave");
    if (!is_dir(dirname($filepath))) {
      mkdir(dirname($filepath), 0777, true);
    }
    file::file($filepath, $data, true);
    //rewind($curl_log);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headerSent = curl_getinfo($ch, CURLINFO_HEADER_OUT);
    $headerSent = explode("\n", $headerSent);
    $headerSent = array_map(function ($v) {
      return preg_replace("/\r$/m", '', $v);
    }, $headerSent);
    $result['request']['raw'] = $headerSent;
    $header = substr($data, 0, $header_size);
    $body = substr($data, $header_size);
    if (json::is_json($body)) {
      $body = json_decode($body, true);
    }

    $header = explode("\n", $header);
    $header = array_map(function ($v) {
      return preg_replace("/\r$/m", '', $v);
    }, $header);

    $result['response']['headers'] = $header;
    foreach ($header as $h) {
      $ex = explode(':', $h);
      if (isset($ex[0]) && isset($ex[1])) {
        $hkey = $ex[0];
        //var_dump($hkey, strpos(strtolower(trim($hkey)), 'oauth'));
        if (false !== strpos(strtolower($hkey), 'oauth')) {
          $_SESSION['im3'][$opt['url']]['oauth'] = trim($ex[1]);
          $_SESSION['im3']['oauth'] = trim($ex[1]);
        }
      }
    }
    if (is_iterable($body)) {
      foreach ($body as $key => $value) {
        $_SESSION['im3'][$key] = $value;
      }
      if (isset($body['data']['tokenid'])) {
        $_SESSION['im3']['tokenid'] = $body['data']['tokenid'];
      }
    }
    $result['response']['body'] = $body;
    $result['options'] = $opt;
    if (isset($opt['verbose'])) {
      $_SESSION['verbose'][$opt['url']] = $result;
    }
    //exit(gettype($ch));
    curl_close($ch);

    return $result;
  }

  public static function getCurlOpt($ch, int $what)
  {
    return curl_getinfo($ch, $what);
  }

  public function set_header_array($headers, $trim = false)
  {
    if (!is_array($headers)) {
      throw new \MVC\Exception('Header must array formatted', 1);
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
      \Filemanager\file::file($cookie, '#cookie');
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

if (!function_exists('is_iterable')) {
  function is_iterable($var)
  {
    return is_array($var) || $var instanceof \Traversable;
  }
}
