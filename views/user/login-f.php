<?php

if (isset($_REQUEST['user']) && isset($_REQUEST['pass'])) {
  $username = $_REQUEST['user'];
  $password = $_REQUEST['pass'];
  if (isset($_REQUEST['g-recaptcha-response'])) {
    // with recaptcha
    $recaptcha = new GoogleExt\recaptcha();
    $recaptcha->verify($_REQUEST['g-recaptcha-response'], function ($success) use ($username, $password) {
      if ($success) {
        dologin($username, $password);
      }
    });
  } else {
    // without recaptcha
    dologin($username, $password);
  }
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

  if (getLimitBanned() && $result) {
    $result = [
      'error' => true,
      'message' => 'Limit reached',
      'title' => 'Limitation',
    ];
  }
  e($result);
}
