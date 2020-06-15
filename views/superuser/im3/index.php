<?php include __DIR__ . '/../breadcrumb.php'; ?>
<section>
  <div class="card mb-2">
    <!-- Card content -->
    <div class="card-body elegant-color white-text rounded-bottom">

      <!-- Social shares button -->
      <a class="activator waves-effect mr-4"><i class="fad fa-sim-card white-text"></i></a>
      <!-- Title -->
      <h4 class="card-title">OTP</h4>
      <hr class="hr-light">
      <!-- Text -->
      <p class="card-text white-text mb-4">
        <?php
        include __DIR__ . '/index-otp.php';
        ?>
      </p>
    </div>

  </div>

  <div class="card mb-2">
    <!-- Card content -->
    <div class="card-body elegant-color white-text rounded-bottom">

      <!-- Social shares button -->
      <a class="activator waves-effect mr-4"><i class="fas fa-inventory"></i></a>
      <!-- Title -->
      <h4 class="card-title">Direct Package Activator</h4>
      <hr class="hr-light">
      <!-- Text -->
      <p class="card-text white-text mb-4">
        <?php
        include __DIR__ . '/index-activate.php';
        ?>
      </p>
    </div>

  </div>

  <div class="card mb-2">
    <!-- Card content -->
    <div class="card-body rounded-bottom">

      <!-- Social shares button -->
      <a class="activator waves-effect mr-4"><i class="fad fa-barcode white-text"></i></a>
      <!-- Title -->
      <h4 class="card-title">OAUTH Generator</h4>
      <hr class="hr-light">
      <!-- Text -->
      <p class="card-text white-text mb-4">
        <?php
        include __DIR__ . '/index-oauth.php';
        ?>
      </p>
    </div>

  </div>

  <div class="card">
    <!-- Card content -->
    <div class="card-body rounded-bottom">

      <!-- Social shares button -->
      <a class="activator waves-effect mr-4"><i class="fad fa-sim-card white-text"></i></a>
      <!-- Title -->
      <h4 class="card-title">API</h4>
      <hr class="hr-light">
      <!-- Text -->
      <p class="card-text white-text mb-4">
        <?php
        include __DIR__ . '/portal.php';
        ?>
      </p>
    </div>

  </div>


</section>

<?php
define('CSS', [
  '/node_modules/animate.css/animate.min.css',
]);

define('SCRIPT', [
  __DIR__ . '/index-activate.min.js',
  __DIR__ . '/portal.min.js',
]);

define('STYLESRC', [
  __DIR__ . '/index-activate.min.css',
  __DIR__ . '/portal.min.css',
]);

define('materialize', 1);
define('uidjs', 1);
