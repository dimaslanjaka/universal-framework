# [Universal Framework PHP Documentation](../home.md)

# Class: \Session\session
### Namespace: [\Session](../namespaces/Session.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $sessionCookieName](../classes/Session.session.md#property_sessionCookieName)
* [public $cookiePath](../classes/Session.session.md#property_cookiePath)
* [public $cookieDomain](../classes/Session.session.md#property_cookieDomain)
---
### Methods
* [public __construct()](../classes/Session.session.md#method___construct)
* [public is_session_started()](../classes/Session.session.md#method_is_session_started)
* [public handle()](../classes/Session.session.md#method_handle)
* [public now()](../classes/Session.session.md#method_now)
* [public has()](../classes/Session.session.md#method_has)
* [public get()](../classes/Session.session.md#method_get)
* [public gets()](../classes/Session.session.md#method_gets)
* [public all()](../classes/Session.session.md#method_all)
* [public getInstance()](../classes/Session.session.md#method_getInstance)
* [public unses()](../classes/Session.session.md#method_unses)
* [public set_session()](../classes/Session.session.md#method_set_session)
* [public start_timeout()](../classes/Session.session.md#method_start_timeout)
* [public dump()](../classes/Session.session.md#method_dump)
* [public is_sess()](../classes/Session.session.md#method_is_sess)
* [public sess()](../classes/Session.session.md#method_sess)
---
### Details
* File: [Session\session.php](../files/Session.session.md)
* Package: Default
* Class Hierarchy:
  * \Session\session
---
## Properties
<a name="property_sessionCookieName"></a>
#### public $sessionCookieName : 
---
**Type:** 

**Details:**


<a name="property_cookiePath"></a>
#### public $cookiePath : 
---
**Type:** 

**Details:**


<a name="property_cookieDomain"></a>
#### public $cookieDomain : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $timeout = 3600,   $session_folder = null) 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $timeout  |  |
| <code></code> | $session_folder  |  |




<a name="method_is_session_started" class="anchor"></a>
#### public is_session_started() 

```
public is_session_started() 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)




<a name="method_handle" class="anchor"></a>
#### public handle() 

```
public handle(  $timeout,   $folder = null) 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $timeout  |  |
| <code></code> | $folder  |  |




<a name="method_now" class="anchor"></a>
#### public now() 

```
public now() 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)




<a name="method_has" class="anchor"></a>
#### public has() 

```
Static public has(  $key,   $empty = true) 
```

**Summary**

Is session set ?

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $key  |  |
| <code></code> | $empty  |  |




<a name="method_get" class="anchor"></a>
#### public get() 

```
Static public get(  $key) 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $key  |  |




<a name="method_gets" class="anchor"></a>
#### public gets() 

```
Static public gets(array  $keys) 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $keys  |  |




<a name="method_all" class="anchor"></a>
#### public all() 

```
Static public all() 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)




<a name="method_getInstance" class="anchor"></a>
#### public getInstance() 

```
Static public getInstance() 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)




<a name="method_unses" class="anchor"></a>
#### public unses() 

```
Static public unses(array&amp;#124;string&amp;#124;\Session\Number  $name) 
```

**Summary**

Unset Session.

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array&#124;string&#124;\Session\Number</code> | $name  |  |




<a name="method_set_session" class="anchor"></a>
#### public set_session() 

```
Static public set_session(  $data,   $value = null) 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $data  |  |
| <code></code> | $value  |  |




<a name="method_start_timeout" class="anchor"></a>
#### public start_timeout() 

```
public start_timeout(  $timeout = 5,   $probability = 100) 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $timeout  |  |
| <code></code> | $probability  |  |




<a name="method_dump" class="anchor"></a>
#### public dump() 

```
public dump() 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)




<a name="method_is_sess" class="anchor"></a>
#### public is_sess() 

```
public is_sess(  $session_name,   $not_found = null) 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $session_name  |  |
| <code></code> | $not_found  |  |




<a name="method_sess" class="anchor"></a>
#### public sess() 

```
public sess(  $key,   $val) 
```

**Details:**
* Inherited From: [\Session\session](../classes/Session.session.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $key  |  |
| <code></code> | $val  |  |





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
