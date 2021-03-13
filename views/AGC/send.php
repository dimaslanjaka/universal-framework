<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<?php

use Curl\Curl;

$logtxt = file_get_contents(__DIR__ . '/log.txt');
$ex_s = explode('/', $_SESSION['target_translate']);
$exs = end($ex_s);
if (isset($_REQUEST['dump'])) {
  $core->dump([$exs, $logtxt, strpos($logtxt, $exs)]);
}
if (isset($_SESSION['tl'])) {
  $tl = $_SESSION['tl'];
} elseif (isset($_GET['tl'])) {
  $tl = $_GET['tl'];
} else {
  $tl = 'en';
}
if (isset($_SESSION['sl'])) {
  $sl = $_SESSION['sl'];
} elseif (isset($_GET['sl'])) {
  $sl = $_GET['sl'];
} else {
  $sl = 'id';
}

if (isset($_SESSION['dir'])) {
  $dir = $_SESSION['dir'] . '/';
}

if (isset($_SESSION['target_translate']) && !isset($_POST['save']) && !isset($_POST['body'])) {
  $i = $_SESSION['target_translate'];
  $fn = explode('/', $i);
  $fn = end($fn);
  if (!isset($dir)) {
    if (false !== strpos($i, '/movies/')) {
      $dir = 'movies/';
    } elseif (preg_match('(\/apk\/|revdl)', $i)) {
      $dir = 'apk/';
    } elseif (preg_match('(\/mp3\/)', $i)) {
      $dir = 'mp3/';
    }
  }
  if (preg_match("/\.html$/i", $i) && !empty($fn)) {
    $curl = new Curl();
    $curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
    $curl->setReferrer('https://www.facebook.com');
    $translate = new gtrans($curl);
    $c = '<!--translated-->' . $translate->translate($i, $sl, $tl);
    $c = preg_replace('/(\<body\>|\<\/body\>)/mi', '', $c);
    $c = trim($c);
    if (preg_match('/(Additional, a 404 error found to handle the request|The server encountered an internal error or misconfiguration and was unable to complete your request|404\. That\'s an error|The document has moved)/m', $c)) {
      if ($core->isDump()) {
        echo $_SESSION['target_translate'] . '<br/>';
      }
      die('Error: (Harap kontak Admin). ');
    } elseif ($core->isDump()) {
      echo $c;
      die();
    }

    $_SESSION['body'] = $c;
    if (!file_exists(ROOT . '/views/AGC/saved/' . $dir . $fn)) {
      _file_(ROOT . '/views/AGC/saved/' . $dir . $fn, $c . PHP_EOL, LOCK_EX);
      $_SESSION['done_url'] = $dir . $fn;
      echo "<script>(function() {
        swal('Saved & translated');
      })();</script>";
    } else {
      $exists = file_get_contents(ROOT . '/views/AGC/saved/' . $dir . $fn);
      if (false === strpos($exists, '<!--translated-->')) {
        _file_(ROOT . '/views/AGC/saved/' . $dir . $fn, $c . PHP_EOL, LOCK_EX);
        echo "<script>(function() {
          swal('Translated');
        })();</script>";
      }
    }
  }
} //session target_translate
echo '<div id="button_mail" class="container">';
if (false === strpos($logtxt, $exs) || (isset($_REQUEST['FORCE']) && is_user_logged_in() && current_user_can('administrator'))) {
  echo '<table><tr><td><button id="send_mail" class="btn btn-success" email="' . $_SESSION['for'] . '">Send This To Blogger</button></td><td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalPreview">Preview</button></td><td><a href="/AGC/post/writer" alt="' . md5($_SESSION['for']) . '" class="btn btn-danger">Edit Article</a></td></tr></table>';
} else {
  echo '<b class="tx-danger">This AGC Was Sent To Another User, Please Choose Another AGC Target</b>';
}
echo '</div>';
echo '<blockquote class="pt-5">Check <b>PREVIEW</b>, if empty result, try reload the page</blockquote>';
?>

<div class="modal fade" id="ModalPreview" tabindex="-1" role="dialog" aria-labelledby="PreviewModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="PreviewModal">
          <?= $_SESSION['title']; ?>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <?= agcparser::getInstance()->parsingview(isses('body_translated'), false, ['highlight'=>true])->load_depencies()->combine()->__toString(); ?>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary d-none">Save changes</button>
      </div>
    </div>
  </div>
</div>
<script>
  <?php if (isset($_SESSION['title']) && isset($_SESSION['body_translated'])) : ?>
  const TITLE =
    `<?= trim(urlencode($_SESSION['title'])); ?>`;
  const BODY =
    `<?= trim(urlencode(agcparser::getInstance()->parsingview(isses('body_translated'), false)->load_depencies()->combine()->__toString())); ?>`;
  <?php endif; ?>
</script>