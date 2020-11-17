<?php
user()->login_required('/user/login');

$sql = 'SELECT
PROD.`product_id`,
PROD.`product_name`,
PROD.`product_alias`,
PROD.`product_type`,
PROD.`brand_id`,
PROD.`categories_id`,
PROD.`code`,
PROD.`active`,
PROD.`status`,
BRAND.`brand_name`,
CAT.`categories_name`,
IFNULL(SUM(ITEMS.`quantity`), 0) `quantity`,
PROD.`product_image`
FROM
product PROD
LEFT JOIN product_in ITEMS ON ITEMS.`product_id` = PROD.`product_id`
LEFT JOIN brands BRAND ON PROD.`brand_id` = BRAND.`brand_id`
LEFT JOIN categories CAT ON PROD.`categories_id` = CAT.`categories_id`
GROUP BY
ITEMS.`product_id` ';

if (isset($_REQUEST['show-spec'])) {
    $sql .= ' WHERE PROD.`status` = 1 AND PROD.`quantity` > 0 ';
} elseif (isset($_REQUEST['search'])) {
    $search = urldecode($_REQUEST['search']);
    $sql .= " WHERE PROD.`product_name` LIKE '%$search%' OR PROD.`product_alias` LIKE '%$search%' OR code LIKE '%$search%' ";
}
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;


/*
 * OLD
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
} elseif (isset($_REQUEST['search'])) {
    $search = urldecode($_REQUEST['search']);
    $sql .= " WHERE product_name LIKE '%$search%' OR product_alias LIKE '%$search%' OR code LIKE '%$search%' ";
}
 */
