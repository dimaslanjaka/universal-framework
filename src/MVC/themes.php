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
        $this->meta = (array) json_decode(file_get_contents($config));
        $this->meta['content'] = $this->root . $this->meta['content'];
      }
    }

    return $this;
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
    $output = null;
    if (file_exists($this->view)) {
      // Extract the variables to a local namespace
      extract($variables);
      extract($this->meta);
      $_SESSION['var'] = get_defined_vars();
      $content = $this->view;
      // begin form include
      $form = preg_replace('/\.php$/s', '-f.php', $content);
      helper::include_asset($form);
      $theme = $this;
      //var_dump($theme);
      // cors detect
      if ((\MVC\helper::cors() || isset($_REQUEST['json'])) && file_exists($content)) {
        if (isset($_REQUEST['json'])) {
          header('Content-Type: application/json');
        }
        if (isset($_SESSION['var']['content'])) {
          include $_SESSION['var']['content'];
        } else {
          return json_encode([
            'error' => true,
            'message' => 'theme content file not exist',
          ]);
        }
        exit;
      }
      // if not using theme
      if (!$this->meta['theme']) {
        include $content;

        return;
      }
      // Start output buffering
      ob_start();

      // Include the template file
      if (file_exists($this->root_theme . '/content.php')) {
        include $this->root_theme . '/content.php';
      } else {
        return json::json([
          'error' => true,
          'message' => $this->root_theme . '/content.php' . ' not exists',
        ]);
      }

      // End buffering and return its contents
      $output = ob_get_clean();
    } else {
      return json::json([
        'error' => true,
        'message' => $this->view . ' not exists',
      ]);
    }
    if ($print) {
      echo $output;
      $inc = json::json(array_values(array_filter(array_map(function ($arr) {
        if (strpos($arr, 'vendor')) {
          return '';
        }

        return $arr;
      }, get_included_files()))), false, false);
      echo "<!--{$inc}-->";
    }

    return $output;
  }
}
