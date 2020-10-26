<?php

require_once 'core.php';

$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $brandName = $_POST['editBrandName'];
  $brandStatus = $_POST['editBrandStatus'];
  $brandId = $_POST['brandId'];

  $sql = "UPDATE brands SET brand_name = '$brandName', brand_active = '$brandStatus' WHERE brand_id = '$brandId'";

  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Updated';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while adding the members';
  }

  $connect->close();
  JSON\json::json($valid);
  //echo json_encode($valid);
} // /if $_POST
