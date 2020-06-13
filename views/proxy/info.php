<?php

use JSON\json;
use Proxy\checker;

$proxies = pdo()->select('proxies')->where(['country' => null, 'status' => 'active'])->row_array();

$checker = new checker();
if (!empty($proxies)) {
  foreach (\ArrayHelper\helper::random_array_n(1, $proxies) as $proxy) {
    $result[] = $checker->getCountry($proxy['proxy'], pdo());
  }
  json::json($result);
}
