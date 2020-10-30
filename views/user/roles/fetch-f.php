<?php

$result = [];
if (isset($_REQUEST['allow'])) {
  $result = pdo()->get_enum_set_values('roles', 'allow');
} else {
  $allow = pdo()->get_enum_set_values('roles', 'allow');
  $get = pdo()->get_enum_set_values('userdata', 'role');
  foreach ($get as $role) {
    $sql = "SELECT * FROM `roles` WHERE `name` = '$role'";
    $fetch = pdo()->query($sql)->fetch();
    //var_dump($fetch);
    if ($fetch['error']) {
      if ($role == 'superadmin') {
        $combine = implode(',', $allow);
        $sql = "INSERT INTO `roles` (`name`,`allow`) VALUES ('$role','$combine');";
        pdo()->query($sql)->exec();
      } else {
        $sql = "INSERT INTO `roles` (`name`,`allow`) VALUES ('$role','default');";
        pdo()->query($sql)->exec();
      }
    } else {
      if ($role == 'superadmin') {
        $combine = implode(',', $allow);
        $sql = "UPDATE `roles` SET `allow` = '$combine' WHERE `name` = '$role';";
        pdo()->query($sql)->exec();
      }
    }
  }
}



\JSON\json::json($result);
exit;
