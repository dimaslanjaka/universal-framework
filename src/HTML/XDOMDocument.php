<?php

namespace HTML;

use DOMDocument;
use DOMText;

class XDOMDocument extends DOMDocument
{
    public function __construct($version = null, $encoding = null)
    {
        parent::__construct($version, $encoding);
        $this->registerNodeClass('DOMElement', 'XDOMElement');
    }

    public function createElement($name, $value = null, $namespaceURI = null)
    {
        $element = new XDOMElement($name, $value, $namespaceURI);
        $element = $this->importNode($element);
        if (!empty($value)) {
            $element->appendChild(new DOMText($value));
        }

        return $element;
    }
}
