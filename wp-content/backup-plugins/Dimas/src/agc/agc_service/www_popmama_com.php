<?php

//https://www.popmama.com/pregnancy/getting-pregnant/fajar-perdana/cara-cepat-hamil-alami-dalam-2-bulan

namespace agc_service;

/**
 * Hallosehat class
 * @package agc_service
 */
class www_popmama_com extends Service
{
  function __construct()
  {
    parent::__construct();
  }

  function content()
  {
    $this->verifydom();
    $result = '';
    if ($this->dom->find('article')) {
      foreach ($this->dom->find('article') as $c) {
        $result .= $c->innertext;
      }
    }
    $this->dom = $this->getHTML("<div id='AGCDOM'>$result</div>");
    $this->fixImageDom();
    $this->fixAnchors();
    $this->fixShare();
    $share = $this->dom->find('#read-more,#read-more-animation,.facebook-comments,.ads');
    if ($share) {
      foreach ($share as $del) {
        $del->outertext = '';
      }
    }
    return $this->dom->find("#AGCDOM", 0)->innertext;
  }
}
