SELECT
  product_out.`id` AS item_id,
  product_out.`product_id`,
  product_out.`code` AS shipcode,
  product_out.`quantity`,
  product_out.created AS item_created,
  product.`product_name`,
  product.`product_alias`,
  product.`product_image`,
  product.`code` AS pcode,
  product.`status` AS product_status,
  product.`active` AS product_active,
  brands.`brand_name`,
  distributor.`name` AS distributor_name,
  distributor.`address` AS distributor_addr,
  distributor.`telp` AS distributor_telp,
  categories.`categories_name`
FROM
  product_out
  INNER JOIN product ON product.`product_id` = product_out.`product_id`
  INNER JOIN distributor ON product_out.`distributor_id` = distributor.`id`
  INNER JOIN brands ON product.`brand_id` = brands.`brand_id`
  INNER JOIN categories ON product.`categories_id` = categories.`categories_id`