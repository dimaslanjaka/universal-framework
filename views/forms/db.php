<?php

if (isset($_SESSION['perusahaan'])) {
  $dbc = new wpdb(DB_USER, DB_PASSWORD, $_SESSION['perusahaan'], DB_HOST);
}
