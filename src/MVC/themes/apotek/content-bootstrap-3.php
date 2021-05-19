<?php
$element = new HTML\element();
?>
<!doctype html>
<html lang="en">

<head>
    <?php include __DIR__ . '/meta.php'; ?>
    <!-- Icons for this template -->
    <!--<link rel="icon" href="<?php echo path2url(__DIR__ . '/favicon.ico'); ?>">-->
    <link href="<?php echo path2url(__DIR__ . '/fontawesome-5/css/all.css'); ?>" rel="stylesheet" type="text/css">
    <!-- Stylesheet -->
    <!-- build:css -->
    <link href="<?php echo path2url(__DIR__ . '/dist/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <!-- endbuild -->
    <style>
        /*css*/
    </style>
</head>

<body>

<!-- Static navbar -->
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li class="dropdown-header">Nav header</li>
                        <li><a href="#">Separated link</a></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="active"><a href="./">Default <span class="sr-only">(current)</span></a></li>
                <li><a href="../navbar-static-top/">Static top</a></li>
                <li><a href="../navbar-fixed-top/">Fixed top</a></li>
            </ul>
        </div>
        <!--/.nav-collapse -->
    </div>
    <!--/.container-fluid -->
</nav>

<main role="main" class="container">
    <?php
    if (isset($content) && file_exists($content)) {
      include $content;
    } else {
      echo '404';
    }
    ?>
</main>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="<?php echo path2url(__DIR__ . '/node_modules/jquery/dist/jquery.min.js'); ?>"></script>
<script src="<?php echo path2url(__DIR__ . '/dist/js/bootstrap.min.js'); ?>"></script>
<script src="https://getbootstrap.com/docs/3.4/assets/js/ie10-viewport-bug-workaround.js"></script>
<?php
include __DIR__ . '/script.php';
?>
</body>

</html>