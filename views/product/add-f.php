<?php
$valid['success'] = ['success' => false, 'messages' => []];

if (!empty($_POST)) {
  $categoriesName = $_POST['name'];
  $categoriesGeneric = $_POST['description'];

  $sql = "INSERT INTO categories (categories_name, categories_description, categories_active, categories_status) VALUES ('$categoriesName', '$categoriesGeneric', '1', '1')";
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
