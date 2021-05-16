<?php

namespace HTML;

use DOMDocument;
use DOMElement;
use MVC\Exception;
use MVC\helper;

class element
{
  public $dom;
  public $version;
  public $encoding;
  public static $static;
  /**
   * DOMElement.
   *
   * @var DOMElement
   */
  public $element;

  public function __construct($version = '1.0', $encoding = 'utf-8')
  {
    $this->version = $version;
    $this->encoding = $encoding;
    $this->dom = new DOMDocument($version, $encoding);
    self::$static = new DOMDocument($version, $encoding);
  }

  /**
   * Array to element.
   *
   * @return \HTML\array2element
   */
  public function array2el()
  {
    return new array2element();
  }

  public function pre($content, $options = ['echo' => true])
  {
    if ($this->isArrObj($content)) {
      $content = json_encode($content, false, true);
    }
    $element = "<pre>$content</pre>";
    if ($options['echo']) {
      echo $content;
    } else {
      return $content;
    }
  }

  /**
   * var_dump inside pretext.
   */
  public function htmlvar_dump($content)
  {
    echo '<pre>';
    var_dump($content);
    echo '</pre>';
  }

  public function script(array $source = [], $html = false, $print = false)
  {
    foreach ($source as $path) {
      $src_ = $this->get_local_asset($path);
      if ($html) {
        if ($src_) {
          $html = '<script src="' . $src_ . '"></script>';
          if ($print) {
            echo $html;
          } else {
            return $html;
          }
        } else {
          echo "<!-- $path not found -->";
        }
      } else {
        if ($src_) {
          helper::include_asset($src_);
        }
      }
    }
  }

  public function direct(string $element, string $content, array $attr = [])
  {
    $create = $this->dom->createElement($element, $content);
    if (!empty($attributes)) {
      $create = $this->fill_attributes($create, $attr);
    }
    var_dump($create);
    $this->dom->appendChild($create);

    return $this->dom->saveHTML();
  }

  public function css(array $source)
  {
    $result = '';
    $config = defined('CONFIG') && isset(CONFIG['cache']['key']) ? '?cache=' . CONFIG['cache']['key'] : '';
    foreach ($source as $path) {
      $path .= $config;
      $result .= '<link rel="stylesheet" href="' . $path . '">';
    }

    return $result;
  }

  public function js(array $source)
  {
    $result = '';
    $config = defined('CONFIG') && isset(CONFIG['cache']['key']) ? '?cache=' . CONFIG['cache']['key'] : '';
    foreach ($source as $path) {
      if (!empty($path)) {
        $path .= $config;
        $result .= '<script src="' . $path . '"></script>';
      }
    }

    return $result;
  }

  /**
   * Proxy CSS.
   *
   * @param bool   $html
   * @param bool   $print
   * @param string $rel
   */
  public function link(array $source = [], $html = false, $print = false, $rel = 'stylesheet')
  {
    foreach ($source as $path) {
      $src_ = $this->get_local_asset($path);
      if ($html) {
        if ($src_) {
          $html = '<link href="' . $src_ . '" rel="' . $rel . '" />';
          if ($print) {
            echo $html;
          } else {
            return $html;
          }
        } else {
          echo "<!-- $path not found -->";
        }
      } else {
        if ($src_) {
          helper::include_asset($src_);
        }
      }
    }
  }

  public function get_local_asset($path)
  {
    if (is_string($path) && filter_var($path, FILTER_VALIDATE_URL)) {
      $src_ = $path;
    } else {
      if (is_string($path)) {
        $src_ = helper::asset_find([$path]);
      } elseif (is_array($path)) {
        $src_ = helper::asset_find($path);
      } else {
        throw new Exception('path required string or array, instead of ' . gettype($path), 1);
      }
      if ($src_) {
        $src_ = helper::webkit_asset($src_);
      }
    }

    return $src_;
  }

  /**
   * echo print_r in pretext.
   *
   * @param mixed $str
   */
  public function printr(...$str)
  {
    echo '<pre>';
    foreach ($str as $string) {
      print_r($string);
    }
    echo '</pre>';
  }

  public function select($attributes = [])
  {
    $select = $this->dom->createElement('select');
    foreach ($attributes as $key => $value) {
      if ('option' == $key) {
        continue;
      }
      $select->setAttribute($key, (string) $value);
    }
    if (isset($attributes['option'])) {
      foreach ($attributes['option'] as $option_attr) {
        $option = $this->single_create('option', $option_attr['inner'], $option_attr);
        $select->appendChild($option);
      }
    }
    $this->dom->appendChild($select);

    return $this;
  }

  public function single_create(string $element, $content = '', array $attributes = [])
  {
    if (empty($attributes) && is_array($content)) {
      $attributes = $content;
      $content = '';
    }
    $element = $this->dom->createElement($element, $content);
    if (!empty($attributes)) {
      $element = $this->fill_attributes($element, $attributes);
    }

    return $element;
  }

  public function create(string $element, $content = '', array $attributes = [], array $options = ['formatOutput' => false])
  {
    if ('select' == $element) {
      return $this->select($attributes);
    }
    if (empty($attributes) && is_array($content)) {
      $attributes = $content;
      $content = '';
    }
    //exit(var_dump($attributes, $content));
    $element = $this->dom->createElement($element, $content);
    if (!empty($attributes)) {
      $element = $this->fill_attributes($element, $attributes);
    }
    $this->dom->appendChild($element);

    return $this;
  }

  public function fill_attributes(DOMElement $element, array $attributes)
  {
    foreach ($attributes as $key => $value) {
      $element->setAttribute($key, (string) $value);
    }

    return $element;
  }

  public function outerText()
  {
    $save = $this->dom->saveHTML();
    $this->dom = new DOMDocument($this->version, $this->encoding);

    return $save;
  }

  public function isArrObj($str)
  {
    return is_array($str) || is_object($str);
  }
}
