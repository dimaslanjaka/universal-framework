<?php

namespace HTML;

use DOMElement;

class XDOMElement extends DOMElement
{
  public function __construct($name, $value = null, $namespaceURI = null)
  {
    parent::__construct($name, null, $namespaceURI);
  }
}
