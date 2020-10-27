<?php
if (isset($_GET['id'])) {
  $brandId = $_GET['id'];
  $query = pdo()->query("SELECT * FROM `brands` WHERE brand_id='$brandId'")->fetch();
?>
  <div class="container">
    <form action="#save" method="post">
      <input type="hidden" name="id" value="<?= $query['result'][0]['brand_id'] ?>">
      <div class="form-group">
        <label for="brandName">Name Brand</label>
        <input type="text" class="form-control" id="brandName" aria-describedby="brandNameHelp" name="name" placeholder="Enter Brand Name" value="<?= $query['result'][0]['brand_name'] ?>">
        <small id="brandNameHelp" class="form-text text-muted">Insert/change desired brand names.</small>
      </div>

      <div class="form-group">
        <label for="statusControl">Status Display</label>
        <select class="form-control" name="status" id="statusControl">
          <option value="1" <?= $query['result'][0]['brand_status'] == '1' ? 'selected' : '' ?>>Active</option>
          <option value="2" <?= $query['result'][0]['brand_status'] == '2' ? 'selected' : '' ?>>InActive</option>
        </select>
        <small id="activeStatusHelp" class="form-text text-muted">Active to enabled on product edit/add.</small>
      </div>

      <div class="form-group">
        <label for="statusControl">Status Activation</label>
        <select class="form-control" name="active" id="statusControl">
          <option value="1" <?= $query['result'][0]['brand_active'] == '1' ? 'selected' : '' ?>>Enabled</option>
          <option value="2" <?= $query['result'][0]['brand_active'] == '2' ? 'selected' : '' ?>>Disabled</option>
        </select>
        <small id="statusBrandHelp" class="form-text text-muted">Disabled = Deleted.</small>
      </div>

      <button type="submit" class="btn btn-primary mb-2">Confirm Changes</button>
    </form>
  </div>
<?php
}
