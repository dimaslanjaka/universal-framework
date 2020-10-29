<?php
user()->login_required('/user/login');

$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $producerName = $_POST['name'];
  $producerAddr = $_POST['address'];
  $producerId = $_POST['id'];
  $producerTelp = $_POST['telp'];

  $sql = "UPDATE `producer` SET `name` = '$producerName', `address` = '$producerAddr', `telp` = '$producerTelp' WHERE `id` = '$producerId'";
  $connect = pdo()->mysqli();
  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Updated';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while editting the producer';
  }

  $connect->close();
  JSON\json::json($valid);
  exit;
  //echo json_encode($valid);
} // /if $_POST