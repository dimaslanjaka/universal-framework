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
  <PageMap>
    <DataObject type="website"></DataObject>
  </PageMap>
  <!--<base href="https://dimaslanjaka.github.io/Web-Manajemen/">-->
  <?php
  include __DIR__ . '/meta.php';
  ?>

  <script type='text/javascript'>
    /* <![CDATA[ */
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
    /* ]]> */
  </script>
  <script src='https://dimaslanjaka.github.io/Web-Manajemen/js/compiled.core.js'></script>
  <script src='https://dimaslanjaka.github.io/Web-Manajemen/js/compiled.search.js'></script>
  <?php
  include __DIR__ . '/styles.php';
  ?>
</head>

<body class="fixed-sn  mdb-skin-custom" data-spy="scroll" data-target="#scrollspy" data-offset="15">
  <?php if ($fbcomment) { ?>
    <div id='fb-root'></div>
    <script type='text/javascript'>
      ! function(e, n, t) {
        var o, c = e.getElementsByTagName(n)[0];
        e.getElementById(t) || ((o = e.createElement(n)).id = t, o.src =
          "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0", c.parentNode.insertBefore(o, c))
      }(document, "script", "facebook-jssdk");
    </script>
  <?php }
  \MVC\helper::include_asset(__DIR__ . '/../assets/partial/loading.php'); ?>

  <header>
    <!-- Sidebar navigation -->
    <div id="slide-out" class="side-nav sn-bg-4 mdb-sidenav fixed">
      <ul class="custom-scrollbar list-unstyled" style="max-height:100vh; padding-bottom:90px">
        <!-- Logo -->
        <li class="logo-sn d-block waves-effect">
          <div class="text-center">
            <a class="pl-0" href="/"><img id="MDB-logo" src="https://z9t4u9f6.stackpathcdn.com/wp-content/uploads/2018/06/logo-mdb-jquery-small.png" alt="MDB Logo"></a>
          </div>
        </li>
        <!--/. Logo -->
        <!--Search Form-->
        <li>
          <form class="search-form" onkeypress="return event.keyCode != 13;" role="search" method="GET" autocomplete="off">
            <div class="form-group md-form mt-0 d-block waves-light">
              <input type="text" class="form-control pb-1 pt-2 mb-0" name="mdw_serach" placeholder="Search" id="mdb_main_search">
              <label for="mdb_main_search" class="sr-only">Search</label>
            </div>
            <div class="dropdown-wrapper"></div>
          </form>
        </li>
        <!--/.Search Form-->
        <!-- Side navigation links -->
        <li>
          <ul id="side-menu" class="collapsible collapsible-accordion">
            <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-product  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="https://webmanajemen.com"><i class="far fa-gem"></i>WMI</a></li>
            <li id="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="https://dimaslanjaka.000webhostapp.com/"><i class="fas fa-gem"></i> AGC</a></li>
            <li id="menu-item" data-label="Android" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children  menu-item">
              <a class="collapsible-header waves-effect arrow-r active"><i class="fab fa-android"></i>Android<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body" style="display: block;">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home  menu-item">
                    <a class="collapsible-header waves-effect" id="link-menu-item" href="https://mdbootstrap.com/">Home
                      page</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="Games" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fab fa-playstation"></i>Games<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#layout/overview/">Layout
                      overview</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="Tips & Tricks" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fas fa-bookmark"></i>Tips<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item">
                    <a class="collapsible-header waves-effect" id="link-menu-item" href="#utilities/borders/">Borders</a>
                  </li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="PHP" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fab fa-php"></i>PHP<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#content/code/">Code</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="CSS" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fab fa-css3"></i>CSS<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#css/demo/">Demo</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="Musics" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fas fa-music"></i>Musics<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#components/demo/">Demo</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="JS" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fas fa-code"></i>JavaScript<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#javascript/demo/">Demo</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="HTML" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fab fa-html5"></i> HTML<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#navigation/compositions/">Compositions</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="Proxy" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fas fa-user-secret"></i> Proxy<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#forms/basic/">Basic
                      examples</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="Wordpress" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fab fa-wordpress"></i> Wordpress<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#tables/basic/">Basic
                      examples</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="Blogger" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fab fa-blogger"></i>Blogger<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#modals/basic/">Basic
                      examples</a></li>
                </ul>
              </div>
            </li>
            <li id="menu-item" data-label="Script" data-type="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item"><a class="collapsible-header waves-effect arrow-r "><i class="fas fa-code"></i>Script<i class="fa fa-angle-down rotate-icon"></i></a>
              <div class="collapsible-body">
                <ul class="sub-menu">
                  <li id="menu-item" class="menu-item menu-item-type-custom menu-item-object-custom  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" href="#">Support</a></li>
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
        <a href="#" data-activates="slide-out" class="button-collapse"><i class="fas fa-bars"></i><span class="sr-only" aria-hidden="true">Toggle side navigation</span></a>
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
          <a href="//api.whatsapp.com/send?phone=+6285655667573&text=Hello&source=github&data=github" class="nav-link waves-effect" rel="nofollow noopener">
            <i class="fas fa-question-circle"></i><span class="d-none d-xl-inline-block ml-1">Support</span>
          </a>
        </li>

        <!-- Tools -->
        <li id="navbar-static-tools" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbar-tools" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-wrench"></i><span class="d-none d-xl-inline-block ml-1">Tools</span></a>
          <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbar-tools">
            <a class="dropdown-item" href="/theme-manager">Theme manager</a>
          </div>
        </li>

        <!-- Login / register -->
        <a id="navbar-static-login" alt="Sign Up" class="btn btn-info btn-rounded waves-effect waves-light" href="/signin">LOGIN</a>
      </ul>
    </nav>
    <!-- /.Navbar-->
  </header>
  <?php
  if ($share) {
  ?>
    <div id="share-wrap">
      <style>
        .switch-version {
          z-index: 1000;
        }

        .switch-off {
          display: none;
        }

        .switch-title {
          font-size: 11px;
        }

        .switch-web {
          border-top: 1px solid #33b5e5;
          border-left: 1px solid #33b5e5;
          color: #6b6e72;
          border-top-left-radius: 4px;
          transition: background-color 0.3s;
        }

        .switch-mobile {
          border-bottom: 1px solid #FF8800;
          border-left: 1px solid #FF8800;
          color: #6b6e72;
          border-bottom-left-radius: 4px;
          transition: background-color 0.3s;
        }

        .switch-web.active,
        .switch-web:not(.active):hover {
          color: white;
          background-color: #33b5e5;
        }

        .switch-mobile.active,
        .switch-mobile:not(.active):hover {
          color: white;
          background-color: #FF8800;
        }

        .switch-web i,
        .switch-mobile i {
          position: relative;
          top: 4px;
        }

        .switch-web span,
        .switch-mobile span {
          width: 100%;
          position: relative;
          top: -4px;
        }

        .switch-web-products {
          border-left: 1px solid #33b5e5;
        }

        .switch-mobile-products {
          border-left: 1px solid #FF8800;
        }

        .switch-version a:last-child>.switch-to {
          -webkit-border-bottom-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        .switch-version a:first-child>.switch-to {
          -webkit-border-top-left-radius: 0;
          border-top-left-radius: 0;
        }

        /*
      .switch-to-mobile.mdb-vue-mobile {
        background-image: url('img/logo/mdb-angular.png');
        background-position: 0 -84px;
      }

      .switch-to-mobile.mdb-angular-mobile {
        background-image: url('img/logo/mdb-angular.png');
        background-position: 0 0;
      }

      .switch-to-mobile.mdb-react-mobile {
        background-image: url('img/logo/mdb-angular.png');
        background-position: 0 -123px;
      }
      */
        .wow {
          visibility: hidden;
        }
      </style>
      <div class="switch-version d-none d-md-block">
        <div class="switch-web active">
          <a class="d-block text-center">
            <i class="fas fa-share"></i>
            <span class="switch-title">share</span>
          </a>
        </div>
        <div class="switch-web-products ">
          <a href="#" id="tw-share">
            <center><i class="fab fa-twitter"></i></center>
          </a>
          <a href="/docs/angular/" id="fb-share">
            <center><i class="fab fa-facebook-f"></i></center>
          </a>
          <a href="/docs/react/" id="pin-share">
            <center><i class="fab fa-pinterest"></i></center>
          </a>
          <a href="/docs/vue/mobile/" id="mail-share">
            <center><i class="fad fa-envelope"></i></center>
          </a>
        </div>
        <div class="switch-mobile-products switch-off">
          <a href="/docs/angular/mobile/" id="tu-share">
            <center><i class="fab fa-tumblr"></i></center>
          </a>
          <a href="/docs/react/mobile/" id="lin-share">
            <center><i class="fab fa-linkedin"></i></center>
          </a>
          <a href="/docs/vue/mobile/" id="st-share">
            <center><i class="fab fa-stumbleupon-circle"></i></center>
          </a>
          <a href="/docs/vue/mobile/" id="more-share">
            <center><i class="far fa-share-alt"></i></center>
          </a>
        </div>
        <div class="switch-mobile ">
          <a class="d-block text-center">
            <i class="far fa-retweet"></i>
            <span class="switch-title">share</span>
          </a>
        </div>
      </div>
      <script>
        var share = document.getElementById('tw-share');
        share.setAttribute('href', 'https://twitter.com/share?url=' + location.href + '&text=' + document.title +
          '&via=' + location.host);
        share.setAttribute('target', '_blank');
        var share = document.getElementById('fb-share');
        share.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + location.href + '&text=' + document
          .title + '&via=' + location.host);
        share.setAttribute('target', '_blank');
        var share = document.getElementById('tu-share');
        share.setAttribute('href', 'https://www.tumblr.com/share/link?url=' + location.href + '&text=' + document.title +
          '&via=' + location.host);
        share.setAttribute('target', '_blank');
        var share = document.getElementById('lin-share');
        share.setAttribute('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + location.href + '&text=' +
          document.title + '&via=' + location.host);
        share.setAttribute('target', '_blank');
        var share = document.getElementById('pin-share');
        share.setAttribute('href', 'https://www.pinterest.com/pin/create/button/?url=' + location.href + '&text=' +
          document.title + '&via=' + location.host);
        share.setAttribute('target', '_blank');
        var share = document.getElementById('st-share');
        share.setAttribute('href', 'http://www.stumbleupon.com/submit?url=' + location.href + '&text=' + document.title +
          '&via=' + location.host);
        share.setAttribute('target', '_blank');
        var share = document.getElementById('more-share');
        share.setAttribute('href', 'https://www.addtoany.com/share_save?linkurl=' + location.href + '&text=' + document
          .title + '&via=' + location.host);
        share.setAttribute('target', '_blank');
        var share = document.getElementById('mail-share');
        share.setAttribute('href', 'mailto:?subject=Share&body=' + location.href + ' ' + document.title + ' from ' +
          location.host);
        share.setAttribute('target', '_blank');
      </script>

    </div>
  <?php
  }
  ?>
  <!-- Intro -->
  <div class="card card-intro blue-gradient">
    <div class="card-body white-text rgba-black-light text-center">
      <!--Grid row-->
      <div class="row d-flex justify-content-center">
        <!--Grid column-->
        <div class="col-md-6 wow fadeIn">
          <h1 class="font-weight-bold mb-3 h2"><?= $title; ?>
          </h1>
          <h4 class="mb-2 h5">
            <?= $desc; ?>
          </h4>
        </div>
        <!--Grid column-->
      </div>
      <!--Grid row-->
    </div>
  </div>

  <!-- Start your project here-->
  <main class="pt-4" id="mlbb">
    <div class="ads d-none">
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-" data-ad-slot="" data-ad-format="link" data-full-width-responsive="true"></ins>
    </div>
    <?php if (file_exists($content)) {
      include $content;
    } ?>
    <div class="ads d-none">
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-" data-ad-slot="" data-ad-format="auto" data-full-width-responsive="true"></ins>
    </div>
    <?php if ($fbcomment) { ?>
      <div class="container">
        <div class="fb-comments" data-href="<?= $canonical; ?>" data-numposts="10" data-width="100%" data-colorscheme="light" data-order-by="reverse_time"></div>
      </div>
    <?php } ?>
  </main>
  <!-- End your project here-->

  <!--Footer-->
  <footer id="footer" class="page-footer unique-color-dark mt-4">
    <div class="info-color-dark text-center py-4">
      <a id="footer-link-newsletter" href="//github.com/dimaslanjaka" class="border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
        <i class="fab fa-github white-text"> </i>
      </a>
      <a id="footer-link-newsletter" href="//fb.me/dimaslanjaka1" class="border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
        <i class="fab fa-facebook-f white-text"> </i>
      </a>
      <a id="footer-link-newsletter" href="https://www.youtube.com/channel/UCGNaoefvJRfd15fo-LQ0zvg" class="border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
        <i class="fab fa-youtube white-text"> </i>
      </a>
      <a id="footer-link-newsletter" href="#" class="border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
        <i class="fab fa-twitter white-text"> </i>
      </a>
    </div>
    <!--Footer Links-->
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
    <!--/.Footer Links-->
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

  <!-- Modal -->
  <div class="modal fade" id="modalRes" tabindex="-1" role="dialog" aria-labelledby="modalResTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-title">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary d-none">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <?php
  include __DIR__ . '/scripts.php';
  ?>
</body>

</html>