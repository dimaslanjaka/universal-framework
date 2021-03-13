<div class="border border-left-0 border-right-0 border-primary text-center">
  <b>Playlist <?=(isset($json) ? (isset($json->items[0]) ? "Of ". $json->items[0]->snippet->title : false) : false); ?></b>
</div>

<div class="row">
  <?php
  foreach ($r as $p) {
    ?>
  <div id="playlist" class="col-md-4 mt-4">
    <pre class="d-none"><?=$core->cj($p); ?></pre>

    <div class="card">
      <img class="card-img-top d-none"
        src="https://img.youtube.com/vi/<?=$p->contentDetails->videoId; ?>/sddefault.jpg"
        alt="Card image">
      <div class="card-body">
        <div class="wrapper">
          <div class="youtube"
            data-embed="<?=$p->contentDetails->videoId; ?>">
            <div class="play-button"></div>
          </div>
        </div>
        <b class="card-title"><a href="/youtube/details/<?=$p->contentDetails->videoId; ?>" title="<?=$p->snippet->title; ?>"><?=$p->snippet->title; ?></a>
        </b>
        <p class="card-text">Uploaded By <a
            href="/youtube/channel/<?=$p->snippet->channelId; ?>"><?=$p->snippet->channelTitle; ?></a> at <?=date('d M Y', strtotime($p->snippet->publishedAt)); ?>
        </p>
        <a href="/youtube/channel/<?=$p->snippet->channelId; ?>"
          class="btn btn-primary">See Profile</a>
      </div>
    </div>

  </div>
  <?php
  }
  ?>
</div>