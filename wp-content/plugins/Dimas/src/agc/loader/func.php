<?php

/** Script By Dimas Lanjaka (L3n4r0x) **/
date_default_timezone_set("Asia/Jakarta");

//require 'init.php';
//require 'dom-helper.php';


function issetor(&$var, $default = false)
{
  return isset($var) ? $var : $default;
}

function get_ip()
{
  try {
    $get = file_get_contents("https://json.geoiplookup.io/api");
    $json = json_decode($get);
    $result = $json["ip"];
  } catch (Exception $e) {
    $get = file_get_contents("https://ipapi.co/json/");
    $json = json_decode($get);
    $result = $json["ip"];
  }
  return $result;
}

function determine_user()
{
  $result = get_client_ip();
  if (!isset($_SERVER['HTTP_USER_AGENT'])) {
    exit("User Agent Required");
  } else {
    $result .= "~" . $_SERVER['HTTP_USER_AGENT'];
  }
  return md5($result);
}



function UA()
{
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5";
  $userAgentArray[] = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36 OPR/49.0.2725.47";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:52.0) Gecko/20100101 Firefox/52.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36 OPR/49.0.2725.64";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/62.0.3202.94 Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0";
  $userAgentArray[] = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0;  Trident/5.0)";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; rv:52.0) Gecko/20100101 Firefox/52.0";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/63.0.3239.84 Chrome/63.0.3239.84 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0;  Trident/5.0)";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:57.0) Gecko/20100101 Firefox/57.0";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0";
  $userAgentArray[] = "Mozilla/5.0 (iPad; CPU OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 Mobile/15B202 Safari/604.1";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0) Gecko/20100101 Firefox/58.0";
  $userAgentArray[] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Safari/604.1.38";
  $userAgentArray[] = "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36";
  $userAgentArray[] = "Mozilla/5.0 (X11; CrOS x86_64 9901.77.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.97 Safari/537.36";

  $getArrayKey = array_rand($userAgentArray);
  return $userAgentArray[$getArrayKey];
}

function cloudinary()
{
  /*
$randomcdn = ["christekh","yaffa-publishing","teepublic","hamaka","thefader","jpress","lush","reverb","gym","Amc-theatres","amc-theatres","dot-to-dot-design","nho","kartrocket","secretfnetworkforces","hostelling-internation","bash","test123","simpleview","abc","admin","dimaslanjaka"];
$cdns = "https://res.cloudinary.com/".$randomcdn[mt_rand(0, count($randomcdn) - 1)]."/image/fetch/";
//return $cdns;
*/
  return "https://dimaslanjakakumalaindra.000webhostapp.com/proxy/images_cloudinary?url=";
}
function fetch($url, $z = null)
{
  $_SESSION["peek"] = $url;
  $ch =  curl_init();
  if (strpos($url, "https") !== false) {
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  }
  $useragent = isset($z['useragent']) ? $z['useragent'] : 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:10.0.2) Gecko/20100101 Firefox/10.0.2';
  if (isset($z["dump"])) curl_setopt($ch, CURLOPT_HEADER, 1);
  if (isset($z["headers"])) curl_setopt($ch, CURLOPT_HTTPHEADER, $z["headers"]);
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_AUTOREFERER, true);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($ch, CURLOPT_POST, isset($z['post']));

  if (isset($z['post']))         curl_setopt($ch, CURLOPT_POSTFIELDS, $z['post']);
  if (isset($z['refer']))        curl_setopt($ch, CURLOPT_REFERER, $z['refer']);
  /*
if (isset($_SESSION["prxwork"])){
curl_setopt($ch, CURLOPT_PROXY, $_SESSION["prxwork"]);
} else */
  if (isset($z["proxy"])) {
    curl_setopt($ch, CURLOPT_PROXY, $z["proxy"]);
  }
  curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, (isset($z['timeout']) ? $z['timeout'] : 5));

  $cookie = (isset($z['cookiefile']) ? $z['cookiefile'] : realpath("../tmp/cookie.txt"));
  curl_setopt($ch, CURLOPT_COOKIEJAR,  $cookie);
  curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie);

  if (isset($z['verbose'])) {
    curl_setopt($ch, CURLOPT_VERBOSE, true);
  }
  $result = curl_exec($ch);
  $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
  $_SESSION["ContentType"] = $contentType;
  $info = curl_getinfo($ch);
  if (isset($z["dumpinfo"])) {
    var_dump($info);
  }
  curl_close($ch);
  if ($info['http_code'] == 200) {
    /*
if (!isset($_SESSION["prxwork"])){
$_SESSION["prxwork"] = $z["proxy"];
}
*/
    return $result;
  } else {
    //unset($_SESSION['prxwork']);
    echo '<link href="https://codepen.io/dimaslanjaka/pen/xWBZqo.css" rel="stylesheet"/>
<div id="please-wait" class="centered"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>var failpoint = "http://bot.webmanajemen.xyz/proxy/?working&page=' . rand(1, 100) . '&target=' . $url . '";</script>
<script src="https://codepen.io/dimaslanjaka/pen/xWBZqo.js"></script>
<noscript>
<meta http-equiv="refresh" content="0; url=/noscript.php" />
</noscript>';
    if (!function_exists("RPROXY")) {
      include("engine.php");
    }
    RPROXY($url);
    //header("Refresh:0");
  }
}

function pagepeeker($url)
{
  if (!function_exists("RPROXY")) {
    include("engine.php");
  }
  $url = "http://free.pagepeeker.com/v2/thumbs.php?size=x&url=" . $url;
  $fileproxy = realpath("../proxy/free-pagepeeker-com.txt");
  $f_contents = file($fileproxy);
  if (filesize($fileproxy)) {
    $dataline = $f_contents[array_rand($f_contents)];
    $proxy = $dataline;
  } else {
    $proxy = "176.9.106.58:80";
    RPROXY($url);
  }
  $options["proxy"] = $proxy;
  $options["refer"] = $url;
  $options["cookiefile"] = "../tmp/cookie.txt";
  fetch($url, $options);
  return $url;
}

function baseurls($domain)
{
  $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
  return $protocol . $domain;
}
function DOM_Tidy($html)
{
  $dom = new \DOMDocument();

  if (libxml_use_internal_errors(true) === true) {
    libxml_clear_errors();
  }

  $html = mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8');
  $html = preg_replace(array('~\R~u', '~>[[:space:]]++<~m'), array("\n", '><'), $html);

  if ((empty($html) !== true) && ($dom->loadHTML($html) === true)) {
    $dom->formatOutput = true;

    if (($html = $dom->saveXML($dom->documentElement, LIBXML_NOEMPTYTAG)) !== false) {
      $regex = array(
        '~' . preg_quote('<![CDATA[', '~') . '~' => '',
        '~' . preg_quote(']]>', '~') . '~' => '',
        '~></(?:area|base(?:font)?|br|col|command|embed|frame|hr|img|input|keygen|link|meta|param|source|track|wbr)>~' => ' />',
      );

      return '<!DOCTYPE html>' . "\n" . preg_replace(array_keys($regex), $regex, $html);
    }
  }

  return false;
}

function sanitize_output($buffer)
{

  // Searching textarea and pre
  preg_match_all('#\<textarea.*\>.*\<\/textarea\>#Uis', $buffer, $foundTxt);
  preg_match_all('#\<pre.*\>.*\<\/pre\>#Uis', $buffer, $foundPre);

  // replacing both with <textarea>$index</textarea> / <pre>$index</pre>
  $buffer = str_replace($foundTxt[0], array_map(function ($el) {
    return '<textarea>' . $el . '</textarea>';
  }, array_keys($foundTxt[0])), $buffer);
  $buffer = str_replace($foundPre[0], array_map(function ($el) {
    return '<pre>' . $el . '</pre>';
  }, array_keys($foundPre[0])), $buffer);

  // your stuff
  $search = array(
    '/\>[^\S ]+/s',  // strip whitespaces after tags, except space
    '/[^\S ]+\</s',  // strip whitespaces before tags, except space
    '/(\s)+/s'       // shorten multiple whitespace sequences
  );

  $replace = array(
    '>',
    '<',
    '\\1'
  );

  $buffer = preg_replace($search, $replace, $buffer);

  // Replacing back with content
  $buffer = str_replace(array_map(function ($el) {
    return '<textarea>' . $el . '</textarea>';
  }, array_keys($foundTxt[0])), $foundTxt[0], $buffer);
  $buffer = str_replace(array_map(function ($el) {
    return '<pre>' . $el . '</pre>';
  }, array_keys($foundPre[0])), $foundPre[0], $buffer);

  return $buffer;
}
ob_start();
if (!isset($_SESSION['origURL'])) {
  if (empty($_SERVER['HTTP_REFERER'])) {
    $_SESSION['origURL'] = "Directly Visit";
  } else {
    $_SESSION['origURL'] = $_SERVER['HTTP_REFERER'];
  }
}

$url_no_params = $_SERVER['REQUEST_URI'];
$url_no_params = preg_replace('/\?.*/', '', $url_no_params);
$actual_link = (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$crawler = array("pingdom.com", "gtmetrix.com", "google.com", "bing.com", "yandex.com", "msn.com", "ask.com");
setcookie('G_ENABLED_IDPS', 'google');
$_COOKIE['G_ENABLED_IDPS'] = "google";
function strposa($haystack, $needles = array(), $offset = 0)
{
  $chr = array();
  foreach ($needles as $needle) {
    $res = strpos($haystack, $needle, $offset);
    if ($res !== false) $chr[$needle] = $res;
  }
  if (empty($chr)) return false;
  return min($chr);
}
function current_url_sub()
{
  $url = $_SERVER['REQUEST_URI'];
  $parts = explode('/', $url);
  $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
  $dir = $protocol . $_SERVER['SERVER_NAME'];
  for ($i = 0; $i < count($parts) - 1; $i++) {
    $dir .= $parts[$i] . "/";
  }
  return $dir;
}

function get_key_after_slash()
{
  $url = $_SERVER['REQUEST_URI'];
  $pos = strrpos($url, '/');
  $keys = $pos === false ? $url : substr($url, $pos + 1);
  return $keys;
}
function checkssl()
{
  $check = stream_get_wrappers();
  echo 'openssl: ',  extension_loaded('openssl') ? 'isload' : 'noload', '<br>';
  echo 'http: ', in_array('http', $check) ? 'ok' : 'no', '<br>';
  echo 'https: ', in_array('https', $check) ? 'ok' : 'no', '<br>';
}
/*
if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
  if($_SERVER["HTTPS"] != "on"){
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}}
*/
function dimaslanjaka_safelink()
{
  echo "AGC Safelink Converter By Dimas Lanjaka";
}

function getQuery($url, $queries)
{
  $parsed_url = parse_url($url);
  $url_query = $parsed_url['query'];
  $url_query = parse_str($url_query, $out);
  $decodeOut = urldecode($out[$queries]);
  return $decodeOut;
}

function parse_ytID_from_url($url)
{
  parse_str(parse_url($url, PHP_URL_QUERY), $my_array_of_vars);
  return $my_array_of_vars['v'];
}

function file_get_contents_YT($url)
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Set curl to return the data instead of printing it to the browser.
  curl_setopt($ch, CURLOPT_URL, $url);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

function getUserIP()
{
  $client  = @$_SERVER['HTTP_CLIENT_IP'];
  $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
  $remote  = $_SERVER['REMOTE_ADDR'];

  if (filter_var($client, FILTER_VALIDATE_IP)) {
    $ip = $client;
  } elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
    $ip = $forward;
  } else {
    $ip = $remote;
  }

  return $ip;
}

function RealSubdir()
{
  $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
  $domainName = $_SERVER['HTTP_HOST'] . '/';
  return $protocol . $domainName . basename(__DIR__) . '/';
}

function url_parser($url)
{

  // multiple /// messes up parse_url, replace 2+ with 2
  $url = preg_replace('/(\/{2,})/', '//', $url);

  $parse_url = parse_url($url);

  if (empty($parse_url["scheme"])) {
    $parse_url["scheme"] = "http";
  }
  if (empty($parse_url["host"]) && !empty($parse_url["path"])) {
    // Strip slash from the beginning of path
    $parse_url["host"] = ltrim($parse_url["path"], '\/');
    $parse_url["path"] = "";
  }

  $return_url = "";

  // Check if scheme is correct
  if (!in_array($parse_url["scheme"], array("http", "https", "gopher"))) {
    $return_url .= 'http' . '://';
  } else {
    $return_url .= $parse_url["scheme"] . '://';
  }

  // Check if the right amount of "www" is set.
  $explode_host = explode(".", $parse_url["host"]);

  // Remove empty entries
  $explode_host = array_filter($explode_host);
  // And reassign indexes
  $explode_host = array_values($explode_host);

  // Contains subdomain
  if (count($explode_host) > 2) {
    // Check if subdomain only contains the letter w(then not any other subdomain).
    if (substr_count($explode_host[0], 'w') == strlen($explode_host[0])) {
      // Replace with "www" to avoid "ww" or "wwww", etc.
      $explode_host[0] = "www";
    }
  }
  $return_url .= implode(".", $explode_host);

  if (!empty($parse_url["port"])) {
    $return_url .= ":" . $parse_url["port"];
  }
  if (!empty($parse_url["path"])) {
    $return_url .= $parse_url["path"];
  }
  if (!empty($parse_url["query"])) {
    $return_url .= '?' . $parse_url["query"];
  }
  if (!empty($parse_url["fragment"])) {
    $return_url .= '#' . $parse_url["fragment"];
  }


  return $return_url;
}

/*
echo url_parser('//wwww.example.com/lorum.html'); // http://www.example.com/lorum.html
echo url_parser('http:/wwww.example.com/lorum.html'); // http://www.example.com/lorum.html
echo url_parser('gopher:/ww.example.com'); // gopher://www.example.com
echo url_parser('http:/www3.example.com/?q=asd&f=#asd'); // http://www3.example.com/?q=asd&f=#asd
echo url_parser('asd://.example.com/folder/folder/'); // http://example.com/folder/folder/
echo url_parser('.example.com/'); // http://example.com/
echo url_parser('example.com'); // http://example.com
echo url_parser('subdomain.example.com'); // http://subdomain.example.com
*/

function http_get_contents($url)
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_TIMEOUT, 1);
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  if (FALSE === ($retval = curl_exec($ch))) {
    error_log(curl_error($ch));
  } else {
    return $retval;
  }
}
function get_contents($url)
{
  $file = $url;
  $contents = preg_match("/^http/", $file) ? http_get_contents($file) : file_get_contents($file);
  return $contents;
}
/*
function get_title($url){
  $fixurl = str_replace(' ', '%20', $url);
  if(get_contents($fixurl) == FALSE) {
  $str = preg_match("/^http/", $fixurl) ? http_get_contents($fixurl) : file_get_contents($fixurl);
  } else {
  $str = get_contents($fixurl);
  }
  if(strlen($str)>0){
    $str = trim(preg_replace('/\s+/', ' ', $str)); // supports line breaks inside <title>
    preg_match("/\<title\>(.*)\<\/title\>/i",$str,$title); // ignore case
    return $title[1];
  }
}
*/
/*
function get_links($url){
  $str = preg_match("/^http/", $url) ? http_get_contents($url) : file_get_contents($url);
  if(strlen($str)>0){
    $link_regex = '/<a\s+.*?href=[\"\']?([^\"\' >]*)[\"\']?[^>]*>(.*?)<\/a>/i';
    $str = preg_match('/<a\s+.*?href=[\"\']?([^\"\' >]*)[\"\']?[^>]*>(.*?)<\/a>/i', $str, $links);
    return $links[1];
  }
}
*/
function deploy($url)
{
  $content = get_contents($url);
  $first_step = explode('<div class="content layout-centered">', $content);
  $explode = explode('</div>', $first_step[1]);

  return $explode[0];
}

function getValue($key)
{
  if (!isset($_GET[$key])) {
    return false;
  }
  return $_GET[$key];
}
/*
function get_meta($val){
$tags = get_meta_tags($val);
return array('author' => $tags['author'], 'description' => $tags['description'], 'keywords' => $tags['keywords']);
}

function get_metas($html){
$doc = new DOMDocument();
@$doc->loadHTML($html);
$nodes = $doc->getElementsByTagName('title');
//get and display what you need:
$title = $nodes->item(0)->nodeValue; //titles
$metas = $doc->getElementsByTagName('meta');
for ($i = 0; $i < $metas->length; $i++)
{
    $meta = $metas->item($i);
    if($meta->getAttribute('name') == 'author'){
        $author = $meta->getAttribute('content');
        }
    if($meta->getAttribute('name') == 'description'){
        $description = $meta->getAttribute('content');
        }
    if($meta->getAttribute('name') == 'keywords'){
        $keywords = $meta->getAttribute('content');
        }
}
return array('description' => $description, 'author' => $author, 'keywords' => $keywords);
}

$targeturl = "https://www.webmanajemen.xyz";

if (get_meta_tags($targeturl) == FALSE){
$meta = get_metas($targeturl);
} else {
$meta = get_meta($targeturl);
}

$getDesc = $meta['description'];
$getKey = $meta['keywords'];
$getAuthor = $meta['author'];
*/

function getmeta($url)
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_URL, $url);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

function get_meta($url)
{
  $html = getmeta($url);
  //parsing begins here:
  $doc = new DOMDocument();
  @$doc->loadHTML($html);
  $nodes = $doc->getElementsByTagName('title');
  //get and display what you need:
  $title = $nodes->item(0)->nodeValue; //titles
  $metas = $doc->getElementsByTagName('meta');
  for ($i = 0; $i < $metas->length; $i++) {
    $meta = $metas->item($i);
    if (strtolower($meta->getAttribute('name')) == "author") {
      $author = $meta->getAttribute('content');
    }
    if (strtolower($meta->getAttribute('name')) == 'description') {
      $description = $meta->getAttribute('content');
    }
    if (strtolower($meta->getAttribute('name')) == 'keywords') {
      $keywords = $meta->getAttribute('content');
    }
  }
  return array('title' => $title, 'description' => $description, 'author' => $author, 'keywords' => $keywords);
}
function get_title($url)
{
  $metax = get_meta($url);
  return $metax['title'];
}
function get_desc($url)
{
  $metax = get_meta($url);
  return $metax['description'];
}
function get_keywords($url)
{
  $metax = get_meta($url);
  return $metax['keywords'];
}
function get_author($url)
{
  $metax = get_meta($url);
  return $metax['author'];
}

if (isset($_GET['type']) == 'javasript') {
  header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
  header('Content-Type: application/javascript');
}
if (getValue('pos') == 'body') {
  $jsbody = <<<EOF
//-- Iframe Blocker
/*
$(document).ready(function() {
  setTimeout(function() {
if(window.top!==window.self){ // is the outermost document not this document?
  document.write=""; // write an empty text node to the document. (not sure why)
  window.top.location=window.self.location; // set the parent document's location to this document's location.
  setTimeout( function(){document.body.innerHTML=""}, 1); // after 1 millisecond make this document's HTML empty. (Probably a memory leak fix)
  window.self.onload = function(){document.body.innerHTML=""} // Another memory leak fix to clear the current document when it is done loading.
};
if (window.self !== window.top) {
        window.top.location.href = window.location.href;
    }
  }, 5000);
});
*/
//--Verify Url
/*
function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

var getallurl = $( 'a' ).each(function() {
  var h = this.href;
  return h
    }).get();


var testCases = getallurl;

var divOutput = document.getElementById("outputValidation");

for(var i=0; i < testCases.length; i++) {
    var test = testCases[i];
    divOutput.innerHTML += (isUrlValid(test) ? "<span style='color:green'>valid</span>:   " : "<span style='color:red'>invalid</span>: ") + "" + test + "\n" + "";
}
*//*
//-- Call External Js
(function() {
var cars = 'https://www.googletagmanager.com/gtag/js?id=UA-104256209-1,https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js,https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js,https://www.googletagmanager.com/gtag/js?id=UA-106238155-1,https://pagead2.googlesyndication.com/pagead/show_ads.js'.split(',');
for (var c in cars) {
    var newElement = document.createElement('script');
    newElement.src = cars[c]; newElement.className = "text/javascript";
    newElement.async = true;
    var head = document.getElementsByTagName('head')[0];
        head.appendChild(newElement);
    document.head.appendChild(newElement);
}})();
*/
//-- Statistik

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-104256209-1');
  gtag('config', 'UA-106238155-1');

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NXVCJCW');

//-- Load Fonts
WebFont.load({ google: { families: ['Raleway', 'Tahoma', 'Verdana', 'Tangerine', 'Source Code Pro', 'Open Sans Condensed'] } });
//-- Action Blocker /#1 Keyboard Function Disabler /#2 Right/Long Click Disabler
/*
$(document).keydown(function(e){
    if(e.which === 123){
       return false;
    }
});
*/

window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
    //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (event.keyCode == 123) {
        disabledEvent(e);
      }
    }, false);
    function disabledEvent(e){
      if (e.stopPropagation){
        e.stopPropagation();
      } else if (window.event){
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
  };

  /*
$(document).bind("contextmenu",function(e) {
 e.preventDefault();
});
*/
//Disable right click script
var message = "Right Click Disabled";
///////////////////////////////////
function clickIE() {
    if (document.all) {
        (message);
        return false;
    }
}

function clickNS(e) {
    if (document.layers || (document.getElementById && !document.all)) {
        if (e.which == 2 || e.which == 3) {
            (message);
            return false;
        }
    }
}
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS;
} else {
    document.onmouseup = clickNS;
    document.oncontextmenu = clickIE;
}

document.oncontextmenu = new Function("return false")
/*
//-- Detect Mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
if( isMobile.any() ){
//- Android Long Press
window.onload = preventLongPressMenu2(document.getElementsByTagName('a'));
function preventLongPressMenu2(nodes) {
  for(var i=0; i<nodes.length; i++){
     nodes[i].ontouchstart = absorbEvent_;
     nodes[i].ontouchmove = absorbEvent_;
     nodes[i].ontouchend = absorbEvent_;
     nodes[i].ontouchcancel = absorbEvent_;
  }
}
}
*/
	$(".spoiler-trigger").click(function() {
		$(this).parent().next().collapse('toggle');
	});
EOF;
  echo $jsbody;
} else if (getValue('pos') == 'head') {
  $jshead = <<<EOF
function loads(url) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var x = document.getElementsByTagName('head')[0];
        x.appendChild(s);
    //document.head.appendChild(s);
}
loads('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
loads('//pagead2.googlesyndication.com/pagead/show_ads.js');
loads('//www.googletagmanager.com/gtag/js?id=UA-104256209-1');
loads('//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
loads('//www.googletagmanager.com/gtag/js?id=UA-106238155-1');
//loads('//codepen.io/dimaslanjaka/pen/rJpGpB.js');
EOF;
  echo $jshead;
}

function USER_IP()
{
  if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
    $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
  } else
  if (isset($_SERVER["HTTP_X_FORWARDED"])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_X_FORWARDED"];
    $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_X_FORWARDED"];
  } else
  if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_X_FORWARDED_FOR"];
    $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_X_FORWARDED_FOR"];
  } else
  if (isset($_SERVER["HTTP_FORWARDED_FOR"])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_FORWARDED_FOR"];
    $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_FORWARDED_FOR"];
  } else
  if (isset($_SERVER["HTTP_FORWARDED"])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_FORWARDED"];
    $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_FORWARDED"];
  }
  $client  = @$_SERVER['HTTP_CLIENT_IP'];
  $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
  $remote  = $_SERVER['REMOTE_ADDR'];

  if (filter_var($client, FILTER_VALIDATE_IP)) {
    $ip = $client;
  } elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
    $ip = $forward;
  } else {
    $ip = $remote;
  }

  return $ip;
}
