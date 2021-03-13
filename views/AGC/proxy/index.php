<?php

define('toastr', 1);

?>
<div class="row mb-2">
  <div class="col text-center border-success border-right">
    <a class="tx-success" href="/AGC/proxy/index" rel="bookmark" data-toggle="tooltip" title="Google proxy only HTTP(s)"><i class="fab fa-google">oogle</i> HTTP Proxy</a>
  </div>
  <div class="col text-center border-primary border-left">
    <a class="tx-primary" href="/AGC/proxy/checker" rel="bookmark" data-toggle="tooltip" title="Google proxy support HTTP(s) and SOCKS"><i class="fab fa-google">oogle</i> HTTP & SOCKS Proxy</a>
  </div>
</div>

<div class="row">
  <div class="col-md-12">
    <div class="mb-3">
      <textarea name="" id="proxies" cols="30" rows="10" class="form-control mb-3"></textarea>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" value="" id="freshProxy">
        <label class="form-check-label" for="freshProxy">
          Get latest fresh proxy
        </label>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="max-result-addons" data-toggle="tooltip" title="Max result per session">Max (100)</span>
        </div>
        <input type="number" placeholder="maximum result" id="maxres" value="1" class="form-control" aria-describedby="max-result-addons">
      </div>
      <div class="row">
        <div class="col-md-6">
          <button class="btn btn-block btn-primary w3-btn w3-blue" id="get-proxy" data-toggle="tooltip" title="Get new fresh proxies">Get proxies</button>
        </div>
        <div class="col-md-6">
          <button class="btn btn-block btn-primary w3-btn w3-blue" id="proxies-test">Check proxy</button>
        </div>
      </div>
    </div>
    <div class="border">
      <div id="proxy_result_wrapper">
        <div class="w3-card-4">

          <header class="w3-container w3-blue">
            <div class="d-flex justify-content-between">
              <div>
                <h2>Fresh proxy <i class="fab fa-google">oogle</i> passed</h2>
                <small id="descr">fresh google proxy, google passed</small>
              </div>
              <div>
                <a disabled class="btn btn-warning w3-text-white" id="blogger" href="https://web-manajemen.blogspot.com" rel="follow" title="Free Google Proxy List">Create article <i class="fab fa-blogger"></i></a>
              </div>
            </div>
          </header>

          <div class="w3-container">
            <p>
              <table id="proxies_result" class="w3-table w3-striped">
                <thead>
                  <tr>
                    <th>Proxy</th>
                    <th>Google passed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${%ip:port%}</td>
                    <td id="">
                      <div class="hovering ld-ext-right running"><span>${pseudo} Checking</span>
                        <div class="ld ld-ring ld-spin"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </p>
          </div>

          <footer class="w3-container w3-blue">
            <div class="d-flex justify-content-between">
              <div>
                <h5><a href="https://wp.webmanajemen.com/AGC/proxy" class="w3-text-white" style="pointer-events: none;">WMI Proxy checker 2019</a></h5>
              </div>

              <div>
                <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://assets.materialup.com/uploads/82eae29e-33b7-4ff7-be10-df432402b2b6/preview" alt="Google" width="30px" height="30px" class="w3-margin w3-hide">
              </div>
            </div>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/v4-shims.css">
          </footer>

        </div>

      </div>
    </div>
  </div>
</div>
<div id="post-helper" class="d-none"></div>


<?php
jscfg('NO_CSRF', true, true);
