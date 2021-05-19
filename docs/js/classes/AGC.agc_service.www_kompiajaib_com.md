# [Universal Framework PHP Documentation](../home.md)

# Class: \AGC\agc_service\www_kompiajaib_com
### Namespace: [\AGC\agc_service](../namespaces/AGC.agc_service.md)
---
**Summary:**

Kompi-ajaib class.

---
### Constants
* No constants found
---
### Properties
* [public $serviceList](../classes/AGC.agc_service.Service.md#property_serviceList)
* [public $dom](../classes/AGC.agc_service.Service.md#property_dom)
* [public $url](../classes/AGC.agc_service.Service.md#property_url)
* [public $parse_url](../classes/AGC.agc_service.Service.md#property_parse_url)
* [public $receiver_url](../classes/AGC.agc_service.Service.md#property_receiver_url)
* [public $contentHTML](../classes/AGC.agc_service.Service.md#property_contentHTML)
* [public $title](../classes/AGC.agc_service.Service.md#property_title)
* [public $gtrans](../classes/AGC.agc_service.Service.md#property_gtrans)
* [public $niche](../classes/AGC.agc_service.Service.md#property_niche)
* [public $hl](../classes/AGC.agc_service.Service.md#property_hl)
* [public $sl](../classes/AGC.agc_service.Service.md#property_sl)
* [public $tl](../classes/AGC.agc_service.Service.md#property_tl)
---
### Methods
* [public __construct()](../classes/AGC.agc_service.www_kompiajaib_com.md#method___construct)
* [public cURL()](../classes/AGC.agc_service.Service.md#method_cURL)
* [public content()](../classes/AGC.agc_service.www_kompiajaib_com.md#method_content)
* [public removeElement()](../classes/AGC.agc_service.Service.md#method_removeElement)
* [public set()](../classes/AGC.agc_service.Service.md#method_set)
* [public getNiche()](../classes/AGC.agc_service.Service.md#method_getNiche)
* [public setNiche()](../classes/AGC.agc_service.Service.md#method_setNiche)
* [public fetch_contents()](../classes/AGC.agc_service.Service.md#method_fetch_contents)
* [public htmlcom()](../classes/AGC.agc_service.Service.md#method_htmlcom)
* [public getDate()](../classes/AGC.agc_service.Service.md#method_getDate)
* [public str_get_html()](../classes/AGC.agc_service.Service.md#method_str_get_html)
* [public getHTML()](../classes/AGC.agc_service.Service.md#method_getHTML)
* [public title()](../classes/AGC.agc_service.Service.md#method_title)
* [public verifydom()](../classes/AGC.agc_service.Service.md#method_verifydom)
* [public decrypt()](../classes/AGC.agc_service.Service.md#method_decrypt)
* [public sendHTML()](../classes/AGC.agc_service.Service.md#method_sendHTML)
* [public genSession()](../classes/AGC.agc_service.Service.md#method_genSession)
* [public encrypt()](../classes/AGC.agc_service.Service.md#method_encrypt)
* [public translate()](../classes/AGC.agc_service.Service.md#method_translate)
* [public randProxy()](../classes/AGC.agc_service.Service.md#method_randProxy)
* [public getProxy()](../classes/AGC.agc_service.Service.md#method_getProxy)
* [public setTargetLang()](../classes/AGC.agc_service.Service.md#method_setTargetLang)
* [public delProxy()](../classes/AGC.agc_service.Service.md#method_delProxy)
* [public getSource()](../classes/AGC.agc_service.Service.md#method_getSource)
* [public setSourceLang()](../classes/AGC.agc_service.Service.md#method_setSourceLang)
* [public fixImageDom()](../classes/AGC.agc_service.Service.md#method_fixImageDom)
* [public build_url()](../classes/AGC.agc_service.Service.md#method_build_url)
* [public fixStyle()](../classes/AGC.agc_service.Service.md#method_fixStyle)
* [public fixAnchors()](../classes/AGC.agc_service.Service.md#method_fixAnchors)
* [public fixSchema()](../classes/AGC.agc_service.Service.md#method_fixSchema)
* [public generateIndex()](../classes/AGC.agc_service.Service.md#method_generateIndex)
* [public validateContent()](../classes/AGC.agc_service.Service.md#method_validateContent)
* [public agc()](../classes/AGC.agc_service.Service.md#method_agc)
* [public generateArticle()](../classes/AGC.agc_service.Service.md#method_generateArticle)
* [public generateCookie()](../classes/AGC.agc_service.Service.md#method_generateCookie)
* [public exeCookie()](../classes/AGC.agc_service.Service.md#method_exeCookie)
* [public generateTranslation()](../classes/AGC.agc_service.Service.md#method_generateTranslation)
* [public anchors()](../classes/AGC.agc_service.Service.md#method_anchors)
* [public fixShare()](../classes/AGC.agc_service.Service.md#method_fixShare)
* [public find()](../classes/AGC.agc_service.Service.md#method_find)
* [public generateHash()](../classes/AGC.agc_service.Service.md#method_generateHash)
* [public getDomainServices()](../classes/AGC.agc_service.Service.md#method_getDomainServices)
* [public getClass()](../classes/AGC.agc_service.Service.md#method_getClass)
* [public isRestrictedDomain()](../classes/AGC.agc_service.Service.md#method_isRestrictedDomain)
* [public output()](../classes/AGC.agc_service.Service.md#method_output)
---
### Details
* File: [AGC\agc_service\www_kompiajaib_com.php](../files/AGC.agc_service.www_kompiajaib_com.md)
* Package: Default
* Class Hierarchy: 
  * [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
  * \AGC\agc_service\www_kompiajaib_com
---
## Properties
<a name="property_serviceList"></a>
#### public $serviceList : 
---
**Type:** 

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_dom"></a>
#### public $dom : \simplehtmldom\HtmlDocument
---
**Summary**

instance of simple_html_dom\str_get_html.

**Type:** <a href="../classes/simplehtmldom.HtmlDocument.html">\simplehtmldom\HtmlDocument</a>

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_url"></a>
#### public $url : 
---
**Type:** 

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_parse_url"></a>
#### public $parse_url : \AGC\agc_service\parse_url
---
**Summary**

parseURL.

**Type:** \AGC\agc_service\parse_url

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_receiver_url"></a>
#### public $receiver_url : string
---
**Summary**

AGC Receiver URL.

**Type:** string

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_contentHTML"></a>
#### public $contentHTML : 
---
**Type:** 

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_title"></a>
#### public $title : string
---
**Summary**

Title AGC.

**Type:** string

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_gtrans"></a>
#### public $gtrans : \AGC\loader\gtrans
---
**Summary**

Gtrans instance.

**Type:** <a href="../classes/AGC.loader.gtrans.html">\AGC\loader\gtrans</a>

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_niche"></a>
#### public $niche : string
---
**Summary**

Niche.

**Type:** string

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_hl"></a>
#### public $hl : string
---
**Summary**

Href lang : source language.

**Type:** string

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_sl"></a>
#### public $sl : string
---
**Summary**

Source language : href lang.

**Type:** string

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)


<a name="property_tl"></a>
#### public $tl : string
---
**Summary**

To language / target language.

**Type:** string

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct() 
```

**Details:**
* Inherited From: [\AGC\agc_service\www_kompiajaib_com](../classes/AGC.agc_service.www_kompiajaib_com.md)




<a name="method_cURL" class="anchor"></a>
#### public cURL() 

```
public cURL(  $verbose = true) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $verbose  |  |




<a name="method_content" class="anchor"></a>
#### public content() 

```
public content() 
```

**Summary**

Get contents.

**Details:**
* Inherited From: [\AGC\agc_service\www_kompiajaib_com](../classes/AGC.agc_service.www_kompiajaib_com.md)




<a name="method_removeElement" class="anchor"></a>
#### public removeElement() 

```
public removeElement(  $selector) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $selector  |  |




<a name="method_set" class="anchor"></a>
#### public set() 

```
public set(string  $url, \Curl\Curl\Curl  $curl = null) 
```

**Summary**

Set AGC URL.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $url  |  |
| <code>\Curl\Curl\Curl</code> | $curl  |  |




<a name="method_getNiche" class="anchor"></a>
#### public getNiche() : string

```
public getNiche(string  $url = null) : string
```

**Summary**

Get niche by url.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $url  |  |

**Returns:** string


<a name="method_setNiche" class="anchor"></a>
#### public setNiche() 

```
public setNiche(  $str) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  |  |




<a name="method_fetch_contents" class="anchor"></a>
#### public fetch_contents() : \Curl\Curl

```
public fetch_contents(\Curl\Curl  $curl, string  $url, string  $niche = &#039;general&#039;, integer  $option = array(&#039;filehour&#039; =&gt; 24, &#039;fileExt&#039; =&gt; &#039;html&#039;)) : \Curl\Curl
```

**Summary**

fetch content based file time created.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\Curl\Curl</code> | $curl  |  |
| <code>string</code> | $url  |  |
| <code>string</code> | $niche  | folder name |
| <code>integer</code> | $option  | ['filehour'] time expired in hour default 24 |

**Returns:** \Curl\Curl


<a name="method_htmlcom" class="anchor"></a>
#### public htmlcom() : string

```
Static public htmlcom(mixed  $comments) : string
```

**Summary**

Generate html document.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>mixed</code> | $comments  |  |

**Returns:** string


<a name="method_getDate" class="anchor"></a>
#### public getDate() : \AGC\agc_service\date

```
Static public getDate(string  $format = &#039;m/d/Y h:i:s a&#039;, integer  $timestamp = null) : \AGC\agc_service\date
```

**Summary**

Get custom date format.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $format  |  |
| <code>integer</code> | $timestamp  |  |

**Returns:** \AGC\agc_service\date


<a name="method_str_get_html" class="anchor"></a>
#### public str_get_html() 

```
Static public str_get_html(\AGC\agc_service\string  $str, boolean  $lowercase = true, boolean  $forceTagsClosed = true, \AGC\agc_service\[type]  $target_charset = DEFAULT_TARGET_CHARSET, boolean  $stripRN = true, \AGC\agc_service\[type]  $defaultBRText = DEFAULT_BR_TEXT, \AGC\agc_service\[type]  $defaultSpanText = DEFAULT_SPAN_TEXT) 
```

**Summary**

alternative str_get_html.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\AGC\agc_service\string</code> | $str  |  |
| <code>boolean</code> | $lowercase  |  |
| <code>boolean</code> | $forceTagsClosed  |  |
| <code>\AGC\agc_service\[type]</code> | $target_charset  |  |
| <code>boolean</code> | $stripRN  |  |
| <code>\AGC\agc_service\[type]</code> | $defaultBRText  |  |
| <code>\AGC\agc_service\[type]</code> | $defaultSpanText  |  |




<a name="method_getHTML" class="anchor"></a>
#### public getHTML() : \AGC\agc_service\str_get_html

```
public getHTML(string  $string) : \AGC\agc_service\str_get_html
```

**Summary**

Parse HTML string into DOMDocument.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $string  |  |

**Returns:** \AGC\agc_service\str_get_html


<a name="method_title" class="anchor"></a>
#### public title() : mixed

```
public title(\AGC\agc_service\function  $callback = null) : mixed
```

**Summary**

Extract title from dom.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\AGC\agc_service\function</code> | $callback  |  |

**Returns:** mixed


<a name="method_verifydom" class="anchor"></a>
#### public verifydom() 

```
public verifydom(  $funcname = false) 
```

**Summary**

Validate $this->dom instance of str_get_html.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $funcname  |  |




<a name="method_decrypt" class="anchor"></a>
#### public decrypt() 

```
public decrypt(string  $passphrase, string  $encryptedTextBase64) 
```

**Summary**

Crypto Decrypt.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $passphrase  |  |
| <code>string</code> | $encryptedTextBase64  |  |




<a name="method_sendHTML" class="anchor"></a>
#### public sendHTML() : $this

```
public sendHTML(string  $html,   $force = false) : $this
```

**Summary**

Send plain html to external source.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $html  |  |
| <code></code> | $force  |  |

**Returns:** $this


<a name="method_genSession" class="anchor"></a>
#### public genSession() : \AGC\agc_service\$this-&gt;session_hash

```
public genSession(string  $key = null,   $val = null) : \AGC\agc_service\$this-&gt;session_hash
```

**Summary**

Generate session.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $key  |  |
| <code></code> | $val  |  |

**Returns:** \AGC\agc_service\$this->session_hash


<a name="method_encrypt" class="anchor"></a>
#### public encrypt() 

```
public encrypt(string  $passphrase, string  $plainText) 
```

**Summary**

Crypto Encrypt.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $passphrase  |  |
| <code>string</code> | $plainText  |  |




<a name="method_translate" class="anchor"></a>
#### public translate() 

```
public translate(  $filename = null,   $rewrite = false) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $filename  |  |
| <code></code> | $rewrite  |  |




<a name="method_randProxy" class="anchor"></a>
#### public randProxy() 

```
public randProxy() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_getProxy" class="anchor"></a>
#### public getProxy() : array

```
public getProxy() : array
```

**Summary**

Get proxy list.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)

**Returns:** array


<a name="method_setTargetLang" class="anchor"></a>
#### public setTargetLang() 

```
public setTargetLang(  $str) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  |  |




<a name="method_delProxy" class="anchor"></a>
#### public delProxy() : $this

```
public delProxy(string  $proxy) : $this
```

**Summary**

Delete proxy.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $proxy  |  |

**Returns:** $this


<a name="method_getSource" class="anchor"></a>
#### public getSource() 

```
public getSource() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_setSourceLang" class="anchor"></a>
#### public setSourceLang() 

```
public setSourceLang(  $str) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  |  |




<a name="method_fixImageDom" class="anchor"></a>
#### public fixImageDom() 

```
public fixImageDom(  $callback = null) 
```

**Summary**

Fix images.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $callback  |  |




<a name="method_build_url" class="anchor"></a>
#### public build_url() 

```
public build_url(array  $parts) 
```

**Summary**

Build URL from parse_url.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $parts  |  |




<a name="method_fixStyle" class="anchor"></a>
#### public fixStyle() 

```
public fixStyle(  $selector) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $selector  |  |




<a name="method_fixAnchors" class="anchor"></a>
#### public fixAnchors() 

```
public fixAnchors() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_fixSchema" class="anchor"></a>
#### public fixSchema() : void

```
public fixSchema() : void
```

**Summary**

Remove itemscope, itemprop, itemtype from elements.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)

**Returns:** void


<a name="method_generateIndex" class="anchor"></a>
#### public generateIndex() 

```
public generateIndex(  $regexPage,   $niche) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $regexPage  |  |
| <code></code> | $niche  |  |




<a name="method_validateContent" class="anchor"></a>
#### public validateContent() 

```
public validateContent() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_agc" class="anchor"></a>
#### public agc() 

```
public agc() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_generateArticle" class="anchor"></a>
#### public generateArticle() 

```
public generateArticle() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_generateCookie" class="anchor"></a>
#### public generateCookie() 

```
public generateCookie(  $prefix = WP_HOST) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $prefix  |  |




<a name="method_exeCookie" class="anchor"></a>
#### public exeCookie() 

```
public exeCookie(  $cName,   $cLive = 86400, \AGC\agc_service\function  $callback) 
```

**Summary**

Execute Function if Cookie Not Exists.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $cName  |  |
| <code></code> | $cLive  |  |
| <code>\AGC\agc_service\function</code> | $callback  |  |




<a name="method_generateTranslation" class="anchor"></a>
#### public generateTranslation() 

```
public generateTranslation() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_anchors" class="anchor"></a>
#### public anchors() : array

```
public anchors() : array
```

**Summary**

get all anchors from dom.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)

**Returns:** array


<a name="method_fixShare" class="anchor"></a>
#### public fixShare() 

```
public fixShare() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_find" class="anchor"></a>
#### public find() 

```
public find(string  $pseudo) 
```

**Summary**

find element in dom using CSS Selector.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $pseudo  |  |




<a name="method_generateHash" class="anchor"></a>
#### public generateHash() 

```
public generateHash() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_getDomainServices" class="anchor"></a>
#### public getDomainServices() 

```
public getDomainServices() 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)




<a name="method_getClass" class="anchor"></a>
#### public getClass() : $this

```
public getClass(string  $url) : $this
```

**Summary**

get available Class.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $url  |  |

**Returns:** $this


<a name="method_isRestrictedDomain" class="anchor"></a>
#### public isRestrictedDomain() 

```
public isRestrictedDomain(  $host) 
```

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $host  |  |




<a name="method_output" class="anchor"></a>
#### public output() 

```
public output(  $str) 
```

**Summary**

Fix output content.

**Details:**
* Inherited From: [\AGC\agc_service\Service](../classes/AGC.agc_service.Service.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $str  |  |





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
