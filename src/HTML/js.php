<?php

namespace HTML;

class js
{
  public static function js_array($array)
  {
    $temp = array_map(function ($index) {
      return self::js_str($index);
    }, $array);

    return '[' . implode(',', $temp) . ']';
  }

  public static function js_str($s)
  {
    return '"' . addcslashes($s, "\0..\37\"\\") . '"';
  }

  /**
   * Create javascript variable.
   *
   * @param string              $variable variable name
   * @param string|array|object $content  array object will turn into JSON javascript object
   *
   * @return string var name = content;
   */
  public static function var($variable, $content)
  {
    if (\ArrayHelper\helper::is_iterable($content)) {
      $content = \JSON\json::json($content, false, false);
    }
    if (false !== strpos($content, ';')) {
      $content = rtrim($content, ';');
    }

    return 'var ' . $variable . ' = `' . $content . '`;';
  }
}
