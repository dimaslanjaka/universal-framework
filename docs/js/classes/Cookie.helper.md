# [Universal Framework PHP Documentation](../home.md)

# Class: \Cookie\helper
### Namespace: [\Cookie](../namespaces/Cookie.md)
---
**Summary:**

Cookie helper.

---
### Constants
* No constants found
---
### Properties
* [public $domain](../classes/Cookie.helper.md#property_domain)
* [public $secure](../classes/Cookie.helper.md#property_secure)
---
### Methods
* [public secure()](../classes/Cookie.helper.md#method_secure)
* [public domain()](../classes/Cookie.helper.md#method_domain)
* [public get()](../classes/Cookie.helper.md#method_get)
* [public destroy()](../classes/Cookie.helper.md#method_destroy)
* [public get_current_path()](../classes/Cookie.helper.md#method_get_current_path)
* [public get_current_url()](../classes/Cookie.helper.md#method_get_current_url)
* [public all()](../classes/Cookie.helper.md#method_all)
* [public reconstruct_url()](../classes/Cookie.helper.md#method_reconstruct_url)
* [public day()](../classes/Cookie.helper.md#method_day)
* [public set()](../classes/Cookie.helper.md#method_set)
* [public hours()](../classes/Cookie.helper.md#method_hours)
* [public one()](../classes/Cookie.helper.md#method_one)
* [public has()](../classes/Cookie.helper.md#method_has)
* [public mins()](../classes/Cookie.helper.md#method_mins)
* [public del()](../classes/Cookie.helper.md#method_del)
* [public __call()](../classes/Cookie.helper.md#method___call)
---
### Details
* File: [Cookie\helper.php](../files/Cookie.helper.md)
* Package: Default
* Class Hierarchy:
  * \Cookie\helper
---
## Properties
<a name="property_domain"></a>
#### public $domain : 
---
**Type:** 

**Details:**


<a name="property_secure"></a>
#### public $secure : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method_secure" class="anchor"></a>
#### public secure() 

```
Static public secure(  $secure) 
```

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $secure  |  |




<a name="method_domain" class="anchor"></a>
#### public domain() 

```
Static public domain(  $domain) 
```

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $domain  |  |




<a name="method_get" class="anchor"></a>
#### public get() : string&amp;#124;array&amp;#124;null

```
Static public get(  $name,   $AllowEmpty = true) : string&amp;#124;array&amp;#124;null
```

**Summary**

Get Cookie By Name.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $AllowEmpty  |  |

**Returns:** string&#124;array&#124;null


<a name="method_destroy" class="anchor"></a>
#### public destroy() : void

```
Static public destroy(array  $except = array()) : void
```

**Summary**

Destroy all cookies except php session and spesific cookies name.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $except  |  |

**Returns:** void


<a name="method_get_current_path" class="anchor"></a>
#### public get_current_path() 

```
Static public get_current_path() 
```

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)




<a name="method_get_current_url" class="anchor"></a>
#### public get_current_url() 

```
Static public get_current_url() 
```

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)




<a name="method_all" class="anchor"></a>
#### public all() 

```
Static public all() 
```

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)




<a name="method_reconstruct_url" class="anchor"></a>
#### public reconstruct_url() 

```
Static public reconstruct_url(  $url) 
```

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $url  |  |




<a name="method_day" class="anchor"></a>
#### public day() 

```
Static public day(  $name,   $value = true,   $expire,   $path = &#039;/&#039;,   $domain = &#039;&#039;,   $secure = false,   $httponly = false) 
```

**Summary**

Set cookie by days.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
* See Also:
 * [automatically set expire time to day format](../classes/Cookie.helper.md#method_set)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $value  |  |
| <code></code> | $expire  |  |
| <code></code> | $path  |  |
| <code></code> | $domain  |  |
| <code></code> | $secure  |  |
| <code></code> | $httponly  |  |




<a name="method_set" class="anchor"></a>
#### public set() : \Cookie\setcookie

```
Static public set(  $name, mixed  $value, integer&amp;#124;float&amp;#124;string  $expire,   $path = &#039;/&#039;, string  $domain = &#039;&#039;, boolean  $secure = false, boolean  $httponly = false) : \Cookie\setcookie
```

**Summary**

Set cookie helper.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code>mixed</code> | $value  |  |
| <code>integer&#124;float&#124;string</code> | $expire  | 1m/1h/1d/1y |
| <code></code> | $path  |  |
| <code>string</code> | $domain  | default $_SERVER['HTTP_HOST'] |
| <code>boolean</code> | $secure  |  |
| <code>boolean</code> | $httponly  |  |

**Returns:** \Cookie\setcookie


<a name="method_hours" class="anchor"></a>
#### public hours() 

```
Static public hours(  $name,   $value = true,   $expire = 1,   $path = &#039;/&#039;,   $domain = &#039;&#039;,   $secure = false,   $httponly = false) 
```

**Summary**

Set cookie by hours.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
* See Also:
 * [automatically set expire time to hours format](../classes/Cookie.helper.md#method_set)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $value  |  |
| <code></code> | $expire  |  |
| <code></code> | $path  |  |
| <code></code> | $domain  |  |
| <code></code> | $secure  |  |
| <code></code> | $httponly  |  |




<a name="method_one" class="anchor"></a>
#### public one() : void

```
Static public one(  $cookie_name,   $value, integer  $minutes, callable  $callback) : void
```

**Summary**

one time function when cookie name empty.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $cookie_name  |  |
| <code></code> | $value  |  |
| <code>integer</code> | $minutes  | minute to be expired |
| <code>callable</code> | $callback  |  |

**Returns:** void


<a name="method_has" class="anchor"></a>
#### public has() : boolean&amp;#124;null

```
Static public has(  $name, boolean  $AllowEmpty = true) : boolean&amp;#124;null
```

**Summary**

Check cookie exist.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code>boolean</code> | $AllowEmpty  | if true, will return false if cookie value empty |

**Returns:** boolean&#124;null - `true` indicated exists,
                  `null` indicated empty value,
                  `false` indicated not set


<a name="method_mins" class="anchor"></a>
#### public mins() 

```
Static public mins(  $name,   $value = true,   $expire,   $path = &#039;/&#039;,   $domain = &#039;&#039;,   $secure = false,   $httponly = false) 
```

**Summary**

Set cookie by minutes.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
* See Also:
 * [automatically set expire time to minutes format](../classes/Cookie.helper.md#method_set)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $value  |  |
| <code></code> | $expire  |  |
| <code></code> | $path  |  |
| <code></code> | $domain  |  |
| <code></code> | $secure  |  |
| <code></code> | $httponly  |  |




<a name="method_del" class="anchor"></a>
#### public del() : boolean

```
Static public del(  $name) : boolean
```

**Summary**

Delete cookie.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |

**Returns:** boolean - true | false | null
             * return true if success and exists
             * return false if cookie not exists
             * return null if $_COOKIE constant not exists


<a name="method___call" class="anchor"></a>
#### public __call() 

```
public __call(  $method,   $args) 
```

**Summary**

This magic method is called everytime an inaccessible method is called
(either by visibility contrains or it doesn't exist)
Here we are simulating shared protected methods across "package" classes
This method is inherited by all child classes of Package.

**Details:**
* Inherited From: [\Cookie\helper](../classes/Cookie.helper.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $method  |  |
| <code></code> | $args  |  |





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
