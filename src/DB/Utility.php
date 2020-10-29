<?php

namespace DB;

class Utility
{
  /**
   * Reset auto increment value for max id from it's table
   *
   * @param string $tablename
   * @param pdo $pdo
   * @return void
   */
  public static function resetAutoIncrement(string $tablename, pdo $pdo)
  {
    $sql = "SELECT @max := MAX(ID)+ 1 FROM $tablename;
    PREPARE stmt FROM 'ALTER TABLE $tablename AUTO_INCREMENT = ?';
    EXECUTE stmt USING @max;
    DEALLOCATE PREPARE stmt;";
    $pdo->query($sql)->exec();
  }
}
