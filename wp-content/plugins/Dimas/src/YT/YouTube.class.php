<?php

class YouTube extends dimas_google
{
  public $error = false;
  public $errorMsg;

  public function __construct($o)
  {
    parent::__construct($o);
  }

  public function grab($url, $ua = false, $ref = false)
  {
    $ip = $_SERVER['REMOTE_ADDR'];
    if (!$ua){
      $ua = 'Opera/9.80 (BlackBerry; Opera Mini/4.5.33868/37.8993; HD; en_US) Presto/2.12.423 Version/12.16';
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_REFERER, !$ref ? $url : $ref);
    curl_setopt($ch, CURLOPT_USERAGENT, $ua);
    $ret = curl_exec($ch);
    curl_close($ch);

    return $ret;
  }

  function test($u){
    $h = $this->grab($u);
    return $h;
  }

  public function trending()
  {
    $hasil = $this->grab('https://m.youtube.com/?hl=en&gl=US&client=mv-google');
    $hasil = explode('Trending', $hasil);
    $hasil = explode('<hr size="1"', $hasil[1]);
    $hasil = explode('<img src="', $hasil[0]);
    $array = [];
    for ($i = 1; $i < count($hasil); ++$i) {
      $link = explode('<a href="', $hasil[$i]);
      $link = explode('">', $link[1]);
      $link = $link[0];
      if (preg_match('#watch#', $link)) {
        $type = 'video';
      } else {
        $type = 'uknown';
      }
      $id = explode('i.ytimg.com/vi/', $hasil[$i]);
      $id = explode('/', $id[1]);
      $id = $id[0];
      $title = explode('<a href="' . $link . '">', $hasil[$i]);
      $title = explode('</a>', $title[1]);
      $title = str_replace(PHP_EOL, '', $title[0]);
      $anu = explode('<div style="', $hasil[$i]);
      $durasi = explode('</div>', $anu[2]);
      $durasi = explode('">', $durasi[0]);
      $durasi = str_replace(PHP_EOL, '', $durasi[1]);
      $channel = explode('</div>', $anu[3]);
      $channel = explode('">', $channel[0]);
      $channel = str_replace(PHP_EOL, '', $channel[1]);
      $view = explode('</div>', $anu[4]);
      $view = explode('">', $view[0]);
      $view = str_replace(PHP_EOL, '', str_replace('x ditonton', '', $view[1]));
      $array[] = [
        'type' => $type,
        'id' => $id,
        'title' => $title,
        'duration' => $durasi,
        'channel' => $channel,
        'view' => $view,
      ];
    }

    return json_encode($array);
  }

  public function search($q, $token = null)
  {
    $q = urlencode($q);
    if (empty($q)) {
      $this->error = true;
      $this->errorMsg = 'Parameter Queri Kosong';
    }
    if (null != $token) {
      $grab = $this->grab('https://m.youtube.com/results?client=mv-google&gl=ID&hl=id&search_sort=relevance&q=' . $q . '&search_type=search_all&uploaded=&action_continuation=1&ctoken=' . $token . '');
    } else {
      $grab = $this->grab('https://m.youtube.com/results?client=mv-google&gl=ID&hl=id&q=' . $q . '&submit=Telusuri');
    }
    $paging = explode('<div id="botPagination">', $grab);
    $paging = explode('href="', $paging[1]);
    $array = [];
    if (!empty($token)) {
      $prev = explode('">', $paging[1]);
      $prev = explode('ctoken=', $prev[0]);
      $prev = explode('&', $prev[1]);
      $prev = $prev[0];
      $next = explode('">', $paging[2]);
      $next = explode('ctoken=', $next[0]);
      $next = explode('&', $next[1]);
      $next = $next[0];
      $this->nextToken = $next;
      $this->prevToken = $prev;
    } else {
      $paging = explode('">', $paging[1]);
      $paging = explode('ctoken=', $paging[0]);
      $paging = explode('&', $paging[1]);
      $paging = $paging[0];
      $this->nextToken = $paging;
    }
    $hasil = explode('Opsi penelusuran', $grab);
    $hasil = $hasil[1];
    $hasil = explode('<img src="', $hasil);
    for ($i = 1; $i < count($hasil); ++$i) {
      $link = explode('<a href="', $hasil[$i]);
      $link = explode('">', $link[1]);
      $link = $link[0];
      if (preg_match('#watch#', $link)) {
        $type = 'video';
      } else {
        $type = 'uknown';
      }
      $id = explode('i.ytimg.com/vi/', $hasil[$i]);
      $id = explode('/', $id[1]);
      $id = $id[0];
      $title = explode('<a href="' . $link . '">', $hasil[$i]);
      $title = explode('</a>', $title[1]);
      $title = str_replace(PHP_EOL, '', $title[0]);
      $anu = explode('<div style="', $hasil[$i]);
      $durasi = explode('</div>', $anu[2]);
      $durasi = explode('">', $durasi[0]);
      $durasi = str_replace(PHP_EOL, '', $durasi[1]);
      $channel = explode('</div>', $anu[3]);
      $channel = explode('">', $channel[0]);
      $channel = str_replace(PHP_EOL, '', $channel[1]);
      $view = explode('</div>', $anu[4]);
      $view = explode('">', $view[0]);
      $view = str_replace(PHP_EOL, '', str_replace('x ditonton', '', $view[1]));
      $array[] = [
        'type' => $type,
        'id' => $id,
        'title' => $title,
        'duration' => $durasi,
        'channel' => $channel,
        'view' => $view,
      ];
    }

    return json_encode($array);
  }

  public function getData($id)
  {
    if (!empty($id)) {
      $grab = $this->grab('https://m.youtube.com/watch?v=' . $id . '&hl=id&client=mv-google&gl=ID&fulldescription=1');
      $this->grab = $grab;
      $hasil = explode('</form>', $grab);
      $hasil = explode('Video Terkait', $hasil[1]);
      $hasil = $hasil[0];
      $title = explode('<title>', $grab);
      $title = explode(' - YouTube', $title[1]);
      $title = $title[0];
      $durasi = explode('<div style="font-size:13px">', $hasil);
      $durasi = explode('<span', $durasi[1]);
      $durasi = str_replace(PHP_EOL, '', strip_tags($durasi[0]));
      $suka = explode('<span style="color: #006500">', $hasil);
      $suka = explode('</span>', $suka[1]);
      $suka = $suka[0];
      $tidak = explode('<span style="color: #CB0000">', $hasil);
      $tidak = explode('</span>', $tidak[1]);
      $tidak = $tidak[0];
      $view = explode('tidak suka', $hasil);
      $view = explode('x ditonton', $view[1]);
      $view = strip_tags($view[0]);
      $publish = explode('Dipublikasikan tanggal ', $hasil);
      $publish = explode(PHP_EOL, $publish[1]);
      $publish = $publish[0];
      $chid = explode('<a href="/channel/', $hasil);
      $chid = explode('"', $chid[1]);
      $chid = $chid[0];
      $chtitle = explode('<a href="/channel/', $hasil);
      $chtitle = explode('>', $chtitle[1]);
      $chtitle = explode('</a>', $chtitle[1]);
      $chtitle = strip_tags($chtitle[0]);
      $desc = explode('<div dir="ltr" align="left">', $hasil);
      $desc = explode('</div>', $desc[1]);
      $desc = $desc[0];
      $stream = explode('rtsp://', $hasil);
      $stream = explode('"', $stream[1]);
      $stream = 'rtsp://' . $stream[0];
      $array = [
        'title' => $title,
        'id' => $id,
        'stream' => $stream,
        'chid' => $chid,
        'duration' => $durasi,
        'chtitle' => $chtitle,
        'view' => $view,
        'upload' => $publish,
        'like' => $suka,
        'notlike' => $tidak,
        'description' => $desc,
      ];

      $this->snippets = json_encode($array);

      return $this;
    } else {
      $this->error = true;
      $this->errorMsg = 'Parameter ID Kosong';
    }
  }

  public function relatedVideo($id)
  {
    if (!empty($id)) {
      $grab = $this->grab('https://m.youtube.com/watch?v=' . $id . '&hl=id&client=mv-google&gl=ID');
      $hasil = explode('Video Terkait', $grab);
      $hasil = explode('<img src="', $hasil[1]);
      $array = [];
      for ($i = 1; $i < count($hasil); ++$i) {
        $link = explode('<a href="', $hasil[$i]);
        $link = explode('">', $link[1]);
        $link = $link[0];
        $id = explode('i.ytimg.com/vi/', $hasil[$i]);
        $id = explode('/', $id[1]);
        $id = $id[0];
        $title = explode('<a href="' . $link . '">', $hasil[$i]);
        $title = explode('</a>', $title[1]);
        $title = str_replace(PHP_EOL, '', $title[0]);
        $anu = explode('<div style="', $hasil[$i]);
        $durasi = explode('</div>', $anu[2]);
        $durasi = explode('">', $durasi[0]);
        $durasi = str_replace(PHP_EOL, '', $durasi[1]);
        $channel = explode('</div>', $anu[3]);
        $channel = explode('">', $channel[0]);
        $channel = str_replace(PHP_EOL, '', $channel[1]);
        $view = explode('</div>', $anu[4]);
        $view = explode('">', $view[0]);
        $view = str_replace(PHP_EOL, '', str_replace('x ditonton', '', $view[1]));
        $array[] = [
          'id' => $id,
          'title' => $title,
          'duration' => $durasi,
          'channel' => $channel,
          'view' => $view,
        ];
      }

      return json_encode($array);
    } else {
      $this->error = true;
      $this->errorMsg = 'ID belum ada';
    }
  }

  public function playlist($play, $token)
  {
    $grab = $this->grab('https://m.youtube.com/playlist?list=' . $play . '&ctoken=' . $token . '&client=mv-google&gl=ID&hl=id');
    $exp = explode('</form>', $grab);
    $hasil = explode('Playlist:', $grab);
    $page = explode('<span style="padding:0px 3px">', $exp[1]);
    $page = explode('</div>', $page[1]);
    $page = explode('<a', $page[0]);
    if (count($page) > 2) {
      $prevPage = explode('&amp;ctoken=', $page[1]);
      $prevPage = explode('"', $prevPage[1]);
      $prevPage = explode('&', $prevPage[0]);
      $this->prevToken = $prevPage[0];
      $nextPage = explode('&amp;ctoken=', $page[2]);
      $nextPage = explode('"', $nextPage[1]);
      $nextPage = explode('&', $nextPage[0]);
      $this->nextToken = $nextPage[0];
    } else {
      $nextPage = explode('&amp;ctoken=', $page[1]);
      $nextPage = explode('"', $nextPage[1]);
      $nextPage = explode('&', $nextPage[0]);
      $this->nextToken = $nextPage[0];
    }
    $playlist = explode(PHP_EOL, $hasil[1]);
    $playlist = $playlist[0];
    $hasil = explode('<img src="', $exp[1]);
    for ($i = 1; $i < count($hasil); ++$i) {
      $link = explode('<a href="', $hasil[$i]);
      $link = explode('">', $link[1]);
      $link = $link[0];
      $id = explode('i.ytimg.com/vi/', $hasil[$i]);
      $id = explode('/', $id[1]);
      $id = $id[0];
      $title = explode('<a href="' . $link . '">', $hasil[$i]);
      $title = explode('</a>', $title[1]);
      $title = str_replace(PHP_EOL, '', $title[0]);
      $anu = explode('<div style="', $hasil[$i]);
      $durasi = explode('</div>', $anu[2]);
      $durasi = explode('">', $durasi[0]);
      $durasi = str_replace(PHP_EOL, '', $durasi[1]);
      $channel = explode('</div>', $anu[3]);
      $channel = explode('">', $channel[0]);
      $channel = str_replace(PHP_EOL, '', $channel[1]);
      $view = explode('</div>', $anu[4]);
      $view = explode('">', $view[0]);
      $view = str_replace(PHP_EOL, '', str_replace('x ditonton', '', $view[1]));
      $array[] = [
        'type' => 'video',
        'id' => $id,
        'title' => $title,
        'duration' => $durasi,
        'channel' => $channel,
      ];
    }

    return json_encode($array);
  }
}
