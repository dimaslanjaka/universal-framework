<?php include __DIR__ . '/breadcrumb.php'; ?>

<section>
  <div class="card mb-3">
    <div class="card-body">
      <span class="card-label">DATABASE</span>
      <form action="" method="post" enctype="application/json">
        <input type="hidden" name="config">
        <div class="form-row mb-4">
          <div class="col">
            <div class="md-form">
              <input type="text" name="database[user]" value="<?= get_db()['user'] ?>" no-save class="form-control">
              <label for="">User</label>
            </div>
          </div>
          <div class="col">
            <div class="md-form">
              <input type="text" name="database[pass]" value="<?= get_db()['pass'] ?>" no-save class="form-control">
              <label for="">Password</label>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <div class="md-form">
              <input type="text" name="database[dbname]" value="<?= get_db()['dbname'] ?>" no-save class="form-control">
              <label for="">Database</label>
            </div>
          </div>
          <div class="col">
            <div class="md-form">
              <input type="text" name="database[host]" value="<?= get_db()['host'] ?>" no-save class="form-control">
              <label for="">Host</label>
            </div>
          </div>
          <div class="col">
            <div class="md-form">
              <input type="text" name="database[port]" value="<?= get_db()['port'] ?>" no-save class="form-control">
              <label for="">Port</label>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-block text-white purple"><i class="fad fa-save"></i></button>
      </form>
    </div>
  </div>
</section>


<section>
  <div class="card">
    <div class="card-body">
      <div class="card-label">BETA</div>
      <div class="mb-2">
        <div class="row">
          <div class="col">
            Refresh Cache
          </div>
          <div class="col">
            <button class="btn" id="reload" data-toggle="tooltip" title="clear browser cache" onclick="clear_cache()"><i class="fad fa-sync"></i></button>
          </div>
        </div>
      </div>

      <div class="mb-2">
        <div class="row">
          <div class="col">
            HTACCESS Cache Mode
          </div>
          <div class="col">
            <div class="switch">
              <label>
                Off
                <input type="checkbox">
                <span class="lever"></span> On
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>