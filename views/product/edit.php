<?php
if (isset($_GET['id'])) {
  $productId = $_GET['id'];
  $query = pdo()->query("SELECT * FROM `product` WHERE product_id='$productId'")->fetch();
?>
  <div class="container">
    <form action="#save" method="post">
      <input type="hidden" name="id" value="<?= $query['result'][0]['product_id'] ?>">
      <div class="form-group">
        <label for="productName">Name Category</label>
        <input type="text" class="form-control" id="productName" aria-describedby="productNameHelp" name="name" placeholder="Enter Category Name" value="<?= $query['result'][0]['product_name'] ?>">
        <small id="productNameHelp" class="form-text text-muted">Insert/change desired product names.</small>
      </div>

      <div class="form-group">
        <label for="aliasInput">Alias</label>
        <input type="text" class="form-control" name="alias" id="aliasInput" aria-describedby="aliasHelp" value="<?= $query['result'][0]['product_alias'] ?>">
        <small id="aliasHelp" class="form-text text-muted">Alias of product.</small>
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
