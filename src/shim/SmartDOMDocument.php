<?php

/**
 * This class overcomes a few common annoyances with the DOMDocument class,
 * such as saving partial HTML without automatically adding extra tags
 * and properly recognizing various encodings, specifically UTF-8.
 *
 * @author Artem Russakovskii
 *
 * @version 0.4.2
 *
 * @see http://beerpla.net
 * @see http://www.php.net/manual/en/class.domdocument.php
 *
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
class SmartDOMDocument extends DOMDocument
{
    public $load_uid = '';
    public $root_uid = '';
    /**
     * @var DOMXPath
     */
    protected $xpath;

    public function __construct($version = '', $encoding = '')
    {
        parent::__construct($version, $encoding);
        $this->root_uid = $this->genHash(10);
        $this->registerNodeClass('DOMElement', 'JSLikeHTMLElement');
    }

    public function genHash($bytes)
    {
        return bin2hex(openssl_random_pseudo_bytes($bytes));
    }

    /**
     * This test functions shows an example of SmartDOMDocument in action.
     * A sample HTML fragment is loaded.
     * Then, the first image in the document is cut out and saved separately.
     * It also shows that Russian characters are parsed correctly.
     */
    public static function testHTML()
    {
        $content = <<<CONTENT
<div class='class1'>
  <img src='http://www.google.com/favicon.ico' />
  Some Text
  <p>русский</p>
</div>
CONTENT;

        echo "Before removing the image, the content is: \n" . htmlspecialchars($content) . "<br>\n";

        $content_doc = new SmartDOMDocument();
        $content_doc->loadHTML($content);

        try {
            $first_image = $content_doc->getElementsByTagName('img')->item(0);

            if ($first_image) {
                $first_image->parentNode->removeChild($first_image);

                $content = $content_doc->saveHTMLExact();

                $image_doc = new SmartDOMDocument();
                $image_doc->appendChild($image_doc->importNode($first_image, true));
                $image = $image_doc->saveHTMLExact();
            }
        } catch (Exception $e) {
        }

        echo "After removing the image, the content is: \n" . htmlspecialchars($content) . "<br>\n";
        echo "The image is: \n" . htmlspecialchars($image);
    }

    /**
     * Load HTML with a proper encoding fix/hack.
     * Borrowed from the link below.
     *
     * @see http://www.php.net/manual/en/domdocument.loadhtml.php
     *
     * @param string $html
     * @param string $encoding
     *
     * @return bool
     */
    public function loadHTML($html, $encoding = 'UTF-8')
    {
        libxml_use_internal_errors(true);
        $html = mb_convert_encoding($html, 'HTML-ENTITIES', $encoding);
        $load = @parent::loadHTML($html); // suppress warnings
        libxml_use_internal_errors(false);
        $this->load_uid = $this->genHash(5);

        return $load;
    }

    /**
     * Adds an ability to use the SmartDOMDocument object as a string in a string context.
     * For example, echo "Here is the HTML: $dom";.
     */
    public function __toString()
    {
        return $this->saveHTMLExact();
    }

    /**
     * Return HTML while stripping the annoying auto-added <html>, <body>, and doctype.
     *
     * @see http://php.net/manual/en/migration52.methods.php
     *
     * @return string
     */
    public function saveHTMLExact()
    {
        $content = preg_replace(
            [
                "/^\<\!DOCTYPE.*?<html><body>/si",
                '!</body></html>$!si',
            ],
            '',
            $this->saveHTML()
        );

        return $content;
    }

    /**
     * Query node by css selector.
     *
     * @param string $selector
     *
     * @return DOMElement|null
     */
    public function querySelector($selector)
    {
        return $this->querySelectorAll($selector, true);
    }

    /**
     * Query nodes by css selector.
     *
     * @param string $selector
     * @param bool $first return only first node
     *
     * @return DOMNodeList|DOMElement|null
     */
    public function querySelectorAll($selector, $first = false)
    {
        if (null === $this->xpath) {
            $this->xpath = new DOMXPath($this);
        }
        $elements = $this->xpath->query(static::selector2XPath($selector));
        if ($first) {
            return $elements->length ? $elements->item(0) : null;
        }

        return $elements;
    }

    /**
     * Convert selector to XPath string.
     *
     * @see https://github.com/tj/php-selector/blob/master/selector.inc
     */
    public static function selector2XPath($selector)
    {
        // remove spaces around operators
        $selector = preg_replace('/\s*>\s*/', '>', $selector);
        $selector = preg_replace('/\s*~\s*/', '~', $selector);
        $selector = preg_replace('/\s*\+\s*/', '+', $selector);
        $selector = preg_replace('/\s*,\s*/', ',', $selector);
        $selectors = preg_split('/\s+(?![^\[]+\])/', $selector);
        foreach ($selectors as &$selector) {
            // ,
            $selector = preg_replace('/,/', '|descendant-or-self::', $selector);
            // input:checked, :disabled, etc.
            $selector = preg_replace('/(.+)?:(checked|disabled|required|autofocus)/', '\1[@\2="\2"]', $selector);
            // input:autocomplete, :autocomplete
            $selector = preg_replace('/(.+)?:(autocomplete)/', '\1[@\2="on"]', $selector);
            // input:button, input:submit, etc.
            $selector = preg_replace('/:(text|password|checkbox|radio|button|submit|reset|file|hidden|image|datetime|datetime-local|date|month|time|week|number|range|email|url|search|tel|color)/', 'input[@type="\1"]', $selector);
            // foo[id]
            $selector = preg_replace('/(\w+)\[([_\w-]+[_\w\d-]*)\]/', '\1[@\2]', $selector);
            // [id]
            $selector = preg_replace('/\[([_\w-]+[_\w\d-]*)\]/', '*[@\1]', $selector);
            // foo[id=foo]
            $selector = preg_replace('/\[([_\w-]+[_\w\d-]*)=[\'"]?(.*?)[\'"]?\]/', '[@\1="\2"]', $selector);
            // [id=foo]
            $selector = preg_replace('/^\[/', '*[', $selector);
            // div#foo
            $selector = preg_replace('/([_\w-]+[_\w\d-]*)\#([_\w-]+[_\w\d-]*)/', '\1[@id="\2"]', $selector);
            // #foo
            $selector = preg_replace('/\#([_\w-]+[_\w\d-]*)/', '*[@id="\1"]', $selector);
            // div.foo
            $selector = preg_replace('/([_\w-]+[_\w\d-]*)\.([_\w-]+[_\w\d-]*)/', '\1[contains(concat(" ",@class," ")," \2 ")]', $selector);
            // .foo
            $selector = preg_replace('/\.([_\w-]+[_\w\d-]*)/', '*[contains(concat(" ",@class," ")," \1 ")]', $selector);
            // div:first-child
            $selector = preg_replace('/([_\w-]+[_\w\d-]*):first-child/', '*/\1[position()=1]', $selector);
            // div:last-child
            $selector = preg_replace('/([_\w-]+[_\w\d-]*):last-child/', '*/\1[position()=last()]', $selector);
            // :first-child
            $selector = str_replace(':first-child', '*/*[position()=1]', $selector);
            // :last-child
            $selector = str_replace(':last-child', '*/*[position()=last()]', $selector);
            // :nth-last-child
            $selector = preg_replace('/:nth-last-child\((\d+)\)/', '[position()=(last() - (\1 - 1))]', $selector);
            // div:nth-child
            $selector = preg_replace('/([_\w-]+[_\w\d-]*):nth-child\((\d+)\)/', '*/*[position()=\2 and self::\1]', $selector);
            // :nth-child
            $selector = preg_replace('/:nth-child\((\d+)\)/', '*/*[position()=\1]', $selector);
            // :contains(Foo)
            $selector = preg_replace('/([_\w-]+[_\w\d-]*):contains\((.*?)\)/', '\1[contains(string(.),"\2")]', $selector);
            // >
            $selector = preg_replace('/>/', '/', $selector);
            // ~
            $selector = preg_replace('/~/', '/following-sibling::', $selector);
            // +
            $selector = preg_replace('/\+([_\w-]+[_\w\d-]*)/', '/following-sibling::\1[position()=1]', $selector);
            $selector = str_replace(']*', ']', $selector);
            $selector = str_replace(']/*', ']', $selector);
        }
        // ' '
        $selector = implode('/descendant::', $selectors);
        $selector = 'descendant-or-self::' . $selector;
        // :scope
        $selector = preg_replace('/(((\|)?descendant-or-self::):scope)/', '.\3', $selector);
        // $element
        $sub_selectors = explode(',', $selector);
        foreach ($sub_selectors as $key => $sub_selector) {
            $parts = explode('$', $sub_selector);
            $sub_selector = array_shift($parts);
            if (count($parts) && preg_match_all('/((?:[^\/]*\/?\/?)|$)/', $parts[0], $matches)) {
                $results = $matches[0];
                $results[] = str_repeat('/..', count($results) - 2);
                $sub_selector .= implode('', $results);
            }
            $sub_selectors[$key] = $sub_selector;
        }
        $selector = implode(',', $sub_selectors);

        return $selector;
    }
}

/**
 * Get pure InnerHTML.
 *
 * @param \DOMNode $element
 *
 * @return string
 */
function innerHTML(DOMNode $element)
{
    $innerHTML = '';
    $children = $element->childNodes;

    foreach ($children as $child) {
        $innerHTML .= $element->ownerDocument->saveHTML($child);
    }

    return $innerHTML;
}

/**
 * Get HTML Title.
 *
 * @param \SmartDOMDocument $dom
 *
 * @return string
 */
function getTitle(SmartDOMDocument $dom)
{
    $list = $dom->getElementsByTagName('title');
    if ($list->length > 0) {
        return $list->item(0)->textContent;
    }

    return __FUNCTION__;
}

/**
 * Get function which called current function.
 *
 * @param bool $completeTrace
 *
 * @return string
 */
function getCallingFunctionName($completeTrace = false)
{
    $trace = debug_backtrace();
    if ($completeTrace) {
        $str = '';
        foreach ($trace as $caller) {
            $str .= " -- Called by {$caller['function']}";
            if (isset($caller['class'])) {
                $str .= " From Class {$caller['class']}";
            }
        }
    } else {
        $caller = $trace[2];
        $str = "Called by {$caller['function']}";
        if (isset($caller['class'])) {
            $str .= " From Class {$caller['class']}";
        }
    }

    return $str;
}
