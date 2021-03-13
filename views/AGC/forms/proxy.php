<?php

error_reporting(0);
ini_set('output_buffering', 0);
if (!class_exists('Curl\Curl')) {
  require_once realpath(__DIR__ . '/../../../vendor/autoload.php');
}
if (!function_exists('str_get_html')) {
  require_once realpath(__DIR__ . '/../../../wp-content/plugins/Dimas/src/wp/wp-dom.php');
}
error_reporting(1);


use Curl\Curl;

$regex_ip_port = '/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/m';
$regex_br = '#(.*?):(\d{1,4})<br />\n#';
$regex_a = '#(.*?):(\d{1,4})</a>\n#';
$regex_all = '#(.*?):(\d{1,4}).*?\n#';
$regex_td = '#<td>(.*?):(\d{1,4})</td>#';
$regex_ip = '/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/m';
$PF = __DIR__ . '/proxy.txt';
$TMP = __DIR__ . '/temp.txt';

$opt = getopt('o:');
if (isset($_POST['save'])) {
  header('Content-Type: text/plain; charset=utf-8');
  if (isset($_POST['content'])) {
    $c = join("\n", $_POST['content']);
    if (preg_match_all($regex_ip_port, $c, $match)) {
      if (isset($match[0])) {
        $lines = file($PF, FILE_SKIP_EMPTY_LINES);
        $lines = array_unique(array_merge($lines, $match[0]));
        $lines = array_filter($lines);
        for ($i = 0; $i < count($lines); $i++) {
          $lines[$i] = trim($lines[$i]);
        }
        $Im = implode(PHP_EOL, $lines);
        //$core->dump($Im);
        file_put_contents($PF, $Im);
        exit($Im);
      }
    }
  }
} else if (isset($_REQUEST['del'])) {
  header('Content-Type: text/plain; charset=utf-8');
  $data = str_replace(isreq('del'), PHP_EOL, file_get_contents($PF));
  $lines = preg_split('/\s|\s+/m', $data);
  $proxy = array_values(array_filter($lines));
  file_put_contents($PF, implode(PHP_EOL, $proxy));
  echo json_encode($proxy, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
} elseif (isset($_REQUEST['set'])) {
  header('Content-Type: text/plain; charset=utf-8');
  $proxy = file($PF, FILE_SKIP_EMPTY_LINES);
  $_SESSION['proxy_file'] = $PF;
  $_SESSION['proxy'] = trim($proxy[array_rand((array) $proxy)]);
  echo json_encode($_SESSION, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
} elseif (isset($_REQUEST['test']) || (isset($argv[1]) && 'test' == $argv[1])) {
  header('Content-Type: text/plain; charset=utf-8');
  $proxy = file($PF, FILE_SKIP_EMPTY_LINES);
  foreach ($proxy as $ptest) {
    check_proxy(trim($ptest), $PF, true);
  }
  file_put_contents($PF, implode('', file($PF, FILE_SKIP_EMPTY_LINES)));
} elseif (isset($_GET['get']) || (isset($argv[1]) && 'get' == $argv[1])) {
  header('Content-Type: text/plain; charset=utf-8');
  if (file_exists($PF)) {
    @rename($PF, $TMP);
  }
  $url = ['https://www.my-proxy.com/free-elite-proxy.html', 'http://www.httptunnel.ge/ProxyListForFree.aspx']; /*[
  'http://spys.me/proxy.txt',
  'http://spys.one/en/https-ssl-proxy/',
  'https://www.my-proxy.com/free-proxy-list.html',
  'https://www.my-proxy.com/free-transparent-proxy.html',
  'https://www.my-proxy.com/free-elite-proxy.html',
  'https://www.my-proxy.com/free-anonymous-proxy.html',
  'http://www.httptunnel.ge/ProxyListForFree.aspx',
  'http://spys.me/proxy.txt',
  'https://www.proxy-list.download/api/v1/get?type=https&anon=elite',
  'https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=10000&country=all&ssl=all&anonymity=all',
  'https://proxy-daily.com/',
  ];*/
  shuffle($url);
  //$urls = $url[array_rand($url)];
  $Pjson = __DIR__ . '/proxy.json';
  $i = 0;
  ++$i;
  $curl = cc($url);
  for ($i = 0; $i < 3; ++$i) {
    $urls = $url[$i];
    $curl->get($urls);
    if ($curl->error) {
      exit('Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . ' : ' . $urls . "\n");
    } elseif (preg_match_all($regex_ip_port, $curl->response, $m)) {
      $TMPi = file_exists($TMP) ? file($TMP, FILE_SKIP_EMPTY_LINES) : [];
      $m[0] = array_unique(array_merge((array) $TMPi, $m[0]));
      foreach ($m[0] as $p) {
        if (!in_array($p, (array) $TMPi)) {
          //$proxy[] = $p;
          check_proxy($p, $PF);
        }
      }
      if (file_exists($TMP)) {
        @unlink($TMP);
      }
    }
  }
}
/*
$pr = array_unique($proxy);
$prx = [];
$prx['died'] = [];
$prx['success'] = [];
$i = 0;
foreach ($pr as $t) {
  ++$i;
  if ($i > 15) {
  break;
  }
  echo $t . "\n";
  $curl->setProxy($t);
  $curl->setProxyTunnel(true);
  $curl->get('https://google.com');
  if ($curl->error) {
  echo $t . ' | Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
  $p = str_get_html($curl->response);
  echo $t . ' | ' . $p->find('title', 0)->innertext . ' | ' . $curl->httpStatusCode . "\n";
  }
}
/*
$j = json_encode($array, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
if (!empty($prx)) {
  file_put_contents($Pjson, $j);
  echo $j;
} else {
  var_dump($curl->response);
}
*/

function check_proxy($p, $file_proxy, $only_check = false)
{
  if (!empty(trim($p))) {
    $cc = cc();
    $cc->setProxy(trim($p));
    $cc->setProxyTunnel(true);
    $cc->get('https://www.google.com/');
    if ($cc->error) {
      if ($only_check) {
        file_put_contents($file_proxy, str_replace(trim($p), '', file_get_contents($file_proxy)));
      }
      //echo $p . ' | Error: ' . $cc->errorCode . ': ' . $cc->errorMessage . "\n";
    } else {
      $html = str_get_html($cc->response);
      if ($html) {
        $title = $html->find('title', 0)->innertext;
        $code = $cc->httpStatusCode;
        echo trim($p) . ' | ' . $title . ' | ' . $code . "\n";
        if ('google' == strtolower($title) && 200 == $code) {
          $_SESSION['proxy'] = trim($p);
          if (!$only_check) {
            file_put_contents($file_proxy, $p . "\n", FILE_APPEND);
          }
        }
      }
    }
  }
}

function cc($url = null)
{
  $curl = new Curl();
  $curl->setHeaders(['Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 'Connection: Keep-Alive', 'Cache-Control: max-age=0', 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7', 'Content-type: */*;charset=UTF-8', 'Pragma: no-cache', 'DNT: 1', 'Accept-Language: en-us,en;q=0.5', 'Keep-Alive: 300', 'Upgrade-Insecure-Requests: 1', 'Origins: https://www.facebook.com']);
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

  return $curl;
}
