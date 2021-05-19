# [Universal Framework PHP Documentation](../home.md)

# Class: \Crypto\openssl
### Namespace: [\Crypto](../namespaces/Crypto.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $static_key](../classes/Crypto.openssl.md#property_static_key)
* [protected $method](../classes/Crypto.openssl.md#property_method)
---
### Methods
* [public __construct()](../classes/Crypto.openssl.md#method___construct)
* [public instance()](../classes/Crypto.openssl.md#method_instance)
* [public encrypt()](../classes/Crypto.openssl.md#method_encrypt)
* [public decrypt()](../classes/Crypto.openssl.md#method_decrypt)
* [protected iv_bytes()](../classes/Crypto.openssl.md#method_iv_bytes)
---
### Details
* File: [Crypto\openssl.php](../files/Crypto.openssl.md)
* Package: Default
* Class Hierarchy:
  * \Crypto\openssl
---
## Properties
<a name="property_static_key"></a>
#### public $static_key : 
---
**Type:** 

**Details:**


<a name="property_method"></a>
#### protected $method : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $key = false,   $method = false) 
```

**Details:**
* Inherited From: [\Crypto\openssl](../classes/Crypto.openssl.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $key  |  |
| <code></code> | $method  |  |




<a name="method_instance" class="anchor"></a>
#### public instance() : $this

```
Static public instance(  $restart = false) : $this
```

**Summary**

static instances.

**Details:**
* Inherited From: [\Crypto\openssl](../classes/Crypto.openssl.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $restart  |  |

**Returns:** $this


<a name="method_encrypt" class="anchor"></a>
#### public encrypt() : string

```
public encrypt(  $data) : string
```

**Summary**

encrypt plaintext string.

**Details:**
* Inherited From: [\Crypto\openssl](../classes/Crypto.openssl.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $data  |  |

**Returns:** string


<a name="method_decrypt" class="anchor"></a>
#### public decrypt() : string&amp;#124;false

```
public decrypt(  $data) : string&amp;#124;false
```

**Summary**

decrypt encrypted string.

**Details:**
* Inherited From: [\Crypto\openssl](../classes/Crypto.openssl.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $data  |  |

**Returns:** string&#124;false


<a name="method_iv_bytes" class="anchor"></a>
#### protected iv_bytes() 

```
protected iv_bytes() 
```

**Details:**
* Inherited From: [\Crypto\openssl](../classes/Crypto.openssl.md)





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
