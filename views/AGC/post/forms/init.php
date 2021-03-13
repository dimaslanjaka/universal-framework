<?php
global $wpdb;

$sql = "INSERT INTO {$wpdb->prefix}agc (post_id,item_stock) VALUES (%d,%s) ON DUPLICATE KEY UPDATE item_stock = %s";
// var_dump($sql); // debug
$sql = $wpdb->prepare($sql, $post_id, $item_stock, $item_stock);
// var_dump($sql); // debug
$wpdb->query($sql);

exit;
