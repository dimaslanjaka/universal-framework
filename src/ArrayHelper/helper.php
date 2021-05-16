<?php

namespace ArrayHelper;

/**
 * Array helper
 * * improve managing array.
 *
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
class helper
{
  /**
   * Unset multiple keys in array.
   *
   * @todo Remove all defined keys in array
   */
  public static function unset(array $source, array $keys)
  {
    foreach ($keys as $unset) {
      if (isset($source[$unset])) {
        unset($source[$unset]);
      }
    }

    return $source;
  }

  public static function recursiveFind(array $haystack, $needle)
  {
    $iterator = new \RecursiveArrayIterator($haystack);
    $recursive = new \RecursiveIteratorIterator(
      $iterator,
      \RecursiveIteratorIterator::SELF_FIRST
    );
    foreach ($recursive as $key => $value) {
      if ($key === $needle) {
        yield $value;
      }
    }
  }

  public static function array_search(array $haystack, $needle)
  {
    if (!self::isAssoc($haystack)) {
      throw new \MVC\Exception('Array search only for associative array', 1);
    }
    $result = [];
    $search = self::recursiveFind($haystack, $needle);
    //var_dump($search);
    foreach ($search as $value) {
      // Use `$value` here
      $result[] = $value;
    }

    return $result;
  }

  public static function recursive_array_search($needle, $haystack)
  {
      foreach ($haystack as $key => $value) {
          $current_key = $key;
          if ($needle === $value or (is_array($value) && false !== self::recursive_array_search($needle, $value))) {
              return $current_key;
          }
      }

      return false;
  }

  /**
   * Check array has All properties.
   *
   * @todo check all keys in array
   *
   * @return bool
   */
  public static function hasAll(array $array, array $key)
  {
    if (empty($key)) {
      return false;
    }
    $existAll = true;
    foreach ($key as $val) {
      if (!array_key_exists($val, $array)) {
        $existAll = false;
        //var_dump($val, $array);
      }
    }

    return $existAll;
  }

  public static function random_array_n(int $n, array $arr)
  {
    $result = [];
    if (empty($arr)) {
      return $result;
    }
    shuffle($arr);
    for ($i = 0; $i < $n; ++$i) {
      $result[] = $arr[array_rand($arr)];
    }

    return $result;
  }

  public static function replace_value_by_key(array $before, array $after)
  {
    foreach ($before as $key => $value) {
      if (isset($after[$key])) {
        $before[$key] = $after[$key];
      }
    }

    return $before;
  }

  public static function get_rand_arr(array $items, int $length = 1)
  {
    $result = [];
    for ($i = 0; $i < $length; ++$i) {
      $result[] = $items[array_rand($items)];
    }

    return $result;
  }

  public static function fix_undefined_properties(array $arr, array $name)
  {
    foreach ($name as $prop => $callback) {
      if (!isset($arr[$prop])) {
        $arr[$prop] = $callback;
      }
    }

    return $arr;
  }

  public static function get(array $source, array $keys = [])
  {
    $source = (array) $source;
    $result = [];
    foreach ($keys as $unset) {
      $replacement_value = false;
      $replacement_key = false;
      if (is_array($unset)) {
        $keys = array_keys($unset);
        $replacement_key = $keys[0];
        $values = array_values($unset);
        $replacement_value = $values[0];
        if (isset($source[$replacement_key])) {
          $result[$replacement_value] = $source[$replacement_key];
        }
        continue;
      }
      if (isset($source[$unset])) {
        $result[$unset] = $source[$unset];
      }
    }

    return $result;
  }

  public static function get_value_of_key(string $key, $source)
  {
    if (array_key_exists($key, $source)) {
      return $source[$key];
    }
  }

  /**
   * Is Associative array.
   *
   * @return bool
   */
  public static function isAssoc(array $source)
  {
    if ([] === $source) {
      return false;
    }

    return array_keys($source) !== range(0, count($source) - 1);
  }

  /**
   * Is Sequental array.
   *
   * @return bool
   */
  public static function isSequent(array $source)
  {
    return !self::isAssoc($source);
  }

    /**
     * IS array or object.
     *
     * @param array|object $objarr
     *
     * @return bool
     */
  public static function is_iterable($objarr)
  {
    return is_array($objarr) || is_object($objarr);
  }
}
