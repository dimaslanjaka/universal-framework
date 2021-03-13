<?php

$home = 'https://www.malasngoding.com';
$agc = new gtrans();
$parse_url = parse_url($home);
$curl = $agc->cURL();
$paths = '/^\/(category|tag|author|product)|^\/$/m';

if (!preg_match($paths, isreq('path')) && !empty(isreq('path'))) {
  $curl = $agc->fetch_contents($curl, $home . trim(urldecode(isreq('path'))));
  $html = str_get_html($curl->response);
  if ($html) {
    if ($html->find('script,meta,link')) {
      foreach ($html->find('script,meta,link') as $script) {
        //precom(htmlentities($script->outertext));
        $script->outertext = '';
      }
    }
    if ($html->find('.adsbygoogle,.content-iklan')) {
      foreach ($html->find('.adsbygoogle,.content-iklan') as $ads) {
        $ads->outertext = '';
      }
    }
    if ($html->find('.crayon-plain-wrap,.crayon-main')) {
      foreach ($html->find('.crayon-plain-wrap,.crayon-main') as $div) {
        if ($div->find('textarea')) {
          //$div->outertext = '<textarea id="CodeMirror">' . $div->find('textarea', 0)->innertext . '</textarea>';
          $div->outertext = '';
        } else if ($div->find('.crayon-pre')) {
          foreach ($div->find('.crayon-pre', 0)->find('span') as $span) {
            $span->outertext = $span->innertext;
          }
          foreach ($div->find('.crayon-pre', 0)->find('div') as $span) {
            $span->outertext = $span->innertext;
          }
          $s = preg_replace('/\t+/m', "<br/>", $div->find('.crayon-pre', 0)->innertext);
          $regex_url = '#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#';
          if (preg_match_all($regex_url, html_entity_decode($s), $match)) {
            for ($i = 0; $i < count($match[0]); ++$i) {
              //$match[0][$i] = imgCDN($match[0][$i]);
              if (strpos($match[0][$i], $parse_url['host'])) {
                if (strpos($s, $match[0][$i])) {
                  $s = str_replace($match[0][$i], safelink($match[0][$i]), $s);
                }
              }
            }
          }

          $div->outertext = '<pre class="notranslate"><code id="CodeMirror-Live" data-highlight="true" class="html">' . $s . '</code></pre>';
          //$div->outertext = '';
        }
      }
    }
    foreach ($html->find('[id^=attachment_]') as $att) {
      $att->outertext = $att->innertext;
    }
    foreach ($html->find('li') as $li) {
      $li->innertext = trim(str_replace('malasngoding', '', $li->innertext));
    }
    if ($html->find('a')) {
      foreach ($html->find('a') as $a) {
        $href = parse_url($a->href);
        $a->target = '_blank';
        $a->rel = 'nofollow';
        if (!isset($a->alt)) {
          $a->alt = $_SESSION['title'];
        }
        if (isset($href['host'])) {
          if ($href['host'] == $parse_url['host']) {
            if (isset($href['path'])) {
              $a->href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . trim(preg_replace('/[^a-zA-Z0-9\']/m', ' ', $href['path']));
            }
          } else {
            $a->href = safelink($a->href);
          }
        }
      }
    }
    $cont = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/AGC/css/responsive.css"><link rel="stylesheet"
    href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/default.min.css">
<s+c+r+i+p+t src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></s+c+r+i+p+t>
<s+c+r+i+p+t src="https://codepen.io/dimaslanjaka/pen/dyPYagy.js"></s+c+r+i+p+t>';

    $tl = 'en';
    $sl = 'id';
    $dir = 'website';
    $cont .= $agc->grammar("$sl-$tl", $html->find('.post-single-content', 0)->innertext, true)->addtitle($_SESSION['title'])->__toString();
    $cont = imgDOM($cont);
    $_SESSION['body'] = $cont;

    echo agcparser::getInstance()->parsingview($cont, false, ['highlight' => true])->load_depencies()->combine()->__toString();
  }
} else if (preg_match($paths, isreq('path'))) {
  $curl = $agc->fetch_contents($curl, $home . trim(urldecode(isreq('path'))));
  $html = str_get_html($curl->response);
  index($html);
} elseif (!isreq('path')) {
  $curl = $agc->fetch_contents($curl, $home . trim(urldecode(isreq('path'))));
  $html = str_get_html($curl->response);
  index($html);
}

function index($html)
{
  $x = [];
  foreach ($html->find('a') as $a) {
    $href = parse_url($a->href);
    if (isset($href['path'])) {
      $a->href = '/AGC/malasngoding?path=' . $href['path'];
      if (isset($a->style)) {
        $a->removeAttribute('style');
      }
      if (isset($a->class)) {
        $a->removeAttribute('class');
      }
      if (isset($a->innertext) && !empty($a->plaintext) && !strpos($a->innertext, '<img') && !in_array($a->href, $x)) {
        $x[] = $a->href;
        echo $a->outertext . '<br>';
      }
    }
  }
}
