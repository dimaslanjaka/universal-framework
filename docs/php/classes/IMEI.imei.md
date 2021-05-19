# [Universal Framework PHP Documentation](../home.md)

# Class: \IMEI\imei
### Namespace: [\IMEI](../namespaces/IMEI.md)
---
---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public rand_imei()](../classes/IMEI.imei.md#method_rand_imei)
* [public intRandom()](../classes/IMEI.imei.md#method_intRandom)
* [public is_imei2()](../classes/IMEI.imei.md#method_is_imei2)
* [public is_luhn()](../classes/IMEI.imei.md#method_is_luhn)
* [public is_imei()](../classes/IMEI.imei.md#method_is_imei)
---
### Details
* File: [IMEI\imei.php](../files/IMEI.imei.md)
* Package: Default
* Class Hierarchy:
  * \IMEI\imei

---
## Methods
<a name="method_rand_imei" class="anchor"></a>
#### public rand_imei() : integer

```
Static public rand_imei() : integer
```

**Summary**

Generates IMEI code valid and random
Generates 14 aleatory digits. These 14, multiplies the multiples of 2 by 2 and sum the result
The result Must be divisible by 10,
Then get the diference and genaretes the last digit.

**Details:**
* Inherited From: [\IMEI\imei](../classes/IMEI.imei.md)

**Returns:** integer - $imei


<a name="method_intRandom" class="anchor"></a>
#### public intRandom() : \IMEI\$int

```
Static public intRandom(integer  $size) : \IMEI\$int
```

**Details:**
* Inherited From: [\IMEI\imei](../classes/IMEI.imei.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>integer</code> | $size  |  |

**Returns:** \IMEI\$int


<a name="method_is_imei2" class="anchor"></a>
#### public is_imei2() 

```
public is_imei2(  $n) 
```

**Details:**
* Inherited From: [\IMEI\imei](../classes/IMEI.imei.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $n  |  |




<a name="method_is_luhn" class="anchor"></a>
#### public is_luhn() 

```
public is_luhn(  $n) 
```

**Details:**
* Inherited From: [\IMEI\imei](../classes/IMEI.imei.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $n  |  |




<a name="method_is_imei" class="anchor"></a>
#### public is_imei() 

```
public is_imei(  $imei) 
```

**Details:**
* Inherited From: [\IMEI\imei](../classes/IMEI.imei.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $imei  |  |





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
