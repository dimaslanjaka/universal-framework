<?php

use Google\recaptcha;
use JSON\json;

$user = user();
if (isset($_REQUEST['user']) && isset($_REQUEST['pass'])) {
  $username = $_REQUEST['user'];
  $password = $_REQUEST['pass'];
  $result = $user->login($username, $password);
  json::json($result);
  exit;
}
if (isset($_REQUEST['check'])) {
  $user->check_login(function ($session) {
    exit(json::json($session));
  });
} else {
  $user->check_login(function ($session) {
    exit(header('Location: /dashboard'));
  });
}
