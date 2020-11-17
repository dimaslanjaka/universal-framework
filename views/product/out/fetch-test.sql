SELECT
  product_out.`id` AS item_id,
  product_out.`product_id`,
  product_out.`code` AS shipcode,
  product_out.`quantity`,
  product_out.created AS item_created,
  product_out.distributor_id,
  product_out.consumer_id,
  product.`product_name`,
  product.`product_alias`,
  product.`product_image`,
  product.`code` AS pcode,
  product.`status` AS product_status,
  product.`active` AS product_active,
  brands.`brand_name`,
  categories.`categories_name`
FROM
  product_out
  INNER JOIN product ON product.`product_id` = product_out.`product_id`
  INNER JOIN brands ON product.`brand_id` = brands.`brand_id`
  INNER JOIN categories ON product.`categories_id` = categories.`categories_id`