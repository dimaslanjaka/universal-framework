# [Universal Framework PHP Documentation](../home.md)

# Class: \User\coupon
### Namespace: [\User](../namespaces/User.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $coupon](../classes/User.coupon.md#property_coupon)
---
### Methods
* [public __construct()](../classes/User.coupon.md#method___construct)
* [public set_pdo()](../classes/User.coupon.md#method_set_pdo)
* [public create()](../classes/User.coupon.md#method_create)
* [public pdo_required()](../classes/User.coupon.md#method_pdo_required)
* [public coupon_login()](../classes/User.coupon.md#method_coupon_login)
* [public gen_token()](../classes/User.coupon.md#method_gen_token)
* [public coupon_data()](../classes/User.coupon.md#method_coupon_data)
* [public set_admin()](../classes/User.coupon.md#method_set_admin)
* [public coupon_validate()](../classes/User.coupon.md#method_coupon_validate)
* [public is_admin()](../classes/User.coupon.md#method_is_admin)
* [public is_local()](../classes/User.coupon.md#method_is_local)
* [public is_login()](../classes/User.coupon.md#method_is_login)
* [public coupon()](../classes/User.coupon.md#method_coupon)
* [public coupon_limit()](../classes/User.coupon.md#method_coupon_limit)
* [public logout()](../classes/User.coupon.md#method_logout)
* [public add_success()](../classes/User.coupon.md#method_add_success)
* [public add_log()](../classes/User.coupon.md#method_add_log)
* [public redirect()](../classes/User.coupon.md#method_redirect)
* [public e()](../classes/User.coupon.md#method_e)
---
### Details
* File: [User\coupon.php](../files/User.coupon.md)
* Package: Default
* Class Hierarchy: 
  * [\User\user]()
  * \User\coupon
---
## Properties
<a name="property_coupon"></a>
#### public $coupon : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $user = &#039;root&#039;,   $pass = &#039;&#039;,   $db,   $host = &#039;localhost&#039;,   $charset = &#039;utf8mb4&#039;) 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $user  |  |
| <code></code> | $pass  |  |
| <code></code> | $db  |  |
| <code></code> | $host  |  |
| <code></code> | $charset  |  |




<a name="method_set_pdo" class="anchor"></a>
#### public set_pdo() 

```
public set_pdo(\DB\pdo  $pdo) 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\DB\pdo</code> | $pdo  |  |




<a name="method_create" class="anchor"></a>
#### public create() 

```
public create(  $coupon,   $limit) 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $coupon  |  |
| <code></code> | $limit  |  |




<a name="method_pdo_required" class="anchor"></a>
#### public pdo_required() 

```
public pdo_required() 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)




<a name="method_coupon_login" class="anchor"></a>
#### public coupon_login() 

```
public coupon_login(  $coupon) 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $coupon  |  |




<a name="method_gen_token" class="anchor"></a>
#### public gen_token() : string

```
public gen_token(  $length = 10) : string
```

**Summary**

Generate token.

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $length  |  |

**Returns:** string


<a name="method_coupon_data" class="anchor"></a>
#### public coupon_data() 

```
public coupon_data(  $key) 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $key  |  |




<a name="method_set_admin" class="anchor"></a>
#### public set_admin() 

```
public set_admin(  $data,   $expire = 15,   $cookie_path) 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $data  |  |
| <code></code> | $expire  |  |
| <code></code> | $cookie_path  |  |




<a name="method_coupon_validate" class="anchor"></a>
#### public coupon_validate() : boolean&amp;#124;mixed

```
public coupon_validate(callable  $callback = null) : boolean&amp;#124;mixed
```

**Summary**

Validate coupon token with current session zone divisor.

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>callable</code> | $callback  | return callback(true|false, $result) |
##### Throws:
| Type | Description |
| ---- | ----------- |
| \MVC\Exception |  |

**Returns:** boolean&#124;mixed


<a name="method_is_admin" class="anchor"></a>
#### public is_admin() 

```
public is_admin() 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)




<a name="method_is_local" class="anchor"></a>
#### public is_local() 

```
public is_local() 
```

**Summary**

Is localhost ?

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)




<a name="method_is_login" class="anchor"></a>
#### public is_login() : boolean

```
public is_login(  $token = true) : boolean
```

**Summary**

Coupon login check.

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $token  |  |

**Returns:** boolean


<a name="method_coupon" class="anchor"></a>
#### public coupon() : array

```
public coupon() : array
```

**Summary**

Get current coupon datas.

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)

**Returns:** array


<a name="method_coupon_limit" class="anchor"></a>
#### public coupon_limit() : integer

```
public coupon_limit() : integer
```

**Summary**

Get current coupon limit value.

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)

**Returns:** integer


<a name="method_logout" class="anchor"></a>
#### public logout() 

```
public logout() 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)




<a name="method_add_success" class="anchor"></a>
#### public add_success() : void

```
public add_success(  $coupon_code) : void
```

**Summary**

Add Success 1 to database.

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $coupon_code  |  |

**Returns:** void


<a name="method_add_log" class="anchor"></a>
#### public add_log() 

```
public add_log(  $msisdn,   $coupon_code) 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $msisdn  |  |
| <code></code> | $coupon_code  |  |




<a name="method_redirect" class="anchor"></a>
#### public redirect() 

```
public redirect(  $path) 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $path  |  |




<a name="method_e" class="anchor"></a>
#### public e() 

```
public e(  $data) 
```

**Details:**
* Inherited From: [\User\coupon](../classes/User.coupon.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $data  |  |





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
