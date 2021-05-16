<body class="grey lighten-3">
<?php echo include __DIR__ . '/menu.php'; ?>
<!--Main layout-->
<main class="pt-5 mx-lg-5">
    <div class="container-fluid mt-5">
        <?php
        if (isset($content) && file_exists($content)) {
            include $content;
        } else {
            echo '404';
        }
        ?>
    </div>
</main>
<!--Main layout-->

<?php include __DIR__ . '/footer.php'; ?>

<!-- SCRIPTS -->
<!-- JQuery -->
<script type="text/javascript" src="<?php echo get_urlpath(__DIR__ . '/core/js/jquery-3.4.1.min.js'); ?>"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="<?php echo get_urlpath(__DIR__ . '/core/js/popper.min.js'); ?>"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="<?php echo get_urlpath(__DIR__ . '/core/js/bootstrap.min.js'); ?>"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="<?php echo get_urlpath(__DIR__ . '/core/js/mdb.min.js'); ?>"></script>
<div class="hiddendiv common"></div>
<?php include __DIR__ . '/script.php'; ?>

</body>