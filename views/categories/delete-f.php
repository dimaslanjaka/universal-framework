<?php
$valid['success'] = ['success' => false, 'error' => true, 'messages' => []];
if (isset($_POST['id'])) {
  $categoriesId = $_POST['id'];
  $sql = "UPDATE categories SET categories_status = 2 WHERE categories_id = {$categoriesId}";
  $connect = pdo()->mysqli();
  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Removed';
    $valid['error'] = false;
  } else {
    $valid['error'] = true;
    $valid['success'] = false;
    $valid['messages'] = 'Error while remove the categories';
  }
  $connect->close();
  JSON\json::json($valid);
  exit;
}
