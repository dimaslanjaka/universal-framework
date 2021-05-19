# [Universal Framework PHP Documentation](../home.md)

# Class: \DB\EPDOStatement
### Namespace: [\DB](../namespaces/DB.md)
---
---
### Constants
* [ WARNING_USING_ADDSLASHES](../classes/DB.EPDOStatement.md#constant_WARNING_USING_ADDSLASHES)
---
### Properties
* [public $fullQuery](../classes/DB.EPDOStatement.md#property_fullQuery)
* [protected $_pdo](../classes/DB.EPDOStatement.md#property__pdo)
* [protected $boundParams](../classes/DB.EPDOStatement.md#property_boundParams)
* [protected $_debugValues](../classes/DB.EPDOStatement.md#property__debugValues)
---
### Methods
* [public setLogger()](../classes/DB.EPDOStatement.md#method_setLogger)
* [public bindParam()](../classes/DB.EPDOStatement.md#method_bindParam)
* [public bindValue()](../classes/DB.EPDOStatement.md#method_bindValue)
* [public execute()](../classes/DB.EPDOStatement.md#method_execute)
* [public interpolateQuery()](../classes/DB.EPDOStatement.md#method_interpolateQuery)
* [public _debugQuery()](../classes/DB.EPDOStatement.md#method__debugQuery)
* [protected __construct()](../classes/DB.EPDOStatement.md#method___construct)
* [protected _debugReplace()](../classes/DB.EPDOStatement.md#method__debugReplace)
---
### Details
* File: [DB\EPDOStatement.php](../files/DB.EPDOStatement.md)
* Package: Default
* Class Hierarchy: 
  * [\PDOStatement]()
  * \DB\EPDOStatement
* Implements:
  * []()
---
## Constants
<a name="constant_WARNING_USING_ADDSLASHES" class="anchor"></a>
###### WARNING_USING_ADDSLASHES
```
WARNING_USING_ADDSLASHES = 'addslashes is not suitable for production logging, etc. Please consider updating your processes to provide a valid PDO object that can perform the necessary translations and can be updated with your e.g. package management, etc.'
```

| Tag | Version | Desc |
| --- | ------- | ---- |

---
## Properties
<a name="property_fullQuery"></a>
#### public $fullQuery : string
---
**Type:** string
- will be populated with the interpolated db query string
**Details:**


<a name="property__pdo"></a>
#### protected $_pdo : \PDO
---
**Type:** \PDO

**Details:**


<a name="property_boundParams"></a>
#### protected $boundParams : array
---
**Type:** array
- array of arrays containing values that have been bound to the query as parameters
**Details:**


<a name="property__debugValues"></a>
#### protected $_debugValues : 
---
**Summary**

Migrate from \DB\statement.

**Type:** 

**Details:**



---
## Methods
<a name="method_setLogger" class="anchor"></a>
#### public setLogger() 

```
public setLogger(\Psr\Log\LoggerInterface  $logger) 
```

**Summary**

{@inheritdoc}

**Details:**
* Inherited From: [\DB\EPDOStatement](../classes/DB.EPDOStatement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\Psr\Log\LoggerInterface</code> | $logger  |  |




<a name="method_bindParam" class="anchor"></a>
#### public bindParam() : boolean

```
public bindParam(string  $param, mixed  $value, integer  $datatype = \PDO::PARAM_STR, integer  $length, mixed  $driverOptions = false) : boolean
```

**Summary**

Overrides the default \PDOStatement method to add the named parameter and it's reference to the array of bound
parameters - then accesses and returns parent::bindParam method.

**Details:**
* Inherited From: [\DB\EPDOStatement](../classes/DB.EPDOStatement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $param  |  |
| <code>mixed</code> | $value  |  |
| <code>integer</code> | $datatype  |  |
| <code>integer</code> | $length  |  |
| <code>mixed</code> | $driverOptions  |  |

**Returns:** boolean - - default of \PDOStatement::bindParam()


<a name="method_bindValue" class="anchor"></a>
#### public bindValue() : boolean

```
public bindValue(string  $param, mixed  $value, integer  $datatype = \PDO::PARAM_STR) : boolean
```

**Summary**

Overrides the default \PDOStatement method to add the named parameter and it's value to the array of bound values
- then accesses and returns parent::bindValue method.

**Details:**
* Inherited From: [\DB\EPDOStatement](../classes/DB.EPDOStatement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $param  |  |
| <code>mixed</code> | $value  |  |
| <code>integer</code> | $datatype  |  |

**Returns:** boolean - - default of \PDOStatement::bindValue()


<a name="method_execute" class="anchor"></a>
#### public execute() : boolean

```
public execute(array  $inputParams = array()) : boolean
```

**Summary**

Overrides the default \PDOStatement method to generate the full query string - then accesses and returns
parent::execute method.

**Details:**
* Inherited From: [\DB\EPDOStatement](../classes/DB.EPDOStatement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $inputParams  |  |

**Returns:** boolean - - default of \PDOStatement::execute()


<a name="method_interpolateQuery" class="anchor"></a>
#### public interpolateQuery() : string

```
public interpolateQuery(array  $inputParams = null) : string
```

**Summary**

Copies $this->queryString then replaces bound markers with associated values ($this->queryString is not modified
but the resulting query string is assigned to $this->fullQuery).

**Details:**
* Inherited From: [\DB\EPDOStatement](../classes/DB.EPDOStatement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $inputParams  | - array of values to replace ? marked parameters in the query string |

**Returns:** string - $testQuery - interpolated db query string


<a name="method__debugQuery" class="anchor"></a>
#### public _debugQuery() 

```
public _debugQuery(  $replaced = true) 
```

**Details:**
* Inherited From: [\DB\EPDOStatement](../classes/DB.EPDOStatement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $replaced  |  |




<a name="method___construct" class="anchor"></a>
#### protected __construct() 

```
protected __construct(\PDO  $pdo = null) 
```

**Summary**

The first argument passed in should be an instance of the PDO object. If so, we'll cache it's reference locally
to allow for the best escaping possible later when interpolating our query. Other parameters can be added if
needed.

**Details:**
* Inherited From: [\DB\EPDOStatement](../classes/DB.EPDOStatement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\PDO</code> | $pdo  |  |




<a name="method__debugReplace" class="anchor"></a>
#### protected _debugReplace() 

```
protected _debugReplace(  $m) 
```

**Details:**
* Inherited From: [\DB\EPDOStatement](../classes/DB.EPDOStatement.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $m  |  |





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
