<?php

class wpdb_utility
{
  public static $foo;

  public function __construct()
  {
  }

  public static function i()
  {
    return new self();
  }

  public function e($wpdb)
  {
    return ['query' => $wpdb->last_query, 'result' => $wpdb->last_result, 'error' => $wpdb->last_error];
  }

  public function err($wpdb)
  {
    return $this->vardump(['error' => $this->e($wpdb)]);
  }

  public function ej($wpdb)
  {
    return $this->cj(['error' => $this->e($wpdb)]);
  }

  public function cj($str)
  {
    return json_encode($str, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  }

  public function vardump($array = [])
  {
    if ($this->hj()) {
      $this->hj();
      exit(var_dump($array));
    } else {
      $this->print_error($array);
    }
  }

  public function hj()
  {
    if (ob_get_level()) {
      ob_end_clean();
    }
    if (!headers_sent()) {
      header('Content-type: application/json; charset=utf-8');

      return true;
    } else {
      return false;
    }
  }

  public function print_error($wpdb)
  {
    if ('' !== $wpdb->last_error) {
      $str = htmlspecialchars($wpdb->last_result, ENT_QUOTES);
      $query = htmlspecialchars($wpdb->last_query, ENT_QUOTES);

      echo "<div id='error' class='container' style='position:fixed;top:2;left:2'>
        <p class='wpdberror'><strong>WordPress database error:</strong> [$str]<br />
        <code>$query</code></p>
        </div>";
    }
  }
}
