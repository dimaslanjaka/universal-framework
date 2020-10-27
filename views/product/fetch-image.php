<?php

$productId = $_GET['i'];

$sql = "SELECT product_image FROM product WHERE product_id = {$productId}";
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
