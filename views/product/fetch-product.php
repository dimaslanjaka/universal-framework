<?php

$sql = 'SELECT product.product_id, product.product_name, product.product_image, product.brand_id, product.categories_id, product.quantity, product.rate, product.active, product.status, brands.brand_name, categories.categories_name FROM product
		INNER JOIN brands ON product.brand_id = brands.brand_id
		INNER JOIN categories ON product.categories_id = categories.categories_id
		WHERE product.status = 1 AND product.quantity > 0';
$query = pdo()->query($sql)->fetch();
JSON\json::json($query['result']);
exit;
