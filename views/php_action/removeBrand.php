<?php

require_once 'core.php';

$valid['success'] = ['success' => false, 'messages' => []];

$brandId = $_POST['brandId'];

if ($brandId) {
  $sql = "UPDATE brands SET brand_status = 2 WHERE brand_id = {$brandId}";

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
