<?php

namespace HTML;

class js
{
  public static function js_str($s)
  {
    return '"' . addcslashes($s, "\0..\37\"\\") . '"';
  }

  public static function js_array(array $array)
  {
    $temp = array_map(function ($index) {
      return self::js_str($index);
    }, $array);

    return '[' . implode(',', $temp) . ']';
  }
}
