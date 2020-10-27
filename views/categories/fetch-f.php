<?php

$sql = 'SELECT * FROM categories'; // WHERE categories_status = 1
if (isset($_REQUEST['search'])) {
  $search = urldecode($_REQUEST['search']);
  $sql .= " WHERE categories_name LIKE '%$search%' AND categories_status = 1 ";
} elseif (isset($_REQUEST['only-enabled'])) {
  $sql .= ' WHERE categories_status = 1 ';
}
$sql .= ' ORDER BY categories_name ASC ';
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
