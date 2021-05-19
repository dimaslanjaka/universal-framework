# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssRemoveLastDelarationSemiColonMinifierFilter
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

This {@link aCssMinifierFilter minifier filter} sets the IsLast property of any last declaration in a ruleset,.

**Description:**

Minifier filters allows a pre-processing of the parsed token to add, edit or delete tokens. Every minifier filter
has to extend this class.

---
### Constants
* No constants found
---
### Properties
* [protected $configuration](../classes/PHPWee.aCssMinifierFilter.md#property_configuration)
* [protected $minifier](../classes/PHPWee.aCssMinifierFilter.md#property_minifier)
---
### Methods
* [public __construct()](../classes/PHPWee.aCssMinifierFilter.md#method___construct)
* [public apply()](../classes/PHPWee.CssRemoveLastDelarationSemiColonMinifierFilter.md#method_apply)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy: 
  * [\PHPWee\aCssMinifierFilter](../classes/PHPWee.aCssMinifierFilter.md)
  * \PHPWee\CssRemoveLastDelarationSemiColonMinifierFilter
* See Also:
  * [http://code.google.com/p/cssmin/](http://code.google.com/p/cssmin/)
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| font-face |  | at-rule or @page at-rule block. If the property IsLast is TRUE the decrations will get stringified
without tailing semicolon. |
| author |  | Joe Scylla <joe.scylla@gmail.com> |
| copyright |  | 2008 - 2011 Joe Scylla <joe.scylla@gmail.com> |
| license |  | http://opensource.org/licenses/mit-license.php MIT License |
| version | 3.0.1 |  |
---
## Properties
<a name="property_configuration"></a>
#### protected $configuration : array
---
**Summary**

Filter configuration.

**Type:** array

**Details:**
* Inherited From: [\PHPWee\aCssMinifierFilter](../classes/PHPWee.aCssMinifierFilter.md)


<a name="property_minifier"></a>
#### protected $minifier : \PHPWee\CssMinifier
---
**Summary**

The CssMinifier of the filter.

**Type:** <a href="../classes/PHPWee.CssMinifier.html">\PHPWee\CssMinifier</a>

**Details:**
* Inherited From: [\PHPWee\aCssMinifierFilter](../classes/PHPWee.aCssMinifierFilter.md)



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() : void

```
public __construct(\PHPWee\CssMinifier  $minifier, array  $configuration = array()) : void
```

**Summary**

Constructor.

**Details:**
* Inherited From: [\PHPWee\aCssMinifierFilter](../classes/PHPWee.aCssMinifierFilter.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code><a href="../classes/PHPWee.CssMinifier.html">\PHPWee\CssMinifier</a></code> | $minifier  | the CssMinifier object of this plugin |
| <code>array</code> | $configuration  | Filter configuration [optional] |

**Returns:** void


<a name="method_apply" class="anchor"></a>
#### public apply() : integer

```
public apply(array  $tokens) : integer
```

**Summary**

Implements {@link aCssMinifierFilter::filter()}.

**Details:**
* Inherited From: [\PHPWee\CssRemoveLastDelarationSemiColonMinifierFilter](../classes/PHPWee.CssRemoveLastDelarationSemiColonMinifierFilter.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $tokens  | Array of objects of type aCssToken |

**Returns:** integer - Count of added, changed or removed tokens; a return value large than 0 will rebuild the array



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
