<?php

namespace Filemanager;

use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class scan
{
  public static $static = null;

  public function __construct($opt = [])
  {
    $this->opt = $opt;
  }

  public static function getStatic()
  {
    if (null === self::$static) {
      self::$static = new self($this->opt);
    }

    return self::$static;
  }

  public static function scanAllFiles($dir, $exclude = '/^(.{1,2}|\.htaccess)$/s')
  {
    $di = new RecursiveDirectoryIterator($dir);
    $result = [];
    foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
      $basename = basename($filename);
      if (preg_match($exclude, $basename)) {
        continue;
      }
      $b['path'] = realpath($filename);
      $b['folder'] = dirname(realpath($filename));
      $b['filename'] = $basename;
      $b['size'] = $file->getSize();
      $result[] = $b;
    }

    return (array) $result;
  }

  public static function scandir($dir)
  {
    return self::scanAllFiles($dir);
  }
}
