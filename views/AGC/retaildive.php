<?php

$agc = new gtrans();
$curl = $agc->cURL(true);
$paths = '/^(\/topic\/|void\(0\)|\/signup|\/opinion|\/library|\/events|\/company|\/feed)/m';
$url = 'https://www.retaildive.com';
$parse_url = parse_url($url);
if (isset($_GET['path'])) {
  $url .= $_GET['path'];
}

$curl->get($url);
precom(isreq('path'), preg_match($paths, isreq('path')), (isreq('path') && preg_match($paths, isreq('path'))));

if (isreq('path') && !preg_match($paths, isreq('path'))) {
  if (!$curl->error) {
    $html = str_get_html($curl->response);
    if ($html->find('meta[property=og:image]')) {
      $image = $html->find('meta[property=og:image]', 0)->content;
      $image = preg_replace('/(^https?\:\/\/)/m', '', $image);
      $image = trim($image);
    }
    $cdn = 'https://cdn.staticaly.com/img/';

    $title = $html->find('title', 0)->plaintext;
    $title = preg_replace('(retail dive|\|)', '', strtolower($title));
    $title = trim(ucwords($title));
    $title = trim($title);
    $_SESSION['title'] = $title;

    $c = $html->find('.article-wrapper', 0);
    if ($c) {
      foreach ($c->find('div,img,a,style,script') as $tag) {
        if ('img' !== $tag && empty(trim($tag->innertext))) {
          $tag->outertext = '';
        }
        if ('a' == $tag->tag && $tag->hasAttribute('href')) {
          $href = parse_url($tag->href);
          if (isset($href['host'])) {
            if ($href['host'] == $parse_url['host']) {
              $kw = str_replace('/', '-', $href['path']);
              $kw = str_replace('-', ' ', $kw);
              $kw = preg_replace('/[^A-Za-z ]/m', ' ', $kw);
              $kw = preg_replace('/\s+/m', ' ', $kw);
              $kw = trim(strtolower($kw));
              $kw = trim($kw);
              if (empty($kw)) {
                $kw = 'PHP';
              }
              $tag->href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . $kw;
              $tag->rel = 'follow';
            } else {
              $tag->href = safelink($tag->href);
              $tag->rel = 'nofollow noopener';
            }
          }
          if (!isset($tag->alt)) {
            $tag->alt = $title;
          }
          $tag->target = '_blank';
        }
        if ($tag->hasAttribute('class')) {
          if (preg_match("(share\-buttons|editor\-box|article\-topic|help\-text)", $tag->class)) {
            $tag->outertext = '';
          }
          $tag->removeAttribute('class');
        }
        if (preg_match('(style|script)', $tag->tag)) {
          $tag->outertext = '';
        }
        if (preg_match('(a|img)', $tag->tag)) {
          $tag->alt = $title;
          $tag->title = $title;
        }
      }
    }
    $cont = '';
    if (isset($image)) {
      $cont = "<center><img src='$cdn$image' title='$title' alt='$title' class='img-thumbnail'/></center>";
    }
    if ($c) {
      $cont .= $c->innertext;
      $cont .= "<title>$title</title>";
      $_SESSION['body'] = $cont;
    }
    echo $cont;
  } else {
    $agc->curl_err($curl);
  }
} elseif (!isreq('path') || (isreq('path') && preg_match($paths, isreq('path')))) {
  if ($curl->error) {
    $agc->curl_err($curl);
  } else {
    $html = str_get_html($curl->response);
    foreach ($html->find('link,img,script') as $css) {
      if ('link' == $css->tag && !preg_match('/^https?\:\/\//m', $css->href)) {
        $css->href = $url . $css->href;
      }
      if (preg_match('(script|img)', $css->tag) && false == strpos($css->src, $url)) {
        $css->src = $url . $css->src;
      }
    }
    foreach ($html->find('a') as $tag) {
      $href = parse_url($tag->href);
      if (isset($href['path'])) {
        if (!preg_match($paths, $href['path']) && '/' != $href['path'] && !empty($href['path'])) {
          $tag->href = '/AGC/retaildive?path=' . $href['path'];
          $tag->id = 'newtab';
          $tag->{'data-name'} = 'AGC';
          echo $tag->outertext . '<br>';
        }
      }
    }
  }
}

if (isset($_GET['path'])) {
  $dir = 'articles';
  $tl = 'id';
  $sl = 'en';
  $no_add_title = 1;
}
