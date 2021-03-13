<?php

namespace agc_service;

/**
 * Hallosehat class
 * @package agc_service
 */
class drakorstation_com extends Service
{
  function __construct()
  {
    parent::__construct();
  }

  function content()
  {
    $this->verifydom();
    $result = '';
    $html = $this->dom;
    $title = $html->find('title', 0)->plaintext;
    $title = preg_replace('(drakorstation)', '', strtolower($title));
    $title = 'Download ' . trim(ucwords($title));
    foreach ($html->find('.post_content') as $c) {
      if ($c->find('#author-box')) {
        ///$c->find('#author-box', 0)->outertext;
      }
      foreach ($c->find('a') as $a) {
        $a->title = $title;
        $a->alt = $title;
        $a->rel = 'nofollow noopener noreferer';
        $match = $this->parse_url;
        $match_href = parse_url($a->href);
        $href_scheme = (isset($match_href['scheme']) ? $match_href['scheme'] : 'http');
        $x = $href_scheme . '://' . $match['host'];

        if (\gtrans::i()->download_site($a->href)) {
          $a->href = 'https://dimaslanjaka.github.io/page/safelink.html?url=' . base64_encode($a->href);
          $a->target = '_blank';
        } else if (false !== strpos($a->href, $match['host'])) {
          //$a->href = str_replace($x, '?path=', $a->href);
          $href = array_filter(explode('/', $a->href));
          $href = end($href);
          $href = preg_replace('(\.html|[^a-zA-Z ])', ' ', $href);
          $href = preg_replace('/\s+/', ' ', $href);
          $href = trim($href);
          $href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . $href;
          $a->href = $href;
          $a->target = '_blank';
          $a->rel = 'follow';
        }
      }
      if ($c->find('img')) {
        foreach ($c->find('img') as $img) {
          if (!isset($img->title) && (isses('title') && !empty(isses('title')))) {
            $img->setAttribute('title', $title);
          }
          $img->width = '100%';
          $img->height = 'auto';
          $img->alt = $title;
          $img->title = $title;
          $img->src = imgCDN($img->src);
          if ($img->hasAttribute('srcset')) {
            $img->removeAttribute('srcset');
          }
          if ($img->hasAttribute('style')) {
            $img->removeAttribute('style');
          }
          if ($img->hasAttribute('sizes')) {
            $img->removeAttribute('sizes');
          }
        }
      }

      $chtml = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/AGC/css/responsive.css">' . $c->outertext;
      $tl = 'en';
      $sl = 'id';
      $agc = new \gtrans();
      $result .= $agc->addtitle($title)->grammar("$sl-$tl", $chtml, true)->__toString();
      $_SESSION['category'] = ['drama korea', 'movies'];
      $_SESSION['tag'] = ['download', "$sl-$tl"];
    }
    $this->dom = $this->getHTML("<div id='AGCDOM'>$result</div>");
    $this->fixImageDom();
    $this->fixAnchors();
    $share = $this->dom->find('.sharing-mobile');
    if ($share) {
      foreach ($share as $del) {
        $del->outertext = '';
      }
    }
    $result = $this->dom->find("#AGCDOM", 0)->innertext;
    return $this->output($result);
  }
}
