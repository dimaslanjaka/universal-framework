SELECT
  product_in.`id` AS item_id,
  product_in.`product_id`,
  product_in.`code` AS shipcode,
  product_in.`quantity`,
  product_in.created AS item_created,
  product.`product_name`,
  product.`product_alias`,
  product.`product_image`,
  product.`code` AS pcode,
  product.`status` AS product_status,
  product.`active` AS product_active,
  brands.`brand_name`,
  producer.`name` AS producer_name,
  producer.`address` AS producer_addr,
  producer.`telp` AS producer_telp,
  categories.`categories_name`
FROM
  product_in
  INNER JOIN product ON product.`product_id` = product_in.`product_id`
  INNER JOIN producer ON product_in.`producer_id` = producer.`id`
  INNER JOIN brands ON product.`brand_id` = brands.`brand_id`
  INNER JOIN categories ON product.`categories_id` = categories.`categories_id`