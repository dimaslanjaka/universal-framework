<?php

if (isset($_POST['bemail'])) {
  $e = strtolower(trim($_POST['bemail']));
  if (strpos($e, '@blogger.com') && filter_var($e, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['for'] = $e;
  }
}
