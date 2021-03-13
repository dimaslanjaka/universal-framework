<?php
?>
<div class="row row-sm mg-b-20">
  <div class="col-sm-6 col-lg-4">
    <div class="card card-dashboard-twentysix">
      <div class="card-header">
        <h6 class="card-title">Buat order</h6>
        <div class="chart-legend">
          <div><a href="/kasir/order-penjualan" data-toggle="tooltip-primary" data-placement="bottom"
              data-original-title="Buat order penjualan"><span class="bg-primary"></span> New</a></div>
          <div><span class="bg-teal"></span> Returning</div>
        </div><!-- chart-legend -->
      </div><!-- card-header -->
      <div class="card-body">
        <div class="pd-x-15">
          <h6>156 <span class="tx-success"><i class="icon ion-md-arrow-up"></i> 3.7%</span></h6>
          <label>Avg. Customers/Day</label>
        </div>
        <div class="chart-wrapper">
          <div id="flotChart7" class="flot-chart"></div>
        </div><!-- chart-wrapper -->
      </div><!-- card-body -->
    </div><!-- card -->
  </div>
  <div class="col-lg-4 col-sm-6">
    <div class="card card-dashboard-eight bg-white">
      <h6 class="card-title">Daftar Pelanggan</h6>
      <span class="d-block mg-b-20"><a href="/user" data-param="add-client">Tambah pelanggan</a></span>

      <div class="list-group">
        <div class="list-group-item">
          <i class="flag-icon flag-icon-us flag-icon-squared"></i>
          <p>United States</p>
          <span>$1,671.10</span>
        </div><!-- list-group-item -->
        <div class="list-group-item">
          <i class="flag-icon flag-icon-nl flag-icon-squared"></i>
          <p>Netherlands</p>
          <span>$1,064.75</span>
        </div><!-- list-group-item -->
        <div class="list-group-item">
          <i class="flag-icon flag-icon-gb flag-icon-squared"></i>
          <p>United Kingdom</p>
          <span>$1,055.98</span>
        </div><!-- list-group-item -->
        <div class="list-group-item">
          <i class="flag-icon flag-icon-ca flag-icon-squared"></i>
          <p>Canada</p>
          <span>$1,045.49</span>
        </div><!-- list-group-item -->
        <div class="list-group-item">
          <i class="flag-icon flag-icon-au flag-icon-squared"></i>
          <p>Australia</p>
          <span>$1,042.00</span>
        </div><!-- list-group-item -->
      </div><!-- list-group -->
    </div><!-- card -->
  </div><!-- col -->
</div>