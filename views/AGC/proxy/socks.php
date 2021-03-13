<div class="bg-white p-3 row mb-3">
  <form class="col-md-12" id="f">
    <div class="mb-2 form-group">
      <label for="proxies">IP:PORT</label>
      <textarea type="text" class="form-control" id="proxies" placeholder="One proxy per line" required></textarea>
    </div>
    <label for="">Checking for</label>
    <div class="form-row ml-3 mb-3">
      <div class="col-md-4">
        <div class="row">
          <div class="col">
            <input type="checkbox" class="custom-control-input" id="socks4" name="socks4">
            <label class="custom-control-label" for="socks4">socks4</label>
          </div>
          <div class="col">
            <input type="checkbox" class="custom-control-input" id="socks5" name="socks5">
            <label class="custom-control-label" for="socks5">socks5</label>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col">
            <input type="checkbox" class="custom-control-input" id="facebook" name="facebook">
            <label class="custom-control-label" for="facebook">facebook</label>
          </div>
          <div class="col">
            <input type="checkbox" class="custom-control-input" id="google" name="google">
            <label class="custom-control-label" for="google">google</label>
          </div>
          <div class="col">
            <input type="checkbox" class="custom-control-input" id="instagram" name="instagram">
            <label class="custom-control-label" for="instagram">instagram</label>
          </div>
          <div class="col">
            <input type="checkbox" class="custom-control-input" id="telegram" name="telegram">
            <label class="custom-control-label" for="telegram">telegram</label>
          </div>
          <div class="col">
            <input type="checkbox" class="custom-control-input" id="youtube" name="youtube">
            <label class="custom-control-label" for="youtube">youtube</label>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary" type="submit">Submit form</button>
  </form>
</div>

<div class="row mb-3">
  <div class="col-md-12">
    <div class="progress">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
    </div>
  </div>
</div>

<div class="mb-3 row">

  <div class="col">
    <i class="fab fa-telegram"></i> Support for instagram
  </div>
  <div class="col">
    <i class="fab fa-google"></i> Support for google
  </div>
  <div class="col">
    <i class="fab fa-facebook"></i> Support for facebook
  </div>
  <div class="col">
    <i class="fab fa-youtube"></i> Support for youtube
  </div>
  <div class="col">
    <i class="fab fa-instagram"></i> Support for instagram
  </div>
  <div class="col">
    <i class="fas fa-lock-open text-danger"></i> Only HTTP
  </div>
  <div class="col">
    <i class="fas fa-lock text-success"></i> Support HTTP(S)
  </div>
  <div class="col">
    <i class="fas fa-clock"></i> Latency minutes/seconds
  </div>
</div>

<div class="row">
  <div class="col-md-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Socks 4</h5>
        <table class="card-table table mt-2" id="socks4">
          <thead>
            <tr>
              <th scope="col">Proxy</th>
              <th scope="col">Social Media</th>
              <th scope="col">Anonimity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IP:PORT</td>
              <td><i class="fab fa-telegram"></i><i class="fab fa-google"></i><i class="fab fa-facebook"></i><i class="fab fa-youtube"></i><i class="fab fa-instagram"></i><i class="fas fa-lock-open text-danger"></i><i class="fas fa-lock text-success"></i></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Socks 5</h5>
        <table id="socks5" class="card-table table mt-2">
          <thead>
            <tr>
              <th scope="col">Proxy</th>
              <th scope="col">Social Media</th>
              <th scope="col">Anonimity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IP:PORT</td>
              <td><i class="fab fa-telegram"></i><i class="fab fa-google"></i><i class="fab fa-facebook"></i><i class="fab fa-youtube"></i><i class="fab fa-instagram"></i><i class="fas fa-lock-open text-danger"></i><i class="fas fa-lock text-success"></i></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<?php
define('toastr', 1);
