<?php

use JSON\json;
use Proxy\parser;

$parser = new parser();
//$txt = file_get_contents(__DIR__ . '/grab.html');
if (isset($_REQUEST['txt'])) {
  $txt = $_REQUEST['txt'];
  $proxies = $parser->bulk($txt);
  if (!empty($proxies)) {
    foreach ($proxies as $proxy) {
      $parse = array_map('trim', explode(':', $proxy));
      pdo()->insert_update(
    'proxies',
    [
      'proxy' => $proxy,
      'ip' => $parse[0],
      'port' => $parse[1],
    ],
    [
      'proxy' => $proxy,
      'ip' => $parse[0],
      'port' => $parse[1],
    ]
    )->exec();
    }

    json::json($proxies);
    exit;
  }
}
