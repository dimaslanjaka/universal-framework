<?php

$sql = 'SELECT * FROM categories'; // WHERE categories_status = 1
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
