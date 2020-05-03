<?php

define('ROOT', __DIR__);
define('PDO_DEBUG', '3');
require_once __DIR__ . '/vendor/autoload.php';

use Crypto\crypt;
use User\user;
use Facebook\client;
use Indosat\m3;
use JSON\json;
use Telkomsel\api;
use Session\session;

// ==== EDIT START
$config = [
  'database' => [
    'user' => 'local',
    'pass' => 'local',
    'dbname' => 'gearbox',
    'host' => 'localhost',
    'port' => 3306
  ]
];
// ==== EDIT END
define('CONFIG', $config);

//======== begin conf [DO NOT EDIT]

# ignore limitation if exists
if (function_exists('set_time_limit')) {
  call_user_func('set_time_limit', 0);
}

# ignore user abort execution to false
if (function_exists('ignore_user_abort')) {
  call_user_func('ignore_user_abort', false);
}

# set output buffering to zero
ini_set('output_buffering', 0);

# start output buffering
ob_start();

# set default timezone
date_default_timezone_set('Asia/Jakarta');


$session = new session();
# start session with timeout 3600 secs
$session->start_timeout(3600);

//======== end conf
/**
 * @var user $user
 */
$user = new user(CONFIG['database']['user'], CONFIG['database']['pass'], CONFIG['database']['dbname'], CONFIG['database']['host']);
$pdo = $user->pdo_instance();
//exit(var_dump($user->pdo_instance()));
/**
 * user instance
 *
 * @return \User\user
 */
function user()
{
  global $user;
  return $user;
}
/**
 * user instance
 *
 * @return \DB\pdo
 */
function pdo()
{
  global $pdo;
  return $pdo;
}

//exit(var_dump($user->pdo_instance()));

# facebook instance
$fb = new client();
function fb()
{
  global $fb;

  return $fb->get_instance();
}
//exit(var_dump(fb()));

# telkomsel instance
//error_reporting(1);
$api = new api($user);
$api->set_device()->set_api('android');
if (isset($_REQUEST['version']) || !isset($_SESSION['version'])) {
  $api->set_version(isset($_REQUEST['version']) ? trim($_REQUEST['version']) : null);
}
if (isset($_REQUEST['device']) || !isset($_SESSION['device'])) {
  $api->set_device(isset($_REQUEST['device']) ? trim($_REQUEST['device']) : null);
}
if (isset($_REQUEST['user-agent']) || !isset($_SESSION['user-agent'])) {
  $api->set_useragent(isset($_REQUEST['user-agent']) ? trim($_REQUEST['user-agent']) : null);
}
if (isset($_REQUEST['set-model'])) {
  if (!isset($_REQUEST['user-agent']) && !isset($_REQUEST['device'])) {
    $api->set_api($_REQUEST['set-model']);
  }
}
//ev($api->get_version());
function telkomsel_api()
{
  global $api;

  return $api;
}
//exit(var_dump(telkomsel_api()));
# im3 instance
$m3 = new m3();
$m3->set_app_model('Redmi Note 5')->set_imei(919027612808819);
function m3()
{
  global $m3;

  return $m3;
}

# file scanner
$scanner = new Filemanager\scan();

function scan($dir)
{
}



/**
 * Check if output buffering on
 *
 * @return ob_get_level
 */
function isob()
{
  return ob_get_level();
}

/**
 * Base URL router
 *
 * @param string $path
 * @return void
 */
function base(string $path)
{
  return (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $path;
}

/**
 * Filemanager Instance
 *
 * @return void
 */
function filemanager()
{
  return new \Filemanager\file();
}

# pre text
function pre(...$obj)
{
  echo '<pre>';
  foreach ($obj as $objek) {
    json::json($objek, false, true);
    echo "\n <center>========</center> \n";
  }
  echo '</pre>';
}




function include_asset($fn, $fn2 = null, $callback = null)
{
  if (file_exists($fn)) {
    include $fn;
  } elseif ($fn2 && file_exists($fn2)) {
    include $fn2;
  } elseif (is_callable($callback)) {
    call_user_func($callback, $fn);
  }
}

function ev(...$a)
{
  if (!headers_sent()) {
    header('Content-Type: text/plain; charset=utf-8');
  }
  exit(var_dump($a));
}

function vd($a, $_ = null)
{
  if (!headers_sent()) {
    header('Content-Type: text/plain; charset=utf-8');
  }
  var_dump($a, $_);
}

function evj(...$a)
{
  json::json($a);
  exit;
}

function clean_string($string)
{
  $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

  return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}



function tsc()
{
  $tsc = 'A301' . date('ymdHiss') . ((int) microtime() * (int) 10000000);
  $exp = explode('.', $tsc);

  return $exp[0];
}

function hashKey($tsc, $brand, $priceplan)
{
  $y = '2ljmmah8031123npr2321lki423sjb3129';
  $parsing = $tsc . $brand . $priceplan . $y;

  return hash('sha256', $parsing);
}

function Map($arr, $callback)
{
  if (!is_callable($callback)) {
    throw new Exception('Callback must be function', 1);
  }

  return array_map(function ($key, $val) use ($callback) {
    return call_user_func($callback, $key, $val);
  }, array_keys($arr), $arr);
}

function strcond($first, $two, $success = null, $error = null)
{
  $src = $first;
  if (!file_exists($src)) {
    $src = $two;
  }
  if (file_exists($src)) {
    if (is_callable($success)) {
      return call_user_func($success, $src);
    } else {
      return $src;
    }
  } else {
    if (is_callable($error)) {
      return call_user_func($error, $src);
    }
  }
}


/**
 * echo print_r in pretext.
 *
 * @param mixed $str
 */
function printr($str, $str1 = 0, $str2 = 0)
{
  echo '<pre>';
  print_r($str);
  if ($str1) {
    print_r($str1);
  }
  if ($str2) {
    print_r($str2);
  }
  echo '</pre>';
}

/**
 * echo json_encode in pretext.
 */
function precom(...$str)
{
  $D = json_encode($str, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  if (headers_sent()) {
    echo '<pre class="notranslate">';
    echo $D;
    echo '</pre>';
  } else {
    return $D;
  }
}

/**
 * cURL shooter request.
 *
 * @param array $opt
 *
 * @return array
 */
function req($opt)
{
  return \Extender\request::static_request($opt);
}

function timestamp($digit)
{
  switch ($digit) {
    case 13:
      return round(microtime(true) * 1000);
      break;

    case 17:
      return round(microtime(true) * 10000);
      break;

    default:
      return time();
      break;
  }
}
