<?php

use Google\recaptcha;
use JSON\json;

$user = user();
if (isset($_REQUEST['user']) && isset($_REQUEST['pass'])) {
  recaptcha::verifyCaptcha(function () use ($user) {
    $username = $_REQUEST['user'];
    $password = $_REQUEST['pass'];
    $result = $user->login($username, $password);

    if (getLimitBanned() && $result) {
      json::json([
        'error' => true,
        'message' => 'Limit reached',
        'title' => 'Limitation',
      ]);
      exit;
    } else {
      json::json($result);
      exit;
    }
  });
  exit;
}

if (isset($_REQUEST['check'])) {
  $user->check_login(function ($session) {
    exit(json::json($session));
  });
} else {
  if ($user->is_login()) {
    exit(header('Location: /dashboard'));
  }
}
