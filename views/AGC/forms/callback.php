<?php

if (isset($_REQUEST['verify'])) {
  $ver = [];
  if (isset($_SESSION['subscribed'])) {
    $ver['success'] = true;
  } else {
    $ver['fail'] = true;
  }
  exit(cj($ver));
}

$google = google_client();
