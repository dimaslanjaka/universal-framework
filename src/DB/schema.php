<?php

namespace DB;

class schema
{
  /**
   * Get ENUM or SET values.
   *
   * @return array
   */
  public static function get_enumset_values(pdo $pdo, string $table, string $field)
  {
      $type = $pdo->query("SHOW COLUMNS FROM {$table} WHERE Field = '{$field}'")->row_array()['Type'];
      $result = [];
      if (preg_match("/^enum\(\'(.*)\'\)$/", $type, $matches)) {
          $enum = explode("','", $matches[1]);

          $result = $enum;
      } elseif (preg_match("/^set\(\'(.*)\'\)$/", $type, $matches)) {
          $set = explode("','", $matches[1]);

      $result = $set;
    }

    return array_values(array_unique($result));
  }

  /**
   * Modify ENUM or SET values.
   *
   * @see https://stackoverflow.com/questions/1501958/how-do-i-add-more-members-to-my-enum-type-column-in-mysql
   *
   * @return array
   */
    public static function modify_enumset_values(pdo $pdo, string $table, string $field, array $newData)
    {
        for ($i = 0; $i < count($newData); ++$i) {
            $newData[$i] = "'$newData[$i]'";
        }
        $data = implode(', ', array_values(array_unique($newData)));
        $sql = "ALTER TABLE `$table` MODIFY COLUMN `$field` SET($data) NOT NULL";

        return $pdo->query($sql)->exec();
    }

    /**
     * Replaces any parameter placeholders in a query with the value of that
     * parameter. Useful for debugging. Assumes anonymous parameters from
     * $params are are in the same order as specified in $query.
     *
     * @param string $query The sql query with parameter placeholders
     * @param array $params The array of substitution parameters
     *
     * @return string The interpolated query
     */
  public static function interpolateQuery($query, $params)
  {
      $keys = [];

      // build a regular expression for each parameter
    foreach ($params as $key => $value) {
      if (is_string($key)) {
        $keys[] = '/:' . $key . '/';
      } else {
        $keys[] = '/[?]/';
      }
    }

    $query = preg_replace($keys, $params, $query, 1, $count);

      //trigger_error('replaced '.$count.' keys');

    return $query;
  }
}
