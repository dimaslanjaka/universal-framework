<div class="row">
  <div class="col-md-12">
    <?php
    if (isAdmin() || isLocalhost()) {
      $ids = [];
      foreach ($_SESSION as $key => $value) {
        echo '<hr class="hr-text" data-content="' . $key . '">';
        if (is_string($value)) {
          echo $value;
        } else {
          $ID = uniqid('UUID_');
          $ids[$ID] = $key;
          echo '<pre id="' . $ID . '" style="max-height:500px;max-width:100vh;overflow:auto">';
          var_export($value);
          echo '</pre>';
        }
      }
    ?>
      <div class="p-0 m-0" style="width:20em;position:fixed;bottom:20px;right:0px;z-index:3000">
        <select name="" id="scrollTo" class="form-control">
          <option value="">Scroll to</option>
          <?php
          foreach ($ids as $id => $val) {
            echo "<option value='$id'>$val</option>";
          }
          ?>
        </select>
      </div>
    <?php
    }
    ?>
  </div>
</div>