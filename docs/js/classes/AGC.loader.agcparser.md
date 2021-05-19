# [Universal Framework PHP Documentation](../home.md)

# Class: \AGC\loader\agcparser
### Namespace: [\AGC\loader](../namespaces/AGC.loader.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $string](../classes/AGC.loader.agcparser.md#property_string)
* [public $backup_html](../classes/AGC.loader.agcparser.md#property_backup_html)
---
### Methods
* [public getInstance()](../classes/AGC.loader.agcparser.md#method_getInstance)
* [public detecturl()](../classes/AGC.loader.agcparser.md#method_detecturl)
* [public precode()](../classes/AGC.loader.agcparser.md#method_precode)
* [public clean_inline_style()](../classes/AGC.loader.agcparser.md#method_clean_inline_style)
* [public removeSchema()](../classes/AGC.loader.agcparser.md#method_removeSchema)
* [public parsingview()](../classes/AGC.loader.agcparser.md#method_parsingview)
* [public save_depencies()](../classes/AGC.loader.agcparser.md#method_save_depencies)
* [public load_depencies()](../classes/AGC.loader.agcparser.md#method_load_depencies)
* [public combine()](../classes/AGC.loader.agcparser.md#method_combine)
* [public __toString()](../classes/AGC.loader.agcparser.md#method___toString)
---
### Details
* File: [AGC\loader\gtrans.php](../files/AGC.loader.gtrans.md)
* Package: Default
* Class Hierarchy:
  * \AGC\loader\agcparser
---
## Properties
<a name="property_string"></a>
#### public $string : 
---
**Type:** 

**Details:**


<a name="property_backup_html"></a>
#### public $backup_html : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method_getInstance" class="anchor"></a>
#### public getInstance() 

```
Static public getInstance() 
```

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)




<a name="method_detecturl" class="anchor"></a>
#### public detecturl() 

```
Static public detecturl(  $string) 
```

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $string  |  |




<a name="method_precode" class="anchor"></a>
#### public precode() 

```
Static public precode(  $string) 
```

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $string  |  |




<a name="method_clean_inline_style" class="anchor"></a>
#### public clean_inline_style() 

```
public clean_inline_style(array  $elements) 
```

**Summary**

Clean inline style from tags.

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $elements  |  |




<a name="method_removeSchema" class="anchor"></a>
#### public removeSchema() 

```
public removeSchema(  $html) 
```

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $html  |  |




<a name="method_parsingview" class="anchor"></a>
#### public parsingview() 

```
public parsingview(  $str, boolean  $reverse = false, array  $option = array()) 
```

**Summary**

Parsing view for translated agc.

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  | string to be fixed |
| <code>boolean</code> | $reverse  | reverse needles translator |
| <code>array</code> | $option  | $option['highlight']=true|false |




<a name="method_save_depencies" class="anchor"></a>
#### public save_depencies() 

```
public save_depencies() 
```

**Summary**

save stylesheet and scripts
* Calling this after parsingview().

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)




<a name="method_load_depencies" class="anchor"></a>
#### public load_depencies() 

```
public load_depencies() 
```

**Summary**

load stylesheet and scripts
* Calling this after parsingview().

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)




<a name="method_combine" class="anchor"></a>
#### public combine() 

```
public combine() 
```

**Summary**

combining string and stylesheet and scripts
* Calling this after parsingview().

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)




<a name="method___toString" class="anchor"></a>
#### public __toString() : string

```
public __toString() : string
```

**Summary**

print self::$string.

**Details:**
* Inherited From: [\AGC\loader\agcparser](../classes/AGC.loader.agcparser.md)

**Returns:** string - self::$string



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
