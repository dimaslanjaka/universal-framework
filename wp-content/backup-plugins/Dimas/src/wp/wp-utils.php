<?php
class router extends dimas
{
  public $result;
  public $sources;
  public $request;
  private static $_instance = null;

  public function __construct($opt = null)
  {
    $this->root_dir = $_SERVER['DOCUMENT_ROOT'];
    $this->default_dir = get_option('site_default');
    $this->uri = $_SERVER['REQUEST_URI'];
    $this->full = (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $this->request = preg_split('/[& ? .]/', rtrim(ltrim($this->uri, '/'), '/'))[0];
    $this->noparam = strtok($this->uri, '?');
    $this->parsed = parse_url($this->full);
    $this->subrequest = explode('/', $this->request);
    $this->trimrequest = rtrim(rtrim($this->request, end($this->subrequest)), '/');
    $this->view_dir = $this->root_dir . '/views';
    $this->form_dir = $this->view_dir . '/forms';
    $this->meta_dir = $this->view_dir . '/meta';
  }

  public static function getInstance()
  {
    if (self::$_instance === null) {
      self::$_instance = new self;
    }

    return self::$_instance;
  }

  public function src($str = null)
  {
    $this->sources = $this->view_dir . '/' . $this->default_dir . $this->parsed['path'];
    if (!headers_sent()) {
      if (preg_match('/\.css$/s', $this->sources)) {
        header('Content-type: text/css; charset=utf-8', true);
      } elseif (preg_match('/\.js$/s', $this->sources)) {
        header('Content-Type: application/javascript; charset=utf-8', true);
      }
      if (file_exists($this->sources)) {
        echo file_get_contents($this->sources);
      }
    }

    return $this;
  }

  public function main()
  {
    $this->view_dir .= $this->fix(get_option('site_default'));
    $this->form_dir .= $this->fix(get_option('site_default'));
    $this->meta_dir .= $this->fix(get_option('site_default'));

    return $this;
  }

  public function fetch()
  {
    $this->view_dir .= $this->fix($this->request);
    $this->form_dir .= $this->fix($this->request);
    $this->meta_dir .= $this->fix($this->request);

    return $this;
  }

  public function add($str)
  {
    $this->view_dir .= $this->fix($str);
    $this->form_dir .= $this->fix($str);
    $this->meta_dir .= $this->fix($str);

    return $this;
  }

  public function fix($x)
  {
    return dimas::i()->fix_slash('/' . $x);
  }

  public static function i()
  {
    return self::getInstance();
  }

  public function form()
  {
    $this->result = $this->form_dir . $this->fix($this->request);

    return $this;
  }

  public function view()
  {
    $this->result = $this->view_dir . $this->fix($this->request);

    return $this;
  }

  public function content()
  {
    $f = $this->view_dir; //. $this->fix($this->request);
    $fe = explode('/', $f);
    if (file_exists($f . '.php')) {
      return $f;
    } else {
      //$fe = array_helper::i()->rtrim($fe);

      return $fe; //implode('/', $fe);
    }
  }

  public function php($n)
  {
    $n .= '.php';
    if (file_exists($n)) {
      return $n;
    } else {
      return false;
    }
  }
}

class array_helper
{
  public $result;
  public $string;
  private static $_instance = null;

  public static function i()
  {
    if (self::$_instance === null) {
      self::$_instance = new self;
    }

    return self::$_instance;
  }

  public function rtrim($array = false)
  {
    if (!$array && is_array($this->result)) {
      $array = $this->result;
    }
    unset($array[count($array) - 1]);
    $this->result = $array;

    return $this;
  }

  public function remove($str, $substr)
  {
    if (is_string($this->string)) {
      return str_replace($str, $substr, $this->string);
    }
  }

  public function set($arr)
  {
    if (is_string($arr)) {
      $this->string = $arr;
    } elseif (is_array($arr)) {
      $this->result = $arr;
    }

    return $this;
  }

  public function unique($arr = false)
  {
    if (!$arr && $this->result) {
      $this->result = array_unique($this->result);

      return $this;
    } elseif (is_array($arr)) {
      return array_unique($arr);
    }
  }

  public function explode($str, $substr = false)
  {
    if (!$substr && is_string($this->string)) {
      $substr = $this->string;
    }
    $this->result = explode($str, $substr);

    return $this;
  }

  public function implode($str, $arr = false)
  {
    if ($this->result) {
      $this->string = implode($str, $this->result);

      return $this;
    } elseif (is_array($arr)) {
      return implode($str, $arr);
    }
  }

  public function add($str)
  {
    if (is_string($this->string)) {
      $this->string .= $str;

      return $this;
    }
  }
}
