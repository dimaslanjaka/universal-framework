<?php

//https://www.bagas31.info/category/design

namespace agc_service;

/**
 * Hallosehat class.
 */
class www_bagas31_info extends Service
{
  public function __construct()
  {
    parent::__construct();
  }

  public function content()
  {
    $this->verifydom();
    $result = '';
    $ptitle = $this->title(function ($title) {
      $title = preg_replace('/(BAGAS31|BAGAS31.com|BAGAS31.info)/i', 'WMI', $title);
      return $title;
    });

    if (!$this->dom->find('.entry-content')) {
      echo 'major content undefined';

      return;
    }
    if ($this->dom->find('.entry-content')) {
      $this->fixImageDom(function ($images) {
        if (false !== strpos($images->src, 'gratis31')) {
          $images->src = str_replace('www.gratis31.com', 'www.bagas31.info', $images->src);
        }
      });

      $c1 = $this->dom->find('.entry-content', 0);
      $this->removeElement('.post-terkait,.box-kanan,.g-ytsubscribe,#box-bottom,meta,.ddnbtn,.crp_related,.cumplung,[itemprop="logo"]');

      if ($this->dom->find('center a', 0)) {
        $this->dom->find('center a', 0)->outertext = '';
      }
      foreach ($this->dom->find('h1,h2,h3,h4,h5,a,style') as $tag) {
        if (preg_match('(h1|h2|h3|h4|h5|a)', $tag->tag)) {
          if (!preg_match('/https?\:\/\/(groups\.google\.com)/m', $tag->href)) {
            if ($tag->hasAttribute('class')) {
              $tag->setAttribute('class', 'notranslate ' . $tag->getAttribute('class'));
            } else {
              $tag->setAttribute('class', 'notranslate');
            }
          }
          if ('style' == $tag->tag) {
            $tag->outertext = '';
          }
        }
      }

      foreach ($c1->find('center,div,span,i,b,strong,p,a,iframe') as $tag) {
        if (isset($tag->style)) {
          $tag->removeAttribute('style');
        }
        if ('iframe' == $tag->tag) {
          if ($tag->hasAttribute('class')) {
            if ('addon-iframe' == $tag->class) {
              $tag->outertext = '';
            }
          }
        }
        if ('iframe' != $tag->tag) {
          if ('' == trim($tag->innertext)) {
            $tag->outertext = '';
          }
        }

        if ('div' == $tag->tag) {
          if ($tag->hasAttribute('class')) {
            if (preg_match('/(coroabiscuy)/', $tag->attr['class'])) {
              $tag->outertext = '';
            } elseif (preg_match('/(rank\-math\-total\-wrapper)/m', $tag->attr['class'])) {
              $tag->style = 'display:none;visibility:hidden';
            }
          }
        }
        if ('a' == $tag->tag) {
          if (preg_match('(telolet)', $tag->href)) {
            $href = parse_url($tag->href);
            $hrefx = parse_str($href['query'], $hr);
            if (isset($hr['go'])) {
              $tag->href = 'https://dimaslanjaka.github.io/page/safelink.html?url=' . $hr['go'];
            }
          }
          if (preg_match('/(https:\/\/www.bagas31.info\/|https:\/\/www.bagas31.info|https:\/\/www.bagas31.com\/|https:\/\/www.bagas31.com)/i', strtolower($tag->href))) {
            $href = explode('/', $tag->href);
            $href = end($href);
            $href = preg_replace('(\.html|[^a-zA-Z ])', ' ', $href);
            $href = preg_replace('/\s+/', ' ', $href);
            $href = trim($href);
            $href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . $href;
            $tag->setAttribute('href', $href);
            $tag->target = '_blank';
          }
          if (!isset($tag->attr['alt']) || empty($tag->alt)) {
            $tag->attr['alt'] = $_SESSION['title'];
          }
          if (!isset($tag->attr['title']) || empty($tag->title)) {
            $tag->attr['title'] = $_SESSION['title'];
          }
        }
        if (!empty($tag->getAttribute('style'))) {
          $tag->removeAttribute('style');
        }
        if (!empty($tag->getAttribute('itemprop'))) {
          if (preg_match('/(image|logo)/', $tag->getAttribute('itemprop'))) {
            $tag->outertext = '';
          }
        }
        if ($tag->hasAttribute('class')) {
          if ('rank-math-total-wrapper' == $tag->class) {
            $tag->setAttribute('style', 'display:none');
          }
        }
      }
      /**
       * Extract password
       */
      foreach ($c1->find('div,strong,span,input,font,li') as $passwd) {
        if ($passwd->tag == 'input' && $passwd->hasAttribute('value')) {
          if (preg_match('/www\.bagas31\.(com|info)/m', $passwd->value)) {
            $passwd->outertext = '<a href="https://web-manajemen.blogspot.com/p/password.html?c=' . base64_encode(trim($passwd->value)) . '" target="_blank" alt="Click" title="Click" rel="follow">Here</a>';
            break; //password found
          }
        } else if ('strong' == $passwd->tag) {
          if ($passwd->find('input')) {
            $passwd->find('input', 0)->outertext = $passwd->find('input', 0)->value;
          }
          if (preg_match('/Password\s+www?\.bagas31\.info|www?\.bagas31\.com|Password\s?\:\s?www\.bagas31\.(info|com)/m', html_entity_decode($passwd->innertext), $matches)) {
            if (isset($matches[0])) {
              $passwd->innertext = str_replace($matches[0], '<a href="https://web-manajemen.blogspot.com/p/password.html?c=' . base64_encode(trim($matches[0])) . '" target="_blank" alt="Click to get password" rel="follow">Password Link</a>', html_entity_decode($passwd->innertext));
              break; //password found
            }
          }
        } else if ('www.bagas31.com' == trim($passwd->innertext) || 'www.bagas31.info' == trim($passwd->innertext)) {
          $passwd->innertext = '<a href="https://web-manajemen.blogspot.com/p/password.html?c=' . base64_encode(trim($passwd->innertext)) . '" target="_blank" alt="Click" title="Click" rel="follow">Here</a>';
          break; //password  found
        } else {
          /*
          $PasswordRegex = '/Password\s?\:\s?www\.bagas31\.(info|com)/m';
          if (preg_match('/\&nbsp;/m', $passwd->innertext)) {
            $passwd->innertext = preg_replace('/\s+/m', ' ', preg_replace('/\&nbsp;/m', ' ', $passwd->innertext));
          }
          $decoded = str_replace('&nbsp;', ' ', htmlspecialchars_decode($passwd->innertext));
          if (preg_match($PasswordRegex, $decoded, $passMatch)) {
            $passwd->innertext = preg_replace($PasswordRegex, '<a href="https://web-manajemen.blogspot.com/p/password.html?c=' . base64_encode(trim($passMatch[0])) . '" target="_blank" alt="Click" title="Click" rel="follow">PASSWORD LINK</a>', $passwd->innertext);
          }

          if (false !== strpos($passwd->innertext, 'Password:&nbsp;www.bagas31.com')) {
            $passwd->innertext = str_replace('Password:&nbsp;www.bagas31.com', 'Password', $passwd->innertext);
          }
          */
        }
      }

      $css = '<link rel="stylesheet" src="https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/AGC/css/bagas31.css"/>';
      //$c1html = $this->bagasPass($css . $c1->outertext)->outertext;
      $c1html = preg_replace('/(BAGAS31.com|BAGAS31.info)/m', 'Web Development Indonesia', $c1->innertext);
      $c1html = preg_replace("/(BAGAS31\s\&\#8211\;)/m", "\t", $c1html);
      $titlehtml = '<title>' . $ptitle . '</title>';
      $cont = $titlehtml . $c1html . '<center><small>' . $ptitle . '</small></center>';
      $cont = '<div id="agc_result">' . $cont . '</div>';
      $result .= $cont;
    }

    $this->dom = $this->getHTML("<div id='AGCDOM'>$result</div>");
    //$this->fixAnchors();
    //$this->fixSchema();
    //$this->fixShare();
    $share = $this->dom->find('#read-more,#read-more-animation,.facebook-comments,.ads');
    if ($share) {
      foreach ($share as $del) {
        $del->outertext = '';
      }
    }

    $result = $this->dom->find("#AGCDOM", 0)->innertext;
    return $this->output($result);
  }
}
