<?php

use Curl\Curl;

if (isset($_REQUEST['url'])) {
  $id = parse_url($_REQUEST['url']);
  $get_string = $id['query'];
  parse_str($get_string, $id);
  $id = $VID = $id['v'];
} elseif (isset($subrequest[2])) {
  $id = $VID = $subrequest[2];
} elseif ('youtube' == $groot) {
  $id = $VID = $subrequest[1];
}

if (!isset($id) || empty($id)) {
  if ('youtube' != $groot) {
    $core->header_redirect('/youtube/index');
    exit;
  }
}

$cfg_detail = $core->folder($_SERVER['DOCUMENT_ROOT'] . '/assets/config/youtube/details') . '/' . $id . '.json';
if (file_exists($cfg_detail)) {
  $timest = strtotime('+30 days', filectime($cfg_detail));
  $days_ago = date('Y-m-d', $timest);
  $date_expired = $days_ago < date('Y-m-d');
}

$k = (get_option('google_key') ? get_option('google_key') : GOOGLE_CLIENT_KEY);
$arr = [
  'part' => 'id,snippet,statistics,contentDetails',
  'id' => $id,
  'key' => $k,
];
$vid = 'https://www.googleapis.com/youtube/v3/videos/?' . http_build_query($arr);
$re = get_home_url(); //home_url(add_query_arg([$_GET], $wp->request)) . '/' . http_build_query($arr);

if (!file_exists($cfg_detail) || $date_expired) {
  $json = api_($vid, $re);
} else {
  $json = json_decode(file_get_contents($cfg_detail));
}
//$core->dump($json);
$yt = new YouTubeDownloader(null);
foreach ($yt->getDownloadLinks("https://www.youtube.com/watch?v=$id") as $vurl) {
  $json->video_url[] = $vurl;
}

$json->url_video_api = $vid;
if (isLocalhost()) {
  $connection = @fsockopen('127.0.0.1', '5000');
  if (is_resource($connection)) {
    $curl = new Curl();
    $curl->get("http://127.0.0.1:5000/api?url=https://www.youtube.com/watch?v=$id");
    if (!$curl->error) {
      foreach ($curl->response as $vurl2) {
        $json->video_url[] = $vurl2;
      }
    }
  }
}
if (isset($json->video_url)) {
  if (is_array($json->video_url) || is_object($json->video_url)) {
    $json->video_url = array_values($json->video_url);
  }
}

!isset($json->related) ? $json->related = false : false;

if (isset($_REQUEST['json'])) {
  $core->dump($json);
}

if ($json->related && (is_array($json->related) || is_object($json->related))) {
  $arr['relatedToVideoId'] = $arr['id'];
  $arr['type'] = 'video';
  $arr['part'] = 'snippet,id';
  $yr = 'https://www.googleapis.com/youtube/v3/search?' . http_build_query($arr);
  $gr = api_($yr, $re);
  if (isset($gr->items)) {
    $json->related = $gr->items;
    $json->url_related_api = $yr;
    $date_expired = 1;
  }
}

$i = $json->items[0];
//$core->dump($i);
$c = $i->contentDetails;
if (!isset($c->duration)) {
  if (file_exists($cfg_detail)) {
    @unlink($cfg_detail);
  }
  $core->header_redirect('/youtube/index')->quit();
}
$interval = new DateInterval($c->duration);
$i->duration_sec = $interval->h * 3600 + $interval->i * 60 + $interval->s;
$s = $i->statistics;
$snippet = $i->snippet;
$title = $site_title = $json->title = preg_replace('/\'|\"/m', '', trim($snippet->title));
$description = $json->desc = $site_desc = preg_replace('/\'|\"/m', '', trim($snippet->description));
$chid = $snippet->channelId;
$chtitle = $snippet->channelTitle;
$chmd5 = md5($chtitle);
$chraw = urlencode($chtitle);
$duration = $i->duration_sec;
$view = $s->viewCount;
$site_img = $json->img = $snippet->thumbnails->high->url;
$upload = $snippet->publishedAt;
$like = $s->likeCount;
$dislike = $s->dislikeCount;
$comments = $s->commentCount;
$totalReaction = $like + $dislike;
$like_percent = $totalReaction > 0 ? round(($like / $totalReaction) * 100) : 0;
$dislike_percent = $totalReaction > 0 ? round(($dislike / $totalReaction) * 100) : 0;

$channel_cfg = $core->folder(ROOT . '/assets/config/youtube/channel') . "/$chid.json";
if (!file_exists($channel_cfg)) {
  $channel = $YTChannel->get($chid)->channel;
} else {
  $channel = json_decode(file_get_contents($channel_cfg));
}

if (isset($channel->items[0])) {
  $S = $channel->items[0]->snippet;
} else {
  $S = $channel->items->snippet;
}

$channel_title = (isset($S->localized->title) ? $S->localized->title : $S->title);
$channel_desc = (isset($S->localized->description) ? $S->localized->description : $S->description);
$channel_thumb = $S->thumbnails->high->url;
$gse = 'https://www.google.com/search?safe=strict&ei=1qorXZrYFtOcmgfH7LKoDA&q=site%3Atwitter.com&oq=';
$twitter = $gse . urlencode('site:twitter.com allintext:' . $chtitle);
$github = $gse . urlencode('site:github.com allintext:' . $chtitle);
$linked = $gse . urlencode('site:linkedin.com allintext:' . $chtitle);
$bio = $gse . urlencode('site:youtube.com allintext:' . $chtitle);
$chdesc = !empty($channel_desc) ? $channel_desc : 'Channel Description Unavailable';
$chimg = (!empty($channel_thumb) ? $channel_thumb : 'https://res.cloudinary.com/dimaslanjaka/image/fetch/https://i.pinimg.com/originals/19/7b/36/197b365922d1ea3aa1a932ff9bbda4a6.png');
if (isset($id) && !empty($id) && !empty($json)) {
  $core->sitemap('youtube');
}

if (!isset($json->charts)) {
  $charts = ['view' => $view, 'view_length' => strlen($view), 'dataChart' => [1], 'dataChartCount' => null];
  for ($i = 1; $i < date('t'); ++$i) {
    $rand = mt_rand(1, $view);
    $charts['dataChart'][] = ($rand > 1000 ? $rand % 100 : $rand);
  }
  sort($charts['dataChart']);
  $charts['dataChartCount'] = range(1, count($charts['dataChart']));

  $json->charts = $charts;
}

if ($core->isDump()) {
  $core->dump([$json, $S]);
}

if (!file_exists($cfg_detail) || $date_expired) {
  file_put_contents($cfg_detail, $core->cj($json));
}

function odownloader($id)
{
  return null;
  $yturl = "https://www.youtube.com/watch?v=$id";
  $u = 'https://odownloader.com';
  get_web_page($u, null, 'https://google.com/search?q=yt to 320 kbps');
  $r = '';
  if ($yturl) {
    $d = "$u/download?q=$yturl";
    $x = get_web_page($d, null, $u);
    $dw = $x['content'];
    $g = str_get_html($dw);
    $gf = $g->find('form');
    unset($gf[0]);
    foreach ($gf as $f) {
      if ('complaint_form' == $f->id) {
        continue;
      }
      $f->action = $u . $f->action;
      //echo $f->outertext;
      $uq = null;
      foreach ($f->find('input,button') as $input) {
        $uq[$input->name] = $input->value;
      }
      $ux = $f->action . '?' . http_build_query($uq);
      $bn = preg_match('/quality\=(\d{2,3})/m', $ux, $txt);
      $ux = 'https://dimaslanjaka.github.io/page/safelink.html?url=' . base64_encode($ux);
      if ($bn) {
        $r .= "<button class='btn btn-primary btn-block' data-newtab='$ux'>{$txt[1]} Kbps</button>";
      }
    }
    $yu = 'https://dimaslanjaka.github.io/page/safelink.html?url=' . base64_encode('https://odownloader.com/download?q=' . urlencode("https://www.youtube.com/watch?v=$id"));
    $r .= "<button class='btn btn-primary btn-block' data-newtab='$yu'>Convert</button>";
  }

  return $r;
}
