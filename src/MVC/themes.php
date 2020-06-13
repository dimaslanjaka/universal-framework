<?php

namespace MVC;

use JSON\json;

class themes
{
  public $root_theme;
  public $theme;
  public $view;
  public $meta = [];
  public $title = '';
  public $config;
  public $config_folder;
  protected $admin_user = 'admin';
  protected $admin_pass = 'admin';
  /**
   * Session instances
   *
   * @var \Session\session
   */
  public $session = null;

  public function __construct()
  {
    $this->meta = [
      'published' => date('m/j/y g:i A'),
      'modified' => date('m/j/y g:i A'),
      'thumbnail' => 'https://1.bp.blogspot.com/-rkXCUBbNXyw/XfY0hwoFu5I/AAAAAAAAAhw/BUyeKW5BtMoIJLlPUcPSdqGZBQRncXjDQCK4BGAYYCw/s600/PicsArt_09-09-12.12.25.jpg',
      'theme' => true,
      'title' => $_SERVER['REQUEST_URI'],
      'share' => false,
      'desc' => '',
      'content' => null,
      'robot' => 'noindex, nofollow'
    ];
    $this->root = realpath(__DIR__ . '/../../');
    $this->root_theme = realpath(__DIR__ . '/themes');
    $this->view = helper::platformSlashes($this->root . '/view');
    $this->config_folder = helper::platformSlashes(__DIR__ . '/config');
    $config_theme = json_decode(file_get_contents($this->config_folder . '/theme-admin.json'), true);
    $this->admin_user = $config_theme['user'];
    $this->admin_pass = $config_theme['pass'];
  }

  public function published($time)
  {
    $date = $this->date($time);
    $this->meta['published'] = $date;

    return $this;
  }

  public function modified($time)
  {
    $date = $this->date($time);
    $this->meta['modified'] = $date;

    return $this;
  }

  public function thumbnail($src)
  {
    $this->meta['thumbnail'] = $src;
  }

  public function date($time, $format = 'm/j/y g:i A')
  {
    if (!is_numeric($time)) {
      $time = strtotime($time);
    }

    return date($format, $time);
  }

  /**
   * Set theme.
   *
   * @param string $theme
   * @param bool   $useTheme
   *
   * @return $this
   */
  public function set($theme, $useTheme = true)
  {
    $this->theme = $theme;
    $this->root_theme = helper::platformSlashes($this->root_theme . '/' . $theme);
    if (isset($_REQUEST['theme']) && $this->is_admin()) {
      $useTheme = 'false' == $_REQUEST['theme'] ? false : true;
    }
    //exit(var_dump($useTheme));
    $this->meta['theme'] = $useTheme;

    return $this;
  }

  public function view($file)
  {
    $this->view = helper::platformSlashes($this->root . '/' . $file);
    $this->view = str_replace(helper::platformSlashes($this->root), '', $this->view);
    $this->view = $this->root . $this->view;

    if (realpath($this->view)) {
      $this->view = realpath($this->view);
      $this->meta['content'] = $this->remove_root($this->view);
      $this->prepare_config();

      /**
       * begin form include
       * @todo Form includer
       */
      $form = preg_replace('/\.php$/s', '-f.php', $this->view);
      helper::include_asset($form);
      if (!$this->meta['theme'] && $this->NoThemeRequest()) {
        include $this->view;

        exit;
      }
    }

    return $this;
  }

  public function remove_root($path)
  {
    return str_replace($this->root, '', $path);
  }

  public function fix_slash($path)
  {
    return preg_replace('/(\/|\\\\){2,100}/m', '/', $path);
  }

  public function prepare_config()
  {
    $viewNoRoot = str_replace($this->root, '', $this->view);
    $this->config = $this->config_folder . '/' . preg_replace('/\.php$/s', '', $viewNoRoot) . '.json';
    if ($config = helper::platformSlashes($this->config)) {
      $this->config = $config;
      if (!is_dir(dirname($config)) && !file_exists(dirname($config))) {
        mkdir(dirname($config), 0777, true);
      }
      if (!file_exists($config)) {
        file_put_contents($config, json_encode($this->meta, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
      } else {
        $this->meta = json_decode(file_get_contents($config), true);
        if (!isset($this->meta['robot'])) {
          $this->meta['robot'] = 'noindex, nofollow';
        }
        header('X-Robots-Tag: ' . trim($this->meta['robot']), true);
        // obfuscate javascript
        if (!isset($this->meta['obfuscate'])) {
          $this->meta['obfuscate'] = false;
        }
        // cache
        if (!isset($this->meta['cache'])) {
          $this->meta['cache'] = true;
        }
        $this->meta['content'] = $this->root . $this->meta['content'];
        if ($this->is_admin() && !helper::cors()) {
          if (isset($_REQUEST['theme'])) {
            $this->meta['theme'] = trim($_REQUEST['theme']) == 'true' ? true : false;
            file_put_contents($config, json_encode($this->meta, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
          }
          if (isset($_REQUEST['obfuscate'])) {
            $this->meta['obfuscate'] = trim($_REQUEST['theme']) == 'true' ? true : false;
            file_put_contents($config, json_encode($this->meta, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
          }
        }
      }
    }

    return $this;
  }

  /**
   * Dump this variable.
   *
   * @param variadic ...$var
   */
  public function dump(...$var)
  {
    if (ob_get_level()) {
      ob_end_clean();
      ob_start();
    }
    \JSON\json::headerJSON();
    exit(var_dump($var));
  }

  public function is_admin()
  {
    if (isset($_SESSION['login']['role'])) {
      return preg_match(\User\user::get_admin_pattern(), $_SESSION['login']['role']);
    }
  }

  public function admin()
  {
    http_response_code(200);
    $this->root_theme = realpath(__DIR__ . '/themes');
    $view = $this->root_theme . '/admin/view.php';
    if ($form = realpath(preg_replace('/\.php$/s', '-f.php', $view))) {
      include $form;
    }
    $this->set('admin');
    $this->view($view);
    //var_dump($this);
    $this->render();
  }

  /**
   * Include passed variable.
   */
  public function render($variables = [], $print = true)
  {
    //exit('xxx');
    \MVC\helper::trycatch(function () use ($variables, $print) {
      $this->load_render($variables, $print);
    });

    return $this;
  }

  public function isJSONRequest()
  {
    $hasJSON = isset($_REQUEST['json']);
    if (!$hasJSON) {
      if (isset($_SERVER['HTTP_ACCEPT'])) {
        $hasJSON = preg_match('/^application\/json/m', $_SERVER['HTTP_ACCEPT']);
      }
    }

    return $hasJSON;
  }

  public function NoThemeRequest()
  {
    if (!isset($this->meta['theme']) || $this->meta['theme']) {
      return false;
    }
    $accept = isset($_SERVER['HTTP_ACCEPT']) ? $_SERVER['HTTP_ACCEPT'] : false;
    if (false !== $accept) {
      if (preg_match('/((application|text)\/(json|javascript))/m', $accept, $match)) {
        if (isset($match[0]) && !headers_sent()) {
          header('Content-Type: ' . $match[0]);
        }
        return true;
      }
    }

    return false;
  }

  public function load_render(array $variables, bool $print = true)
  {
    //exit(\JSON\json::json($this));
    if (file_exists($this->view)) {
      // Extract the variables to a local namespace
      extract($variables);
      extract($this->meta);
      $_SESSION['var'] = get_defined_vars();
      $content = $this->view;

      $theme = $this;
      //exit(\JSON\json::json($theme));

      // if not using theme
      if (!$this->meta['theme']) {
        include $content;

        return;
      } else if ($this->meta['theme']) {
        // Include the template file
        $template_content = $this->root_theme . '/content.php';
        if (file_exists($template_content)) {
          include $template_content;
        } else {
          return json::json([
            'error' => true,
            'message' => $template_content . ' not exists',
          ]);
        }
      } else {
        exit('meta theme not defined');
      }

      /*// End buffering and return its contents
      $output = ob_get_clean();*/
    } else {
      json::json([
        'error' => true,
        'message' => $this->view . ' not exists',
      ]);
      exit;
    }
  }
}
