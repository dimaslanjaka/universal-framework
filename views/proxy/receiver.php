<?php

use JSON\json;
use Proxy\parser;

$parser = new parser();

$proxy = isset($_REQUEST['save']) ? $_REQUEST['save'] : null;
if ($proxy) {
  $proxies = $parser->bulk($proxy);
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
