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
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php
    include __DIR__ . '/meta.php';
    ?>
    <link rel='stylesheet' href='/assets/css/compiled.block.css' type='text/css' media='all'/>
    <link rel='stylesheet' href='/assets/css/compiled.min.css' type='text/css' media='all'/>
</head>

<body class="fixed-sn  mdb-skin-custom" data-spy="scroll" data-target="#scrollspy" data-offset="15" translate="no">
<header>
    <!-- Sidebar navigation -->
    <div id="slide-out" class="side-nav sn-bg-4 mdb-sidenav fixed">
        <ul class="custom-scrollbar list-unstyled" style="max-height:100vh; padding-bottom:90px">
            <!-- Logo -->
            <li class="logo-sn d-block waves-effect">
                <img id="MDB-logo" src="/assets/img/logo.png" alt="WMI Logo" width="100%" height="100%">
            </li>
            <!--/. Logo -->
            <!--Search Form-->
            <li>
                <form class="search-form" onkeypress="return event.keyCode != 13;" role="search" method="GET"
                      autocomplete="off">
                    <div class="form-group md-form mt-0 d-block waves-light">
                        <input type="text" class="form-control pb-1 pt-2 mb-0" name="mdw_serach" placeholder="Search"
                               id="mdb_main_search">
                        <label for="mdb_main_search" class="sr-only">Search</label>
                    </div>
                    <div class="dropdown-wrapper"></div>
                </form>
            </li>
            <!--/.Search Form-->
            <!-- Side navigation links -->
            <li>
                <ul id="side-menu" class="collapsible collapsible-accordion">
                    <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-product  menu-item"><a
                                class="collapsible-header waves-effect" id="link-menu-item"
                                href="https://webmanajemen.com"><i class="far fa-gem"></i>WMI</a></li>
                    <li id="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom  menu-item"><a
                                class="collapsible-header waves-effect" id="link-menu-item"
                                href="https://dimaslanjaka.000webhostapp.com/"><i class="fas fa-gem"></i> AGC</a></li>
                    <li id="menu-item" data-type="menu-item"
                        class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children  menu-item">
                        <a class="collapsible-header waves-effect arrow-r active"><i class="fad fa-sim-card"></i>PANEL<i
                                    class="fa fa-angle-down rotate-icon"></i></a>
                        <div class="collapsible-body" style="display: block;">
                            <ul class="sub-menu">
                                <li id="menu-item"
                                    class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home  menu-item">
                                    <a class="collapsible-header waves-effect" id="link-menu-item" href="/">
                                        Home
                                    </a>
                                </li>
                                <li id="menu-item"
                                    class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home  menu-item">
                                    <a class="collapsible-header waves-effect" id="link-menu-item" href="/telkomsel/">
                                        Telkomsel
                                    </a>
                                </li>
                                <li id="menu-item"
                                    class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home  menu-item">
                                    <a class="collapsible-header waves-effect" id="link-menu-item" href="/im3/">
                                        IM3
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <!-- /. Side navigation links -->
        </ul>
        <div class="sidenav-bg mask-strong"></div>
    </div>
    <!--/. Sidebar navigation -->
    <!--/.SideNav-->


    <!-- Navbar-->
    <nav class="navbar fixed-top navbar-expand-md navbar-light white double-nav scrolling-navbar">
        <!-- SideNav slide-out button -->
        <div class="float-left">
            <a href="#" data-activates="slide-out" class="button-collapse"><i class="fas fa-bars"></i><span
                        class="sr-only" aria-hidden="true">Toggle side navigation</span></a>
        </div>
        <!-- Navbar links-->
        <div class="mr-auto pl-2 d-none">
        <span class="d-none d-md-inline-block">

          <!-- Dynamic content wrapper -->
          <span id="dynamicContentWrapper-mainNavbar" class="dynamic-content d-none d-lg-inline-block"></span>

            <!--Angular Mobile-->
          <a id="navbar-category-gettingstarted-jquery" class="btn btn-info btn-sm my-0" href="#" role="button">
            <span class="d-none d-lg-inline-block mr-1">Getting started</span>
            <i class="fas fa-download"></i>
          </a>
            <!--Temp Pro button while BF is not working-->
          <a class="btn btn-danger btn-sm my-0" href="#" role="button">
            <span class="d-none d-lg-inline-block mr-1">Go Pro</span>
            <i class="fas fa-gem"></i>
          </a>
            <!--/Temp Pro button while BF is not working-->
          <a id="navbar-category-tutorial-jquery" class="btn btn-info btn-sm my-0" href="#" role="button">
            <span class="d-none d-lg-inline-block mr-1">Tutorial</span>
            <i class="fas fa-graduation-cap"></i>
          </a>
          <span id="dynamicContentWrapper-mainNavbar3" class="dynamic-content"></span>
          <a id="navbar-category-bundle-jquery" class="btn btn-unique btn-sm my-0" href="#" role="button">
            <span class="badge red mr-2">Super</span>
            <span class="d-none d-xl-inline-block mr-1">Bundle</span>
            <i class="fas fa-gift"></i>
          </a>
        </span>
        </div>

        <!--Navigation icons-->
        <ul class="nav navbar-nav nav-flex-icons ml-auto">


            <li class="nav-item d-none d-xl-inline-block" id="navbar-static-contact" alt="Contact us">
                <a href="//webmanajemen.com/p/contact.html" class="nav-link waves-effect">
                    <i class="fas fa-envelope"></i><span class="sr-only">Contact us</span>
                </a>
            </li>

            <li class="nav-item d-none d-xl-inline-block" alt="Support" id="navbar-static-support">
                <a href="//api.whatsapp.com/send?phone=+6285655667573&text=Hello&source=github&data=github"
                   class="nav-link waves-effect" rel="nofollow noopener">
                    <i class="fas fa-question-circle"></i><span class="d-none d-xl-inline-block ml-1">Support</span>
                </a>
            </li>

            <!-- Tools -->
            <li id="navbar-static-tools" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbar-tools" data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false">
                    <i class="fas fa-wrench"></i><span class="d-none d-xl-inline-block ml-1">Tools</span></a>
                <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbar-tools">
                    <a class="dropdown-item" href="/"><i class="fab fa-blogger"></i></a>
                </div>
            </li>

            <!-- Login / register -->
            <a id="navbar-static-login" alt="Sign Up" class="btn btn-info btn-rounded btn-sm waves-effect waves-light"
               href="/signin">LOGIN</a>
        </ul>
    </nav>
    <!-- /.Navbar-->
</header>

<?php
if (isset($share) && $share) {
      include __DIR__ . '/share.php';
    }
?>

<!-- Intro -->
<div class="card card-intro blue-gradient">

    <div class="card-body white-text rgba-black-light text-center">

        <!--Grid row-->
        <div class="row d-flex justify-content-center">

            <!--Grid column-->
            <div class="col-md-6 wow fadeIn">

                <h1 class="font-weight-bold mb-3 h2"><?php echo $title; ?>
                </h1>

                <h4 class="mb-2 h5">
                    <?php echo $desc; ?>
                </h4>

            </div>
            <!--Grid column-->

        </div>
        <!--Grid row-->

    </div>

</div>

</div>
<!--/.Panel-->
</div>


<!-- Intro -->

<!--Main layout-->

<main class="pt-1">
    <div class="container">
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

<!--Footer-->
<footer id="footer" class="page-footer unique-color-dark mt-4">
    <div class="info-color-dark text-center py-4">
        <a id="footer-link-newsletter" href="//github.com/dimaslanjaka"
           class="border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
            <i class="fab fa-github white-text"> </i>
        </a>
        <a id="footer-link-newsletter" href="//fb.me/dimaslanjaka1"
           class="border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
            <i class="fab fa-facebook-f white-text"> </i>
        </a>
        <a id="footer-link-newsletter" href="https://www.youtube.com/channel/UCGNaoefvJRfd15fo-LQ0zvg"
           class="border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
            <i class="fab fa-youtube white-text"> </i>
        </a>
        <a id="footer-link-newsletter" href="#" class="border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
            <i class="fab fa-twitter white-text"> </i>
        </a>
    </div>
    <?php
    /*<!--Footer Links-->
  <div class="container text-center text-md-left mt-5">
  <div class="row mt-3">
  <!--First column-->
  <div class="col mb-4">
    <h6 class="text-uppercase font-weight-bold">
    <strong>Useful links</strong>
    </h6>
    <hr class="info-color mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
    <p>
    <a id="footer-link-license" href="//webmanajemen.com/p/about.html">About</a>
    </p>
    <p>
    <a id="footer-link-changelog" href="//webmanajemen.com/p/terms.html">Terms</a>
    </p>
    <p>
    <a id="footer-link-policy" href="//webmanajemen.com/p/privacy.html">Privacy Policy</a>
    </p>
  </div>
  <!--/.First column-->
  <!--Third column-->
  <div class="col mb-4">
    <h6 class="text-uppercase font-weight-bold">
    <strong>Free tutorials</strong>
    </h6>
    <hr class="info-color mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
    <p>
    <a id="footer-link-tutBootstrap" href="https://www.webmanajemen.com/search/label/HTML">HTML</a>
    </p>
    <p>
    <a id="footer-link-tutBootstrap" href="https://www.webmanajemen.com/search/label/CSS">CSS</a>
    </p>
    <p>
    <a id="footer-link-tutAngular" href="https://www.webmanajemen.com/search/label/PHP">PHP</a>
    </p>
    <p>
    <a id="footer-link-tutAngular" href="https://www.webmanajemen.com/search/label/JS">JS</a>
    </p>
  </div>
  <!--/.Third column-->
  <!--Fourth column-->
  <div class="col">
    <h6 class="text-uppercase font-weight-bold">
    <strong>Company</strong>
    </h6>
    <hr class="info-color mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
    <!-- <p>
    <i class="fas fa-building mr-3"></i> Our story</p> -->
    <p>
    <a id="footer-link-team" href="//github.com/dimaslanjaka">
    <i class="fas fa-users mr-3"></i> About Me</a>
    </p>
  </div>
  <!--/.Fourth column-->
  </div>
  </div>
  <!--/.Footer Links-->*/
    ?>
    <!-- Copyright-->
    <div class="footer-copyright py-3 text-center">
        &copy; 2020 Copyright:
        <a href="https://Web-Manajemen.blogspot.com">
            <strong> webmanajemen.com</strong>
        </a>
    </div>
    <!--/.Copyright -->
</footer>
<!--/.Footer-->

<style>
    main input[type=email]:focus,
    main input[type=password]:focus,
    main input[type=text]:focus,
    main input[type=url]:focus,
    main textarea:focus {
        border: 0;
    }

    .embed-responsive-16by9-fix-contact-form::before {
        height: 450px;
    }

    @media (min-width: 580px) {

        .modal-contact-form-fix,
        .modal-contact-form-fix * {

            box-sizing: content-box !important;
        }

    }
</style>


<div id="dom-target-fb" style="display: none;">
</div>
<div id="dom-target-tw" style="display: none;">
</div>
<div id="dom-target-gp" style="display: none;">
</div>

<script>
    var mdw_search_object = {
        "search_tree": {
            "290": {
                "title": "bootstrap panels - examples & tutorial. basic & advanced usage",
                "description": "bootstrap panels are bordered boxes where you can place texts, lists, tables and other content. panels are similar to cards, but they don't include media.",
                "link": "https:\/\/mdbootstrap.com?page_id=290",
                "wptitle": "Panels"
            },
            "102429": {
                "title": "material design for bootstrap installation guide",
                "description": "download zip package to get the compiled css and javascript, source code or install mdbootstrap using npm. you can also use cdn for quick start.",
                "link": "https:\/\/mdbootstrap.com?page_id=102429",
                "wptitle": "Installation Guide"
            }
        }
    };
</script>
<script src='/assets/js/compiled.core.js'></script>
<script src='/assets/js/compiled.search.js'></script>
<script src='/assets/js/compiled.gzip.js'></script>
<script src='/assets/js/compiled.js'></script>
<script src='/assets/js/compiled.footer.js'></script>
<script src='/assets/js/jquery.validate.js'></script>

<?php
$element = new HTML\element();
// datatables is defined
if (defined('datatables')) {
  echo $element->css([
    '/assets/mdb/css/addons/datatables.min.css',
  ]);
  echo $element->js([
    '/assets/mdb/js/addons/datatables.min.js',
    '/assets/mdb/js/addons/datatables-select.min.js',
  ]);
}
//if select2 defined
if (defined('select2')) {
  echo $element->css(['/node_modules/select/dist/css/select2.min.css']);
  echo $element->js(['/node_modules/select/dist/js/select2.min.js']);
  $element->link([
    [__DIR__ . '/assets/style.select2.min.css', __DIR__ . '/assets/style.select2.css'],
  ], true, true, 'stylesheet');
  $element->script([
    [__DIR__ . '/assets/select2.parser.min.js', __DIR__ . '/assets/select2.parser.js'],
  ], true, true);
}
//if materialize defined
if (defined('materialize')) {
  echo $element->css([
    //'/node_modules/materialize-css/dist/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
  ]);
  //echo $element->js(['/node_modules/materialize-css/dist/js/materialize.min.js']);
}
// default javascript
echo $element->js([
  '/node_modules/sweetalert/dist/sweetalert.min.js',
  '/node_modules/crypto-js/crypto-js.js',
  '/node_modules/toastr/build/toastr.min.js',
]);
//default css
echo $element->css(['/node_modules/toastr/build/toastr.min.css']);
// include content javascript
if (isset($content) && file_exists($content)) {
  $contentCSS = preg_replace('/\.php$/s', '.css', $content);
  $contentMinCSS = preg_replace('/\.php$/s', '.min.css', $content);
  echo '<style>';
  \MVC\helper::include_asset($contentMinCSS, $contentCSS);
  echo '</style>';
}
// defined custom script
if (defined('SCRIPTSRC')) {
  $element->script(SCRIPTSRC, true, true);
} else {
  define('SCRIPTSRC', []);
}

// defined custom script
if (defined('STYLESRC')) {
  $element->link(STYLESRC, true, true);
} else {
  define('STYLESRC', []);
}

if (defined('STYLE')) {
  echo '<style>';
  foreach (STYLE as $style) {
    if (is_string($style)) {
      \MVC\helper::include_asset($style);
    }
  }
  echo '</style>';
} else {
  define('STYLE', []);
}
?>

<script>
    <?php
    \MVC\helper::include_asset(
        __DIR__ . '/../assets/js/utility.min.js',
        __DIR__ . '/../assets/js/utility.js'
    );
    \MVC\helper::include_asset(
        __DIR__ . '/../assets/js/saver.min.js',
        __DIR__ . '/../assets/js/saver.js'
    );
    \MVC\helper::include_asset(
        __DIR__ . '/../assets/js/custom-ajax.min.js',
        __DIR__ . '/../assets/js/custom-ajax.js'
    );
    if (isset($content) && file_exists($content)) {
      \MVC\helper::include_asset(__DIR__ . '/js/core.min.js', __DIR__ . '/js/core.js');
      if (isset($var['script']) && $var['script'] && file_exists($var['script'])) {
        include $var['script'];
      }
      if (isset($var['js']) && $var['js'] && file_exists($var['js'])) {
        include $var['js'];
      }
      $contentMinJS = preg_replace('/\.php$/s', '.min.js', $content);
      $contentJS = preg_replace('/\.php$/s', '.js', $content);
      \MVC\helper::include_asset($contentMinJS, $contentJS);
    }
    if (defined('uidjs')) {
      echo '/*UID JS included*/';
      \MVC\uid::include_uid_js();
    }
    if (defined('SCRIPT')) {
      foreach (SCRIPT as $primary => $secondary) {
        \MVC\helper::include_asset($primary, $secondary);
      }
    } else {
      define('SCRIPT', '');
    }
    \MVC\helper::include_asset(
        __DIR__ . '/js/footer.min.js',
        __DIR__ . '/js/footer.js'
    );
    ?>
</script>
</body>

</html>