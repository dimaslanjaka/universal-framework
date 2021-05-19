# [Universal Framework PHP Documentation](../home.md)

# Class: \Session\FileSessionHandler
### Namespace: [\Session](../namespaces/Session.md)
---
---
### Constants
* No constants found
---
### Properties
* [protected $sess_path](../classes/Session.FileSessionHandler.md#property_sess_path)
* [protected $prefix](../classes/Session.FileSessionHandler.md#property_prefix)
* [protected $postfix](../classes/Session.FileSessionHandler.md#property_postfix)
---
### Methods
* [public __construct()](../classes/Session.FileSessionHandler.md#method___construct)
* [public open()](../classes/Session.FileSessionHandler.md#method_open)
* [public close()](../classes/Session.FileSessionHandler.md#method_close)
* [public read()](../classes/Session.FileSessionHandler.md#method_read)
* [public write()](../classes/Session.FileSessionHandler.md#method_write)
* [public destroy()](../classes/Session.FileSessionHandler.md#method_destroy)
* [public gc()](../classes/Session.FileSessionHandler.md#method_gc)
---
### Details
* File: [Session\FileSessionHandler.php](../files/Session.FileSessionHandler.md)
* Package: Default
* Class Hierarchy:
  * \Session\FileSessionHandler
* Implements:
  * []()
---
## Properties
<a name="property_sess_path"></a>
#### protected $sess_path : 
---
**Type:** 

**Details:**


<a name="property_prefix"></a>
#### protected $prefix : 
---
**Type:** 

**Details:**


<a name="property_postfix"></a>
#### protected $postfix : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $sess_path,   $prefix = &#039;sess_&#039;,   $postfix = &#039;&#039;) 
```

**Details:**
* Inherited From: [\Session\FileSessionHandler](../classes/Session.FileSessionHandler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $sess_path  |  |
| <code></code> | $prefix  |  |
| <code></code> | $postfix  |  |




<a name="method_open" class="anchor"></a>
#### public open() 

```
public open(  $save_path,   $sess_name) 
```

**Details:**
* Inherited From: [\Session\FileSessionHandler](../classes/Session.FileSessionHandler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $save_path  |  |
| <code></code> | $sess_name  |  |




<a name="method_close" class="anchor"></a>
#### public close() 

```
public close() 
```

**Details:**
* Inherited From: [\Session\FileSessionHandler](../classes/Session.FileSessionHandler.md)




<a name="method_read" class="anchor"></a>
#### public read() 

```
public read(  $sess_id) 
```

**Details:**
* Inherited From: [\Session\FileSessionHandler](../classes/Session.FileSessionHandler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $sess_id  |  |




<a name="method_write" class="anchor"></a>
#### public write() 

```
public write(  $sess_id,   $data) 
```

**Details:**
* Inherited From: [\Session\FileSessionHandler](../classes/Session.FileSessionHandler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $sess_id  |  |
| <code></code> | $data  |  |




<a name="method_destroy" class="anchor"></a>
#### public destroy() 

```
public destroy(  $sess_id) 
```

**Details:**
* Inherited From: [\Session\FileSessionHandler](../classes/Session.FileSessionHandler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $sess_id  |  |




<a name="method_gc" class="anchor"></a>
#### public gc() 

```
public gc(  $lifetime) 
```

**Details:**
* Inherited From: [\Session\FileSessionHandler](../classes/Session.FileSessionHandler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $lifetime  |  |





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
