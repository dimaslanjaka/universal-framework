<?php

///https://www.kompiajaib.com/
//.postbody

$agc_core = new gtrans(null);
$curl = $agc_core->cURL();
$url = 'https://www.kompiajaib.com';
$parse_url = parse_url($url);
$paths = '/\/label\/|\/p\/|\/search/m';
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
isses('noproxy') ? unses('proxy') : false;
if (isset($_REQUEST['path']) && !preg_match($paths, $_REQUEST['path'])) {
  $url .= trim(urldecode($_REQUEST['path']));
  if (isset($_REQUEST['query'])) {
    $url .= '?' . trim(urldecode($_REQUEST['query']));
  }
  $curl = $agc_core->fetch_contents($curl, $url);
  $_SESSION['target'] = $url;
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $html = str_get_html($curl->response);
    $_SESSION['title'] = $ptitle = $html && $html->find('title') ? preg_replace('/\s+/m', ' ', preg_replace('/\/|\\|\s+/m', ' ', html_entity_decode($html->find('title', 0)->plaintext))) : '';
    if ($html && $html->find("meta[property='og:image']")) {
      $html->find('.postbody', 0)->innertext .= '<img src="' . imgCDN($html->find("meta[property='og:image']", 0)->content) . '" alt="' . $ptitle . '">';
    }
    if ($html && $html->find('.postbody')) {
      $post = str_get_html('<div id="agcX">' . $html->find('.postbody', 0)->innertext . '</div>');
      foreach ($post->find('.postmeta,script,.iklan-bawahpost,ins,a,.post-sender') as $del) {
        if ('a' != $del->tag) {
          $del->outertext = '';
        } else {
          if (isset($del->title)) {
            if (preg_match('/^subscribe\s/m', strtolower($del->title))) {
              $del->outertext = '';
              continue;
            }
          } else {
            $del->title = $ptitle;
          }
          if (isset($del->href)) {
            $p = parse_url($del->href);
            if (isset($p['host'])) {
              if ($p['host'] == $parse_url['host']) {
                $e = explode('/', $p['path']);
                $en = str_replace(['-', '.html'], ['+', ''], end($e));
                $del->href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . $en;
                $del->rel = 'follow';
                $del->target = '_blank';
              } else {
                if (!preg_match('/google\.|bing\.|yahoo\.|github\./s', $p['host'])) {
                  $del->href = safelink($del->href);
                }
                $del->rel = 'nofollow noopener';
                $del->target = '_blank';
              }
            }
          }
        }
      }
      foreach ($post->find('pre code') as $notr) {
        $dstring = html_entity_decode($notr->innertext);
        $pre = str_get_html($dstring);
        if ($pre->find('*')) {
          foreach ($pre->find('*') as $tag) {
            if ('img' == $tag->tag || 'amp-img' == $tag->tag) {
              $src = parse_url($tag->src);
              if (isset($src['host'])) {
                if ('imgcdn.000webhostapp.com' != $src['host']) {
                  if (false !== strpos($notr->innertext, $tag->src)) {
                    $notr->innertext = str_replace($tag->src, imgCDN($tag->src), $notr->innertext);
                  } elseif (false !== strpos($notr->innertext, urldecode($tag->src))) {
                    $notr->innertext = str_replace(urldecode($tag->src), imgCDN($tag->src), $notr->innertext);
                  } elseif (false !== strpos($notr->innertext, htmlentities($tag->src))) {
                    $notr->innertext = str_replace(htmlentities($tag->src), imgCDN($tag->src), $notr->innertext);
                  }
                }
              }
            }
          }
        }
        $isJS = preg_match('/\.(getElementsByClassName|getElementById|getElementsByTagName|innerHTML|html\(|appendChild\()/m', $dstring) && false === strpos($dstring, '</script>');
        if (false !== strpos($dstring, '<?php')) {
          $notr->setAttribute('class', 'notranslate php');
        } elseif (preg_match_all('/data\:post|b\:skin/m', $dstring)) {
          $notr->setAttribute('class', 'notranslate xml');
        } elseif ($pre->find('*') && !$isJS) {
          $notr->setAttribute('class', 'notranslate html');
        } elseif ($isJS) {
          $notr->setAttribute('class', 'notranslate javascript');
        } elseif (preg_match('/<(?:br|p)[^>{]*>|<\/\w+\s*>|(?:\s*\S+\s*{[^}]*})+/m', $dstring)) {
          $notr->setAttribute('class', 'notranslate css');
        } else {
          $notr->setAttribute('class', 'notranslate plaintext');
        }
        $notr->{'data-highlight'} = 'true';
      }
      foreach ($post->find('img') as $img) {
        if (!isset($img->alt)) {
          $img->alt = $ptitle;
        }
        if (isset($img->src)) {
          $img->src = imgCDN($img->src);
        }
      }
      $cont = $post->find('#agcX', 0)->innertext;
      $tl = 'en';
      $sl = 'id';
      $dir = 'articles';
      $sess = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/AGC/css/responsive.css"><link rel="stylesheet"
    href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/default.min.css">
<s+c+r+i+p+t src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></s+c+r+i+p+t>
<s+c+r+i+p+t src="https://codepen.io/dimaslanjaka/pen/dyPYagy.js"></s+c+r+i+p+t>' . $agc_core->grammar("$sl-$tl", $cont, true)->addtitle($ptitle)->__toString();
      $sess = $agc_core->amp($sess);
      $parse_urls = agcparser::detecturl($sess);
      $arr = [];
      foreach ($parse_urls as $single_link) {
        $sin = parse_url($single_link);
        if (isset($sin['host'])) {
          if (preg_match('/[0-9]\.bp\.blogspot\.com/m', $sin['host'])) {
            $noproto = preg_replace('/^https?\:\/\//s', '', $single_link);
            if (false !== strpos($sess, $single_link)) {
              $sess = str_replace($single_link, imgCDN($single_link), $sess);
              //$arr[$single_link] = imgCDN($single_link);
            }
            if (false !== strpos($sess, $noproto)) {
              $noprotocdn = preg_replace('/^https?\:\/\//s', '', imgCDN($single_link));
              $sess = str_replace($noproto, $noprotocdn, $sess);
              //$arr[$single_link] = imgCDN($single_link);
            }
          }
        }
      }
      $_SESSION['body'] = $sess;
      echo agcparser::getInstance()->parsingview($sess, false, true, ['highlight' => true])->combine()->__toString();
    }
  }
} else { ?>
<div id='show-cat'></div>
<div id='show-post'></div>
<script>
  var cat_home = 'https://www.kompiajaib.com';
  var cat_numb = 12;
  var cat_pre = 'Prev';
  var cat_nex = 'Next';
  var cat_name;
  var cat_start;
  var cat_class;
  var agc_log = `<?=$log; ?>`;
  var cat_url;

  var parse_url_rss = function(url) {
    var parser = document.createElement('a'),
      searchObject = {},
      queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
      split = queries[i].split('=');
      searchObject[split[0]] = split[1];
    }
    return {
      protocol: parser.protocol,
      host: parser.host,
      hostname: parser.hostname,
      port: parser.port,
      pathname: parser.pathname,
      search: parser.search,
      searchObject: searchObject,
      hash: parser.hash,
      protohost: parser.protocol + '//' + parser.host
    };
  }

  function openInNewTab(url, name) {
    if (typeof url != 'undefined' && typeof name != 'undefined') {
      var win = window.open(url, name);
      win.focus();
    }
  }

  function show_post2(a) {
    var tt = a.feed.openSearch$totalResults.$t;
    dw = '';
    dw += '<ul>';
    for (var i = 0; i < cat_numb && i < a.feed.entry.length; i++) {
      var entry = a.feed.entry[i];
      cat_title = entry.title.$t;
      for (var j = 0; j < entry.link.length; j++) {
        if (entry.link[j].rel == 'alternate') {
          var cat_url_href = entry.link[j].href;
          var pname = parse_url_rss(cat_url_href).pathname;
          var xlog = agc_log.includes(pname.replace(/\//g, ''));
          if (!xlog) {
            cat_url = '/AGC/kompi-ajaib?path=' + pname;
          } else {
            cat_url = '#';
            cat_title = 'undefined';
          }
        }
      }
      if (cat_title != 'undefined') {
        dw += '<li>';
        dw += (cat_start + i) + '. <a href="' + cat_url +
          '" rel="nofollow" onclick="openInNewTab(this.href, \'X\');return false;" title="' + cat_title + '">' +
          cat_title + '</a>';
        dw += '</li>';
      }
    }
    dw += '</ul>';
    dw += '<div id="navi-cat">';
    if (cat_start > 1) {
      dw += '<a href="" onclick="show_post(\'' + cat_name + '\',\'' + (cat_start - cat_numb) + '\',\'' + cat_class +
        '\');return false" title="' + cat_pre + '">' + cat_pre + '</a>'
    }
    if ((cat_start + cat_numb - 1) < tt) {
      dw += '<a href="" onclick="show_post(\'' + cat_name + '\',\'' + (cat_start + cat_numb) + '\',\'' + cat_class +
        '\');return false" title="' + cat_nex + '">' + cat_nex + '</a>'
    }
    dw += '<span>' + cat_start;
    if (cat_start != tt) {
      dw += ' &ndash; ' + (cat_start + i - 1)
    }
    dw += ' / ' + tt + '</span>';
    dw += '</div>';
    document.getElementById('show-post').innerHTML = dw + '<style type="text/css">.cat-' + cat_class +
      ' a{background:#bbb!important;color:#fff!important}<\/style>'
  }

  function show_post(a, b, c) {
    var d = document.getElementsByTagName('head')[0];
    e = document.createElement('script');
    e.type = 'text/javascript';
    e.setAttribute('src', cat_home + '/feeds/posts/default/-/' + a + '?alt=json-in-script&start-index=' + b +
      '&max-results=' + cat_numb + '&callback=show_post2');
    d.appendChild(e);
    cat_name = a;
    cat_start = parseInt(b), cat_class = c
  }

  function show_cat(a) {
    var cat = a.feed.category;
    dw = '';
    dw += '<ul>';
    for (var i = 0; i < cat.length - 1; i++) {
      for (var j = i + 1; j < cat.length; j++) {
        if (cat[i].term > cat[j].term) {
          cat_hv = cat[i].term;
          cat[i].term = cat[j].term;
          cat[j].term = cat_hv
        }
      }
    }
    for (var i = 0; i < cat.length; i++) {
      dw += '<li class="cat-' + i + '">';
      dw += '<a href="" onclick="show_post(\'' + cat[i].term + '\',\'1\',\'' + i + '\');return false" title="';
      dw += cat[i].term;
      dw += '">';
      dw += cat[i].term;
      dw += '</a>';
      dw += '</li>'
    }
    dw += '</ul>';
    document.getElementById('show-cat').innerHTML = dw
  }
  (function() {
    //document.write('<scr' + 'ipt type="text/javascript" src="' + cat_home + '/feeds/posts/default?alt=json-in-script&max-results=0&callback=show_cat"><\/scr' + 'ipt>');
    var script = document.createElement('script');
    script.src = cat_home + '/feeds/posts/default?alt=json-in-script&max-results=0&callback=show_cat';

    document.getElementsByTagName('body')[0].appendChild(script) || document.body.appendChild(script);
  })()
</script>
<?php
}
$no_add_title = 1;
