<div class="">
  <form action="/im3/otp" method="post" data-success="otpreq">
    <input type="hidden" name="request" value="<?= uniqid() ?>">
    <div class="md-form">
      <input type="number" name="msisdn" class="form-control">
      <label for="">MSISDN</label>
    </div>
    <div class="md-form text-center">
      <button type="submit" class="btn btn-primary btn-block btn-sm" data-toggle="tooltip" title="request otp"><i class="fad fa-paper-plane"></i></button>
    </div>
  </form>

  <form action="/im3/otp" method="post" data-success="otpreq">
    <input type="hidden" name="validate" value="<?= uniqid() ?>">
    <div class="md-form">
      <input type="number" name="otp" class="form-control">
      <label for="">OTP</label>
    </div>
    <div class="md-form text-center">
      <button type="submit" class="btn btn-primary btn-block btn-sm" data-toggle="tooltip" title="validate otp"><i class="fad fa-paper-plane"></i></button>
    </div>
  </form>
</div>