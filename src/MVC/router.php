<?php

namespace MVC;

class router extends themes
{
  public $root;

  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Safe redirect, support any conditions.
   *
   * @return void
   */
  public static function safe_redirect($path)
  {
    if (!headers_sent()) {
      header("Location: $path");
    } else {
      echo "<script>
      location.href = `$path`;
      </script>";
    }
  }

  /**
   * Define environtment
   * * development / production.
   *
   * @return \ENVIRONTMENT
   */
  public function environtment($env = 'development')
  {
    switch ($env) {
    case 'development':
    error_reporting(-1);
    ini_set('display_errors', 1);
    break;

    case 'testing':
    case 'production':
    ini_set('display_errors', 0);
    if (version_compare(PHP_VERSION, '5.3', '>=')) {
      error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT & ~E_USER_NOTICE & ~E_USER_DEPRECATED);
    } else {
      error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_USER_NOTICE);
    }
    break;

    default:
    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo 'The application environment is not set correctly.';
    exit(1); // EXIT_ERROR
  }
    define('ENVIRONMENT', $env);
  }

  /**
   * Find router from parameter URL.
   *
   * @return void
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
}
