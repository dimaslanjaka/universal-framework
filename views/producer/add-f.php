<?php
$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $producerName = $_POST['name'];
  $producerAddress = $_POST['address'];
  $producerTelp = $_POST['telp'];

  $sql = "INSERT INTO `producer` (`name`, `address`, `telp`) VALUES ('$producerName', '$producerAddress', '$producerTelp')";
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
