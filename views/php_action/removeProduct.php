<?php

require_once 'core.php';

$valid['success'] = ['success' => false, 'messages' => []];

$productId = $_POST['productId'];

if ($productId) {
  $sql = "UPDATE product SET active = 2, status = 2 WHERE product_id = {$productId}";

  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Removed';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while remove the brand';
  }

  $connect->close();

  echo json_encode($valid);
} // /if $_POST
