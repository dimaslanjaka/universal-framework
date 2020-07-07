<?php

use DB\manager;

$db = new manager();

if (user()->is_admin()) {
?>
  <textarea name="" id="" cols="30" rows="10" class="form-control">
<?= $db->backup_tables(CONFIG['database']['host'], CONFIG['database']['user'], CONFIG['database']['pass'], CONFIG['database']['dbname'], CONFIG['database']['host']); ?>
</textarea>
<?php
}

?>