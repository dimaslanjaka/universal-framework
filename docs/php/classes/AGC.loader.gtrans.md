# [Universal Framework PHP Documentation](../home.md)

# Class: \AGC\loader\gtrans
### Namespace: [\AGC\loader](../namespaces/AGC.loader.md)
---
**Summary:**

Google AGC init.

---
### Constants
* No constants found
---
### Properties
* [public $string](../classes/AGC.loader.gtrans.md#property_string)
* [public $logtxt](../classes/AGC.loader.gtrans.md#property_logtxt)
* [public $fetch_contents_curl](../classes/AGC.loader.gtrans.md#property_fetch_contents_curl)
* [public $fetch_contents_result](../classes/AGC.loader.gtrans.md#property_fetch_contents_result)
* [public $fetch_contents_dom](../classes/AGC.loader.gtrans.md#property_fetch_contents_dom)
---
### Methods
* [public __construct()](../classes/AGC.loader.gtrans.md#method___construct)
* [public cURL()](../classes/AGC.loader.gtrans.md#method_cURL)
* [public i()](../classes/AGC.loader.gtrans.md#method_i)
* [public getLogTxt()](../classes/AGC.loader.gtrans.md#method_getLogTxt)
* [public create_index_AGC()](../classes/AGC.loader.gtrans.md#method_create_index_AGC)
* [public build_url()](../classes/AGC.loader.gtrans.md#method_build_url)
* [public translate()](../classes/AGC.loader.gtrans.md#method_translate)
* [public build_url_2()](../classes/AGC.loader.gtrans.md#method_build_url_2)
* [public refresh_proxy()](../classes/AGC.loader.gtrans.md#method_refresh_proxy)
* [public verify_article()](../classes/AGC.loader.gtrans.md#method_verify_article)
* [public decode_html()](../classes/AGC.loader.gtrans.md#method_decode_html)
* [public grammar()](../classes/AGC.loader.gtrans.md#method_grammar)
* [public filter_result()](../classes/AGC.loader.gtrans.md#method_filter_result)
* [public __toString()](../classes/AGC.loader.gtrans.md#method___toString)
* [public download_site()](../classes/AGC.loader.gtrans.md#method_download_site)
* [public addtitle()](../classes/AGC.loader.gtrans.md#method_addtitle)
* [public single_translate()](../classes/AGC.loader.gtrans.md#method_single_translate)
* [public amp()](../classes/AGC.loader.gtrans.md#method_amp)
* [public fetch_contents()](../classes/AGC.loader.gtrans.md#method_fetch_contents)
* [public curl_err()](../classes/AGC.loader.gtrans.md#method_curl_err)
* [protected parsetry()](../classes/AGC.loader.gtrans.md#method_parsetry)
* [protected clean()](../classes/AGC.loader.gtrans.md#method_clean)
---
### Details
* File: [AGC\loader\gtrans.php](../files/AGC.loader.gtrans.md)
* Package: Default
* Class Hierarchy:
  * \AGC\loader\gtrans
---
### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| param |  | = curl_instance or null |
---
## Properties
<a name="property_string"></a>
#### public $string : 
---
**Type:** 

**Details:**


<a name="property_logtxt"></a>
#### public $logtxt : 
---
**Type:** 

**Details:**


<a name="property_fetch_contents_curl"></a>
#### public $fetch_contents_curl : \Curl\Curl
---
**Summary**

Curl instance (Nullable).

**Type:** \Curl\Curl

**Details:**


<a name="property_fetch_contents_result"></a>
#### public $fetch_contents_result : 
---
**Type:** 

**Details:**


<a name="property_fetch_contents_dom"></a>
#### public $fetch_contents_dom : false|\simplehtmldom\HtmlDocument
---
**Summary**

dom result.

**Type:** false|<a href="../classes/simplehtmldom.HtmlDocument.html">\simplehtmldom\HtmlDocument</a>

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $curl = null) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $curl  |  |




<a name="method_cURL" class="anchor"></a>
#### public cURL() 

```
public cURL(  $verbose = true) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $verbose  |  |




<a name="method_i" class="anchor"></a>
#### public i() 

```
Static public i() 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)




<a name="method_getLogTxt" class="anchor"></a>
#### public getLogTxt() 

```
public getLogTxt() 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)




<a name="method_create_index_AGC" class="anchor"></a>
#### public create_index_AGC() : string&amp;#124;integer

```
public create_index_AGC(string  $url, array&amp;#124;object  $content,   $niche) : string&amp;#124;integer
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $url  |  |
| <code>array&#124;object</code> | $content  |  |
| <code></code> | $niche  |  |

**Returns:** string&#124;integer - $dirpath

##### Tags
| Tag | Version | Description |
| --- | ------- | ----------- |
| todo |  | Create index json AGC |

<a name="method_build_url" class="anchor"></a>
#### public build_url() 

```
public build_url(  $url,   $hl = &#039;auto&#039;,   $tl = &#039;en&#039;) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $url  |  |
| <code></code> | $hl  |  |
| <code></code> | $tl  |  |




<a name="method_translate" class="anchor"></a>
#### public translate() 

```
public translate(  $url,   $hl = &#039;auto&#039;,   $tl = &#039;en&#039;) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $url  |  |
| <code></code> | $hl  |  |
| <code></code> | $tl  |  |




<a name="method_build_url_2" class="anchor"></a>
#### public build_url_2() 

```
public build_url_2(  $url,   $sourcelang = &#039;auto&#039;,   $tolang) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $url  |  |
| <code></code> | $sourcelang  |  |
| <code></code> | $tolang  |  |




<a name="method_refresh_proxy" class="anchor"></a>
#### public refresh_proxy() 

```
public refresh_proxy() 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)




<a name="method_verify_article" class="anchor"></a>
#### public verify_article() 

```
public verify_article(  $filter) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $filter  |  |




<a name="method_decode_html" class="anchor"></a>
#### public decode_html() 

```
public decode_html(  $string) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $string  |  |




<a name="method_grammar" class="anchor"></a>
#### public grammar() 

```
public grammar(string  $t, string  $word, boolean  $chain = false) 
```

**Summary**

Fix grammar.

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $t  | id-en |
| <code>string</code> | $word  | word to be fixed |
| <code>boolean</code> | $chain  | chainning mode |




<a name="method_filter_result" class="anchor"></a>
#### public filter_result() 

```
public filter_result(  $htmlt) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $htmlt  |  |




<a name="method___toString" class="anchor"></a>
#### public __toString() 

```
public __toString() 
```

**Summary**

Return string.

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)




<a name="method_download_site" class="anchor"></a>
#### public download_site() 

```
public download_site(  $c) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $c  |  |




<a name="method_addtitle" class="anchor"></a>
#### public addtitle() 

```
public addtitle(  $title) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $title  |  |




<a name="method_single_translate" class="anchor"></a>
#### public single_translate() 

```
public single_translate(  $sl,   $tl,   $text) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $sl  |  |
| <code></code> | $tl  |  |
| <code></code> | $text  |  |




<a name="method_amp" class="anchor"></a>
#### public amp() 

```
public amp(  $html) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $html  |  |




<a name="method_fetch_contents" class="anchor"></a>
#### public fetch_contents() : \Curl\Curl&amp;#124;null

```
public fetch_contents(\Curl\Curl  $curl, string  $url, string  $niche = &#039;general&#039;, boolean  $option = array(&#039;filehour&#039; =&gt; 24, &#039;fileExt&#039; =&gt; &#039;html&#039;, &#039;force&#039; =&gt; false)) : \Curl\Curl&amp;#124;null
```

**Summary**

fetch content based file time created.

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\Curl\Curl</code> | $curl  |  |
| <code>string</code> | $url  |  |
| <code>string</code> | $niche  | folder name |
| <code>boolean</code> | $option  | ['force']    force recrawl |

**Returns:** \Curl\Curl&#124;null


<a name="method_curl_err" class="anchor"></a>
#### public curl_err() : \Curl\Curl

```
public curl_err(\Curl\Curl  $curl) : \Curl\Curl
```

**Summary**

Handle curl error.

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\Curl\Curl</code> | $curl  |  |

**Returns:** \Curl\Curl


<a name="method_parsetry" class="anchor"></a>
#### protected parsetry() 

```
protected parsetry(  $thetr) 
```

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $thetr  |  |




<a name="method_clean" class="anchor"></a>
#### protected clean() : mixed

```
protected clean(string  $html) : mixed
```

**Summary**

Cleaning body html tags.

**Details:**
* Inherited From: [\AGC\loader\gtrans](../classes/AGC.loader.gtrans.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $html  |  |

**Returns:** mixed



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
