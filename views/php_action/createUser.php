<?php

require_once 'core.php';

$valid['success'] = ['success' => false, 'messages' => []];

if ($_POST) {
  $userName = $_POST['userName'];
  $upassword = md5($_POST['upassword']);
  $uemail = $_POST['uemail'];

  $sql = "INSERT INTO users (username, password,email) 
				VALUES ('$userName', '$upassword' , '$uemail')";
  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Added';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while adding the members';
  }

  // /else
} // if in_array

  $connect->close();

  echo json_encode($valid);
