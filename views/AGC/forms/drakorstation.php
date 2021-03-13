<?php

if (!isLocalhost()) {
  reCaptcha();
  if (is_user_logged_in()) {
    if (isset($_SERVER['HTTP_X_AUTH'])) {
      if ($_SERVER['HTTP_X_AUTH'] != isses('csrf')) {
        template404('Disallowed access', 'Authentication bearer doesnt match');
      }
    } else {
      template404('Disallowed access', 'Authentication bearer doesnt required');
    }
  } else {
    template404('Disallowed access', 'Login Required');
  }
}
