<?php

$sql = 'SELECT brand_id, brand_name, brand_active, brand_status FROM brands WHERE brand_status = 1';
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
