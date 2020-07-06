<?php include __DIR__ . '/../breadcrumb.php'; ?>

<section>
  <div class="card mb-3">
    <div class="card-body">
      <a href="meta">Meta</a>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <form action="index" method="post">
        <div class="form-row mb-2">
          <div class="col">
            Clean cache including Sessions, Html, Processed static assets
          </div>
          <div class="col">
            <button class="btn btn-block" id="ajax" src="clean?clean_cache=1"><i class="fad fa-sync"></i></button>
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            Latest File
          </div>
          <div class="col">
            <span class="badge text-white purple" id="latest" onload="latest(this)"></span>
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            Cache Key
          </div>
          <div class="col">
            <input type="hidden" name="save_config">
            <input type="text" class="form-control" name="cache[ext]" value="<?= get_conf()['cache']['ext'] ?>">
          </div>
        </div>

        <div class="md-form">
          <button type="submit" class="btn btn-block btn-info">Save</button>
        </div>
      </form>
    </div>
  </div>
</section>