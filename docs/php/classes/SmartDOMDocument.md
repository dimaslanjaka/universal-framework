# [Universal Framework PHP Documentation](../home.md)

# Class: \SmartDOMDocument
### Namespace: [\](../namespaces/default.md)
---
**Summary:**

This class overcomes a few common annoyances with the DOMDocument class,
such as saving partial HTML without automatically adding extra tags
and properly recognizing various encodings, specifically UTF-8.

---
### Constants
* No constants found
---
### Properties
* [public $load_uid](../classes/SmartDOMDocument.md#property_load_uid)
* [public $root_uid](../classes/SmartDOMDocument.md#property_root_uid)
* [protected $xpath](../classes/SmartDOMDocument.md#property_xpath)
---
### Methods
* [public __construct()](../classes/SmartDOMDocument.md#method___construct)
* [public genHash()](../classes/SmartDOMDocument.md#method_genHash)
* [public testHTML()](../classes/SmartDOMDocument.md#method_testHTML)
* [public loadHTML()](../classes/SmartDOMDocument.md#method_loadHTML)
* [public __toString()](../classes/SmartDOMDocument.md#method___toString)
* [public saveHTMLExact()](../classes/SmartDOMDocument.md#method_saveHTMLExact)
* [public querySelector()](../classes/SmartDOMDocument.md#method_querySelector)
* [public querySelectorAll()](../classes/SmartDOMDocument.md#method_querySelectorAll)
* [public selector2XPath()](../classes/SmartDOMDocument.md#method_selector2XPath)
---
### Details
* File: [shim\SmartDOMDocument.php](../files/shim.SmartDOMDocument.md)
* Package: Default
* Class Hierarchy: 
  * [\DOMDocument]()
  * \SmartDOMDocument
* See Also:
  * [http://beerpla.net](http://beerpla.net)
  * [http://www.php.net/manual/en/class.domdocument.php](http://www.php.net/manual/en/class.domdocument.php)
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Artem Russakovskii |
| author |  | Dimas Lanjaka <dimaslanjaka@gmail.com> |
| version | 0.4.2 |  |
---
## Properties
<a name="property_load_uid"></a>
#### public $load_uid : 
---
**Type:** 

**Details:**


<a name="property_root_uid"></a>
#### public $root_uid : 
---
**Type:** 

**Details:**


<a name="property_xpath"></a>
#### protected $xpath : \DOMXPath
---
**Type:** \DOMXPath

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $version = &#039;&#039;,   $encoding = &#039;&#039;) 
```

**Details:**
* Inherited From: [\SmartDOMDocument](../classes/SmartDOMDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $version  |  |
| <code></code> | $encoding  |  |




<a name="method_genHash" class="anchor"></a>
#### public genHash() 

```
public genHash(  $bytes) 
```

**Details:**
* Inherited From: [\SmartDOMDocument](../classes/SmartDOMDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $bytes  |  |




<a name="method_testHTML" class="anchor"></a>
#### public testHTML() 

```
Static public testHTML() 
```

**Summary**

This test functions shows an example of SmartDOMDocument in action.

**Description**

A sample HTML fragment is loaded.
Then, the first image in the document is cut out and saved separately.
It also shows that Russian characters are parsed correctly.

**Details:**
* Inherited From: [\SmartDOMDocument](../classes/SmartDOMDocument.md)




<a name="method_loadHTML" class="anchor"></a>
#### public loadHTML() : boolean

```
public loadHTML(string  $html, string  $encoding = &#039;UTF-8&#039;) : boolean
```

**Summary**

Load HTML with a proper encoding fix/hack.

**Description**

Borrowed from the link below.

**Details:**
* Inherited From: [\SmartDOMDocument](../classes/SmartDOMDocument.md)
* See Also:
 * [http://www.php.net/manual/en/domdocument.loadhtml.php](http://www.php.net/manual/en/domdocument.loadhtml.php)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $html  |  |
| <code>string</code> | $encoding  |  |

**Returns:** boolean


<a name="method___toString" class="anchor"></a>
#### public __toString() 

```
public __toString() 
```

**Summary**

Adds an ability to use the SmartDOMDocument object as a string in a string context.

**Description**

For example, echo "Here is the HTML: $dom";.

**Details:**
* Inherited From: [\SmartDOMDocument](../classes/SmartDOMDocument.md)




<a name="method_saveHTMLExact" class="anchor"></a>
#### public saveHTMLExact() : string

```
public saveHTMLExact() : string
```

**Summary**

Return HTML while stripping the annoying auto-added <html>, <body>, and doctype.

**Details:**
* Inherited From: [\SmartDOMDocument](../classes/SmartDOMDocument.md)
* See Also:
 * [http://php.net/manual/en/migration52.methods.php](http://php.net/manual/en/migration52.methods.php)

**Returns:** string


<a name="method_querySelector" class="anchor"></a>
#### public querySelector() : \DOMElement&amp;#124;null

```
public querySelector(string  $selector) : \DOMElement&amp;#124;null
```

**Summary**

Query node by css selector.

**Details:**
* Inherited From: [\SmartDOMDocument](../classes/SmartDOMDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $selector  |  |

**Returns:** \DOMElement&#124;null


<a name="method_querySelectorAll" class="anchor"></a>
#### public querySelectorAll() : \DOMNodeList&amp;#124;\DOMElement&amp;#124;null

```
public querySelectorAll(string  $selector, boolean  $first = false) : \DOMNodeList&amp;#124;\DOMElement&amp;#124;null
```

**Summary**

Query nodes by css selector.

**Details:**
* Inherited From: [\SmartDOMDocument](../classes/SmartDOMDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $selector  |  |
| <code>boolean</code> | $first  | return only first node |

**Returns:** \DOMNodeList&#124;\DOMElement&#124;null


<a name="method_selector2XPath" class="anchor"></a>
#### public selector2XPath() 

```
Static public selector2XPath(  $selector) 
```

**Summary**

Convert selector to XPath string.

**Details:**
* Inherited From: [\SmartDOMDocument](../classes/SmartDOMDocument.md)
* See Also:
 * [https://github.com/tj/php-selector/blob/master/selector.inc](https://github.com/tj/php-selector/blob/master/selector.inc)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $selector  |  |





---

### Top Namespaces

* [\Accounting](../namespaces/Accounting.md)
* [\AGC](../namespaces/AGC.md)
* [\agc_service](../namespaces/agc_service.md)
* [\Bulletproof](../namespaces/Bulletproof.md)
* [\Cookie](../namespaces/Cookie.md)
* [\Crypto](../namespaces/Crypto.md)
* [\DB](../namespaces/DB.md)
* [\DDOS](../namespaces/DDOS.md)
* [\Extender](../namespaces/Extender.md)
* [\Facebook](../namespaces/Facebook.md)
* [\Filemanager](../namespaces/Filemanager.md)
* [\GoogleExt](../namespaces/GoogleExt.md)
* [\HTML](../namespaces/HTML.md)
* [\IMEI](../namespaces/IMEI.md)
* [\img](../namespaces/img.md)
* [\Indosat](../namespaces/Indosat.md)
* [\JSON](../namespaces/JSON.md)
* [\MrShan0](../namespaces/MrShan0.md)
* [\MVC](../namespaces/MVC.md)
* [\Naneau](../namespaces/Naneau.md)
* [\Netscape](../namespaces/Netscape.md)
* [\Office](../namespaces/Office.md)
* [\PHPWee](../namespaces/PHPWee.md)
* [\Proxy](../namespaces/Proxy.md)
* [\Session](../namespaces/Session.md)
* [\simplehtmldom](../namespaces/simplehtmldom.md)
* [\Telkomsel](../namespaces/Telkomsel.md)
* [\TestBootstrap](../namespaces/TestBootstrap.md)
* [\Typehint](../namespaces/Typehint.md)
* [\UniversalFramework](../namespaces/UniversalFramework.md)
* [\User](../namespaces/User.md)

---

### Reports
* [Errors - 1884](../reports/errors.md)
* [Markers - 8](../reports/markers.md)
* [Deprecated - 0](../reports/deprecated.md)

---

This document was automatically generated from source code comments on 2021-05-19 using [phpDocumentor](http://www.phpdoc.org/) and [fr3nch13/phpdoc-markdown](https://github.com/fr3nch13/phpdoc-markdown)
