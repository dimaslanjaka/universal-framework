<?php

if (isset($_POST['warehouses']['add'])) {
  unset($_POST['warehouses']['add']);
  $insert = pdo()->insert('warehouses', $_POST['warehouses'])->exec();
  if (isset($insert['error'])) {
    if (!$insert['error']) {
      $insert['message'] = 'Warehouse added successfully';
    } else {
      $insert['message'] = 'Warehouse added failed';
    }
  }
  $insert['title'] = 'Warehouse Management';
  e($insert);
}
