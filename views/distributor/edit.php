<?php
if (isset($_GET['id'])) {
  $distributorId = $_GET['id'];
  $query = pdo()->query("SELECT * FROM `distributor` WHERE id='$distributorId'")->fetch();
?>
  <div class="container">
    <form action="#save" method="post">
      <input type="hidden" name="id" value="<?= $query['result'][0]['id'] ?>">
      <div class="form-group">
        <label for="distributorName">Name Distributor</label>
        <input type="text" class="form-control" id="distributorName" aria-describedby="distributorNameHelp" name="name" placeholder="Enter Distributor Name" value="<?= $query['result'][0]['name'] ?>">
        <small id="distributorNameHelp" class="form-text text-muted">Insert/change desired distributor names.</small>
      </div>

      <div class="form-group">
        <label for="addressInput">Address</label>
        <input type="text" class="form-control" name="address" id="addressInput" aria-describedby="addressHelp" value="<?= $query['result'][0]['address'] ?>">
        <small id="addressHelp" class="form-text text-muted">Address of distributor.</small>
      </div>

      <div class="form-group">
        <label for="telpControl">Telp</label>
        <input type="text" class="form-control" name="telp" id="telpInput" aria-describedby="telpDistributorHelp" value="<?= $query['result'][0]['telp'] ?>">
        <small id="telpDistributorHelp" class="form-text text-muted">Telephone of distributor.</small>
      </div>

      <button type="submit" class="btn btn-primary mb-2">Confirm Changes</button>
    </form>
  </div>
<?php
}
