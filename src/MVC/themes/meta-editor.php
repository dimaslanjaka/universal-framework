<?php

use Filemanager\file;
use JSON\json;

if (isset($meta_config)) {
  $read_meta = file::get($meta_config, true);
}

?>

<div class="card m-4">
  <div class="card-body">
    <h5 class="card-title text-center">Meta Editor</h5>
    <form action="" method="post">
      <input type="hidden" name="meta-config" value="<?= $meta_config ?>">
      <input type="hidden" name="meta-edit" value="<?= random_int(1, 20) ?>">
      <?php foreach ($read_meta as $kmeta => $vmeta) {
        if (in_array($kmeta, ['published', 'modified'])) {
          $vmeta = date("Y-m-d\TH:i:s", strtotime($vmeta));
          echo "<div class='form-group mb-2'><label>$kmeta</label><input class='form-control' name='$kmeta' value='$vmeta' type='datetime-local' step='1'></input></div>";
        } else if (in_array($kmeta, ['desc'])) {
          if (empty($vmeta)) $vmeta = "Description of " . $read_meta['title'];
          echo "<div class='form-group mb-2'><label>$kmeta</label><textarea class='form-control' name='$kmeta'>$vmeta</textarea></div>";
        } else {
          echo "<div class='form-group mb-2'><label>$kmeta</label><input class='form-control' name='$kmeta' value='$vmeta'></input></div>";
        }
      } ?>
      <div class="form-group mb-2">
        <button type="submit" class="btn btn-primary">Save meta</button>
      </div>
    </form>
  </div>
</div>