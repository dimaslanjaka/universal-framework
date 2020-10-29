<?php

$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $productName = $_POST['name'];
  $productActive = $_POST['active'];
  $productId = $_POST['id'];
  $productStatus = $_POST['status'];
  $productDescription = $_POST['alias'];
  $productUnit = $_POST['unit'];
  $productCode = $_POST['code'];
  $productImage = $_POST['image'];

  $sql = "UPDATE `product` SET `product_name` = '$productName', `active` = '$productActive', `status` = '$productStatus', `product_alias` = '$productDescription', `unit` = '$productUnit', `code` = '$productCode', `product_image` = '$productImage' WHERE `product_id` = '$productId'";
  $connect = pdo()->mysqli();
  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Updated';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while adding the members';
  }

  $connect->close();
  JSON\json::json($valid);
  exit;
  //echo json_encode($valid);
} // /if $_POST