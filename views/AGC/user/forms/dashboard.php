<?php

include __DIR__ . '/init.php';
if (is_user_logged_in()) {
  if ('POST' == $_SERVER['REQUEST_METHOD']) {
    if (isset($_POST['blogger_email'])) {
      $mail = $_SESSION['for'] = trim($_POST['blogger_email']);
      update_user_meta(get_current_user_id(), 'blogger_email', $mail);
    }
  }
}
if (!isset($google)) {
  $google = new wpgoogle();
}
