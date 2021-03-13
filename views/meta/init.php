<?php
//generate sitemap
do_action('gen_sitemap');
//start meta
$title = get_option('main-site-title') ? get_option('main-site-title') : get_bloginfo('name');
$content = ROOT . '/views/404.php';
header('Access-Control-Allow-Origin: *');
header('X-Robots-Tag: index, nofollow', true);
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
if (isset($site_title)) {
  $site_title = ucwords($site_title);
} else if (isses('title')) {
  $site_title = ucwords(strtolower(trim(isses('title'))));
} else {
  $site_title = ucwords($title);
}
/**
 * Redirect if not logged in
 */
if (!preg_match('/\/(login|callback|index|auth|alquran|ProxyChecker|AGC\/(proxy|blogger|list)*)/m', $_SERVER['REQUEST_URI'])) { //$subrequest[1]
  if (!isset($_SESSION['subscribed']) || 1 !== $_SESSION['subscribed'] || !is_user_logged_in()) {
    if (!preg_match('/^\/AGC\/user/s', $_SERVER['REQUEST_URI'])) {
      header('Location: /AGC/login');
      exit;
    }
  } else {
    $google = new wpgoogle();
  }
}

if (isset($_SESSION['for'])) {
  if (!headers_sent()) {
    setcookie('for', trim($_SESSION['for']));
  }
}

add_action('wp_meta_tag', function () {
  global $id;
  global $site_desc;
  global $site_admin;
  global $site_title;
  global $site_img;
  global $content;
  $site_date = $site_updated = date('c');
  $rewrite = false;
  $configfile = dirname($content) . '/' . basename($content, '.php') . '.json';
  $links = [
    WP_PROTOCOL . '://' . WP_HOST . '/AGC/proxy',
    WP_PROTOCOL . '://' . WP_HOST . '/AGC/list',
    WP_PROTOCOL . '://' . WP_HOST . '/AGC/blogger',
    WP_PROTOCOL . '://' . WP_HOST . '/AGC/keyword',
    WP_PROTOCOL . '://' . WP_HOST . '/AGC/shortlink',
    WP_PROTOCOL . '://' . WP_HOST . '/AGC/post'
  ];
  if (file_exists($content)) {
    $config = _file_($configfile, [
      'title' => '',
      'desc' => '',
      'image' => '',
      'published' => date('c'),
      'updated' => date('c'),
      'rating' => rand(4, 5),
      'rating_count' => rand(100, 1000)
    ]);
    if (file_exists($config)) {
      $c = json_decode(file_get_contents($config));
      if (isset($c->title) && !empty($c->title)) {
        $site_title = $c->title;
      } else {
        $c->title = '';
      }
      if (isset($c->desc) && !empty($c->desc)) {
        $site_desc = $c->desc;
      } else {
        $c->desc = '';
      }
      if (isset($c->image) && !empty($c->image)) {
        $site_img = $c->image;
      } else {
        $c->image = '';
      }
      if (isset($c->published) && !empty($c->published)) {
        $site_date = date('c', strtotime($c->published));
      } else {
        $c->published = date('c');
        $rewrite = 1;
      }
      if (isset($c->updated) && !empty($c->updated)) {
        $site_updated = date('c', strtotime($c->updated));
      } else {
        $c->updated = date('c');
        $rewrite = 1;
      }
      if (!isset($c->rating)) {
        $c->rating = rand(4, 5);
        $rewrite = 1;
      }
      if (!isset($c->rating_count)) {
        $c->rating_count = rand(100, 1000);
        $rewrite = 1;
      }

      if ($rewrite) {
        _file_($configfile, $c, true);
      }
    }
  }

?>

  <script type='application/ld+json'>
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "<?= WP_PROTOCOL . '://' . WP_HOST . '/' ?>",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "<?= WP_PROTOCOL . '://' . WP_HOST . '/' ?>search?q={search_term}",
        "query-input": "required name=search_term"
      },
      "mainEntity": {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "<?= $site_title ?>",
        "description": "<?= $site_desc ?>",
        "author": {
          "@type": "Person",
          "name": "Dimas Lanjaka"
        },
        "publisher": [{
            "@type": "Organization",
            "name": "WMI",
            "logo": {
              "@type": "ImageObject",
              "url": "https://1.bp.blogspot.com/-rkXCUBbNXyw/XfY0hwoFu5I/AAAAAAAAAhw/BUyeKW5BtMoIJLlPUcPSdqGZBQRncXjDQCK4BGAYYCw/s600/PicsArt_09-09-12.12.25.jpg",
              "width": "600",
              "height": "194"
            }
          },
          {
            "@type": "CollegeOrUniversity",
            "name": "MIT OpenCourseWare"
          }
        ],
        "datePublished": "<?= $c->published ?>",
        "dateModified": "<?= $c->updated ?>",
        "image": "<?= $site_img ?>",
        "license": "http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US"
      }
    }
  </script>

  <!-- Required meta tags -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="google-signin-client_id" content="<?= GOOGLE_CLIENT_ID; ?>" />
  <meta property="og:type" content="website" />
  <meta http-equiv="Expires" content="0" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Cache-Control" content="no-cache" />
  <meta name="rating" content="General" />
  <meta name="og:rating_scale" content="5" />
  <?php
  if (isset($c)) {
    echo '<meta name="og:rating" content="' . $c->rating . '" /><meta name="og:rating_count" content="' . $c->rating_count . '" />';
  }
  ?>

  <!-- Twitter -->
  <meta name="twitter:site" content="@DimasSkynetCybe" />
  <meta name="twitter:creator" content="@DimasSkynetCybe" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="<?= (isset($site_title) ? $site_title : (get_option('yt-site-title') ? get_option('yt-site-title') : (isset($id) ? $id : false))); ?>" />
  <meta name="twitter:description" content="<?= (isset($site_desc) ? $site_desc : 'AGC'); ?>" />
  <meta name="twitter:image" content="<?= (isset($site_img) ? $site_img : 'https://themepixels.me/azia/img/azia-social.png'); ?>" />

  <!-- Facebook -->
  <meta property="og:url" content="<?= (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"; ?>" />
  <meta property="og:title" content="<?= (!empty($site_title) ? $site_title : 'AGC'); ?>" />
  <meta property="og:description" content="<?= (!empty($site_desc) ? $site_desc : 'AGC'); ?>" />
  <meta property="og:image" content="<?= (!empty($site_img) ? $site_img : 'https://themepixels.me/azia/img/azia-social.png'); ?>" />
  <meta property="og:image:secure_url" content="<?= (!empty($site_img) ? $site_img : 'https://themepixels.me/azia/img/azia-social.png'); ?>" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="600" />
  <?php
  foreach ($links as $seeAlso) {
    echo '<meta property="og:see_also" content="' . $seeAlso . '" />';
  }
  ?>

  <!--Pinterest-->
  <meta property="og:site_name" content="<?= get_bloginfo('name') ?>" />
  <meta property="article:published_time" content="<?= $site_date ?>" />
  <meta property="article:author" content="Dimas Lanjaka" />
  <meta property="article:modified_time" content="<?= $site_updated ?>" />

  <!-- Meta -->
  <meta name="description" content="<?= (!empty($site_desc) ? $site_desc : get_bloginfo('name')); ?>" />
  <meta name="author" content="Dimas Lanjaka" />
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="64x64" href="<?= (!empty($site_img) ? $site_img : 'https://themepixels.me/azia/img/azia-social.png'); ?>" />
  <!-- Apple/Safari icon -->
  <link rel="apple-touch-icon" sizes="180x180" href="<?= (!empty($site_img) ? $site_img : 'https://themepixels.me/azia/img/azia-social.png'); ?>" />
  <!-- Square Windows tiles -->
  <meta name="msapplication-square70x70logo" content="<?= (!empty($site_img) ? $site_img : 'https://themepixels.me/azia/img/azia-social.png'); ?>" />
  <meta name="msapplication-square150x150logo" content="<?= (!empty($site_img) ? $site_img : 'https://themepixels.me/azia/img/azia-social.png'); ?>" />
  <meta name="msapplication-square310x310logo" content="<?= (!empty($site_img) ? $site_img : 'https://themepixels.me/azia/img/azia-social.png'); ?>" />
  <!-- Rectangular Windows tile -->
  <meta name="msapplication-wide310x150logo" content="<?= (!empty($site_img) ? $site_img : 'https://themepixels.me/azia/img/azia-social.png'); ?>" />
  <!-- Windows tile theme color -->
  <meta name="msapplication-TileColor" content="#2e2e2e" />
  <title><?= trim((!empty($site_title) ? $site_title : 'AGC') . (get_option('yt-site-title') ? ' | ' . get_option('yt-site-title') : ' | ' . get_bloginfo('name'))); ?></title>
<?php
});
