<?php

namespace agc_service;

/**
 * Kompi-ajaib class
 * @package agc_service
 */
class www_kompiajaib_com extends Service
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
    if ($this->dom->find('.post-body')) {
      foreach ($this->dom->find('.post-body') as $c) {
        if ($c->find('amp-img')) foreach ($c->find('amp-img') as $img) {
          $imgalt = isset($img->alt) ? trim($img->alt) : false;
          $imgtitle = isset($img->title) ? trim($img->title) : false;
          $img->outertext = '<img src="' . $img->src . '" alt="' . $imgalt . '"/ title="' . $imgtitle . '">';
        }
        $result .= $c->innertext;
      }
    }
    $this->dom = $this->getHTML("<div id='AGCDOM'>$result</div>");
    $this->fixImageDom();
    $this->fixAnchors();
    $share = $this->dom->find('[class^="iklan-"],a[aria-label="Subscribe Adhy Suryadi Channel"],div.code-block,br,.sharing-mobile,script,.mvp-org-wrap,.adsbygoogle,.OUTBRAIN,.mvp-related-posts,.social-sharing-bot,#comments,#comments-button,.line-it-button,.postmeta,.resp-sharing');
    if ($share) {
      foreach ($share as $del) {
        $del->outertext = '';
      }
    }
    $result = $this->dom->find("#AGCDOM", 0)->innertext;
    return $this->output($result);
  }
}
