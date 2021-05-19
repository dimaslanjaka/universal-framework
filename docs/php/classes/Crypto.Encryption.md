# [Universal Framework PHP Documentation](../home.md)

# Class: \Crypto\Encryption
### Namespace: [\Crypto](../namespaces/Crypto.md)
---
**Summary:**

Encryption class for encrypt/decrypt that works between programming languages.

---
### Constants
* No constants found
---
### Properties
* [protected $encryptMethod](../classes/Crypto.Encryption.md#property_encryptMethod)
---
### Methods
* [public decrypt()](../classes/Crypto.Encryption.md#method_decrypt)
* [public encrypt()](../classes/Crypto.Encryption.md#method_encrypt)
* [public setCipherMethod()](../classes/Crypto.Encryption.md#method_setCipherMethod)
* [protected encryptMethodLength()](../classes/Crypto.Encryption.md#method_encryptMethodLength)
---
### Details
* File: [Crypto\Encryption.php](../files/Crypto.Encryption.md)
* Package: Default
* Class Hierarchy:
  * \Crypto\Encryption
* See Also:
  * [Reference.](https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs)
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Vee Winch. |
---
## Properties
<a name="property_encryptMethod"></a>
#### protected $encryptMethod : string
---
**Type:** string
Cipher method. Recommended AES-128-CBC, AES-192-CBC, AES-256-CBC
**Details:**
* See Also:
  * [Available methods.](http://php.net/manual/en/function.openssl-get-cipher-methods.php)



---
## Methods
<a name="method_decrypt" class="anchor"></a>
#### public decrypt() : mixed

```
public decrypt(string  $encryptedString, string  $key) : mixed
```

**Summary**

Decrypt string.

**Details:**
* Inherited From: [\Crypto\Encryption](../classes/Crypto.Encryption.md)
* See Also:
 * [Reference.](https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $encryptedString  | the encrypted string that is base64 encode |
| <code>string</code> | $key  | the key |

**Returns:** mixed - Return original string value. Return null for failure get salt, iv.


<a name="method_encrypt" class="anchor"></a>
#### public encrypt() : string

```
public encrypt(string  $string, string  $key) : string
```

**Summary**

Encrypt string.

**Details:**
* Inherited From: [\Crypto\Encryption](../classes/Crypto.Encryption.md)
* See Also:
 * [Reference.](https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $string  | the original string to be encrypt |
| <code>string</code> | $key  | the key |

**Returns:** string - return encrypted string


<a name="method_setCipherMethod" class="anchor"></a>
#### public setCipherMethod() 

```
public setCipherMethod(string  $cipherMethod) 
```

**Summary**

Set encryption method.

**Details:**
* Inherited From: [\Crypto\Encryption](../classes/Crypto.Encryption.md)
* See Also:
 * [Available methods.](http://php.net/manual/en/function.openssl-get-cipher-methods.php)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $cipherMethod  |  |




<a name="method_encryptMethodLength" class="anchor"></a>
#### protected encryptMethodLength() : integer

```
protected encryptMethodLength() : integer
```

**Summary**

Get encrypt method length number (128, 192, 256).

**Details:**
* Inherited From: [\Crypto\Encryption](../classes/Crypto.Encryption.md)

**Returns:** integer



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
