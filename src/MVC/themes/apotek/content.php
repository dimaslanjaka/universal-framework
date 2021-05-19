<?php
$element = new HTML\element();
?>
<!doctype html>
<html lang="en" manifest="" environtment="<?php echo ENVIRONMENT; ?>" cache="<?php echo CONFIG['cache']['key']; ?>">

<head>
    <?php include __DIR__ . '/meta.php'; ?>
    <link rel="stylesheet" href="/assets/css/all.min.css">
    <link rel="stylesheet" href="/node_modules/animate.css/animate.min.css">
    <!-- Stylesheet -->
    <link href="<?php echo path2url(__DIR__ . '/dist/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <style>
        <?php include __DIR__ . '/custom/custom.min.css'; ?>
    </style>
</head>

<body>

<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <a class="navbar-brand" href="#">APOTEK</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                    Warehouses
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/warehouses">Main</a>
                    <a class="dropdown-item" href="/warehouses/login">Login</a>
                </div>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                   aria-expanded="false">Product</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="/product">Main Products</a>
                    <a class="dropdown-item" href="/product/items">Product Items</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/product/in">Product Incoming</a>
                    <a class="dropdown-item" href="/product/out">Product Outcoming</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/categories">Product Categories</a>
                    <a class="dropdown-item" href="/brand">Product Brands</a>
                </div>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                   aria-expanded="false">Members</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="/producer">Producer</a>
                    <a class="dropdown-item" href="/consumer">Consumer</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/distributor">Distributor</a>
                </div>
            </li>
        </ul>
    </div>
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

<footer class="mt-4 navbar-dark bg-dark">
    <div class="mini-footer">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <center>
                        <a class="" data-toggle="collapse" href="#translatorCollapser">
                            <i class="fas fa-language"></i>
                        </a>
                        <div class="collapse" id="translatorCollapser">
                            <div class="card card-body">
                                <div id="google_translate_element"></div>
                            </div>
                        </div>
                    </center>
                    <div class="copyright-text">
                        <p>© <?php echo date('Y'); ?>
                            <a href="#">Apotek</a>. All rights reserved. Created by
                            <a href="https://web-manajemen.blogspot.com">Dimas Lanjaka</a>
                        </p>
                    </div>

                    <div class="go_top">
                        <span class="icon-arrow-up"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="/node_modules/jquery/dist/jquery.min.js"></script>
<script src="<?php echo path2url(__DIR__ . '/dist/js/bootstrap.bundle.js'); ?>"></script>
<?php
include __DIR__ . '/script.php';
?>
</body>

</html>