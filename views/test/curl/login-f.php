<?php

use Extender\request;

$curl = new request('https://sikda-optima.com/');
$cookie = __DIR__ . '/cookie.txt';
$curl->setCookieJar($cookie);
$curl->setCookieFile($cookie);
$curl->setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36');

$arr = [
  'host' => 'sikda-optima.com',
  'origin' => 'https://sikda-optima.com',
  'referer' => 'https://sikda-optima.com/sikda-optima/',
  'sec-fetch-dest' => 'empty',
  'sec-fetch-mode' => 'cors',
  'sec-fetch-site' => 'same-origin',
  'X-Requested-With' => 'XMLHttpRequest',
  'content-length' => '45',
  'content-type' => 'application/x-www-form-urlencoded; charset=UTF-8',
];

$curl->setHeaders($arr);
$curl->post('https://sikda-optima.com/sikda-optima/login/mlogin', 'username=apotik%40kebonjeruk.com&password=123', true);

echo $curl->response;
exit;
