<?php

require_once __DIR__ . '/../vendor/autoload.php';

use phpDocumentor\Reflection\DocBlockFactory;

$factory = DocBlockFactory::createInstance();
$docComment = <<<DOCCOMMENT
/**
 * This is an example of a summary.
 *
 * This is a Description. A Summary and Description are separated by either
 * two subsequent newlines (thus a whiteline in between as can be seen in this
 * example), or when the Summary ends with a dot (`.`) and some form of
 * whitespace.
 */
DOCCOMMENT;

$docblock = $factory->create($docComment);

// Contains the summary for this DocBlock
$summary = $docblock->getSummary();

// Contains \phpDocumentor\Reflection\DocBlock\Description object
$description = $docblock->getDescription();

// You can either cast it to string
$description = (string) $docblock->getDescription();

// Or use the render method to get a string representation of the Description.
$description = $docblock->getDescription()->render();