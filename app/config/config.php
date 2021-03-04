<?php

/*

 OFFICIAL PANEL SMM PPOB SCRIPT BY MENZCREATE

 Creator:

  - ILMAN SUNANUDDIN | FOUNDER M-PEDIA , M-CREATE

  HTTPS://FACEBOOK.COM/ILMAN.SN

  HTTPS://INSTAGRAM.COM/ILMAN.SN



 */

date_default_timezone_set('Asia/jakarta');

define('DB_HOST', 'localhost');

if ('chandra.smm' != $_SERVER['HTTP_HOST']) {
  $dbn = 'chandra_smm';
  $dbs = 'chandra_smm';
  $dbp = 'dX5d[)_8d*&?';
  $base = 'https://chandrapedia.my.id/public/';
  $wname = 'Chandra Pedia';
} else {
  $dbn = 'chandra_smm';
  $dbs = 'root';
  $dbp = '';
  $base = 'http://chandra.smm/public/';
  $wname = 'Chandra Pedia Development Mode';
}

define('DB_NAME', $dbn);
define('DB_USER', $dbs);
define('DB_PASS', $dbp);
define('BASEURL', $base);
define('WEB_NAME', $wname);

$ttt = new DateTime();

$date = date('Y-m-d');

$time = date('H:i:s');

define('DATE', $date);

define('TIME', $time);
$config = [];
//error_reporting(0);
