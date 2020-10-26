<?php

require_once 'core.php';

$valid['success'] = ['success' => false, 'messages' => []];

$userid = $_POST['userid'];

if ($userid) {
  $sql = "DELETE FROM users  WHERE user_id = {$userid}";

  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Removed';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while remove the user';
  }

  $connect->close();

  echo json_encode($valid);
} // /if $_POST
