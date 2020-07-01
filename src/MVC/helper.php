<?php

namespace MVC;

setlocale(LC_ALL, 'en_US.UTF-8');
if (!defined('ROOT')) {
  define('ROOT', realpath(__DIR__ . '/../../'));
}

class helper
{
  public static $key = 'AUX';
  public static $expire = 10;
  public static $router;
  /**
   * Class architecture database.
   *
   * @var array
   */
  public static $arch = [];

  public function __construct()
  {
    if (!isset($_SERVER['HTTP_USER_AGENT']) || false !== stripos(strtolower($_SERVER['HTTP_USER_AGENT']), 'curl')) {
      http_response_code(403);
      if (ob_get_level()) {
        ob_end_clean();
      }
      include __DIR__ . '/themes/robot/index.php';
      exit;
    }
    if (isset($_REQUEST['cache'])) {
      self::$key .= $_REQUEST['cache'];
    }
    if (!self::$router) {
      self::$router = new router();
    }
  }

  /**
   * ```php
   * if (env('dev')) return boolean; //is development environtment or not
   * ```
   * Get environtment framework.
   *
   * @param string $for dev or prod
   *
   * @return string|bool
   */
  public static function env($for)
  {
    if (!self::$router) {
      self::$router = new router();
    }

    if ('dev' == $for || 'development' == $for) {
      return 'development' == self::$router->get_env();
    } elseif ('prod' == $for || 'production' == $for) {
      return 'production' == self::$router->get_env();
    } else {
      return self::$router->get_env();
    }
  }

  public static function config()
  {
    return \Filemanager\file::get(ROOT . '/config.json', true);
  }

  /**
   * Get Header Request Accept.
   *
   * @return void
   */
  public static function HeaderAccept()
  {
    if (isset($_SERVER['HTTP_ACCEPT']) && $accept = $_SERVER['HTTP_ACCEPT']) {
      switch ($accept) {
        case '*/*':
          return 'any';
          break;
        case 'application/javascript':
          return 'javascript';
          break;
        case 'application/json':
          return 'json';
          break;
          /*case strpos($accept, 'application/json') >= 0:
          return 'has_json';
          break;
        case strpos($accept, 'application/javascript') >= 0:
          return 'has_javascript';
          break;*/
        default:
          return $accept;
          break;
      }
    }
  }

  /**
   * Clean output buffers.
   *
   * @return void
   */
  public static function cleanBuffer()
  {
    if (ob_get_level()) {
      ob_end_clean();
      ob_start();
    }
  }

  public static function require_method(string $method)
  {
    $method = strtoupper($method);
    if ($method != $_SERVER['REQUEST_METHOD']) {
      throw new Exception("Request only accept $method request", 1);
    }
  }

  /**
   * is url ?
   *
   * @param string $url
   *
   * @return bool
   */
  public static function is_url($url)
  {
    return filter_var($url, FILTER_VALIDATE_URL);
  }

  /**
   * transfor url to host (domain only).
   *
   * @param mixed $fallback if url is not valid return $fallback value
   *
   * @return string|null
   */
  public static function url2host(string $url, $fallback = null)
  {
    if (
      isset(self::$arch[__FUNCTION__][md5($url)]) &&
      !empty(self::$arch[__FUNCTION__][md5($url)])
    ) {
      return self::$arch[__FUNCTION__][md5($url)];
    }
    if (self::is_url($url)) {
      $parse = self::parse_url2($url);
      if (isset($parse['host'])) {
        self::$arch[__FUNCTION__][md5($url)] = $parse['host'];

        return $parse['host'];
      }
    }

    return $fallback;
  }

  public static function include_asset($fn, $fn2 = null, $callback = null)
  {
    if (file_exists($fn)) {
      include $fn;
    } elseif ($fn2 && file_exists($fn2)) {
      include $fn2;
    } elseif (is_callable($callback)) {
      call_user_func($callback, $fn);
    }
  }

  public static function asset_find(array $fn = [])
  {
    $source = null;
    foreach ($fn as $src) {
      if ($src && !empty($src)) {
        if (file_exists($src) && is_file($src) && $src = realpath($src)) {
          $source = $src;
          break;
        }
      }
    }

    return $source;
  }

  /**
   * Sass Compiler.
   *
   * @requires shell_exec
   */
  public static function sass(string $path)
  {
    \Cookie\helper::one('sass' . self::$key, 'compiler', 1, function () use ($path) {
      if (is_file($path)) {
        if (self::is_windows()) {
          $path = self::fixSlash($path);
        }
        $exec = shell_exec('sass ' . $path);
        if (!empty($exec)) {
          //echo $exec;
          $save = preg_replace('/\.scss/s', '.css', $path);
          \Filemanager\file::file($save, $exec, true);
        }
      }
    });
  }

  /**
   * GET PHP ERROR LOG.
   *
   * @return string|null
   */
  public static function php_error_log(bool $onlypath = false)
  {
    $log = __DIR__ . '/tmp/php-error.log';
    if ($log = realpath($log)) {
      if ('DELETE' == $_SERVER['REQUEST_METHOD']) {
        if ('php' == self::is_header('Log')) {
          unlink($log);
        }
      }
      if (!$onlypath) {
        return read_file($log);
      } else {
        return $log;
      }
    }
  }

  /**
   * Check if header request has $any.
   *
   * @return string|null
   */
  public static function is_header(string $any)
  {
    $allHeaders = getallheaders();

    return array_key_exists($any, $allHeaders) ? $allHeaders[$any] : null;
  }

  public static function babel(string $path)
  {
    \Cookie\helper::one('babel' . self::$key, 'compiler', 1, function () use ($path) {
      if (is_file($path)) {
        if (self::is_windows()) {
          $path = self::fixSlash($path);
        }
        $exec = shell_exec('npx babel ' . $path);
        $save = \Filemanager\file::tmp() . '/js/babel/' . basename($path);
        if (!empty($exec)) {
          \Filemanager\file::file($save, $exec, true);
          $min = shell_exec('terser ' . self::fixSlash($save));
          /*if (!empty($min)) {
          echo $min;
          } else {
          echo $save;
          }*/
          if (!empty($min)) {
            $minjs = preg_replace('/\.babel\.js/s', '.min.js', $path);
            \Filemanager\file::file($minjs, $min, true);
          } else {
            $js = preg_replace('/\.babel\.js/s', '.js', $path);
            \Filemanager\file::file($js, $exec, true);
          }
        }
      }
    });
  }

  /**
   * Clean special characters from string.
   *
   * @param string $replace
   *
   * @return string
   */
  public static function clean_special_characters(string $string, $replace = '')
  {
    //$string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
    $string = self::clean_multiple_hypens($string);

    return preg_replace('/[^A-Za-z0-9\-]/', $replace, $string); // Removes special chars.
  }

  public static function clean_multiple_hypens($string)
  {
    $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
    $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.

    return preg_replace('/-+/', '-', $string); // Replaces multiple hyphens with single one.
  }

  public static function clean_whitespace(string $str)
  {
    return preg_replace('/\s{1,99}/s', '', $str);
  }

  public static function webkit_asset(string $path, string $alternative = null)
  {
    $path = realpath($path);
    if (!$path && $alternative) {
      $path = realpath($alternative);
    }
    if ($path) {
      $root = realpath(ROOT);
      $pathNoRoot = helper::fixSlash(str_replace($root, '', $path));

      return self::base_url("/load-asset?src=$pathNoRoot");
    }
  }

  public static function load_asset($path)
  {
    $root = realpath(ROOT);
    if ($path = realpath($root . $path)) {
      $ext = pathinfo($path, PATHINFO_EXTENSION);
      //var_dump($path, $ext);
      if (self::headerExt($ext)) {
        http_response_code(200);
        include $path;
      }
    }
  }

  public static function headerExt($ext)
  {
    $mimes = include __DIR__ . '/mimes.php';
    if (isset($mimes[$ext][0])) {
      if (!headers_sent()) {
        header("Content-Type: {$mimes[$ext][0]}");

        return true;
      }
    }

    return false;
  }

  /**
   * Parse URL deeper.
   *
   * @param string $url
   * @param bool   $encoded
   *
   * @return parse_url
   */
  public static function parse_url2($url, $encoded = false)
  {
    if ($encoded) {
      $url = urldecode($url);
    }
    $url = html_entity_decode($url);
    $parts = parse_url($url);
    if (!isset($parts['path'])) {
      $parts['path'] = '';
    }
    if (isset($parts['query'])) {
      parse_str($parts['query'], $query);
      $parts['original_query'] = $parts['query'];
      $parts['query'] = $query;
    }

    return array_merge($parts);
  }

  /**
   * Fix path string `default OS` separate slash and replaced by `/`
   * * WIN (\\)
   * * LINUX (/).
   *
   * @return string
   */
  public static function fixSlash(string $path, int $maxlength = 10)
  {
    $re = '/\\' . DIRECTORY_SEPARATOR . '{1,' . $maxlength . '}/s';
    //var_dump($re);
    return preg_replace($re, '/', $path);
  }

  /**
   * Get path base URL
   * * example (/cookie/file.html) -> (https://httpbin.org/cookie/file.html).
   *
   * @param string $path     pathname from base url
   * @param bool   $forceSSL force https protocol returned
   *                         * true or false or null
   *
   * @return string protocol://origin/pathname
   */
  public static function base_url(string $path, bool $forceSSL = false)
  {
    $protocol = isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http';
    if ($forceSSL) {
      $protocol = 'https';
    }

    return $protocol . "://{$_SERVER['HTTP_HOST']}{$path}";
  }

  /**
   * Get current URL.
   *
   * @param bool $forceSSL force https protocol returned
   *                       * true or false or null
   *
   * @return string protocol://origin/pathname
   */
  public static function geturl(bool $forceSSL = false)
  {
    $protocol = isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http';
    if ($forceSSL) {
      $protocol = 'https';
    }

    return $protocol . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
  }

  private static $origin = null;

  public static function getOrigin()
  {
    if (!self::$origin) {
      $protocol = isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http';
      self::$origin = $protocol . "://$_SERVER[HTTP_HOST]";
    }

    return self::$origin;
  }

  private static $canonical = [];
  /**
   * get canonical url
   *
   * @param string $url null for current page
   * @param boolean $whos include host or not (http://domain)
   * @return void
   */
  public static function get_canonical(string $url = null, bool $whos = true)
  {
    if (null === $url) {
      $url = self::geturl();
    }
    if (isset(self::$canonical[$url])) {
      return self::$canonical[$url];
    } else {
      $url_parts = parse_url($url);
      if ($whos) {
        self::$canonical[$url] = $url_parts['scheme'] . '://' . $url_parts['host'] . (isset($url_parts['path']) ? $url_parts['path'] : '');
      } else {
        self::$canonical[$url] = (isset($url_parts['path']) ? $url_parts['path'] : '');
      }
    }

    return self::$canonical[$url];
  }

  /**
   * Get `request uri` without parameter.
   *
   * @param string $url
   *
   * @return string
   */
  public static function get_clean_uri(string $url = null)
  {
    if (null === $url) {
      $url = self::geturl();
    }

    return self::parse_url2($url)['path'];
  }

  /**
   * Check if current is localhost.
   *
   * @param string $regex new regex
   *
   * @return bool
   */
  public static function isLocal(string $regex = '/\.io$/s')
  {
    $match = preg_match('/127\.0\.0\.0\.1|localhost|^192\.168/s', $_SERVER['HTTP_HOST']) ? true : false;
    if ($regex) {
      $match = preg_match($regex, $_SERVER['HTTP_HOST']) ? true : false;
    }

    return $match;
  }

  /**
   * Set cookie helper.
   *
   * @param mixed     $value
   * @param int|float $day
   * @param string    $path
   * @param string    $domain
   * @param bool      $secure
   * @param bool      $httponly
   */
  public static function setcookie(string $name, $value = true, $day, $path = '/', $domain = '', $secure = false, $httponly = false)
  {
    settype($day, 'integer');
    if (empty($domain)) {
      $domain = $_SERVER['HTTP_HOST'];
    }
    if (empty($path)) {
      $path = '/';
    }

    return setcookie($name, $value, time() + 60 * 60 * 24 * $day, $path, $domain, $secure, $httponly);
  }

  /**
   * Get Cookie By Name.
   */
  public static function getcookie(string $name)
  {
    if (isset($_COOKIE[$name])) {
      return $_COOKIE[$name];
    }

    return null;
  }

  public static function delcookie(string $name)
  {
    if (isset($_COOKIE[$name])) {
      unset($_COOKIE[$name]);
      setcookie($name, null, -1, '/');

      return true;
    } else {
      return false;
    }
  }

  /**
   * Get request data
   * * $_GET[$name]
   * * $_REQUEST[$name]
   * * $_POST[$name].
   *
   * @param string $type request method
   *                     * get = only accept get
   *                     * post = only accept post
   *                     * any = accept all request
   * @param mixed  $name What data requests will you take?
   *
   * @return string|null
   */
  public static function request_data(string $type = 'get', $name)
  {
    $method = $_SERVER['REQUEST_METHOD'];
    $allowed = $method == strtoupper($type) || 'any' == $type;
    //var_dump($allowed);
    if ($allowed) {
      if (isset($_REQUEST[$name])) {
        return $_REQUEST[$name];
      }
    }
  }

  /**
   * Detect current OS is Windows.
   *
   * @return bool
   */
  public static function is_windows()
  {
    return 'WIN' === strtoupper(substr(PHP_OS, 0, 3));
  }

  public static function platformSlashes($path)
  {
    $path = str_replace('//', '/', $path);

    return str_replace('/', DIRECTORY_SEPARATOR, $path);
  }

  /**
   * Cors domain verify, detect AJAX, and validate AJAX CORS.
   *
   * @param bool $print_server Debug mode
   *
   * @todo only allow CORS request
   */
  public static function cors($print_server = false)
  {
    $final = true;
    $xrequested = isset($_SERVER['HTTP_X_REQUESTED_WITH']) ? $_SERVER['HTTP_X_REQUESTED_WITH'] : false;

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : false;

    if (isset($_SERVER['HTTP_ACCEPT']) && preg_match('/^application\/json/s', $_SERVER['HTTP_ACCEPT'])) {
      header('Content-type: application/json; charset=utf-8');
    }
    header('Access-Control-Allow-Origin: *'); //allow all AJAX REQUEST

    if (false !== $xrequested) {
      if ('xmlhttprequest' != strtolower($xrequested)) {
        $_SERVER['PHP_LINE'] = __LINE__;

        if ($print_server) {
          return $_SERVER;
        } else {
          return false;
        }
      } else {
        if (isset($_SERVER['HTTP_SEC_FETCH_SITE'], $_SERVER['HTTP_SEC_FETCH_MODE'], $_SERVER['HTTP_REFERER'], $_SERVER['HTTP_ORIGIN'], $_SERVER['HTTP_USER_AGENT'])) {
          $parseRef = parse_url($_SERVER['HTTP_REFERER']);
          $parseOri = parse_url($_SERVER['HTTP_ORIGIN']);
          if (!isset($parseOri['host']) || !isset($parseRef['host'])) {
            $_SERVER['PHP_LINE'] = __LINE__;

            if ($print_server) {
              return $_SERVER;
            } else {
              return false;
            }
          }
          if ($parseOri['host'] != $parseRef['host']) {
            $_SERVER['PHP_LINE'] = __LINE__;

            if ($print_server) {
              return $_SERVER;
            } else {
              return false;
            }
          }
          if ('same-origin' == $_SERVER['HTTP_SEC_FETCH_SITE'] && 'cors' == $_SERVER['HTTP_SEC_FETCH_MODE']) {
            return $parseOri['host'] == $parseRef['host'];
          } else {
            $_SERVER['PHP_LINE'] = __LINE__;
            if ($print_server) {
              return $_SERVER;
            } else {
              return false;
            }
          }
        }
      }
    } else {
      $final = false;
      $_SERVER['PHP_LINE'] = __LINE__;
    }

    if ($origin) {
      header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
      header('Access-Control-Expose-Headers: date,content-type,transfer-encoding,connection,access-control-allow-origin,server,x-xss-protection,x-content-type-options,x-request-id,content-encoding,x-final-url');
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
      if (isset($_SERVER['HTTP_REFERER'])) {
        $parseRef = parse_url($_SERVER['HTTP_REFERER']);
        $parseOri = parse_url($_SERVER['HTTP_ORIGIN']);
        if (!isset($parseOri['host']) || !isset($parseRef['host'])) {
          $_SERVER['PHP_LINE'] = __LINE__;
          if ($print_server) {
            return $_SERVER;
          } else {
            return false;
          }
        }
        if ($parseOri['host'] != $parseRef['host']) {
          $_SERVER['PHP_LINE'] = __LINE__;
          if ($print_server) {
            return $_SERVER;
          } else {
            return false;
          }
        }
      } else {
        $_SERVER['PHP_LINE'] = __LINE__;
        if ($print_server) {
          return $_SERVER;
        } else {
          return false;
        }
      }
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
      // may also be using PUT, PATCH, HEAD etc
      header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
      header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    } else {
      header('Access-Control-Allow-Headers: X-Requested-With');
    }

    if (!isset($_SERVER['HTTP_ACCEPT'])) {
      $final = false;
      $_SERVER['PHP_LINE'] = __LINE__;
    }
    /*
     * AJAX request absolutely send http-origin and x-requested-with
     */
    if (!isset($_SERVER['HTTP_ORIGIN']) && !$xrequested) {
      $_SERVER['PHP_LINE'] = __LINE__;
      $final = false;
    }
    if (!isset($_SERVER['HTTP_REFERER'])) {
      $_SERVER['PHP_LINE'] = __LINE__;
      $final = false;
    }
    if (!isset($_SERVER['HTTP_ACCEPT_ENCODING'])) {
      $_SERVER['PHP_LINE'] = __LINE__;
      $final = false;
    }

    /*
     * disallow if request content-type is HTML
     */
    if (isset($_SERVER['HTTP_CONTENT_TYPE']) && !preg_match('/^text\/html/s', $_SERVER['HTTP_CONTENT_TYPE'])) {
      $_SERVER['PHP_LINE'] = __LINE__;
      $final = false;
    }
    if (!isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
      $_SERVER['PHP_LINE'] = __LINE__;
      $final = false;
    }
    if (!isset($_SERVER['HTTP_USER_AGENT'])) {
      $_SERVER['PHP_LINE'] = __LINE__;
      $final = false;
    }
    if (!self::isLocal()) {
      $_SERVER['PHP_LINE'] = __LINE__;
      $final = $final && isset($_SERVER['UNIQUE_ID']);
    }

    //var_dump($final);
    //var_dump(isset($_SERVER['UNIQUE_ID']));
    if (!$final && $print_server) {
      //$_SERVER['PHP_LINE'] = __LINE__;
      //var_dump($_SERVER['PHP_LINE'], $final);
      ksort($_SERVER);

      return $_SERVER;
    }
    //var_dump($_SERVER['PHP_LINE']);
    if ($final) {
      return true;
    }

    return false;
  }

  /**
   * Check if a given ip is in a network.
   *
   * @see https://gist.github.com/ryanwinchester/578c5b50647df3541794
   *
   * @param string $ip    IP to check in IPV4 format eg. 127.0.0.1
   * @param string $range IP/CIDR netmask eg. 127.0.0.0/24, also 127.0.0.1 is accepted and /32 assumed
   *
   * @return bool true if the ip is in this range / false if not
   */
  public static function ip_in_range(string $ip, $range)
  {
    if (false == strpos($range, '/')) {
      $range .= '/32';
    }
    if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
      return false;
    }

    // $range is in IP/CIDR format eg 127.0.0.1/24
    list($range, $netmask) = explode('/', trim($range), 2);
    //var_dump($netmask);

    $ip_decimal = ip2long($ip);
    $range_decimal = ip2long($range);
    $wildcard_decimal = pow(2, (32 - $netmask)) - 1;
    $netmask_decimal = ~$wildcard_decimal;

    return ($ip_decimal & $netmask_decimal) == ($range_decimal & $netmask_decimal);
  }

  public static function ip_in_multirange($ip, array $ranges)
  {
    $in_range = false;
    foreach ($ranges as $range) {
      if (self::ip_in_range($ip, $range)) {
        $in_range = true;
        break;
      }
    }

    return $in_range;
  }

  /**
   * Check if request is google.
   *
   * @return bool
   */
  public static function is_google()
  {
    $file = file(__DIR__ . '/conf/google_ips.txt', FILE_SKIP_EMPTY_LINES);
    $ip = self::getRequestIP();
    $result = false;
    foreach ($file as $range) {
      if (self::ip_in_range($ip, $range)) {
        $result = true;
        break;
      }
    }

    return $result;
  }

  public static function get_client_ip()
  {
    $ipaddress = null;
    if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
      $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];
    }
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
      $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
      $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
      $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
      $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
      $ipaddress = $_SERVER['REMOTE_ADDR'];
    }

    return $ipaddress;
  }

  public static function _cloudflare_CheckIP($ip)
  {
    $cf_ips = [
      '199.27.128.0/21',
      '173.245.48.0/20',
      '103.21.244.0/22',
      '103.22.200.0/22',
      '103.31.4.0/22',
      '141.101.64.0/18',
      '108.162.192.0/18',
      '190.93.240.0/20',
      '188.114.96.0/20',
      '197.234.240.0/22',
      '198.41.128.0/17',
      '162.158.0.0/15',
      '104.16.0.0/12',
    ];
    $is_cf_ip = false;
    foreach ($cf_ips as $cf_ip) {
      if (self::ip_in_range($ip, $cf_ip)) {
        $is_cf_ip = true;
        break;
      }
    }

    return $is_cf_ip;
  }

  public static function _cloudflare_Requests_Check()
  {
    $flag = true;

    if (!isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
      $flag = false;
    }
    if (!isset($_SERVER['HTTP_CF_IPCOUNTRY'])) {
      $flag = false;
    }
    if (!isset($_SERVER['HTTP_CF_RAY'])) {
      $flag = false;
    }
    if (!isset($_SERVER['HTTP_CF_VISITOR'])) {
      $flag = false;
    }

    return $flag;
  }

  public static function isCloudflare()
  {
    $ipCheck = self::_cloudflare_CheckIP($_SERVER['REMOTE_ADDR']);
    $requestCheck = self::_cloudflare_Requests_Check();

    return $ipCheck && $requestCheck;
  }

  // Use when handling ip's
  public static function getRequestIP()
  {
    $check = self::isCloudflare();

    if ($check) {
      return $_SERVER['HTTP_CF_CONNECTING_IP'];
    } else {
      return self::get_client_ip();
    }
  }

  /**
   * Get Useragent.
   *
   * @return string
   */
  public static function useragent()
  {
    return $_SERVER['HTTP_USER_AGENT'];
  }

  public static function print_server()
  {
    return join(PHP_EOL, $_SERVER);
  }

  public static function get_url_path($path, bool $cache = null)
  {
    if ($realpath = realpath($path)) {
      $f = str_replace(realpath($_SERVER['DOCUMENT_ROOT']), '', $realpath);

      $ret = self::fixSlash($f);
      if (true === $cache) {
        $ret .= '?cache=' . CONFIG['cache']['key'];
      }

      return $ret;
    }

    //return $path;
  }

  public static function ddos_key()
  {
    $secure_cookie_label = 'DDOS';
    if (!isset($_SERVER['HTTP_USER_AGENT'])) {
      exit(\JSON\json::json(['error' => true, 'message' => 'BOT Detected']));
    }
    //$secure_cookie_label .= date('Ymd');
    $secure_cookie_label .= $_SERVER['HTTP_USER_AGENT'];
    $secure_cookie_label = md5($secure_cookie_label);

    return $secure_cookie_label;
  }

  /**
   * Minify HTML.
   *
   * @param string $buffer
   */
  public static function sanitize_output($buffer)
  {
    if (!is_string($buffer)) {
      return $buffer;
    }
    $search = [
      '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
      '/[^\S ]+\</s',     // strip whitespaces before tags, except space
      '/(\s)+/s',         // shorten multiple whitespace sequences
      '/<!--(.|\s)*?-->/', // Remove HTML comments
    ];

    $replace = [
      '>',
      '<',
      '\\1',
      '',
    ];

    $buffer = preg_replace($search, $replace, $buffer);

    return $buffer;
  }

  public static function trycatch($try)
  {
    try {
      if (is_callable($try)) {
        call_user_func($try);
      }
    } catch (\Throwable $th) {
      if (ob_get_level()) {
        ob_end_clean();
        ob_start();
      }
      $title = 'ERROR';
      $desc = $th->getMessage();
      if (isset($_REQUEST['dmp']) || 'development' == \MVC\router::get_env()) {
        $desc .= '<pre style="word-wrap: break-word;">' . nl2br(json_encode($th->getTrace(), JSON_UNESCAPED_UNICODE || JSON_PRETTY_PRINT || JSON_UNESCAPED_SLASHES)) . '</pre>';
      }
      include __DIR__ . '/themes/alert/content.php';
      exit;
    } finally {
    }
  }
}
