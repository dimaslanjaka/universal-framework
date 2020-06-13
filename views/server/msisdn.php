<?php

$pdo = pdo()->select('data_msisdn', 'msisdn');
if (isset($_REQUEST['simcard'])) {
  $pdo->where(['simcard' => strtolower($_REQUEST['simcard'])]);
}
$row = $pdo->row_array();
$row = array_map(function ($db) {
  if (isset($db['msisdn'])) {
    if (strlen($db['msisdn']) <= 7) return;
    return $db['msisdn'];
  }
}, $row);
$row = array_unique(array_values(array_filter($row)));
\JSON\json::json($row);
