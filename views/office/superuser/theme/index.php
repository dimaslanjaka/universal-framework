<section>
  <div class="card mb-3">
    <div class="card-body">
      <a href="meta">Meta</a>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="form-row">
        <div class="col">
          Clean cache including Sessions, Html, Processed static assets
        </div>
        <div class="col">
          <button class="btn btn-block" id="ajax" src="clean?clean_cache=1"><i class="fad fa-sync"></i></button>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          Latest File
        </div>
        <div class="col">
          <span class="badge text-white purple" id="latest" onload="latest(this)"></span>
        </div>
      </div>
    </div>
  </div>
</section>