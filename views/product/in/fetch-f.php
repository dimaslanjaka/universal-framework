<?php
user()->login_required('/user/login');

$sql = file_get_contents(__DIR__ . '/fetch.sql');
if (isset($_REQUEST['show-spec'])) {
    $sql .= ' WHERE product.status = 1 AND product.quantity > 0 ';
} elseif (isset($_REQUEST['search'])) {
    $search = urldecode($_REQUEST['search']);
    $sql .= " WHERE product_name LIKE '%$search%' OR product_alias LIKE '%$search%' OR code LIKE '%$search%' ";
}
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
