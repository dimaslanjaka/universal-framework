<?php

global $wp;

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

$k = GOOGLE_CLIENT_KEY;
$arr = [
  'part' => 'snippet, id',
  'id' => $id,
  'channelId' => $id,
  'order' => 'date',
  'maxResults' => 50,
  'key' => $k,
];
$yu = 'https://www.googleapis.com/youtube/v3/channels/?' . http_build_query($arr);
$vu = 'https://www.googleapis.com/youtube/v3/search?' . http_build_query($arr);
$re = home_url(add_query_arg([$_GET], $wp->request)) . '/' . http_build_query($arr);
$cfg_ch = $core->folder(ROOT . '/assets/config/youtube/channel') . "/$id.json";
$fch = '';
if (file_exists($cfg_ch)) {
  $timest = strtotime('+3 days', filectime($cfg_ch));
  $days_ago = date('Y-m-d', $timest);
  $date_expired = $days_ago < date('Y-m-d');
  $fch = file_get_contents($cfg_ch);
  if (empty($fch)) {
    unlink($cfg_ch);
  }
}
$json = [];
if (!file_exists($cfg_ch) || (isset($date_expired) && $date_expired)) {
  $json = api_($yu, $re);
  $vi = api_($vu, $re);
} elseif (!empty($fch)) {
  $json = json_decode($fch);
}

$I = $json->items[0];
$snippet = $I->snippet;
$title = $site_title = $json->title = $snippet->title;
$desc = $site_desc = $json->desc = $snippet->description;
$dcreate = $snippet->publishedAt;
if (!$dcreate) {
  $core->header_redirect('/youtube/index')->quit();
}
$snippet->age = calcAge($dcreate) . ' Years old';
$thumb = $site_img = $json->img = $snippet->thumbnails->high->url;

if (isset($vi)) {
  if (is_object($vi) || is_array($vi)) {
    if (isset($vi->items)) {
      $json->videos = [];
      foreach ($vi->items as $i) {
        $s = $i->snippet;
        $vid = $i->id->videoId;
        $json->videos[] = ['id' => $vid, 'title' => $s->title, 'createdAt' => $s->publishedAt, 'desc' => $s->description, 'thumb' => $s->thumbnails->high->url, 'channel' => $s->channelId, 'channel_title' => $s->channelTitle];
      }
    }
  }
}

if (!file_exists($cfg_ch) || (isset($date_expired) && $date_expired)) {
  file_put_contents($cfg_ch, json_encode($json));
}
if ($core->isDump()) {
  $core->dump($json);
}

if (isset($id) && !empty($id)) {
  $core->sitemap('youtube');
} else {
  $core->header_redirect('/youtube/index')->quit();
}
