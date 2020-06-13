<?php

?>
<div class="card profile">
  <div class="column_one">
    <div class="text">
      <h3><?= $_SESSION['google']['givenName']; ?> <span><?= $_SESSION['google']['familyName']; ?></span></h3>
      <div class="line"></div>
      <p>
        Profile Description
      </p>
      <i class="fas fa-home fa-lg"></i>
      <i class="fas fa-envelope fa-lg"></i>
      <i class="fas fa-phone fa-lg"></i>
    </div>
    <div class="title">Client</div>
  </div>
  <div class="column_two">
    <img src="<?= $_SESSION['google']['picture']; ?>" />
  </div>
</div>