<?php
$valid['success'] = ['success' => false, 'messages' => []];

if (isset($_POST['alias'], $_POST['name'], $_POST['image'])) {
  $productName = $_POST['name'];
  $productAlias = $_POST['alias'];
  $productImage = $_POST['image'];

  $sql = "INSERT INTO product (`product_name`, `product_alias`, `active`, `status`) VALUES ('$productName', '$productAlias', '1', '1')";
  $connect = pdo()->mysqli();
  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Added';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while adding the members';
  }

  $connect->close();

  \JSON\json::json($valid);
  exit;
} // /if $_POST
