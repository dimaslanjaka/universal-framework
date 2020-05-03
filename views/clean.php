<?php
$directory = __DIR__;

$looper = new RecursiveDirectoryIterator($directory);
foreach (new RecursiveIteratorIterator($looper) as $filename => $cur) {
  $ext = trim($cur->getExtension());
  if ($ext == "json" && realpath($filename)) {
    unlink($filename);
  }
  if ($ext != "php" && is_file($filename)) {
    $content = file_get_contents(realpath($filename));
    if (empty($content)) {
      unlink($filename);
    }
  }
}
