# [Universal Framework PHP Documentation](../home.md)

# Class: \simplehtmldom\HtmlNode
### Namespace: [\simplehtmldom](../namespaces/simplehtmldom.md)
---
**Summary:**

HTMLNode class.

---
### Constants
* [ HDOM_TYPE_ELEMENT](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_TYPE_ELEMENT)
* [ HDOM_TYPE_COMMENT](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_TYPE_COMMENT)
* [ HDOM_TYPE_TEXT](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_TYPE_TEXT)
* [ HDOM_TYPE_ROOT](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_TYPE_ROOT)
* [ HDOM_TYPE_UNKNOWN](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_TYPE_UNKNOWN)
* [ HDOM_TYPE_CDATA](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_TYPE_CDATA)
* [ HDOM_QUOTE_DOUBLE](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_QUOTE_DOUBLE)
* [ HDOM_QUOTE_SINGLE](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_QUOTE_SINGLE)
* [ HDOM_QUOTE_NO](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_QUOTE_NO)
* [ HDOM_INFO_BEGIN](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_INFO_BEGIN)
* [ HDOM_INFO_END](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_INFO_END)
* [ HDOM_INFO_QUOTE](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_INFO_QUOTE)
* [ HDOM_INFO_SPACE](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_INFO_SPACE)
* [ HDOM_INFO_TEXT](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_INFO_TEXT)
* [ HDOM_INFO_INNER](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_INFO_INNER)
* [ HDOM_INFO_OUTER](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_INFO_OUTER)
* [ HDOM_INFO_ENDSPACE](../classes/simplehtmldom.HtmlNode.md#constant_HDOM_INFO_ENDSPACE)
---
### Properties
* [public $nodetype](../classes/simplehtmldom.HtmlNode.md#property_nodetype)
* [public $tag](../classes/simplehtmldom.HtmlNode.md#property_tag)
* [public $attr](../classes/simplehtmldom.HtmlNode.md#property_attr)
* [public $children](../classes/simplehtmldom.HtmlNode.md#property_children)
* [public $nodes](../classes/simplehtmldom.HtmlNode.md#property_nodes)
* [public $parent](../classes/simplehtmldom.HtmlNode.md#property_parent)
* [public $_](../classes/simplehtmldom.HtmlNode.md#property__)
* [public $innertext](../classes/simplehtmldom.HtmlNode.md#property_innertext)
* [public $title](../classes/simplehtmldom.HtmlNode.md#property_title)
* [public $alt](../classes/simplehtmldom.HtmlNode.md#property_alt)
* [public $src](../classes/simplehtmldom.HtmlNode.md#property_src)
* [public $href](../classes/simplehtmldom.HtmlNode.md#property_href)
* [public $async](../classes/simplehtmldom.HtmlNode.md#property_async)
* [public $defer](../classes/simplehtmldom.HtmlNode.md#property_defer)
---
### Methods
* [public __construct()](../classes/simplehtmldom.HtmlNode.md#method___construct)
* [public __call()](../classes/simplehtmldom.HtmlNode.md#method___call)
* [public __debugInfo()](../classes/simplehtmldom.HtmlNode.md#method___debugInfo)
* [public __toString()](../classes/simplehtmldom.HtmlNode.md#method___toString)
* [public outertext()](../classes/simplehtmldom.HtmlNode.md#method_outertext)
* [public innertext()](../classes/simplehtmldom.HtmlNode.md#method_innertext)
* [public convert_text()](../classes/simplehtmldom.HtmlNode.md#method_convert_text)
* [public is_utf8()](../classes/simplehtmldom.HtmlNode.md#method_is_utf8)
* [public makeup()](../classes/simplehtmldom.HtmlNode.md#method_makeup)
* [public clear()](../classes/simplehtmldom.HtmlNode.md#method_clear)
* [public dump()](../classes/simplehtmldom.HtmlNode.md#method_dump)
* [public dump_node()](../classes/simplehtmldom.HtmlNode.md#method_dump_node)
* [public find_ancestor_tag()](../classes/simplehtmldom.HtmlNode.md#method_find_ancestor_tag)
* [public expect()](../classes/simplehtmldom.HtmlNode.md#method_expect)
* [public find()](../classes/simplehtmldom.HtmlNode.md#method_find)
* [public __get()](../classes/simplehtmldom.HtmlNode.md#method___get)
* [public __set()](../classes/simplehtmldom.HtmlNode.md#method___set)
* [public text()](../classes/simplehtmldom.HtmlNode.md#method_text)
* [public xmltext()](../classes/simplehtmldom.HtmlNode.md#method_xmltext)
* [public __isset()](../classes/simplehtmldom.HtmlNode.md#method___isset)
* [public __unset()](../classes/simplehtmldom.HtmlNode.md#method___unset)
* [public get_display_size()](../classes/simplehtmldom.HtmlNode.md#method_get_display_size)
* [public save()](../classes/simplehtmldom.HtmlNode.md#method_save)
* [public addClass()](../classes/simplehtmldom.HtmlNode.md#method_addClass)
* [public hasClass()](../classes/simplehtmldom.HtmlNode.md#method_hasClass)
* [public removeClass()](../classes/simplehtmldom.HtmlNode.md#method_removeClass)
* [public removeAttribute()](../classes/simplehtmldom.HtmlNode.md#method_removeAttribute)
* [public getAllAttributes()](../classes/simplehtmldom.HtmlNode.md#method_getAllAttributes)
* [public getAttribute()](../classes/simplehtmldom.HtmlNode.md#method_getAttribute)
* [public setAttribute()](../classes/simplehtmldom.HtmlNode.md#method_setAttribute)
* [public hasAttribute()](../classes/simplehtmldom.HtmlNode.md#method_hasAttribute)
* [public remove()](../classes/simplehtmldom.HtmlNode.md#method_remove)
* [public removeChild()](../classes/simplehtmldom.HtmlNode.md#method_removeChild)
* [public getElementById()](../classes/simplehtmldom.HtmlNode.md#method_getElementById)
* [public getElementsById()](../classes/simplehtmldom.HtmlNode.md#method_getElementsById)
* [public getElementByTagName()](../classes/simplehtmldom.HtmlNode.md#method_getElementByTagName)
* [public getElementsByTagName()](../classes/simplehtmldom.HtmlNode.md#method_getElementsByTagName)
* [public parentNode()](../classes/simplehtmldom.HtmlNode.md#method_parentNode)
* [public parent()](../classes/simplehtmldom.HtmlNode.md#method_parent)
* [public childNodes()](../classes/simplehtmldom.HtmlNode.md#method_childNodes)
* [public firstChild()](../classes/simplehtmldom.HtmlNode.md#method_firstChild)
* [public lastChild()](../classes/simplehtmldom.HtmlNode.md#method_lastChild)
* [public nextSibling()](../classes/simplehtmldom.HtmlNode.md#method_nextSibling)
* [public previousSibling()](../classes/simplehtmldom.HtmlNode.md#method_previousSibling)
* [public hasChildNodes()](../classes/simplehtmldom.HtmlNode.md#method_hasChildNodes)
* [public nodeName()](../classes/simplehtmldom.HtmlNode.md#method_nodeName)
* [public appendChild()](../classes/simplehtmldom.HtmlNode.md#method_appendChild)
* [protected parse_selector()](../classes/simplehtmldom.HtmlNode.md#method_parse_selector)
* [protected is_block_element()](../classes/simplehtmldom.HtmlNode.md#method_is_block_element)
* [protected is_inline_element()](../classes/simplehtmldom.HtmlNode.md#method_is_inline_element)
* [protected seek()](../classes/simplehtmldom.HtmlNode.md#method_seek)
* [protected match()](../classes/simplehtmldom.HtmlNode.md#method_match)
---
### Details
* File: [simplehtmldom\HtmlNode.php](../files/simplehtmldom.HtmlNode.md)
* Package: Default
* Class Hierarchy:
  * \simplehtmldom\HtmlNode
---
## Constants
<a name="constant_HDOM_TYPE_ELEMENT" class="anchor"></a>
###### HDOM_TYPE_ELEMENT
```
HDOM_TYPE_ELEMENT = 1
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_TYPE_COMMENT" class="anchor"></a>
###### HDOM_TYPE_COMMENT
```
HDOM_TYPE_COMMENT = 2
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_TYPE_TEXT" class="anchor"></a>
###### HDOM_TYPE_TEXT
```
HDOM_TYPE_TEXT = 3
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_TYPE_ROOT" class="anchor"></a>
###### HDOM_TYPE_ROOT
```
HDOM_TYPE_ROOT = 5
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_TYPE_UNKNOWN" class="anchor"></a>
###### HDOM_TYPE_UNKNOWN
```
HDOM_TYPE_UNKNOWN = 6
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_TYPE_CDATA" class="anchor"></a>
###### HDOM_TYPE_CDATA
```
HDOM_TYPE_CDATA = 7
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_QUOTE_DOUBLE" class="anchor"></a>
###### HDOM_QUOTE_DOUBLE
```
HDOM_QUOTE_DOUBLE = 0
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_QUOTE_SINGLE" class="anchor"></a>
###### HDOM_QUOTE_SINGLE
```
HDOM_QUOTE_SINGLE = 1
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_QUOTE_NO" class="anchor"></a>
###### HDOM_QUOTE_NO
```
HDOM_QUOTE_NO = 3
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_INFO_BEGIN" class="anchor"></a>
###### HDOM_INFO_BEGIN
```
HDOM_INFO_BEGIN = 0
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_INFO_END" class="anchor"></a>
###### HDOM_INFO_END
```
HDOM_INFO_END = 1
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_INFO_QUOTE" class="anchor"></a>
###### HDOM_INFO_QUOTE
```
HDOM_INFO_QUOTE = 2
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_INFO_SPACE" class="anchor"></a>
###### HDOM_INFO_SPACE
```
HDOM_INFO_SPACE = 3
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_INFO_TEXT" class="anchor"></a>
###### HDOM_INFO_TEXT
```
HDOM_INFO_TEXT = 4
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_INFO_INNER" class="anchor"></a>
###### HDOM_INFO_INNER
```
HDOM_INFO_INNER = 5
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_INFO_OUTER" class="anchor"></a>
###### HDOM_INFO_OUTER
```
HDOM_INFO_OUTER = 6
```

| Tag | Version | Desc |
| --- | ------- | ---- |

<a name="constant_HDOM_INFO_ENDSPACE" class="anchor"></a>
###### HDOM_INFO_ENDSPACE
```
HDOM_INFO_ENDSPACE = 7
```

| Tag | Version | Desc |
| --- | ------- | ---- |

---
## Properties
<a name="property_nodetype"></a>
#### public $nodetype : 
---
**Type:** 

**Details:**


<a name="property_tag"></a>
#### public $tag : 
---
**Type:** 

**Details:**


<a name="property_attr"></a>
#### public $attr : 
---
**Type:** 

**Details:**


<a name="property_children"></a>
#### public $children : 
---
**Type:** 

**Details:**


<a name="property_nodes"></a>
#### public $nodes : 
---
**Type:** 

**Details:**


<a name="property_parent"></a>
#### public $parent : 
---
**Type:** 

**Details:**


<a name="property__"></a>
#### public $_ : 
---
**Type:** 

**Details:**


<a name="property_innertext"></a>
#### public $innertext : string
---
**Type:** string

**Details:**


<a name="property_title"></a>
#### public $title : string|null
---
**Type:** string|null

**Details:**


<a name="property_alt"></a>
#### public $alt : string|null
---
**Type:** string|null

**Details:**


<a name="property_src"></a>
#### public $src : string|null
---
**Type:** string|null

**Details:**


<a name="property_href"></a>
#### public $href : string|null
---
**Type:** string|null

**Details:**


<a name="property_async"></a>
#### public $async : string|null
---
**Type:** string|null

**Details:**


<a name="property_defer"></a>
#### public $defer : string|null
---
**Type:** string|null

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $dom) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $dom  |  |




<a name="method___call" class="anchor"></a>
#### public __call() 

```
public __call(  $func,   $args) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
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
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method___toString" class="anchor"></a>
#### public __toString() 

```
public __toString() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_outertext" class="anchor"></a>
#### public outertext() 

```
public outertext() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_innertext" class="anchor"></a>
#### public innertext() 

```
public innertext() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_convert_text" class="anchor"></a>
#### public convert_text() 

```
public convert_text(  $text) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $text  |  |




<a name="method_is_utf8" class="anchor"></a>
#### public is_utf8() 

```
Static public is_utf8(  $str) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  |  |




<a name="method_makeup" class="anchor"></a>
#### public makeup() 

```
public makeup() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_clear" class="anchor"></a>
#### public clear() 

```
public clear() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_dump" class="anchor"></a>
#### public dump() 

```
public dump(  $show_attr = true,   $depth) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $show_attr  |  |
| <code></code> | $depth  |  |



##### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| codeCoverageIgnore |  |  |

<a name="method_dump_node" class="anchor"></a>
#### public dump_node() 

```
public dump_node(  $echo = true) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $echo  |  |



##### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| codeCoverageIgnore |  |  |

<a name="method_find_ancestor_tag" class="anchor"></a>
#### public find_ancestor_tag() 

```
public find_ancestor_tag(  $tag) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $tag  |  |




<a name="method_expect" class="anchor"></a>
#### public expect() 

```
public expect(  $selector,   $idx = null,   $lowercase = false) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $selector  |  |
| <code></code> | $idx  |  |
| <code></code> | $lowercase  |  |




<a name="method_find" class="anchor"></a>
#### public find() : \simplehtmldom\HtmlNode

```
public find(string  $selector, integer  $idx = null, boolean  $lowercase = false) : \simplehtmldom\HtmlNode
```

**Summary**

Element selector.

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $selector  |  |
| <code>integer</code> | $idx  |  |
| <code>boolean</code> | $lowercase  |  |

**Returns:** <a href="../classes/simplehtmldom.HtmlNode.html">\simplehtmldom\HtmlNode</a>


<a name="method___get" class="anchor"></a>
#### public __get() 

```
public __get(  $name) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |




<a name="method___set" class="anchor"></a>
#### public __set() 

```
public __set(  $name,   $value) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $value  |  |




<a name="method_text" class="anchor"></a>
#### public text() 

```
public text(  $trim = true) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $trim  |  |




<a name="method_xmltext" class="anchor"></a>
#### public xmltext() 

```
public xmltext() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method___isset" class="anchor"></a>
#### public __isset() 

```
public __isset(  $name) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |




<a name="method___unset" class="anchor"></a>
#### public __unset() 

```
public __unset(  $name) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |




<a name="method_get_display_size" class="anchor"></a>
#### public get_display_size() 

```
public get_display_size() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_save" class="anchor"></a>
#### public save() 

```
public save(  $filepath = &#039;&#039;) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $filepath  |  |




<a name="method_addClass" class="anchor"></a>
#### public addClass() 

```
public addClass(  $class) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $class  |  |




<a name="method_hasClass" class="anchor"></a>
#### public hasClass() 

```
public hasClass(  $class) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $class  |  |




<a name="method_removeClass" class="anchor"></a>
#### public removeClass() 

```
public removeClass(  $class = null) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $class  |  |




<a name="method_removeAttribute" class="anchor"></a>
#### public removeAttribute() 

```
public removeAttribute(  $name) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |




<a name="method_getAllAttributes" class="anchor"></a>
#### public getAllAttributes() 

```
public getAllAttributes() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_getAttribute" class="anchor"></a>
#### public getAttribute() 

```
public getAttribute(  $name) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |




<a name="method_setAttribute" class="anchor"></a>
#### public setAttribute() 

```
public setAttribute(  $name,   $value) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $value  |  |




<a name="method_hasAttribute" class="anchor"></a>
#### public hasAttribute() 

```
public hasAttribute(  $name) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |




<a name="method_remove" class="anchor"></a>
#### public remove() 

```
public remove() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_removeChild" class="anchor"></a>
#### public removeChild() 

```
public removeChild(  $node) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $node  |  |




<a name="method_getElementById" class="anchor"></a>
#### public getElementById() 

```
public getElementById(  $id) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
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
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
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
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
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
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $name  |  |
| <code></code> | $idx  |  |




<a name="method_parentNode" class="anchor"></a>
#### public parentNode() 

```
public parentNode() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_parent" class="anchor"></a>
#### public parent() 

```
public parent(  $parent = null) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $parent  |  |




<a name="method_childNodes" class="anchor"></a>
#### public childNodes() 

```
public childNodes(  $idx = -1) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
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
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_lastChild" class="anchor"></a>
#### public lastChild() 

```
public lastChild() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_nextSibling" class="anchor"></a>
#### public nextSibling() 

```
public nextSibling() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_previousSibling" class="anchor"></a>
#### public previousSibling() 

```
public previousSibling() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_hasChildNodes" class="anchor"></a>
#### public hasChildNodes() 

```
public hasChildNodes() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_nodeName" class="anchor"></a>
#### public nodeName() 

```
public nodeName() 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)




<a name="method_appendChild" class="anchor"></a>
#### public appendChild() 

```
public appendChild(  $node) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $node  |  |




<a name="method_parse_selector" class="anchor"></a>
#### protected parse_selector() 

```
protected parse_selector(  $selector_string) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $selector_string  |  |




<a name="method_is_block_element" class="anchor"></a>
#### protected is_block_element() 

```
protected is_block_element(  $node) 
```

**Summary**

Returns true if the provided element is a block level element.

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
* See Also:
 * [https://www.w3resource.com/html/HTML-block-level-and-inline-elements.php](https://www.w3resource.com/html/HTML-block-level-and-inline-elements.php)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $node  |  |




<a name="method_is_inline_element" class="anchor"></a>
#### protected is_inline_element() 

```
protected is_inline_element(  $node) 
```

**Summary**

Returns true if the provided element is an inline level element.

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
* See Also:
 * [https://www.w3resource.com/html/HTML-block-level-and-inline-elements.php](https://www.w3resource.com/html/HTML-block-level-and-inline-elements.php)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $node  |  |




<a name="method_seek" class="anchor"></a>
#### protected seek() 

```
protected seek(  $selector,   $ret,   $parent_cmd,   $lowercase = false) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $selector  |  |
| <code></code> | $ret  |  |
| <code></code> | $parent_cmd  |  |
| <code></code> | $lowercase  |  |




<a name="method_match" class="anchor"></a>
#### protected match() 

```
protected match(  $exp,   $pattern,   $value,   $case_sensitivity) 
```

**Details:**
* Inherited From: [\simplehtmldom\HtmlNode](../classes/simplehtmldom.HtmlNode.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $exp  |  |
| <code></code> | $pattern  |  |
| <code></code> | $value  |  |
| <code></code> | $case_sensitivity  |  |





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
