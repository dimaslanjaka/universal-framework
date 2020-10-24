<?php

require_once __DIR__ . '/vendor/autoload.php';

$path = strtok($_SERVER['REQUEST_URI'], '?');

if ($path == '/') {
  $path = '/index';
}

$main = __DIR__ . '/views/' . $path . '.php';
$control = __DIR__ . '/controller/' . $path . '.php';
$meta = __DIR__ . '/meta/' . $path . '.json';
$tags = [];

if (file_exists($main)) {
  $tags['content'] = $main;
  $metaArr  = [
    'title' => basename($main),
    'description' => basename($main)
  ];
  if (!file_exists($meta)) {
    file_put_contents($meta, json_encode($metaArr));
    $tags = array_merge($tags, $metaArr);
  } else {
    $parse = json_decode(file_get_contents($meta), true);
    $tags = array_merge($tags, $parse);
  }
} else {
  $tags['title'] = "404";
  $tags['content'] = __DIR__ . '/views/404.php';
}

if (file_exists($control)) {
  include $control;
}

try {
  $templateParse = new templateParse(__DIR__ . '/theme/template.html');
  $templateParse->ParseTemplate($tags);
} catch (Exception $ex) {
  echo $ex->getMessage();
  die();
}


echo $templateParse->display();
