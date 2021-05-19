# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssError
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

CSS Error.

---
### Constants
* No constants found
---
### Properties
* [public $File](../classes/PHPWee.CssError.md#property_File)
* [public $Line](../classes/PHPWee.CssError.md#property_Line)
* [public $Message](../classes/PHPWee.CssError.md#property_Message)
* [public $Source](../classes/PHPWee.CssError.md#property_Source)
---
### Methods
* [public __construct()](../classes/PHPWee.CssError.md#method___construct)
* [public __toString()](../classes/PHPWee.CssError.md#method___toString)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy:
  * \PHPWee\CssError
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
<a name="property_File"></a>
#### public $File : string
---
**Summary**

File.

**Type:** string

**Details:**


<a name="property_Line"></a>
#### public $Line : integer
---
**Summary**

Line.

**Type:** integer

**Details:**


<a name="property_Message"></a>
#### public $Message : string
---
**Summary**

Error message.

**Type:** string

**Details:**


<a name="property_Source"></a>
#### public $Source : string
---
**Summary**

Source.

**Type:** string

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() : void

```
public __construct(  $file,   $line, string  $message, string  $source = &#039;&#039;) : void
```

**Summary**

Constructor triggering the error.

**Details:**
* Inherited From: [\PHPWee\CssError](../classes/PHPWee.CssError.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $file  |  |
| <code></code> | $line  |  |
| <code>string</code> | $message  | Error message |
| <code>string</code> | $source  | Corresponding line [optional] |

**Returns:** void


<a name="method___toString" class="anchor"></a>
#### public __toString() : string

```
public __toString() : string
```

**Summary**

Returns the error as formatted string.

**Details:**
* Inherited From: [\PHPWee\CssError](../classes/PHPWee.CssError.md)

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
