<?php

use Curl\Curl;

class AGCURL
{
  public function curl()
  {
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
    $headers[] = 'Origins: https://translate.google.co.id';
    $curl->setHeaders($headers);
    //$curl->setUserAgent($_SERVER["HTTP_USER_AGENT"]);
    $curl->setUserAgent('Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36');
    $curl->setReferrer('https://translate.google.co.id/m/translate');
    $curl->setOpt(CURLOPT_ENCODING, 'gzip');
    $curl->setOpt(CURLOPT_AUTOREFERER, true);
    $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
    $curl->setOpt(CURLOPT_RETURNTRANSFER, true);
    $curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
    $cookie = defined(COOKIEFILE) ? COOKIEFILE : __DIR__ . '/cookie.txt';
    $curl->setCookieFile($cookie);
    $curl->setCookieJar($cookie);
    $this->curl = $curl;

    return $curl;
  }
  /**
   * Image CDN
   *
   * @param string $url
   * @return void
   */
  public function imgcdn($url)
  {
    $curl = $this->curl();
    $x = 'https://imgcdn.000webhostapp.com/?json=1&url=' . urlencode($url);
    //precom($x);
    $r = $curl->get($x);
    if ($r && !$curl->error) {
      return $curl->response;
    }
  }
}
