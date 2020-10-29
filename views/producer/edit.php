<?php
if (isset($_GET['id'])) {
  $producerId = $_GET['id'];
  $query = pdo()->query("SELECT * FROM `producer` WHERE id='$producerId'")->fetch();
?>
  <div class="container">
    <form action="#save" method="post">
      <input type="hidden" name="id" value="<?= $query['result'][0]['id'] ?>">
      <div class="form-group">
        <label for="producerName">Name Producer</label>
        <input type="text" class="form-control" id="producerName" aria-describedby="producerNameHelp" name="name" placeholder="Enter Producer Name" value="<?= $query['result'][0]['name'] ?>">
        <small id="producerNameHelp" class="form-text text-muted">Insert/change desired producer names.</small>
      </div>

      <div class="form-group">
        <label for="addressInput">Address</label>
        <input type="text" class="form-control" name="address" id="addressInput" aria-describedby="addressHelp" value="<?= $query['result'][0]['address'] ?>">
        <small id="addressHelp" class="form-text text-muted">Address of producer.</small>
      </div>

      <div class="form-group">
        <label for="telpControl">Telp</label>
        <input type="text" class="form-control" name="telp" id="telpInput" aria-describedby="telpProducerHelp" value="<?= $query['result'][0]['telp'] ?>">
        <small id="telpProducerHelp" class="form-text text-muted">Telephone of producer.</small>
      </div>

      <button type="submit" class="btn btn-primary mb-2">Confirm Changes</button>
    </form>
  </div>
<?php
}
