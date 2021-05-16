<?php

use DB\Backup;
use JSON\json;

$pdo = pdo();
if (isset($_REQUEST['tables'])) { // show all tables
  $tables = $pdo->query('show tables')->row_array();
  $result = [];
  foreach ($tables as $key => $table) {
    $get = array_values($table);
    if (isset($get[0])) {
      $result[] = $get[0];
    }
  }
  exit(json::json($result));
} else if (isset($_REQUEST['table'])) { // backup single table
  /**
   * Instantiate Backup_Database and perform backup.
   */
    $backupDatabase = new Backup(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $tbl = trim(urldecode($_REQUEST['table']));
  $result = $backupDatabase->backupTables($tbl);
  if (!isset($_REQUEST['sql'])) {
    exit(json::json($result));
  } else {
    header('Content-Type: text/plain; charset=utf-8');
    echo $result[$tbl]['sql'];
    exit;
  }
}
