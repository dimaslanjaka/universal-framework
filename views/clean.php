<?php

$directory = __DIR__;

$looper = new RecursiveDirectoryIterator($directory);
foreach (new RecursiveIteratorIterator($looper) as $filename => $cur) {
  $ext = trim($cur->getExtension());
  if ('json' == $ext && realpath($filename)) {
    unlink($filename);
  }
  if ('php' != $ext && is_file($filename)) {
    $content = file_get_contents(realpath($filename));
    if (empty($content)) {
      unlink($filename);
    }
  }
}
