<?php

use Curl\Curl;

$body = strip_slashes_recursive(isreq('body'));
$title = strip_slashes_recursive(isreq('title'));
if (isAdmin() && isLocalhost()) {
  _file_(_dir_(__DIR__) . '/domains.json', ['drakorstation.com', 'kompi-ajaib.com', 'www.bagas31.info'], true, false);
}
if (isreq('target')) {
  $sl = isreq('sl') ? isreq('sl') : isreq('source_lang');
  $tl = isreq('tl') ? isreq('tl') : isreq('to_lang');
  $i = isreq('target');
  if (!empty($sl) && !empty($tl) && !empty($i)) {
    $fne = explode('/', str_replace('https://wp.webmanajemen.com/receiver/', '', $i));
    $fne = array_filter($fne);
    $fn = end($fne);
    $dir = isreq('niche');
    $domains = json_decode(file_get_contents(_dir_(__DIR__) . '/domains.json'));
    foreach ($fne as $match) {
      if (in_array($match, $domains)) {
        $dir .= '/' . $match;
      }
    }
    $curl = new Curl();
    $curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
    $curl->setReferrer('https://www.google.com');

    //build external translator source
    $b = '<div id="A-G-C" date="' . date('d M Y H:i:s') . '">';
    $b .= $body;
    $b .= '</div>';
    $src = "http://dimaslanjaka.000webhostapp.com/receiver/receiver.php";
    if (!strpos($dir, '/')) {
      if (isAdmin()) {
        $core->dump($domains, $fne, $dir);
      }
      die('unidentified domains');
    }
    $session_source = "sentSource-$sl-$tl-$fn";
    if (!empty($body)) {
      if ((!isses($session_source) || isreq('retry'))) {
        $curl->post($src, [
          'dir' => $dir,
          'content' => $b,
          'filename' => $fn,
          'force' => 1
        ]);
        if (!$curl->error) {
          $json = $curl->response;
          if (isset($json->url)) {
            $i = $json->url;
            sess($session_source, $i);
          }
        } else {
          exit($curl->errorMessage);
        }
      } else {
        $i = isses($session_source);
      }
    } else {
      $core->dump('<div id="A-G-C">empty body</div>');
    }
    /**
     * Set curl proxy
     */
    if (isreq('proxy')) {
      sess('proxy', trim(isreq('proxy')));
      $curl->setProxy(trim(isreq('proxy')));
      $curl->setProxyTunnel(true);
    }

    //exit(var_dump($json, $dir, $fn));

    //prepare to translating
    $session_translated = "body-translated-$sl-$tl-$fn";
    if (preg_match("/\.html$/i", $i) && !empty($fn)) {
      if (!isses($session_translated) || isreq('rewrite')) {
        $translate = new gtrans($curl);
        $c = "<!--translated--><!--($sl-$tl)-->" . $translate->translate($i, $sl, $tl);
        $c = preg_replace('/(\<body\>|\<\/body\>)/mi', '', $c);
        $c = '<div id="AGC_' . time() . '">' . trim($c) . '</div>';
        $c = agcparser::getInstance()->parsingview($c, false, ['highlight' => true])->combine()->__toString();
        if ($translate->verify_article($c)) {
          $file_translated = ROOT . '/views/AGC/saved/translated/' . $dir . $fn;
          _file_($file_translated, $c . PHP_EOL);
          $_SESSION['done_url'] = $file_translated;
          echo "<script>";
          jscfg('translated', true);
          jscfg('saved', true);
          echo "</script>";
          echo $c;
          sess($session_translated, $c);
        } else {
          die('Article couldn\'t not verified');
        }
      } else {
        echo isses($session_translated);
      }
    } else {
      die('Filename is empty [contact admin]');
    }
  } else {
    die('target or source lang empty');
  }
} else {
  die('Target undefined');
}
