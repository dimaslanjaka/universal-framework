<?php if (!current_user_can('administrator')) { ?>
<div class="alert alert-outline-danger mg-b-0" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
  </button>
  <strong>Danger!</strong> GET OUT.
  <div countdown="10" data-callback="rdr" class="m-2"></div>
</div>
<?php }?>
<script>
  function rdr() {
    location.replace('/login');
  }
</script>