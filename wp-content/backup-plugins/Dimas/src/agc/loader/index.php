<?php
/*
 * Loader
 */
/*
require $_SERVER['DOCUMENT_ROOT'] . '/AGC/vendor/autoload.php';
require $_SERVER['DOCUMENT_ROOT'] . '/wp-folder.php';
require $_SERVER['DOCUMENT_ROOT'] . '/wp-session.php';
require $_SERVER['DOCUMENT_ROOT'] . '/json.php';
require $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
*/
require realpath(__DIR__ . '/dimas.class.php');
require realpath(__DIR__ . '/dimas.curl.php');
require realpath(__DIR__ . '/dimas.parser.php');
require realpath(__DIR__ . '/dimas.js.php');
require realpath(__DIR__ . '/dimas.sys.php');
require realpath(__DIR__ . '/dimas.google.php');
require realpath(__DIR__ . '/dimas.user.php');
require realpath(__DIR__ . '/dimas.translate.php');

global $wpdb;

$core = new agc;
$core->obs();
$curl = new AGCURL;
$curl = $curl->curl();
$identify = new AGCUSER($wpdb);
$google = new gtrans($curl);
$parser = new AGCPARSER;
$client = getClient();

if (isset($_REQUEST["json"])) {
  header("Content-type: application/json; charset=utf-8");
}

if (isset($_REQUEST["clean"])) {
  if (isset($_REQUEST["google"])) {
    $client->revokeToken();
  }
  session_destroy();
  if (isset($_REQUEST["cookie"])) {
    $core->flush_cookie();
  }
}

if (isset($_REQUEST["cfile"])) {
  $core->dump(['filename' => basename(__FILE__, '.php')]);
}

if (isset($_SESSION["user"])) {
  if (isset($_GET["user"])) {
    $user = $_SESSION["user"];
    $user->registered = email_exists($user->email);
    $user->username = strtok($user->email, '@');
    if (!$user->registered) {
      $user_id = username_exists($user->username);
      if (!$user_id) {
        wp_create_user($user->username, $user->username, $user->email);
      }
    }
    $core->dump($user);
  }
} else {
  //$core->flush_cookie();
}

$nf = basename($_SERVER["SCRIPT_FILENAME"], '.php');
if (!preg_match('/(callback|login)/s', $nf)) {
  $identify->check();
}
