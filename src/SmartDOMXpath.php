<?php

/**
 * Query selector.
 *
 *  @method \DOMNodeList[]|\DOMNode[]|\DOMElement[]|DOMXpathTypehint[]|object query(string $expression, \DOMNode $contextnode, boolean $registerNodeNS)
 */
class SmartDOMXpath extends DOMXpath
{
  public function __construct(\DOMDocument $dom)
  {
    parent::__construct($dom);
  }

  /**
   * Body Instance
   * ```html
   * <!--get--> <body></body>
   * ```.
   *
   * @return \DOMNode|null
   */
  public function body()
  {
    return $this->query('//body')->item(0);
  }
}

class DOMXpathTypehint
{
  /**
   * Inner html element.
   *
   * @var string
   */
  public $innerHTML;
}

/**
 * Insert after opening body tag.
 *
 * @param string $content
 */
function insertBodyFirst(\SmartDOMXpath $xpath, \DOMNode $content)
{
  $body = $xpath->body();

  return $body->insertBefore($content, $body->firstChild);
}

/**
 * Insert before closing body tag.
 *
 * @param string $content
 */
function insertBodyLast(\SmartDOMXpath $xpath, \DOMNode $content)
{
  $body = $xpath->body();

  return $body->appendChild($content);
}

/**
 * create node text.
 */
function createText(string $string)
{
  return new DOMText($string);
}

/**
 * create script tag
 * ```php
 * $dom = new DOMDocument();
 * $dom->loadHTMLFile('index.html');
 * $script = createScript($dom, ['src'=>'/jquery.js', 'async'=>'true']);
 * $dom->find('body')->item(0)->appendChild($script);
 * ```
 * return instanceof DOMElement.
 */
function createScript(\DOMDocument $dom, array $opt)
{
  if (!isset($opt['innertext'])) {
    $opt['innertext'] = '';
  }
  $script = $dom->createElement('script', $opt['innertext']);
  if (isset($opt['src'])) {
    $script->setAttribute('src', $opt['src']);
    if (isset($opt['cache'])) {
      if (defined('CONFIG')) {
        if (isset(CONFIG['cache']['key'])) {
          $script->setAttribute('src', $opt['src'] . '?' . CONFIG['cache']['key']);
        } else {
          $script->setAttribute('src', $opt['src'] . '?' . md5(serialize(CONFIG)));
        }
      } else {
        $script->setAttribute('src', $opt['src'] . '?' . md5(serialize(latestFile([ROOT]))));
      }
    }
  }
  if (isset($opt['async'])) {
    $script->setAttribute('async', $opt['async']);
  }
  if (isset($opt['defer'])) {
    $script->setAttribute('defer', $opt['defer']);
  }
  if (isset($opt['type'])) {
    $script->setAttribute('type', $opt['type']);
  }

  return $script;
}

/**
 * create Element Node.
 *
 * @param array $opt
 *                   ```php
 *                   $opt = array(array('span' =>
 *                   array('class'=>'badge badge-default','id'=>'label')
 *                   ))
 *                   ```
 */
function createElement(\DOMDocument $dom, array $opt)
{
  $node = null;
  foreach ($opt as $key => $attributes) {
    $node = $dom->createElement($key);
    foreach ($attributes as $key => $value) {
      $node->setAttribute($key, $value);
    }
  }

  return $node;
}

function createMeta(\DOMDocument $doc)
{
  $meta = [
    ['charset' => 'utf-8'],
    ['name' => 'dc.creator', 'content' => 'Foo Bar'],
  ];

  foreach ($meta as $attributes) {
    $node = $doc->createElement('meta');
    foreach ($attributes as $key => $value) {
      $node->setAttribute($key, $value);
    }
  }
}
