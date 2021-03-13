<?php
$hia = _file_(__DIR__ . '/socks_hia.txt', '');
$trans = _file_(__DIR__ . '/socks_transparent.txt', '');
$an = _file_(__DIR__ . '/socks_anonymous.txt', '');
$res = [];
//$core->dump(parse_proxy(isreq('p')));
if (parse_proxy(isreq('p'))) {
  $a = new gtrans();
  $c = $a->cURL(false);
  $p = parse_proxy(isreq('p'))[0];
  $c->setProxy($p);
  $c->setProxyTunnel(true);
  $res['proxy'] = $p;
  $res['request'] = $_REQUEST;
  //$c->setUrl('http://httpbin.org/ip');
  $c->setUrl('http://agcontents.000webhostapp.com/gate.php');
  if (isreq('socks5')) {
    $c->setOpt(CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
    $c->setOpt(CURLOPT_FAILONERROR, true);
    $c = get_response($c, 'socks5');
    get_anonimity($c, 'socks5');
  }
  if (isreq('socks4')) {
    $c->setOpt(CURLOPT_PROXYTYPE, CURLPROXY_SOCKS4);
    $c->setOpt(CURLOPT_FAILONERROR, true);
    $c = get_response($c, 'socks4');
    get_anonimity($c, 'socks4');
  }
  $core->hj();
  echo $core->cj($res);
  exit;
}
/**
 * Reset curl response
 *
 * @param Curl\Curl $c
 * @return Curl\Curl
 */
function reset_response($c)
{
  $c->response = false;
  return $c;
}
/**
 * Get anonimity of proxy from response gate
 *
 * @param Curl\Curl $c
 * @param string $sockstype
 * @return void
 */
function get_anonimity($c, $sockstype)
{
  global $res;
  if (!$c->error || isset($res[$sockstype]['res'])) {
    $response = $res[$sockstype]['res'];
    if (!isset($response->HTTP_X_FORWARDED_FOR)) {
      $res[$sockstype]['anon'] = 'Anonymous';
    }
    if (!isset($response->HTTP_X_FORWARDED_FOR, $response->HTTP_VIA, $response->HTTP_FORWARDED, $response->HTTP_X_CLUSTER_CLIENT_IP, $response->HTTP_CLIENT_IP, $response->HTTP_PROXY_CONNECTION)) {
      $res[$sockstype]['anon'] = 'High Anonymous';
    }
    if ($res[$sockstype]['res'] && (isset($response->HTTP_X_REAL_IP) || isset($response->HTTP_VIA) || isset($response->HTTP_FORWARDED) || isset($response->HTTP_X_CLUSTER_CLIENT_IP) || isset($response->HTTP_CLIENT_IP) || isset($response->HTTP_PROXY_CONNECTION))) {
      $res[$sockstype]['anon'] = 'Transparent';
    }
  }
}
/**
 * Get response of proxy from response gate
 *
 * @param Curl\Curl $c
 * @param string $sockstype
 * @return Curl\Curl
 */
function get_response($c, $sockstype, $https = false)
{
  global $res;
  $c->get('https://wp.webmanajemen.com/receiver/gate.php?json');
  if (!$c->error) {
    $res[$sockstype]['https'] = true;
    set_response($c, $sockstype);
    //$c->setOpt(CURLOPT_FOLLOWLOCATION, 1);
    //$c->setOpt(CURLOPT_RETURNTRANSFER, 1);
    if (isreq('google')) {
      $c->get('https://www.google.com');
      $res[$sockstype]['google'] = false;
      $res[$sockstype]['google_code'] = $c->httpStatusCode;
      if (!$c->error) {
        $html = str_get_html($c->response);
        if ($html) {
          if ($html->find('title')) {
            $title = strtolower(trim($html->find('title', 0)->innertext));
            $res[$sockstype]['titles'][] = $title;
            if ($title == 'google') {
              $res[$sockstype]['google'] = true;
            }
          }
        }
      }
    }
    if (isreq('telegram')) {
      $c->get('https://web.telegram.org/#/login');
      $res[$sockstype]['telegram'] = false;
      $res[$sockstype]['telegram_code'] = $c->httpStatusCode;
      if (!$c->error) {
        $html = str_get_html($c->response);
        if ($html) {
          if ($html->find('title')) {
            $title = strtolower(trim($html->find('title', 0)->innertext));
            $res[$sockstype]['titles'][] = $title;
            if ($title == 'telegram web') {
              $res[$sockstype]['telegram'] = true;
            }
          }
        }
      }
    }
    if (isreq('instagram')) {
      $c->get('https://instagram.com/');
      $res[$sockstype]['instagram'] = false;
      $res[$sockstype]['instagram_code'] = $c->httpStatusCode;
      if (!$c->error) {
        $html = str_get_html($c->response);
        if ($html) {
          if ($html->find('title')) {
            $title = strtolower(trim($html->find('title', 0)->innertext));
            $res[$sockstype]['titles'][] = $title;
            if ($title == 'instagram') {
              $res[$sockstype]['instagram'] = true;
            }
          }
        }
      }
    }
    if (isreq('facebook')) {
      $c->get('https://web.facebook.com/?_rdc=1&_rdr');
      $res[$sockstype]['facebook'] = false;
      $res[$sockstype]['facebook_code'] = $c->httpStatusCode;
      if (!$c->error) {
        $html = str_get_html($c->response);
        if ($html) {
          if ($html->find('title')) {
            $title = strtolower(trim($html->find('title', 0)->innertext));
            $res[$sockstype]['titles'][] = $title;
            if ($title == 'facebook' || $c->httpStatusCode == 200) {
              $res[$sockstype]['facebook'] = true;
            }
          }
        }
      }
    }
    if (isreq('youtube')) {
      $c->get('https://youtube.com/');
      $res[$sockstype]['youtube'] = false;
      $res[$sockstype]['youtube_code'] = $c->httpStatusCode;
      if (!$c->error) {
        $html = str_get_html($c->response);
        if ($html) {
          if ($html->find('title')) {
            $title = strtolower(trim($html->find('title', 0)->innertext));
            $res[$sockstype]['titles'][] = $title;
            if ($title == 'youtube') {
              $res[$sockstype]['youtube'] = true;
            }
          }
        }
      }
    }
  } else {
    //$c = reset_response($c);
    $c->get('http://agcontents.000webhostapp.com/gate.php?json');
    set_response($c, $sockstype);
    $res[$sockstype]['https'] = false;
  }
  return $c;
}
/**
 * Set response
 * @param Curl\Curl $c
 * @param string $sockstype
 * @return Curl\Curl
 */
function set_response($c, $sockstype)
{
  global $res;
  $res[$sockstype]['res'] =  $c->response;
  $res[$sockstype]['code'] =  $c->httpStatusCode;
}
