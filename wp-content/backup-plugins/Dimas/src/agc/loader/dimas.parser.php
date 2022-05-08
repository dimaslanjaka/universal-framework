<?php
class AGCPARSER {

public function fixhtml($html)
  {
    $domnew = new \DOMDocument('1.0', 'UTF-8');
    libxml_use_internal_errors(true);
    $domnew->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
    $xpath = new DOMXpath($domnew);

    return $domnew->saveHTML();
  }
}