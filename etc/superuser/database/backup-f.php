<?php

use JSON\json;

$pdo = pdo();
if (isset($_REQUEST['tables'])) {
  $tables = $pdo->query('show tables')->row_array();
  $result = [];
  foreach ($tables as $key => $table) {
    $get = array_values($table);
    if (isset($get[0])) {
      $result[] = $get[0];
    }
  }
  exit(json::json($result));
}
