<?php

use Extender\request;

$curl = new request('https://sikda-optima.com/');
$cookie = __DIR__ . '/cookie.txt';
$curl->setCookieJar($cookie);
$curl->setCookieFile($cookie);
$curl->setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36');
$curl->get('https://sikda-optima.com/sikda-optima/dashboard');
echo $curl->response;
exit;
