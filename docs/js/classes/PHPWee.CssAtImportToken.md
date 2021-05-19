# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssAtImportToken
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

This {@link aCssToken CSS token} represents a @import at-rule.

**Description:**

Every token has to extend this class.

---
### Constants
* No constants found
---
### Properties
* [public $Import](../classes/PHPWee.CssAtImportToken.md#property_Import)
* [public $MediaTypes](../classes/PHPWee.CssAtImportToken.md#property_MediaTypes)
---
### Methods
* [public __toString()](../classes/PHPWee.CssAtImportToken.md#method___toString)
* [public __construct()](../classes/PHPWee.CssAtImportToken.md#method___construct)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy: 
  * [\PHPWee\aCssToken](../classes/PHPWee.aCssToken.md)
  * \PHPWee\CssAtImportToken
* See Also:
  * [http://code.google.com/p/cssmin/](http://code.google.com/p/cssmin/)
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Joe Scylla <joe.scylla@gmail.com> |
| copyright |  | 2008 - 2011 Joe Scylla <joe.scylla@gmail.com> |
| license |  | http://opensource.org/licenses/mit-license.php MIT License |
| version | 3.0.1.b1 | (2001-02-22) |
---
## Properties
<a name="property_Import"></a>
#### public $Import : string
---
**Summary**

Import path of the @import at-rule.

**Type:** string

**Details:**


<a name="property_MediaTypes"></a>
#### public $MediaTypes : array
---
**Summary**

Media types of the @import at-rule.

**Type:** array

**Details:**



---
## Methods
<a name="method___toString" class="anchor"></a>
#### public __toString() : string

```
public __toString() : string
```

**Summary**

Implements {@link aCssToken::__toString()}.

**Details:**
* Inherited From: [\PHPWee\CssAtImportToken](../classes/PHPWee.CssAtImportToken.md)

**Returns:** string


<a name="method___construct" class="anchor"></a>
#### public __construct() : void

```
public __construct(string  $import, array  $mediaTypes) : void
```

**Summary**

Set the properties of a @import at-rule token.

**Details:**
* Inherited From: [\PHPWee\CssAtImportToken](../classes/PHPWee.CssAtImportToken.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $import  | Import path |
| <code>array</code> | $mediaTypes  | Media types |

**Returns:** void



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
