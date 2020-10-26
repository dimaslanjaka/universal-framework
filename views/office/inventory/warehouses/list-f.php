<?php

if (isset($_POST['change'])) {
  if (isset($_POST['warehouses'])) {
    $update = pdo()->update('warehouses', ['status' => $_POST['warehouses']['status']], ['id' => $_POST['warehouses']['id']])->exec();
    if (isset($update['error'])) {
      if (!$update['error']) {
        $update['message'] = 'Warehouse Status Change Successfully';
      } else {
        $update['message'] = 'Warehouse Status Change Failed';
      }
    }
    $update['title'] = 'Warehouse Status';
    e($update);
  }
}
