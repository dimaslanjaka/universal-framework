# [Universal Framework PHP Documentation](../home.md)

# Class: \Netscape\parser
### Namespace: [\Netscape](../namespaces/Netscape.md)
---
**Summary:**

Netscape proxy parser.

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public getCookies()](../classes/Netscape.parser.md#method_getCookies)
* [public netscape2guzzle()](../classes/Netscape.parser.md#method_netscape2guzzle)
* [public extractCookies()](../classes/Netscape.parser.md#method_extractCookies)
---
### Details
* File: [Netscape\parser.php](../files/Netscape.parser.md)
* Package: Default
* Class Hierarchy:
  * \Netscape\parser
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Dimas Lanjaka <dimaslanjaka@gmail.com> |

---
## Methods
<a name="method_getCookies" class="anchor"></a>
#### public getCookies() 

```
Static public getCookies(  $file) 
```

**Details:**
* Inherited From: [\Netscape\parser](../classes/Netscape.parser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $file  |  |




<a name="method_netscape2guzzle" class="anchor"></a>
#### public netscape2guzzle() 

```
Static public netscape2guzzle(  $cookietxt) 
```

**Details:**
* Inherited From: [\Netscape\parser](../classes/Netscape.parser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $cookietxt  |  |




<a name="method_extractCookies" class="anchor"></a>
#### public extractCookies() : array

```
Static public extractCookies(string  $string) : array
```

**Summary**

Extract any cookies found from the cookie file. This function expects to get
a string containing the contents of the cookie file which it will then
attempt to extract and return any cookies found within.

**Details:**
* Inherited From: [\Netscape\parser](../classes/Netscape.parser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $string  | the contents of the cookie file |

**Returns:** array - the array of cookies as extracted from the string



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
