<?php

if (!empty($_POST)) {
  $id = $_POST['id'];

  $sql = "UPDATE `roles` SET `allow` = 'edit-categories,edit-user,add-user' WHERE `roles`.`id` = '$id';";
}
