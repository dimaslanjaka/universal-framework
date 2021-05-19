# [Universal Framework PHP Documentation](../home.md)

# Class: \Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait
### Namespace: [\Naneau\Obfuscator\Node\Visitor](../namespaces/Naneau.Obfuscator.Node.Visitor.md)
---
**Summary:**

SkipTrait.

**Description:**

Renaming trait, for renaming things that require tracking

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [protected renamed()](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md#method_renamed)
* [protected getNewName()](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md#method_getNewName)
* [protected isRenamed()](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md#method_isRenamed)
* [protected resetRenamed()](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md#method_resetRenamed)
---
### Details
* File: [Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait.php](../files/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)
* Package: Default
* Class Hierarchy:
  * \Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| category |  | Naneau |

---
## Methods
<a name="method_renamed" class="anchor"></a>
#### protected renamed() : \Naneau\Obfuscator\Node\Visitor\SkipTrait

```
protected renamed(string  $method, string  $newName) : \Naneau\Obfuscator\Node\Visitor\SkipTrait
```

**Summary**

Record renaming of method.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $method  |  |
| <code>string</code> | $newName  |  |

**Returns:** <a href="../classes/Naneau.Obfuscator.Node.Visitor.SkipTrait.html">\Naneau\Obfuscator\Node\Visitor\SkipTrait</a>


<a name="method_getNewName" class="anchor"></a>
#### protected getNewName() : string

```
protected getNewName(string  $method) : string
```

**Summary**

Get new name of a method.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $method  |  |

**Returns:** string


<a name="method_isRenamed" class="anchor"></a>
#### protected isRenamed() : boolean

```
protected isRenamed(string  $method) : boolean
```

**Summary**

Has a method been renamed?

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $method  |  |

**Returns:** boolean


<a name="method_resetRenamed" class="anchor"></a>
#### protected resetRenamed() : \Naneau\Obfuscator\Node\Visitor\SkipTrait

```
protected resetRenamed() : \Naneau\Obfuscator\Node\Visitor\SkipTrait
```

**Summary**

Reset renamed list.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)

**Returns:** <a href="../classes/Naneau.Obfuscator.Node.Visitor.SkipTrait.html">\Naneau\Obfuscator\Node\Visitor\SkipTrait</a>



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
