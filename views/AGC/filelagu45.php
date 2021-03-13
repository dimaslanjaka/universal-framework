<?php

//http://filelagu45.wapska.com/site-download.html?to-file=110
use Curl\Curl;

$curl = new Curl();
$curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
$curl->setReferrer('http://filelagu45.wapska.com');
$_SESSION['last_visit'] = FULL_URL;
$paths = '/^\/(to\-name\=)/m';
$url = 'http://filelagu45.wapska.com';

if (isset($_REQUEST['path']) && !empty($_REQUEST['path'])) {
  $qpath = trim(urldecode($_REQUEST['path']));
  //exit($qpath);
  $page = $curl->get($url . $qpath);
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $html = str_get_html($curl->response);
    $_SESSION['title'] = $post_title = preg_replace('/\- FileLagu45/m', '', $html->find('title', 0)->plaintext);
    $post = $html->find('div.post', 0)->outertext;
    $post = str_get_html($post);
    foreach ($post->find('a,input,label,img,td') as $tag) {
      if ('a' == $tag->tag) {
        $tag->class = 'notranslate';
        if (preg_match('/goraps\.com/m', $tag->href)) {
          $tag->outertext = '';
        }
        $parseurl = parse_url($tag->href);
        if (!isset($parseurl['scheme']) && !isset($parseurl['host'])) {
          if (false !== strpos(strtolower($tag->innertext), 'unduh gratis')) {
            $parseurl['scheme'] = 'http';
            $parseurl['host'] = 'filelagu45.wapska.com';
            $tag->href = 'https://dimaslanjaka.github.io/page/safelink.html?url=' . base64_encode($core->build_url($parseurl));
            $tag->innertext = $tag->innertext . ' | Klik Lanjutkan';
            $tag->target = '_blank';
            $tag->rel = 'nofollow';
            $tag->alt = $post_title;
          } else {
            $tag->outertext = $tag->innertext;
          }
        }
      }
      if ('input' == $tag->tag) {
        if (false !== strpos($tag->value, 'filelagu45.wapska.com')) {
          $tag->outertext = '';
        }
      }
      if ('label' == $tag->tag) {
        if (false !== strpos($tag->innertext, 'Share Link :')) {
          $tag->outertext = '';
        }
      }
      if ('td' == $tag->tag) {
        $cn = ['unduhan', 'judul lagu', 'penyanyi'];
        $ct = trim(strtolower($tag->innertext));
        if (!in_array($ct, $cn)) {
          $tag->class = 'notranslate';
        }
      }
      if ('img' == $tag->tag) {
        $img_a = new AGCURL();
        $img_b = $img_a->imgcdn($tag->src);
        if (isset($img_b->url)) {
          $tag->src = $img_b->url;
        } else {
          $tag->setAttribute('src', 'https://res.cloudinary.com/dimaslanjaka/image/fetch/' . $tag->src);
        }
      }
    }
    $post_body = $post->save();
    $post_body = preg_replace('/filelagu45 terbaru/m', '', $post_body);
    $cont = '<div id="agcontent">' . $post_body . '<center><small class="notranslate">' . $post_title . '</small></center></div>';
    $tl = 'en';
    $sl = 'id';
    $dir = 'mp3';
    $_SESSION['body'] = $sess = gtrans::i()->grammar("$sl-$tl", $cont);
    if (!isset($_GET['hide'])) {
      echo html_entity_decode($sess);
    }
  }
} else {
  if (isset($_GET['input'])) {
    ?>
<center><a href="http://filelagu45.wapska.com" target="_blank">Paste Source HTML</a></center>
<form action="" method="post">
  <textarea name="html" id="" cols="30" rows="10" class="form-control"></textarea>
  <button type="submit" class="btn-block btn-primary">Parse HTML</button>
</form>
<?php
  } ?>
<hr>
<?php
if (file_exists(__DIR__ . '/filelagu45.txt')) {
    ?>
<ul>
  <?php
  $log = file_get_contents(__DIR__ . '/log.txt', FILE_SKIP_EMPTY_LINES);
    $list = file(__DIR__ . '/filelagu45.txt', FILE_SKIP_EMPTY_LINES);
    foreach ($list as $u) {
      $e = explode('```', $u);
      $ur = parse_url($e[0]);
      if (false === strpos($log, $ur['path'] . $ur['query'])) {
        $upath = urlencode($ur['path'] . '?' . $ur['query']); ?>
  <form action="" method="post" id="<?=md5($upath); ?>">
    <input type="hidden" name="path" value="<?=$upath; ?>">
  </form>
  <li><a href="/AGC/filelagu45?path=<?=$upath; ?>"
      form="<?=$upath; ?>"><?=$e[1]; ?></a></li>
  <?php
      }
    } ?>
</ul>
<?php
  }
}
