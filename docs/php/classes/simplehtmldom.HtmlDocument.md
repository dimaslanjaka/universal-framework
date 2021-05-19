# [Universal Framework PHP Documentation](../home.md)

# Class: \simplehtmldom\HtmlDocument
### Namespace: [\simplehtmldom](../namespaces/simplehtmldom.md)
---
**Summary:**

HTMLDocument class.

---
### Constants
* No constants found
---
### Properties
* [public $root](../classes/simplehtmldom.HtmlDocument.md#property_root)
* [public $nodes](../classes/simplehtmldom.HtmlDocument.md#property_nodes)
* [public $callback](../classes/simplehtmldom.HtmlDocument.md#property_callback)
* [public $lowercase](../classes/simplehtmldom.HtmlDocument.md#property_lowercase)
* [public $original_size](../classes/simplehtmldom.HtmlDocument.md#property_original_size)
* [public $size](../classes/simplehtmldom.HtmlDocument.md#property_size)
* [public $_charset](../classes/simplehtmldom.HtmlDocument.md#property__charset)
* [public $_target_charset](../classes/simplehtmldom.HtmlDocument.md#property__target_charset)
* [public $default_br_text](../classes/simplehtmldom.HtmlDocument.md#property_default_br_text)
* [public $default_span_text](../classes/simplehtmldom.HtmlDocument.md#property_default_span_text)
* [protected $pos](../classes/simplehtmldom.HtmlDocument.md#property_pos)
* [protected $doc](../classes/simplehtmldom.HtmlDocument.md#property_doc)
* [protected $char](../classes/simplehtmldom.HtmlDocument.md#property_char)
* [protected $cursor](../classes/simplehtmldom.HtmlDocument.md#property_cursor)
* [protected $parent](../classes/simplehtmldom.HtmlDocument.md#property_parent)
* [protected $noise](../classes/simplehtmldom.HtmlDocument.md#property_noise)
* [protected $token_blank](../classes/simplehtmldom.HtmlDocument.md#property_token_blank)
* [protected $token_equal](../classes/simplehtmldom.HtmlDocument.md#property_token_equal)
* [protected $token_slash](../classes/simplehtmldom.HtmlDocument.md#property_token_slash)
* [protected $token_attr](../classes/simplehtmldom.HtmlDocument.md#property_token_attr)
* [protected $self_closing_tags](../classes/simplehtmldom.HtmlDocument.md#property_self_closing_tags)
* [protected $block_tags](../classes/simplehtmldom.HtmlDocument.md#property_block_tags)
* [protected $optional_closing_tags](../classes/simplehtmldom.HtmlDocument.md#property_optional_closing_tags)
---
### Methods
* [public __construct()](../classes/simplehtmldom.HtmlDocument.md#method___construct)
* [public load()](../classes/simplehtmldom.HtmlDocument.md#method_load)
* [public restore_noise()](../classes/simplehtmldom.HtmlDocument.md#method_restore_noise)
* [public __call()](../classes/simplehtmldom.HtmlDocument.md#method___call)
* [public __debugInfo()](../classes/simplehtmldom.HtmlDocument.md#method___debugInfo)
* [public __destruct()](../classes/simplehtmldom.HtmlDocument.md#method___destruct)
* [public set_callback()](../classes/simplehtmldom.HtmlDocument.md#method_set_callback)
* [public remove_callback()](../classes/simplehtmldom.HtmlDocument.md#method_remove_callback)
* [public save()](../classes/simplehtmldom.HtmlDocument.md#method_save)
* [public title()](../classes/simplehtmldom.HtmlDocument.md#method_title)
* [public find()](../classes/simplehtmldom.HtmlDocument.md#method_find)
* [public expect()](../classes/simplehtmldom.HtmlDocument.md#method_expect)
* [public dump()](../classes/simplehtmldom.HtmlDocument.md#method_dump)
* [public search_noise()](../classes/simplehtmldom.HtmlDocument.md#method_search_noise)
* [public __toString()](../classes/simplehtmldom.HtmlDocument.md#method___toString)
* [public __get()](../classes/simplehtmldom.HtmlDocument.md#method___get)
* [public childNodes()](../classes/simplehtmldom.HtmlDocument.md#method_childNodes)
* [public firstChild()](../classes/simplehtmldom.HtmlDocument.md#method_firstChild)
* [public lastChild()](../classes/simplehtmldom.HtmlDocument.md#method_lastChild)
* [public createElement()](../classes/simplehtmldom.HtmlDocument.md#method_createElement)
* [public createTextNode()](../classes/simplehtmldom.HtmlDocument.md#method_createTextNode)
* [public getElementById()](../classes/simplehtmldom.HtmlDocument.md#method_getElementById)
* [public getElementsById()](../classes/simplehtmldom.HtmlDocument.md#method_getElementsById)
* [public getElementByTagName()](../classes/simplehtmldom.HtmlDocument.md#method_getElementByTagName)
* [public getElementsByTagName()](../classes/simplehtmldom.HtmlDocument.md#method_getElementsByTagName)
* [public loadFile()](../classes/simplehtmldom.HtmlDocument.md#method_loadFile)
* [protected prepare()](../classes/simplehtmldom.HtmlDocument.md#method_prepare)
* [protected remove_noise()](../classes/simplehtmldom.HtmlDocument.md#method_remove_noise)
* [protected parse()](../classes/simplehtmldom.HtmlDocument.md#method_parse)
* [protected copy_until_char()](../classes/simplehtmldom.HtmlDocument.md#method_copy_until_char)
* [protected link_nodes()](../classes/simplehtmldom.HtmlDocument.md#method_link_nodes)
* [protected read_tag()](../classes/simplehtmldom.HtmlDocument.md#method_read_tag)
* [protected skip()](../classes/simplehtmldom.HtmlDocument.md#method_skip)
* [protected as_text_node()](../classes/simplehtmldom.HtmlDocument.md#method_as_text_node)
* [protected copy_until()](../classes/simplehtmldom.HtmlDocument.md#method_copy_until)
* [protected copy_skip()](../classes/simplehtmldom.HtmlDocument.md#method_copy_skip)
* [protected parse_attr()](../classes/simplehtmldom.HtmlDocument.md#method_parse_attr)
* [protected parse_charset()](../classes/simplehtmldom.HtmlDocument.md#method_parse_charset)
* [protected decode()](../classes/simplehtmldom.HtmlDocument.md#method_decode)
---
### Details
* File: [simplehtmldom\HtmlDocument.php](../files/simplehtmldom.HtmlDocument.md)
* Package: Default
* Class Hierarchy:
  * \simplehtmldom\HtmlDocument
---
## Properties
<a name="property_root"></a>
#### public $root : \simplehtmldom\HtmlNode
---
**Summary**

HtmlNode instance.

**Type:** <a href="../classes/simplehtmldom.HtmlNode.html">\simplehtmldom\HtmlNode</a>

**Details:**


<a name="property_nodes"></a>
#### public $nodes : 
---
**Type:** 

**Details:**


<a name="property_callback"></a>
#### public $callback : 
---
**Type:** 

**Details:**


<a name="property_lowercase"></a>
#### public $lowercase : 
---
**Type:** 

**Details:**


<a name="property_original_size"></a>
#### public $original_size : 
---
**Type:** 

**Details:**


<a name="property_size"></a>
#### public $size : 
---
**Type:** 

**Details:**


<a name="property__charset"></a>
#### public $_charset : 
---
**Type:** 

**Details:**


<a name="property__target_charset"></a>
#### public $_target_charset : 
---
**Type:** 

**Details:**


<a name="property_default_br_text"></a>
#### public $default_br_text : 
---
**Type:** 

**Details:**


<a name="property_default_span_text"></a>
#### public $default_span_text : 
---
**Type:** 

**Details:**


<a name="property_pos"></a>
#### protected $pos : 
---
**Type:** 

**Details:**


<a name="property_doc"></a>
#### protected $doc : 
---
**Type:** 

**Details:**


<a name="property_char"></a>
#### protected $char : 
---
**Type:** 

**Details:**


<a name="property_cursor"></a>
#### protected $cursor : 
---
**Type:** 

**Details:**


<a name="property_parent"></a>
#### protected $parent : 
---
**Type:** 

**Details:**


<a name="property_noise"></a>
#### protected $noise : 
---
**Type:** 

**Details:**


<a name="property_token_blank"></a>
#### protected $token_blank : 
---
**Type:** 

**Details:**


<a name="property_token_equal"></a>
#### protected $token_equal : 
---
**Type:** 

**Details:**


<a name="property_token_slash"></a>
#### protected $token_slash : 
---
**Type:** 

**Details:**


<a name="property_token_attr"></a>
#### protected $token_attr : 
---
**Type:** 

**Details:**


<a name="property_self_closing_tags"></a>
#### protected $self_closing_tags : 
---
**Type:** 

**Details:**


<a name="property_block_tags"></a>
#### protected $block_tags : 
---
**Type:** 

**Details:**


<a name="property_optional_closing_tags"></a>
#### protected $optional_closing_tags : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $str = null,   $lowercase = true,   $forceTagsClosed = true,   $target_charset = DEFAULT_TARGET_CHARSET,   $stripRN = true,   $defaultBRText = DEFAULT_BR_TEXT,   $defaultSpanText = DEFAULT_SPAN_TEXT,   $options) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  |  |
| <code></code> | $lowercase  |  |
| <code></code> | $forceTagsClosed  |  |
| <code></code> | $target_charset  |  |
| <code></code> | $stripRN  |  |
| <code></code> | $defaultBRText  |  |
| <code></code> | $defaultSpanText  |  |
| <code></code> | $options  |  |




<a name="method_load" class="anchor"></a>
#### public load() 

```
public load(  $str,   $lowercase = true,   $stripRN = true,   $defaultBRText = DEFAULT_BR_TEXT,   $defaultSpanText = DEFAULT_SPAN_TEXT,   $options) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  |  |
| <code></code> | $lowercase  |  |
| <code></code> | $stripRN  |  |
| <code></code> | $defaultBRText  |  |
| <code></code> | $defaultSpanText  |  |
| <code></code> | $options  |  |




<a name="method_restore_noise" class="anchor"></a>
#### public restore_noise() 

```
public restore_noise(  $text) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $text  |  |




<a name="method___call" class="anchor"></a>
#### public __call() 

```
public __call(  $func,   $args) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $func  |  |
| <code></code> | $args  |  |




<a name="method___debugInfo" class="anchor"></a>
#### public __debugInfo() 

```
public __debugInfo() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)




<a name="method___destruct" class="anchor"></a>
#### public __destruct() 

```
public __destruct() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)




<a name="method_set_callback" class="anchor"></a>
#### public set_callback() 

```
public set_callback(  $function_name) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $function_name  |  |




<a name="method_remove_callback" class="anchor"></a>
#### public remove_callback() 

```
public remove_callback() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)




<a name="method_save" class="anchor"></a>
#### public save() 

```
public save(string  $filepath = &#039;&#039;) 
```

**Summary**

Save modified html.

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $filepath  |  |




<a name="method_title" class="anchor"></a>
#### public title() 

```
public title() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)




<a name="method_find" class="anchor"></a>
#### public find() : array&lt;mixed,\simplehtmldom\HtmlNode&gt;&amp;#124;\simplehtmldom\HtmlNode

```
public find(string  $selector, \simplehtmldom\number&amp;#124;null  $idx = null, boolean  $lowercase = false) : array&lt;mixed,\simplehtmldom\HtmlNode&gt;&amp;#124;\simplehtmldom\HtmlNode
```

**Summary**

Find elements by CSS Selector.

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $selector  | CSS Selector |
| <code>\simplehtmldom\number&#124;null</code> | $idx  |  |
| <code>boolean</code> | $lowercase  |  |

**Returns:** array&lt;mixed,<a href="../classes/simplehtmldom.HtmlNode.html">\simplehtmldom\HtmlNode</a>&gt;&#124;<a href="../classes/simplehtmldom.HtmlNode.html">\simplehtmldom\HtmlNode</a>


<a name="method_expect" class="anchor"></a>
#### public expect() 

```
public expect(  $selector,   $idx = null,   $lowercase = false) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $selector  |  |
| <code></code> | $idx  |  |
| <code></code> | $lowercase  |  |




<a name="method_dump" class="anchor"></a>
#### public dump() 

```
public dump(  $show_attr = true) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $show_attr  |  |



##### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| codeCoverageIgnore |  |  |

<a name="method_search_noise" class="anchor"></a>
#### public search_noise() 

```
public search_noise(  $text) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $text  |  |




<a name="method___toString" class="anchor"></a>
#### public __toString() 

```
public __toString() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)




<a name="method___get" class="anchor"></a>
#### public __get() 

```
public __get(  $name) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |




<a name="method_childNodes" class="anchor"></a>
#### public childNodes() 

```
public childNodes(  $idx = -1) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $idx  |  |




<a name="method_firstChild" class="anchor"></a>
#### public firstChild() 

```
public firstChild() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)




<a name="method_lastChild" class="anchor"></a>
#### public lastChild() 

```
public lastChild() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)




<a name="method_createElement" class="anchor"></a>
#### public createElement() 

```
public createElement(  $name,   $value = null) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $value  |  |




<a name="method_createTextNode" class="anchor"></a>
#### public createTextNode() 

```
public createTextNode(  $value) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $value  |  |




<a name="method_getElementById" class="anchor"></a>
#### public getElementById() 

```
public getElementById(  $id) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $id  |  |




<a name="method_getElementsById" class="anchor"></a>
#### public getElementsById() 

```
public getElementsById(  $id,   $idx = null) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $id  |  |
| <code></code> | $idx  |  |




<a name="method_getElementByTagName" class="anchor"></a>
#### public getElementByTagName() 

```
public getElementByTagName(  $name) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |




<a name="method_getElementsByTagName" class="anchor"></a>
#### public getElementsByTagName() 

```
public getElementsByTagName(  $name,   $idx = null) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $idx  |  |




<a name="method_loadFile" class="anchor"></a>
#### public loadFile() 

```
public loadFile(  $file) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $file  |  |




<a name="method_prepare" class="anchor"></a>
#### protected prepare() 

```
protected prepare(  $str,   $lowercase = true,   $defaultBRText = DEFAULT_BR_TEXT,   $defaultSpanText = DEFAULT_SPAN_TEXT) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  |  |
| <code></code> | $lowercase  |  |
| <code></code> | $defaultBRText  |  |
| <code></code> | $defaultSpanText  |  |




<a name="method_remove_noise" class="anchor"></a>
#### protected remove_noise() 

```
protected remove_noise(  $pattern,   $remove_tag = false) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $pattern  |  |
| <code></code> | $remove_tag  |  |




<a name="method_parse" class="anchor"></a>
#### protected parse() 

```
protected parse(  $trim = false) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $trim  |  |




<a name="method_copy_until_char" class="anchor"></a>
#### protected copy_until_char() 

```
protected copy_until_char(  $char) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $char  |  |




<a name="method_link_nodes" class="anchor"></a>
#### protected link_nodes() 

```
protected link_nodes(  $node,   $is_child) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $node  |  |
| <code></code> | $is_child  |  |




<a name="method_read_tag" class="anchor"></a>
#### protected read_tag() 

```
protected read_tag(  $trim) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $trim  |  |




<a name="method_skip" class="anchor"></a>
#### protected skip() 

```
protected skip(  $chars) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $chars  |  |




<a name="method_as_text_node" class="anchor"></a>
#### protected as_text_node() 

```
protected as_text_node(  $tag) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $tag  |  |




<a name="method_copy_until" class="anchor"></a>
#### protected copy_until() 

```
protected copy_until(  $chars) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $chars  |  |




<a name="method_copy_skip" class="anchor"></a>
#### protected copy_skip() 

```
protected copy_skip(  $chars) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $chars  |  |




<a name="method_parse_attr" class="anchor"></a>
#### protected parse_attr() 

```
protected parse_attr(  $node,   $name,   $space,   $trim) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $node  |  |
| <code></code> | $name  |  |
| <code></code> | $space  |  |
| <code></code> | $trim  |  |




<a name="method_parse_charset" class="anchor"></a>
#### protected parse_charset() 

```
protected parse_charset() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)




<a name="method_decode" class="anchor"></a>
#### protected decode() 

```
protected decode() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlDocument](../classes/simplehtmldom.HtmlDocument.md)





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
