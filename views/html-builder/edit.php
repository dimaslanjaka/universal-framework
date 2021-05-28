<section>
  <div class="card">
    <div class="card-body">
      <div>
        <div class="btn-group">
          <button class="btn btn-sm btn-primary" id="beautify"><i class="far fa-code"></i> <span class="sr-only">Beautify</span></button>
        </div>
      </div>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="html-tab" data-toggle="tab" href="#html" role="tab" aria-controls="html" aria-selected="true">html</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="css-tab" data-toggle="tab" href="#css" role="tab" aria-controls="css" aria-selected="false">css</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="js-tab" data-toggle="tab" href="#js" role="tab" aria-controls="js" aria-selected="false">js</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="html" role="tabpanel" aria-labelledby="html-tab">
          <textarea name="thtml" id="thtml" cols="30" rows="10" class="form-control"></textarea>
        </div>
        <div class="tab-pane fade" id="css" role="tabpanel" aria-labelledby="css-tab">
          <textarea name="tcss" id="tcss" cols="30" rows="10" class="form-control"></textarea>
        </div>
        <div class="tab-pane fade" id="js" role="tabpanel" aria-labelledby="js-tab">
          <textarea name="tjs" id="tjs" cols="30" rows="10" class="form-control"></textarea>
        </div>
      </div>
    </div>
  </div>
</section>