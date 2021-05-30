<section class="container-fluid">
  <h1>Generator</h1>
  <div class="form-group">
    <input type="text" id='pass' class="form-control" placeholder="Enter password you want to encrypt">
  </div>
</section>

<section class="container-fluid" style="word-wrap: break-word;">
  <div class="row mb-2">
    <div class="col-md-12">
      Secret : <kbd id="secret">-</kbd>
    </div>
  </div>
  <div class="row mb-2">
    <div class="col-md-6">
      Encrypted from php : <kbd id="encphp">-</kbd>
    </div>
    <div class="col-md-6">
      Decrypted from php : <kbd id="decphp">-</kbd>
    </div>
  </div>

  <div class="row mb-2">
    <div class="col-md-6">
      <p>Encrypted from JS : <kbd id="encjs">-</kbd></p>
      <pre id='jscode-encrypt'>aesEcrypt()</pre>
    </div>
    <div class="col-md-6">
      <p>Decrypted from JS : <kbd id="decjs">-</kbd></p>
      <pre id='jscode-decrypt'>aesDecrypt()</pre>
    </div>
  </div>
</section>