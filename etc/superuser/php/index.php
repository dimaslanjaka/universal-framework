<?php include __DIR__ . '/../breadcrumb.php';
$log = \MVC\helper::php_error_log(true);
?>

<section>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col"><small>LOG Location: <span class="text-danger"><?= $log ?></span></small></div>
        <div class="col-2"><button class="btn btn-sm btn-danger" id="clean_log"><i class="fad fa-trash"></i></button></div>
      </div>
      <hr>
      <?php
      $i = 0;
      foreach (explode(PHP_EOL, read_file($log)) as $line) {
        $i++;
        echo "<span class='badge badge-danger'>$i</span> $line <br>";
      }
      ?>
    </div>
  </div>
</section>