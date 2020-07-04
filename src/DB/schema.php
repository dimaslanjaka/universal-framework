<?php

namespace DB;

use PDO as GlobalPDO;

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

  /**
   * Modify ENUM or SET values.
   *
   * @return array
   */
  public static function modify_enumset_values(\DB\pdo $pdo, string $table, string $field, array $newData)
  {
    //$sql = "ALTER TABLE `$table` MODIFY COLUMN `$field` SET(:value) NOT NULL";
    $sql = "SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'userdata';";
    $prepare = $pdo->pdo()->prepare($sql);
    foreach ($newData as $data) {
      //$prepare->bindValue('value', $data, GlobalPDO::PARAM_STR);
    }
    $prepare->bindValue('value', 'dataeee', GlobalPDO::PARAM_STR);
    return $prepare;
    //implode(', ', $newData)
    //return $pdo->query($sql)->exec();
  }

  /**
   * Replaces any parameter placeholders in a query with the value of that
   * parameter. Useful for debugging. Assumes anonymous parameters from
   * $params are are in the same order as specified in $query
   *
   * @param string $query The sql query with parameter placeholders
   * @param array $params The array of substitution parameters
   * @return string The interpolated query
   */
  public static function interpolateQuery($query, $params)
  {
    $keys = array();

    # build a regular expression for each parameter
    foreach ($params as $key => $value) {
      if (is_string($key)) {
        $keys[] = '/:' . $key . '/';
      } else {
        $keys[] = '/[?]/';
      }
    }

    $query = preg_replace($keys, $params, $query, 1, $count);

    #trigger_error('replaced '.$count.' keys');

    return $query;
  }
}
