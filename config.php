<?php

/**
 * VSCode require extension php intelephense
 */
require_once __DIR__ . '/vendor/autoload.php';

// set root into current directory
define('ROOT', __DIR__);
resolve_dir(ROOT . '/tmp');
resolve_dir(ROOT . '/src/Session/sessions');

// define cors detector
define('CORS', \MVC\helper::cors());

// define localhost detector
define('LOCAL', \MVC\helper::isLocal());

// define PAGE UNIQUE ID
$uri = \MVC\helper::get_clean_uri();
$uid = md5($uri . \MVC\helper::getRequestIP() . \MVC\helper::useragent());
define('UID', $uid);

// set default timezone
date_default_timezone_set('Asia/Jakarta');

$session = new \Session\session(3600, folder_session());
$router = new \MVC\router();
$router->session = $session;
$router->shutdown('telkomsel');

// start environtment as development for debugging
$env = 'production';
$debug_pdo = 1;

if (in_array($_SERVER['HTTP_HOST'], ['dev.ns.webmanajemen.com']) || LOCAL) {
  $env = 'development';
  $debug_pdo = 3;
}

$router->environtment($env);

define('ENVIRONMENT', $router->get_env());

//show_error();

if (!defined('PDO_DEBUG')) {
  define('PDO_DEBUG', (string) $debug_pdo);
}

$config = \Filemanager\file::get(__DIR__ . '/config.json', true);

if (!CORS) {
  $config['cache']['key'] .= $config['cache']['ext'];
}

define('CONFIG', $config);

// ====== helper

$GLOBALS['config'] = $config;

function get_conf()
{
  if (!$GLOBALS['config']) {
    $GLOBALS['config'] = \Filemanager\file::get(ROOT . '/config.json', true);
  }

  return $GLOBALS['config'];
}

function save_conf(array $newdata)
{
  \Filemanager\file::file(__DIR__ . '/config.json', array_replace(get_conf(), $newdata), true);
}

function get_db()
{
  return $GLOBALS['config']['database'];
}

/**
 * Fastest Unique ID Generator.
 *
 * @param int $length default 5
 */
function uid(int $length = 5)
{
  return bin2hex(openssl_random_pseudo_bytes($length / 2));
}

//======== begin conf [DO NOT EDIT]

// ignore limitation if exists
if (function_exists('set_time_limit')) {
  call_user_func('set_time_limit', 0);
}

// ignore user abort execution to false
if (function_exists('ignore_user_abort')) {
  call_user_func('ignore_user_abort', false);
}

// set output buffering to zero
ini_set('output_buffering', 0);

function useFB()
{
  include ROOT . '/config-fb.php';
}

function useTsel()
{
  if (!function_exists('telkomsel_api')) {
    include ROOT . '/config-tsel.php';
  }
}

function usem3()
{
  if (!function_exists('m3')) {
    include ROOT . '/config-m3.php';
  }
}

function useGoogle()
{
  if (!function_exists('google')) {
    include ROOT . '/config-google.php';
  }
}

//======== end conf
/**
 * @var \User\user
 */
$user = new \User\user(CONFIG['database']['user'], CONFIG['database']['pass'], CONFIG['database']['dbname'], CONFIG['database']['host']);
$pdo = $user->pdo_instance();

function getLimit(int $id_user = 0)
{
  global $user;

  if (!$user) {
    $user = new \User\user(CONFIG['database']['user'], CONFIG['database']['pass'], CONFIG['database']['dbname'], CONFIG['database']['host']);
  }
  if (0 == $id_user) {
    $id_user = $user->userdata('id');
  }
  $limit = [];
  if ($user->is_login()) {
    $limit = pdo()->select('limitation')->where([
      'user_id' => $id_user,
    ])->row_array();
    if (empty($limit)) {
      pdo()->insert_not_exists('limitation', [
        'user_id' => $id_user,
      ])->exec();

      return getLimit();
    }
  }

  return $limit;
}

function getLimitRemaining()
{
  $limit = (array) getLimit();

  if (isset($limit['max']) && isset($limit['success'])) {
    $max = (int) $limit['max'];
    $suc = (int) $limit['success'];
    $remaining = (int) ($max - $suc);
    //var_dump($max, $suc, ($max - $suc));
    return $remaining;
  }

  return 0;
}
function getLimitSuccess()
{
  $limit = (array) getLimit();
  if (isset($limit['success']) && isset($limit['success'])) {
    $max = (int) $limit['success'];

    return $max;
  }

  return 0;
}
function getLimitMax()
{
  $limit = (array) getLimit();
  if (isset($limit['max']) && isset($limit['success'])) {
    $max = (int) $limit['max'];

    return $max;
  }

  return 0;
}

function getLimitBanned()
{
  //var_dump(getLimitRemaining());
  if (user()->is_login()) {
    return getLimitRemaining() <= 0;
  }
}

function addLimitSuccess(int $id_user = 0)
{
  global $user;
  if (0 == $id_user) {
    $id_user = $user->userdata('id');
  }

  return pdo()->sum('limitation', [
    'success' => 1,
  ], [
    'user_id' => $id_user,
  ])->exec();
}

function addLimitMax(int $id_user = 0, int $value)
{
  global $user;
  if (0 == $id_user) {
    $id_user = $user->userdata('id');
  }

  return pdo()->update('limitation', [
    'max' => $value,
  ], [
    'user_id' => $id_user,
  ])->exec();
}

/**
 * user instance.
 *
 * @return \User\user
 */
function user()
{
  global $user;

  return $user;
}
/**
 * user instance.
 *
 * @return \DB\pdo
 */
function pdo()
{
  global $pdo;

  return $pdo;
}

// file scanner
$scanner = new Filemanager\scan();

function scan($dir)
{
}

/**
 * Check if output buffering on.
 *
 * @return ob_get_level
 */
function isob()
{
  return ob_get_level();
}

/**
 * Base URL router.
 *
 * @return void
 */
function base(string $path)
{
  return (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $path;
}

/**
 * Exit JSON.
 *
 * @param mixed $result
 *
 * @return void
 */
function e()
{
  $results = func_get_args();
  if (count($results) > 1) {
    foreach ($results as $check) {
      if (is_string($check) && \JSON\json::is_json($check)) {
        $check = json_decode($check);
      }
    }
  } else {
    $results = $results[0];
  }
  \JSON\json::json($results);
  exit;
}
/**
 * Filemanager Instance.
 *
 * @return void
 */
function filemanager()
{
  return new \Filemanager\file();
}

function ev()
{
  $args = func_get_args();
  if (1 == count($args)) {
    $args = $args[0];
  }
  if (!headers_sent()) {
    header('Content-Type: text/plain; charset=utf-8');
  }
  exit(var_dump($args));
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
  \JSON\json::json($a);
  exit;
}

function clean_string($string)
{
  $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

  return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}

function get_env()
{
  global $router;

  return $router->get_env();
}

function router()
{
  global $router;

  return $router;
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
