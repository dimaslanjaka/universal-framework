<?php

class AGC
{
  protected $session;
  protected $key;
  protected $admin;

  public function __construct($params = [])
  {
    header('Access-Control-Allow-Origin: *');
    if (!is_dir($_SERVER['DOCUMENT_ROOT'] . '/tmp')) {
      self::createFolder($_SERVER['DOCUMENT_ROOT'] . '/tmp');
    }
    if (!is_dir($_SERVER['DOCUMENT_ROOT'] . '/log')) {
      self::createFolder($_SERVER['DOCUMENT_ROOT'] . '/log');
    }
    if (!headers_sent()) {
      header('Access-Control-Allow-Origin: *');
    }
    if (PHP_SESSION_NONE == session_status()) {
      date_default_timezone_set('Asia/Jakarta');
      @ini_set('memory_limit', '256M'); //-1
      ini_set('session.gc_probability', 1);
      ini_set('session.save_path', realpath($_SERVER['DOCUMENT_ROOT'] . '/tmp'));
      ini_set('session.gc_maxlifetime', 3600);
      session_set_cookie_params(3600);
      session_start();
    }
    self::
  default();
  }

  public static function default()
  {
    return null;
  }

  /**
   * Send header Content-type: text/plain; charset=utf-8.
   */
  public static function text()
  {
    return header('Content-Type: text/plain; charset=utf-8');
  }

  /**
   * Send header Content-type: text/html; charset=utf-8.
   */
  public static function html()
  {
    return header('Content-Type: text/html; charset=utf-8');
  }

  /**
   * Send header Content-type: application/json; charset=utf-8.
   */
  public static function json()
  {
    return header('Content-type: application/json; charset=utf-8');
  }

  /**
   * Create JSON Prettyprint | unescaped slashes, unescaped unicode.
   */
  public static function cjson($array = [])
  {
    return json_encode($array, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  }

  /**
   * Validate JSON string.
   */
  public static function is_json($data = null)
  {
    if (!empty($data)) {
      @json_decode($data);

      return JSON_ERROR_NONE === json_last_error();
    } else {
      return false;
    }
  }
}
