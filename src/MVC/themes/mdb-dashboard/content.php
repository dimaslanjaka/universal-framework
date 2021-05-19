<?php

$var = $_SESSION['var'];
if (!isset($var['title']) && !isset($var['content'])) {
  echo 'title/content required';

  return;
}

//$content = $var['content'];

$canonical = isset($var['canonical']) ? $var['canonical'] : (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . strtok($_SERVER['REQUEST_URI'], '?');
if (!isset($desc)) {
  $desc = isset($var['desc']) ? $var['desc'] : '';
}
if (!isset($fbcomment)) {
  $fbcomment = isset($var['fbcomment']) ? true : false;
}
if (!isset($title)) {
  $title = $var['title'];
}
if (!isset($share)) {
  $share = isset($var['share']) ? true : false;
}
if (!defined('ENVIRONMENT')) {
  e([
    'error' => true,
    'message' => 'framework environtment doesnt exists',
    'current' => __FILE__,
  ]);
}
?>
<!DOCTYPE html>
<html lang="en" class="full-height" manifest="" environtment="<?php echo ENVIRONMENT; ?>"
      cache="<?php echo CONFIG['cache']['key']; ?>">

<head>
    <?php
    include __DIR__ . '/meta.php';
    ?>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/assets/css/all.min.css">
    <!-- Bootstrap core CSS -->
    <link href="/assets/mdb-dashboard/css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="/assets/mdb-dashboard/css/mdb.min.css" rel="stylesheet">
    <!-- Your custom styles (optional) -->
    <link rel="stylesheet" href="<?php echo \MVC\helper::get_url_path(__DIR__ . '/css/style.min.css', true); ?>">
    <link rel="stylesheet" href="/assets/css/bootstrap-utility.css?v=<?php echo CONFIG['cache']['key']; ?>">
</head>

<body class="fixed-sn mdb-skin">
<header>
    <?php
    include __DIR__ . '/menu.php';
    ?>
</header>
<!-- Main Navigation -->

<main class="mb-3 mt-0 pt-3" style="min-height: 500px;">
    <div class="container-fluid mt-5">
        <?php
        if (isset($content) && file_exists($content)) {
          if (isset($_SESSION['var']['content']) && isset($_SESSION['var']['meta_config'])) {
            if ($_SESSION['var']['content'] != $content && !file_exists($_SESSION['var']['content'])) {
              $_SESSION['var']['content'] = $content;
              //file_put_contents($_SESSION['var']['meta_config'], json::json($_SESSION['var'], false));
            }
          }
          include $content;
        } else {
          echo '404';
        }
        ?>
    </div>

    <section>
        <?php
        if (is_admin()) {
          include __DIR__ . '/../meta-editor.php';
        }
        ?>
    </section>
</main>

<?php include __DIR__ . '/footer.php'; ?>

<!-- SCRIPTS -->
<!-- JQuery -->
<script type="text/javascript" src="/assets/mdb-dashboard/js/jquery-3.4.1.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="/assets/mdb-dashboard/js/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="/assets/mdb-dashboard/js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="/assets/mdb-dashboard/js/mdb.min.js"></script>

<!-- Custom scripts -->

<?php
include __DIR__ . '/script.php';
?>

</body>

</html>