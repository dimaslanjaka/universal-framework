<?php

namespace DB;

use PDO;

class backup
{
  /**
   * \DB\pdo instance.
   *
   * @var \DB\pdo
   */
  private $pdo;

  public function __construct(pdo $pdo)
  {
    $this->pdo = $pdo;
  }

  public function backup()
  {
    $DBH = $this->pdo->pdo();
    $show = $DBH->query('SHOW TABLES');
    $tables = [];
    while ($row = $show->fetch(PDO::FETCH_NUM)) {
      $tables[] = $row[0];
    }
    $table_creation = '';
    foreach ($tables as $table) {
      $result = $DBH->query("SELECT * FROM $table");
      $num_fields = $result->columnCount();
      $num_rows = $result->rowCount();

      $pstm2 = $DBH->query("SHOW CREATE TABLE $table");
      $row2 = $pstm2->fetch(PDO::FETCH_NUM);
      $ifnotexists = str_replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS', $row2[1]);
      $table_creation .= "\n\n" . $ifnotexists . ";\n\n";
    }
    header('Content-Type: application/json');
    echo $table_creation;
    exit;
  }
}
