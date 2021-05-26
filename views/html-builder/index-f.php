<?php

use Filemanager\file;

if (isset($_REQUEST['fetch'])) {
  $src = file::directoryIterator(__DIR__ . '/src');
  $result = [];
  foreach ($src as $file) {
    if (str_ends_with($file['fullpath'], '.html') && !str_ends_with($file['fullpath'], '.min.html')) {
      $path = $file['fullpath'];
      $name = basename($path, '.html');
      $config = file::get(__DIR__ . '/src/' . $name . '.json', true);
      $result[] = ['href' => "/html-builder/index?render=$name", 'title' => $config['title']];
    }
  }
  e($result);
}

if (isset($_REQUEST['render'])) {
}
