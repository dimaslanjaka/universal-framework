<?php

class SmartDOMXpath extends DOMXpath
{
  public function __construct(\DOMDocument $dom)
  {
    parent::__construct($dom);
  }

  /**
   * Query selector
   *
   * @param string $expression
   * @param boolean $contextnode
   * @param boolean $registerNodeNS
   * @return \DOMNodeList[]|\DOMNode[]|\DOMElement[]
   */
  function query($expression, $contextnode = null, $registerNodeNS = true)
  {
    return parent::query($expression, $contextnode, $registerNodeNS);
  }
}
