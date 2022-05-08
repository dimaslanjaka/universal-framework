<?php
/*
foreach (glob(__DIR__ . "/src/Service/ext/*.php") as $filename) {
  include_once $filename;
}
*/

spl_autoload_register(function ($class_name) {
  $path = smartFilePath(__DIR__ . '/' . $class_name . '.php');
  if (!file_exists($path) && !class_exists($class_name)) return;
  $_SESSION['class'][$class_name] = $path;
  include $path;
});
