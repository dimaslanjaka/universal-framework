<?php

// im3 instance
if (!defined('ROOT')) {
  define('ROOT', realpath(__DIR__));
}

use Indosat\m3;

$m3 = null;
function m3()
{
  global $m3;
  if (!$m3) {
    $m3 = new m3();
    $m3->set_app_model('Redmi Note 5')->set_imei(919027612808819);
  }
  return $m3;
}
