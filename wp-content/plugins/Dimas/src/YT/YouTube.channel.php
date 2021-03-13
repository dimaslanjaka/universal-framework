<?php

class YouTubeChannel extends YouTube
{
  public $snippet;
  protected $arg;

  public function __construct($o)
  {
    $this->arg = $o;
    parent::__construct($o);
  }

  public function array_to_url()
  {
  }

  public function key($k)
  {
    $this->gkey = $k;
  }

  public function get($chid = 'UCuHzBCaKmtaLcRAOoazhCPA')
  {
    $u = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,id&order=date&maxResults=20&id=' . $chid . '&key=' . $this->arg['gkey'];
    $g = api_($u, get_home_url());
    $this->url = $u;
    $this->channel = $g;
    $this->snippet = $this->channel->items[0]->snippet;

    return $this;
  }

  public function snippet()
  {
    return $this->snippet;
  }

  public function title()
  {
    return $this->snippet->title;
  }

  public function thumb()
  {
    $s = $this->snippet;
    if (isset($s->thumbnails)) {
      $t = $s->thumbnails;
      if (isset($t->high)) {
        return $t->high->url;
      } elseif (isset($t->medium)) {
        return $t->medium->url;
      } elseif (isset($t->default)) {
        return $t->default->url;
      }
    }
  }
}
