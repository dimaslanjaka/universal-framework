# [Universal Framework PHP Documentation](../home.md)

# Class: \UniversalFramework\MySQL
### Namespace: [\UniversalFramework](../namespaces/UniversalFramework.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $last_connection](../classes/UniversalFramework.MySQL.md#property_last_connection)
* [public $connections](../classes/UniversalFramework.MySQL.md#property_connections)
---
### Methods
* [public __construct()](../classes/UniversalFramework.MySQL.md#method___construct)
* [public getConnection()](../classes/UniversalFramework.MySQL.md#method_getConnection)
* [public mysqlFieldInfo()](../classes/UniversalFramework.MySQL.md#method_mysqlFieldInfo)
* [public checkValidResult()](../classes/UniversalFramework.MySQL.md#method_checkValidResult)
* [public escapeString()](../classes/UniversalFramework.MySQL.md#method_escapeString)
* [protected getFieldType()](../classes/UniversalFramework.MySQL.md#method_getFieldType)
* [protected getFieldFlags()](../classes/UniversalFramework.MySQL.md#method_getFieldFlags)
* [protected escapeChar()](../classes/UniversalFramework.MySQL.md#method_escapeChar)
---
### Details
* File: [shim\mysql.php](../files/shim.mysql.md)
* Package: Default
* Class Hierarchy:
  * \UniversalFramework\MySQL
---
## Properties
<a name="property_last_connection"></a>
#### public $last_connection : 
---
**Type:** 

**Details:**


<a name="property_connections"></a>
#### public $connections : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(\mysqli  $sql) 
```

**Details:**
* Inherited From: [\UniversalFramework\MySQL](../classes/UniversalFramework.MySQL.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\mysqli</code> | $sql  |  |




<a name="method_getConnection" class="anchor"></a>
#### public getConnection() : false&amp;#124;\mysqli

```
Static public getConnection(\mysqli  $link = null, \UniversalFramework\function  $func = null) : false&amp;#124;\mysqli
```

**Summary**

Get mysqli intances.

**Details:**
* Inherited From: [\UniversalFramework\MySQL](../classes/UniversalFramework.MySQL.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\mysqli</code> | $link  |  |
| <code>\UniversalFramework\function</code> | $func  |  |

**Returns:** false&#124;\mysqli


<a name="method_mysqlFieldInfo" class="anchor"></a>
#### public mysqlFieldInfo() 

```
Static public mysqlFieldInfo(\mysqli_result  $result,   $field,   $what) 
```

**Details:**
* Inherited From: [\UniversalFramework\MySQL](../classes/UniversalFramework.MySQL.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\mysqli_result</code> | $result  |  |
| <code></code> | $field  |  |
| <code></code> | $what  |  |




<a name="method_checkValidResult" class="anchor"></a>
#### public checkValidResult() 

```
Static public checkValidResult(  $result,   $function) 
```

**Details:**
* Inherited From: [\UniversalFramework\MySQL](../classes/UniversalFramework.MySQL.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $result  |  |
| <code></code> | $function  |  |




<a name="method_escapeString" class="anchor"></a>
#### public escapeString() 

```
Static public escapeString(  $unescapedString) 
```

**Details:**
* Inherited From: [\UniversalFramework\MySQL](../classes/UniversalFramework.MySQL.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $unescapedString  |  |




<a name="method_getFieldType" class="anchor"></a>
#### protected getFieldType() 

```
Static protected getFieldType(  $what) 
```

**Details:**
* Inherited From: [\UniversalFramework\MySQL](../classes/UniversalFramework.MySQL.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $what  |  |




<a name="method_getFieldFlags" class="anchor"></a>
#### protected getFieldFlags() 

```
Static protected getFieldFlags(  $what) 
```

**Details:**
* Inherited From: [\UniversalFramework\MySQL](../classes/UniversalFramework.MySQL.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $what  |  |




<a name="method_escapeChar" class="anchor"></a>
#### protected escapeChar() 

```
Static protected escapeChar(  $char) 
```

**Details:**
* Inherited From: [\UniversalFramework\MySQL](../classes/UniversalFramework.MySQL.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $char  |  |





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
