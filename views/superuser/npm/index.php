<?php
include __DIR__ . '/../breadcrumb.php';
$gui = npm('npm-gui', 'localhost:9000');
$connection = @fsockopen($_SERVER['HTTP_HOST'], 9000);
$open = is_resource($connection) ? '<span class="badge badge-success mr-1">Running</span> <a href="//' . $_SERVER['HTTP_HOST'] . ':9000" class="badge badge-primary">access</a>' : '<span class="badge badge-danger">Stopped</span>';

function npm($cmd, $arg)
{
  $ext = '';
  if (\MVC\helper::is_windows()) {
    $ext = '.cmd';
  }
  $command = normalize_path(ROOT . '/node_modules/.bin/' . $cmd . $ext);
  return "$command $arg";
}
?>

<div class="card">
  <div class="card-body">
    <div class="row">
      <div class="col">
        <kbd><?= $gui ?></kbd>
      </div>
      <div class="col-2">
        <?= $open ?>
      </div>
    </div>
  </div>
</div>