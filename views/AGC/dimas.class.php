<?php
/*
* Class: Auto generated contents
* Modules: Google translate integrated
* Engine: Curl lightweight Modded By Dimas Lanjaka
* UAC: Wordpress CRUD Modification
*/

abstract class agc {
  var $root;
  var $cookie;
  var $cache;
  
  function __construct(){
    $this->root = $_SERVER["DOCUMENT_ROOT"];
    $this->cookie = $this->root.'/tmp/cookie.txt';
    $this->cache = $this->root.'/tmp/cache.txt';
  }
  
  function core(){
    require $_SERVER['DOCUMENT_ROOT'] . '/wp-folder.php';
    require $_SERVER['DOCUMENT_ROOT'] . '/wp-session.php';
    require $_SERVER['DOCUMENT_ROOT'] . '/json.php';
    require $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
    require $_SERVER['DOCUMENT_ROOT'] . '/AGC/vendor/autoload.php';
  }
  
  public function session(){
    if (PHP_SESSION_NONE == session_status()) {
      session_start();
    }
  }
  
  public function obs(){
    ob_start();
  }
  
  public function isDump(){
    return isset($_GET['dump']) || isset($_POST['dump']);
  }
}