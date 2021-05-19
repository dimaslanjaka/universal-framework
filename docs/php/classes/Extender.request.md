# [Universal Framework PHP Documentation](../home.md)

# Class: \Extender\request
### Namespace: [\Extender](../namespaces/Extender.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $cache](../classes/Extender.request.md#property_cache)
---
### Methods
* [public __construct()](../classes/Extender.request.md#method___construct)
* [public static_request()](../classes/Extender.request.md#method_static_request)
* [public request()](../classes/Extender.request.md#method_request)
* [public getInstance()](../classes/Extender.request.md#method_getInstance)
* [public getCurlOpt()](../classes/Extender.request.md#method_getCurlOpt)
* [public disableSSL()](../classes/Extender.request.md#method_disableSSL)
* [public execute()](../classes/Extender.request.md#method_execute)
* [public set_method()](../classes/Extender.request.md#method_set_method)
* [public set_url()](../classes/Extender.request.md#method_set_url)
* [public DUMPNow()](../classes/Extender.request.md#method_DUMPNow)
* [public isDUMPNow()](../classes/Extender.request.md#method_isDUMPNow)
* [public exitJSON()](../classes/Extender.request.md#method_exitJSON)
* [public set_header_array()](../classes/Extender.request.md#method_set_header_array)
* [public set_cookie_file()](../classes/Extender.request.md#method_set_cookie_file)
* [public isAssoc()](../classes/Extender.request.md#method_isAssoc)
* [public has_string_keys()](../classes/Extender.request.md#method_has_string_keys)
---
### Details
* File: [Extender\request.php](../files/Extender.request.md)
* Package: Default
* Class Hierarchy: 
  * [\Curl\Curl]()
  * \Extender\request
---
## Properties
<a name="property_cache"></a>
#### public $cache : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $base = null) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $base  |  |




<a name="method_static_request" class="anchor"></a>
#### public static_request() 

```
Static public static_request(  $opt) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $opt  |  |




<a name="method_request" class="anchor"></a>
#### public request() : array

```
public request(array  $opt) : array
```

**Summary**

cURL shooter request.

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $opt  |  |

**Returns:** array


<a name="method_getInstance" class="anchor"></a>
#### public getInstance() 

```
Static public getInstance(  $base = null) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $base  |  |




<a name="method_getCurlOpt" class="anchor"></a>
#### public getCurlOpt() 

```
Static public getCurlOpt(  $ch,   $what) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $ch  |  |
| <code></code> | $what  |  |




<a name="method_disableSSL" class="anchor"></a>
#### public disableSSL() 

```
public disableSSL() 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)




<a name="method_execute" class="anchor"></a>
#### public execute() : string&amp;#124;array&amp;#124;null

```
public execute(  $method,   $path,   $rewrite = false) : string&amp;#124;array&amp;#124;null
```

**Summary**

Execute curl.

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $method  |  |
| <code></code> | $path  |  |
| <code></code> | $rewrite  |  |

**Returns:** string&#124;array&#124;null


<a name="method_set_method" class="anchor"></a>
#### public set_method() 

```
public set_method(  $method) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $method  |  |




<a name="method_set_url" class="anchor"></a>
#### public set_url() 

```
public set_url(  $url) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $url  |  |




<a name="method_DUMPNow" class="anchor"></a>
#### public DUMPNow() 

```
public DUMPNow(  $what) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $what  |  |




<a name="method_isDUMPNow" class="anchor"></a>
#### public isDUMPNow() 

```
public isDUMPNow() 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)




<a name="method_exitJSON" class="anchor"></a>
#### public exitJSON() 

```
public exitJSON(  $what) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $what  |  |




<a name="method_set_header_array" class="anchor"></a>
#### public set_header_array() 

```
public set_header_array(  $headers,   $trim = false) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $headers  |  |
| <code></code> | $trim  |  |




<a name="method_set_cookie_file" class="anchor"></a>
#### public set_cookie_file() 

```
public set_cookie_file(  $cookie = null) 
```

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $cookie  |  |




<a name="method_isAssoc" class="anchor"></a>
#### public isAssoc() : boolean

```
public isAssoc(array  $arr) : boolean
```

**Summary**

Check array is assoc
* var_dump(isAssoc(['a', 'b', 'c'])); // false
* var_dump(isAssoc(["0" => 'a', "1" => 'b', "2" => 'c'])); // false
* var_dump(isAssoc(["1" => 'a', "0" => 'b', "2" => 'c'])); // true
* var_dump(isAssoc(["a" => 'a', "b" => 'b', "c" => 'c'])); // true.

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $arr  |  |

**Returns:** boolean


<a name="method_has_string_keys" class="anchor"></a>
#### public has_string_keys() : boolean

```
public has_string_keys(array  $array) : boolean
```

**Summary**

Check array has some string key.

**Details:**
* Inherited From: [\Extender\request](../classes/Extender.request.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $array  |  |

**Returns:** boolean



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
