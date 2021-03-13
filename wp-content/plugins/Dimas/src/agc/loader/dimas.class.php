<?php

class agc
{
  public function __construct()
  {
  }

  public function sanitizemail($field)
  {
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
      return true;
    } else {
      return false;
    }
  }

  public static function i()
  {
    return new self();
  }

  public function download_site($c)
  {
    return preg_match_all('/(zippyshare|mediafire|userscloud|sendit|sfile|drive\.google)\.[cloudnetm]{1,7}/m', strtolower($c));
  }

  public function session()
  {
    if (PHP_SESSION_NONE == session_status()) {
      session_start();
    }
  }

  public function obs()
  {
    ob_start();
  }

  public function flush_cookie()
  {
    if (isset($_SERVER['HTTP_COOKIE'])) {
      $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
      foreach ($cookies as $cookie) {
        $parts = explode('=', $cookie);
        $name = trim($parts[0]);
        setcookie($name, '', time() - 1000);
        setcookie($name, '', time() - 1000, '/');
      }
    }
  }

  public function isDump()
  {
    return isset($_GET['dump']) || isset($_POST['dump']);
  }

  public function dump($str)
  {
    header('Content-type: application/json; charset=utf-8');
    ob_end_clean();
    exit($this->cj($str));
  }
  /**
   * Create json from array | prettyprint | unescaped slashes
   */
  public function cj($str)
  {
    return json_encode($str, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
  }
}
