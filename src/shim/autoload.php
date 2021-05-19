<?php

foreach (glob(__DIR__ . '/*.php') as $filename) {
  if ($filename = realpath($filename)) {
    if (basename($filename) != basename(__FILE__)) {
      include $filename;
    }
  }
}
