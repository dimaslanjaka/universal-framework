<?php

require_once 'core.php';

$valid['success'] = ['success' => false, 'messages' => []];

if ($_POST) {
  $edituserName = $_POST['edituserName'];
  $editPassword = md5($_POST['editPassword']);
  $userid = $_POST['userid'];

  $sql = "UPDATE users SET username = '$edituserName', password = '$editPassword' WHERE user_id = $userid ";

  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Update';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while updating product info';
  }
} // /$_POST

$connect->close();

echo json_encode($valid);
