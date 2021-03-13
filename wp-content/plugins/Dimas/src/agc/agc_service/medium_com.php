<?php

namespace agc_service;

/**
 * Kompi-ajaib class
 * @package agc_service
 */
class medium_com extends Service
{
  function __construct()
  {
    parent::__construct();
  }

  function content()
  {
    $this->verifydom();
    $html = $this->dom;
    $_SESSION['title'] = $this->title = $ptitle = $html && $html->find('title') ? preg_replace('/\s+/m', ' ', preg_replace('/\/|\\|\s+/m', ' ', html_entity_decode($html->find('title', 0)->plaintext))) : '';
    $result = '';
    if ($this->dom->find('#root article')) {
      foreach ($this->dom->find('#root article') as $c) {
        $result .= $c->innertext;
      }
    }
    //ev($result);
    $this->dom = $this->getHTML("<div id='AGCDOM'>$result</div>");

    $this->fixSchema();
    $this->fixImageDom();
    $this->fixAnchors();
    $this->removeElement('.du,nav,#post-sidebar,[class^="iklan-"],a[aria-label="Subscribe Adhy Suryadi Channel"],div.code-block,br,.sharing-mobile,script,.mvp-org-wrap,.adsbygoogle,.OUTBRAIN,.mvp-related-posts,.social-sharing-bot,#comments,#comments-button,.line-it-button,.postmeta,.resp-sharing');
    if ($this->dom->find('img')) foreach ($this->dom->find('img') as $img) {
      if (isset($img->src) && preg_match('/miro\.medium\.com\/max\/[0-9]{1,5}\//m', $img->src)) {
        $img->src = preg_replace('/miro\.medium\.com\/max\/[0-9]{1,5}\//m', 'miro.medium.com/max/1000/', $img->src);
      }
    }
    $result = $this->dom->find("#AGCDOM", 0)->innertext;
    return $this->output($result);
  }
}
