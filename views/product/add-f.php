<?php
$valid['success'] = ['success' => false, 'messages' => []];

if (isset($_POST['alias'], $_POST['name'], $_POST['image'])) {
  $productName = $_POST['name'];
  $productAlias = $_POST['alias'];
  $productImage = $_POST['image'];
  $productBrand = $_POST['brand'];
  $productCategory = $_POST['category'];

  $sql = "INSERT INTO product (`product_name`, `product_alias`, `active`, `status`, `categories_id`, `brand_id`, `product_image`) VALUES ('$productName', '$productAlias', '1', '1', '$productCategory', '$productBrand', '$productImage') WHERE NOT EXISTS (SELECT * FROM product WHERE product_name = '$productName' AND product_alias = '$productAlias')";
  $connect = pdo()->mysqli();
  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Added';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while adding the product';
  }

  $connect->close();

  \JSON\json::json($valid);
  exit;
} // /if $_POST
