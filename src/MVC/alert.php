<?php

namespace MVC;

class alert
{
  private static $init = null;
  public $result = '';
  public $message = [];

  public static function init()
  {
    if (!self::$init) {
      self::$init = new self();
    }

    return self::$init;
  }

  public function add(string $title, string $message)
  {
  }
}
