<?php

use Filemanager\file;

if (isset($_REQUEST['fetch'])) {
  $name = trim(urldecode($_REQUEST['fetch']));
  $config = file::get(__DIR__ . '/src/' . $name . '.json', true);
  $html = file::get(__DIR__ . '/src/' . $name . '.html', true);
  $css = file::get(__DIR__ . '/src/' . $name . '.css', true);
  $js = file::get(__DIR__ . '/src/' . $name . '.js', true);
  e(['config' => $config, 'html' => $html, 'css' => $css, 'js' => $js]);
}
