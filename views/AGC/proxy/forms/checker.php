<?php

ini_set('display_errors', true);
ini_set('output_buffering', 0);

use Curl\Curl;

require __DIR__ . '/func.php';
if (!isset($core)) {
  $core = new dimas();
}
$checked = [];
$trySock = [];
if (isreq('p')) {
  //$core->dump(cors(1));
}
if (cors() === true || (isreq('admin') && isAdmin())) {
  CurlStart();
  exit;
}

function CurlStart()
{
  global $checked;
  global $core;
  $fileproxy = __DIR__ . '/../../forms/proxy.txt';

  if (!isreq('p') && isAdmin()) {

    $file = file($fileproxy, FILE_SKIP_EMPTY_LINES);
    shuffle($file);
    for ($i = 0; $i < 1; ++$i) {
      foreach (CurlInit($file[$i]) as $key => $value) {
        $checked[$key] = $value;
      }
    }
  } else if (isreq('p', 'post')) {
    $e = preg_split('/\,|\;|\s|\s+/m', isreq('p'));
    $e = array_filter($e);

    for ($i = 0; $i < count($e); ++$i) {
      $E = parse_proxy($e[$i]);
      if ($E) {
        $ei = $E[0];
        foreach (CurlInit($ei) as $key => $value) {
          $checked[$key] = $value;
        }
      }
      if ($i == count($e) - 1) {
        update_proxy($fileproxy);
      }
    }
  }

  $core->dump($checked)[0];
}
/**
 * Detect proxy anonymity
 *
 * @param array $arServer
 * @return void
 */
function detectType($arServer)
{
  if (!empty($arServer)) {
    // check transparnt proxy
    if (isset($arServer['SERVER_ADDR']) && isset($arServer['HTTP_X_FORWARDED_FOR'])) {
      if ($arServer['SERVER_ADDR'] == $arServer['HTTP_X_FORWARDED_FOR']) {
        return 'Transparent proxy';
      }
    }
    if (isset($arServer['HTTP_X_FORWARDED_FOR']) && isset($arServer['SERVER_ADDR'])) {
      if ($arServer['HTTP_X_FORWARDED_FOR'] == $arServer['SERVER_ADDR']) {
        return 'Transparent proxy';
      }
    }
    if (isset($arServer['HTTP_X_FORWARDED_FOR']) && isset($arServer['HTTP_X_REAL_IP'])) {
      if ($arServer['HTTP_X_FORWARDED_FOR'] == $arServer['HTTP_X_REAL_IP']) {
        return 'Transparent proxy';
      }
    }

    // check on anonymous proxy
    if (isset($arServer['HTTP_VIA'])) {
      if (!empty($arServer['HTTP_VIA'])) {
        return 'Anonymous proxy';
      } else {
        return 'High anonymous / Elite proxy';
      }
    }
  }

  return 'Unknown';
}

function CurlInit($proxy, $type = '')
{
  global $trySock;
  global $core;
  if (!is_string($proxy)) {
    return 'Isnt valid string: ' . gettype($proxy);
  }
  $proxy = trim($proxy);
  $p = explode(':', $proxy);
  if (!isset($p[0]) && !isset($p[1])) {
    return 'Isnt valid proxy: ' . $proxy;
  }
  $IP = $p[0];
  $PORT = $p[1];
  $ch = $curl = new Curl();
  //$curl->setHeaders(['Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 'Connection: Keep-Alive', 'Cache-Control: max-age=0', 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7', 'Content-type: */*;charset=UTF-8', 'Pragma: no-cache', 'DNT: 1', 'Accept-Language: en-us,en;q=0.5', 'Keep-Alive: 300', 'Upgrade-Insecure-Requests: 1', 'Origins: https://www.facebook.com', 'X-Requested-With: XMLHttpRequest']);
  $curl->setHeaders(getAllHead());
  $curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
  $curl->setReferrer('http://yandex.ru/');
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
  $curl->setProxy(trim($proxy));
  $curl->setProxyTunnel(true);
  //curl_setopt($ch, CURLOPT_PROXY, $proxy);
  ///curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  //curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);
  //curl_setopt($ch, CURLOPT_HTTPHEADER, getAllHead());
  //$curl->setOpt(CURLOPT_HEADER, 1);
  if ('socks' == $type) {
    $curl->setProxyType(CURLPROXY_SOCKS5);
  } else {
    $curl->setProxyType(CURLPROXY_HTTP);
  }
  //$curl->setTimeout(5);
  $curl->setCookie('checkproxy', 1);
  $curl->setReferrer('http://yandex.ru/');
  $HTML = '';
  $curl->get('http://agcontents.000webhostapp.com/gate.php');
  if ($curl->error) {
    $arServer['SUPPORT_GET'] = false;
    $arServer['CODE'] = $curl->errorCode;
    $arServer['MESSAGE'] = $curl->errorMessage;
  } else {
    $arServer['SUPPORT_GET'] = true;
    $HTML = $curl->response;
  }
  $curl->post('http://agcontents.000webhostapp.com/gate.php');
  if ($curl->error) {
    $arServer['SUPPORT_POST'] = false;
    $arServer['CODE'] = $curl->errorCode;
    $arServer['MESSAGE'] = $curl->errorMessage;
  } else {
    $arServer['SUPPORT_POST'] = true;
    $HTML = $curl->response;
  }
  $curl->setOpt(CURLOPT_CUSTOMREQUEST, 'CONNECT');
  $curl->setUrl('http://agcontents.000webhostapp.com/gate.php');
  $curl->exec();
  if ($curl->error) {
    $arServer['SUPPORT_CONNECT'] = false;
    $arServer['CODE'] = $curl->errorCode;
    $arServer['MESSAGE'] = $curl->errorMessage;
  } else {
    $arServer['SUPPORT_CONNECT'] = true;
    //$HTML = $curl->response;
  }
  if (empty($HTML)) {
    $arServer['ERROR'] = true;
    return [trim($proxy) => $arServer];
  }
  $arTmp = explode('<br>', $HTML);
  $json = json_decode($arTmp[0]);
  $arServer = array_merge($arServer, (array) $json);

  //$arServer['json'] = $json;
  //$arServer['response'] =  $arServer;
  if (isset($arServer['HTTP_COOKIE'])) {
    $arServer['SUPPORT_COOKIE'] = 'checkproxy=1' == $arServer['HTTP_COOKIE'] ? true : false;
  } else {
    $arServer['SUPPORT_COOKIE'] = false;
  }
  $arServer['PROXY_TYPE'] = 'http';
  if (isset($arServer['HTTP_X_FORWARDED_PROTO'])) {
    $arServer['PROXY_TYPE'] = $arServer['HTTP_X_FORWARDED_PROTO'];
  }
  if (!$arServer) {
    if (!in_array($proxy, $trySock)) {
      $trySock[] = $proxy;

      return cURLinit($proxy, 'socks');
    } else {
      return;
    }
  }

  $origin = $curl->get('https://httpbin.org/ip');
  if ($origin) {
    $arServer = array_merge($arServer, (array) $origin);
  }

  $arServer['ANONYMITY'] = detectType($arServer);
  foreach ($arServer as $key => $value) {
    if (preg_match('/^HTTP_[0-9]{1,2}/m', $key)) {
      unset($arServer[$key]);
    }
  }
  $curl->get('https://www.google.com/');
  if ($curl->error) {
    $_SESSION['del'] = array_unique(array_merge((array) trim($proxy), isses('del') ? isses('del') : []));
    $arServer['SUPPORT_GOOGLE'] = false;
  } else {
    $html = str_get_html($curl->response);
    if ($html) {
      $title = $html->find('title', 0)->innertext;
      $code = $curl->httpStatusCode;
      if ('google' == strtolower($title) && 200 == $code) {
        $_SESSION['work'] = array_unique(array_merge((array) trim($proxy), isses('work') ? isses('work') : []));
      }
      $arServer['SUPPORT_GOOGLE'] = true;
    }
  }

  $arServer = array_merge((array) $arServer, (array) getIpInfo(trim($IP)));
  if ($arServer['SUPPORT_GOOGLE']) {
    $arServer['PROXY_TYPE'] = 'http(s)';
  }
  if (in_array($proxy, $trySock)) {
    $arServer['PROXY_TYPE'] = 'socks';
  }

  return [trim($proxy) => $arServer];
}

function getAllHead()
{
  $headers = apache_request_headers();
  $h = [];
  foreach ($headers as $header => $value) {
    $h[] = "$header: $value";
  }

  return $h;
}
