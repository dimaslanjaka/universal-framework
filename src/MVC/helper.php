<?php

namespace MVC;

setlocale(LC_ALL, 'en_US.UTF-8');
if (!defined('ROOT')) {
  define('ROOT', realpath(__DIR__ . '/../../'));
}

class helper
{
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

  public static function webkit_asset(string $path)
  {
    if ($path = realpath($path)) {
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
   * @return array_merge
   */
  public static function parse_url2($url, $encoded = false)
  {
    if ($encoded) {
      $url = urldecode($url);
    }
    $url = html_entity_decode($url);
    $parts = parse_url($url);
    if (isset($parts['query'])) {
      parse_str($parts['query'], $query);
      $parts['original_query'] = $parts['query'];
      $parts['query'] = $query;
    }

    return array_merge($parts);
  }

  public static function fixSlash($path)
  {
    $re = '/\\' . DIRECTORY_SEPARATOR . '{1,10}/s';
    //var_dump($re);
    return preg_replace($re, '/', $path);
  }

  public static function base_url($path)
  {
    return isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http' . "://{$_SERVER['HTTP_HOST']}{$path}";
  }

  public static function geturl()
  {
    return (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
  }

  public static function isLocal()
  {
    return preg_match('/agc\.io|127\.0\.0\.0\.1|localhost|php\.io/s', $_SERVER['HTTP_HOST']);
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
   * Cors domain verify and detect AJAX.
   *
   * @todo only allow CORS request
   */
  public static function cors($print_server = false)
  {
    //header('Content-type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *'); //allow all AJAX REQUEST

    if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
      if ('xmlhttprequest' != strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        return __LINE__ . false;
      } else {
        if (isset($_SERVER['HTTP_SEC_FETCH_SITE']) && isset($_SERVER['HTTP_SEC_FETCH_MODE']) && isset($_SERVER['HTTP_REFERER']) && isset($_SERVER['HTTP_ORIGIN']) && isset($_SERVER['HTTP_USER_AGENT'])) {
          $parseRef = parse_url($_SERVER['HTTP_REFERER']);
          $parseOri = parse_url($_SERVER['HTTP_ORIGIN']);
          if (!isset($parseOri['host']) || !isset($parseRef['host'])) {
            return __LINE__ . false;
          }
          if ($parseOri['host'] != $parseRef['host']) {
            return __LINE__ . false;
          }
          if ('same-origin' == $_SERVER['HTTP_SEC_FETCH_SITE'] && 'cors' == $_SERVER['HTTP_SEC_FETCH_MODE']) {
            return $parseOri['host'] == $parseRef['host'];
          } else {
            if ($print_server) {
              $_SERVER['PHP_LINE'] = __LINE__;

              return $_SERVER;
            } else {
              return false;
            }
          }
        }
      }
    }
    if (isset($_SERVER['HTTP_ORIGIN'])) {
      header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
      header('Access-Control-Expose-Headers: date,content-type,transfer-encoding,connection,access-control-allow-origin,server,x-xss-protection,x-content-type-options,x-request-id,content-encoding,x-final-url');
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
      if (isset($_SERVER['HTTP_REFERER'])) {
        $parseRef = parse_url($_SERVER['HTTP_REFERER']);
        $parseOri = parse_url($_SERVER['HTTP_ORIGIN']);
        if (!isset($parseOri['host']) || !isset($parseRef['host'])) {
          return __LINE__ . false;
        }
        if ($parseOri['host'] != $parseRef['host']) {
          return __LINE__ . false;
        }
      } else {
        return __LINE__ . false;
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

    $final = isset($_SERVER['HTTP_ACCEPT']) && isset($_SERVER['HTTP_ORIGIN']) && isset($_SERVER['HTTP_REFERER']) && isset($_SERVER['HTTP_ACCEPT_ENCODING']) && isset($_SERVER['CONTENT_TYPE']) && isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) && isset($_SERVER['HTTP_USER_AGENT']) && isset($_SERVER['UNIQUE_ID']);
    if (!$final && $print_server) {
      $_SERVER['PHP_LINE'] = __LINE__;

      return $_SERVER;
    }
    if ($final) {
      return true;
    }

    return false;
  }
}
