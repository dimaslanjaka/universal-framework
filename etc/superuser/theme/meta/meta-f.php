<?php

use Filemanager\file;
use Filemanager\scan;
use JSON\json;

user()->admin_required();

if (isset($_REQUEST['fetch'])) {
  $theme = new MVC\themes();
  $scan = scan::scandir($theme->config_folder);
  for ($i = 0; $i < count($scan); ++$i) {
    $file = $scan[$i];
    $path = realpath($file['path']);
    if (false !== strpos(serialize($file), 'theme-admin') || !isset($file['path'])) {
      unset($scan[$i]);
      continue;
    }
    if (!$path) {
      unlink($file['path']);
      unset($scan[$i]);
      continue;
    }

    // exclude some
    if (!isset($scan[$i]['content'])) {
      unset($scan[$i]);
      continue;
    }
    // check if view content exists
    $contentFile = \MVC\helper::platformSlashes(ROOT) . $scan[$i]['content'];
    if (!file_exists($contentFile)) {
      // if view content not exist, delete it
      unlink($file['path']);
      unset($scan[$i]);
      continue;
    }
  }
  $scan = array_values(array_filter($scan));
  e($scan);
}

if (isset($_REQUEST['config'])) {
  $config = $_REQUEST;
  $path = $config['config'];
  //unset($config['config']);
  if (isset($config['theme'])) {
    $config['theme'] = 0 == (int) $config['theme'] ? false : true;
  }
  if ($path = realpath($path)) {
    //file::file($path, $config, true);
    if (CORS) {
      json::json([
        'success' => true,
      ]);
      exit;
    }
  }
}
