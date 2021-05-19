# [Universal Framework PHP Documentation](../home.md)

# Class: \JSLikeHTMLElement
### Namespace: [\](../namespaces/default.md)
---
**Summary:**

JavaScript-like HTML DOM Element.

**Description:**

This class extends PHP's DOMElement to allow
users to get and set the innerHTML property of
HTML elements in the same way it's done in
JavaScript.

Example usage:

```php
require_once 'JSLikeHTMLElement.php';
header('Content-Type: text/plain');
$doc = new DOMDocument();
$doc->registerNodeClass('DOMElement', 'JSLikeHTMLElement');
$doc->loadHTML('<div><p>Para 1</p><p>Para 2</p></div>');
$elem = $doc->getElementsByTagName('div')->item(0);

// print innerHTML
echo $elem->innerHTML; // prints '<p>Para 1</p><p>Para 2</p>'
echo "\n\n";

// set innerHTML
$elem->innerHTML = '<a href="http://fivefilters.org">FiveFilters.org</a>';
echo $elem->innerHTML; // prints '<a href="http://fivefilters.org">FiveFilters.org</a>'
echo "\n\n";

// print document (with our changes)
echo $doc->saveXML();
```

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public __get()](../classes/JSLikeHTMLElement.md#method___get)
* [public __set()](../classes/JSLikeHTMLElement.md#method___set)
* [public __toString()](../classes/JSLikeHTMLElement.md#method___toString)
---
### Details
* File: [shim\JSLikeHTMLElement.php](../files/shim.JSLikeHTMLElement.md)
* Package: Default
* Class Hierarchy: 
  * [\DOMElement]()
  * \JSLikeHTMLElement
* See Also:
  * [(the project this was written for)](http://fivefilters.org)
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Keyvan Minoukadeh - http://www.keyvan.net - keyvan@keyvan.net |

---
## Methods
<a name="method___get" class="anchor"></a>
#### public __get() 

```
public __get(  $name) 
```

**Summary**

Used for getting innerHTML like it's done in JavaScript:.

**Details:**
* Inherited From: [\JSLikeHTMLElement](../classes/JSLikeHTMLElement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |



##### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| code |  | $string = $div->innerHTML; |
| endcode |  |  |

<a name="method___set" class="anchor"></a>
#### public __set() 

```
public __set(  $name,   $value) 
```

**Summary**

Used for setting innerHTML like it's done in JavaScript:.

**Details:**
* Inherited From: [\JSLikeHTMLElement](../classes/JSLikeHTMLElement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $value  |  |



##### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| code |  | $div->innerHTML = '<h2>Chapter 2</h2><p>The story begins...</p>'; |
| endcode |  |  |

<a name="method___toString" class="anchor"></a>
#### public __toString() 

```
public __toString() 
```

**Details:**
* Inherited From: [\JSLikeHTMLElement](../classes/JSLikeHTMLElement.md)





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
