# [Universal Framework PHP Documentation](../home.md)

# Class: \Naneau\Obfuscator\StringScrambler
### Namespace: [\Naneau\Obfuscator](../namespaces/Naneau.Obfuscator.md)
---
**Summary:**

StringScrambler.

**Description:**

Scrambles strings

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public __construct()](../classes/Naneau.Obfuscator.StringScrambler.md#method___construct)
* [public scramble()](../classes/Naneau.Obfuscator.StringScrambler.md#method_scramble)
* [public getSalt()](../classes/Naneau.Obfuscator.StringScrambler.md#method_getSalt)
* [public setSalt()](../classes/Naneau.Obfuscator.StringScrambler.md#method_setSalt)
---
### Details
* File: [Naneau\Obfuscator\StringScrambler.php](../files/Naneau.Obfuscator.StringScrambler.md)
* Package: Default
* Class Hierarchy:
  * \Naneau\Obfuscator\StringScrambler
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| category |  | Naneau |

---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() : void

```
public __construct(string  $salt = null) : void
```

**Summary**

Constructor.

**Details:**
* Inherited From: [\Naneau\Obfuscator\StringScrambler](../classes/Naneau.Obfuscator.StringScrambler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $salt  | optional salt, when left empty (null) semi-random value will be generated |

**Returns:** void


<a name="method_scramble" class="anchor"></a>
#### public scramble() : string

```
public scramble(string  $string) : string
```

**Summary**

Scramble a string.

**Details:**
* Inherited From: [\Naneau\Obfuscator\StringScrambler](../classes/Naneau.Obfuscator.StringScrambler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $string  |  |

**Returns:** string


<a name="method_getSalt" class="anchor"></a>
#### public getSalt() : string

```
public getSalt() : string
```

**Summary**

Get the salt.

**Details:**
* Inherited From: [\Naneau\Obfuscator\StringScrambler](../classes/Naneau.Obfuscator.StringScrambler.md)

**Returns:** string


<a name="method_setSalt" class="anchor"></a>
#### public setSalt() : \Naneau\Obfuscator\StringScrambler

```
public setSalt(string  $salt) : \Naneau\Obfuscator\StringScrambler
```

**Summary**

Set the salt.

**Details:**
* Inherited From: [\Naneau\Obfuscator\StringScrambler](../classes/Naneau.Obfuscator.StringScrambler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $salt  |  |

**Returns:** <a href="../classes/Naneau.Obfuscator.StringScrambler.html">\Naneau\Obfuscator\StringScrambler</a>



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
