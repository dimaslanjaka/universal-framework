<div class="container">
  <form action="" method="post">

    <div class="avatar-upload">
      <div class="avatar-edit">
        <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
        <label for="imageUpload"></label>
      </div>
      <div class="avatar-preview">
        <div id="imagePreview" style="background-image: url(http://i.pravatar.cc/500?img=7);">
        </div>
      </div>
    </div>

    <div class="form-group mb-2">
      <label for="inputProductName">Product Name</label>
      <input type="text" class="form-control" id="inputProductName" aria-describedby="categoryHelp" name="name" placeholder="Enter category name">
      <small id="categoryHelp" class="form-text text-muted">Insert Product Name. Ex: DOCOSANOL - TOPICAL</small>
    </div>

    <div class="form-group">
      <label for="aliasInput">Product Alias Name</label>
      <input type="text" class="form-control" id="aliasInput" aria-describedby="aliasHelp" name="alias" placeholder="Enter category alias name">
      <small id="aliasHelp" class="form-text text-muted">Product alias name. Ex: doe-COE-sah-noll</small>
    </div>

    <div class="m-2">
      <i>Generated Generic Names: <span id="generic-name" class=""></span></i>
    </div>

    <button type="submit" class="btn btn-primary btn-block"><i class="fas fa-save"></i> Save</button>
  </form>
</div>