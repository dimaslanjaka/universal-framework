<div class="az-footer">
  <div class="container">
    <p class='d-flex justify-content-between'>
      <div>
        Copyright &#169; 2014 - <span id='credit' itemscope='itemscope' itemtype='https://data-vocabulary.org/copyrightHolder' title='WMI'><span id='site-year' itemprop='copyrightYear'><?= date('Y') ?></span> &#183; <a itemprop="url" href='<?= WP_PROTOCOL . '://' . WP_HOST ?>/'><span itemprop="name"><?= (get_option('yt-site-title') ? get_option('yt-site-title') : get_bloginfo('name')); ?></span></a></span> All Right Reserved.
      </div>
      <div>
        <small>This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy" rel="nofollow noopener" title="privacy policy">Privacy Policy</a> and
          <a href="https://policies.google.com/terms" rel="nofollow noopener" title="terms policy">Terms of Service</a> apply.
        </small>
      </div>
    </p>
  </div><!-- container -->
</div><!-- az-footer -->



<!--Loading-->
<div id="loadingio-wrapper" class="ld-over-full running">
  <span class="ld"><span class="ld ld-ball ld-bounce"></span>
    <span id="loadingio-text" class="text pt-3">Loading
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </span>
  </span>
</div>
<div class="modal-loading">
  <b class="modal-loading-text">
    Please wait...
  </b>
  <span class="modal-loading-footer">The duration of the process depends on the proxy</span>
</div>
<div class="loading-corner-right" href="#">
  <span class="loading-corner-right-text">

  </span>
  <br>
  <span class="loading-corner-right-footer">

  </span>
</div>
<!--
<script src="/assets/components/jquery/dist/jquery.min.js"></script>
<script src="/assets/components/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/ionicons.js"></script>
<script src="/assets/components/jquery.flot/jquery.flot.js"></script>
<script src="/assets/components/jquery.flot/jquery.flot.categories.js"></script>
<script src="/assets/components/jquery.flot/jquery.flot.resize.js"></script>
<script src="/assets/components/chart.js/dist/Chart.bundle.min.js"></script>
<script src="/assets/components/linkifyjs/dist/linkify.min.js"></script>
<script src="/assets/components/linkifyjs/dist/linkify-jquery.min.js"></script>
<script src="/assets/components/crypto-js/crypto-js.js"></script>
-->
<?php
if (is_dir(ROOT . '/template')) {
  echo '<script src="/template/js/chart.flot.sampledata.js"></script>';
}
jscfg('GAPPID', GOOGLE_CLIENT_KEY, true);
$google = google_client();
?>
<script src="/assets/components/js/require.min.js"></script>

<script id="rendered-js">
  <?php
  $g = $google->user();
  $g2 = $google->fetch_google_user();
  if (is_user_logged_in()) {
    jscfg('is_login', true);
  } else {
    jscfg('is_login', false);
  }
  if (isset($g2->id)) {
    jscfg('USER_ID', $g2->id);
  } else if (is_user_logged_in()) {
    jscfg('USER_ID', get_current_user_id());
  }
  if ($g && isset($g->user_email) && isset($g->user_login)) {
    echo 'var HttpUser = "' . $g->user_login . '";';
    echo 'var HttpPass = "' . $g->user_email . '";';
  }
  jscfg('environtment', $core->environtment);
  $toastr = defined('toastr');
  $codemirror = defined('CodeMirror') || defined('codemirror');
  $smartwizard = defined('smartwizard');
  $summernote = defined('summernote');
  $dragdrop = defined('dragdrop');
  ?>
  require.config({
    packages: [{
        name: 'crypto-js',
        location: '/assets/components/crypto-js',
        main: 'index'
      }, {
        name: 'jquery',
        location: '/assets/components/jquery/dist',
        main: 'jquery.min'
      },
      {
        name: 'codemirror',
        location: "/assets/components/codemirror", // 5.33.0
        main: "main"
      }
    ],
    paths: {
      "jquery.bootstrap": "/assets/components/bootstrap/dist/js/bootstrap.bundle.min",
      "ionicons": "https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/ionicons",
      "slick": "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min",
      "underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min",
      "xor": "https://cdn.statically.io/gh/dimaslanjaka/Web-Manajemen/master/js/xor",
      'linkify': '/assets/components/linkifyjs/dist/linkify.min',
      'linkify-jquery': '/assets/components/linkifyjs/dist/linkify.min',
      'chartjs-bundle': '/assets/components/chart.js/dist/Chart.bundle.min',
      'web-socket': '/views/js/websocket',
      'sweetalert': '/assets/components/sweetalert/dist/sweetalert.min',
      'summernote': '/assets/components/summernote/dist/summernote-bs4.min',
      'smartwizard': '/assets/components/smartwizard/dist/js/jquery.smartWizard.min',
      'GA': '<?= trim(preg_replace('/\.js$/m', '', ganalystic('url'))) ?>',
      'toastr': 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min',
      'jquery-ui': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min',
      'jquery-highlight': 'https://johannburkard.de/resources/Johann/jquery.highlight-5',
      'fetch-inject': '/assets/components/js/fetch-inject',
      'interact': 'https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min'
    },
    shim: {
      'jquery': {
        exports: ['jQuery', '$']
      },
      "jquery-ui": {
        deps: ['jquery']
      },
      "jquery-highlight": {
        deps: ['jquery']
      },
      "jquery.bootstrap": {
        deps: ["jquery"]
      },
      "web-socket": {
        deps: ["jquery"]
      },
      "linkify-jquery": {
        deps: ["jquery"]
      },
      "codemirror": {
        //exports: ['CodeMirror']
        deps: ['jquery']
      },
      "smartwizard": {
        deps: ['jquery']
      },
      "summernote": {
        deps: ["jquery"]
      },
      "toastr": {
        deps: ["jquery"]
      }
    },
    catchError: true
  });
  //var CryptoJS = require("crypto-js");
  require([
    'jquery',
    'underscore',
    'xor',
    'crypto-js',
    'GA',
    'sweetalert',
    'fetch-inject',
    <?php
    if ($codemirror) {
      echo '"codemirror",';
    }
    if ($toastr) {
      echo '"toastr",';
    }
    if ($summernote) {
      echo '"summernote",';
    }
    if ($smartwizard) {
      echo '"smartwizard",';
    }
    if ($dragdrop) {
      echo '"interact",';
    }
    ?> "jquery.bootstrap"
  ], function($, _, XORCipher, CryptoJS, DataLayer, swal, fetchInject, <?= $codemirror ? 'CodeMirror,' : false; ?> <?= $toastr ? 'toastr,' : false; ?> <?= $dragdrop ? 'interact,' : false; ?>) {
    <?php if ($codemirror) {
      /**
       * Include formatter utility CodeMirror
       */
      include ROOT . '/assets/components/codemirror/lib/formatting.js';
    }
    ?>

    function XORe(pass, text) {
      return XORCipher.encode(pass, text);
    }

    function XORd(pass, enc) {
      return XORCipher.decode(pass, enc);
    }

    var nav_ = $("#<?= $subrequest[1]; ?>-nav");
    if (typeof nav_ != 'undefined') {
      if (nav_.length) {
        if (!nav_.hasClass("active")) {
          nav_.addClass("active");
        }
      }
    }
    $(function() {
      'use strict'

      <?php
      short_recaptcha(true);
      ganalystic(true);
      javascript(array_unique($script));
      if ($smartwizard) {
        echo stylesheetjs(ROOT . '/assets/components/smartwizard/dist/css/smart_wizard.css', ROOT . '/assets/components/smartwizard/dist/css/smart_wizard_theme_arrows.css');
      }
      if ($toastr) {
        echo stylesheetjs('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css');
      }
      if ($summernote) {
        echo stylesheetjs(ROOT . '/assets/components/summernote/dist/summernote-bs4.css');
      }
      if ($codemirror) {
        echo stylesheetjs(ROOT . '/assets/components/codemirror/lib/codemirror.css', ROOT . '/assets/components/codemirror/theme/material.css', ROOT . '/assets/components/codemirror/addon/hint/show-hint.css', ROOT . '/assets/components/codemirror/addon/dialog/dialog.css');
      }
      //echo stylesheetjs('https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css');
      ?>
      loadingio(null, null, 'disable');
    });
  }, function(error) {
    console.log(error);
    location.reload(1);
  });
</script>
<?php
//saver

if (isset($_REQUEST['path']) && !preg_match($paths, $_REQUEST['path'])) {
  if (isset($sl)) {
    $_SESSION['sl'] = $sl;
  }
  if (isset($tl)) {
    $_SESSION['tl'] = $tl;
  }
  if (isset($dir)) {
    $_SESSION['dir'] = _folder_($dir, __DIR__, true);
  }
  if (isset($dir) && isset($tl) && isset($sl)) {
    if (!$dir && !$sl && !$tl) {
      ob_clean();
      ob_start();
      die('Dir, Target Language, Source Language Doesnt Set');
    } else {
      $_SESSION['source_lang'] = $sl;
      $_SESSION['target_lang'] = $tl;
      $_SESSION['dir'] = $dir;
    }
  }
  if (isset($sl, $tl)) {
    $js = new AGCJS();
    echo $js->trjs($sl, $tl);
  }
  $path = urldecode($_REQUEST['path']);
  $f = createAGCFile($path);
  //Body builder
  if (isset($_SESSION['body']) && isset($dir)) {
    $b = '';
    $b .= '<div id="A-G-C" date="' . date('d M Y H:i:s') . '">';
    if (false == strpos($_SESSION['body'], "for='title'") && !isset($no_add_title) || false == strpos($_SESSION['body'], 'for="title"') && !isset($no_add_title)) {
      $b .= "<h1 for='title' class='notranslate'>" . isses('title') . '</h1>';
    }
    $b .= $_SESSION['body'];
    $b .= '</div>';
    if (isset($_REQUEST['target_translate'])) {
      $_SESSION['target_translate'] = trim($_REQUEST['target_translate']);
    } else {
      $_SESSION['target_translate'] = "https://wp.webmanajemen.com/receiver/$dir/$f";
    }
  }
  if (isset($b) && isset($f) && isset($dir)) {
?>

    <script>
      var BODY = `<?= urlencode($b); ?>`;
      var FILENAME = `<?= $f; ?>`;
      var DIR = `<?= $dir; ?>`;

      var scr = "http://dimaslanjaka.000webhostapp.com/receiver/receiver.php";

      if (typeof BODY != 'undefined' && typeof DIR != 'undefined' && typeof FILENAME != 'undefined') {
        require(['jquery', 'sweetalert'], function($, swal) {
          function POP(t, ty, c) {
            swal({
              text: t,
              icon: ty,
              buttons: {
                cancel: "Close",
              },
              content: c
            });
          }

          function POPP(t, ty, c) {
            if (!window.swal) {
              LoadScript("https://unpkg.com/sweetalert/dist/sweetalert.min.js", function() {
                POP(t, ty, c)
              });
            } else {
              POP(t, ty, c);
            }
          }
          $.post(scr, {
            dir: DIR,
            content: BODY,
            filename: FILENAME
          }, function(j) {
            if (j.hasOwnProperty('success')) {
              if (j.success !== false) {
                $.post(location.href, {
                  target_translate: j.url
                });
                $.ajax(location.href + '&target_translate=' + j.url);
              } else {
                POPP('unsuccessful', 'error', {
                  element: 'pre',
                  attributes: {
                    innerHTML: JSON.stringify(j),
                    className: 'text-left'
                  }
                });
              }
            } else {
              alert('fail');
            }
          });
        });
      } else {
        alert(BODY);
      }
    </script>
<?php
  }
  if (isses('target_translate')) {
    echo '<input type="hidden" name="target_translate" id="target_translator" class="form-control" value="' . isses('target_translate') . '">';
    $logtxt = file_get_contents(ROOT . '/views/AGC/log.txt');
    $ex_s = explode('/', $_SESSION['target_translate']);
    $exs = end($ex_s);
    echo '<div style="position:fixed;bottom:0;right:0" id="btn-send" class="d-none">
      <div style="word-wrap:break-word">';
    if (isset($_SESSION['subscribed']) && 1 === $_SESSION['subscribed'] && false === strpos($logtxt, $exs) && isset($sl) && isset($tl) && isset($dir)) {
      $for = (isset($_SESSION['for']) ? trim($_SESSION['for']) : false);
      if ($for) {
        echo "<a href=\"/AGC/send?sl=$sl&tl=$tl&email=$for\" class='notranslate btn btn-success'>Process This Article</a>";
        if (!empty($f) && !empty($b) && !empty($dir)) {
          _file_($_SERVER['DOCUMENT_ROOT'] . "/views/AGC/saved/$dir/" . $f, $b . PHP_EOL, LOCK_EX);
        }
      } else {
        echo "<a href='/AGC/input' class='btn notranslate btn-warning' data-name='agc' id='newtab'>You haven't input your blogger emails (Click here to insert your blogger mail)</a>";
      }
    } else {
      echo "<a class='btn btn-danger notranslate' href='/AGC/lists' data-name='agc' id='newtab'>You cant send this</a>";
    }
    echo "</div>
                            </div>
                            <script>
                              setTimeout(function() {
                                $('#btn-send').removeClass('d-none');
                              }, 3000);
                            </script>";
  }
}
if (is_user_logged_in() && current_user_can('editor') && isset($_SESSION['source_lang']) && isset($_SESSION['target_lang']) && isset($_SESSION['dir']) && isset($_SESSION['body_translated'])) {
  if (isset($_POST['create_post'])) {
    $new_post = [
      'post_title' => $_SESSION['title'],
      'post_content' => $_SESSION['body_translated'],
      'tags_input' => trim('/', rtrim('/', $dir)),
      'post_status' => 'publish',           // Choose: publish, preview, future, draft, etc.
      'post_type' => 'post',
      'post_category' => [trim('/', rtrim('/', $dir))],
    ];

    wp_insert_post($new_post);
  }
}
if (!isLocalhost()) {
  echo '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
}
if (function_exists('add_to_footer')) {
  call_user_func('add_to_footer');
}
?>
</body>

</html>