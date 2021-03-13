<div class="az-content-profile ml-0 pl-0">
  <div class="container mn-ht-100p">
    <div class="az-content-left az-content-left-profile">

      <div class="az-profile-overview">
        <div class="az-img-user">
          <img src="<?= $thumb; ?>"
            alt="<?= $title; ?>">
        </div><!-- az-img-user -->
        <div class="d-flex justify-content-between mg-b-20">
          <div>
            <h5 class="az-profile-name">
              <?= $title; ?>
            </h5>
            <p class="az-profile-name-text">
              <?= $desc; ?>
            </p>
          </div>
          <div class="btn-icon-list d-none">
            <button class="btn btn-indigo btn-icon"><i class="typcn typcn-plus-outline"></i></button>
            <button class="btn btn-primary btn-icon"><i class="typcn typcn-message"></i></button>
          </div>
        </div>

        <div class="az-profile-bio" style="word-wrap:break-word">
          <a href="https://www.youtube.com/channel/<?= $id; ?>">https://www.youtube.com/channel/<?= $id; ?></a>
        </div><!-- az-profile-bio -->

        <hr class="mg-y-30">

        <label class="az-content-label tx-13 mg-b-20">Websites &amp; Social Channel</label>
        <div class="az-profile-social-list">
          <div class="media">
            <div class="media-icon"><i class="icon ion-logo-github"></i></div>
            <div class="media-body">
              <span>Github</span>
              <a href="">github.com/dimaslanjaka</a>
            </div>
          </div><!-- media -->
          <div class="media">
            <div class="media-icon"><i class="icon ion-logo-twitter"></i></div>
            <div class="media-body">
              <span>Twitter</span>
              <a href="">twitter.com/DimasSkynetCybe</a>
            </div>
          </div><!-- media -->

          <div class="media">
            <div class="media-icon"><i class="fab fa-codepen"></i></div>
            <div class="media-body">
              <span>Codepen</span>
              <a href="">codepen.io/dimaslanjaka</a>
            </div>
          </div><!-- media -->
        </div><!-- az-profile-social-list -->

      </div><!-- az-profile-overview -->

    </div><!-- az-content-left -->
    <div class="az-content-body az-content-body-profile" style="overflow:auto">
      <?php
  if (isset($json->videos)) {
    foreach ($json->videos as $v) {
      if (empty($v->id)) {
        continue;
      } ?>
      <div class="col col-lg-10 m-2">
        <div class="card">
          <div class="card-header tx-medium bd-0 tx-white bg-info">
            <div class="float-sm-left">
              <h4><?= $v->title; ?>
              </h4>
              <small><?= $v->desc; ?></small>
            </div>
            <div class="float-sm-right"><a class="btn btn-primary"
                href="/youtube/details/<?= $v->id; ?>">Download</a>
            </div>
          </div><!-- card-header -->
          <div class="card-body bd bd-t-0">
            <p class="mg-b-0">
              <div id="im">
                <img src="<?= $v->thumb; ?>"
                  alt="<?= $v->title; ?>" class="img-responsive"
                  width="100%" height="100%">
                <a id="pbtn" href="#"><img src="https://imgdb.net/images/5980.png" width="50" height="50" alt=""></a>
              </div>
              <div class="embed-responsive embed-responsive-16by9 d-none">
                <iframe class="embed-responsive-item"
                  src="https://www.youtube.com/embed/<?= $v->id; ?>?rel=0"
                  allowfullscreen></iframe>
              </div>
            </p>
          </div><!-- card-body -->
        </div>
      </div>
      <?php
    }
  }
  ?>
    </div><!-- az-content-body -->
  </div><!-- container -->
</div>
<style>
  #pbtn img {
    opacity: 0;
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: auto;
    height: auto;
    background: rgba(0, 0, 0, 0.6) url("https://imgdb.net/images/5980.png") no-repeat scroll center center / 50px 50px;
  }

  #pbtn:hover img {
    opacity: 0.5;
  }

  #im {
    position: relative;
  }
</style>
<script>
  const channel = <?= json_encode($json); ?> ;
</script>