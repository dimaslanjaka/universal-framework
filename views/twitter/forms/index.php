<?php

use Curl\Curl;

$url = 'https://twitter.com/users/email_available?email=';
if (isset($_REQUEST['email']) && filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL) && !isset($_REQUEST['bulk'])) {
  $e = trim($_REQUEST['email']);
  $R = [];
  $curl = new Curl();
  $headers[] = 'Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5';
  $headers[] = 'Connection: Keep-Alive';
  $headers[] = 'Cache-Control: max-age=0';
  $headers[] = 'Upgrade-Insecure-Requests: 1';
  $headers[] = 'DNT: 1';
  $headers[] = 'Keep-Alive: 300';
  $headers[] = 'Content-type: */*;charset=UTF-8';
  $headers[] = 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7';
  $headers[] = 'Accept-Language: en-us,en;q=0.5';
  $headers[] = 'Pragma: no-cache';
  $headers[] = 'Origins: https://www.revdl.com';
  $curl->setHeaders($headers);
  $curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
  $curl->setReferrer('https://www.facebook.com');
  if (isset($_REQUEST['proxy']) && !empty($_REQUEST['proxy'])) {
    if (preg_match_all('/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/m', trim($_REQUEST['proxy']))) {
      $R['proxy'] = $_REQUEST['proxy'];
      $curl->setProxy(trim($_REQUEST['proxy']));
      $curl->setProxyTunnel();
    }
  }
  $curl->setCookieFile(TEMP . '/cookie.txt');
  $curl->setCookieJar(TEMP . '/cookie.txt');
  $curl->get($url . $e);
  $res = $curl->response;
  if ($curl->error) {
    $R['error'] = 'Request Error ' . (isset($R['proxy']) ? $R['proxy'] : false);
  } else {
    if (is_object($res)) {
      if (isset($res->valid) && $res->valid) {
        $R['success'] = 'Email Available';
      } else {
        $R['error'] = 'Email Unavailable';
      }
    }
  }
  $core->dump($R);
} /*elseif (isset($_REQUEST['bulk'])) {
  $r = [];
  $email = (isset($_REQUEST['email']) ? $_REQUEST['email'] : false);
  $proxy = (isset($_REQUEST['proxy']) ? $_REQUEST['proxy'] : false);
  if ($email) {
    $email = explode("\n", $email);
  }
  if ($proxy) {
    $proxy = preg_match_all('/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/m', $proxy, $matches);
    if ($proxy) {
      echo 'Using ' . count($matches[0]) . " Proxies\n";
    }
  }
  $core->vardump($email, $proxy, $matches[0]);
}
*/