<?php

require_once 'core.php';

$valid['success'] = ['success' => false, 'messages' => []];

if ($_POST) {
  $categoriesName = $_POST['categoriesName'];
  $categoriesStatus = $_POST['categoriesStatus'];

  $sql = "INSERT INTO categories (categories_name, categories_active, categories_status) 
	VALUES ('$categoriesName', '$categoriesStatus', 1)";

  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Added';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while adding the members';
  }

  $connect->close();

  echo json_encode($valid);
} // /if $_POST
