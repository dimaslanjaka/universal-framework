<?php

$sql = 'SELECT product_id, product_name FROM product WHERE status = 1 AND active = 1';
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
