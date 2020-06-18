<?php

/**
 * Query selector
 *  @method \DOMNodeList[]|\DOMNode[]|\DOMElement[] query(string $expression, \DOMNode $contextnode, boolean $registerNodeNS)
 */
class SmartDOMXpath extends DOMXpath
{
  public function __construct(\DOMDocument $dom)
  {
    parent::__construct($dom);
  }
}
