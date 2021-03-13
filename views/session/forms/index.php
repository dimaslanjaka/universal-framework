<?php
if (!isset($core)) {
  $core = new dimas();
}
if (isLocalhost() || isAdmin()) {
  if (isset($_REQUEST['sessions']) || isset($_REQUEST['session'])) {
    if (empty($_REQUEST['session'])) {
      $core->dump($_SESSION);
    } else {
      if (isset($_SESSION[trim($_REQUEST['session'])])) {
        $core->dump($_SESSION[trim($_REQUEST['session'])]);
      } else {
        $core->dump($_SESSION);
      }
    }
  } elseif (isset($_REQUEST['cookie'])) {
    $core->dump($_COOKIE);
  }
}
