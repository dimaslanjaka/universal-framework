# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssCompressExpressionValuesMinifierPlugin
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

This {@link aCssMinifierPlugin} compress the content of expresssion() declaration values.

**Description:**

For compression of expressions [JSMin](https://github.com/rgrove/jsmin-php/) will get used. JSMin have to be
already included or loadable via [PHP autoloading](http://goo.gl/JrW54).

---
### Constants
* No constants found
---
### Properties
* [protected $configuration](../classes/PHPWee.aCssMinifierPlugin.md#property_configuration)
* [protected $minifier](../classes/PHPWee.aCssMinifierPlugin.md#property_minifier)
---
### Methods
* [public __construct()](../classes/PHPWee.aCssMinifierPlugin.md#method___construct)
* [public apply()](../classes/PHPWee.CssCompressExpressionValuesMinifierPlugin.md#method_apply)
* [public getTriggerTokens()](../classes/PHPWee.CssCompressExpressionValuesMinifierPlugin.md#method_getTriggerTokens)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy: 
  * [\PHPWee\aCssMinifierPlugin](../classes/PHPWee.aCssMinifierPlugin.md)
  * \PHPWee\CssCompressExpressionValuesMinifierPlugin
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
## Properties
<a name="property_configuration"></a>
#### protected $configuration : array
---
**Summary**

Plugin configuration.

**Type:** array

**Details:**
* Inherited From: [\PHPWee\aCssMinifierPlugin](../classes/PHPWee.aCssMinifierPlugin.md)


<a name="property_minifier"></a>
#### protected $minifier : \PHPWee\CssMinifier
---
**Summary**

The CssMinifier of the plugin.

**Type:** <a href="../classes/PHPWee.CssMinifier.html">\PHPWee\CssMinifier</a>

**Details:**
* Inherited From: [\PHPWee\aCssMinifierPlugin](../classes/PHPWee.aCssMinifierPlugin.md)



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() : void

```
public __construct(\PHPWee\CssMinifier  $minifier, array  $configuration = array()) : void
```

**Summary**

Constructor.

**Details:**
* Inherited From: [\PHPWee\aCssMinifierPlugin](../classes/PHPWee.aCssMinifierPlugin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code><a href="../classes/PHPWee.CssMinifier.html">\PHPWee\CssMinifier</a></code> | $minifier  | the CssMinifier object of this plugin |
| <code>array</code> | $configuration  | Plugin configuration [optional] |

**Returns:** void


<a name="method_apply" class="anchor"></a>
#### public apply() : boolean

```
public apply(\PHPWee\aCssToken  $token) : boolean
```

**Summary**

Implements {@link aCssMinifierPlugin::minify()}.

**Details:**
* Inherited From: [\PHPWee\CssCompressExpressionValuesMinifierPlugin](../classes/PHPWee.CssCompressExpressionValuesMinifierPlugin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code><a href="../classes/PHPWee.aCssToken.html">\PHPWee\aCssToken</a></code> | $token  | Token to process |

**Returns:** boolean - Return TRUE to break the processing of this token; FALSE to continue


<a name="method_getTriggerTokens" class="anchor"></a>
#### public getTriggerTokens() : array

```
public getTriggerTokens() : array
```

**Summary**

Implements {@link aMinifierPlugin::getTriggerTokens()}.

**Details:**
* Inherited From: [\PHPWee\CssCompressExpressionValuesMinifierPlugin](../classes/PHPWee.CssCompressExpressionValuesMinifierPlugin.md)

**Returns:** array



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
