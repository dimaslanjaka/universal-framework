<?php
include __DIR__ . '/aside.php';
?>
<div class="az-content az-content-dashboard-ten">
  <?php
  include __DIR__ . '/az-header.php';
  ?>

  <div class="az-content-body">
    <div class="az-content-body-left">
      <?php include $content; ?>
    </div>
    <?php
  ///include __DIR__ . '/content-right.php';
  ?>

  </div><!-- az-content-body -->

  <div class="az-footer">
    <div class="container-fluid">
      <span>&copy; <?=date('Y'); ?> Dimas Lanjaka
        Accounting</span>
      <span>
        <small>This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and
          <a href="https://policies.google.com/terms">Terms of Service</a> apply.
        </small>
      </span>
    </div><!-- container -->
  </div><!-- az-footer -->
</div><!-- az-content -->

<!--flash ASUS Z00LDD-->