<?php

namespace JSON;

use DomainException;
use Exception;

class json
{
  /**
   * JSON formatter.
   *
   * @param array $data
   * @param bool  $header
   * @param bool  $print
   */
  public static function json($data = [], $header = true, $print = true)
  {
    if ($header && !headers_sent()) {
      header('Content-Type: application/json');
    }
    if ('string' == strtolower(gettype($data)) && self::is_json($data)) {
      $data = json_decode($data);
    }

    $json = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

    if ($print) {
      echo $json;
    } else {
      return $json;
    }
  }

  public static function is_json($string)
  {
    json_decode($string);

    return JSON_ERROR_NONE == json_last_error();
  }

  /**
   * JSON decode with verification.
   *
   * @param string $str
   */
  public static function jsond($str, $callback = null)
  {
    if (self::is_json($str)) {
      return json_decode($str);
    } elseif (is_callable($callback)) {
      if (!self::is_json($str)) {
        return call_user_func($callback, $str);
      } else {
        return call_user_func($callback, json_decode($str));
      }
    } else {
      throw new Exception('Not valid JSON string', 1);
    }
  }

  /**
   * JSON error explanator.
   */
  public static function json_last_error_e()
  {
    switch (json_last_error()) {
      case JSON_ERROR_NONE:
        echo ' - No errors';
        break;
      case JSON_ERROR_DEPTH:
        echo ' - Maximum stack depth exceeded';
        break;
      case JSON_ERROR_STATE_MISMATCH:
        echo ' - Underflow or the modes mismatch';
        break;
      case JSON_ERROR_CTRL_CHAR:
        echo ' - Unexpected control character found';
        break;
      case JSON_ERROR_SYNTAX:
        echo ' - Syntax error, malformed JSON';
        break;
      case JSON_ERROR_UTF8:
        echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
        break;
      default:
        echo ' - Unknown error';
        break;
    }
  }

  public static function jsonDecode($input)
  {
    if (version_compare(PHP_VERSION, '5.4.0', '>=') && !(defined('JSON_C_VERSION') && PHP_INT_SIZE > 4)) {
      /** In PHP >=5.4.0, json_decode() accepts an options parameter, that allows you
       * to specify that large ints (like Steam Transaction IDs) should be treated as
       * strings, rather than the PHP default behaviour of converting them to floats.
       */
      $obj = json_decode($input, false, 512, JSON_BIGINT_AS_STRING);
    } else {
      /** Not all servers will support that, however, so for older versions we must
       * manually detect large ints in the JSON string and quote them (thus converting
       *them to strings) before decoding, hence the preg_replace() call.
       */
      $max_int_length = strlen((string) PHP_INT_MAX) - 1;
      $json_without_bigints = preg_replace('/:\s*(-?\d{' . $max_int_length . ',})/', ': "$1"', $input);
      $obj = json_decode($json_without_bigints);
    }

    if (function_exists('json_last_error') && $errno = json_last_error()) {
      //static::handleJsonError($errno);
      self::json_last_error_e();
    } elseif (null === $obj && 'null' !== $input) {
      throw new DomainException('Null result with non-null input');
    }

    return $obj;
  }

  public function isJson($string)
  {
    json_decode($string);

    return JSON_ERROR_NONE == json_last_error();
  }
}
