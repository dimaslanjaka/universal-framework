<?php

namespace MVC;

$GLOBALS['router_state'] = [];

class router extends themes
{
  public $root;
  public $PHP_ERROR_FILE = PHP_ERROR_FILE;

  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Safe redirect, support any conditions.
   */
  public static function safe_redirect(string $path)
  {
    if (ob_get_level()) {
      ob_end_clean();
    }
    ob_start();
    header('HTTP/1.1 503 Service Unavailable');
    header('Status: 503 Service Unavailable');
    header('Retry-After: 3600');
    header("refresh:5; url=$path");

    if (!headers_sent()) {
      header("Location: $path", true, 302);
    } else {
      echo '<!DOCTYPE html>
      <html>

      <head>
        <title>Temporarily Unavailable</title>
        <meta name="robots" content="none" />
        <meta http-equiv="refresh" content="5; url=' . $path . '" />
      </head>

      <body>
        You will redirected automatically
      </body>
      <script>
        location.href = `' . $path . '`;
        document.body.innerHTML = "";
        throw "";
      </script>

      </html>';
    }
    exit;
  }

  public function redirect(string $path)
  {
    return self::safe_redirect($path);
  }

  public function no_direct()
  {
    if (1 == count(get_included_files())) {
        header('Location: /'); // Send to index
        exit('403'); // Must include to stop PHP from continuing
    }
  }

  public $env;

  /**
   * Define environtment
   * * development / production.
   *
   * @return string
   */
  public function environtment($env = 'production')
  {
    $env = strtolower($env); //$GLOBALS['router']['env']
    switch ($env) {
      case 'development':
        //error_reporting(-1);
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
        ini_set('log_errors', 1);
        ini_set('error_log', \Filemanager\file::file($this->PHP_ERROR_FILE, ''));
        break;

      case 'production':
        ini_set('display_errors', 0);
        if (version_compare(PHP_VERSION, '5.3', '>=')) {
          error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT & ~E_USER_NOTICE & ~E_USER_DEPRECATED);
        } else {
          error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_USER_NOTICE);
        }
        break;
    }
    if (empty($env)) {
      if (ob_get_level()) {
        ob_end_clean();
      }
      header('HTTP/1.1 503 Service Unavailable.', true, 503);
      echo 'The application environment is not set correctly.';
      exit(1); // EXIT_ERROR
    }

    file_put_contents(ROOT . '/tmp/environtment.txt', $env, true);
    $GLOBALS['router_state']['env'] = $this->env = $env;

    return $env;
  }

  public function is_production()
  {
    return 'production' == $this->get_env();
  }

  private static $env_status = null;

  /**
   * Get framework environtment.
   *
   * @return string
   */
  public static function get_env()
  {
    if (isset($GLOBALS['router_state']['env'])) {
      return $GLOBALS['router_state']['env'];
    }
    if (!self::$env_status) {
      self::$env_status = \Filemanager\file::get(\Filemanager\file::tmp() . '/environtment.txt');
    }
    if (!self::$env_status) {
      \Cookie\helper::del('environtment');
    }

    return self::$env_status;
  }

  public function is_req($any, $alternative = null)
  {
    if (isset($_REQUEST[(string) $any])) {
      return $_REQUEST[(string) $any];
    }

    return $alternative;
  }

  /**
   * check if one of the headers exists.
   *
   * ```php
   * if ($this->is_reqs(['DNT', 'Connection']))
   * ```
   *
   * @return bool|string
   */
  public function is_reqs(array $anys)
  {
    foreach ($anys as $any) {
      if (isset($_REQUEST[(string) $any])) {
        return $_REQUEST[(string) $any];
      }
    }
  }

  public function is_post($any, $alternative = null)
  {
    if (isset($_POST[(string) $any])) {
      return $_POST[(string) $any];
    }

    return $alternative;
  }

  /**
   * Check if header request has $any.
   *
   * @return string|null
   */
  public function is_header(string $any)
  {
    $allHeaders = getallheaders();

    return array_key_exists($any, $allHeaders) ? $allHeaders[$any] : null;
  }

    /**
     * Check browser no-cache request (hard reload).
     *
     * @return bool
     */
  public function is_hard_reload()
  {
      return 'no-cache' == $this->is_header('Cache-Control') && 'no-cache' == $this->is_header('Pragma');
  }

  /**
   * Find router from parameter URL.
   */
  public function findRoute()
  {
    $route = strtok($_SERVER['REQUEST_URI'], '?');
    if (empty($route) || preg_match('/^\//s', $route)) {
      $re = preg_replace('/^\//s', '', $route);
      $router = $re;
      if ($re) {
        if (!$re || empty($re)) {
          $router = 'index';
        } elseif (preg_match('/\/$/', $re)) {
          $router .= 'index';
        }
      }
      if (empty($re)) {
        $router .= 'index';
      }
    }

    if (empty($router)) {
      exit(var_dump($router, $re));
    }

    if (is_dir($router)) {
      echo 'Unable access';

      return;
    }

    return $router;
  }

  public function config($router)
  {
    return helper::platformSlashes($this->view . '/' . $router);
  }

  public function GUID()
  {
    if (true === function_exists('com_create_guid')) {
      return trim(com_create_guid(), '{}');
    }

    return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
  }
}
