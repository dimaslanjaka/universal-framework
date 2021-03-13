<?php
require __DIR__ . '/func.php';
if (!isset($core)) {
  $core = new dimas;
}
ini_set('output_buffering', 0);
if (!class_exists('Curl\Curl')) {
  require_once realpath(__DIR__ . '/../../../vendor/autoload.php');
}
if (!function_exists('str_get_html')) {
  require_once realpath(__DIR__ . '/../../../wp-content/plugins/Dimas/src/wp/wp-dom.php');
}
error_reporting(1);

if (isreq('single', 'post')) {
  $core->dump(check_proxy(isreq('single')));
}

if (isreq('update', 'post')) {
  $core->dump(update_proxy($file_proxy));
}
if (isset($_SERVER['HTTP_X_PROXY']) || isAdmin()) {
  if (isreq('get', 'post') || (isAdmin() && isreq('get'))) {
    $res = grab_proxy();
    $core->dump($res);
    exit;
  }

  if (isreq('default', 'post')) {
    echo implode("", file($file_proxy, FILE_SKIP_EMPTY_LINES));
    exit;
  }
}

sess('title', 'Google proxy article builder');
