<?php

$json = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/config.json'), true);

$localhost = CONFIG['database']['host'];
$username = CONFIG['database']['user'];
$password = CONFIG['database']['pass'];
$dbname = CONFIG['database']['dbname'];

/*
user();
$current = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
if ($_SERVER['HTTP_HOST'] == 'localhost') $current .= $_SERVER['SERVER_PORT'];

if ($json['domain'] == 'localhost') {
  $store_url = "http://{$json['domain']}:{$json['port']}/";
} else {
  $store_url = "http://{$json['domain']}/";
}
*/

// db connection
$connect = new mysqli($localhost, $username, $password, $dbname);
// check connection
if ($connect->connect_error) {
  die('Connection Failed : ' . $connect->connect_error);
} else {
  // echo "Successfully connected";
}
