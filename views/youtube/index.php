<div class="row">
  <?php
  if (isset($json->items)) {
    foreach ($json->items as $j) {
      $vids_id = (isset($j->id->videoId) ? $j->id->videoId : (string)$j->id); ?>
  <div class="col-md-6 mt-2 mb-2">
    <div class="card">
      <div class="card-header"><?=$j->snippet->title; ?>
      </div>
      <img src="<?=$j->snippet->thumbnails->high->url; ?>"
        alt="<?=$j->snippet->title; ?>" class="img-fluid"
        style="height:200px">
      <div class="card-body">
        <table class="table" id="card-table">
          <tr>
            <td><i class="fas fa-file-alt"></i><span class="ml-2">Title</span></td>
            <td><a href="/youtube/details/<?=$vids_id; ?>"><?=$j->snippet->title; ?></a></td>
          </tr>
          <tr>
            <td><i class="fas fa-user"></i><span class=" ml-2">Uploaded
                By</span></td>
            <td><a
                href="/youtube/channel/<?=$j->snippet->channelId; ?>"><?=$j->snippet->channelTitle; ?></a>
            </td>
          </tr>
          <tr>
            <td><i class="fas fa-history"></i><span class="ml-2">Uploaded At</span></td>
            <td><?=time_elapsed($j->snippet->publishedAt, 'ago'); ?>
            </td>
          </tr>
          <tr>
            <td><i class="fas fa-info"></i><span class="ml-2">Description</span></td>
            <td><?=$j->snippet->description; ?>
            </td>
          </tr>
          <tr>
            <td><i class="fas fa-headset"></i><span class="ml-2">Live</span></td>
            <td><?=$j->snippet->liveBroadcastContent; ?>
            </td>
          </tr>
        </table>
      </div>
      <div class="card-footer">
        <div class="text-center">
          <div class="btn-group">
            <a href="/youtube/details/<?= $vids_id; ?>"
              class="btn btn-outline-primary">Download Video</a>
            <a href="/youtube/details/<?= $vids_id; ?>"
              class="btn btn-outline-primary">Download MP3</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
    }
  }
  ?>
</div>