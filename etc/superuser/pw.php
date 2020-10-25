<?php
if (user()->is_admin()) {
  ?>
  <section>
    <div class="text-center">
      <i>Encryption</i>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3">
        <label for="">Plain string</label>
        <textarea name="str" id="str" cols="30" rows="10" class="form-control"></textarea>
      </div>
      <div class="col-md-4 mb-3">
        <label for="">Encrypted from JS</label>
        <textarea name="encjs" id="" cols="30" rows="10" class="form-control"></textarea>
      </div>
      <div class="col-md-4 mb-3">
        <label for="">Encrypted from PHP</label>
        <textarea name="encphp" id="" cols="30" rows="10" class="form-control"></textarea>
      </div>
    </div>
    <div class="text-center">
      <i>Decryption</i>
    </div>
    <div class="row">
      <div class="col-md-4">
        <label for="">Plain encrypted</label>
        <textarea name="" id="encstr" cols="30" rows="10" class="form-control"></textarea>
      </div>
      <div class="col-md-4">
        <label for="">Decrypted from JS</label>
        <textarea name="decjs" id="decjs" cols="30" rows="10" class="form-control"></textarea>
      </div>
      <div class="col-md-4">
        <label for="">Decrypted from PHP</label>
        <textarea name="decphp" id="decphp" cols="30" rows="10" class="form-control"></textarea>
      </div>
    </div>
  </section>
<?php
}
