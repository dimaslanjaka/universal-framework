<div class="row">
  <div class="col-md-12 mt-2 mb-2">
    <?php foreach ($json->items as $i) { ?>
    <div class="card border border-primary">
      <div class="card-header bg-primary text-white tx-medium"><?= $i->snippet->title; ?> <span class="float-sm-right"><i
            class="fas fa-history"></i> <?= time_elapsed($i->snippet->publishedAt, 'ago'); ?></span>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="card bd-0">
              <div class="card-header tx-medium bd-0 tx-white bg-primary">
                Description And Download Links
              </div><!-- card-header -->
              <img src="<?= $i->snippet->thumbnails->high->url; ?>"
                alt="" class="img-fluid" style="height:200px">
              <div class="card-body bd bd-t-0" data-linkify="true" style="max-height:250px;overflow:auto">
                <p class="mg-b-0"><?= $i->snippet->description; ?>.
                </p>
                <hr>
              </div><!-- card-body -->
              <div class="card-footer">
                <div class="text-center">
                  <div class="btn-group">
                    <a href="/youtube/details/<?= $i->id; ?>"
                      class="btn btn-outline-primary">Download Video</a>
                    <a href="/youtube/details/<?= $i->id; ?>"
                      class="btn btn-outline-primary">Download MP3</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <canvas id="bullet-ctx"
              data-views="<?= $i->statistics->viewCount; ?>"
              data-comments="<?= $i->statistics->coomentCount; ?>"
              data-likes="<?= $i->statistics->likeCount; ?>"
              data-dislikes="<?= $i->statistics->dislikeCount; ?>"
              data-favs="<?= $i->statistics->favoriteCount; ?>"></canvas>
          </div>
        </div>

        <div class="card-footer bg-white text-dark"><span class="float-sm-right"><i class="fas fa-history"></i> Updated
            <?= time_elapsed(strtotime((is_array($i->charts) ? $i->charts['createdAt'] : (is_object($i->charts) ? $i->charts->createdAt : null))), 'ago'); ?></span>
        </div>
      </div>
    </div>
    <?php
  if (is_user_admin()) {
    ?>
    <script>
      console.log( <?= $core->cj($i); ?> );
    </script>
    <?php
  }
  ?>
    <?php  } ?>
  </div>
  <script>
    const mask_link = 1;
  </script>