<?php

$sql = 'SELECT
    product.*,
    brands.brand_name,
    categories.categories_name
FROM
    product
INNER JOIN brands ON product.brand_id = brands.brand_id
INNER JOIN categories ON product.categories_id = categories.categories_id ';
if (isset($_REQUEST['show-spec'])) {
    $sql .= ' WHERE product.status = 1 AND product.quantity > 0 ';
}
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
