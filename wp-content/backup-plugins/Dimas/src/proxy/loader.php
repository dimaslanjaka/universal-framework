<?php
$_GLOBAL['ROOT_DIR'] = __DIR__;
ini_set("display_errors", true);
ini_set('output_buffering', 0);

include_once __DIR__ . '/src/DimasProxyParser.php';
include_once __DIR__ . '/src/Service/Service.php';
include_once __DIR__ . '/src/Checker/class.php';
foreach (glob(__DIR__ . "/src/Service/ext/*.php") as $filename) {
  include_once $filename;
}
