<?php

// telkomsel instance
if (!defined('ROOT')) {
  define('ROOT', realpath(__DIR__));
}

use Telkomsel\api;

if (!isset($user)) {
  $user = new \User\user(CONFIG['database']['user'], CONFIG['database']['pass'], CONFIG['database']['dbname'], CONFIG['database']['host']);
}

$api = null;

/**
 * api telkomsel.
 *
 * @return Telkomsel\api
 */
function telkomsel_api()
{
  global $api, $user;

  if (!$user) {
    $user = new \User\user(CONFIG['database']['user'], CONFIG['database']['pass'], CONFIG['database']['dbname'], CONFIG['database']['host']);
  }
  if (!$api) {
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
  }

  return $api;
}
