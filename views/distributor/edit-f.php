<?php
user()->login_required('/user/login');

$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $distributorName = $_POST['name'];
  $distributorAddr = $_POST['address'];
  $distributorId = $_POST['id'];
  $distributorTelp = $_POST['telp'];

  $sql = "UPDATE `distributor` SET `name` = '$distributorName', `address` = '$distributorAddr', `telp` = '$distributorTelp' WHERE `id` = '$distributorId'";
  $connect = pdo()->mysqli();
  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Updated';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while editting the distributor';
  }

  $connect->close();
  JSON\json::json($valid);
  exit;
  //echo json_encode($valid);
} // /if $_POST