<?php
if (!defined('ROOT')) {
  define('ROOT', $_SERVER['DOCUMENT_ROOT']);
}

/**
 * Create folder recursively
 *
 * @param string $d pathname or dirname
 * @param mixed $root root directory
 * * default $_SERVER['DOCUMENT_ROOT']
 * @param bool $noroot false will return begins with $root
 * @return string
 */
function _folder_($d, $root = null, $noroot = null)
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
  $ready = ('WIN' === strtoupper(substr(PHP_OS, 0, 3)) ? '' : '/');
  foreach ($explode as $x) {
    $ready = rtrim($ready, '/');
    $ready .= '/' . $x;
    $status = file_exists($root . $ready);
    if (false === $status) {
      mdir($root . $ready);
    }
  }

  if (!file_exists($d)) {
    if (file_exists($root . $d) && !$noroot) {
      $d = $root . $d;
    }
  }

  return $d;
}

/**
 * Create file and directory recursively
 * @todo mkdir if not exists then file_put_contents
 * @param string $path File Path
 * @param bool $create
 * * true to create
 * * false to abort create
 * @param bool $force
 * * true force overwrite
 * * false not create if exists
 * @param bool $append append to file
 * @return string filepath
 */
function _file_($path, $create = true, $force = false, $append = false)
{
  $path = smartFilePath($path);
  if (strpos($path, '::1')) {
    $rep = is_user_logged_in() ? get_current_user_id() : date('dmy') . '-' . md5($_SERVER['HTTP_USER_AGENT']);
    $path = str_replace('::1', $rep, $path);
  }
  if (false !== $create) {
    if (is_numeric($create) || ctype_digit($create)) {
      $create = (int) $create;
    } else if (is_string($create)) {
      $create = (string) $create;
    } else if (is_array($create) || is_object($create)) {
      $create = json_encode($create, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    } else {
      $create = '';
    }

    if (false === strpos($path, $_SERVER['DOCUMENT_ROOT'])) {
      $path = $_SERVER['DOCUMENT_ROOT'] . $path;
    }
    if (!file_exists(dirname($path))) {
      _folder_(dirname($path));
    }
    if ((!file_exists($path) || false !== $force) && $create) {
      try {
        if (!$append) {
          file_put_contents($path, $create, LOCK_EX);
        } else {
          file_put_contents($path, $create, FILE_APPEND | LOCK_EX);
        }
      } catch (Exception $e) {
        _ob_();
        ob_end_clean();
        exit(json_encode(['error' => $e->getMessage()]));
      }
    }
  }

  return $path;
}
/**
 * Smart __DIR__
 *
 * @param string $dir
 * @return string $dir
 */
function _dir_($dir = __DIR__)
{
  if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    return str_replace('\\', '/', $dir);
  }
  return $dir;
}

/**
 * Smart file path
 **/
function smartFilePath($path)
{
  return str_replace('\\', '/', $path);
}

/**
 * Create folder 777.
 */
function mdir($x)
{
  $oldmask = umask(0);
  mkdir($x, 0777);
  umask($oldmask);
}
