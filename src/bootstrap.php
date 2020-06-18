<?php

/**
 * Include file if exists.
 *
 * @param string $file
 *
 * @return include|false
 */
function inc(string $file)
{
  return file_exists($file) ? include $file : false;
}

/**
 * Header redirect.
 *
 * @param string $url
 */
function redirect(string $url, bool $exit = true)
{
  header("Location: $url");
  if ($exit) {
    exit;
  }
}

/**
 * Header redirect advance.
 *
 * @param string $url
 */
function safe_redirect(string $url, bool $exit = true)
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
function latestFile(array $path, bool $return_timestamp = true)
{
  $timestamp = 0;
  $file = '';

  foreach ($path as $str_path) {
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
 *
 * @param string $file
 */
function disable_direct_access_php(string $file)
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
 * @param string $dir
 *
 * @return string $dir
 */
function resolve_dir(string $dir)
{
  $dir = normalize_path($dir);
  recursive_mkdir($dir);

  return $dir;
}

/**
 * Create dir recursively.
 *
 * @param string $dest
 * @param int    $permissions
 * @param bool   $recursive
 */
function recursive_mkdir(string $dest, $permissions = 0755, $recursive = true)
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

function resolve_file(string $file, string $content = '')
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
 * @param string $path
 *
 * @return string
 */
function normalize_path(string $path)
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
 *
 * @param string $path
 */
function remove_root(string $path)
{
  $path = normalize_path($path);
  $path = str_replace(normalize_path(ROOT), '', $path);

  return $path;
}

/**
 * Shell runner.
 *
 * @param string $command
 *
 * @return string|null
 */
function shell(string $command)
{
  $output = null;
  if (function_exists('shell_exec')) {
    $output = shell_exec($command);
  } elseif (function_exists('exec')) {
    exec($command, $output);
  }

  return \ArrayHelper\helper::is_iterable($output) ? \JSON\json::json($output, false, false) : $output;
}

/**
 * Read file contents.
 *
 * @param string $path
 * @param mixed  $callback if null not exist return this callback
 *
 * @return string|null NULL if not exists
 */
function read_file(string $path, $callback = null)
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

function write_file(string $path, $content, bool $force = false)
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

function parse_newline(string $str)
{
  $str = str_replace("\r", '', $str);
  $parsed = explode("\n", $str);
  if ($parsed) {
    return $parsed;
  }

  return [];
}

/**
 * Get Output Buffer Content And Re-construct current output buffer
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
