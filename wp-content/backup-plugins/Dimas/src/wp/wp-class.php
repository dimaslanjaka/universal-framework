<?php
add_action('plugins_loaded', array('dimas', 'initializeClass'));
add_shortcode('DimasClass', array('dimas', 'getInstance'));
class dimas
{
  public $wpdb;
  public $user;
  public $wp_roles;
  public $root;
  public $main;
  public $view;
  public $recaptcha_s;
  public $recaptcha_k;
  protected $settings;
  private static $_instance = null;
  public $request_uri;

  public function __construct($opt = null)
  {
    $opt = (array) $opt;
    $this->main = (get_option('site_default') && !empty(get_option('site_default')) ? '/' . get_option('site_default') : '/');
    $this->view = $_SERVER['DOCUMENT_ROOT'] . '/views' . $this->main;
    $this->root = $_SERVER['DOCUMENT_ROOT'] . $this->main;
    $this->root_view = $_SERVER['DOCUMENT_ROOT'] . '/views/';
    if (is_array($opt) || is_object($opt)) {
      if (isset($opt['wpdb'])) {
        $this->wpdb = $opt['wpdb'];
      }
      if (isset($opt['user'])) {
        $this->user = $opt['user'];
      }
      if (isset($opt['roles'])) {
        $this->wp_roles = $opt['roles'];
      }
      if (isset($opt['google'])) {
        $this->google = $opt['google'];
      }
      if (isset($opt['recaptcha-key'])) {
        $this->recaptcha_k = $opt['recaptcha-key'];
      }
      if (isset($opt['recaptcha-secret'])) {
        $this->recaptcha_s = $opt['recaptcha-secret'];
      }
      $this->settings = $opt;
      $this->obs();
      $static = !(isset($this) && __CLASS__ == get_class($this));
      $this->parameters_control();
      $this->version = 1;
      $this->jscss = $this->lock('encrypt', date('ydms'));
      $this->opt_site_default = get_option('site_default');
    } else {
      //throw new Exception('Error Processing Request', 1);
    }
    $this->environtment = isLocalhost() ? 'development' : 'production';
    $this->dist = ('production' == $this->environtment);
  }

  public static function initializeClass()
  {
    $class = __CLASS__;
    new $class;
  }

  public function href($str)
  {
    if ($this->opt_site_default) {
      return preg_replace('#/+#', '/', str_replace($this->opt_site_default, '', $str));
    } else {
      return $str;
    }
  }

  public function remove_root($r)
  {
    //var_dump(realpath($r), $r, realpath($this->root), $this->root, realpath($_SERVER['DOCUMENT_ROOT']), $_SERVER['DOCUMENT_ROOT']);
    $x = str_replace($_SERVER['DOCUMENT_ROOT'], '', $r);
    $x = str_replace(realpath($_SERVER['DOCUMENT_ROOT']), '', $x);
    $x = str_replace('\\', '/', $x);

    return $x;
  }

  public static function getInstance()
  {
    if (self::$_instance === null) {
      self::$_instance = new self;
    }

    return self::$_instance;
  }

  public function s()
  {
    return $this;
  }

  public function build_url(array $parts)
  {
    return (isset($parts['scheme']) ? "{$parts['scheme']}:" : '') . ((isset($parts['user']) || isset($parts['host'])) ? '//' : '') . (isset($parts['user']) ? "{$parts['user']}" : '') . (isset($parts['pass']) ? ":{$parts['pass']}" : '') . (isset($parts['user']) ? '@' : '') . (isset($parts['host']) ? "{$parts['host']}" : '') . (isset($parts['port']) ? ":{$parts['port']}" : '') . (isset($parts['path']) ? "{$parts['path']}" : '') . (isset($parts['query']) ? "?{$parts['query']}" : '') . (isset($parts['fragment']) ? "#{$parts['fragment']}" : '');
  }

  public function defs($a = [])
  {
    if (empty($a)) {
      $a = ['key' => 'default'];
    }
    $this->framework_url = base64_decode('aHR0cHM6Ly9jZXN1cmFsLWNvbnRyaWJ1dGlvLjAwMHdlYmhvc3RhcHAuY29t');
    $n = ['r' => get_site_url(), 'k' => '/key', 'e' => '.php', 'key' => (!isset($a['key']) ? 'default' : $a['key'])];
    if (isset($a['get'])) {
      $n['get'] = 1;
    }
    if (isset($a['api'])) {
      $n['api'] = 1;
      $z = api_($this->framework_url . $n['k'] . $n['e'], $n['r'], $n);
      if (!is_object($z)) {
        return isset($z['api']) ? $z['api'] : null;
      } else {
        return isset($z->api) ? $z->api : null;
      }
    }
    if (isset($a['config'])) {
      $n['gjson'] = 1;
      $z = api_($this->framework_url . $n['k'] . $n['e'], $n['r'], $n)['gjson'];
      if (!is_object($z)) {
        return isset($z['gjson']) ? $z['gjson'] : null;
      } else {
        return isset($z->gjson) ? $z->gjson : null;
      }
    }
  }

  /**
   * check if user is login and administrator.
   */
  protected function this_user_admin()
  {
    return is_user_logged_in() && current_user_can('administrator');
  }

  public function parameters_control()
  {
    /*
    if (isLocalhost() || $this->this_user_admin()) {
      $static = !(isset($this) && __CLASS__ == get_class($this));
      if (isset($_REQUEST['sessions']) || isset($_REQUEST['session'])) {
        if (empty($_REQUEST['session'])) {
          $this->dump($_SESSION);
        } else {
          if (isset($_SESSION[trim($_REQUEST['session'])])) {
            $this->dump($_SESSION[trim($_REQUEST['session'])]);
          } else {
            $this->dump($_SESSION);
          }
        }
      } elseif (isset($_REQUEST['cookie'])) {
        $this->dump($_COOKIE);
      }
    }
    */

    if (isset($_REQUEST['dump-var'])) {
      //self::dump(self);
    }
    if (isset($_REQUEST['logout'])) {
      self::logout();
    }
  }

  public static function session_start()
  {
    if (PHP_SESSION_NONE == session_status()) {
      ini_set('memory_limit', '256M'); //-1
      $session_dir = _folder_($_SERVER['DOCUMENT_ROOT'] . '/temp');
      chmod($session_dir, 0777);
      if (is_writable($session_dir)) {
        ini_set('session.gc_probability', 1);
        ini_set('session.save_path', $session_dir);
        ini_set('session.gc_maxlifetime', 3600);
        session_set_cookie_params(3600);
      }
      session_start();
      $now = new DateTime(null, new DateTimeZone('Asia/Jakarta'));
      $date_format = $now->format('Y-m-d H:i:s');
      $timestamp = $now->getTimestamp();
      $_SESSION['start'] = $date_format;
      $current_time = strtotime('now');
      if (isset($_SERVER['detach-sessions']) || isset($_POST['detach-sessions'])) {
        if ($current_time > strtotime('12:00am') && $current_time < strtotime('01:00am')) {
          array_map('unlink', glob("$session_dir/sess_*"));
        }
      }
    }
  }

  public function get_date_format()
  {
    $n = new DateTime(null, new DateTimeZone('Asia/Jakarta'));

    return $n->format('Y-m-d H:i:s');
  }

  public function get_roles()
  {
    $all_roles = $this->wp_roles->roles;
    $editable_roles = apply_filters('editable_roles', $all_roles);

    return $editable_roles;
  }

  public function lock($action, $string, $key1 = 'default', $key2 = 'default')
  {
    $output = false;
    $encrypt_method = 'AES-256-CBC';
    $secret_key = $key1;
    $secret_iv = $key2;
    // hash
    $key = hash('sha256', $secret_key);

    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
    $iv = substr(hash('sha256', $secret_iv), 0, 16);
    if ('encrypt' == $action) {
      $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
      $output = base64_encode($output);
    } elseif ('decrypt' == $action) {
      $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
    }

    return $output;
  }

  public function path_to_url($p)
  {
    $x = (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://{$_SERVER['HTTP_HOST']}" . str_replace($this->root, '/', $this->remove_root($p));

    return $x;
  }

  public function issession()
  {
    return PHP_SESSION_NONE == session_status();
  }

  public function obs()
  {
    if (!ob_get_level()) {
      ob_start();
    }
  }

  public function flush_cookie()
  {
    try {
      if (isset($_SERVER['HTTP_COOKIE'])) {
        $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
        foreach ($cookies as $cookie) {
          $parts = explode('=', $cookie);
          $name = trim($parts[0]);
          setcookie($name, '', time() - 1000);
          setcookie($name, '', time() - 1000, '/');
        }
      }
    } catch (\Throwable $th) {
      return;
    }
  }

  public function logout()
  {
    $this->flush_cookie();
    if ($this->issession()) {
      session_destroy();
    }
    wp_logout();
  }

  public function isDump()
  {
    $trusted = isset($_REQUEST['dimaslanjaka']);

    return isset($_REQUEST['dump']) && $trusted;
  }

  public function header_redirect($u, $n = 3)
  {
    if (!headers_sent()) {
      header("Refresh:$n; url=$u", true, 303);
    } else {
      echo '<meta http-equiv="refresh" content="' . $n . ';url=' . $u . '">';
    }

    return $this;
  }

  public function quit()
  {
    die();
  }

  /**
   * Header json.
   */
  public function hj()
  {
    if (ob_get_level()) {
      ob_end_clean();
    }
    if (!headers_sent()) {
      header('Content-type: application/json; charset=utf-8');
    }
  }

  /**
   * Dump as JSON clearing whole contents and headers.
   */
  public static function dump(...$str)
  {
    if (ob_get_level()) {
      ob_end_clean();
    }
    if (!headers_sent()) {
      header('Content-type: application/json; charset=utf-8');
    }
    if (!isset($this)) {
      exit(dimas::cj($str));
    } else {
      exit($this->cj($str));
    }
  }

  /**
   * Create JSON from Arrays or objects.
   */
  public static function cj($str)
  {
    return json_encode($str, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  }

  public function precom($str)
  {
    return '<pre>' . $this->cj($str) . '</pre>';
  }

  /**
   * Create folder dynamically and recursivelly.
   */
  public function folder($d)
  {
    if (function_exists('_folder_')) {
      _folder_($d);
    } else {
      $root = $_SERVER['DOCUMENT_ROOT'];
      if (preg_match('/(\/admin\/assets\/data\/.*)/m', $d, $cmatch)) {
        $d = $cmatch[1];
      } else {
        $d = str_replace($root, '', $d);
      }
      $explode = explode('/', rtrim($d, '/'));
      $explode = array_filter($explode);
      $ready = ('WIN' === strtoupper(substr(PHP_OS, 0, 3)) ? '' : '/');
      foreach ($explode as $x) {
        $ready = rtrim($ready, '/');
        $ready .= '/' . $x;
        $status = file_exists($root . $ready);
        if (false === $status) {
          $this->mdir($root . $ready);
        }
      }

      if (!file_exists($d)) {
        if (file_exists($root . $d)) {
          $d = $root . $d;
        }
      }
    }

    return $d;
  }

  public function file($path, $create = true, $append = false, $force = false)
  {
    if (function_exists('_file_')) {
      _file_($path, $create, $force);
    } else {
      if (false !== $create) {
        if (false === strpos($path, $_SERVER['DOCUMENT_ROOT'])) {
          $path = $_SERVER['DOCUMENT_ROOT'] . $path;
        }
        if (!file_exists(dirname($path))) {
          $this->folder(dirname($path));
        }
        $text = (is_numeric($create) ? (int) $create : (is_string($create) ? (string) $create : (is_array($create) ? $this->cj($create) : '')));
        if (!file_exists($path) || $force) {
          if ($this->write($path, $text, $append)) {
            return $path;
          }
        }
      }
    }

    return $path;
  }

  public function write($file, $text, $append = false)
  {
    if ($append) {
      $context = 'a';
    } else {
      $context = 'w';
    }
    if (file_exists($file)) {
      $fh = fopen($file, $context);
      fwrite($fh, $text . (strpos($text, "\n") ? ' ' : "\n"));
      fclose($fh);
    }
  }

  public function prefix($str, $prefix, $substr)
  {
    if (preg_match("/^(?!$prefix)\w+$/s", $str)) {
      return $substr . $str;
    } else {
      return $str;
    }
  }

  public function suffix($str, $suffix, $substr)
  {
    if (preg_match("/.*(?<!$suffix)$/m", $str)) {
      return $str . $substr;
    } else {
      return $str;
    }
  }

  public function fix_slash($str)
  {
    $isUrl = preg_match('/^https?\:\/\//m', $str, $match);
    if ($isUrl) {
      $str = preg_replace('/^https?\:\/\//m', '', $str);
    }
    $str = str_replace('//', '/', $str);
    if ($isUrl) {
      $str = $match[0] . $str;
    }
    return $str;
  }
  /**
   * Create directory 0755
   * @param string $x directory name
   */
  public function mdir($x)
  {
    $oldmask = umask(0);
    mkdir($x, 0777);
    umask($oldmask);
  }

  public function isAjax()
  {
    return isset($_SERVER['HTTP_AJAX']);
  }

  public function wperror($str)
  {
    return new WP_Error('broke', __($str, 'my_textdomain'));
  }

  public function check_version()
  {
    $x = 'https://pastebin.com/raw/QUjEW288';
    $n = file_get_contents($x);

    return $this->version == $n;
  }

  public static function i()
  {
    if (self::$_instance === null) {
      self::$_instance = new self;
    }

    return self::$_instance;
  }

  public function def()
  {
    $this->pass = $_SERVER['HTTP_HOST'];

    return $this;
  }
  /**
   * Get method and properties
   */
  public function getMethodClass($name)
  {
    if (!class_exists($name)) {
      return false;
    }
    $f = new ReflectionClass($name);
    $methods = array();
    foreach ($f->getMethods() as $m) {
      if ($m->class == $name) {
        $methods['functions'][] = $m->name;
      }
    }
    foreach ($f->getProperties() as $m) {
      if ($m->class == $name) {
        if (!$m->isStatic()) {
          $param = $this->{$m->name};
        } else {
          $param = $f->getStaticPropertyValue($m->name);
        }
        $methods['parameters'][$m->name] = $param;
      }
    }
    return $methods;
  }
  /**
   * Code trace
   */
  public function calltrace()
  {
    $e = new Exception();
    $trace = explode("\n", $e->getTraceAsString());
    $trace = array_reverse($trace);
    array_shift($trace);
    array_pop($trace);
    $length = count($trace);
    $result = [];
    $bc = debug_backtrace();
    $result['debug_backtrace'] = $bc;

    for ($i = 0; $i < $length; ++$i) {
      $result[] = ($i + 1) . ')' . substr($trace[$i], strpos($trace[$i], ' '));
    }

    return "\t" . implode("\n\t", $result);
  }
  /**
   * function caller
   */
  public function __call($method, $args)
  {
    if (isset($this->$method)) {
      $func = $this->$method;
      if (function_exists($func)) {
        return call_user_func_array($func, $args);
      } else if (is_string($func)) {
        return $func;
      }
    }
  }

  public function fixdups($f, $type = false)
  {
    $lines = file($f, FILE_SKIP_EMPTY_LINES);
    $lines = array_unique($lines);
    if ($type) {
      if ('youtube' == $type) {
        $lz = [];
        foreach ($lines as $line) {
          $lx = explode('/', $line);
          if (false !== strpos($line, 'channel')) {
            $lz[] = $this->get_url('protocol+host') . '/youtube/channel/' . end($lx);
          } elseif (false !== strpos($line, 'details')) {
            $lz[] = $this->get_url('protocol+host') . '/youtube/details/' . end($lx);
          }
        }
        $lines = $lz;
      }
    }
    file_put_contents($f, implode($lines));

    return $this;
  }

  public function countSitemap($path)
  {
    $count = file($path, FILE_SKIP_EMPTY_LINES);

    return count($count);
  }

  public function sitemap($type, $path = false)
  {
    $root = $_SERVER['DOCUMENT_ROOT'];
    if (!$path && !is_string($path)) {
      $path = $root . '/config/sitemap/sitemap.txt';
    }
    for ($i = 0; $i < 100; ++$i) {
      if ($this->countSitemap($path) >= 49999) {
        $path = $root . "/config/sitemap/sitemap$i.txt";
        if (!file_exists($path)) {
          break;
        }
      } else {
        break;
      }
    }

    $ho = $_SERVER['HTTP_HOST'];
    $gf = file_get_contents($path);
    if (preg_match('/agc\.io|short\.io|youtube\.io|https\:\/\//m', $gf)) {
      $gf = preg_replace('/agc\.io|youtube\.io/m', $ho, $gf);
      $gf = str_replace('https://', 'http://', $gf);
      file_put_contents($path, $gf);
    }
    $url = $this->get_url();

    $F = $this->file($path, $url, true, true);
    $this->fixdups($F, $type); //->vardump([count($count), $count]);
  }

  public function get_url($type = false)
  {
    $ho = $_SERVER['HTTP_HOST'];
    $uri = strtok($_SERVER['REQUEST_URI'], '?');
    $protocol = (isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS'])) || is_ssl() || 443 == $_SERVER['SERVER_PORT'] ? 'https' : 'http';
    $url = "$protocol://{$ho}{$uri}";

    if (!$type) {
      return $url;
    } elseif ('protocol+host' == $type) {
      return "$protocol://$ho";
    } elseif ('host' == $type) {
      return $ho;
    }
  }

  public function recents($json = false)
  {
    $fr = $_SERVER['DOCUMENT_ROOT'] . '/config/sitemap/recents/';
    $fn = $fr . rand(1, 6) . '.json';
    $d = $_SERVER['DOCUMENT_ROOT'] . '/config/sitemap/recents/';
    $a = [];
    $ids = [];
    foreach (new DirectoryIterator($d) as $fileinfo) {
      if (!$fileinfo->isDot()) {
        $f = $d . $fileinfo->getFilename();
        $g = wpfile::i()->gjson($f);
        if ($g) {
          $a[] = $g->items[0];
          $ids[] = $g->items[0]->id;
        }
      }
    }
    if ($json && (is_array($json) || is_object($json))) {
      if (isset($json->items[0])) {
        if (isset($json->items[0]->id)) {
          $id = (isset($json->id->videoId) ? $json->id->videoId : (isset($json->id) ? $json->id : (isset($json->items[0]->id) ? $json->items[0]->id : null)));
          if ($id && !in_array($id, $ids)) {
            file_put_contents($fn, (is_array($json) || is_object($json) ? $this->cj($json) : $json));
          }
        }
      }
    }

    if (is_string($json) && false !== strpos($json, 'nav')) {
      $n = [];
      foreach ($ids as $id) {
        if ('yt-nav' == $json) {
          $n[] = '/youtube/details/' . $id;
        }
      }

      return $n;
    } else {
      return $a;
    }
  }

  public function vardump(...$array)
  {
    $this->hj();
    exit(var_dump($array));
  }

  public function fullurl($params = true)
  {
    $uri = $_SERVER['REQUEST_URI'];
    if (!$params) {
      $uri = strtok($uri, '?');
    }

    return (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://{$_SERVER['HTTP_HOST']}{$uri}";
  }

  public function ce($str, $ps = false, $salt = 'salt', $iv = '1111111111111111', $i = 999)
  {
    if (!$ps) {
      $ps = (get_option('crypto-pass') ? get_option('crypto-pass') : $this->def()->pass);
    }
    $key = \hash_pbkdf2('sha256', $ps, $salt, $i, 64);
    $encryptedData = \openssl_encrypt($str, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, $iv);

    return \base64_encode($encryptedData);
  }

  public function de($b64, $ps = null, $salt = 'salt', $iv = '1111111111111111', $i = 999)
  {
    if (!$ps) {
      $ps = (get_option('crypto-pass') ? get_option('crypto-pass') : $this->def()->pass);
    }
    $encryptedText = \base64_decode($b64);
    $key = \hash_pbkdf2('sha256', $ps, $salt, $i, 64);
    $decryptedText = \openssl_decrypt($encryptedText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, $iv);

    return $decryptedText;
  }

  public function phpv($n)
  {
    return (defined('PHP_MAJOR_VERSION') && PHP_MAJOR_VERSION >= $n) || (strnatcmp(phpversion(), $n) >= 0);
  }
}

class wpfile
{
  public function __construct()
  {
    $this->document = $_SERVER['DOCUMENT_ROOT'];
  }

  public static function i()
  {
    return new self();
  }

  public function get($f)
  {
    if (file_exists($f)) {
      return file_get_contents($f);
    }
  }

  public function gjson($f)
  {
    $g = $this->get($f);
    $j = json_decode($g);
    if ($j) {
      return $j;
    }
  }

  public function update_google()
  {
    $file = dimas::i()->file($this->document . '/config/google.json', []);
    $f = $this->gjson($file);
    if (isset($f->key) && $f->key && (!get_option('google_key') || get_option('google_key') != $f->key)) {
      update_option('google_key', $f->key);
    }
    if (isset($f->config->web)) {
      $w = $f->config->web;
      if (isset($w->client_id) && $w->client_id && (!get_option('google_id') || get_option('google_id') != $w->client_id)) {
        update_option('google_id', $w->client_id);
      }
      if (isset($w->client_secret) && $w->client_secret && (!get_option('google_secret') || get_option('google_secret') != $w->client_secret)) {
        update_option('google_secret', $w->client_id);
      }
      if (get_option('google_secret') == $w->client_secret && get_option('google_id') == $w->client_id && get_option('google_key') == $f->key) {
        return ['success' => 'google update success'];
      }
    }
  }
}
