<?php

include __DIR__ . '/init.php';
if (!isset($google)) {
  $google = new wpgoogle();
}
$core->dump([
  'admin' => $isAdmin,
  'data' => $userdata,
  'meta' => $usermeta,
  'google' => $google->fetch_google_user()
]);
