# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssAtCharsetParserPlugin
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

{@link aCssParserPlugin Parser plugin} for parsing @charset at-rule.

**Description:**

If a @charset at-rule was found this plugin will add a [CssAtCharsetToken](../classes/PHPWee.CssAtCharsetToken.md) to the parser.

---
### Constants
* No constants found
---
### Properties
* [protected $configuration](../classes/PHPWee.aCssParserPlugin.md#property_configuration)
* [protected $parser](../classes/PHPWee.aCssParserPlugin.md#property_parser)
* [protected $buffer](../classes/PHPWee.aCssParserPlugin.md#property_buffer)
---
### Methods
* [public __construct()](../classes/PHPWee.aCssParserPlugin.md#method___construct)
* [public getTriggerChars()](../classes/PHPWee.CssAtCharsetParserPlugin.md#method_getTriggerChars)
* [public getTriggerStates()](../classes/PHPWee.CssAtCharsetParserPlugin.md#method_getTriggerStates)
* [public parse()](../classes/PHPWee.CssAtCharsetParserPlugin.md#method_parse)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy: 
  * [\PHPWee\aCssParserPlugin](../classes/PHPWee.aCssParserPlugin.md)
  * \PHPWee\CssAtCharsetParserPlugin
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
* Inherited From: [\PHPWee\aCssParserPlugin](../classes/PHPWee.aCssParserPlugin.md)


<a name="property_parser"></a>
#### protected $parser : \PHPWee\CssParser
---
**Summary**

The CssParser of the plugin.

**Type:** <a href="../classes/PHPWee.CssParser.html">\PHPWee\CssParser</a>

**Details:**
* Inherited From: [\PHPWee\aCssParserPlugin](../classes/PHPWee.aCssParserPlugin.md)


<a name="property_buffer"></a>
#### protected $buffer : string
---
**Summary**

Plugin buffer.

**Type:** string

**Details:**
* Inherited From: [\PHPWee\aCssParserPlugin](../classes/PHPWee.aCssParserPlugin.md)



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() : void

```
public __construct(\PHPWee\CssParser  $parser, array  $configuration = null) : void
```

**Summary**

Constructor.

**Details:**
* Inherited From: [\PHPWee\aCssParserPlugin](../classes/PHPWee.aCssParserPlugin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code><a href="../classes/PHPWee.CssParser.html">\PHPWee\CssParser</a></code> | $parser  | the CssParser object of this plugin |
| <code>array</code> | $configuration  | Plugin configuration [optional] |

**Returns:** void


<a name="method_getTriggerChars" class="anchor"></a>
#### public getTriggerChars() : array

```
public getTriggerChars() : array
```

**Summary**

Implements {@link aCssParserPlugin::getTriggerChars()}.

**Details:**
* Inherited From: [\PHPWee\CssAtCharsetParserPlugin](../classes/PHPWee.CssAtCharsetParserPlugin.md)

**Returns:** array


<a name="method_getTriggerStates" class="anchor"></a>
#### public getTriggerStates() : array

```
public getTriggerStates() : array
```

**Summary**

Implements {@link aCssParserPlugin::getTriggerStates()}.

**Details:**
* Inherited From: [\PHPWee\CssAtCharsetParserPlugin](../classes/PHPWee.CssAtCharsetParserPlugin.md)

**Returns:** array


<a name="method_parse" class="anchor"></a>
#### public parse() : mixed

```
public parse(integer  $index, string  $char, string  $previousChar,   $state) : mixed
```

**Summary**

Implements {@link aCssParserPlugin::parse()}.

**Details:**
* Inherited From: [\PHPWee\CssAtCharsetParserPlugin](../classes/PHPWee.CssAtCharsetParserPlugin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>integer</code> | $index  | Current index |
| <code>string</code> | $char  | Current char |
| <code>string</code> | $previousChar  | Previous char |
| <code></code> | $state  |  |

**Returns:** mixed - TRUE will break the processing; FALSE continue with the next plugin; integer set a new index and break the processing



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
