# [Universal Framework PHP Documentation](../home.md)

# Class: \JSON\json
### Namespace: [\JSON](../namespaces/JSON.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $static](../classes/JSON.json.md#property_static)
* [public $result](../classes/JSON.json.md#property_result)
---
### Methods
* [public headerJSON()](../classes/JSON.json.md#method_headerJSON)
* [public json()](../classes/JSON.json.md#method_json)
* [public is_json()](../classes/JSON.json.md#method_is_json)
* [public init()](../classes/JSON.json.md#method_init)
* [public assoc()](../classes/JSON.json.md#method_assoc)
* [public beautify()](../classes/JSON.json.md#method_beautify)
* [public jsond()](../classes/JSON.json.md#method_jsond)
* [public json_decode()](../classes/JSON.json.md#method_json_decode)
* [public isJson()](../classes/JSON.json.md#method_isJson)
* [public jsonDecode()](../classes/JSON.json.md#method_jsonDecode)
* [public json_last_error_e()](../classes/JSON.json.md#method_json_last_error_e)
* [public load()](../classes/JSON.json.md#method_load)
* [public save()](../classes/JSON.json.md#method_save)
---
### Details
* File: [JSON\json.php](../files/JSON.json.md)
* Package: Default
* Class Hierarchy:
  * \JSON\json
---
## Properties
<a name="property_static"></a>
#### public $static : 
---
**Type:** 

**Details:**


<a name="property_result"></a>
#### public $result : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method_headerJSON" class="anchor"></a>
#### public headerJSON() 

```
Static public headerJSON() 
```

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)




<a name="method_json" class="anchor"></a>
#### public json() 

```
Static public json(mixed  $data = array(), boolean  $header = true, boolean  $print = true) 
```

**Summary**

JSON formatter.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>mixed</code> | $data  |  |
| <code>boolean</code> | $header  |  |
| <code>boolean</code> | $print  |  |




<a name="method_is_json" class="anchor"></a>
#### public is_json() : boolean

```
Static public is_json(string  $string) : boolean
```

**Summary**

Validate json string.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $string  |  |

**Returns:** boolean


<a name="method_init" class="anchor"></a>
#### public init() : \JSON\json

```
Static public init() : \JSON\json
```

**Summary**

chaining.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)

**Returns:** <a href="../classes/JSON.json.html">\JSON\json</a>


<a name="method_assoc" class="anchor"></a>
#### public assoc() : \JSON\json_decode

```
Static public assoc(object&amp;#124;array  $arr) : \JSON\json_decode
```

**Summary**

Force Assoc.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>object&#124;array</code> | $arr  |  |

**Returns:** \JSON\json_decode


<a name="method_beautify" class="anchor"></a>
#### public beautify() : string

```
Static public beautify(string&amp;#124;array&amp;#124;object&amp;#124;\stdClass  $data) : string
```

**Summary**

beautify JSON.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string&#124;array&#124;object&#124;\stdClass</code> | $data  |  |

**Returns:** string


<a name="method_jsond" class="anchor"></a>
#### public jsond() 

```
Static public jsond(string  $str,   $callback = null) 
```

**Summary**

JSON decode with verification.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $str  |  |
| <code></code> | $callback  |  |
##### Throws:
| Type | Description |
| ---- | ----------- |
| \MVC\Exception |  |




<a name="method_json_decode" class="anchor"></a>
#### public json_decode() : \JSON\json_decode

```
Static public json_decode(  $str,   $err_callback = null, boolean  $assoc = true) : \JSON\json_decode
```

**Summary**

json_decode default assoc.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  |  |
| <code></code> | $err_callback  |  |
| <code>boolean</code> | $assoc  |  |
##### Throws:
| Type | Description |
| ---- | ----------- |
| \MVC\Exception |  |

**Returns:** \JSON\json_decode


<a name="method_isJson" class="anchor"></a>
#### public isJson() 

```
Static public isJson(  $string) 
```

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $string  |  |




<a name="method_jsonDecode" class="anchor"></a>
#### public jsonDecode() 

```
Static public jsonDecode(  $input) 
```

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $input  |  |
##### Throws:
| Type | Description |
| ---- | ----------- |
| \MVC\Exception |  |




<a name="method_json_last_error_e" class="anchor"></a>
#### public json_last_error_e() 

```
Static public json_last_error_e() 
```

**Summary**

JSON error explanatory.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)




<a name="method_load" class="anchor"></a>
#### public load() 

```
public load(  $file,   $assoc = false) 
```

**Summary**

Load JSON.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $file  |  |
| <code></code> | $assoc  |  |




<a name="method_save" class="anchor"></a>
#### public save() : \JSON\json

```
public save() : \JSON\json
```

**Summary**

Save JSON from `load($file, $assoc = false)`.

**Details:**
* Inherited From: [\JSON\json](../classes/JSON.json.md)

**Returns:** <a href="../classes/JSON.json.html">\JSON\json</a>



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
