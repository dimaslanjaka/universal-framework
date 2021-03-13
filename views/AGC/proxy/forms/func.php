<?php

use Curl\Curl;

if (!isset($core)) {
  $core = new dimas;
}
$del = [];
$work = [];
$file_proxy = ROOT . '/views/AGC/forms/proxy.txt';

function check_proxy($p)
{
  global $del;
  global $work;
  global $file_proxy;
  if (!empty(trim($p))) {
    $cc = cc();
    $cc->setProxy(trim($p));
    $cc->setProxyTunnel(true);
    $cc->get('https://www.google.com/');
    if ($cc->error) {
      $del[] = trim($p);
      $_SESSION['del'] = array_unique(array_merge($del, isses('del') ? isses('del') : []));
      return ['google' => $cc->errorCode, 'proxy' => trim($p), 'title' => $cc->errorMessage];
    } else {
      $html = str_get_html($cc->response);
      if ($html) {
        $title = $html->find('title', 0)->innertext;
        $code = $cc->httpStatusCode;
        if ('google' == strtolower($title) && 200 == $code) {
          $work[] = trim($p);
          $_SESSION['work'] = array_unique(array_merge($work, isses('work') ? isses('work') : []));
        }
        return ['proxy' => trim($p), 'title' => $title, 'google' => $code];
      }
    }
  }
}

function getIpInfo($IP)
{
  $agc = new gtrans();
  $curl = $agc->cURL(true);
  $arServer = [];
  $detail = $agc->fetch_contents($curl, 'http://api.ipstack.com/' . $IP . '?access_key=8a4331b696240fb5452c49fe37111f0a&format=1', 'json', ['filehour' => 290, 'fileExt' => 'json']);
  if (!$detail->error && is_object($detail->response) || is_array($detail->response)) {
    $arServer = array_merge($arServer, (array) $detail->response);
  }
  $detail2 = $agc->fetch_contents($curl, 'https://ipapi.co/' . $IP . '/json/', 'json', ['filehour' => 290, 'fileExt' => 'json']);
  if (!$detail2->error && is_object($detail2->response) || is_array($detail2->response)) {
    $arServer = array_merge($arServer, (array) $detail2->response);
  }
  return $arServer;
}

function update_proxy($file_proxy)
{
  $del = (array) isses('del');
  if (empty($del)) {
    return false;
  }
  $data = str_replace($del, PHP_EOL, file_get_contents($file_proxy) . PHP_EOL . implode(PHP_EOL, isses('work') ? isses('work') : []));
  $lines = preg_split('/\s|\s+/m', $data);
  $proxy = array_values(array_filter($lines));
  $proxy = array_values(array_unique($proxy));
  for ($i = 0; $i < count($proxy); $i++) {
    if (!strpos($proxy[$i], ':')) {
      unset($proxy[$i]);
    }
  }
  file_put_contents($file_proxy, implode(PHP_EOL, $proxy), LOCK_EX);
  return $proxy;
}

function cc($url = null)
{
  $curl = new Curl();
  $curl->setHeaders(['Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 'Connection: Keep-Alive', 'Cache-Control: max-age=0', 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7', 'Content-type: */*;charset=UTF-8', 'Pragma: no-cache', 'DNT: 1', 'Accept-Language: en-us,en;q=0.5', 'Keep-Alive: 300', 'Upgrade-Insecure-Requests: 1', 'Origins: https://www.facebook.com', 'X-Requested-With: XMLHttpRequest']);
  $curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
  $curl->setReferrer('http://web.archive.org/engine/scrapper.jsx');
  $curl->setOpt(CURLOPT_ENCODING, 'gzip');
  $curl->setOpt(CURLOPT_AUTOREFERER, true);
  $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
  $curl->setOpt(CURLOPT_CAINFO, realpath(__DIR__ . '/cacert.pem'));
  $curl->setOpt(CURLOPT_RETURNTRANSFER, true);
  $curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
  $curl->setOpt(CURLOPT_VERBOSE, true);
  $c = defined('COOKIEFILE') ? COOKIEFILE : __DIR__ . '/cookie.txt';
  $curl->setCookieFile($c);
  $curl->setCookieJar($c);
  $curl->url = $url;

  return $curl;
}
