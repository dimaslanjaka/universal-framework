<?php
user()->login_required('/user/login');

$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $consumerName = $_POST['name'];
  $consumerAddress = $_POST['address'];
  $consumerTelp = $_POST['telp'];

  $sql = "INSERT INTO `consumer` (`name`, `address`, `telp`) VALUES ('$consumerName', '$consumerAddress', '$consumerTelp')";
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
