<?php

$sql = 'SELECT categories_id, categories_name, categories_active, categories_status FROM categories'; // WHERE categories_status = 1
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
