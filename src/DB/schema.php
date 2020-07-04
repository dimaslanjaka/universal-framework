<?php

namespace DB;

class schema
{
  /**
   * Get ENUM or SET values.
   *
   * @return array
   */
  public static function get_enumset_values(\DB\pdo $pdo, string $table, string $field)
  {
    $type = $pdo->query("SHOW COLUMNS FROM {$table} WHERE Field = '{$field}'")->row_array()['Type'];
    if (preg_match("/^enum\(\'(.*)\'\)$/", $type, $matches)) {
      $enum = explode("','", $matches[1]);

      return $enum;
    } elseif (preg_match("/^set\(\'(.*)\'\)$/", $type, $matches)) {
      $set = explode("','", $matches[1]);

      return $set;
    }

    return [];
  }
}
