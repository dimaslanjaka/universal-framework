<?php

if (isset($_REQUEST['select'])) {
  $sel = user()->select(trim(urldecode($_REQUEST['select'])));
  // unset password
  if (isset($sel['password'])) unset($sel['password']);
  e($sel);
}

if (isset($_REQUEST['login'])) {
  if (isset($_REQUEST['user']) && isset($_REQUEST['pass'])) {
    $login = user()->login($_REQUEST['user'], $_REQUEST['pass']);
    if ($login) {
      e(['error' => false, 'message' => 'Login Successful']);
    }
    e(['error' => true, 'message' => 'Login Failed']);
  }
}

user()->check_login(function ($session) {
  e($session);
});
