<?php if (is_user_logged_in()) { ?>
<h2 class="az-content-title tx-24 mg-b-5">Hi, welcome back <?=$user->dname(); ?>!</h2>
<p class="mg-b-20">Your product performance and management dashboard template.</p>
<?php } ?>
<div class="row row-sm mg-b-20">
  <div class="col-sm-6 col-lg-4">
    <div class="card card-dashboard-twentysix">
      <div class="card-header">
        <h6 class="card-title">Customers</h6>
        <div class="chart-legend">
          <div><span class="bg-primary"></span> New</div>
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
  </div><!-- col -->
  <div class="col-sm-6 col-lg-4 mg-t-20 mg-sm-t-0">
    <div class="card card-dashboard-twentysix card-dark-one">
      <div class="card-header">
        <h6 class="card-title">Conversions</h6>
      </div><!-- card-header -->
      <div class="card-body">
        <div class="pd-x-15">
          <h6>0.23% <span><i class="icon ion-md-arrow-up"></i> 0.20%</span></h6>
          <label>Purchased</label>
        </div>
        <div class="chart-wrapper">
          <div id="flotChart8" class="flot-chart"></div>
        </div><!-- chart-wrapper -->
      </div><!-- card-body -->
    </div><!-- card -->
  </div><!-- col -->
  <div class="col-lg-4 mg-t-20 mg-lg-t-0">
    <div class="card card-dashboard-twentysix card-dark-two">
      <div class="card-header">
        <h6 class="card-title">Revenue</h6>
      </div><!-- card-header -->
      <div class="card-body">
        <div class="pd-x-15">
          <h6>$7,299 <span><i class="icon ion-md-arrow-up"></i> 1.18%</span></h6>
          <label>Total Sales</label>
        </div>
        <div class="chart-wrapper">
          <div id="flotChart9" class="flot-chart"></div>
        </div><!-- chart-wrapper -->
      </div><!-- card-body -->
    </div><!-- card -->
  </div><!-- col -->
</div><!-- row -->

<div class="card card-body card-dashboard-twentyfive mg-b-20">
  <h6 class="card-title">Conversions</h6>
  <div class="row row-sm">
    <div class="col-6 col-sm-4 col-lg">
      <label class="card-label">Conversion Rate</label>
      <h6 class="card-value">0.81<small>%</small></h6>
      <div class="chart-wrapper">
        <div id="flotChart1" class="flot-chart"></div>
      </div><!-- chart-wrapper -->
    </div><!-- col -->
    <div class="col-6 col-sm-4 col-lg">
      <label class="card-label">Revenue</label>
      <h6 class="card-value"><span>$</span>1,095,190</h6>
      <div class="chart-wrapper">
        <div id="flotChart2" class="flot-chart"></div>
      </div><!-- chart-wrapper -->
    </div><!-- col -->
    <div class="col-6 col-sm-4 col-lg mg-t-20 mg-sm-t-0">
      <label class="card-label">Unique Purchases</label>
      <h6 class="card-value">53</h6>
      <div class="chart-wrapper">
        <div id="flotChart3" class="flot-chart"></div>
      </div><!-- chart-wrapper -->
    </div><!-- col -->
    <div class="col-6 col-sm-4 col-lg mg-t-20 mg-lg-t-0">
      <label class="card-label">Transactions</label>
      <h6 class="card-value">31</h6>
      <div class="chart-wrapper">
        <div id="flotChart4" class="flot-chart"></div>
      </div><!-- chart-wrapper -->
    </div><!-- col -->
    <div class="col-6 col-sm-4 col-lg mg-t-20 mg-lg-t-0">
      <label class="card-label">Avg. Order Value</label>
      <h6 class="card-value"><span>$</span>306.20</h6>
      <div class="chart-wrapper">
        <div id="flotChart5" class="flot-chart"></div>
      </div><!-- chart-wrapper -->
    </div><!-- col -->
    <div class="col-6 col-sm-4 col-lg mg-t-20 mg-lg-t-0">
      <label class="card-label">Quantity</label>
      <h6 class="card-value">52</h6>
      <div class="chart-wrapper">
        <div id="flotChart6" class="flot-chart"></div>
      </div><!-- chart-wrapper -->
    </div><!-- col -->
  </div><!-- row -->
</div><!-- card -->

<div class="row row-sm">
  <div class="col-lg-6">
    <div class="card card-dashboard-twentyfour">
      <div class="card-header">
        <h6 class="card-title">Real Time Sales</h6>
        <span>This Week</span>
      </div><!-- card-header -->
      <div class="card-body">
        <div class="card-body-top">
          <div>
            <h6><span>$</span>150,200<small>.00</small></h6>
            <label>Total Sales</label>
          </div>
          <div>
            <h6><span>$</span>21,830<small>.25</small></h6>
            <label>Avg. Sales per Day</label>
          </div>
        </div><!-- card-body-top -->

        <div class="d-flex justify-content-between mg-b-15">
          <label class="az-content-label">Sales Per Hour</label>
          <div class="chart-legend">
            <div><span class="bg-primary"></span> Today</div>
            <div><span class="bg-gray-400"></span> Yesterday</div>
          </div><!-- chart-legend -->
        </div>
        <div class="chart-wrapper">
          <div id="flotBar1" class="flot-chart"></div>
        </div><!-- chart-wrapper -->
      </div><!-- card-body -->
    </div><!-- card -->
  </div><!-- col -->
  <div class="col-lg-6 mg-t-20 mg-lg-t-0">
    <div class="card card-dashboard-twentyfour">
      <div class="card-header">
        <h6 class="card-title">Store Visitors</h6>
        <span>This Week</span>
      </div><!-- card-header -->
      <div class="card-body">
        <div class="card-body-top">
          <div>
            <h6>297,506</h6>
            <label>Total Visitors</label>
          </div>
          <div>
            <h6>38,130</h6>
            <label>Visits per Day</label>
          </div>
          <div>
            <h6>35.07%</h6>
            <label>Bounce Rate</label>
          </div>
        </div><!-- card-body-top -->

        <div class="d-flex justify-content-between mg-b-15">
          <label class="az-content-label">Visitors Per Hour</label>
          <div class="chart-legend">
            <div><span class="bg-pink"></span> Today</div>
            <div><span class="bg-gray-400"></span> Yesterday</div>
          </div><!-- chart-legend -->
        </div>
        <div class="chart-wrapper">
          <div id="flotLine1" class="flot-chart"></div>
        </div><!-- chart-wrapper -->
      </div><!-- card-body -->
    </div><!-- card -->
  </div><!-- col -->
  <div class="col-lg-8 mg-t-20">
    <div class="card card-table-two">
      <h6 class="card-title">Most Recent Earnings</h6>
      <span class="d-block mg-b-20">This is the most recent earnings for today's date.</span>
      <div class="table-responsive">
        <table class="table table-striped table-dashboard-two mg-b-0">
          <thead>
            <tr>
              <th class="wd-lg-25p">Date</th>
              <th class="wd-lg-25p tx-right">Sales Count</th>
              <th class="wd-lg-25p tx-right">Earnings</th>
              <th class="wd-lg-25p tx-right">Tax Witheld</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>05 Oct 2018</td>
              <td class="tx-right tx-medium tx-inverse">25</td>
              <td class="tx-right tx-medium tx-inverse">$380.50</td>
              <td class="tx-right tx-medium tx-danger">-$23.50</td>
            </tr>
            <tr>
              <td>04 Oct 2018</td>
              <td class="tx-right tx-medium tx-inverse">34</td>
              <td class="tx-right tx-medium tx-inverse">$503.20</td>
              <td class="tx-right tx-medium tx-danger">-$13.45</td>
            </tr>
            <tr>
              <td>03 Oct 2018</td>
              <td class="tx-right tx-medium tx-inverse">30</td>
              <td class="tx-right tx-medium tx-inverse">$489.65</td>
              <td class="tx-right tx-medium tx-danger">-$20.98</td>
            </tr>
            <tr>
              <td>02 Oct 2018</td>
              <td class="tx-right tx-medium tx-inverse">27</td>
              <td class="tx-right tx-medium tx-inverse">$421.80</td>
              <td class="tx-right tx-medium tx-danger">-$22.22</td>
            </tr>
            <tr>
              <td>01 Oct 2018</td>
              <td class="tx-right tx-medium tx-inverse">31</td>
              <td class="tx-right tx-medium tx-inverse">$518.60</td>
              <td class="tx-right tx-medium tx-danger">-$23.01</td>
            </tr>
            <tr>
              <td>01 Oct 2018</td>
              <td class="tx-right tx-medium tx-inverse">31</td>
              <td class="tx-right tx-medium tx-inverse">$518.60</td>
              <td class="tx-right tx-medium tx-danger">-$23.01</td>
            </tr>
          </tbody>
        </table>
      </div><!-- table-responsive -->
    </div><!-- card-dashboard-five -->
  </div><!-- col -->
  <div class="col-lg-4 mg-t-20">
    <div class="card card-dashboard-eight bg-white">
      <h6 class="card-title">Your Top Countries</h6>
      <span class="d-block mg-b-20">Sales performance revenue based by country</span>

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
</div><!-- row -->