# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssMinifier
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

CSS Minifier.

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public __construct()](../classes/PHPWee.CssMinifier.md#method___construct)
* [public minify()](../classes/PHPWee.CssMinifier.md#method_minify)
* [public getMinified()](../classes/PHPWee.CssMinifier.md#method_getMinified)
* [public getPlugin()](../classes/PHPWee.CssMinifier.md#method_getPlugin)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy:
  * \PHPWee\CssMinifier
* See Also:
  * [http://code.google.com/p/cssmin/](http://code.google.com/p/cssmin/)
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Joe Scylla <joe.scylla@gmail.com> |
| copyright |  | 2008 - 2011 Joe Scylla <joe.scylla@gmail.com> |
| license |  | http://opensource.org/licenses/mit-license.php MIT License |
| version | 3.0.1 |  |

---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() : void

```
public __construct(string  $source = null, array  $filters = null, array  $plugins = null) : void
```

**Summary**

Constructer.

**Description**

Creates instances of [filters](../classes/PHPWee.aCssMinifierFilter.md) and [plugins](../classes/PHPWee.aCssMinifierPlugin.md).

**Details:**
* Inherited From: [\PHPWee\CssMinifier](../classes/PHPWee.CssMinifier.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $source  | CSS source [optional] |
| <code>array</code> | $filters  | Filter configuration [optional] |
| <code>array</code> | $plugins  | Plugin configuration [optional] |

**Returns:** void


<a name="method_minify" class="anchor"></a>
#### public minify() : string

```
public minify(string  $source) : string
```

**Summary**

Minifies the CSS source.

**Details:**
* Inherited From: [\PHPWee\CssMinifier](../classes/PHPWee.CssMinifier.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $source  | CSS source |

**Returns:** string


<a name="method_getMinified" class="anchor"></a>
#### public getMinified() : string

```
public getMinified() : string
```

**Summary**

Returns the minified Source.

**Details:**
* Inherited From: [\PHPWee\CssMinifier](../classes/PHPWee.CssMinifier.md)

**Returns:** string


<a name="method_getPlugin" class="anchor"></a>
#### public getPlugin() : \PHPWee\aCssMinifierPlugin

```
public getPlugin(  $class) : \PHPWee\aCssMinifierPlugin
```

**Summary**

Returns a plugin by class name.

**Details:**
* Inherited From: [\PHPWee\CssMinifier](../classes/PHPWee.CssMinifier.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $class  |  |

**Returns:** <a href="../classes/PHPWee.aCssMinifierPlugin.html">\PHPWee\aCssMinifierPlugin</a>



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
