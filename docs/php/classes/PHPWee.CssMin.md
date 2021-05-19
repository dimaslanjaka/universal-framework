# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssMin
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

CssMin - A (simple) css minifier with benefits.

**Description:**

--
Copyright (c) 2011 Joe Scylla <joe.scylla@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
--

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public autoload()](../classes/PHPWee.CssMin.md#method_autoload)
* [public getErrors()](../classes/PHPWee.CssMin.md#method_getErrors)
* [public hasErrors()](../classes/PHPWee.CssMin.md#method_hasErrors)
* [public initialise()](../classes/PHPWee.CssMin.md#method_initialise)
* [public minify()](../classes/PHPWee.CssMin.md#method_minify)
* [public parse()](../classes/PHPWee.CssMin.md#method_parse)
* [public setVerbose()](../classes/PHPWee.CssMin.md#method_setVerbose)
* [public triggerError()](../classes/PHPWee.CssMin.md#method_triggerError)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy:
  * \PHPWee\CssMin
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
<a name="method_autoload" class="anchor"></a>
#### public autoload() : void

```
Static public autoload(string  $class) : void
```

**Summary**

{@link http://goo.gl/JrW54 Autoload} function of CssMin.

**Details:**
* Inherited From: [\PHPWee\CssMin](../classes/PHPWee.CssMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $class  | Name of the class |

**Returns:** void


<a name="method_getErrors" class="anchor"></a>
#### public getErrors() : array

```
Static public getErrors() : array
```

**Summary**

Return errors.

**Details:**
* Inherited From: [\PHPWee\CssMin](../classes/PHPWee.CssMin.md)

**Returns:** array - of {CssError}


<a name="method_hasErrors" class="anchor"></a>
#### public hasErrors() : boolean

```
Static public hasErrors() : boolean
```

**Summary**

Returns if there were errors.

**Details:**
* Inherited From: [\PHPWee\CssMin](../classes/PHPWee.CssMin.md)

**Returns:** boolean


<a name="method_initialise" class="anchor"></a>
#### public initialise() : void

```
Static public initialise() : void
```

**Summary**

Initialises CssMin.

**Details:**
* Inherited From: [\PHPWee\CssMin](../classes/PHPWee.CssMin.md)

**Returns:** void


<a name="method_minify" class="anchor"></a>
#### public minify() : string

```
Static public minify(string  $source, array  $filters = null, array  $plugins = null) : string
```

**Summary**

Minifies CSS source.

**Details:**
* Inherited From: [\PHPWee\CssMin](../classes/PHPWee.CssMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $source  | CSS source |
| <code>array</code> | $filters  | Filter configuration [optional] |
| <code>array</code> | $plugins  | Plugin configuration [optional] |

**Returns:** string - Minified CSS


<a name="method_parse" class="anchor"></a>
#### public parse() : array

```
Static public parse(string  $source, array  $plugins = null) : array
```

**Summary**

Parse the CSS source.

**Details:**
* Inherited From: [\PHPWee\CssMin](../classes/PHPWee.CssMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $source  | CSS source |
| <code>array</code> | $plugins  | Plugin configuration [optional] |

**Returns:** array - Array of aCssToken


<a name="method_setVerbose" class="anchor"></a>
#### public setVerbose() : boolean

```
Static public setVerbose(boolean  $to) : boolean
```

**Summary**

--.

**Details:**
* Inherited From: [\PHPWee\CssMin](../classes/PHPWee.CssMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>boolean</code> | $to  |  |

**Returns:** boolean


<a name="method_triggerError" class="anchor"></a>
#### public triggerError() : void

```
Static public triggerError(\PHPWee\CssError  $error) : void
```

**Summary**

--.

**Details:**
* Inherited From: [\PHPWee\CssMin](../classes/PHPWee.CssMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code><a href="../classes/PHPWee.CssError.html">\PHPWee\CssError</a></code> | $error  |  |

**Returns:** void



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
