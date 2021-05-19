# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssRulesetDeclarationToken
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

This {@link aCssToken CSS token} represents a ruleset declaration.

**Description:**

Every token has to extend this class.

---
### Constants
* No constants found
---
### Properties
* [public $IsImportant](../classes/PHPWee.aCssDeclarationToken.md#property_IsImportant)
* [public $IsLast](../classes/PHPWee.aCssDeclarationToken.md#property_IsLast)
* [public $Property](../classes/PHPWee.aCssDeclarationToken.md#property_Property)
* [public $Value](../classes/PHPWee.aCssDeclarationToken.md#property_Value)
* [public $MediaTypes](../classes/PHPWee.CssRulesetDeclarationToken.md#property_MediaTypes)
---
### Methods
* [public __construct()](../classes/PHPWee.CssRulesetDeclarationToken.md#method___construct)
* [public __toString()](../classes/PHPWee.aCssToken.md#method___toString)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy:  
  * [\PHPWee\aCssToken](../classes/PHPWee.aCssToken.md)
  * [\PHPWee\aCssDeclarationToken](../classes/PHPWee.aCssDeclarationToken.md)
  * \PHPWee\CssRulesetDeclarationToken
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
<a name="property_IsImportant"></a>
#### public $IsImportant : boolean
---
**Summary**

Is the declaration flagged as important?

**Type:** boolean

**Details:**
* Inherited From: [\PHPWee\aCssDeclarationToken](../classes/PHPWee.aCssDeclarationToken.md)


<a name="property_IsLast"></a>
#### public $IsLast : boolean
---
**Summary**

Is the declaration flagged as last one of the ruleset?

**Type:** boolean

**Details:**
* Inherited From: [\PHPWee\aCssDeclarationToken](../classes/PHPWee.aCssDeclarationToken.md)


<a name="property_Property"></a>
#### public $Property : string
---
**Summary**

Property name of the declaration.

**Type:** string

**Details:**
* Inherited From: [\PHPWee\aCssDeclarationToken](../classes/PHPWee.aCssDeclarationToken.md)


<a name="property_Value"></a>
#### public $Value : string
---
**Summary**

Value of the declaration.

**Type:** string

**Details:**
* Inherited From: [\PHPWee\aCssDeclarationToken](../classes/PHPWee.aCssDeclarationToken.md)


<a name="property_MediaTypes"></a>
#### public $MediaTypes : array
---
**Summary**

Media types of the declaration.

**Type:** array

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() : void

```
public __construct(string  $property, string  $value, mixed  $mediaTypes = null, boolean  $isImportant = false, boolean  $isLast = false) : void
```

**Summary**

Set the properties of a ddocument- or at-rule @media level declaration.

**Details:**
* Inherited From: [\PHPWee\CssRulesetDeclarationToken](../classes/PHPWee.CssRulesetDeclarationToken.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $property  | Property of the declaration |
| <code>string</code> | $value  | Value of the declaration |
| <code>mixed</code> | $mediaTypes  | Media types of the declaration |
| <code>boolean</code> | $isImportant  | Is the !important flag is set |
| <code>boolean</code> | $isLast  | Is the declaration the last one of the ruleset |

**Returns:** void


<a name="method___toString" class="anchor"></a>
#### public __toString() : string

```
Abstract public __toString() : string
```

**Summary**

Returns the token as string.

**Details:**
* Inherited From: [\PHPWee\aCssToken](../classes/PHPWee.aCssToken.md)

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
