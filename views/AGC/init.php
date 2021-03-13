<?php

if (isLocalhost() || is_user_admin()) {
  if (isset($_REQUEST['session'])) {
    //wpdump($_SESSION);
  } elseif (isset($_REQUEST['cookie'])) {
    //wpdump($_COOKIE);
  }
}
