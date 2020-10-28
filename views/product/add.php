<div class="container">
  <form action="" method="post">
    <input type="hidden" name="image" id="image2up" placeholder="this is real image uploader">
    <div class="avatar-upload">
      <div class="avatar-edit">
        <input type='file' id="imageUpload" accept="image/*" />
        <label for="imageUpload"></label>
      </div>
      <div class="avatar-preview">
        <div id="imagePreview" style="background-image: url(/assets/img/upload-your-logo-here.png);">
        </div>
      </div>
      <div>
        <input type="url" id="urlImage" class="mt-2 form-control" placeholder="Images from url">
      </div>
    </div>

    <div class="form-group">
      <label for="inputProductName">Product Name <small class="text-muted"><i>| <span id="generic-name" class=""></span></i></small></label>
      <input type="text" class="form-control" id="inputProductName" aria-describedby="categoryHelp" name="name" placeholder="Enter category name">
      <small id="categoryHelp" class="form-text text-muted">Insert Product Name. Ex: DOCOSANOL - TOPICAL</small>
    </div>

    <div class="form-group">
      <label for="aliasInput">Product Alias Name</label>
      <input type="text" class="form-control" id="aliasInput" aria-describedby="aliasHelp" name="alias" placeholder="Enter category alias name">
      <small id="aliasHelp" class="form-text text-muted">Product alias name. Ex: doe-COE-sah-noll</small>
    </div>

    <div class="input-group select2-bootstrap-operator mb-2">
      <label for="">Select Brand</label>
      <select class="form-control select2-brands" tabindex="-1" aria-hidden="true" name="brand">
      </select>
    </div>

    <div class="input-group select2-bootstrap-operator mb-2">
      <label for="">Select Category</label>
      <select class="form-control select2-categories" tabindex="-1" aria-hidden="true" name="category">
      </select>
    </div>

    <button type="submit" class="btn btn-primary btn-block"><i class="fas fa-save"></i> Save</button>
  </form>
</div>