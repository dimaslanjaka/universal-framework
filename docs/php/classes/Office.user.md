# [Universal Framework PHP Documentation](../home.md)

# Class: \Office\user
### Namespace: [\Office](../namespaces/Office.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $usermeta](../classes/Office.user.md#property_usermeta)
---
### Methods
* [public __construct()](../classes/Office.user.md#method___construct)
* [public getOffices()](../classes/Office.user.md#method_getOffices)
---
### Details
* File: [Office\user.php](../files/Office.user.md)
* Package: Default
* Class Hierarchy: 
  * [\User\user]()
  * \Office\user
---
## Properties
<a name="property_usermeta"></a>
#### public $usermeta : \User\meta
---
**Summary**

User meta instance.

**Type:** <a href="../classes/User.meta.html">\User\meta</a>

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(\DB\pdo  $pdo) 
```

**Details:**
* Inherited From: [\Office\user](../classes/Office.user.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\DB\pdo</code> | $pdo  |  |




<a name="method_getOffices" class="anchor"></a>
#### public getOffices() : array

```
public getOffices() : array
```

**Summary**

Get office list of current logged in user.

**Details:**
* Inherited From: [\Office\user](../classes/Office.user.md)

**Returns:** array

##### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| requires |  | `\User\user::is_login` check login before doing this |


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
