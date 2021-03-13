<div class="az-content-profile">
  <div class="container mn-ht-100p">
    <div class="az-content-left az-content-left-profile d-none d-lg-block">
      <div class="az-profile-overview">
        <div class="az-img-user">
          <img src="<?= $chimg; ?>" alt="">
        </div><!-- az-img-user -->
        <div class="d-flex justify-content-between mg-b-20">
          <div>
            <h5 class="az-profile-name"><?= $chtitle; ?>
            </h5>
            <p class=" az-profile-name-text"><?= $chtitle; ?>
            </p>
          </div>
          <div class="btn-icon-list">
            <button class="btn btn-indigo btn-icon"><i class="fas fa-certificate"></i></button>
            <button class="btn btn-primary btn-icon"><i class="fab fa-youtube"></i></button>
          </div>
        </div>

        <div class="az-profile-bio">
          <?= $chdesc; ?> <a
            href="/youtube/channel/<?= $chid; ?>">More</a>
        </div><!-- az-profile-bio -->

        <hr class="mg-y-30">

        <label class="az-content-label tx-13 mg-b-20">Websites &amp; Social Channel</label>
        <div class="az-profile-social-list">
          <div class="media">
            <div class="media-icon"><i class="icon ion-logo-github"></i></div>
            <div class="media-body">
              <span>Github</span>
              <a href="<?= $github; ?>">LINK</a>
            </div>
          </div><!-- media -->
          <div class="media">
            <div class="media-icon"><i class="icon ion-logo-twitter"></i></div>
            <div class="media-body">
              <span>Twitter</span>
              <a href="<?= $twitter; ?>">LINK</a>
            </div>
          </div><!-- media -->
          <div class="media">
            <div class="media-icon"><i class="icon ion-logo-linkedin"></i></div>
            <div class="media-body">
              <span>Linkedin</span>
              <a href="<?= $linked; ?>">LINK</a>
            </div>
          </div><!-- media -->
          <div class="media">
            <div class="media-icon"><i class="icon ion-md-link"></i></div>
            <div class="media-body">
              <span><?= $chtitle; ?></span>
              <a href="<?= $bio; ?>">LINK</a>
            </div>
          </div><!-- media -->
        </div><!-- az-profile-social-list -->

      </div><!-- az-profile-overview -->

    </div><!-- az-content-left -->
    <div class="az-content-body az-content-body-profile">
      <nav class="nav az-nav-line d-none">
        <a href="" class="nav-link active" data-toggle="tab">Overview</a>
        <a href="" class="nav-link" data-toggle="tab">Reviews</a>
        <a href="" class="nav-link" data-toggle="tab">Followers</a>
        <a href="" class="nav-link" data-toggle="tab">Following</a>
        <a href="" class="nav-link" data-toggle="tab">Account Settings</a>
      </nav>

      <div class="az-profile-body">
        <div class="text-center"><?= $title; ?>
        </div>

        <div class="row mg-b-20">
          <div class="col-md-7 col-xl-8">
            <div class="az-profile-view-chart">
              <canvas id="chartArea"></canvas>
              <div class="az-profile-view-info">
                <div class="d-flex align-items-baseline">
                  <h6><?= $view; ?>
                  </h6>
                  <span class="d-none">-1.2% since last week</span>
                </div>
                <p>Viewers log</p>
              </div>
            </div>
          </div><!-- col -->
          <div class="col-md-5 col-xl-4 mg-t-40 mg-md-t-0">
            <div class="az-content-label tx-13 mg-b-20">Traffic Details</div>
            <div class="az-traffic-detail-item" disabled>
              <div>
                <span>Total Visitor Current Page</span>
                <span>Unavailable <span>(0%)</span></span>
              </div>
              <div class="progress">
                <div class="progress-bar wd-20p" role="progressbar" aria-valuenow="20" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div><!-- progress -->
            </div>
            <div class="az-traffic-detail-item">
              <div>
                <span>Like</span>
                <span><?= $like; ?> <span>(<?= $like_percent; ?>%)</span></span>
              </div>
              <div class="progress">
                <div class="progress-bar bg-success" role="progressbar"
                  aria-valuenow="<?= $like_percent; ?>"
                  aria-valuemin="0" aria-valuemax="100"
                  style="width:<?= $like_percent; ?>%"></div>
              </div><!-- progress -->
            </div>
            <div class="az-traffic-detail-item">
              <div>
                <span>Dislike</span>
                <span><?= $dislike; ?> <span>(<?= $dislike_percent; ?>%)</span></span>
              </div>
              <div class="progress">
                <div class="progress-bar bg-pink" role="progressbar"
                  aria-valuenow="<?= $dislike_percent; ?>"
                  aria-valuemin="0" aria-valuemax="100"
                  style="width:<?= $dislike_percent; ?>%"></div>
              </div><!-- progress -->
            </div>
            <div class="az-traffic-detail-item" disabled>
              <div>
                <span>Total Download</span>
                <span>Unavailable <span>(0%)</span></span>
              </div>
              <div class="progress">
                <div class="progress-bar bg-teal wd-25p" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div><!-- progress -->
            </div>
          </div><!-- col -->
        </div><!-- row -->

        <hr class="mg-y-40">

        <div class="row">
          <div class="col-md-7 col-xl-8">
            <div class="embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item"
                src="https://www.youtube.com/embed/<?= $VID; ?>?rel=0"
                allowfullscreen></iframe>
            </div>
          </div><!-- col -->
          <div class="col-md-5 col-xl-4 mg-t-40 mg-md-t-0">
            <div class="az-content-label tx-13 mg-b-25">Download List</div>
            <div class="az-profile-contact-list">
              <div class="media">
                <div class="media-icon"><i class="icon ion-md-musical-notes"></i></div>
                <div class="media-body">
                  <span class='text-primary'>Download <?= $site_title; ?> MP3</span>
                  <div id="mp3">
                    <button class="btn btn-outline-primary ld-over-full" id="mp3"
                      data-id="<?= $VID; ?>">Get MP3
                      <span class="ld">
                        <span class="ld ld-ball ld-bounce"></span>
                        <span class="text">Fetching MP3 Format...</span>
                      </span>
                    </button>
                  </div>
                  <hr>
                  <a href="https://savemp3.cc/id/youtube/<?=$id?>" target="_blank" rel="nofollow" class="btn btn-outline-primary ld-over-full">Server 2</a>
                  <hr>
                  <iframe src="https://www.yt-download.org/@api/button/mp3/<?=$id?>" width="100%" height="100px" scrolling="no" style="border:none;"></iframe>
                  <?php
          $OD = odownloader($id);
          if (!empty($OD)) {
            ?>
                  <div id="server2">
                    <center>
                      <div class="d-flex">
                        <hr class="my-auto flex-grow-1">
                        <div class="px-4 font-weight-bold">Server 3</div>
                        <hr class="my-auto flex-grow-1">
                      </div>
                    </center>
                    <?= $OD; ?>
                  </div>
                  <?php
          }
          ?>
                </div><!-- media-body -->
              </div><!-- media -->
              <div class="media">
                <div class="media-icon"><i class="icon ion-md-videocam"></i></div>
                <div class="media-body">
                  <span class='text-info'>Download <?= $site_title; ?>
                    MP4</span>
                  <div id="mp4">
                    <button class="btn btn-outline-info ld-over-full" id="mp4"
                      data-id="<?= $VID; ?>">Get Videos
                      <span class="ld">
                        <span class="ld ld-ball ld-bounce"></span>
                        <span class="text">Fetching Videos Format...</span>
                      </span>
                    </button>
                  </div>
                </div><!-- media-body -->
              </div><!-- media -->
              <div id="video-wrap" class="media" disabled>
                <div class="media-icon">
                  <ion-icon name="cloud-download"></ion-icon>
                </div>
                <div id="btn-g" class="media-body">
                  <span>Webm</span>
                  <div>Unavailable</div>
                </div><!-- media-body -->
              </div><!-- media -->
            </div><!-- az-profile-contact-list -->
          </div><!-- col -->
        </div><!-- row -->

        <div class="mg-b-20"></div>

      </div><!-- az-profile-body -->
    </div><!-- az-content-body -->
  </div><!-- container -->
</div><!-- az-content -->
<?php
if (isset($json->related) && is_array($json->related)) {
            ?>
<center>
  <div class="d-flex">
    <hr class="my-auto flex-grow-1">
    <div class="px-4 font-weight-bold">Related Videos</div>
    <hr class="my-auto flex-grow-1">
  </div>
</center>
<div class="row">
  <?php
    foreach ($json->related as $related) {
      ?>
  <div class="col-md-6 mt-2 mb-2">
    <div class="card">
      <div class="card-header">
        <a href="/youtube/details/<?= $related->id->videoId; ?>"
          class="text-info"
          alt="<?= $related->snippet->title; ?>"><?= $related->snippet->title; ?></a>
        <span class="float-sm-right"><i class="fas fa-history"></i> <?= time_elapsed($related->snippet->publishedAt, 'ago'); ?></span>
      </div>
      <img src="<?= $related->snippet->thumbnails->high->url; ?>"
        alt="<?= $related->snippet->title; ?>" width="100%"
        height="200px" class="img-fluid">
      <div class="card-body bd bd-t-0" data-linkify="true" style="height:250px;overflow:auto">
        <p class="mg-b-0"><?= $related->snippet->description; ?>.
        </p>
        <hr>
      </div><!-- card-body -->
      <div class="card-footer">
        <div class="text-center">
          <div class="btn-group">
            <a href="/youtube/details/<?= $related->id->videoId; ?>"
              class="btn btn-outline-primary">Download Video</a>
            <a href="/youtube/details/<?= $related->id->videoId; ?>"
              class="btn btn-outline-primary">Download MP3</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
    } ?>
  <div class="col">
    <?= (get_option('yt-ads') ? base64_decode(get_option('yt-ads')) : false); ?>
  </div>
</div>
<?php
          } ?>

<center>
  <div class="d-flex">
    <hr class="my-auto flex-grow-1">
    <div class="px-4 font-weight-bold">Recent Visited</div>
    <hr class="my-auto flex-grow-1">
  </div>
</center>
<div class="row clearfix">
  <?php
  $a = dimas::i()->recents($json);
  foreach ($a as $recent) {
    $th = $recent->snippet->thumbnails->high->url;
    $tt = $recent->snippet->title;
    $dc = (!empty($recent->snippet->description) ? $recent->snippet->description : $tt);
    $cht = $recent->snippet->channelTitle;
    $chi = $recent->snippet->channelId;
    $tags = $recent->snippet->tags; ?>
  <div id="recent-yt" class="col-md-6 mt-2 mb-2">
    <div class="card">
      <div class="card-header bg-info">
        <h5 class="animated bounceInRight"><a
            href="/youtube/details/<?= $recent->id; ?>"><?= $tt; ?></a>
        </h5>
      </div>
      <div class="card-body">
        <div class="sidebar-content">
          <img class="animated rollIn float-sm-left recent-thumb mb-2"
            src="<?= $th; ?>"
            alt="<?= $tt; ?>" />

          <div class="p-2 m-2" id="desc"><?= $dc; ?>
          </div>
          <div class="sidebar-meta">
            <span class="time"><i class="fas fa-clock"></i> <?= date('d M Y', strtotime($recent->snippet->publishedAt)); ?></span>
            <span class="float-sm-right"><i class="fas fa-link"></i><a
                href="/youtube/details/<?= $recent->id; ?>"><span
                  class="ml-2">Visit</span></a></span>
            <span class="comment d-none"><i class="fas fa-comment"></i> 10 comments</span>
          </div>
        </div>
      </div>

    </div>
  </div>
  <?php
  }
  ?>
</div>

<form action="" id="gt" class="d-none"></form>
<div id="downloading" class="fixed-bottom mb-2 ml-2" style="opacity:0.7">
  <div class="ajax-progress"></div>
  <div class="row">
    <div class="card">
      <div class="card-body">
        <b><i class="fas fa-clock"></i><span class="ml-2">Downloading Mp3<br />Please wait</span></b>
        <div data-callback="remx" countdown="60"></div>
      </div>
    </div>
  </div>
</div>
<style>
  /** recent yt */
  #recent-yt img.recent-thumb {
    background: #fff;
    border: 1px dashed #e0e0e0;
    padding: 6px;
    height: 75px;
    width: 75px;

    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
  }

  #recent-yt .sidebar-meta span.time {
    margin-right: 10px;
  }

  #recent-yt .sidebar-meta span i {
    color: #2996bd
  }

  #recent-yt .sidebar-meta span {
    color: #2e2e2e;
  }

  #recent-yt .card-body #desc {
    height: 100px;
    overflow: auto;
  }
</style>
<script>
  var
    dataChart = <?= $core->cj($json->charts->dataChart); ?> ;
  var
    dataCount = <?= $core->cj($json->charts->dataChartCount); ?> ;
  var TITLE = `<?= $site_title; ?>`;
  var SECS = `<?= $json->items[0]->duration_sec; ?>`;
  const dwnld = document.getElementById('downloading');
  const btnmp3 = document.querySelectorAll('button#mp3')[0];
  btnmp3.setAttribute('disabled', 1);
  btnmp3.innerHTML = 'Please wait <i class="fas fa-clock"></i>';

  function remx() {
    btnmp3.innerHTML = 'Download MP3';
    btnmp3.removeAttribute('disabled');
    dwnld.remove();
  }
</script>
<div>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Horizontal Responsive -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7975270895217217"
     data-ad-slot="1983408237"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>