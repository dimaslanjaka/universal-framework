<?php

class math
{
  public static $val;

  public static function add($var)
  {
    static::$val += $var;

    return new static();
  }

  public static function sub($var)
  {
    static::$val -= $var;

    return new static();
  }

  public static function out()
  {
    return static::$val;
  }

  public static function init($var)
  {
    static::$val = $var;

    return new static();
  }
}

//echo math::init(5)->add(2)->out();
