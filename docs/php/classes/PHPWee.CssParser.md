# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\CssParser
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

CSS Parser.

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public __construct()](../classes/PHPWee.CssParser.md#method___construct)
* [public parse()](../classes/PHPWee.CssParser.md#method_parse)
* [public appendToken()](../classes/PHPWee.CssParser.md#method_appendToken)
* [public clearBuffer()](../classes/PHPWee.CssParser.md#method_clearBuffer)
* [public getAndClearBuffer()](../classes/PHPWee.CssParser.md#method_getAndClearBuffer)
* [public getBuffer()](../classes/PHPWee.CssParser.md#method_getBuffer)
* [public setBuffer()](../classes/PHPWee.CssParser.md#method_setBuffer)
* [public getMediaTypes()](../classes/PHPWee.CssParser.md#method_getMediaTypes)
* [public getSource()](../classes/PHPWee.CssParser.md#method_getSource)
* [public getState()](../classes/PHPWee.CssParser.md#method_getState)
* [public setState()](../classes/PHPWee.CssParser.md#method_setState)
* [public getPlugin()](../classes/PHPWee.CssParser.md#method_getPlugin)
* [public getTokens()](../classes/PHPWee.CssParser.md#method_getTokens)
* [public isState()](../classes/PHPWee.CssParser.md#method_isState)
* [public popState()](../classes/PHPWee.CssParser.md#method_popState)
* [public pushState()](../classes/PHPWee.CssParser.md#method_pushState)
* [public setExclusive()](../classes/PHPWee.CssParser.md#method_setExclusive)
* [public setMediaTypes()](../classes/PHPWee.CssParser.md#method_setMediaTypes)
* [public unsetExclusive()](../classes/PHPWee.CssParser.md#method_unsetExclusive)
* [public unsetMediaTypes()](../classes/PHPWee.CssParser.md#method_unsetMediaTypes)
---
### Details
* File: [phpwee\src\CssMin\CssMin.php](../files/phpwee.src.CssMin.CssMin.md)
* Package: Default
* Class Hierarchy:
  * \PHPWee\CssParser
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
public __construct(string  $source = null, array  $plugins = null) : void
```

**Summary**

Constructer.

**Description**

Create instances of the used [plugins](../classes/PHPWee.aCssParserPlugin.md).

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $source  | CSS source [optional] |
| <code>array</code> | $plugins  | Plugin configuration [optional] |

**Returns:** void


<a name="method_parse" class="anchor"></a>
#### public parse() : array

```
public parse(string  $source) : array
```

**Summary**

Parse the CSS source and return a array with parsed tokens.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $source  | CSS source |

**Returns:** array - Array with tokens


<a name="method_appendToken" class="anchor"></a>
#### public appendToken() : void

```
public appendToken(\PHPWee\aCssToken  $token) : void
```

**Summary**

Append a token to the array of tokens.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code><a href="../classes/PHPWee.aCssToken.html">\PHPWee\aCssToken</a></code> | $token  | Token to append |

**Returns:** void


<a name="method_clearBuffer" class="anchor"></a>
#### public clearBuffer() : void

```
public clearBuffer() : void
```

**Summary**

Clears the current buffer.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)

**Returns:** void


<a name="method_getAndClearBuffer" class="anchor"></a>
#### public getAndClearBuffer() : string

```
public getAndClearBuffer(string  $trim = &#039;&#039;, boolean  $tolower = false) : string
```

**Summary**

Returns and clear the current buffer.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $trim  | Chars to use to trim the returned buffer |
| <code>boolean</code> | $tolower  | if TRUE the returned buffer will get converted to lower case |

**Returns:** string


<a name="method_getBuffer" class="anchor"></a>
#### public getBuffer() : string

```
public getBuffer(string  $trim = &#039;&#039;, boolean  $tolower = false) : string
```

**Summary**

Returns the current buffer.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $trim  | Chars to use to trim the returned buffer |
| <code>boolean</code> | $tolower  | if TRUE the returned buffer will get converted to lower case |

**Returns:** string


<a name="method_setBuffer" class="anchor"></a>
#### public setBuffer() : void

```
public setBuffer(string  $buffer) : void
```

**Summary**

Sets/restores the buffer.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $buffer  | Buffer to set |

**Returns:** void


<a name="method_getMediaTypes" class="anchor"></a>
#### public getMediaTypes() : array

```
public getMediaTypes() : array
```

**Summary**

Returns the current media types state.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)

**Returns:** array


<a name="method_getSource" class="anchor"></a>
#### public getSource() : string

```
public getSource() : string
```

**Summary**

Returns the CSS source.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)

**Returns:** string


<a name="method_getState" class="anchor"></a>
#### public getState() : integer

```
public getState() : integer
```

**Summary**

Returns the current state.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)

**Returns:** integer - The current state


<a name="method_setState" class="anchor"></a>
#### public setState() : integer

```
public setState(integer  $state) : integer
```

**Summary**

Sets the current state in the state stack; equals to {@link CssParser::popState()} + {@link CssParser::pushState()}.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>integer</code> | $state  | State to set |

**Returns:** integer


<a name="method_getPlugin" class="anchor"></a>
#### public getPlugin() : \PHPWee\aCssParserPlugin

```
public getPlugin(  $class) : \PHPWee\aCssParserPlugin
```

**Summary**

Returns a plugin by class name.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $class  |  |

**Returns:** <a href="../classes/PHPWee.aCssParserPlugin.html">\PHPWee\aCssParserPlugin</a>


<a name="method_getTokens" class="anchor"></a>
#### public getTokens() : array

```
public getTokens() : array
```

**Summary**

Returns the parsed tokens.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)

**Returns:** array


<a name="method_isState" class="anchor"></a>
#### public isState() : boolean

```
public isState(integer  $state) : boolean
```

**Summary**

Returns if the current state equals the passed state.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>integer</code> | $state  | State to compare with the current state |

**Returns:** boolean - TRUE is the state equals to the passed state; FALSE if not


<a name="method_popState" class="anchor"></a>
#### public popState() : integer

```
public popState() : integer
```

**Summary**

Remove the last state of the state stack and return the removed stack value.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)

**Returns:** integer - Removed state value


<a name="method_pushState" class="anchor"></a>
#### public pushState() : integer

```
public pushState(integer  $state) : integer
```

**Summary**

Adds a new state onto the state stack.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>integer</code> | $state  | state to add onto the state stack |

**Returns:** integer - The index of the added state in the state stacks


<a name="method_setExclusive" class="anchor"></a>
#### public setExclusive() : void

```
public setExclusive(string  $exclusive) : void
```

**Summary**

Set the exclusive state.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $exclusive  | Exclusive state |

**Returns:** void


<a name="method_setMediaTypes" class="anchor"></a>
#### public setMediaTypes() : void

```
public setMediaTypes(array  $mediaTypes) : void
```

**Summary**

Set the media types state.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $mediaTypes  | Media types state |

**Returns:** void


<a name="method_unsetExclusive" class="anchor"></a>
#### public unsetExclusive() : void

```
public unsetExclusive() : void
```

**Summary**

Removes the exclusive state.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)

**Returns:** void


<a name="method_unsetMediaTypes" class="anchor"></a>
#### public unsetMediaTypes() : void

```
public unsetMediaTypes() : void
```

**Summary**

Removes the media types state.

**Details:**
* Inherited From: [\PHPWee\CssParser](../classes/PHPWee.CssParser.md)

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
