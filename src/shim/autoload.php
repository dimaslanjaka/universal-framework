<?php
foreach (glob(__DIR__ . "/*.php") as $filename) {
  //include $filename;
  if ($filename = realpath($filename)) {
    if (basename($filename) != basename(__FILE__)) {
      echo $filename . PHP_EOL;
    }
  }
}
