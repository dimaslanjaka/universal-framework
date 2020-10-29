<?php
user()->login_required('/user/login');

$sql = 'SELECT * FROM producer'; // WHERE categories_status = 1
if (isset($_REQUEST['search'])) {
  $search = urldecode($_REQUEST['search']);
  $sql .= " WHERE name LIKE '%$search%' ";
}
$sql .= ' ORDER BY name ASC ';
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
