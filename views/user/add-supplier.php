<?php
if (current_user_can('company_user_setting')) {
  ?>
<div class="row">
  <div class="col-md-12">
    <div class="pd-sm-40">
      <button type="button" class="close pos-absolute t-15 r-20 tx-26">
        <i class="fas fa-user"></i>
      </button>

      <h5 class="modal-title mg-b-5">Create New Account</h5>
      <p class="mg-b-20">Supplier.</p>

      <form action="" method="post" id="ajax">
        <div class="form-group">
          <input type="text" name="supplier" class="form-control" placeholder="Supplier">
        </div><!-- form-group -->
        <div class="form-group">
          <input type="text" class="form-control" name="phone" placeholder="Phone">
        </div><!-- form-group -->
        <div class="form-group">
          <input type="text" class="form-control" name="email" placeholder="Email">
        </div><!-- form-group -->
        <div class="form-group">
          <textarea name="address" class="form-control" placeholder="Address"></textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-block">Daftar</button>
      </form>
    </div>
  </div>
</div>
<?php
}
