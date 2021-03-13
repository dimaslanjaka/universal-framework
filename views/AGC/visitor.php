<?php
session_start();
ob_start();
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/dom.php';

use \Curl\Curl;

/**
 * Generate a random string, using a cryptographically secure 
 * pseudorandom number generator (random_int)
 * 
 * For PHP 7, random_int is a PHP core function
 * For PHP 5.x, depends on https://github.com/paragonie/random_compat
 * 
 * @param int $length      How many characters do we want?
 * @param string $keyspace A string of all possible characters
 *                         to select from
 * @return string
 */
function random_str($length, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
{
    $pieces = [];
    $max = mb_strlen($keyspace, '8bit') - 1;
    for ($i = 0; $i < $length; ++$i) {
        $pieces []= $keyspace[random_int(0, $max)];
    }
    return implode('', $pieces);
}

$domain_list = <<<EOF
google.ae
google.am
google.as
google.at
google.az
google.ba
google.be
google.bg
google.bi
google.bs
google.ca
google.cd
google.cg
google.ch
google.ci
google.cl
google.co.bw
google.co.ck
google.co.cr
google.co.hu
google.co.id
google.co.il
google.co.im
google.co.in
google.co.je
google.co.jp
google.co.ke
google.co.kr
google.co.ls
google.co.ma
google.co.nz
google.co.th
google.co.ug
google.co.uk
google.co.uz
google.co.ve
google.co.vi
google.co.za
google.co.zm
google.com
google.com.af
google.com.ag
google.com.ar
google.com.au
google.com.bd
google.com.bo
google.com.br
google.com.bz
google.com.co
google.com.cu
google.com.do
google.com.ec
google.com.eg
google.com.et
google.com.fj
google.com.gi
google.com.gt
google.com.hk
google.com.jm
google.com.kw
google.com.ly
google.com.mt
google.com.mx
google.com.my
google.com.na
google.com.nf
google.com.ni
google.com.np
google.com.om
google.com.pa
google.com.pe
google.com.ph
google.com.pk
google.com.pr
google.com.py
google.com.qa
google.com.sa
google.com.sb
google.com.sg
google.com.sv
google.com.tj
google.com.tr
google.com.tw
google.com.ua
google.com.uy
google.com.uz
google.com.vc
google.com.vn
google.cz
google.de
google.dj
google.dk
google.dm
google.ee
google.es
google.fi
google.fm
google.fr
google.gg
google.gl
google.gm
google.gr
google.hn
google.hr
google.ht
google.hu
google.ie
google.is
google.it
google.jo
google.kg
google.kz
google.li
google.lk
google.lt
google.lu
google.lv
google.md
google.mn
google.ms
google.mu
google.mw
google.net
google.nl
google.no
google.nr
google.nu
google.off.ai
google.org
google.pl
google.pn
google.pt
google.ro
google.ru
google.rw
google.sc
google.se
google.sh
google.si
google.sk
google.sm
google.sn
google.tm
google.to
google.tp
google.tt
google.tv
google.uz
google.vg
google.vu
google.ws
EOF;

$dom = explode(PHP_EOL, $domain_list);
$rdom = $dom[array_rand($dom)];
$ldom = "www.".$rdom;

function send($url, $options=false){
$curl = new Curl();
$headers[] = 'Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5'; 
 $headers[] = 'Connection: Keep-Alive';
 $headers[] = 'Cache-Control: max-age=0';
 $headers[] = 'Upgrade-Insecure-Requests: 1';
 $headers[] = 'DNT: 1';
 $headers[] = 'Keep-Alive: 300';
 $headers[] = 'Content-type: */*;charset=UTF-8';
 $headers[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
 $headers[] = "Accept-Language: en-us,en;q=0.5";
 $headers[] = "Pragma: no-cache";
 $headers[] = "Origins: $url";
$curl->setHeaders($headers);
if (isset($options["useragent"]) && !preg_match('(random)', $options["useragent"])){
  $useragent = $options["useragent"];
} else if (isset($options["useragent"]) && preg_match('(random)', $options["useragent"])){
  $useragent = \Campo\UserAgent::random();
} else {
  $useragent ="Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36";
}
$curl->setUserAgent($useragent);
if (isset($options["keyword"]) &&!empty($options["keyword"])){
  $keyword = $options["keyword"];
} else if (empty($options["keyword"]) || !isset($options["keyword"])){
  $a = random_str(32);
  $b = random_str(8, 'abcdefghijklmnopqrstuvwxyz');
  $keyword = $b;
}
if (isset($options["referer"]) && !preg_match('(random)', $options["referer"])){
  $referer = $options["referer"];
} else if (isset($options["referer"]) && preg_match('(random)', $options["referer"])){
  global $ldom;
  $referer = http_build_url("http://user@www.example.com/pub/index.php?a=b#files",
    array(
        "scheme" => "https",
        "host" => $ldom,
        "path" => "search/",
        "query" => "q=".$keyword,
    ),
    HTTP_URL_STRIP_AUTH | HTTP_URL_JOIN_PATH | HTTP_URL_JOIN_QUERY | HTTP_URL_STRIP_FRAGMENT
  );
} else {
  $referer = "https://web-manajemen.blogspot.com";
}
$curl->setReferrer($referer);
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, realpath("cacert.pem"));
$curl->setOpt(CURLOPT_COOKIESESSION, true);
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile("cookie.txt"); $curl->setCookieJar("cookie.txt");
if (isset($options["proxy"])){
  $proxy = $options["proxy"];
} else {
  $proxy = false;
}
if ($proxy){
  $curl->setProxy($proxy);
  $curl->setProxyTunnel();
}
$get = $curl->get($url);
$code = $curl->getInfo(CURLINFO_HTTP_CODE);
if ($proxy == false) $proxy = "Direct";
$html = $get or $curl->getRawResponse();
//src="data:text/html;charset=utf-8,'.htmlentities($html).'"
$html = '<iframe srcdoc="&lt;?xml version=&#34;1.0&#34; encoding=&#34;utf-8&#34;'.htmlentities($html).'" width="80%" style="display:inline-block" frameborder="0"></iframe>';
return '<div style="width:100%">'.$proxy.'=>'.$code.'=>'.$html.'</div>';
}

if (isset($_POST["url"])){
  $opt["proxy"] = (isset($_POST["proxy"]) ? $_POST["proxy"] : false);
  $opt["useragent"] = (isset($_POST["useragent"]) ? $_POST["useragent"] : false);
  $opt["keyword"] = (isset($_POST["keyword"]) ? $_POST["keyword"] : false);
  echo send($_POST["url"], $opt);
} else {
  echo send("https://www.google.com");
}
