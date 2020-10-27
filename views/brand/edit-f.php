<?php

$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $brandName = $_POST['name'];
  $brandActive = $_POST['active'];
  $brandId = $_POST['id'];
  $brandStatus = $_POST['status'];
  $brandGeneric = $_POST['generic'];

  $sql = "UPDATE brands SET brand_name = '$brandName', brand_active = '$brandActive', brand_status = '$brandStatus', brand_generic = '$brandGeneric' WHERE brand_id = '$brandId'";
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