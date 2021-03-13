<?php

use Curl\Curl;


$google = blogger_client();
$v = validateToken($google);

if (isURL($v)) {
  return wp_redirect2('/AGC/blogger');
}

function error_cb()
{
?>
  <div class="alert alert-danger" role="alert">
    Authentication failed
  </div>
<?php
}

function success_cb()
{
?>
  <div class="alert alert-success" role="alert">
    Authentication success. You will redirected in <span id="timer">3</span> secs
    <script>
      setTimeout(() => {
        location.replace('/AGC/blogger/menu');
      }, 3000);
    </script>
  </div>
<?php
}
