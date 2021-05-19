# [Universal Framework PHP Documentation](../home.md)

# Class: \img\cache
### Namespace: [\img](../namespaces/img.md)
---
**Summary:**

Image Cache Engine.

---
### Constants
* No constants found
---
### Properties
* [public $saved](../classes/img.cache.md#property_saved)
* [public $url](../classes/img.cache.md#property_url)
* [public $api](../classes/img.cache.md#property_api)
* [public $cache](../classes/img.cache.md#property_cache)
* [public $cache_dir](../classes/img.cache.md#property_cache_dir)
---
### Methods
* [public __construct()](../classes/img.cache.md#method___construct)
* [public imageCache()](../classes/img.cache.md#method_imageCache)
* [public send_cache_header()](../classes/img.cache.md#method_send_cache_header)
* [public writeCache()](../classes/img.cache.md#method_writeCache)
* [public url2cache()](../classes/img.cache.md#method_url2cache)
* [public clean()](../classes/img.cache.md#method_clean)
---
### Details
* File: [img\cache.php](../files/img.cache.md)
* Package: Default
* Class Hierarchy:
  * \img\cache
---
## Properties
<a name="property_saved"></a>
#### public $saved : 
---
**Type:** 

**Details:**


<a name="property_url"></a>
#### public $url : 
---
**Type:** 

**Details:**


<a name="property_api"></a>
#### public $api : 
---
**Type:** 

**Details:**


<a name="property_cache"></a>
#### public $cache : 
---
**Type:** 

**Details:**


<a name="property_cache_dir"></a>
#### public $cache_dir : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct() 
```

**Details:**
* Inherited From: [\img\cache](../classes/img.cache.md)




<a name="method_imageCache" class="anchor"></a>
#### public imageCache() 

```
Static public imageCache(  $url,   $rewrite = false) 
```

**Details:**
* Inherited From: [\img\cache](../classes/img.cache.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $url  |  |
| <code></code> | $rewrite  |  |




<a name="method_send_cache_header" class="anchor"></a>
#### public send_cache_header() : void

```
Static public send_cache_header(\img\[type]  $cache_file_name, boolean  $check_request = false) : void
```

**Summary**

Send Cache Header for static content.

**Details:**
* Inherited From: [\img\cache](../classes/img.cache.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\img\[type]</code> | $cache_file_name  |  |
| <code>boolean</code> | $check_request  |  |

**Returns:** void


<a name="method_writeCache" class="anchor"></a>
#### public writeCache() : void

```
Static public writeCache() : void
```

**Summary**

Write Cache.

**Details:**
* Inherited From: [\img\cache](../classes/img.cache.md)

**Returns:** void


<a name="method_url2cache" class="anchor"></a>
#### public url2cache() 

```
Static public url2cache(  $url) 
```

**Summary**

Transform url image to cache
* `schema data cache`
```json
{ "md5": "realURL" }
```.

**Details:**
* Inherited From: [\img\cache](../classes/img.cache.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $url  |  |



##### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Dimas Lanjaka <dimaslanjaka@gmail.com> |

<a name="method_clean" class="anchor"></a>
#### public clean() 

```
public clean() 
```

**Details:**
* Inherited From: [\img\cache](../classes/img.cache.md)





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
