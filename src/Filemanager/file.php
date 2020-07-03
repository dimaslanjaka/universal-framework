<?php

namespace Filemanager;

use MVC\Exception;

class file
{
  public function __construct()
  {
  }

  public static function tmp()
  {
    $root = __DIR__;
    if (defined('ROOT')) {
      $root = ROOT;
    }

    return self::folder($root . '/tmp');
  }

  /**
   * Flush directory.
   *
   * @todo empty the directory, deleting all files except directory
   *
   * @param string $dir
   */
  public static function empty(string $dir)
  {
    if (!file_exists($dir)) {
      \MVC\alert::init()->error('empty folder', $dir . ' not exists');
      return;
    }
    $subdir = new \RecursiveDirectoryIterator($dir, \FilesystemIterator::SKIP_DOTS);
    /**
     * @var \SplFileInfo[]
     */
    $dirs = new \RecursiveIteratorIterator($subdir, \RecursiveIteratorIterator::CHILD_FIRST);
    foreach ($dirs as $file) {
      if (!$file->isDir() && $file->isWritable()) {
        unlink($file);
      }
    }
  }

  /**
   * Recursive delete.
   *
   * @param string $path files or folder
   */
  public static function delete(string $path)
  {
    if (file_exists($path)) {
      if (is_dir($path)) {
        self::deleteDirectory($path);
      } else {
        unlink($path);
      }
    }
  }

  public static function deleteDirectory($dir)
  {
    if ($dir = realpath($dir)) {
      if (!file_exists($dir)) {
        return true;
      }

      if (!is_dir($dir)) {
        return unlink($dir);
      }

      foreach (scandir($dir) as $item) {
        if ('.' == $item || '..' == $item) {
          continue;
        }

        if (!self::deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
          return false;
        }
      }

      return rmdir($dir);
    }
  }

  public static function folder(string $path)
  {
    //$fm = new file();
    if (!is_dir(dirname($path))) {
      mkdir(dirname($path), 0777, true);
    }
    if (!is_dir($path)) {
      mkdir($path, 0777, true);
    }

    return $path;
    //return $fm->_folder_($path);
  }

  /**
   * Create file nested.
   *
   * @param string $path
   * @param bool   $create
   * @param bool   $force
   * @param bool   $append
   * @param bool   $dump
   *
   * @return string
   */
  public static function file(string $path, $create = true, $force = false, $append = false, $dump = false)
  {
    if ($real = realpath($path)) {
      $path = $real;
    }
    $fm = new file();
    // if directory not exists, create it
    if (!is_dir(dirname($path))) {
      mkdir(dirname($path), 0777, true);
    }
    // set option flag
    $option = 0;
    if ($append) {
      $option = FILE_APPEND;
    }
    // if forced or file exists, create it
    if ($force || !file_exists($path)) {
      $create = $fm->determineContent($create);
      if (is_writable(dirname($path))) {
      }
      file_put_contents($path, $create, $option);
    }

    return $path;
    //return $fm->_file_($path, $create, $force, $append, $dump);
  }

  public function determineContent($create)
  {
    if (is_numeric($create) || ctype_digit($create)) {
      $create = (int) $create;
    } elseif (is_string($create)) {
      $create = (string) $create;
    } elseif (is_array($create) || is_object($create)) {
      $create = json_encode($create, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    } else {
      $create = '';
    }

    return $create;
  }

  public static function remove($str)
  {
    $fm = new file();

    return $fm->_unlink_($str);
  }

  public static function get(string $file, bool $parse_json = false)
  {
    resolve_dir(dirname($file));
    //self::cleanDump($file, realpath($file), file_exists($file), is_writable($file));
    $ret = null;
    if (realpath($file)) {
      $file = realpath($file);
    }
    if (file_exists($file)) {
      $ret = file_get_contents($file);
      if ($parse_json && \JSON\json::is_json($ret)) {
        $ret = json_decode($ret, true);
      }
    }

    return $ret;
  }

  public function cleanDump($c, ...$_)
  {
    if (ob_get_level()) {
      ob_end_clean();
      ob_start();
    }
    ev($c, $_);
  }

  public function _unlink_($file)
  {
    if (file_exists($file)) {
      unlink($file);
    }
  }

  /**
   * Create folder recursively.
   *
   * @param string $d      pathname or dirname
   * @param mixed  $root   root directory
   *                       * default $_SERVER['DOCUMENT_ROOT']
   * @param bool   $noroot false will return begins with $root
   *
   * @return string
   */
  public function _folder_($d, $root = null, $noroot = null, $dump = false)
  {
    if (!$root) {
      $root = $_SERVER['DOCUMENT_ROOT'];
    }
    if (preg_match('/(\/admin\/assets\/data\/.*)/m', $d, $cmatch)) {
      $d = $cmatch[1];
    } else {
      $d = str_replace($root, '', $d);
    }
    $explode = explode('/', rtrim($d, '/'));
    $explode = array_filter((array) $explode);

    //$ready = ('WIN' == strtoupper(substr(PHP_OS, 0, 3)) ? '' : '/');
    $ready = '';
    if ('WIN' != strtoupper(substr(PHP_OS, 0, 3))) {
      $ready .= '/';
    }
    foreach ($explode as $x) {
      if (!empty($ready)) {
        $ready .= '/' . $x;
      } else {
        $ready .= $x;
      }
      $status = file_exists($ready);
      if (!$status) {
        $this->mdir($ready);
      }
    }

    if (!file_exists($d)) {
      if (file_exists($root . $d) && !$noroot) {
        $d = $root . $d;
      }
    }

    return $d;
  }

  public function _folder_x($dest, $permissions = 0755, $create = true)
  {
    if (empty($dest)) {
      return $dest;
    }
    if (!is_dir(dirname($dest))) {
      $this->_folder_(dirname($dest), $permissions, $create);
    } elseif (!is_dir($dest)) {
      mkdir($dest, $permissions, $create);
    } else {
      return true;
    }
  }

  public function is_win()
  {
    return 'WIN' === strtoupper(substr(PHP_OS, 0, 3));
  }

  /**
   * Create file and directory recursively.
   *
   * @todo mkdir if not exists then file_put_contents
   *
   * @param string $path   File Path
   * @param bool   $create
   *                       * true to create
   *                       * false to abort create
   * @param bool   $force
   *                       * true force overwrite
   *                       * false not create if exists
   * @param bool   $append append to file
   *
   * @return string filepath
   */
  public function _file_($path, $create = true, $force = false, $append = false, $dump = false)
  {
    $path = $this->smartFilePath($path);
    //$this->_folder_(dirname($path));

    if (false !== $create) {
      $create = $this->determineContent($create);
      //ev(basename($path), dirname($path), $path, $create);
      $root = $this->smartFilePath($_SERVER['DOCUMENT_ROOT']);
      //ev(strpos($path, $root), $path, $root);
      if (false === strpos($path, $root)) {
        $path = $root . $path;
      }
      //ev(file_exists(dirname($path)));
      if (!file_exists(dirname($path))) {
        $this->_folder_(dirname($path), null, null, $dump);
      }
      if ((!file_exists($path) || false !== $force) && $create) {
        try {
          if (!$append) {
            file_put_contents($path, $create, LOCK_EX);
          } else {
            file_put_contents($path, $create, FILE_APPEND | LOCK_EX);
          }
        } catch (\Exception $e) {
          if (ob_get_level()) {
            ob_end_clean();
          }
          exit(json_encode(['error' => $e->getMessage()]));
        }
      }
    }

    return $path;
  }

  public function __istatic()
  {
    $static = !(isset($this) && __CLASS__ == get_class($this));

    return $static;
  }

  /**
   * Smart __DIR__.
   *
   * @param string $dir
   *
   * @return string $dir
   */
  public function _dir_($dir = __DIR__)
  {
    if ('WIN' === strtoupper(substr(PHP_OS, 0, 3))) {
      return str_replace('\\', '/', $dir);
    }

    return $dir;
  }

  /**
   * Smart file path.
   **/
  public function smartFilePath($path)
  {
    if ('WIN' === strtoupper(substr(PHP_OS, 0, 3))) {
      return str_replace('\\', '/', $path);
    }

    return $path;
  }

  /**
   * Create folder 777.
   */
  public function mdir($x)
  {
    //ev($x);
    try {
      $oldmask = umask(0);
      mkdir($x, 0777);
      umask($oldmask);
    } catch (\Throwable $th) {
      echo "{$th->getMessage()} => {$x}";
    }
  }

  public function destroy_old_files($dir, $sec = 3600, $prefix = null)
  {
    if (!is_numeric($sec)) {
      throw new \MVC\Exception('Seconds must be instance of number', 1);
    }
    $mydir = opendir($dir);
    while ($file = readdir($mydir)) {
      if ('.' != $file && '..' != $file) {
        chmod($dir . $file, 0777);
        if (is_dir($dir . $file)) {
          chdir('.');
          while ($dir . $file) {
            if (date('U', filectime($file) >= time() - $sec)) {
              if ($prefix && false !== strpos($file, $prefix)) {
                continue;
              }
              if (is_dir($file)) {
                continue;
              }
              unlink($dir . $file) or die("couldn't delete $dir$file<br />");
            }
          }
        } else {
          unlink($dir . $file) or die("couldn't delete $dir$file<br />");
        }
      }
    }
    closedir($mydir);
  }
}
