<?php

require_once 'core.php';

$valid['success'] = ['success' => false, 'messages' => []];

$orderId = $_POST['orderId'];

if ($orderId) {
  $sql = "UPDATE orders SET order_status = 2 WHERE order_id = {$orderId}";

  $orderItem = "UPDATE order_item SET order_item_status = 2 WHERE  order_id = {$orderId}";

  if (true === $connect->query($sql) && true === $connect->query($orderItem)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Removed';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while remove the brand';
  }

  $connect->close();

  echo json_encode($valid);
} // /if $_POST
