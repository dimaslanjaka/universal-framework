<?php

require __DIR__ . '/../../config.php';

use phpseclib\Net\SSH2;

$config = \Filemanager\file::get(__DIR__ . '/../../.vscode/sftp.json', true);
define('NET_SSH2_LOGGING', SSH2::LOG_COMPLEX);

$ssh = new SSH2($config['host']);
if (!$ssh->login($config['username'], $config['password'])) {
  exit('Login Failed');
}
$dir = isset($_REQUEST['dir']) ? urldecode(trim($_REQUEST['dir'])) : 'views';
$root = $config['remotePath'] . '/' . $dir;
$local = scandir_rec(ROOT . '/' . $dir);
$remote = listFormatted($root, isset($_REQUEST['reload']));

e(['remote' => $remote, 'local' => $local, 'dir' => $dir]);

function scandir_rec($folder)
{
  /**
   * @var SplFileInfo[]
   */
  $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($folder));
  $result = [];
  foreach ($iterator as $file) {
    if ($file->isDir()) {
      continue;
    }
    $result[] = [
      'file' => normalize_path($file->getPathname()),
      'date' => date('c', filectime($file->getPathname())),
      'type' => is_file($file->getPathname()) ? 'file' : 'dir'
    ];
  }
  return $result;
}

/**
 * List formatted output.
 *
 * @param string $root       directory to listed
 * @param string $filtertype
 * @param bool   $scan       force scan
 *
 * @return array
 */
function listFormatted(string $root, bool $scan = false, string $filtertype = '*')
{
  global $ssh;
  $cache = __DIR__ . '/tmp/' . md5($root) . '.json';
  if (file_exists($cache) && !$scan) {
    return json_decode(read_file($cache, '{}'), true);
  }
  $result = [];
  $lists = listFiles($root);
  foreach ($lists as $file) {
    $format = [
      'file' => $file,
      'date' => datemod($file),
      'type' => typefile($file),
    ];
    if ('*' == $filtertype) {
      $result[] = $format;
    } elseif ($filtertype == $format['type']) {
      $result[] = $format;
    }
  }
  write_file($cache, $result, true);

  return $result;
}

function listFiles($root)
{
  global $ssh;
  $list_root = $ssh->exec("cd {$root}; ls -a;");

  $exp = explode("\n", $list_root);
  $exp = array_map(function ($entry) use ($root) {
    $dots = '.' == $entry && '..' == $entry && empty(trim($entry));
    if (!empty(trim($entry)) && !preg_match('/^\./m', trim($entry))) {
      return $root . '/' . $entry;
    }
  }, (array) $exp);

  return array_values(array_filter($exp));
}

function datemod($filename)
{
  global $ssh;
  $loop = $ssh->exec('entry="' . $filename . '"; stat -c %y "$entry";');

  return trim($loop);
}

function typefile($filename)
{
  global $ssh;
  $res = $ssh->exec('PASSED="' . $filename . '";if [[ -d $PASSED ]]; then echo "dir"; elif [[ -f $PASSED ]]; then echo "file"; fi;');

  return trim($res);
}
