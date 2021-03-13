<?php
$dbname = 'alquran';
if (!isLocalhost()) {
  $dbname = 'wp497405_alquran';
}
$db = new wpdb(DB_USER, DB_PASSWORD, $dbname, DB_HOST);
