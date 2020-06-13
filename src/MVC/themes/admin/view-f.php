<?php

//FORM Controller

use Filemanager\file;
use JSON\json;

if (isset($_REQUEST['config'])) {
  $config = $_REQUEST;
  $path = $config['config'];
  unset($config['config']);
  if (isset($config['theme'])) {
    $config['theme'] = 0 == (int) $config['theme'] ? false : true;
  }
  if ($path = realpath($path)) {
    file::file($path, $config, true);
    json::json([
      'success' => true,
    ]);
  }
  exit;
}
