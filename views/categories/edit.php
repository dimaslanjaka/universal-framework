<?php
if (isset($_GET['id'])) {
  $categoriesId = $_GET['id'];
  $query = pdo()->query("SELECT * FROM `categories` WHERE categories_id='$categoriesId'")->fetch();
?>
  <div class="container">
    <form action="#save" method="post">
      <input type="hidden" name="id" value="<?= $query['result'][0]['categories_id'] ?>">
      <div class="form-group">
        <label for="categoriesName">Name Category</label>
        <input type="text" class="form-control" id="categoriesName" aria-describedby="categoriesNameHelp" name="name" placeholder="Enter Category Name" value="<?= $query['result'][0]['categories_name'] ?>">
        <small id="categoriesNameHelp" class="form-text text-muted">Insert/change desired categories names.</small>
      </div>

      <div class="form-group">
        <label for="descriptionInput">Description</label>
        <input type="text" class="form-control" name="description" id="descriptionInput" aria-describedby="descriptionHelp" value="<?= $query['result'][0]['categories_description'] ?>">
        <small id="descriptionHelp" class="form-text text-muted">Description of category.</small>
      </div>

      <div class="form-group">
        <label for="statusControl">Status Display</label>
        <select class="form-control" name="status" id="statusControl">
          <option value="1" <?= $query['result'][0]['categories_status'] == '1' ? 'selected' : '' ?>>Active</option>
          <option value="2" <?= $query['result'][0]['categories_status'] == '2' ? 'selected' : '' ?>>InActive</option>
        </select>
        <small id="activeStatusHelp" class="form-text text-muted">Active to enabled on product edit/add.</small>
      </div>

      <div class="form-group">
        <label for="statusControl">Status Activation</label>
        <select class="form-control" name="active" id="statusControl">
          <option value="1" <?= $query['result'][0]['categories_active'] == '1' ? 'selected' : '' ?>>Enabled</option>
          <option value="2" <?= $query['result'][0]['categories_active'] == '2' ? 'selected' : '' ?>>Disabled</option>
        </select>
        <small id="statusCategoryHelp" class="form-text text-muted">Disabled = Deleted.</small>
      </div>

      <button type="submit" class="btn btn-primary mb-2">Confirm Changes</button>
    </form>
  </div>
<?php
}
