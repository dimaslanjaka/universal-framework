<?php

namespace agc_service;

/**
 * Inwepo class
 * @package agc_service
 */
class inwepo_co extends Service
{
  function __construct()
  {
    parent::__construct();
  }

  function content()
  {
    $this->verifydom();
    $result = '';
    if ($this->dom->find('article#post-area')) {
      foreach ($this->dom->find('article#post-area') as $c) {
        $result .= $c->innertext;
      }
    }
    $this->dom = $this->getHTML("<div id='AGCDOM'>$result</div>");
    if ($this->dom->find('#post-info-wrap')) $this->dom->find('#post-info-wrap', 0)->outertext = '';
    if ($this->dom->find('.social-sharing-top')) $this->dom->find('.social-sharing-top', 0)->outertext = '';
    if ($this->dom->find('header#post-header h1')) {
      $this->dom->find('header#post-header', 0)->outertext = '<h2>' . $this->dom->find('header#post-header h1', 0)->plaintext . '</h2>';
    }
    if ($this->dom->find('div[style="margin-top:15px;margin-bottom:5px;"]')) {
      foreach ($this->dom->find('div[style="margin-top:15px;margin-bottom:5px;"]') as $x) {
        $x->outertext = '';
      }
    }
    $this->fixImageDom();
    $this->fixAnchors();
    $share = $this->dom->find('div.code-block,br,.sharing-mobile,script,.mvp-org-wrap,.adsbygoogle,.OUTBRAIN,.mvp-related-posts,.social-sharing-bot,#comments,#comments-button,.line-it-button');
    if ($share) {
      foreach ($share as $del) {
        $del->outertext = '';
      }
    }
    $result = $this->dom->find("#AGCDOM", 0)->innertext;
    return $this->output($result);
  }
}
