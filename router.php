<?php

if (class_exists('dimas')) {
  if (!isset($core)) {
    $core = new dimas();
  }
  $request = router::i()->request;
  //$core->dump($request);
  $subrequest = explode('/', $request);
  $subrequest = array_unique($subrequest);
  if (!isset($subrequest[1])) {
    $subrequest[1] = 'index';
  }
  $squence = '';

  $dev = __DIR__ . '/router-dev.php';
  if (file_exists($dev)) {
    include $dev;
  }

  $groot = get_option('site_default');

  $root_view = $core->view; // ROOT . ($groot ? "/views/$groot/" : '/views/');

  if (file_exists($root_view . '/' . implode('/', $subrequest) . '.php')) {
    $squence = implode('/', $subrequest);
  } else {
    $router_dump['subrequest'][__LINE__] = $subrequest;
    for ($i = 0; $i < count($subrequest); $i++) {
      $subfile = $subrequest[$i];
      $f1 = $root_view . $squence . $subfile;
      $f2 = $root_view . $squence . $subfile . '.php';
      $router_dump['subrequest']['loop'][__LINE__][$subrequest[$i]] = [
        'dir' => is_dir($f1),
        'dirpath' => $f1,
        'file' => is_file($f2),
        'filepath' => $f2
      ];

      //$core->dump($f1, $f2);
      if (is_dir($f1)) {
        $squence .= $subfile . '/';
        $router_dump['squence'][__LINE__][] = $squence;
      } else if (file_exists($f2)) {
        $squence .= $subfile;
        $router_dump['squence'][__LINE__][] = $squence;
      }
    }
  }

  $request_case2 = $root_view . $subrequest[0] . '/' . $subrequest[1] . '.php';
  if (file_exists($root_view . $squence . '.php') && !file_exists($request_case2)) {
    $request = $squence;
    $router_dump['request'][__LINE__] = $request;
  } elseif (file_exists($request_case2)) {
    $request = $root_view . $subrequest[0] . '/' . $subrequest[1];
    $router_dump['request'][__LINE__] = $request;
  }
  //$core->dump($root_view.$squence);

  if (empty($request)) {
    $request = 'index';
    $router_dump['request'][__LINE__] = $request;
  }

  /* metadata */
  $meta = $root_view . 'meta/' . $request . '.php';
  if (!file_exists($meta)) {
    if (file_exists($root_view . 'meta/init.php')) {
      $meta = $root_view . 'meta/init.php';
      $router_dump['meta'][__LINE__] = $meta;
    } elseif (file_exists(ROOT . '/views/meta/init.php')) {
      $meta = ROOT . '/views/meta/init.php';
      $router_dump['meta'][__LINE__] = $meta;
    }
  }
  if (file_exists($meta)) {
    include $meta;
  }

  /* forms */
  $form_ = $core->fix_slash($root_view . '/forms/' . $request . '.php');
  $c1 = array_helper::i()->set($form_)->explode('/')->rtrim()->unique();
  $c2 = array_helper::i()->set($form_)->explode('/')->unique();
  list($scriptPath) = get_included_files();
  $FormsDir = ROOT . '/views/' . implode('/', (array) $subrequest);
  $imp = implode('/', (array) $subrequest);
  $emp = explode('/', $imp);
  if (!file_exists($form_)) {
    if (is_dir(realpath(dirname($FormsDir . '.php')))) {
      if (is_dir(realpath(dirname($FormsDir . '.php') . '/forms'))) {
        if (is_file(realpath(dirname($FormsDir . '.php') . '/forms/' . end($emp) . '.php'))) {
          $form_ = realpath(dirname($FormsDir . '.php') . '/forms/' . end($emp) . '.php');
        }
      }
    }
  }
  if (!file_exists($form_)) {
    if (isset($subrequest[2]) && file_exists(ROOT . "/views/{$subrequest[0]}/{$subrequest[1]}/forms/{$subrequest[2]}.php")) {
      $form_ = ROOT . "/views/{$subrequest[0]}/{$subrequest[1]}/forms/{$subrequest[2]}.php";
      $router_dump['form'][__LINE__] = $form_;
    } elseif (file_exists(ROOT . '/views/forms/' . $subrequest[0] . '.php')) {
      $form_ = ROOT . '/views/forms/' . $subrequest[0] . '.php';
      $router_dump['form'][__LINE__] = $form_;
    } elseif (file_exists(ROOT . '/views/' . $subrequest[0] . '/forms/' . $subrequest[1] . '.php')) {
      $form_ = ROOT . '/views/' . $subrequest[0] . '/forms/' . $subrequest[1] . '.php';
      $router_dump['form'][__LINE__] = $form_;
    } elseif (file_exists($root_view . 'forms/' . str_replace('/index', '', $request) . 'index.php')) {
      $form_ = $root_view . 'forms/' . str_replace('/index', '', $request) . '/index.php';
      $router_dump['form'][__LINE__] = $form_;
    } elseif (file_exists($root_view . 'forms/' . $request . '/index.php')) {
      $form_ = $root_view . 'forms/' . $request . '/index.php';
      $router_dump['form'][__LINE__] = $form_;
    } elseif (file_exists($c1->implode('/')->add('.php')->string)) {
      $form_ = $c1->implode('/')->add('.php')->string;
      $router_dump['form'][__LINE__] = $form_;
    } elseif (file_exists($c2->string)) {
      $form_ = $c2->string;
      $router_dump['form'][__LINE__] = $form_;
    } elseif (file_exists($root_view . str_replace('/index', '', $request) . '/forms/index.php')) {
      $form_ = $root_view . str_replace('/index', '', $request) . '/forms/index.php';
      $router_dump['form'][__LINE__] = $form_;
    } else {
      if (file_exists($root_view . 'forms/init.php')) {
        $form_ = $root_view . 'forms/init.php';
        $router_dump['form'][__LINE__] = $form_;
      } elseif (file_exists(ROOT . '/views/forms/init.php')) {
        $form_ = ROOT . '/views/forms/init.php';
        $router_dump['form'][__LINE__] = $form_;
      }
    }
  }

  if (file_exists($form_)) {
    include $form_;
  }
  //$core->dump($form_, isset($subrequest[2]) ? ROOT . "/views/{$subrequest[0]}/{$subrequest[1]}/forms/{$subrequest[2]}.php" : null);

  /* contents */
  $content = $core->fix_slash($root_view . '/' . str_replace($root_view, '', $request) . '.php');
  //$core->dump([$content, $request, $root_view]);
  if (!file_exists($content)) {
    if (file_exists($core->fix_slash($root_view . '/' . $request . '.php'))) {
      $content = $core->fix_slash($root_view . '/' . $request . '.php');
      $router_dump['content'][__LINE__] = $content;
    } elseif (file_exists($root_view . str_replace('/index', '', $request) . '/index.php')) {
      $content = $root_view . str_replace('/index', '', $request) . '/index.php';
      $router_dump['content'][__LINE__] = $content;
    } elseif (file_exists(ROOT . '/views/' . $subrequest[0] . '.php')) {
      $content = ROOT . '/views/' . $subrequest[0] . '.php';
      $router_dump['content'][__LINE__] = $content;
    } else {
      $c1 = array_helper::i()->set($content)->explode('/')->rtrim()->unique();
      if ($c1) {
        if (file_exists($c1->implode('/')->add('.php')->string)) {
          $content = $c1->implode('/')->add('.php')->string;
          $router_dump['content'][__LINE__] = $content;
        } elseif (file_exists($c1->remove('.php', '/index.php'))) {
          $content = $c1->remove('.php', '/index.php');
          $router_dump['content'][__LINE__] = $content;
        }
      }
    }
  } else {
    $router_dump['content'][__LINE__] = $content;
  }

  /* style */
  $style = [$core->fix_slash(ROOT . '/views/css/template.css'), $core->fix_slash(ROOT . '/views/css/animate.css'), $core->fix_slash(ROOT . '/views/css/style.css'), $core->fix_slash(ROOT . '/views/css/loading.css'), $core->fix_slash(ROOT . '/views/css/loading-btn.css')];
  if (file_exists(dirname($content) . '/css/' . basename($content, '.php') . '.css')) {
    $style[] = dirname($content) . '/css/' . basename($content, '.php') . '.css';
  } else
  if (file_exists($root_view . 'css/' . str_replace('/index', '', $request) . '/index.css')) {
    $style[] = $root_view . 'css/' . str_replace('/index', '', $request) . '/index.css';
  }
  $fcss = ROOT . '/views/' . $subrequest[0] . '/css/' . $subrequest[1] . '.css';

  if (!in_array($fcss, $style) && file_exists($fcss)) {
    $style[] = $fcss;
  }

  /* scripts */
  $script = [router::i()->view_dir . '/js/window.utility.js', router::i()->view_dir . '/js/class.js', router::i()->view_dir . '/js/template.js',/* router::i()->view_dir . '/js/init.js',*/ router::i()->view_dir . '/js/google.js', router::i()->view_dir . '/js/engine.js'];

  if (file_exists(dirname($content) . '/js/' . basename($content, '.php') . '.js')) {
    $script[] = dirname($content) . '/js/' . basename($content, '.php') . '.js';
  } else
  if (file_exists($core->fix_slash($root_view . '/js/' . $subrequest[1] . '.js'))) {
    $script[] = $core->fix_slash($root_view . '/js/' . $subrequest[1] . '.js');
  } else
  if (file_exists($core->fix_slash($root_view . '/js/' . $request . '.js'))) {
    $script[] = $core->fix_slash($root_view . '/js/' . $request . '.js');
  } else
  if (file_exists($root_view . 'js/' . str_replace('/index', '', $request) . '/index.js')) {
    $script[] = $root_view . 'js/' . str_replace('/index', '', $request) . '/index.js';
  } else {
    $c1 = array_helper::i()->set($core->fix_slash($root_view . '/js/' . $request . '.js'))->explode('/')->rtrim()->unique();
    $c2 = array_helper::i()->set($core->fix_slash($root_view . '/' . $subrequest[0] . '/js/' . $subrequest[1] . '.js'))->explode('/')->unique();
    if ($c1 && $c2) {
      if (file_exists($c1->implode('/')->add('.js')->string)) {
        $script[] = $c1->implode('/')->add('.js')->string;
      } elseif (file_exists($c1->string)) {
        $script[] = $c1->string;
      } elseif (file_exists($c2->string)) {
        $script[] = $c2->string;
      }
    }
  }

  $troot = (is_dir($root_view . $request . '/themes') ? $root_view . $request . '/themes' : (isset($subrequest[0]) && !empty($subrequest[0]) && is_dir($root_view . $subrequest[0] . '/themes') ? $root_view . $subrequest[0] . '/themes' : $root_view));

  $theme_header = defined('THEME_HEADER') ? THEME_HEADER : (file_exists($troot . '/header.php') ? $troot . '/header.php' : (file_exists($troot . '/themes/header.php') ? $troot . '/themes/header.php' : 'views/themes/header.php'));
  $theme_content = defined('THEME_CONTENT') ? THEME_CONTENT : (file_exists($troot . '/content.php') ? $troot . '/content.php' : (file_exists($troot . '/themes/content.php') ? $troot . '/themes/content.php' : 'views/themes/content.php'));
  $theme_footer = defined('THEME_FOOTER') ? THEME_FOOTER : (file_exists($troot . '/footer.php') ? $troot . '/footer.php' : (file_exists($troot . '/themes/footer.php') ? $troot . '/themes/footer.php' : 'views/themes/footer.php'));

  if (!preg_match('/\.(css|js)$/s', router::i()->noparam)) {
    if (isset($_REQUEST['router']) && isLocalhost()) {
      include __DIR__ . '/router-dump.php';
    }
    include $theme_header;
    include $theme_content;
    include $theme_footer;
  } else {
    router::i()->src();
  }


  if (isLocalhost() && headers_sent()) {
    $arr = [
      'class' => router::i(),
      'troot' => $troot,
      'root_view' => $root_view,
      'request' => $request,
      'subrequest' => $subrequest,
      'squence' => $squence,
      'form' => [$form_, (is_string($form_) && file_exists($form_))],
      'themes' => [
        'production' => [
          'theme_header' => $theme_header,
          'theme_footer' => $theme_footer,
          'theme_content' => $theme_content,
        ],
        'test' => [
          [
            'theme_header' => $troot . '/themes/header.php',
            'theme_header_exists' => file_exists($troot . '/themes/header.php'),
          ],
        ],
      ],
      'content' => $content,
      'style' => $style,
      'script' => $script,
    ];
    echo '<!--' . json::i()->j($arr) . '-->';
  }
}
