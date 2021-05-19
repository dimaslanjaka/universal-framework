# [Universal Framework PHP Documentation](../home.md)

# Class: \Crypto\crypt
### Namespace: [\Crypto](../namespaces/Crypto.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $iv](../classes/Crypto.crypt.md#property_iv)
* [public $iteration](../classes/Crypto.crypt.md#property_iteration)
* [public $salt](../classes/Crypto.crypt.md#property_salt)
* [public $opensslrawdata](../classes/Crypto.crypt.md#property_opensslrawdata)
---
### Methods
* [public EN()](../classes/Crypto.crypt.md#method_EN)
* [public DE()](../classes/Crypto.crypt.md#method_DE)
* [public encrypt()](../classes/Crypto.crypt.md#method_encrypt)
* [public decrypt()](../classes/Crypto.crypt.md#method_decrypt)
---
### Details
* File: [Crypto\crypt.php](../files/Crypto.crypt.md)
* Package: Default
* Class Hierarchy:
  * \Crypto\crypt
---
## Properties
<a name="property_iv"></a>
#### public $iv : 
---
**Type:** 

**Details:**


<a name="property_iteration"></a>
#### public $iteration : 
---
**Type:** 

**Details:**


<a name="property_salt"></a>
#### public $salt : 
---
**Type:** 

**Details:**


<a name="property_opensslrawdata"></a>
#### public $opensslrawdata : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method_EN" class="anchor"></a>
#### public EN() : string

```
Static public EN(string  $plainText, string  $passphrase = &#039;dimaslanjaka&#039;) : string
```

**Summary**

Encrypt.

**Details:**
* Inherited From: [\Crypto\crypt](../classes/Crypto.crypt.md)
* See Also:
 * [https://web-manajemen.blogspot.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html](https://web-manajemen.blogspot.com/2019/07/phpjs-cryptojs-encrypt-decrypt.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $plainText  |  |
| <code>string</code> | $passphrase  |  |

**Returns:** string


<a name="method_DE" class="anchor"></a>
#### public DE() : string

```
Static public DE(string  $plaintext, string  $passphrase = &#039;dimaslanjaka&#039;) : string
```

**Summary**

Decrypt.

**Details:**
* Inherited From: [\Crypto\crypt](../classes/Crypto.crypt.md)
* See Also:
 * [https://web-manajemen.blogspot.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html](https://web-manajemen.blogspot.com/2019/07/phpjs-cryptojs-encrypt-decrypt.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $plaintext  |  |
| <code>string</code> | $passphrase  |  |

**Returns:** string


<a name="method_encrypt" class="anchor"></a>
#### public encrypt() 

```
public encrypt(  $passphrase,   $plainText) 
```

**Details:**
* Inherited From: [\Crypto\crypt](../classes/Crypto.crypt.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $passphrase  |  |
| <code></code> | $plainText  |  |




<a name="method_decrypt" class="anchor"></a>
#### public decrypt() 

```
public decrypt(  $passphrase,   $plaintext) 
```

**Details:**
* Inherited From: [\Crypto\crypt](../classes/Crypto.crypt.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $passphrase  |  |
| <code></code> | $plaintext  |  |





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
