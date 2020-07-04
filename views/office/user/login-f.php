<?php

if (isset($_REQUEST['user'], $_REQUEST['pass'])) {
  $login = user()->login($_REQUEST['user'], $_REQUEST['pass']);
  if (isset($login['error'])) {
    if (!$login['error']) {
      $login['redirect'] = 'index';
    }
  }
  e($login);
}
