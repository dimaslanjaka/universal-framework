<?php

$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $categoriesName = $_POST['name'];
  $categoriesActive = $_POST['active'];
  $categoriesId = $_POST['id'];
  $categoriesStatus = $_POST['status'];
  $categoriesDescription = $_POST['description'];

  $sql = "UPDATE categories SET categories_name = '$categoriesName', categories_active = '$categoriesActive', categories_status = '$categoriesStatus', categories_description = '$categoriesDescription' WHERE categories_id = '$categoriesId'";
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