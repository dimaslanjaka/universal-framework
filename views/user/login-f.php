<?php

if (isset($_REQUEST['user']) && isset($_REQUEST['pass'])) {
  $username = $_REQUEST['user'];
  $password = $_REQUEST['pass'];
  dologin($username, $password);
}

if (isset($_REQUEST['check'])) {
  user()->check_login(function ($session) {
    e($session);
  });
}

function dologin($username, $password)
{
  $result = user()->login($username, $password);
  if (isset($result['error'])) {
    if (!$result['error']) {
      $result['redirect'] = isset($_REQUEST['redirect']) ? urldecode($_SERVER['redirect']) : '/dashboard';
    }
  }

  e($result);
}
