<?php

//https://sikda-optima.com/sikda-optima/
use Extender\request;

$curl = new request('https://sikda-optima.com/');
$cookie = __DIR__ . '/cookie.txt';
$curl->setCookieJar($cookie);
$curl->setCookieFile($cookie);

$curl->get('/sikda-optima/');

echo $curl->response;
exit;
