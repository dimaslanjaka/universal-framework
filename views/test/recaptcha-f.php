<?php

use JSON\json;

if (isset($_REQUEST['g-recaptcha-response'])) {
  $recaptcha = new GoogleExt\recaptcha();
  $recaptcha->verify($_REQUEST['g-recaptcha-response'], function ($success, $response, $token) {
    e([$success, $response, $token]);
  });
}
