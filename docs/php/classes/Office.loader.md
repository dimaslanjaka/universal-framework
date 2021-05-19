# [Universal Framework PHP Documentation](../home.md)

# Class: \Office\loader
### Namespace: [\Office](../namespaces/Office.md)
---
**Summary:**

Office Module Loader.

---
### Constants
* No constants found
---
### Properties
* [public $user](../classes/Office.loader.md#property_user)
* [public $usermeta](../classes/Office.loader.md#property_usermeta)
* [public $warehouse](../classes/Office.loader.md#property_warehouse)
* [public $config](../classes/Office.loader.md#property_config)
---
### Methods
* [public __construct()](../classes/Office.loader.md#method___construct)
* [public config()](../classes/Office.loader.md#method_config)
---
### Details
* File: [Office\loader.php](../files/Office.loader.md)
* Package: Default
* Class Hierarchy:
  * \Office\loader
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Dimas Lanjaka <dimaslanjaka@gmail.com> |
---
## Properties
<a name="property_user"></a>
#### public $user : \Office\user
---
**Summary**

User instance.

**Type:** <a href="../classes/Office.user.html">\Office\user</a>

**Details:**


<a name="property_usermeta"></a>
#### public $usermeta : \User\meta
---
**Summary**

User meta instance.

**Type:** <a href="../classes/User.meta.html">\User\meta</a>

**Details:**


<a name="property_warehouse"></a>
#### public $warehouse : \Office\inventory\warehouse\index
---
**Summary**

Warehouse instance.

**Type:** \Office\inventory\warehouse\index

**Details:**


<a name="property_config"></a>
#### public $config : \Office\config
---
**Summary**

Config instance.

**Type:** <a href="../classes/Office.config.html">\Office\config</a>

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(\DB\pdo  $pdo) 
```

**Details:**
* Inherited From: [\Office\loader](../classes/Office.loader.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\DB\pdo</code> | $pdo  |  |




<a name="method_config" class="anchor"></a>
#### public config() : void

```
public config(  $officeName) : void
```

**Summary**

Set Config warehouse.

**Details:**
* Inherited From: [\Office\loader](../classes/Office.loader.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $officeName  |  |

**Returns:** void



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
