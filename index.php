<?php

require_once __DIR__ . '/vendor/autoload.php';

$path = strtok($_SERVER['REQUEST_URI'], '?');

if ($path == '/') {
  $path = '/index';
}

$rgx_endslash = "/\/{1,99}$/s";
if (preg_match($rgx_endslash, $path)) {
  $path = preg_replace($rgx_endslash, "", $path);
}

$dir = __DIR__ . '/views/' . $path;
$main = __DIR__ . '/views/' . $path . '.php';
$css = __DIR__ . '/views/' . $path . '.css';
$js = __DIR__ . '/views/' . $path . '.js';
$control = __DIR__ . '/controller/' . $path . '.php';
$meta = __DIR__ . '/meta/' . $path . '.json';
$tags = [];

if (file_exists($main)) {
  if (is_file($main)) {
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
  }
} else if (is_dir($dir)) {
  $dir .= "/index";
  die("Location: $dir");
} else {
  $tags['title'] = "404";
  $tags['content'] = __DIR__ . '/views/404.php';
}

if (file_exists($control)) {
  include $control;
}

if (file_exists($js)) {
  $tags['js'] = $js;
}
if (file_exists($css)) {
  $tags['css'] = $css;
}

try {
  $templateParse = new templateParse(__DIR__ . '/theme/bootstrap/template.html');
  $templateParse->ParseTemplate($tags);
} catch (Exception $ex) {
  echo $ex->getMessage();
  die();
}


echo $templateParse->display();
