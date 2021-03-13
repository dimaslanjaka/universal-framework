<?php

include __DIR__ . '/../admin/func.php';
$client = gclient();
/**
 * drakorstation.
 */
$paths = '/\/label\/|\/p\/|\/search/m';
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
$curl = Curl();
$url = 'https://www.kompiajaib.com';
if (isset($_GET['path'])) {
  $url .= trim(urldecode($_GET['path']));
}

$agc = new gtrans($curl);
$curl = $agc->fetch_contents($curl, $url, 'blog');
$parse_url = parse_url($url);
$page = $curl->response;
$html = str_get_html($page);
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
$pathURL = trim(urldecode(isreq('path')));
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
    if (!$post) {
      trycatch(function () {
        global $client, $content, $btitle, $blogger;
        InfoLabel('Insert');
        $mypost = new Google_Service_Blogger_Post();
        $mypost->setTitle($btitle);
        $mypost->setContent(trim($content));
        $mypost->setLabels(['Tips & Tricks']);
        $blogger->posts->insert($client->movies->blogID, $mypost);
        $client->updateMovies();
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
        $mypost->setLabels(['Tips & Tricks']);
        $blogger->posts->update($client->movies->blogID, $post->id, $mypost);
        $post = $client->getPostByTitle($btitle);
        echo $post->getContent();
      });
    } else {
      if ($post) {
        InfoLabel('Existing Post');
        echo $post->getContent();
      } else {
        echo $content;
      }
    }
  } else {
    InfoLabel('Error');
    echo $content;
  }
}
