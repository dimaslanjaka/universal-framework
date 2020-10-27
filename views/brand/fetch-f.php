<?php

$sql = 'SELECT * FROM brands';
if (isset($_REQUEST['only-enabled'])) {
  $sql .= ' WHERE brand_status = 1';
}
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
