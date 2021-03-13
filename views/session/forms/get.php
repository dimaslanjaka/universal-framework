<?php

if (!(isset($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW'])
  && $_SERVER['PHP_AUTH_USER'] == 'a'
  && $_SERVER['PHP_AUTH_PW'] == 'b')) {
  header('WWW-Authenticate: Basic realm="Restricted area"');
  header('HTTP/1.1 401 Unauthorized');
  exit;
}
if (isset($_REQUEST['name']) && !empty($_REQUEST['name'])) {
  header("Content-Type: text/plain");
  $req = isreq('name');
  if ($req != 'csrf-key' && $req != 'csrf-salt' && $req != 'csrf-iv') {
    exit(isses($req));
  }
} else if (isreq('check')) {
  $ex = isses('csrf-expire');
  $added = strtotime($ex) + (60 * 5);
  $dex = date('Y-m-d H:i:s', $added);
  $core->dump([
    'csrf' => isses('csrf'),
    'date_created' => $ex,
    'date_expired' => $dex,
    'date_now' => getDatetimeNow(),
    'expired' => $dex <= getDatetimeNow()
  ]);
} else if (isreq('delete')) {
  unses('csrf');
  unses('csrf-expire');
  unses('csrf-set');
  exit;
}
