<?php
user()->login_required('/user/login');

$valid['success'] = ['success' => false, 'error' => true, 'messages' => []];
if (isset($_POST['id'])) {
  $brandId = $_POST['id'];
  $sql = "UPDATE brands SET brand_status = 2 WHERE brand_id = {$brandId}";
  $connect = pdo()->mysqli();
  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Removed';
    $valid['error'] = false;
  } else {
    $valid['error'] = true;
    $valid['success'] = false;
    $valid['messages'] = 'Error while remove the brand';
  }
  $connect->close();
  JSON\json::json($valid);
  exit;
}
