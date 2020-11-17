<?php

$string = 'TEST';
$secretyKey = 'BlVssQKxzAHFAUNZbqvwS+yKw/m';

if (isset($_REQUEST['secret'])) {
  $secretyKey = trim(urldecode($_REQUEST['secret']));
}
$result = [];
if (isset($_REQUEST['enc'])) {
  $string = trim(urldecode($_REQUEST['enc']));
  $result = aesEncrypt($string, $secretyKey);
} else if (isset($_REQUEST['dec'])) {
  $string = trim(urldecode($_REQUEST['dec']));
  $result = aesDecrypt($string, $secretyKey);
}

$r = ['result' => $result, 'secret' => $secretyKey];

if (isset($_REQUEST['json'])) {
  header('Content-Type: application/json');
  echo json_encode($r);
  exit;
} else if (isset($_REQUEST['txt'])) {
  header('Content-Type: text/plain');
  echo implode(PHP_EOL, $r);
}
