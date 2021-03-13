<?php

if (!isreq('q', 'post')) {
  return;
}
$agc = new gtrans();
$curl = $agc->cURL();
$proxyF = ROOT . '/views/AGC/forms/proxy.txt';
$proxies = file($proxyF, FILE_SKIP_EMPTY_LINES);
$proxies = array_map('trim', $proxies);
$res = [];
if (!empty($proxies)) {
  $curl->setProxy(randP());
  $curl->setProxyTunnel(true);
  $query = preg_replace('/\s|\s+/m', '+', isreq('q'));
  $agc->fetch_contents($curl, "https://www.google.com/search?q={$query}&oq={$query}&aqs=chrome..69i57j0l7.3008j0j4&sourceid=chrome&ie=UTF-8", 'SE');

  if ($curl->error) {
    $res['error'] = true;
    $res['code'] = $curl->errorCode;
    $res['message'] = $curl->errorMessage;
    $res['proxy'] = $curl->getOpt(CURLOPT_PROXY);
    //_file_($proxyF, str_replace(file_get_contents($proxyF)))
  } else {
    $html = str_get_html($curl->response);
    $res['title'] = $html->find('title', 0)->innertext;
    if ($html->find('a')) {
      foreach ($html->find('a') as $a) {
        if (isset($a->href) && !empty($a->href)) {
          $parse = parse_url2($a->href);
          if (!isset($parse['host']) || (isset($parse['host']) && preg_match('/google\.|googleusercontent\.|youtube\.com|facebook\.|twitter\./m', $parse['host']))) {
            continue;
          }
          $res['link'][] = $a->href;
        }
      }
    }
    $res['success'] = true;
    $res['code'] = $curl->httpStatusCode;
    $res['message'] = $curl->response;
  }
} else {
  $res['error'] = true;
  $res['message'] = 'proxy_empty';
}
ksort($res);
$core->dump($res);

function randP()
{
  global $proxies;
  return $proxies[array_rand($proxies)];
}

exit;
