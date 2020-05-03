<?php

use JSON\json;

$username = $_REQUEST['user'];
$password = $_REQUEST['pass'];
$role = $_REQUEST['role'];
$display = $_REQUEST['display'];
if (empty($display)) {
  $display = 'USER';
}
$user = user();
if (!empty($username) && !empty($password)) {
  json::json($user->register($username, $password, $display, $role));
}
