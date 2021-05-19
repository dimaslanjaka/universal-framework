# [Universal Framework PHP Documentation](../home.md)

# Class: \Naneau\Obfuscator\Obfuscator
### Namespace: [\Naneau\Obfuscator](../namespaces/Naneau.Obfuscator.md)
---
**Summary:**

Obfuscator.

**Description:**

Obfuscates a directory of files

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public obfuscate()](../classes/Naneau.Obfuscator.Obfuscator.md#method_obfuscate)
* [public getFileRegex()](../classes/Naneau.Obfuscator.Obfuscator.md#method_getFileRegex)
* [public setFileRegex()](../classes/Naneau.Obfuscator.Obfuscator.md#method_setFileRegex)
* [public getEventDispatcher()](../classes/Naneau.Obfuscator.Obfuscator.md#method_getEventDispatcher)
* [public setEventDispatcher()](../classes/Naneau.Obfuscator.Obfuscator.md#method_setEventDispatcher)
* [public getTraverser()](../classes/Naneau.Obfuscator.Obfuscator.md#method_getTraverser)
* [public setTraverser()](../classes/Naneau.Obfuscator.Obfuscator.md#method_setTraverser)
* [public getParser()](../classes/Naneau.Obfuscator.Obfuscator.md#method_getParser)
* [public setParser()](../classes/Naneau.Obfuscator.Obfuscator.md#method_setParser)
* [public getPrettyPrinter()](../classes/Naneau.Obfuscator.Obfuscator.md#method_getPrettyPrinter)
* [public setPrettyPrinter()](../classes/Naneau.Obfuscator.Obfuscator.md#method_setPrettyPrinter)
---
### Details
* File: [Naneau\Obfuscator\Obfuscator.php](../files/Naneau.Obfuscator.Obfuscator.md)
* Package: Default
* Class Hierarchy:
  * \Naneau\Obfuscator\Obfuscator
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| category |  | Naneau |

---
## Methods
<a name="method_obfuscate" class="anchor"></a>
#### public obfuscate() : void

```
public obfuscate(string  $directory, boolean  $stripWhitespace = false,   $ignoreError = false) : void
```

**Summary**

Strip whitespace.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $directory  |  |
| <code>boolean</code> | $stripWhitespace  |  |
| <code></code> | $ignoreError  |  |

**Returns:** void


<a name="method_getFileRegex" class="anchor"></a>
#### public getFileRegex() : string

```
public getFileRegex() : string
```

**Summary**

Get the regex for file inclusion.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)

**Returns:** string


<a name="method_setFileRegex" class="anchor"></a>
#### public setFileRegex() : \Naneau\Obfuscator\Obfuscator

```
public setFileRegex(string  $fileRegex) : \Naneau\Obfuscator\Obfuscator
```

**Summary**

Set the regex for file inclusion.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $fileRegex  |  |

**Returns:** <a href="../classes/Naneau.Obfuscator.Obfuscator.html">\Naneau\Obfuscator\Obfuscator</a>


<a name="method_getEventDispatcher" class="anchor"></a>
#### public getEventDispatcher() : \Symfony\Component\EventDispatcher\EventDispatcher

```
public getEventDispatcher() : \Symfony\Component\EventDispatcher\EventDispatcher
```

**Summary**

Get the event dispatcher.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)

**Returns:** \Symfony\Component\EventDispatcher\EventDispatcher


<a name="method_setEventDispatcher" class="anchor"></a>
#### public setEventDispatcher() : \Naneau\Obfuscator\Obfuscator

```
public setEventDispatcher(\Symfony\Component\EventDispatcher\EventDispatcher  $eventDispatcher) : \Naneau\Obfuscator\Obfuscator
```

**Summary**

Set the event dispatcher.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\Symfony\Component\EventDispatcher\EventDispatcher</code> | $eventDispatcher  |  |

**Returns:** <a href="../classes/Naneau.Obfuscator.Obfuscator.html">\Naneau\Obfuscator\Obfuscator</a>


<a name="method_getTraverser" class="anchor"></a>
#### public getTraverser() : \PhpParser\NodeTraverserInterface

```
public getTraverser() : \PhpParser\NodeTraverserInterface
```

**Summary**

Get the node traverser.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)

**Returns:** \PhpParser\NodeTraverserInterface


<a name="method_setTraverser" class="anchor"></a>
#### public setTraverser() : \Naneau\Obfuscator\Obfuscator

```
public setTraverser(\PhpParser\NodeTraverserInterface  $traverser) : \Naneau\Obfuscator\Obfuscator
```

**Summary**

Set the node traverser.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\PhpParser\NodeTraverserInterface</code> | $traverser  |  |

**Returns:** <a href="../classes/Naneau.Obfuscator.Obfuscator.html">\Naneau\Obfuscator\Obfuscator</a>


<a name="method_getParser" class="anchor"></a>
#### public getParser() : \PhpParser\Parser

```
public getParser() : \PhpParser\Parser
```

**Summary**

Get the parser.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)

**Returns:** \PhpParser\Parser


<a name="method_setParser" class="anchor"></a>
#### public setParser() : \Naneau\Obfuscator\Obfuscator

```
public setParser(\PhpParser\Parser  $parser) : \Naneau\Obfuscator\Obfuscator
```

**Summary**

Set the parser.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\PhpParser\Parser</code> | $parser  |  |

**Returns:** <a href="../classes/Naneau.Obfuscator.Obfuscator.html">\Naneau\Obfuscator\Obfuscator</a>


<a name="method_getPrettyPrinter" class="anchor"></a>
#### public getPrettyPrinter() : \PhpParser\PrettyPrinter\Standard

```
public getPrettyPrinter() : \PhpParser\PrettyPrinter\Standard
```

**Summary**

Get the "pretty" printer.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)

**Returns:** \PhpParser\PrettyPrinter\Standard


<a name="method_setPrettyPrinter" class="anchor"></a>
#### public setPrettyPrinter() : \Naneau\Obfuscator\Obfuscator

```
public setPrettyPrinter(\PhpParser\PrettyPrinter\Standard  $prettyPrinter) : \Naneau\Obfuscator\Obfuscator
```

**Summary**

Set the "pretty" printer.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Obfuscator](../classes/Naneau.Obfuscator.Obfuscator.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\PhpParser\PrettyPrinter\Standard</code> | $prettyPrinter  |  |

**Returns:** <a href="../classes/Naneau.Obfuscator.Obfuscator.html">\Naneau\Obfuscator\Obfuscator</a>



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
