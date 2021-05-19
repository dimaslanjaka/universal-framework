# [Universal Framework PHP Documentation](../home.md)

# Class: \DB\schema
### Namespace: [\DB](../namespaces/DB.md)
---
---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public get_enumset_values()](../classes/DB.schema.md#method_get_enumset_values)
* [public modify_enumset_values()](../classes/DB.schema.md#method_modify_enumset_values)
* [public interpolateQuery()](../classes/DB.schema.md#method_interpolateQuery)
---
### Details
* File: [DB\schema.php](../files/DB.schema.md)
* Package: Default
* Class Hierarchy:
  * \DB\schema

---
## Methods
<a name="method_get_enumset_values" class="anchor"></a>
#### public get_enumset_values() : array

```
Static public get_enumset_values(\DB\pdo  $pdo,   $table,   $field) : array
```

**Summary**

Get ENUM or SET values.

**Details:**
* Inherited From: [\DB\schema](../classes/DB.schema.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\DB\pdo</code> | $pdo  |  |
| <code></code> | $table  |  |
| <code></code> | $field  |  |

**Returns:** array


<a name="method_modify_enumset_values" class="anchor"></a>
#### public modify_enumset_values() : array

```
Static public modify_enumset_values(\DB\pdo  $pdo,   $table,   $field, array  $newData) : array
```

**Summary**

Modify ENUM or SET values.

**Details:**
* Inherited From: [\DB\schema](../classes/DB.schema.md)
* See Also:
 * [https://stackoverflow.com/questions/1501958/how-do-i-add-more-members-to-my-enum-type-column-in-mysql](https://stackoverflow.com/questions/1501958/how-do-i-add-more-members-to-my-enum-type-column-in-mysql)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\DB\pdo</code> | $pdo  |  |
| <code></code> | $table  |  |
| <code></code> | $field  |  |
| <code>array</code> | $newData  |  |

**Returns:** array


<a name="method_interpolateQuery" class="anchor"></a>
#### public interpolateQuery() : string

```
Static public interpolateQuery(string  $query, array  $params) : string
```

**Summary**

Replaces any parameter placeholders in a query with the value of that
parameter. Useful for debugging. Assumes anonymous parameters from
$params are are in the same order as specified in $query.

**Details:**
* Inherited From: [\DB\schema](../classes/DB.schema.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $query  | The sql query with parameter placeholders |
| <code>array</code> | $params  | The array of substitution parameters |

**Returns:** string - The interpolated query



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
