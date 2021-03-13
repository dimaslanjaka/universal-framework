<?php

//https://igg-games.com/time-warpers-free-download.html

namespace agc_service;

/**
 * Hallosehat class.
 */
class igg_games_com extends Service
{
  public function __construct()
  {
    parent::__construct();
  }
  function content()
  {
    $this->verifydom();
    $title = $this->title(function ($pt) {
      return str_replace(' « IGGGAMES', '', $pt);
    });
    if ($this->dom->find('.uk-margin-medium-top')) {
      $c = $this->dom->find('.uk-margin-medium-top', 0);
      if ($c->find('script')) {
        foreach ($c->find('script') as $x) {
          if (!$x->hasAttribute('src')) {
            $x->outertext = '';
          }
        }
      }
      $this->fixStyle('*');
      $this->fixImageDom(function ($imgDom) {
        if (isset($imgDom->src)) {
          if (preg_match('/svg$/s', $imgDom->src)) {
            $imgDom->style = 'margin-right: 2px;';
          }
        }
      });
      foreach ($this->dom->find('a') as $tag) {
        if (isset($tag->href)) {
          $href = parse_url2($tag->href);
          if (isset($href['host'])) {
            switch ($href['host']) {
              case 'bluemediafiles.com':
                if (isset($href['query']['xurl'])) {
                  $xurl = parse_url2($href['query']['xurl']);
                  $xurl['scheme'] = 'http';
                  $tag->src = $this->build_url($xurl);
                }
                break;
            }
          }
        }
      }
      $this->contentHTML = $c->innertext;
      //$this->generateArticle();
      $this->fixAnchors();
      $cont = '<h1 for="title">' . $title . '</h1>';
      $cont .= $c->outertext;
      return $cont;
    }
  }
}
