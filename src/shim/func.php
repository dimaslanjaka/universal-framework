<?php

/**
 * Wrapping function By Dimas Lanjaka.
 *
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */

/**
 *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any origin.
 *
 *  In a production environment, you probably want to be more restrictive, but this gives you the general idea of what is involved.  For the nitty-gritty low-down, read:
 *  - https://developer.mozilla.org/en/HTTP_access_control
 *  - https://fetch.spec.whatwg.org/#http-cors-protocol
 *
 * @return void
 */
function cors()
{
  if (!headers_sent()) {
    return;
  }

  // Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  // Access-Control headers are received during OPTIONS requests
  if ('OPTIONS' == $_SERVER['REQUEST_METHOD']) {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
      // may also be using PUT, PATCH, HEAD etc
      header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
      header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
  }

  //echo "You have CORS!";
}

/**
 * Check if string start with needle string.
 *
 * @param string $haystack
 * @param string $needle
 *
 * @return bool
 */
function startsWith($haystack, $needle)
{
  $length = strlen($needle);

  return substr($haystack, 0, $length) === $needle;
}

/**
 * Check if string ends with needle string.
 *
 * @param string $haystack
 * @param string $needle
 *
 * @return bool
 */
function endsWith($haystack, $needle)
{
  $length = strlen($needle);
  if (!$length) {
    return true;
  }

  return substr($haystack, -$length) === $needle;
}

/**
 * Convert string or number or float to number/float value.
 *
 * @param int|float|string $val
 *
 * @return int|float|null
 */
function toNumber($val)
{
  if (is_string($val)) {
    if (preg_match('/^\d*\.?\d*$/m', $val, $matches)) {
      $val = $matches[0];
    } elseif (preg_match('/^\d*\.?\d*/m', $val, $matches)) {
      $val = $matches[0];
    }
  }
  if (is_numeric($val)) {
    $int = (int) $val;
    $float = (float) $val;

    $val = ($int == $float) ? $int : $float;

    return $val;
  } else {
    trigger_error("Cannot cast $val to a number", E_USER_WARNING);

    return null;
  }
}

/**
 * Convert path to url.
 *
 * @param string $file
 * @param string $Protocol http://, https://, etc
 *
 * @return void
 */
function path2url($file, $Protocol = null)
{
  $file = realpath($file);
  //var_dump($file);
  if (null == $Protocol) {
    $Protocol = (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . '://';
  }
  if ($file) {
    return $Protocol . $_SERVER['HTTP_HOST'] . fixurl(str_replace(fixpath($_SERVER['DOCUMENT_ROOT']), '', fixpath($file)));
  }
  //echo debug_backtrace()[1]['function'];
}

/**
 * Get URL Origin by Path.
 */
function getOrigin($path)
{
  return (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://$_SERVER[HTTP_HOST]$path";
}

/**
 * Fix url.
 *
 * @return string fixed url
 */
function fixurl($url)
{
  $remove_backslash = preg_replace('/[\/\\\\]{2,100}/m', '/', $url);

  return str_replace('\\', '/', $remove_backslash);
}

/**
 * Fix path separator based OS.
 *
 * @return string
 */
function fixpath($subject)
{
  $replace = (DIRECTORY_SEPARATOR === '\\')
        ? str_replace('/', '\\', $subject)
        : str_replace('\\', '/', $subject);

  return preg_replace('/[\/\\\\]{2,100}/m', DIRECTORY_SEPARATOR, $replace);
}

/**
 * Write to file.
 *
 * @param string $file
 * @param string $content
 *
 * @return void
 */
function write($file, $content, $append = false)
{
  if (!file_exists(dirname($file))) {
    mkdir(dirname($file));
  }
  if (file_exists($file)) {
    delete($file);
  }
  file_put_contents($file, $content, ($append ? FILE_APPEND : 0));
}

/**
 * Delete file or directory.
 * Unset array or object.
 *
 * @param mixed $object
 *
 * @return void
 */
function delete($object)
{
  if (is_file($object) || is_dir($object)) {
    unlink($object);
  } elseif (is_array($object) || is_object($object)) {
    unset($object);
  }
}

/**
 * Get All included files.
 *
 * @return string|false|void
 */
function get_includes()
{
  $included = array_values(array_filter(array_map(function ($arr) {
    if (is_string($arr)) {
      if (strpos($arr, 'vendor')) {
        return '';
      }
    }

    return $arr;
  }, get_included_files())));
  $included[] = 'total included files: ' . count(get_included_files());
  $inc = \JSON\json::json($included, false, false);

  return $inc;
}

/**
 * check session name exist ($_SESSION).
 */
function is_session($sessionName)
{
  return isset($_SESSION[$sessionName]);
}

/**
 * Get session value by name ($_SESSION).
 */
function get_session($sessionName)
{
  if (is_session($sessionName)) {
    return $_SESSION[$sessionName];
  }
}

/**
 * Set session.
 */
function set_session($name, $value)
{
  $_SESSION[$name] = $value;
}

/**
 * Parse URL deeper.
 */
function parse_url2($url, $encoded = false)
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
