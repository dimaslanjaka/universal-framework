<?php

if (!isset($_REQUEST['code'])) {
  header('HTTP/1.1 404 Not Found');
  return;
}

# Check if the client already has the requested item
if (
  isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) or
  isset($_SERVER['HTTP_IF_NONE_MATCH'])
) {
  header('HTTP/1.1 304 Not Modified');
  exit;
}

$key = $_REQUEST['code'];
$fallback = "https://unpkg.com/language-icons/icons/$key.svg";
$src = "https://raw.githubusercontent.com/lipis/flag-icon-css/master/flags/4x3/$key.svg";

$test = \img\cache::imageCache($src);

if (!$test) {
  $test = \img\cache::imageCache($fallback);
  if ($test) {
    echo $test;
  }
} else {
  echo $test;
}
