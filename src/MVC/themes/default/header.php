<!DOCTYPE html>
<html lang="en" manifest="" environtment="<?php echo ENVIRONMENT; ?>" cache="<?php echo CONFIG['cache']['key']; ?>">

<head>
    <?php
    include __DIR__ . '/meta.php';
    ?>
    <!--link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" -->
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/assets/css/all.min.css">
    <link href="<?php echo path2url(__DIR__ . '/style.css'); ?>" rel="stylesheet">
    <!-- Bootstrap core CSS -->
    <link href="/assets/mdb-dashboard/css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="/assets/mdb-dashboard/css/mdb.min.css" rel="stylesheet">
    <!-- Your custom styles (optional) -->
    <link rel="stylesheet" href="/assets/css/bootstrap-utility.css?v=<?php echo CONFIG['cache']['key']; ?>">
</head>