<?php

use JSON\json;
use Telkomsel\api3;
use DB\manager;

user()->admin_required();

$db = new manager();
$api = new api3('https://tdw.telkomsel.com/');
$result['error'] = true;
$result['message'] = 'User Login required. Please relogin from login page';
$result['unauthorized'] = true;
if ($api->is_admin()) {
  echo $db->backup_tables(CONFIG['database']['host'], CONFIG['database']['user'], CONFIG['database']['pass'], CONFIG['database']['dbname'], CONFIG['database']['host']);

  return;
}

exit(json::json($result));
