<?php
if (isset($_GET['id'])) {
  $productId = $_GET['id'];
  $query = pdo()->query("SELECT * FROM `product` WHERE product_id='$productId'")->fetch();
?>
  <div class="container">
    <form action="#save" method="post">
      <input type="hidden" name="id" value="<?= $query['result'][0]['product_id'] ?>">
      <input type="hidden" name="image" id="image2up" placeholder="this is real image uploader" value="<?= $query['result'][0]['product_image'] ?>">

      <div class="avatar-upload">
        <div class="avatar-edit">
          <input type='file' id="imageUpload" accept="image/*" />
          <label for="imageUpload"></label>
        </div>
        <div class="avatar-preview">
          <div id="imagePreview" style="background-image: url(<?= $query['result'][0]['product_image'] ?>);">
          </div>
        </div>
        <div>
          <input type="url" id="urlImage-<?= $query['result'][0]['product_id'] ?>" class="mt-2 form-control" placeholder="Images from url">
        </div>
      </div>

      <div class="form-group">
        <label for="">Code Product</label>
        <input type="text" name="code" class="form-control" placeholder="Code Product" value="<?= $query['result'][0]['code'] ?>">
        <small class="text-muted form-text">Codename of product. Ex: X123</small>
      </div>
      <div class="form-group">
        <label for="productName">Name Category</label>
        <input type="text" class="form-control" id="productName" aria-describedby="productNameHelp" name="name" placeholder="Enter Category Name" value="<?= $query['result'][0]['product_name'] ?>">
        <small id="productNameHelp" class="form-text text-muted">Insert/change desired product names.</small>
      </div>

      <div class="form-group">
        <label for="aliasInput">Name Alias</label>
        <input type="text" class="form-control" name="alias" id="aliasInput" aria-describedby="aliasHelp" value="<?= $query['result'][0]['product_alias'] ?>">
        <small id="aliasHelp" class="form-text text-muted">Alias of product.</small>
      </div>

      <div class="form-group">
        <label for="">Unit</label>
        <input type="text" name="unit" class="form-control" placeholder="Unit product" value="<?= $query['result'][0]['unit'] ?>">
        <label for="" class="form-text text-muted">Unit of product. Ex: mg, pcs, ml.</label>
      </div>

      <div class="form-group">
        <label for="statusControl">Status Display</label>
        <select class="form-control" name="status" id="statusControl">
          <option value="1" <?= $query['result'][0]['status'] == '1' ? 'selected' : '' ?>>Active</option>
          <option value="2" <?= $query['result'][0]['status'] == '2' ? 'selected' : '' ?>>InActive</option>
        </select>
        <small id="activeStatusHelp" class="form-text text-muted">Active to enabled on product edit/add.</small>
      </div>

      <div class="form-group">
        <label for="statusControl">Status Activation</label>
        <select class="form-control" name="active" id="statusControl">
          <option value="1" <?= $query['result'][0]['active'] == '1' ? 'selected' : '' ?>>Enabled</option>
          <option value="2" <?= $query['result'][0]['active'] == '2' ? 'selected' : '' ?>>Disabled</option>
        </select>
        <small id="statusCategoryHelp" class="form-text text-muted">Disabled = Deleted.</small>
      </div>

      <button type="submit" class="btn btn-primary mb-2">Confirm Changes</button>
    </form>
  </div>
<?php
}
