<?php

use Curl\Curl;

$url = 'https://www.lyfemarketing.com/blog';
$parse_url = parse_url($url);
$paths = '/\/(category|tags|author|page)\//m';
$exists = [];
$log = file_get_contents(__DIR__ . '/log.txt');
$start_time = microtime(true);
$post_list = [];
$page_list = [];
$curl = CuRL();
if (isset($_REQUEST['path']) && !preg_match($paths, $_REQUEST['path'])) {
  $url .= trim(urldecode($_REQUEST['path']));
  $_SESSION['target'] = $url;
  $curl->get($url);
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $html = str_get_html($curl->response);
    $cont = html_entity_decode($html->find('.post-featured-item img', 0)->outertext);
    $cont .= html_entity_decode($html->find('.post-entry-text', 0)->innertext);
    $post = str_get_html($cont);
    $ptitle = parse_title($html);
    if (preg_match('/&(?:[a-z]+|#\d+);|&(?:[a-z]+|#x?\d+);/m', $ptitle, $match_title)) {
      $ptitle = str_replace($match_title[0], htmlspecialchars_decode($match_title[0]), $ptitle);
    }
    $keyword_array = parse_words($ptitle);
    $_SESSION['title'] = $ptitle;
    if ($post->find('.swp_social_panel,.cp-module,.cp-modal-popup-container')) {
      foreach ($post->find('.swp_social_panel,.cp-module,.cp-modal-popup-container') as $x) {
        $x->outertext = '';
      }
    }
    if ($post->find('h1,h2,h3,h4,h5')) {
      foreach ($post->find('h1,h2,h3,h4,h5') as $header) {
        if (count($header->children()) > 0) {
          $header->innertext = trim($header->plaintext);
        }
      }
    }

    foreach ($post->find('*') as $tag) {
      if (isset($tag->class)) {
        $tag->removeAttribute('class');
      }
      if (isset($tag->style)) {
        $tag->removeAttribute('style');
      }
      if (preg_match('/script|ins|meta|link/s', $tag->tag)) {
        $tag->outertext = '';
        continue;
      }
      if (preg_match('/^(span|b|em|div|strong)$/s', $tag->tag)) {
        continue;
      }
      if (isset($tag->href) && 'a' == $tag->tag) {
        if (preg_match('/^tel\:/m', $tag->href)) {
          $tag->innertext = '+62 856 5566 7573';
          $tag->href = 'tel:+6285655667573';
          continue;
        }
        $href = parse_url($tag->href);
        if (isset($href['host'])) {
          if ($href['host'] == $parse_url['host']) {
            $ex = explode('/', $href['path']);
            $ex = array_filter((array) $ex);
            $ex = end($ex);
            $ex = str_replace('-', '+', $ex);
            $tag->href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . $ex;
            //$tag->href =
            $tag->target = '_blank';
            $tag->rel = 'follow';
            if (!isset($tag->title)) {
              $tag->title = $ptitle;
            }
          } else {
            $SE = '/google\.|facebook\.|linkedin\.|twitter\.|bing\./m';
            if (!preg_match($SE, $href['host'])) {
              $tag->href = safelink($tag->href);
            }
            $tag->rel = 'nofollow noopener';
            if (!isset($tag->title)) {
              $tag->title = $ptitle;
            }
          }
        }
        continue;
      } elseif ('img' == $tag->tag) {
        $source = false;
        $tag->class = 'd-block';
        if ($tag->hasAttribute('srcset')) {
          //$tag->removeAttribute('srcset');
          $regex_url = '#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#';
          if (preg_match_all($regex_url, $tag->srcset, $match)) {
            for ($i = 0; $i < count($match[0]); ++$i) {
              //$match[0][$i] = imgCDN($match[0][$i]);
              $source = end($match[0]);
              $tag->srcset = str_replace(trim($match[0][$i]), imgCDN(trim($match[0][$i])), $tag->srcset);
            }
          }
        }
        if (isset($tag->src)) {
          $srcp = parse_url($tag->src);
          $src = imgCDN($tag->src);
          $srcx = parse_url($src);
          $tag->src = $src;
          if ($source) {
            if (false !== strpos($src, 'cloudinary.com') || $srcx['host'] == $srcp['host']) {
              $tag->src = imgCDN($source);
            }
          }
        }
        if ($tag->hasAttribute('sizes')) {
          $tag->removeAttribute('sizes');
        }
        $tag->width = 'auto';
        $tag->height = 'auto';
        $tag->setAttribute('max-width', '100%');
        if (!isset($tag->title)) {
          $tag->title = $ptitle;
        }
        continue;
      } elseif ('p' == $tag->tag) {
        $inner = $tag->innertext;
        if (!empty($inner)) {
          if (count($tag->children()) >= 1) {
            foreach ($tag->children() as $child => $tag_) {
              if ($tag_->children() > 0) {
                foreach ($tag_->children() as $deepchild => $deep) {
                  if (count($deep->children()) > 1) {
                    foreach ($deep->children() as $keydeep => $deeptag) {
                      if (count($deeptag->children()) > 0) {
                        foreach ($deeptag->children() as $dkey => $dval) {
                          if (count($dval->children()) > 0) {
                            foreach ($dval->children() as $kk => $vv) {
                              if (count($vv->children) > 0) {
                                var_dump(count($vv->children));
                              } else {
                                if (!is_dissalowed_tag($vv)) {
                                  $vv->innertext = replace_inner($vv->innertext, false);
                                }
                              }
                            }
                          } else {
                            if (!is_dissalowed_tag($dval)) {
                              $dval->innertext = replace_inner($dval->innertext, false);
                            }
                          }
                        }
                      } else {
                        if (!is_dissalowed_tag($deeptag)) {
                          $deeptag->innertext = replace_inner($deep->innertext, false);
                        }
                      }
                    }
                  } else {
                    if (!is_dissalowed_tag($deep)) {
                      $deep->innertext = replace_inner($deep->innertext, false);
                    }
                  }
                }
              } else {
                if (!is_dissalowed_tag($tag_)) {
                  $tag_->innertext = replace_inner($tag_->innertext, false);
                }
              }
            }
          } else {
            $tag->innertext = replace_inner($tag->innertext, true);
          }
        }
      }
    }
    $post->save();
    $body = $post->find('body', 0);
    $titlehtml = '<title>' . $ptitle . '</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/AGC/css/responsive.css">';
    $cont = $titlehtml . html_entity_decode(isset($body->innertext) ? $body->innertext : $post->save()) . '<center><small>' . html_entity_decode($ptitle) . '</small></center>';
    $cont = '<div id="agcontent">' . $cont . '</div>';
    $tl = 'id';
    $sl = 'en';
    $dir = 'articles';
    $google_translator = new gtrans($curl);
    $_SESSION['body'] = $sess = $google_translator->grammar("$sl-$tl", $cont);
    echo html_entity_decode($sess);
  }
} else {
  $curl->get($url);
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $html = str_get_html($curl->response);
    foreach ($html->find('a') as $index) {
      if (isset($index->href)) {
        parse_links($index);
      }
    }
    $post_list = array_filter($post_list);
    $page_list = array_filter($page_list);
    echo implode(' ', $post_list);
    echo '<hr>';
    echo implode(' ', $page_list);
  }
}

function parse_title($html)
{
  $ptitle = preg_replace('/\/|\\|\\\|\s+/m', ' ', $html->find('title', 0)->plaintext);
  $ptitle = ucwords(str_replace([' | lyfemarketing blog', ' | Lyfe Marketing', ' - lyfe marketing'], '', strtolower($ptitle)));
  $ptitle = str_replace(['| Blog Dewaweb', '| Dewaweb'], '', $ptitle);
  $ptitle = preg_replace('/\s+/m', ' ', $ptitle);
  $ptitle = trim($ptitle);
  $ptitle = html_entity_decode($ptitle);
  $ptitle = htmlspecialchars_decode($ptitle);

  return $ptitle;
}

function parse_links($index)
{
  global $post_list;
  global $page_list;
  global $exists;
  global $parse_url;
  global $paths;
  global $log;
  global $start_time;
  if (isset($index->href) && !empty($index->href)) {
    $href = parse_url($index->href);
    $end_time = microtime(true);
    $execution_time = ($end_time - $start_time);
    if (isset($href['host'])) {
      if ($href['host'] == $parse_url['host']) {
        if (isset($href['path'])) {
          if (preg_match('/^\/blog\//s', $href['path']) && !in_array($href['path'], (array) $exists) && false === strpos($index->innertext, '<img') && '/' != $href['path'] && 'blog' != trim(strtolower($index->innertext))) {
            $exists[] = $href['path'];
            $href['href'] = str_replace('/blog', '/AGC/' . basename(__FILE__, '.php') . '?path=', $href['path']);
            $href['inner'] = isset($index->title) ? $index->title : (!empty($index->innertext) ? $index->innertext : $href['href']);
            if (!preg_match($paths, $href['path'])) {
              if (false === strpos($log, str_replace(['/blog/', '/'], '', $href['path']))) {
                $post_list[] = '<a href="' . $href['href'] . '" id="newtab" data-name="' . basename(__FILE__, '.php') . '" target="_blank">' . $href['inner'] . '</a><br/>';
              }
            } elseif (isset($_REQUEST['ext'])) {
              $curl = CuRL();
              $curl->get($index->href);
              if (!$curl->error) {
                $html = str_get_html($curl->response);
                if ($html->find('a')) {
                  foreach ($html->find('a') as $a) {
                    if ($execution_time >= 200) {
                      return null;
                    }
                    parse_links($a);
                  }
                }
              }
            } else {
              $page_list[] = '<a href="' . $href['href'] . '" class="tx-danger">' . $href['inner'] . '</a><br/>';
            }
          }
        }
      }
    }
  }
}

function is_dissalowed_tag($tag)
{
  $dissallowed_tag = ['b', 'i', 'em', 'strong', 'img', 'iframe', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'];
  if (in_array(strtolower($tag->tag), $dissallowed_tag)) {
    return true;
  } else {
    return false;
  }
}

function replace_inner($text, $ext = false)
{
  global $keyword_array;
  $regex_pharenties = '/\s\((.*?)\)|\[(.*?)\]|\{(.*?)\}|\"(.*?)\"|\“(.*?)\”\s/m';
  if ($ext && false === strpos($text, '<img')) {
    $text = preg_replace($regex_pharenties, '<b>\\0</b>', $text);
  }
  $parse = preg_split('/[\s]+/', $text, -1, PREG_SPLIT_NO_EMPTY);
  $i = 0;
  foreach ($parse as $text) {
    if (in_array($text, $keyword_array)) {
      $parse[$i] = '<b>' . $text . '</b>';
    }
    ++$i;
  }
  $text = implode(' ', (array) $parse);

  return $text;
}

function parse_words($ptitle)
{
  $dump = '';
  $words = preg_split('/[\s\W]+/', $ptitle, -1, PREG_SPLIT_NO_EMPTY);
  $words = array_filter((array) $words);
  $words = array_values($words);
  $x = ['the', 'every', 'and', 'that', 'lyfe', 'answer', 'it', 'is', 's', '039', 'here', 'the', 'and', 'answer', 'it', 'is', '039', 'here', 'of', 'every', 'on', 'to', '25', '3', 'why', 'top', 'every', 'needs', 'can', 'get', 'from', 'do', 'yes', 'no'];
  foreach (range('a', 'z') as $n) {
    $x[] = $n;
  }
  for ($ie = 0; $ie < 4; ++$ie) {
    $words = array_values($words);
    for ($i = 0; $i < count($words); ++$i) {
      $words[$i] = trim($words[$i]);
      $inA = in_array(strtolower($words[$i]), $x) || ctype_digit($words[$i]);
      if ($inA) {
        unset($words[$i]);
      }
    }
  }

  $words = array_values($words);

  $i = 0;
  foreach ($words as $key) {
    if (in_array($key, ['The', 'What'])) {
      unset($words[$i]);
    }
    ++$i;
    $dump .= $key . '\\';
  }
  foreach ($words as $word) {
    $upper = strtoupper(strtolower($word));
    $capital = ucwords(strtolower($word));
    $lower = strtolower($word);
    if (!in_array($upper, $words)) {
      $words[] = $upper;
    }
    if (!in_array($capital, $words)) {
      $words[] = $capital;
    }
    if (!in_array($lower, $words)) {
      $words[] = $lower;
    }
  }
  $words = array_values($words);
  sort($words);
  $_SESSION['keyword'] = $words;
  $dump .= '<pre class="notranslate">';
  $dump .= json_encode(['indicator' => $words], JSON_PRETTY_PRINT);
  $dump .= '</pre>';
  echo '<div class="card">
  <div class="card-body">
    <h5 class="card-title">Keywords DUmper</h5>
    <h6 class="card-subtitle mb-2 text-muted">Dump Keywords by Words of title</h6>
    <p class="card-text">' . $dump . '</p>
  </div>
</div>';

  return array_values($words);
}
