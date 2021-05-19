# [Universal Framework PHP Documentation](../home.md)

# Class: \Naneau\Obfuscator\Node\Visitor\ScramblePrivateMethod
### Namespace: [\Naneau\Obfuscator\Node\Visitor](../namespaces/Naneau.Obfuscator.Node.Visitor.md)
---
**Summary:**

ScramblePrivateMethod.

**Description:**

Renames private methods

WARNING

This method is not foolproof. This visitor scans for all private method
declarations and renames them. It then finds *all* method calls in the
class, and renames them if they match the name of a renamed method. If your
class calls a method of *another* class that happens to match one of the
renamed private methods, this visitor will rename it.

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public __construct()](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md#method___construct)
* [public addIgnore()](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md#method_addIgnore)
* [public getIgnore()](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md#method_getIgnore)
* [public setIgnore()](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md#method_setIgnore)
* [public getScrambler()](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md#method_getScrambler)
* [public setScrambler()](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md#method_setScrambler)
* [public beforeTraverse()](../classes/Naneau.Obfuscator.Node.Visitor.ScramblePrivateMethod.md#method_beforeTraverse)
* [public enterNode()](../classes/Naneau.Obfuscator.Node.Visitor.ScramblePrivateMethod.md#method_enterNode)
* [protected renamed()](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md#method_renamed)
* [protected getNewName()](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md#method_getNewName)
* [protected isRenamed()](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md#method_isRenamed)
* [protected resetRenamed()](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md#method_resetRenamed)
* [protected skip()](../classes/Naneau.Obfuscator.Node.Visitor.SkipTrait.md#method_skip)
* [protected shouldSkip()](../classes/Naneau.Obfuscator.Node.Visitor.SkipTrait.md#method_shouldSkip)
* [protected scramble()](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md#method_scramble)
* [protected scrambleString()](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md#method_scrambleString)
---
### Details
* File: [Naneau\Obfuscator\Node\Visitor\ScramblePrivateMethod.php](../files/Naneau.Obfuscator.Node.Visitor.ScramblePrivateMethod.md)
* Package: Default
* Class Hierarchy:  
  * [\PhpParser\NodeVisitorAbstract]()
  * [\Naneau\Obfuscator\Node\Visitor\Scrambler](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md)
  * \Naneau\Obfuscator\Node\Visitor\ScramblePrivateMethod
* Uses Traits:
  * [\Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)
  * [\Naneau\Obfuscator\Node\Visitor\SkipTrait](../classes/Naneau.Obfuscator.Node.Visitor.SkipTrait.md)
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| category |  | Naneau |

---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() : void

```
public __construct(\Naneau\Obfuscator\StringScrambler  $scrambler) : void
```

**Summary**

Constructor.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\Scrambler](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code><a href="../classes/Naneau.Obfuscator.StringScrambler.html">\Naneau\Obfuscator\StringScrambler</a></code> | $scrambler  |  |

**Returns:** void


<a name="method_addIgnore" class="anchor"></a>
#### public addIgnore() : \Naneau\Obfuscator\Node\Visitor\RenameParameterVisitor

```
public addIgnore(string&amp;#124;array&lt;mixed,string&gt;  $ignore) : \Naneau\Obfuscator\Node\Visitor\RenameParameterVisitor
```

**Summary**

Add a variable name to ignore.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\Scrambler](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string&#124;array&lt;mixed,string&gt;</code> | $ignore  |  |

**Returns:** \Naneau\Obfuscator\Node\Visitor\RenameParameterVisitor


<a name="method_getIgnore" class="anchor"></a>
#### public getIgnore() : array&lt;mixed,string&gt;

```
public getIgnore() : array&lt;mixed,string&gt;
```

**Summary**

Get variables to ignore.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\Scrambler](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md)

**Returns:** array&lt;mixed,string&gt;


<a name="method_setIgnore" class="anchor"></a>
#### public setIgnore() : \Naneau\Obfuscator\Node\Visitor\parent

```
public setIgnore(array&lt;mixed,string&gt;  $ignore) : \Naneau\Obfuscator\Node\Visitor\parent
```

**Summary**

Set variables to ignore.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\Scrambler](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array&lt;mixed,string&gt;</code> | $ignore  |  |

**Returns:** \Naneau\Obfuscator\Node\Visitor\parent


<a name="method_getScrambler" class="anchor"></a>
#### public getScrambler() : \Naneau\Obfuscator\StringScrambler

```
public getScrambler() : \Naneau\Obfuscator\StringScrambler
```

**Summary**

Get the string scrambler.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\Scrambler](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md)

**Returns:** <a href="../classes/Naneau.Obfuscator.StringScrambler.html">\Naneau\Obfuscator\StringScrambler</a>


<a name="method_setScrambler" class="anchor"></a>
#### public setScrambler() : \Naneau\Obfuscator\Node\Visitor\RenameParameter

```
public setScrambler(\Naneau\Obfuscator\StringScrambler  $scrambler) : \Naneau\Obfuscator\Node\Visitor\RenameParameter
```

**Summary**

Set the string scrambler.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\Scrambler](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code><a href="../classes/Naneau.Obfuscator.StringScrambler.html">\Naneau\Obfuscator\StringScrambler</a></code> | $scrambler  |  |

**Returns:** \Naneau\Obfuscator\Node\Visitor\RenameParameter


<a name="method_beforeTraverse" class="anchor"></a>
#### public beforeTraverse() : array

```
public beforeTraverse(array&lt;mixed,\PhpParser\Node&gt;  $nodes) : array
```

**Summary**

Before node traversal.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\ScramblePrivateMethod](../classes/Naneau.Obfuscator.Node.Visitor.ScramblePrivateMethod.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array&lt;mixed,\PhpParser\Node&gt;</code> | $nodes  |  |

**Returns:** array


<a name="method_enterNode" class="anchor"></a>
#### public enterNode() : void

```
public enterNode(\PhpParser\Node  $node) : void
```

**Summary**

Check all variable nodes.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\ScramblePrivateMethod](../classes/Naneau.Obfuscator.Node.Visitor.ScramblePrivateMethod.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\PhpParser\Node</code> | $node  |  |

**Returns:** void


<a name="method_renamed" class="anchor"></a>
#### protected renamed() : \Naneau\Obfuscator\Node\Visitor\SkipTrait

```
protected renamed(string  $method, string  $newName) : \Naneau\Obfuscator\Node\Visitor\SkipTrait
```

**Summary**

Record renaming of method.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $method  |  |
| <code>string</code> | $newName  |  |

**Returns:** <a href="../classes/Naneau.Obfuscator.Node.Visitor.SkipTrait.html">\Naneau\Obfuscator\Node\Visitor\SkipTrait</a>


<a name="method_getNewName" class="anchor"></a>
#### protected getNewName() : string

```
protected getNewName(string  $method) : string
```

**Summary**

Get new name of a method.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $method  |  |

**Returns:** string


<a name="method_isRenamed" class="anchor"></a>
#### protected isRenamed() : boolean

```
protected isRenamed(string  $method) : boolean
```

**Summary**

Has a method been renamed?

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $method  |  |

**Returns:** boolean


<a name="method_resetRenamed" class="anchor"></a>
#### protected resetRenamed() : \Naneau\Obfuscator\Node\Visitor\SkipTrait

```
protected resetRenamed() : \Naneau\Obfuscator\Node\Visitor\SkipTrait
```

**Summary**

Reset renamed list.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\TrackingRenamerTrait](../classes/Naneau.Obfuscator.Node.Visitor.TrackingRenamerTrait.md)

**Returns:** <a href="../classes/Naneau.Obfuscator.Node.Visitor.SkipTrait.html">\Naneau\Obfuscator\Node\Visitor\SkipTrait</a>


<a name="method_skip" class="anchor"></a>
#### protected skip() : \Naneau\Obfuscator\Node\Visitor\ScramblePrivateMethod

```
protected skip(boolean  $skip = false) : \Naneau\Obfuscator\Node\Visitor\ScramblePrivateMethod
```

**Summary**

Should we skip processing?

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\SkipTrait](../classes/Naneau.Obfuscator.Node.Visitor.SkipTrait.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>boolean</code> | $skip  |  |

**Returns:** <a href="../classes/Naneau.Obfuscator.Node.Visitor.ScramblePrivateMethod.html">\Naneau\Obfuscator\Node\Visitor\ScramblePrivateMethod</a>


<a name="method_shouldSkip" class="anchor"></a>
#### protected shouldSkip() : boolean

```
protected shouldSkip() : boolean
```

**Summary**

Should we skip processing?

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\SkipTrait](../classes/Naneau.Obfuscator.Node.Visitor.SkipTrait.md)

**Returns:** boolean


<a name="method_scramble" class="anchor"></a>
#### protected scramble() : \PhpParser\Node

```
protected scramble(\PhpParser\Node  $node, string  $var = &#039;name&#039;) : \PhpParser\Node
```

**Summary**

Scramble a property of a node.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\Scrambler](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\PhpParser\Node</code> | $node  |  |
| <code>string</code> | $var  | property to scramble |

**Returns:** \PhpParser\Node


<a name="method_scrambleString" class="anchor"></a>
#### protected scrambleString() : string

```
protected scrambleString(string  $string) : string
```

**Summary**

Scramble a string.

**Details:**
* Inherited From: [\Naneau\Obfuscator\Node\Visitor\Scrambler](../classes/Naneau.Obfuscator.Node.Visitor.Scrambler.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $string  |  |

**Returns:** string



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
