<div class="container">
  <div class="row">
    <div class="col-md-6 mb-2 border-bottom p-2">
      Cookies from <kbd>PHP</kbd>: <br>
      <?= \Cookie\helper::get('test'); ?>
      <br>
      Decoded from <kbd>JS</kbd>: <br>
      <span id="cookiejs"></span>
    </div>

    <div class="col-md-6 p-2 border-bottom mb-2">
      Cookies from <kbd>JS</kbd>: <br>
      <span id="setcookiejs"></span>
      <br>
      Decoded from <kbd>PHP</kbd>: <br>
      <span id="cookiephp"></span>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <input type="text" id="cookie-name" class="form-control" placeholder="cookie name">
        </div>
        <div class="col-md-6"><input type="text" id='cookie-value' class="form-control" placeholder="cookie value"></div>
        <div class="col-md-12"><button id="set-cookie" class="btn btn-block btn-primary">Set Cookie</button></div>
        <div class="col-md-12 mt-2">
          <pre id="allcookies" class=""></pre>
        </div>
      </div>
    </div>
  </div>

</div>