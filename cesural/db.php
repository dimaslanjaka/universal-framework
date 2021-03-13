<?php
session_start();
$localname = "localhost";
$username = "id7747892_dimaslanjaka";
$password = "bangsadpo0l";
$localdbname = "id7747892_dimaslanjaka";

$local["host"] = $localname;
$local["user"] = $username;
$local["pass"] = $password;
$local["dbname"] = $localdbname;
define('DB_NAME', $localdbname);
define('DB_USER', $username);
define('DB_PASS', $password);
include 'class_db.php';
DB::$user = 'id7747892_dimaslanjaka';
DB::$password = 'bangsadpo0l';
DB::$dbName = 'id7747892_dimaslanjaka';
// Create connection
$localconn = $mysqli = new mysqli($localname, $username, $password, $localdbname);

/* check connection */
if ($mysqli->connect_errno) {
  printf("Connect failed: %s\n", $mysqli->connect_error);
  exit();
}

/* check if server is alive */
if ($mysqli->ping()) {
  //printf("Our connection is ok!\n");
} else {
  printf("Error: %s\n", $mysqli->error);
  die();
}

$dblog = array();
// Check connection
if ($localconn->connect_error) {
  die("Connection failed: " . $localconn->connect_error);
} else {
  $dblog["connection"] = "Connected successfully\n";
}
if (mysqli_connect_errno()) {
  printf("Connect failed: %s\n", mysqli_connect_error());
  exit();
}
$mysqli->select_db($local["dbname"]);

$localdbname = $local["dbname"];
//database connect
$localcon = $c = mysqli_connect($local["host"], $local["user"], $local["pass"]) or die(mysqli_error($localcon));

$selectdb = mysqli_select_db($localcon, $localdbname) or die(mysqli_error($localcon));
$encoding = mysqli_query($localcon, "SET NAMES utf8");
if (false === $encoding) {
  die("Encoding UTF-8 Failed\n");
} else {
  //echo "UTF-8 Encoded\n";
  $query = "SELECT ID FROM token_all";
  $result = mysqli_query($localcon, $query);
  $query2 = "SELECT ID FROM removed";
  $result2 = mysqli_query($localcon, $query2);
  if (false === $result) {
    $result = mysqli_query($localcon, "CREATE TABLE IF NOT EXISTS `token_all` (
  `token` varchar(255) DEFAULT NULL,
  `id` varchar(32) NOT NULL DEFAULT '',
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
");
  } else if (false === $result2) {
    $result = mysqli_query($localcon, "CREATE TABLE IF NOT EXISTS `removed` (
  `token` varchar(255) DEFAULT NULL,
  `id` varchar(32) NOT NULL DEFAULT '',
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
");
  } else if (false === mysqli_query($c, 'SELECT * FROM keys')) {
    mysqli_query($c, "CREATE TABLE `keys` (
  `id` int(11) NOT NULL,
  `keyid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8_unicode_ci NOT NULL,
  `domain` text COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `keys` (`id`, `keyid`, `status`, `domain`, `date`) VALUES
(1, '8fdf5ac4e1aea99e8931c14e846d99a4', 'active', '" . $_SERVER['HTTP_HOST'] . ",agc.akarmas.com', '2019-08-02 19:38:34');");
  }
} //encoding
