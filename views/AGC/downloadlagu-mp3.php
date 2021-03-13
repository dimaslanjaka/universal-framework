<?php

//https://downloadlagu-mp3.net/seventeen-kemarin-official-music-mp3-mp3/RGLPm-hHCnM.html
use Curl\Curl;

$curl = new Curl();
$curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
$curl->setReferrer('https://www.facebook.com');
$paths = '/^\/(page|category|tag)/m';
//$url = "https://www.bagas31.info/2018/10/magix-vegas-pro-16-build-307-full-version.html";
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
$url = 'https://downloadlagu-mp3.net';
$parseurl = parse_url($url);
$no_add_title = 1;
$log = file_get_contents(__DIR__ . '/log.txt');
$send = true;
$send_msg = '';
$agc = new gtrans($curl);

if (!isset($_REQUEST['path']) || preg_match($paths, $_REQUEST['path'])) {
  $curl->get($url);
  $page = $curl->response;
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $html = str_get_html($page);
    $c1 = str_get_html($html->find('div#content', 0)->outertext . $html->find('div#sidebar', 0)->outertext);
    foreach ($c1->find('a') as $a) {
      if (false === strpos($a->innertext, '<img')) {
        $curl->get($a->href);
        if (!$curl->error) {
          $ae = str_get_html($curl->response);
          foreach ($ae->find('a') as $ai) {
            elink($log, $ai);
          }
        }
        elink($log, $a);
      }
    }
    //$cs2 = str_get_html($html->find('div#sidebar', 0)->outertext);
  }
} else {
  $url .= trim(urldecode($_REQUEST['path']));
  $curl->get($url);
  if ($curl->error) {
    $agc->curl_err($curl);
  } else {
    $html = str_get_html($curl->response);
    $_SESSION['title'] = $ptitle = preg_replace('/\s+/m', ' ', preg_replace('/\/|\\|\\\|\s+/m', ' ', html_entity_decode($html->find('title', 0)->plaintext)));
    $id = '';
    foreach ($html->find('h3,a,h1,ins,script,iframe,div,br,span') as $tag) {
      if ('fb-share-button' == $tag->class) {
        $tag->outertext = '';
      }
      if ('twitter-share-button' == $tag->class) {
        $tag->outertext = '';
      }
      if ($tag->hasAttribute('style')) {
        if ('font-style: italic;' == $tag->style) {
          $tag->outertext = '<i>' . preg_replace('/\-\sDownloadlagu\-Mp3\.Net/m', '', $tag->innertext) . '</i>';
        }
      }
      if ('h3' == $tag->tag) {
        if ('lirik:' == strtolower($tag->innertext)) {
          $ititle = $_SESSION['title'] = trim(preg_replace('/\[.*\]|download|lagu|cepat|mp3|mudah|\-\sgratis/m', '', strtolower($ptitle)));
          $tag->innertext = ucwords("Lirik $ititle:");
        }
      }
      if ('h1' == $tag->tag) {
        $tag->class = 'notranslate';
        $tag->for = 'title';
      }
      if ('a' == $tag->tag) {
        $href = parse_url($tag->href);
        if (!isset($href['host']) && 'button-download' == $tag->class) {
          $tag->href = safelink('https://downloadlagu-mp3.net' . $href['path']);
          $id = explode('~', $href['path']);
          $tag->innertext = 'Download Mp3 Server 1';
          $tag->target = '_blank';
          $tag->class = $tag->class . ' btn btn-outline-primary ld-over-full';
        }
      }
      if ('ins' == $tag->tag || 'script' == $tag->tag) {
        $tag->outertext = '';
      }
    }
    //$ex = explode('~', $html->find('a.button-download', 0)->href);
    $id = str_replace('.html', '', $id[1]);
    //fetch metro
    $ht = '';
    $ff = $curl->get('https://metrolagu.online/getmp3?v=' . $id);
    $gg = str_get_html($curl->response);
    if ($gg) {
      if ($gg->find('.ngiri')) {
        $hh = str_get_html($gg->find('.ngiri', 0)->outertext);
        $hh->find('center', 0)->outertext = '';
        $hh->find('.lirik', 0)->outertext = '';
        $hh->find('iframe', 0)->src = 'https://wp.webmanajemen.com/receiver/?url=https://metrolagu.online' . $hh->find('iframe', 0)->src;
        $ht .= '<center>Play/Stream ' . $ptitle . ' Online</center>' . $hh->find('iframe', 0)->outertext . '<hr>';
        if ($hh) {
          foreach ($hh->find('a,iframe') as $a) {
            if (isset($a->class) && false !== strpos($a->class, 'share-btn')) {
              $a->outertext = '';
            } elseif ('a' == $a->tag) {
              $a->href = safelink('https://metrolagu.online' . $a->href);
              $a->target = '_blank';
              if (false !== strpos(trim($a->innertext), 'MP3')) {
                $a->innertext = ucwords('Download MP3 Server 4');
                $ht .= $a->outertext . '<hr>';
              }
            }
          }
        }
      }
    }

    //end metro
    //start local machine
    if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/tmp/' . $id . '.json')) {
      $infojson = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/tmp/' . $id . '.json'));
      if (isset($infojson->drive)) {
        $uld = '<table style="width:100%;border-top:1px solid lightgrey;border-bottom:1px solid lightgrey;">';
        $ii = 0;
        $jsonURL = array_filter($infojson->url);
        foreach ($jsonURL as $udrive) {
          if (empty($udrive)) {
            continue;
          }
          ++$ii;
          $uld .= '<tr style="border:1px solid lightgrey;">' . (1 == $ii ? '<th style="border:1px solid lightgrey;" rowspan="' . count($jsonURL) . '">Google Drive</th>' : false) . '<td><a style="color:green" href="' . safelink($udrive) . '" target="_blank" alt="' . $ptitle . ' via GD">Google Drive ' . $ii . '</a></td></tr>';
        }
        $uld .= '</table>';
      } else {
        $send = false;
        $send_msg = 'Json->drive Link not found';
      }
    } else {
      $send = false;
      $send_msg = 'Json file not found';
    }
    //end local machine
    $html->find('i.load-percent', 0)->outertext = '
    <div id="download-alt">
    <hr>
    <a href="' . safelink('https://savemp3.cc/id/youtube/' . $id) . '" target="_blank" alt="' . $ptitle . '" rel="follow" target="_blank" rel="nofollow" class="btn btn-outline-primary ld-over-full">Download Mp3 Server 2</a>
    <hr>
    <center>Download Server 3</center><iframe src="https://www.yt-download.org/@api/button/mp3/' . $id . '" width="100%" height="100px" scrolling="no" style="border:none;"></iframe><hr>
    </div>
    ' . (isset($uld) && !empty($uld) ? $uld : false) . '
    ';
    $html->find('div.sinfo', 0)->innertext = str_replace('<br>', '', $html->find('div.sinfo', 0)->innertext);
    $html->find('div.sinfo', 0)->innertext = '<div style="border:1px solid grey;text-align:center;margin-bottom:4px;"><center>Download Links</center><hr>' . $html->find('div.sinfo', 0)->innertext . '</div>';
    $html->find('div#lr-wrapper', 0)->class = 'notranslate';
    foreach ($html->find('p') as $page) {
      if (false !== strpos($page->innertext, 'Updating ...')) {
        //$expl = explode('-', $ititle);
        //$ul = 'https://lirik.kapanlagi.com/artis/' . trim($expl[0]) . '/' . trim(preg_replace('/\s+/m', '-', trim($expl[1]))) . '/';
        //$curl->get($ul);
        $inn = '';
        $inn .= google_lirik($curl, $ititle, $inn);
        //var_dump($inn);
        if (empty($inn)) {
          $inn .= 'Lyric Failed';
          $send = false;
          $send_msg = 'Lyric Failed';
        }

        $page->innertext = $inn;
        $page->class = 'notranslate';
        $page->rel = 'bookmark';
      }
    }
    $html->find('div#wrap-video', 0)->class = 'wrap-video';
    $css = '<!--original--><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/css/iframe.css" />';
    $images = '<img width="100%" height="auto" src="' . imgCDN('https://img.youtube.com/vi/' . $id . '/hqdefault.jpg') . '" alt="' . $ptitle . '">';
    $js = '';
    $dir = 'mp3';
    if (false !== $send) {
      $tl = 'en';
      $sl = 'id';
      $sess = $css . gtrans::i()->grammar("$sl-$tl", $html->find('.song', 0)->outertext) . $images . $js;
      $_SESSION['body'] = $sess;
    } else {
      $sess = $css . $html->find('.song', 0)->outertext . $images . $js . '
      <div class="alert alert-danger mt-5 mb-5" role="alert">
      $send is false. Because: ' . $send_msg . '
      </div>
      ';
    }
    echo html_entity_decode($sess);
    if (!isset($uld)) {
      echo '<div id="loadingio-wrapper" class="ld-over-full">
      <span class="ld">
        <span class="ld ld-ball ld-bounce"></span>
        <span id="loadingio-text" class="text pt-3">Fetching MP3 Format...</span>
      </span></div>
    <script>
    const AJAX_URL = "/AGC/downloadlagu-mp3";
    const AJAX_DATA = {"id":"' . $id . '"};
    const AJAX_ID = "' . $id . '";
    </script>';
    }
  }
}

function elink($log, $a)
{
  global $parseurl;
  $href = parse_url($a->href);
  $expl = (isset($href['path']) ? explode('/', $href['path']) : []);
  $e = str_replace('.html', '', end($expl));
  if (isset($parseurl['host']) && isset($href['host'])) {
    if ($parseurl['host'] == $href['host'] && !empty($e) && false === strpos($log, $e)) {
      $a->href = '/AGC/downloadlagu-mp3?path=' . $href['path'];
      $a->id = 'newtab';
      $a->setAttribute('data-name', 'mp3');
      echo $a->outertext . '<br>';
    }
  }
}

function parse_lirik($url, $html)
{
  $_SESSION['lyric_url'] = $url;
  $p = str_get_html($html);
  $u = parse_url($url);
  $result = '';
  foreach ($p->find('iframe,ins,script,a') as $r) {
    if ('a' == $r->tag) {
      $expl = explode('/', $r->href);
      $e = preg_replace('/\.html|-/m', ' ', end($expl));
      $r->href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . $e;
    } else {
      $r->outertext = '';
    }
  }
  if (isset($u['host'])) {
    switch ($u['host']) {
      case 'lyricsalls-v1.blogspot.com':
        $result = nl2br($p->find('.entry-content', 0)->innertext);
        break;
      case 'www.wowkeren.com':
        if ($p->find('ins,script,.videoWrapper')) {
          foreach ($p->find('ins,script,.videoWrapper') as $d) {
            $d->outertext = '';
          }
        }
        if ($p->find('.news-details-layout1')) {
          foreach ($p->find('.news-details-layout1') as $lirik) {
            $result .= $lirik->innertext;
          }
        }
        break;
      case 'www.musixmatch.com':
        if ($p->find('.lyrics__content__warning', 0)) {
          foreach ($p->find('.lyrics__content__warning') as $i) {
            $result = nl2br(str_replace('  ', '<br/>', $i->outertext));
            if (preg_match_all('/\b([A-Z]+)/m', $result, $m)) {
              $result = preg_replace('/\b([A-Z]+)/m', '<br/>\\0', $result);
            }
          }
        }
        break;
      case 'myindolirik.blogspot.com':
        $r = preg_replace('/yang disediakan di blog ini adalah hakcipta\/hakmilik dari pengarang, artis, dan label musik yang bersangkutan\. Seluruh media\, termasuk lirik lagu serta video klip | yang tersedia di situs ini hanyalah untuk keperluan promosi dan evaluasi\. Kami juga tidak menyediakan file MP3 di server kami\.|Muzik video dan lirik lagu|Jika Anda suka dengan Lirik lagu|, dan video klip nya, belilah kaset \/ CD \/ DVD, mp3 karaoke atau kode nada sambung pribadi \(NSP\/RBT\)-nya untuk mendukung artis yang bersangkutan\.|Jika Anda suka dengan/m', '', $p->find('.entry-content', 0)->innertext);
        if (preg_match('/(.*)Disclaimer:/m', $r, $m)) {
          $result = $m[0] . ' ' . ucwords($_SESSION['title']);
        } else {
          $result = $r;
        }
        break;
      case 'genius.com':
        $result = $p->find('.lyrics', 0)->innertext;
        break;
      case 'www.azlyrics.com':
        $pa = str_get_html($p->find('.col-lg-8', 0)->innertext);
        foreach ($pa->find('form,iframe,.div-share,script,.lyricsh,.ringtone,.noprint,.smt') as $re) {
          $re->outertext = '';
        }
        $result = $pa->save();
        break;
      case 'lirik-liriku.blogspot.com':
        $pa = str_get_html($p->find('div[dir="ltr"]', 0)->innertext);
        foreach ($pa->find('form,iframe,script,img') as $re) {
          if ('img' == $re->tag) {
            $re->src = imgCDN($re->src);
          } else {
            $re->outertext = '';
          }
        }
        $result = $pa->save();
        break;
      case 'lirik.kapanlagi.com':
        if ($p->find('.col-lirik', 0)) {
          $lpost = $p->find('.col-lirik', 0)->outertext;
          if (!empty($lpost)) {
            $oh = str_get_html($lpost);
            foreach ($oh->find('.lirik_line') as $lirik) {
              if (false !== strpos($lirik->innertext, 'Chorus:')) {
                $result .= '<br>' . $lirik . '<br>';
              } else {
                $result .= $lirik . '<br>';
              }
            }
          }
        }
        break;
      case 'lirik.web.id':
        $pa = explode('``==``', preg_replace('/\<div\sid\=[\'"]konten[\'"]\>\<\/div\>/m', '``==``', $p->find('.entry-content', 0)->innertext));
        $result = $pa[1];
        break;
      case 'www.liriklagu.info':
        $result = nl2br($p->find('.entry-content', 0)->innertext);
        break;
      case 'video.tribunnews.com':
        if ($p->find('.txt-article', 0)) { //.side-article
          $txt = $p->find('.txt-article', 0)->innertext;
          if (!empty($txt)) {
            $par = str_get_html($txt);
            foreach ($par->find('strong') as $tag) {
              if (false !== preg_match('/TRIBUN\-VIDEO\.COM|Tribunwow\.com/m', $tag->innertext)) {
                $tag->innertext = preg_replace('/TRIBUN\-VIDEO\.COM|Tribunwow\.com/m', 'web-manajemen.blogspot.com', $tag->innertext);
              }
            }

            return $par->save();
          }
        }
        break;
      default:
        $result = $url . '<br>';
        break;
    }
  }

  return $result;
}

function google_lirik($curl, $ititle, $inn)
{
  $g = 'https://www.google.com/search?q=Lirik+' . urlencode($ititle);
  $_SESSION['google_lyrics'] = $g;
  //$inn .= $g;
  if (isset($_SESSION['proxy']) && !empty($_SESSION['proxy'])) {
    $curl->setProxy(trim(preg_replace('/\s+/m', '', $_SESSION['proxy'])));
    $curl->setProxyTunnel(true);
  }
  $curl->get($g);

  if ($curl->error) {
    exit('Google Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n");
  } else {
    $gs = str_get_html($curl->response);
    $_SESSION['google_lyrics_title'] = $gt = $gs->find('title', 0)->plaintext;
    if ('302 Moved' == $gt) {
?>
      <script>
        AJAX_PROXY = true;
      </script>
<?php
    }
    foreach ($gs->find('a') as $gsa) {
      $href = parse_url($gsa->href);
      if (isset($href['host']) && strlen($href['host']) > 5 && !preg_match('/google\.|googleusercontent\.|youtube\./m', $href['host'])) {
        $curl->get($gsa->href);
        if ($curl->error) {
          exit('Google Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . ': ' . $gsa->href . "\n");
        } else {
          $par = parse_lirik($gsa->href, $curl->response);
          if (filter_var($par, FILTER_VALIDATE_URL) || empty($par)) {
            $fil = parse_url($par);
            if (isset($fil['host'])) {
              if (!preg_match('/liputan6|fimela|vidio\.com/m', $fil['host'])) {
                echo $par;
              }
            }
          } else {
            $inn .= $par;
            break;
          }
        }
      }
    }
  }

  return $inn;
}
