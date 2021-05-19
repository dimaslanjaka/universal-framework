# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssOtbsFormatter
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

{@link aCssFromatter Formatter} returning the CSS source in {@link http://goo.gl/j4XdU OTBS indent style} (The One True Brace Style).

**Description:**

Every formatter have to extend this class.

---
### Constants
* No constants found
---
### Properties
* [protected $indent](../classes/PHPWee.aCssFormatter.md#property_indent)
* [protected $padding](../classes/PHPWee.aCssFormatter.md#property_padding)
* [protected $tokens](../classes/PHPWee.aCssFormatter.md#property_tokens)
---
### Methods
* [public __construct()](../classes/PHPWee.aCssFormatter.md#method___construct)
* [public __toString()](../classes/PHPWee.CssOtbsFormatter.md#method___toString)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy: 
  * [\PHPWee\aCssFormatter](../classes/PHPWee.aCssFormatter.md)
  * \PHPWee\CssOtbsFormatter
* See Also:
  * [http://code.google.com/p/cssmin/](http://code.google.com/p/cssmin/)
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Joe Scylla <joe.scylla@gmail.com> |
| copyright |  | 2008 - 2011 Joe Scylla <joe.scylla@gmail.com> |
| license |  | http://opensource.org/licenses/mit-license.php MIT License |
| version | 3.0.1 |  |
---
## Properties
<a name="property_indent"></a>
#### protected $indent : string
---
**Summary**

Indent string.

**Type:** string

**Details:**
* Inherited From: [\PHPWee\aCssFormatter](../classes/PHPWee.aCssFormatter.md)


<a name="property_padding"></a>
#### protected $padding : integer
---
**Summary**

Declaration padding.

**Type:** integer

**Details:**
* Inherited From: [\PHPWee\aCssFormatter](../classes/PHPWee.aCssFormatter.md)


<a name="property_tokens"></a>
#### protected $tokens : array
---
**Summary**

Tokens.

**Type:** array

**Details:**
* Inherited From: [\PHPWee\aCssFormatter](../classes/PHPWee.aCssFormatter.md)



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(array  $tokens, string  $indent = null, integer  $padding = null) 
```

**Summary**

Constructor.

**Details:**
* Inherited From: [\PHPWee\aCssFormatter](../classes/PHPWee.aCssFormatter.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $tokens  | Array of CssToken |
| <code>string</code> | $indent  | Indent string [optional] |
| <code>integer</code> | $padding  | Declaration value padding [optional] |




<a name="method___toString" class="anchor"></a>
#### public __toString() : string

```
public __toString() : string
```

**Summary**

Implements {@link aCssFormatter::__toString()}.

**Details:**
* Inherited From: [\PHPWee\CssOtbsFormatter](../classes/PHPWee.CssOtbsFormatter.md)

**Returns:** string



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
