<?php

header('X-Robots-Tag: noindex, nofollow', true);
header('Content-Type: text/event-stream');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Cache-Control: no-cache');

function SEND($id, array $msg)
{
  echo "id: $id" . PHP_EOL;
  $data = trim(json_encode($msg));
  echo "data: $data" . PHP_EOL;
  echo PHP_EOL;
  ob_flush();
  flush();
}

$serverTime = time();

SEND($serverTime, []); //'server time: ' . date('h:i:s', time())
exit;
