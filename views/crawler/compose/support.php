<?php

use agc_service\Service;
?>

<div class="text-center">
  <h1>Supported URLs for AGC</h1>
</div>

<?php
$class = new Service();
$class->getDomainServices();
