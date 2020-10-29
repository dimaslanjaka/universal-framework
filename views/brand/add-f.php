<?php
user()->login_required('/user/login');

$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $brandName = $_POST['name'];
  $brandGeneric = $_POST['generic'];

  $sql = "INSERT INTO brands (brand_name, brand_generic, brand_active, brand_status) VALUES ('$brandName', '$brandGeneric', '1', '1')";
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
