<?php

use JSON\json;

$username = isset($_REQUEST['user']) ? $_REQUEST['user'] : '';
$password = isset($_REQUEST['pass']) ? $_REQUEST['pass'] : '';
$role = isset($_REQUEST['role']) ? $_REQUEST['role'] : 'client';
$display = isset($_REQUEST['display']) ? $_REQUEST['display'] : 'USER';
$user = user();

if (!empty($username) && !empty($password) && $user->is_admin()) {
  if (!user()->is_login()) {
    json::json(['error' => true, 'message' => 'Login required']);

    return;
  }

  json::json($user->register($username, $password, $display, $role));
  exit;
}
