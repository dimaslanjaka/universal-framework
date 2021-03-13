<?php

use Curl\Curl;

$url = 'https://www.dewaweb.com/blog';
$parse_url = parse_url($url);
$paths = '/\/(category|tags|author)\//m';
$exists = [];
$log = file_get_contents(__DIR__ . '/log.txt');
$start_time = microtime(true);
$curl = CuRL();
if (isset($_REQUEST['path']) && !preg_match($paths, $_REQUEST['path'])) {
  $url .= trim(urldecode($_REQUEST['path']));
  $curl->get($url);
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $html = str_get_html($curl->response);
    $ptitle = ucwords(str_replace([' | dewaweb blog', ' | Blog Dewaweb'], '', strtolower(preg_replace('/\s+/m', ' ', preg_replace('/\/|\\|\\\|\s+/m', ' ', html_entity_decode($html->find('title', 0)->plaintext))))));
    $ptitle = str_replace(['| Blog Dewaweb', '| Dewaweb'], '', $ptitle);
    $ptitle = trim($ptitle);
    $_SESSION['title'] = $ptitle;
    $content = str_get_html($html->find('.td-post-content', 0)->innertext);
    foreach ($content->find('img') as $tag) {
      if ('img' == $tag->tag) {
        $source = false;
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
      }
    }

    foreach ($content->find('div,span,p,iframe,style,meta,a,ins,script,h1,h2,h3,h4,h5,img') as $tag) {
      if ($tag->hasAttribute('style')) {
        $tag->removeAttribute('style');
      }
      if ($tag->hasAttribute('align')) {
        $tag->removeAttribute('align');
      }
      if ($tag->hasAttribute('class')) {
        if (preg_match('/wf2\-embedded/m', $tag->class)) {
          $tag->outertext = '';
        }
      }
      if ('a' == $tag->tag) {
        if (!isset($tag->alt)) {
          $tag->alt = $ptitle;
        }
        if (preg_match('/utm\_campaign/m', $tag->href)) {
          $tag->outertext = '';
        } elseif (preg_match('/\/cdn\-cgi\/l\/email\-protection/m', $tag->href)) {
          $tag->href = 'mailto:webmanajemen@gmail.com';
          $tag->innertext = 'webmanajemen@gmail.com';
        }
        $tag->innertext = preg_replace('/Blog Dewaweb/m', 'Website Manajemen Indonesia', $tag->innertext);
        if (isset($tag->href)) {
          $href = parse_url($tag->href);
          if (isset($href['host'])) {
            if ($href['host'] == $parse_url['host']) {
              if (isset($href['path'])) {
                $urlp = preg_replace('/[^a-zA-Z0-9\']/m', ' ', $href['path']);
                $urlp = trim(preg_replace('/\s+/m', ' ', $urlp));
                $urlp = preg_replace('/\s+/m', '+', $urlp);
                $tag->href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . $urlp;
                $tag->target = '_blank';
                $tag->rel = 'follow';
              }
            } else {
              $tag->href = safelink($tag->href);
              $tag->target = '_blank';
              $tag->rel = 'follow';
            }
          }
        }
      } elseif ('p' == $tag->tag) {
        $regex_pharenties = '/\s\((.*?)\)|\[(.*?)\]|\{(.*?)\}|\"(.*?)\"|\“(.*?)\”\s/m';
        //$regex_pharenties = '/\((.*?)\)|\[(.*?)\]|\{(.*?)\}|\=?\"(.*?)\"|\=?\“(.*?)\”/m';
        if (!empty($tag->innertext)) {
          $ch = str_get_html($tag->innertext);
          if ($ch->find('*')) {
            foreach ($ch->find('*') as $e) {
              if ('b' != $e->tag || 'img' != $e->tag) {
                if (!empty($e->innertext)) {
                  if (preg_match($regex_pharenties, $e->innertext, $matches)) {
                    $e->innertext = preg_replace($regex_pharenties, '<b>\\0</b>', $e->innertext);
                  }
                }
              }
            }
          } else {
            $tag->innertext = preg_replace($regex_pharenties, '<b>\\0</b>', $tag->innertext);
          }
        }
      } elseif ('iframe' == $tag->tag) {
        $tag->width = '100%';
        $tag->height = '300px'; //script,ins,.wf2-embedded,style,meta
      } elseif ('script' == $tag->tag) {
        $tag->outertext = '';
      } elseif ('ins' == $tag->tag) {
        $tag->outertext = '';
      } elseif ('meta' == $tag->tag) {
        $tag->outertext = '';
      } elseif ('style' == $tag->tag) {
        $tag->outertext = '';
      }
    }
    $c1html = $content->save();
    $c1html = str_replace(['<b>jumlah kata pada a</b><b>rtikelmu</b>'], ['<b>jumlah kata pada artikel anda</b>'], $c1html);
    $titlehtml = '<title>' . $ptitle . '</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/AGC/css/responsive.css">';
    $cont = $titlehtml . $c1html . '<center><small>' . html_entity_decode($ptitle) . '</small></center>';
    $cont = '<div id="agcontent">' . $cont . '</div>';
    $tl = 'en';
    $sl = 'id';
    $dir = 'articles';
    $_SESSION['body'] = $sess = gtrans::i()->grammar("$sl-$tl", $cont);
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
  }
}

function parse_links($index)
{
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
            $href['inner'] = isset($index->title) ? $index->title : $index->innertext;
            $href['href'] = str_replace('/blog', '/AGC/dewaweb?path=', $href['path']);

            if (!preg_match($paths, $href['path']) && false === strpos($log, str_replace(['/blog/', '/'], '', $href['path']))) {
              echo '<a href="' . $href['href'] . '" id="newtab" data-name="dewaweb" target="_blank">' . $href['inner'] . '</a><br/>';
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
              echo '<a href="' . $href['href'] . '" class="tx-danger">' . $href['inner'] . '</a><br/>';
            }
          }
        }
      }
    }
  }
}
