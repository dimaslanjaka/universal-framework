<?php

$ip = get_client_ip();
if (isset($_REQUEST['txt'])) {
  echo $ip;
  exit;
} elseif (isset($_REQUEST['json'])) {
  \JSON\json::json(['ip' => $ip]);
  exit;
}

\Cookie\helper::set(str_rot13('ip'), $ip, '10m');
