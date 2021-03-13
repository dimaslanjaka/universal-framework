<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST' && !isset($_REQUEST['dimas'])) {
  header("HTTP/1.0 404 Not Found");
}
header('Content-type: application/json; charset=utf-8');
$x = date('D m Y H:i:s');
if (isset($_REQUEST['default'])) {
  $_REQUEST['key'] = '8fdf5ac4e1aea99e8931c14e846d99a4';
}
define('root', $_SERVER['DOCUMENT_ROOT']);
include 'db.php';
DB::$error_handler = false; // since we're catching errors, don't need error handler
DB::$throw_exception_on_error = true;

$key = trim((isset($_REQUEST['key']) && !empty($_REQUEST['key']) ? trim($_REQUEST['key']) : exit($x)));
//$domain = trim((isset($_REQUEST['domain']) ? $_REQUEST['domain'] : exit('domain empty')));
$status = trim((isset($_REQUEST['status']) ? $_REQUEST['status'] : 'inactive'));
$gjson = trim((isset($_REQUEST['gjson']) ? $_REQUEST['gjson'] : 'NULL'));
$product = trim((isset($_REQUEST['product']) ? $_REQUEST['product'] : 'NULL'));
$api = trim((isset($_REQUEST['api']) ? $_REQUEST['api'] : 'NULL'));

//$insert = "INSERT INTO `keys` (`key`, `status`, `domain`, `date`, `api`, `gjson`, `product`) VALUES ('$key', '$status', '$domain', current_timestamp(), '$api', '$gjson', '$product');";
$get = "SELECT * FROM `keys` WHERE keyid = '$key'";
$R = DB::query($get);

$o = [];
if (isset($_REQUEST['get'])) {
  if ($R) {
    if (isset($_REQUEST['api'])) {
      if (isset($R[0]['api'])) {
        $o['api'] = $R[0]['api'];
      }
    }
    if (isset($_REQUEST['gjson'])) {
      if (isset($R[0]['gjson'])) {
        $o['gjson'] = json_decode($R[0]['gjson']);
      }
    }
    if (isset($_REQUEST['product'])) {
      if (isset($R[0]['product'])) {
        $o['product'] = $R[0]['product'];
      }
    }
    if (isset($_REQUEST['get-update'])) {
      if (isset($R[0]['product'])) {
        $m = root . '/' . md5('f') . '/';
        switch ($R[0]['product']) {
          case 'all':
            echo readfile($m . md5('all') . '/index.php');
            break;
          case 'rental':
            # code...
            break;
          case 'shortlink':
            # code...
            break;
          case 'encrypter':
            # code...
            break;
          case 'gallery':
            # code...
            break;
          case 'youtube':
            # code...
            break;
        }
      }
    }
  }
}

$ref = (isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null);
if (isset($_REQUEST['insert']) && $ref && preg_match('/bf381b7f471a138b77c125da93bd0960|bd9a9f02cb3baccc5d026d98cc59db18/m', $ref)) { }
if (isset($_REQUEST['update']) && $key) {
  if ($R) {
    $sql = 'UPDATE `keys` SET ';
    if (isset($_REQUEST['status'])) {
      $sql .= ' status = \'' . $_REQUEST['status'] . '\'';
    }
    if (isset($_REQUEST['api']) && !empty($_REQUEST['api'])) {
      $sql .= ' api = \'' . $_REQUEST['api'] . '\'';
    }
    if (isset($_REQUEST['gjson']) && !empty($_REQUEST['gjson'])) {
      $sql .= ' gjson = \'' . $_REQUEST['gjson'] . '\'';
    }
    $sql .= ' WHERE keyid = \'' . $key . '\'';
    DB::query($sql);
  }
}
if (!empty($o)) {
  echo json_encode((array) $o, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
function download($file)
{
  if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename=' . basename($file));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    ob_clean();
    flush();
    readfile($file);
    exit;
  }
}
