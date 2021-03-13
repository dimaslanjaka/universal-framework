<?php

/**
 * Websocket server.
 */
header('X-Robots-Tag: noindex, nofollow', true);
header('Content-Type: text/event-stream');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Cache-Control: no-cache');
if (isset($_SERVER['HTTP_SEC_WEBSOCKET_KEY'])) {
  header('Connection: Upgrade');
  header('HTTP/1.1 101 Web Socket Protocol Handshake');
  header('Host: ' . $_SERVER['SERVER_NAME']);
  header('X-Accel-Buffering: no');
  header('Upgrade: websocket');
  header('WebSocket-Origin: ' . $_SERVER['SERVER_NAME']);
  header('WebSocket-Location: http://' . $_SERVER['HTTP_HOST'] . '/ajax/server');
  $_SESSION['serv'] = $_SERVER;
  header('Sec-WebSocket-Accept: ' . base64_encode(pack('H*', sha1($_SERVER['HTTP_SEC_WEBSOCKET_KEY'] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'))));
}
header('Access-Control-Allow-Origin: *');

function SEND($id, $msg)
{
  global $AChain;
  global $user;
  $login = $user->islogin();
  $data = ['msg' => $msg];
  //$parse_url = parse_url($_SERVER['HTTP_REFERER']);
  if ($login) {
    $data = [
      'pendapatan_max_invoice' => $AChain->get_records_current_month('invoice', 'pdate', 'AND type = \'pendapatan\'')->count(1),
      'piutang_max_invoice' => $AChain->get_records_current_month('invoice', 'pdate', 'AND type = \'piutang\'')->count(1),
      'hutang_max_invoice' => $AChain->get_records_current_month('invoice', 'pdate', 'AND type = \'hutang\'')->count(1),
      'pengeluaran_max_invoice' => $AChain->get_records_current_month('invoice', 'pdate', 'AND type = \'pengeluaran\'')->count(1),
    ];
  } elseif (isset($_SERVER['HTTP_REFERER'])) {
    $p = parse_url($_SERVER['HTTP_REFERER']);
    if (isset($p['path'])) {
      $root = $_SERVER['DOCUMENT_ROOT'];
      $tmp = $root . '/tmp/';
      switch ($p['path']) {
        case preg_match('/^\/AGC\//s', $p['path']) ? true : false:
          $dir = $root . '/views/AGC';
          $log = file_exists($dir . '/log.txt') ? file($dir . '/log.txt', FILE_SKIP_EMPTY_LINES) : null;
          $data = ['log' => $log];
          break;

        default:
          $data = ['debug' => ['serv' => $_SERVER, 'sess' => $_SESSION]];
          break;
      }
    }
  }
  echo "id: $id" . PHP_EOL;
  $data = $AChain->trim($AChain->cj($data));
  echo "data: $data" . PHP_EOL;
  echo PHP_EOL;
  ob_flush();
  flush();
}

$serverTime = time();

SEND($serverTime, 'server time: ' . date('h:i:s', time()));
exit;
