<?php

define('toastr', 1);

?>
<div class="row mb-2">
  <div class="col text-center border-primary border-right">
    <a class="tx-primary" href="/AGC/proxy/index" rel="bookmark" data-toggle="tooltip" title="Google proxy only HTTP(s)"><i class="fab fa-google">oogle</i> HTTP Proxy</a>
  </div>
  <div class="col text-center border-success border-left">
    <a class="tx-success" href="/AGC/proxy/checker" rel="bookmark" data-toggle="tooltip" title="Google proxy support HTTP(s) and SOCKS"><i class="fab fa-google">oogle</i> HTTP & SOCKS Proxy</a>
  </div>
</div>

<div class="row mb-2">
  <div class="col-md-12">
    <textarea name="" id="proxies" cols="30" rows="10" class="form-control"></textarea>
    <div class="row mt-2">
      <div class="col-md-6">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="max-result-addons" data-toggle="tooltip" title="Max bulk proxies once session">Exec max (5)</span>
          </div>
          <input type="number" placeholder="maximum session" id="maxses" value="1" class="form-control" aria-describedby="max-result-addons">
        </div>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="max-result-addons" data-toggle="tooltip" title="Max session">Session max (50)</span>
          </div>
          <input type="number" placeholder="maximum result" id="maxres" value="1" class="form-control" aria-describedby="max-result-addons">
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-6">
        <button class="btn btn-block btn-primary w3-btn w3-blue" id="get-proxy" data-toggle="tooltip" title="Get new fresh proxies">Get proxies</button>
      </div>
      <div class="col-md-6">
        <button class="btn btn-block btn-primary w3-btn w3-blue" id="proxies-test">Check proxy</button>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-md-12">
    <div class="border">
      <div id="proxy_result_wrapper">
        <div class="w3-card-4">

          <header class="w3-container w3-blue">
            <div class="d-flex justify-content-between">
              <div>
                <h1>Fresh proxy gate checker</h1>
                <small id="descr">proxy gate, support google</small>
              </div>
              <div>
                <a disabled class="btn btn-warning" id="blogger" href="https://web-manajemen.blogspot.com" rel="follow" title="Free Google Proxy List">Create article <i class="fab fa-blogger"></i></a>
              </div>
            </div>
          </header>

          <div class="w3-container">
            <p>
              <table id="proxies_result" class="w3-table w3-striped">
                <thead>
                  <tr>
                    <th>Proxy</th>
                    <th>Type</th>
                    <th>Anonimity</th>
                    <th>Method</th>
                    <th><i class="fab fa-google">oogle</i></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${%ip:port%}</td>
                    <td class="w3-center">
                      <div class="hovering ld-ext-right running"><span>${pseudo} Checking</span>
                        <div class="ld ld-ring ld-spin"></div>
                      </div>
                    </td>
                    <td class="w3-center"></td>
                    <td>
                      <input class="w3-check" type="checkbox">
                      <label>GET</label>
                      <input class="w3-check" type="checkbox">
                      <label>POST</label>
                      <input class="w3-check" type="checkbox">
                      <label>CONNECT</label>
                    </td>
                    <td class="w3-center">is support google ?</td>
                  </tr>
                </tbody>
              </table>
            </p>
          </div>

          <footer class="w3-container w3-blue">
            <div class="d-flex justify-content-between">
              <div>
                <h5>WMI Proxy checker 2019</h5>
              </div>

              <div>
                <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://assets.materialup.com/uploads/82eae29e-33b7-4ff7-be10-df432402b2b6/preview" alt="Google" width="30px" height="30px" class="w3-margin w3-hide">
              </div>
            </div>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" />
          </footer>

        </div>

      </div>
    </div>
  </div>
</div>