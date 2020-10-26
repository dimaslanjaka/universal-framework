<?php



require_once 'db_connect.php';

// echo $_SESSION['userId'];
if (!user()->is_login()) {
  header('location: /');
}
/*
if (!$_SESSION['userId']) {
  header('location: /');
}
*/
