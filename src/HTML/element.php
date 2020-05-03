<?php

namespace HTML;

use DOMDocument;
use DOMElement;

class element
{
  public $dom;
  public $version;
  public $encoding;
  public static $static;
  /**
   * DOMElement
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
