<?php

if (!empty($_POST)) {
  $username = $_POST['username'];
  $name = $_POST['name'];
  $email = $_POST['email'];
  $role = $_POST['role'];
  $numberPhone = $_POST['phone'];
  $password = user()->generate_password($_POST['password']);

  $sql = "INSERT INTO `userdata` (`display_name`, `email`, `username`, `password`, `number`, `role`) VALUES ('$name', '$email', '$username', '$password', '$numberPhone', '$role');";
}
