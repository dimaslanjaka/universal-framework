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