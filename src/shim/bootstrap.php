<?php

use JSON\json;

/**
 * Include file if exists.
 *
 * @return include|false
 */
function inc($file)
{
  return file_exists($file) ? include $file : false;
}

/**
 * Sort array key ascending multidimensional supported.
 *
 * @return array
 */
function sort_iterable(array $arrayObj)
{
  $arrayObj = array_map(function ($object) {
    if (\ArrayHelper\helper::is_iterable($object)) {
      $object = sort_iterable($object);
    }

    return $object;
  }, $arrayObj);
  ksort($arrayObj);

  return $arrayObj;
}

/**
 * Exit var_dump with text/plain header.
 *
 * @return void
 */
function ev()
{
  $args = func_get_args();
  if (1 == count($args)) {
    $args = $args[0];
  }
  if (!headers_sent()) {
    header('Content-Type: text/plain; charset=utf-8');
  }
  exit(var_dump($args));
}

/**
 * Var Dump with removing all previous obstacles.
 *
 * @return void
 */
function vd()
{
  $args = func_get_args();
  if (1 == count($args)) {
    $args = $args[0];
  }
  if (ob_get_level()) {
    ob_end_clean();
  }
  var_dump($args);
  exit;
}

/**
 * Exit var_dump with JSON header.
 *
 * @param [type] ...$a
 *
 * @return void
 */
function evj(...$a)
{
  json::json($a);
  exit;
}

/**
 * Fastest Unique ID Generator.
 *
 * @param int $length default 5
 */
function uid($length = 5)
{
  return bin2hex(openssl_random_pseudo_bytes($length / 2));
}

/**
 * Clean string from multiple whitespaces.
 *
 * @param string $string
 *
 * @return string
 */
function clean_string($string)
{
  $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

  return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}

/**
 * Local path to url path conversion.
 *
 * @param string|array $locations
 */
function get_urlpath($locations)
{
  /**
   * @var string|null $get
   */
  $get = function ($location) {
    if (file_exists($location)) {
      return \MVC\helper::get_url_path($location, true);
    }

    return null;
  };
  if (is_string($locations)) {
    return $get($locations);
  } elseif (\ArrayHelper\helper::is_iterable($locations)) {
    foreach ($locations as $location) {
      $result = $get($location);
      if ($result) {
        return $result;
        break;
      }
    }
  }

  return null;
}

/**
 * Include asset with fallback and callback.
 * * if found automatically call include().
 *
 * @param string        $fn       first file to check
 * @param string        $fn2      fallback file to check
 * @param function|null $callback if not exists both, shoul we calling the callback
 *
 * @return void always void
 *
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
function include_asset($fn, $fn2 = null, $callback = null)
{
  if (file_exists($fn)) {
    include $fn;
  } elseif ($fn2 && file_exists($fn2)) {
    include $fn2;
  } elseif (is_callable($callback)) {
    call_user_func($callback, $fn);
  }
}

/**
 * Create <pre/> element from func_get_args().
 *
 * @return void
 */
function pre()
{
  $obj = func_get_args();
  echo '<pre style="word-wrap: break-word;">';
  if (count($obj) > 1) {
    foreach ($obj as $objek) {
      json::json($objek, false, true);
    }
  } else {
    json::json($obj[0], false, true);
  }
  echo '</pre>';
}

/**
 * Create <pre/> element from arguments.
 *
 * @param mixed $obj
 *
 * @return void
 */
function pretext($obj)
{
  echo '<pre style="word-wrap: break-word;">';
  if (is_countable($obj)) {
    if (count($obj) > 1) {
      foreach ($obj as $objek) {
        json::json($objek, false, true);
      }
    } else {
      json::json($obj[0], false, true);
    }
  } else {
    json::json($obj, false, true);
  }
  echo '</pre>';
}

/**
 * var_dump in pre.
 *
 * @return void
 */
function predump()
{
  $obj = func_get_args();
  echo '<pre style="word-wrap: break-word;">';
  if (count($obj) > 1) {
    foreach ($obj as $objek) {
      var_dump($objek);
    }
  } else {
    var_dump($obj[0]);
  }
  echo '</pre>';
}

/**
 * Exit JSON.
 *
 * @return void
 */
function e()
{
  $results = func_get_args();
  if (count($results) > 1) {
    foreach ($results as $check) {
      if (is_string($check) && json::is_json($check)) {
        $check = json_decode($check);
      }
    }
  } else {
    $results = $results[0];
  }
  json::json($results);
  exit;
}

if (!function_exists('is_json')) {
  /**
   * Check is json string.
   *
   * @return bool
   */
  function is_json($string)
  {
    return json::is_json($string);
  }
}

/**
 * Header redirect.
 */
function redirect($url, $exit = true)
{
  header("Location: $url");
  if ($exit) {
    exit;
  }
}

/**
 * Header redirect advance.
 */
function safe_redirect($url, $exit = true)
{
  if (!headers_sent()) {
    return redirect($url, $exit);
  } else {
    echo '<script>location.href = `' . $url . '`;</script>';
  }
  if ($exit) {
    exit;
  }
}

/**
 * Get latest file from folder.
 *
 * @param array $path             Folder path array list
 * @param bool  $return_timestamp false return filename
 *                                ```php
 *                                latestFile([__DIR__ . '/src/MVC/', __DIR__ . '/libs/', __DIR__ . '/views/'])
 *                                ```
 */
function latestFile(array $path, $return_timestamp = true)
{
  $timestamp = 0;
  $file = '';

  foreach ($path as $str_path) {
    if (!is_dir($str_path)) {
      continue;
    }
    $cls_rii = new \RecursiveIteratorIterator(
      new \RecursiveDirectoryIterator($str_path),
      \RecursiveIteratorIterator::CHILD_FIRST
    );

    $ary_files = [];

    foreach ($cls_rii as $str_fullfilename => $cls_spl) {
      if ($cls_spl->isFile()) {
        $ary_files[] = $str_fullfilename;
      }
    }

    $ary_files = array_combine(
      $ary_files,
      array_map('filemtime', $ary_files)
    );

    arsort($ary_files);
    $time = $ary_files[key($ary_files)];
    if ($time > $timestamp) {
      $file = key($ary_files);
      $timestamp = $time;
    }
  }
  if ($return_timestamp) {
    return $timestamp;
  } else {
    return $file;
  }
  //echo "file:" . $file . "\n";
  //echo "time:" . $time;
}

/**
 * Disable direct access static php.
 */
function disable_direct_access_php($file)
{
  if (!file_exists(dirname($file) . '/.htaccess')) {
    \Filemanager\file::file(dirname($file) . '/.htaccess', 'RewriteEngine On
		RewriteRule ^.*\.php$ - [F,L,NC]
		<Files (file|class)\.php>
		order allow,deny
		deny from all
		allow from 127.0.0.1
		allow from 192.168.0.1
		</Files>', true);
  }
}

/**
 * Create nested folder recursively.
 *
 * @return string $dir
 */
function resolve_dir($dir)
{
  $dir = normalize_path($dir);
  recursive_mkdir($dir);

  return $dir;
}

/**
 * Disable output buffering.
 *
 * @return void
 */
function disable_buffering()
{
  // Turn off output buffering
  ini_set('output_buffering', 'off');
  // Turn off PHP output compression
  ini_set('zlib.output_compression', false);

  //Flush (send) the output buffer and turn off output buffering
  while (@ob_end_flush());

  // Implicitly flush the buffer(s)
  ini_set('implicit_flush', true);
  ob_implicit_flush(true);
}

/**
 * Disable user abort.
 *
 * @return ignore_user_abort|null
 */
function disable_abort($abort = false)
{
  if (function_exists('ignore_user_abort')) {
    return ignore_user_abort($abort);
  }
}

function is_aborted()
{
  return CONNECTION_NORMAL != connection_status();
}

/**
 * set Limit execution.
 *
 * @return set_time_limit|null
 */
function set_limit($secs = 0)
{
  if (function_exists('set_time_limit')) {
    return set_time_limit($secs);
  }
}

/**
 * Create dir recursively.
 *
 * @param int  $permissions
 * @param bool $recursive
 */
function recursive_mkdir($dest, $permissions = 0755, $recursive = true)
{
  if (!is_dir(dirname($dest))) {
    recursive_mkdir(dirname($dest), $permissions, $recursive);
  }
  if (!file_exists($dest)) {
    try {
      mkdir($dest, $permissions, $recursive);

      return true;
    } catch (\Throwable $th) {
      return false;
    }
  } else {
    return true;
  }
}

/**
 * Resolve file. (create if not exists).
 *
 * @return string
 * ```php
 * resolve_file('/folder/file', 'content to be writen when not exist');
 * ```
 */
function resolve_file($file, $content = '')
{
  if (!is_dir(dirname($file))) {
    resolve_dir(dirname($file));
  }

  if (!file_exists($file)) {
    file_put_contents($file, $content);
  }

  return $file;
}

/**
 * Convert Windows path to UNIX path.
 *
 * @return string
 */
function normalize_path($path)
{
  $path = str_replace('\\', '/', $path);
  $path = preg_replace('|(?<=.)/+|', '/', $path);
  $path = preg_replace('/\/{2,99}/s', '/', $path);
  if (':' === substr($path, 1, 1)) {
    $path = ucfirst($path);
  }

  return $path;
}

/**
 * Remove root from path.
 */
function remove_root($path)
{
  $path = normalize_path($path);
  $path = str_replace(normalize_path(ROOT), '', $path);

  return $path;
}

/**
 * Shell runner.
 *
 * @return string|null
 */
function shell($command)
{
  $output = null;
  if (function_exists('shell_exec')) {
    $output = shell_exec($command);
  } elseif (function_exists('exec')) {
    exec($command, $output);
  }

  return \ArrayHelper\helper::is_iterable($output) ? json::json($output, false, false) : $output;
}

/**
 * Check shell can be executed.
 *
 * @return string|null
 */
function shell_check()
{
  if (function_exists('shell_exec')) {
    return 'shell_exec';
  } elseif (function_exists('exec')) {
    return 'exec';
  } else {
    return null;
  }
}

function shell_required($callback)
{
  $result = [];
  if ('string' != gettype(shell_check()) || !\MVC\helper::env('dev')) {
    $result = ['error' => true, 'message' => 'Cannot execute command here environtment(' . \MVC\helper::env('dev') . ') command(' . gettype(shell_check()) . ')', 'title' => 'Cannot Access This Page'];
  }
  if (!empty($result)) {
    if (headers_sent()) {
      exit('<div class="alert alert-danger">
      <span class="alert-title"> ' . $result['title'] . ' </span>
      </div>');
    }
  }
}

/**
 * ```php
 * // callback if function
 * call_user_func($callback, $path)
 * ```
 * Read file contents.
 *
 * @param mixed $callback if null not exist return this callback
 *
 * @return string|null NULL if not exists
 *
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
function read_file($path, $callback = null)
{
  if (file_exists($path) && is_readable($path)) {
    if (function_exists('file_get_contents')) {
      return file_get_contents($path);
    } else {
      $handle = fopen($path, 'r');
      $contents = fread($handle, filesize($path));
      fclose($handle);

      return $contents;
    }
  }
  if (is_callable($callback)) {
    return call_user_func($callback, $path);
  }

  return $callback;
}

function write_file($path, $content, $force = false)
{
  resolve_dir(dirname($path));
  if (\ArrayHelper\helper::is_iterable($content)) {
    $content = json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  }
  if ($force || !file_exists($path)) {
    if (!function_exists('file_put_contents')) {
      $fh = fopen($path, 'wa+');
      fwrite($path, $content);
      fclose($fh);
    } else {
      file_put_contents($path, $content);
    }
  }
}

function htmlcomment()
{
  return '<comment style="display:none"> ' . json_encode(func_get_args(), JSON_PRETTY_PRINT) . ' </comment>';
}

function parse_newline($str)
{
  $str = str_replace("\r", '', $str);
  $parsed = explode("\n", $str);
  if ($parsed) {
    return $parsed;
  }

  return [];
}

/**
 * Get Output Buffer Content And Re-construct current output buffer.
 *
 * @return string|false
 */
function ob_get()
{
  $content = ob_get_clean();
  ob_end_clean();
  ob_start();

  return $content;
}

$imageCache = null;
function imgCDN($url)
{
  global $imageCache;
  if (!$imageCache) {
    $imageCache = new \img\cache();
  }
  $imageCache->url2cache($url);
}

/**
 * htaccess generator.
 *
 * @param bool $deny        default deny access. default (true)
 * @param bool $DirectPHP   allow direct php access. default (false)
 * @param bool $allowStatic allow static files access. default (true)
 */
function htaccess($deny = true, $DirectPHP = false, $allowStatic = true)
{
  $ht = '';
  if ($deny) {
    $ht .= 'deny from all';
  }
  if (!$DirectPHP) {
    $ht .= 'RewriteEngine On
    RewriteRule ^.*\.php$ - [F,L,NC]
    <Files (file|class)\.php>
      order allow,deny
      deny from all
      allow from 127.0.0.1
      allow from 192.168.0.1
    </Files>';
  }
  if ($allowStatic) {
    $ht .= '<Files ~ "\.(css|js|png|jpg|svg|jpeg|ico|gif)$">
  Allow from all
</Files>';
  }

  return $ht;
}

/**
 * Is valid email ?
 *
 * @param string $email
 *
 * @return bool
 */
function is_email($email)
{
  return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Is valid url ?
 *
 * @param string $url
 *
 * @return bool
 */
function is_url($url)
{
  return filter_var($url, FILTER_VALIDATE_URL);
}

include __DIR__ . '/../MVC/themes/assets/partial/fab.php';
