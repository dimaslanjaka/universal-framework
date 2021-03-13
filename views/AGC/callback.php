<?php
if (!isset($google)) $google = google_client();
if (isses('redirect_callback')) {
  //header("refresh:5; url=" . isses('redirect_callback'));
?>
  <script>
    location.replace('<?= isses('redirect_callback') ?>');
  </script>
<?php
  unses('redirect_callback');
} else if ($google->isSubsribed()) {
?>
  <div class="container">
    <div class="" style="margin-left:auto;margin-right:auto">
      <div class="">
        <div style="margin-left:auto;margin-right:auto">
          <h2 class="tx-success">Congratulations</h2>
        </div>
      </div>
    </div>
  </div>
  <script>
    location.replace('/AGC/lists');
  </script>
<?php
} else {
?>
  <div class="container">
    <div class="" style="margin-left:auto;margin-right:auto">
      <div class="">
        <div style="margin-left:auto;margin-right:auto">
          <h2 class="tx-danger">Unfortunately</h2>
        </div>
      </div>
    </div>
  </div>
  <script>
    location.replace('/AGC/login');
  </script>
<?php
}

?>