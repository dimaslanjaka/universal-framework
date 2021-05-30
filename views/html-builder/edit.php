<section>
  <div class="card">
    <div class="card-body">
      <div>
        <div class="btn-group">
          <button class="btn btn-sm btn-primary" id="beautify"><i class="far fa-code"></i> <span class="sr-only">Beautify</span></button>
        </div>
      </div>
      <form action="?save" method="post" id="edit">
        <input type="hidden" name="fn" id="fn">
        <div class="mb-2">
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
            <li class="nav-item">
              <a href="#preview" class="nav-link" data-toggle="tab" role="tab" id="preview-tab"><i class="far fa-eye"></i></a>
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
            <div class="tab-pane fade" id="preview" role="tabpanel" aria-labelledby="preview-tab">
              <iframe id="i-preview" frameborder="0" class="responsive-iframe" width="100%" height="500px"></iframe>
            </div>
          </div>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-sm"><i class="far fa-save"></i></button>
        </div>
      </form>
    </div>
  </div>
</section>