<?php
user()->login_required('/user/login');

$sql = 'SELECT * FROM brands';
if (isset($_REQUEST['search'])) {
  $search = urldecode($_REQUEST['search']);
  $sql .= " WHERE brand_name LIKE '%$search%' AND brand_status = 1 ";
} elseif (isset($_REQUEST['only-enabled'])) {
  $sql .= ' WHERE brand_status = 1 ';
}
$sql .= ' ORDER BY brand_name ASC ';
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
