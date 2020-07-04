<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_POST['userdata'])) {
    if (isset($_POST['userdata']['role'])) {
      $modify = \DB\schema::modify_enumset_values(pdo(), 'userdata', 'role', $_POST['userdata']['role']);
      e($modify);
    }
  }
}
