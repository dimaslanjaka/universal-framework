<?php

namespace DB;

class query
{
  public function and($where)
  {
    $where_combine = ' WHERE ';
    $i = 0;
    $len = count($where);
    foreach ($where as $key => $value) {
      $where_combine .= " `$key` = '$value' ";
      if ($i != $len - 1) {
        // if not last iteration
        $where_combine .= ' AND ';
      }

      ++$i;
    }
  }
}
