/* Original */
SELECT
  product.*,
  brands.brand_name,
  categories.categories_name
FROM
  product
  INNER JOIN brands ON product.brand_id = brands.brand_id
  INNER JOIN categories ON product.categories_id = categories.categories_id;
  /* Case 1 */
SELECT
  PROD.*,
  brands.brand_name,
  categories.categories_name,
  IFNULL(SUM(ITEMS.`quantity`), 0) quantity
FROM
  product PROD
  LEFT JOIN product_in ITEMS ON ITEMS.`product_id` = PROD.`product_id`
  INNER JOIN brands ON PROD.brand_id = brands.brand_id
  INNER JOIN categories ON PROD.categories_id = categories.categories_id
GROUP BY
  ITEMS.`product_id`;
  /* CASE 2 fix merged quantity */
SELECT
  PROD.product_id,
  PROD.product_name,
  PROD.product_alias,
  PROD.product_image,
  PROD.brand_id,
  PROD.categories_id,
  PROD.code,
  BRAND.brand_name,
  CAT.categories_name,
  IFNULL(SUM(ITEMS.`quantity`), 0) quantity
FROM
  product PROD
  LEFT JOIN product_in ITEMS ON ITEMS.`product_id` = PROD.`product_id`
  LEFT JOIN brands BRAND ON PROD.brand_id = BRAND.brand_id
  LEFT JOIN categories CAT ON PROD.categories_id = CAT.categories_id
GROUP BY
  ITEMS.`product_id`;
  /*FINAL*/
SELECT
  PROD.`product_id`,
  PROD.`product_name`,
  PROD.`product_alias`,
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
  ITEMS.`product_id`