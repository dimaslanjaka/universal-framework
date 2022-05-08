<?php

namespace agc_service;

/**
 * Hallosehat class
 * @package agc_service
 */
class hellosehat_com extends Service
{
  function __construct()
  {
    parent::__construct();
  }

  function content()
  {
    $this->verifydom();
    $result = '';
    if ($this->dom->find('.entry-content-body')) {
      foreach ($this->dom->find('.entry-content-body') as $c) {
        $result .= $c->innertext;
      }
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
