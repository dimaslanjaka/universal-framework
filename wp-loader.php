<?php

if (!ob_get_level()) {
  ob_start();
}
if (!preg_match('/^(agc\.io|127\.0\.0\.1|localhost)/m', $_SERVER['HTTP_HOST'])) {
  error_reporting(E_ALL);
  ini_set('error_reporting', E_ALL);
  ini_set('display_errors', 'Off');
} else {
  error_reporting(E_ALL);
  ini_set('error_reporting', E_ALL);
  ini_set('display_errors', 'On');
}
if (!headers_sent()) {
  $secure = (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? true : false);
  if (strnatcmp(phpversion(), '7.3.0') >= 0) {
    setcookie('cross-site-cookie', 'name', ['samesite' => 'None', 'secure' => true]);
    setcookie('same-site-cookie', 'token', ['samesite' => 'WMI']);
    setcookie('same-site-cookie', 'for', ['samesite' => 'WMI']);
    setcookie('cross-site-cookie', 'bar', ['samesite' => 'None', 'secure' => true]);
  } else {
    header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');
    header('Set-Cookie: HttpOnly;Secure;SameSite=Strict');
    header('Set-Cookie: same-site-cookie=foo; SameSite=Lax');
    header('Set-Cookie: cross-site-cookie=bar; SameSite=None; Secure');
  }
}
require $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
//require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/json.php';
require $_SERVER['DOCUMENT_ROOT'] . '/wp-config-custom.php';

global $wpdb;
global $wp_roles;
if (class_exists('dimas')) {
  $core = new dimas($option);
  $user = new dimas_user($option);
  //$google = new wpgoogle($option);
  $pdo = new dimas_pdo($option);
  $form = new dimas_form($option);
  //$ytube = new YouTubeDownloader($option);
  $YouTube = new YouTube($option);
  $YTChannel = new YouTubeChannel($option);
  $accounting = new dimas_accounting($option);
  $AChain = dimas_accounting::chain(OPT());
}
function OPT()
{
  return unserialize((CUSTOPT));
}
