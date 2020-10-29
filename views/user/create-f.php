<?php

if (!empty($_POST)) {
  $username = $_POST['username'];
  $name = $_POST['name'];
  $email = $_POST['email'];
  $role = $_POST['role'];
  $password = user()->generate_password($_POST['password']);

  $sql = "INSERT INTO `userdata` (`id`, `display_name`, `email`, `username`, `password`, `created`, `number`, `role`, `last_login`, `last_seen`) VALUES (NULL, '$name', '$email', '$username', '$password', current_timestamp(), NULL, 'admin', current_timestamp(), current_timestamp());";
}
