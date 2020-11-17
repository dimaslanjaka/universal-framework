<?php
user()->login_required('/user/login');

$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $distributorName = $_POST['name'];
  $distributorAddress = $_POST['address'];
  $distributorTelp = $_POST['telp'];

  $sql = "INSERT INTO `distributor` (`name`, `address`, `telp`) VALUES ('$distributorName', '$distributorAddress', '$distributorTelp')";
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
