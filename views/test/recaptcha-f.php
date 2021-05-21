<?php

if (isset($_REQUEST['g-recaptcha-response'])) {
  $recaptcha = new GoogleExt\recaptcha();
  $recaptcha->verify($_REQUEST['g-recaptcha-response'], function ($success, $response, $token) {
    e(func_get_args());
  });
}
