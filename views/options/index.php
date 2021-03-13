<div class="card text-center">
  <div class="card-header">
    Featured
    <div class="float-right">
      <i class="fa fa-bell" aria-hidden="true"></i>
      <div class="dropdown d-inline-block">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    </div>
  </div>
  <div class="card-block">
    <h4 class="card-title">Database Controller</h4>
    <p class="card-text">
      <?php

      $files = glob(__DIR__ . '/*.{sql}', GLOB_BRACE);
      ?>
      <select name="fdb" id="" class="form-control">
        <option value="">Select file backup</option>
        <?php
        foreach ($files as $file) {
          echo '<option value="' . CryptoE('db', $file) . '">File backup ' . str_replace('db-', '', basename($file, '.sql')) . '</option>';
        }
        ?>
      </select>
    </p>

    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<?php

$all_options = wp_load_alloptions();
precom($all_options);
