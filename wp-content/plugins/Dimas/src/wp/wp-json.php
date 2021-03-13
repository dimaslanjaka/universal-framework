<?php

class json
{
  public static function i()
  {
    return new self();
  }

  public static function h()
  {
    if (ob_get_level()) {
      ob_end_clean();
    }
    if (!headers_sent()) {
      header('Content-type: application/json; charset=utf-8');
    }

    return new self();
  }

  public function err($z)
  {
    if (is_string($z)) {
      $s = ['error' => $z];
    } else {
      $s = $z;
    }
    exit($this->j($s));
  }

  public function j($str)
  {
    return json_encode($str, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  }

  public static function enc($str)
  {
    return json_encode($str, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  }
}
