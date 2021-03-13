<?php

include __DIR__ . '/../admin/func.php';
$client = gclient();
/**
 * drakorstation.
 */
$paths = '/^\/(cara\-(memunculkan\-subtitle|download)|drama\-(korea|china|ongoing)\-?|movie\-(korea|ongoing|china)\-?|author\/|pasang\-iklan|author\/|page\/)|(\#respond|\#comment)$|^\/$/m';
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
$curl = Curl();
$url = 'http://drakorstation.net';
if (isset($_GET['path'])) {
  $url .= trim(urldecode($_GET['path']));
}
$lastPublish = get_user_meta(get_current_user_id(), 'Last_Publish', true);
$dateFromDatabase = strtotime($lastPublish);
$dateTwelveHoursAgo = strtotime("-12 hours");
$doPublish = false;
if ($dateFromDatabase >= $dateTwelveHoursAgo) {
  $doPublish = false;
} else {
  $doPublish = true;
}
if (!$lastPublish) {
?>
  <div class="alert alert-success">
    <?= printr($lastPublish) ?>
  </div>
<?php
} else {
?>
  <div class="alert alert-danger">
    Last published post <?= $lastPublish ?>
  </div>
  <?php
}
$agc = new gtrans($curl);
$curl = $agc->fetch_contents($curl, $url, 'movies');
$parse_url = parse_url($url);
$page = $curl->response;
//exit($page);
$html = str_get_html($page);
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
$pathURL = trim(urldecode(isreq('path')));
//precom($pathURL, preg_match($paths, $pathURL));
if (!isset($_GET['path']) || preg_match($paths, $pathURL)) {
  //$_SESSION['title'] = $html->find('title', 0)->plaintext;

  $agc->generateIndex($html, $url, $paths, ['router' => '/crawler/movies/1', 'niche' => 'movies']);
} elseif ((isset($_REQUEST['path']) || !empty($_REQUEST['path'])) && !preg_match($paths, $_REQUEST['path'])) {
  $service = new agc_service\Service();
  $init = $service->getClass($url);
  $init->getProxy();
  $init->set($url, $curl);
  $cont = $init->content();
  $original_title = $init->title;
  $cont = agcparser::getInstance()->parsingview($cont, false, true, ['highlight' => true])->clean_inline_style('figure', 'table')->save_depencies()->combine()->__toString();
  $_SESSION['body'] = $cont;
  $dir = 'movies/' . $parse_url['host'];
  $original = "<div id=\"agc_result\">$cont</div>";
  $init->setSourceLang('id');
  $init->setTargetLang('en');
  $init->sendHTML($original, isreq('rewrite'));
  $english = $init->translate(null, isreq('rewrite'));
  $bh = str_get_html($english);

  if ($bh && $bh->find('[data-agc]')) {
    $btitle = $bh->find('[data-agc]', 0)->innertext;
    /**
     * @var Google_Service_Blogger_Post
     */
    $post = $client->getPostByTitle($btitle);
    $urlpost = isset($post->url) ? $post->url : false;
    $content = '
    <div hreflang="id">
    <link rel="alternate" hreflang="id" href="' . $urlpost . '?hl=id" />
    <center><small data-agc="title">' . $original_title . '</small></center>
      ' . $original . '
    </div>
    <div hreflang="en">
    <link rel="alternate" hreflang="en" href="' . $urlpost . '?hl=en" />
      ' . $english . '
    </div>
    <script>
    var defaultlang = "en";
    </script>
    <link rel="stylesheet" href="https://dimaslanjaka.github.io/Web-Manajemen/docs/tab-switcher/index.css?revision=' . time() . '">
    <script src="https://dimaslanjaka.github.io/Web-Manajemen/docs/tab-switcher/index.js?revision=' . time() . '"></script>
    ';
    $blogger = new Google_Service_Blogger($client->gClient);
    if (!$post && $doPublish) {
      trycatch(function () {
        global $client, $content, $btitle, $blogger;
        InfoLabel('Insert');
        $mypost = new Google_Service_Blogger_Post();
        $mypost->setTitle($btitle);
        $mypost->setContent(trim($content));
        $mypost->setLabels(['Movies', 'Drakor']);
        $blogger->posts->insert($client->movies->blogID, $mypost);
        $client->updateMovies();
        update_user_meta(get_current_user_id(), 'Last_Publish', date('Y-m-d H:i:s'));
        echo $content;
      });
    } else if (isreq('rewrite')) {
      trycatch(function () {
        global $client, $content, $btitle, $blogger;
        InfoLabel('Update');
        $post = $client->getPostByTitle($btitle);
        $mypost = new Google_Service_Blogger_Post();
        $mypost->setTitle($btitle);
        $mypost->setContent(trim($content));
        $mypost->setLabels(['Movies', 'Drakor']);
        $blogger->posts->update($client->movies->blogID, $post->id, $mypost);
        $post = $client->getPostByTitle($btitle);
        echo $post->getContent();
      });
    } else {
      if ($post && $doPublish) {
        InfoLabel('Existing Post');
        echo $post->getContent();
      } else {
  ?>
        <div class="alert alert-danger">
          Dont Do it today.
          <?php
          if (isAdmin()) {
          ?>
            <form action="" method="post">
              <input type="hidden" name="rewrite" value="1">
              <button type="submit" class="btn btn-danger">Force</button>
            </form>
          <?php
          }
          ?>
        </div>
<?php
      }
    }
  } else {
    InfoLabel('Error');
    echo $content;
  }
}
