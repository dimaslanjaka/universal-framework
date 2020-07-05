<?php

namespace MVC;

if (!function_exists('folder_session')) {
  include __DIR__ . '/loader.php';
}

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
   * Session instances.
   *
   * @var \Session\session
   */
  public $session = null;

  public function __construct()
  {
    /**
     * Load image cache if exists.
     */
    $imgproxy = isset($_REQUEST['image-proxy']) ? $_REQUEST['image-proxy'] : (isset($_REQUEST['img-source']) ? $_REQUEST['img-source'] : null);
    if ($imgproxy) {
      $url = urldecode(trim($imgproxy));
      if (helper::is_url($url)) {
        helper::cleanBuffer();
        exit(\img\cache::imageCache($url));
      }
    }

    /*
     * Load admin utility
     */
    if ($this->is_admin()) {
      // Metadata receiver
      if (isset($_POST['meta-save']) && helper::is_header('Save-Metadata')) {
        unset($_POST['meta-save']);
        if (isset($_POST['meta-config'])) {
          $config_meta = $_POST['meta-config'];
          unset($_POST['meta-config']);
          if ($config_meta = realpath($config_meta)) {
            foreach ($_POST as $key => $value) {
              if ('true' == $value) {
                $_POST[$key] = true;
              } elseif ('false' == $value) {
                $_POST[$key] = false;
              } elseif (is_numeric($value)) {
                settype($_POST[$key], 'integer');
              } elseif (is_string($value)) {
                $_POST[$key] = trim($value);
              }
            }
            $meta_data = $_POST;
            //robot tag header
            if (!isset($meta_data['robot'])) {
              $meta_data['robot'] = 'noindex, nofollow';
            }
            //allow comments
            if (!isset($meta_data['comments'])) {
              $meta_data['comments'] = false;
            }
            //cache page
            if (!isset($meta_data['cache'])) {
              $meta_data['cache'] = false;
            }
            // obfuscate javascript
            if (!isset($meta_data['obfuscate'])) {
              $meta_data['obfuscate'] = true;
            }
            if (file_exists($config_meta)) {
              \Filemanager\file::file($config_meta, $meta_data, true);
              if (!\MVC\helper::cors()) {
                safe_redirect(\MVC\helper::geturl());
              } else {
                if (ob_get_level()) {
                  ob_end_clean();
                }
                exit(\JSON\json::json(['message' => 'Meta Saved', 'title' => 'Meta Changer', 'reload' => true]));
              }
            }
          }
        }
      }
    }

    /*
     * Setup default meta
     */
    $this->meta = [
      'published' => date('m/j/y g:i A'),
      'modified' => date('m/j/y g:i A'),
      'thumbnail' => 'https://1.bp.blogspot.com/-rkXCUBbNXyw/XfY0hwoFu5I/AAAAAAAAAhw/BUyeKW5BtMoIJLlPUcPSdqGZBQRncXjDQCK4BGAYYCw/s600/PicsArt_09-09-12.12.25.jpg',
      'theme' => true,
      'title' => $_SERVER['REQUEST_URI'],
      'share' => false,
      'desc' => '',
      'content' => null,
      'robot' => 'noindex, nofollow',
      'obfuscate' => false,
      'cache' => false,
    ];
    $this->root = realpath(__DIR__ . '/../../');
    $this->root_theme = realpath(__DIR__ . '/themes');
    $this->view = helper::platformSlashes($this->root . '/view');
    $this->config_folder = helper::platformSlashes(__DIR__ . '/config');
    $config_theme = json_decode(file_get_contents($this->config_folder . '/theme-admin.json'), true);
    $this->admin_user = $config_theme['user'];
    $this->admin_pass = $config_theme['pass'];
  }

  /**
   * Turn zone into maintenance mode (Maintenance page).
   *
   * @param string $zone if empty, will turn into maintenance mode in all zone
   *
   * @return \MVC\themes
   */
  public function shutdown(string $zone)
  {
    $current = get_zone();

    if ($current == $zone) {
      maintenance();
    } elseif (empty($zone)) {
      maintenance();
    }

    return $this;
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
   * Set theme default.
   *
   * @return $this
   */
  public function set(string $theme, bool $useTheme = true)
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

  /**
   * ```php
   * setThemeByZones([ 'theme-name'=>['zone1', 'zone2'], 'another-theme'=>['zone3','zone4'], 'default-template'])
   * ```
   * Set theme by zone divider.
   * if not exists in zone divider, will using default template.
   * @throws Exception
   * @return $this
   */
  public function setThemeByZones(array $config, string $default)
  {
    $current = get_zone();
    $set = false;
    foreach ($config as $theme_name => $zones) {
      if (in_array($current, $zones)) {
        $this->set($theme_name);
        $set = true;
      }
    }
    if (!$set) {
      $this->set($default);
    }

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
       * begin form include.
       *
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
            $this->meta['theme'] = 'true' == trim($_REQUEST['theme']) ? true : false;
            file_put_contents($config, json_encode($this->meta, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
          }
          if (isset($_REQUEST['obfuscate'])) {
            $this->meta['obfuscate'] = 'true' == trim($_REQUEST['theme']) ? true : false;
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

  /*public function admin()
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
  }*/

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
      } elseif ($this->meta['theme']) {
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

  public function load_admin_tools()
  {
    if ($this->is_admin()) {
      $Config = normalize_path(realpath($this->config));
      include __DIR__ . '/themes/admin.php';
    }
  }
}
