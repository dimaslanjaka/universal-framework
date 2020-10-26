<?php
include __DIR__ . '/../../superuser/breadcrumb.php';
?>

<section>
  <div class="card">
    <div class="card-body">
      <h5 class="text-center card-title">
        Create
      </h5>
      <form action="manage/index" method="post">
        <div class="md-form">
          <input type="text" name="code" id="coupon" class="form-control" value="<?= uniqid() ?>">
          <label for="coupon">Coupon (default: auto)</label>
        </div>
        <div class="md-form input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text md-addon" id="material-addon1">Maximum</span>
          </div>
          <input type="number" name="max" class="form-control" placeholder="Maximum Dor" aria-label="Maximum Dor" aria-describedby="material-addon1" value="0">
        </div>
        <input type="hidden" name="create">
        <button type="submit" class="btn btn-block btn-info">Create</button>
      </form>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-body">
      <b class="text-center card-title">
        List coupons
      </b>
      <table class="table" id="listCoupons">
        <tr>
          <td>No data available</td>
        </tr>
      </table>
    </div>
  </div>
</section>

<section class="mt-2">
  <div class="card">
    <div class="card-body">
      <table class="table" id="ReportLog">
        <thead>
          <tr>
            <th>NO DATA</th>
            <th>NO DATA</th>
            <th>NO DATA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>No Data Available</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
<?php

define('datatables', 1);
