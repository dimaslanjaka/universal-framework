# [Universal Framework PHP Documentation](../home.md)

# Class: \PHPWee\JSMin
### Namespace: [\PHPWee](../namespaces/PHPWee.md)
---
**Summary:**

JSMin.php - modified PHP implementation of Douglas Crockford's JSMin.

**Description:**

<code>
$minifiedJs = JSMin::minify($js);
</code>

This is a modified port of jsmin.c. Improvements:

Does not choke on some regexp literals containing quote characters. E.g. /'/

Spaces are preserved after some add/sub operators, so they are not mistakenly
converted to post-inc/dec. E.g. a + ++b -> a+ ++b

Preserves multi-line comments that begin with /*!

PHP 5 or higher is required.

Permission is hereby granted to use this version of the library under the
same terms as jsmin.c, which has the following license:

--
Copyright (c) 2002 Douglas Crockford  (www.crockford.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
--

---
### Constants
* [ ORD_LF](../classes/PHPWee.JSMin.md#constant_ORD_LF)
* [ ORD_SPACE](../classes/PHPWee.JSMin.md#constant_ORD_SPACE)
* [ ACTION_KEEP_A](../classes/PHPWee.JSMin.md#constant_ACTION_KEEP_A)
* [ ACTION_DELETE_A](../classes/PHPWee.JSMin.md#constant_ACTION_DELETE_A)
* [ ACTION_DELETE_A_B](../classes/PHPWee.JSMin.md#constant_ACTION_DELETE_A_B)
---
### Properties
* [protected $a](../classes/PHPWee.JSMin.md#property_a)
* [protected $b](../classes/PHPWee.JSMin.md#property_b)
* [protected $input](../classes/PHPWee.JSMin.md#property_input)
* [protected $inputIndex](../classes/PHPWee.JSMin.md#property_inputIndex)
* [protected $inputLength](../classes/PHPWee.JSMin.md#property_inputLength)
* [protected $lookAhead](../classes/PHPWee.JSMin.md#property_lookAhead)
* [protected $output](../classes/PHPWee.JSMin.md#property_output)
* [protected $lastByteOut](../classes/PHPWee.JSMin.md#property_lastByteOut)
* [protected $keptComment](../classes/PHPWee.JSMin.md#property_keptComment)
---
### Methods
* [public __construct()](../classes/PHPWee.JSMin.md#method___construct)
* [public minify()](../classes/PHPWee.JSMin.md#method_minify)
* [public min()](../classes/PHPWee.JSMin.md#method_min)
* [protected action()](../classes/PHPWee.JSMin.md#method_action)
* [protected get()](../classes/PHPWee.JSMin.md#method_get)
* [protected isEOF()](../classes/PHPWee.JSMin.md#method_isEOF)
* [protected next()](../classes/PHPWee.JSMin.md#method_next)
* [protected peek()](../classes/PHPWee.JSMin.md#method_peek)
* [protected consumeSingleLineComment()](../classes/PHPWee.JSMin.md#method_consumeSingleLineComment)
* [protected consumeMultipleLineComment()](../classes/PHPWee.JSMin.md#method_consumeMultipleLineComment)
* [protected isRegexpLiteral()](../classes/PHPWee.JSMin.md#method_isRegexpLiteral)
* [protected isAlphaNum()](../classes/PHPWee.JSMin.md#method_isAlphaNum)
---
### Details
* File: [phpwee\src\JsMin\JsMin.php](../files/phpwee.src.JsMin.JsMin.md)
* Package: Default
* Class Hierarchy:
  * \PHPWee\JSMin
* See Also:
  * [http://code.google.com/p/jsmin-php/](http://code.google.com/p/jsmin-php/)
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| author |  | Ryan Grove <ryan@wonko.com> (PHP port) |
| author |  | Steve Clay <steve@mrclay.org> (modifications + cleanup) |
| author |  | Andrea Giammarchi <http://www.3site.eu> (spaceBeforeRegExp) |
| copyright |  | 2002 Douglas Crockford <douglas@crockford.com> (jsmin.c) |
| copyright |  | 2008 Ryan Grove <ryan@wonko.com> (PHP port) |
| license |  | http://opensource.org/licenses/mit-license.php MIT License |
---
## Constants
<a name="constant_ORD_LF" class="anchor"></a>
###### ORD_LF
```
ORD_LF = 10
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_ORD_SPACE" class="anchor"></a>
###### ORD_SPACE
```
ORD_SPACE = 32
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_ACTION_KEEP_A" class="anchor"></a>
###### ACTION_KEEP_A
```
ACTION_KEEP_A = 1
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_ACTION_DELETE_A" class="anchor"></a>
###### ACTION_DELETE_A
```
ACTION_DELETE_A = 2
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_ACTION_DELETE_A_B" class="anchor"></a>
###### ACTION_DELETE_A_B
```
ACTION_DELETE_A_B = 3
```

| Tag | Version | Desc |
| --- | ------- | ---- |

---
## Properties
<a name="property_a"></a>
#### protected $a : 
---
**Type:** 

**Details:**


<a name="property_b"></a>
#### protected $b : 
---
**Type:** 

**Details:**


<a name="property_input"></a>
#### protected $input : 
---
**Type:** 

**Details:**


<a name="property_inputIndex"></a>
#### protected $inputIndex : 
---
**Type:** 

**Details:**


<a name="property_inputLength"></a>
#### protected $inputLength : 
---
**Type:** 

**Details:**


<a name="property_lookAhead"></a>
#### protected $lookAhead : 
---
**Type:** 

**Details:**


<a name="property_output"></a>
#### protected $output : 
---
**Type:** 

**Details:**


<a name="property_lastByteOut"></a>
#### protected $lastByteOut : 
---
**Type:** 

**Details:**


<a name="property_keptComment"></a>
#### protected $keptComment : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(string  $input) 
```

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $input  |  |




<a name="method_minify" class="anchor"></a>
#### public minify() : string

```
Static public minify(string  $js) : string
```

**Summary**

Minify Javascript.

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $js  | Javascript to be minified |

**Returns:** string


<a name="method_min" class="anchor"></a>
#### public min() : string

```
public min() : string
```

**Summary**

Perform minification, return result.

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)

**Returns:** string


<a name="method_action" class="anchor"></a>
#### protected action() 

```
protected action(integer  $command) 
```

**Summary**

ACTION_KEEP_A = Output A. Copy B to A. Get the next B.

**Description**

ACTION_DELETE_A = Copy B to A. Get the next B.
ACTION_DELETE_A_B = Get the next B.

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>integer</code> | $command  |  |
##### Throws:
| Type | Description |
| ---- | ----------- |
| \PHPWee\JSMin_UnterminatedRegExpException&#124;\PHPWee\JSMin_UnterminatedStringException |  |




<a name="method_get" class="anchor"></a>
#### protected get() : string

```
protected get() : string
```

**Summary**

Return the next character from stdin. Watch out for lookahead. If the character is a control character,
translate it to a space or linefeed.

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)

**Returns:** string


<a name="method_isEOF" class="anchor"></a>
#### protected isEOF() : boolean

```
protected isEOF(string  $a) : boolean
```

**Summary**

Does $a indicate end of input?

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $a  |  |

**Returns:** boolean


<a name="method_next" class="anchor"></a>
#### protected next() : string

```
protected next() : string
```

**Summary**

Get the next character, skipping over comments. Some comments may be preserved.

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)

**Returns:** string


<a name="method_peek" class="anchor"></a>
#### protected peek() : string

```
protected peek() : string
```

**Summary**

Get next char (without getting it). If is ctrl character, translate to a space or newline.

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)

**Returns:** string


<a name="method_consumeSingleLineComment" class="anchor"></a>
#### protected consumeSingleLineComment() 

```
protected consumeSingleLineComment() 
```

**Summary**

Consume a single line comment from input (possibly retaining it).

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)




<a name="method_consumeMultipleLineComment" class="anchor"></a>
#### protected consumeMultipleLineComment() 

```
protected consumeMultipleLineComment() 
```

**Summary**

Consume a multiple line comment from input (possibly retaining it).

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)
##### Throws:
| Type | Description |
| ---- | ----------- |
| \PHPWee\JSMin_UnterminatedCommentException |  |




<a name="method_isRegexpLiteral" class="anchor"></a>
#### protected isRegexpLiteral() : boolean

```
protected isRegexpLiteral() : boolean
```

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)

**Returns:** boolean


<a name="method_isAlphaNum" class="anchor"></a>
#### protected isAlphaNum() : boolean

```
protected isAlphaNum(string  $c) : boolean
```

**Summary**

Return true if the character is a letter, digit, underscore, dollar sign, or non-ASCII character.

**Details:**
* Inherited From: [\PHPWee\JSMin](../classes/PHPWee.JSMin.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $c  |  |

**Returns:** boolean



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
