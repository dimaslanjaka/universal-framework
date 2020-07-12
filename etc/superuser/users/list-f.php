<?php

if (isset($_REQUEST['list-user'])) {
  $list = pdo()->select('userdata')->row_array();

  e(array_filter_recursive($list, ['password']));
}

/**
 * ```php
 * array_filter_recursive(['password'=>'secret_password', 'username'=>'any'], ['password']); //will return without password
 * ```
 * Array filter recursive
 *
 * @param array $array
 * @param array $filterdata
 * @return array
 */
function array_filter_recursive(array $array, array $filterdata)
{
  if (\ArrayHelper\helper::isSequent($array)) {
    return array_map(function ($single) use ($filterdata) {
      foreach ($filterdata as $filter) {
        if (isset($single[$filter])) {
          unset($single[$filter]);
        }
      }
      return $single;
    }, $array);
  }
}

/**
 * Check multiple array keys exists
 *
 * @param array $keys
 * @param array $arr
 * @return bool
 */
function array_keys_exists(array $keys, array $arr)
{
  return !array_diff_key(array_flip($keys), $arr);
}
