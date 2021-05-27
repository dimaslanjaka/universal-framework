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

// render html
if (isset($_REQUEST['render'])) {
  header('Content-Type: text/html; charset=utf-8');
  $name = trim(urldecode($_REQUEST['render']));
  $config = file::get(__DIR__ . '/src/' . $name . '.json', true);
  $html = file::get(__DIR__ . '/src/' . $name . '.html');
  $css = file::get(__DIR__ . '/src/' . $name . '.css');
  $js = file::get(__DIR__ . '/src/' . $name . '.js');
  if (!empty($html)) {
    $str = '
<html>
 <head>
  <title>' . (isset($config['title']) ? $config['title'] : 'Preview') . '</title>
  <style>' . (!empty($css) ? $css : '') . '</style>
 </head>
 <body>
  ' . $html . '
  <hr/>
  <div><a href="/html-builder/index?raw=' . $name . '">Show HTML</a></div>
  <script>' . (!empty($js) ? $js : '') . '</script>
 </body>
</html>
';

    $doc = new DOMDocument();
    @$doc->loadHTML($str);
    echo $doc->saveHTML();
    exit;
  }
}

// render raw html
if (isset($_REQUEST['raw'])) {
  header('Content-Type: text/plain; charset=utf-8');
  $name = trim(urldecode($_REQUEST['raw']));
  $config = file::get(__DIR__ . '/src/' . $name . '.json', true);
  $html = file::get(__DIR__ . '/src/' . $name . '.html');
  $css = file::get(__DIR__ . '/src/' . $name . '.css');
  $js = file::get(__DIR__ . '/src/' . $name . '.js');
  if (!empty($css)) {
    echo "<style>$css</style>" . PHP_EOL;
  }
  if (!empty($html)) {
    echo $html . PHP_EOL;
  }
  if (!empty($js)) {
    echo "<script>$js</script>" . PHP_EOL;
  }
  exit;
}
