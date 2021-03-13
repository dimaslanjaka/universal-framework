<?php
if (!isLocalhost()) {
  reCaptcha();
}

$title = $_SESSION['title'] = strip_slashes_recursive(isreq('title'));
$body = $_SESSION['body'] = strip_slashes_recursive(isreq('body'));
$_SESSION['target_translate'] = isreq('target');
