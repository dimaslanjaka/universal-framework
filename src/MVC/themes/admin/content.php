<?php

use MVC\helper;
use User\user;

$user = new \User\user(CONFIG['database']['user'], CONFIG['database']['pass'], CONFIG['database']['dbname'], CONFIG['database']['host']);
if (!$user->is_admin()) {
  \MVC\router::safe_redirect('/signin');

  return;
}
//include __DIR__ . '/password_protect.php';
?>
<!DOCTYPE html>
<html>
<title>

  <?= $title; ?></title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<!--<base href="https://www.w3schools.com/w3css/">-->
<style>
  input[type=text],
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type=submit]:hover {
    background-color: #45a049;
  }

  form.loop div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }
</style>

<body>

  <!-- Navbar (sit on top) -->
  <div class="w3-top">
    <div class="w3-bar w3-white w3-wide w3-padding w3-card">
      <a href="#home" class="w3-bar-item w3-button"><b>DOR</b> Projects</a>
      <!-- Float links to the right. Hide them on small screens -->
      <div class="w3-right w3-hide-small">
        <a href="#logout" class="w3-bar-item w3-button">Logout</a>
      </div>
    </div>
  </div>

  <!-- Header -->
  <header class="w3-display-container w3-content w3-wide" style="max-width:1500px;" id="home">
    <img class="w3-image" src="https://apaie2020.org/wp-content/uploads/2019/05/APAIE2020_header_bg_4.png" alt="Architecture" width="1500" height="800">
    <div class="w3-display-middle w3-margin-top w3-center">
      <h1 class="w3-xxlarge w3-text-white"><span class="w3-padding w3-black w3-opacity-min"><b>DOR</b></span> <span class="w3-hide-small w3-text-light-grey">Projects</span></h1>
    </div>
  </header>

  <!-- Page content -->
  <div class="w3-content w3-padding" style="max-width:1564px">
    <?php
    include $content;
    ?>
    <!-- End page content -->
  </div>


  <!-- Footer -->
  <footer class="w3-center w3-black w3-padding-16">
    <p>Powered by <a href="https://webmanajemen.com" title="WMI" target="_blank" class="w3-hover-text-green">webmanajemen</a></p>
  </footer>
  <script src="/node_modules/requirejs/require.js"></script>
  <script>
    <?= helper::include_asset(__DIR__ . '/view.js'); ?>
  </script>
</body>

</html>