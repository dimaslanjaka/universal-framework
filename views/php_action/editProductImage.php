<?php

require_once 'core.php';

$valid['success'] = ['success' => false, 'messages' => []];

if ($_POST) {
  $productId = $_POST['productId'];

  $type = explode('.', $_FILES['editProductImage']['name']);
  $type = $type[count($type) - 1];
  $url = '../assets/images/stock/' . uniqid(rand()) . '.' . $type;
  if (in_array($type, ['gif', 'jpg', 'jpeg', 'png', 'JPG', 'GIF', 'JPEG', 'PNG'])) {
    if (is_uploaded_file($_FILES['editProductImage']['tmp_name'])) {
      if (move_uploaded_file($_FILES['editProductImage']['tmp_name'], $url)) {
        $sql = "UPDATE product SET product_image = '$url' WHERE product_id = $productId";

        if (true === $connect->query($sql)) {
          $valid['success'] = true;
          $valid['messages'] = 'Successfully Updated';
        } else {
          $valid['success'] = false;
          $valid['messages'] = 'Error while updating product image';
        }
      } else {
        return false;
      }  // /else
    } // if
  } // if in_array

  $connect->close();

  echo json_encode($valid);
} // /if $_POST
