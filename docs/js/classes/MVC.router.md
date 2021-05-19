# [Universal Framework PHP Documentation](../home.md)

# Class: \MVC\router
### Namespace: [\MVC](../namespaces/MVC.md)
---
---
### Constants
* No constants found
---
### Properties
* [public $root_theme](../classes/MVC.themes.md#property_root_theme)
* [public $theme](../classes/MVC.themes.md#property_theme)
* [public $view](../classes/MVC.themes.md#property_view)
* [public $meta](../classes/MVC.themes.md#property_meta)
* [public $title](../classes/MVC.themes.md#property_title)
* [public $config](../classes/MVC.themes.md#property_config)
* [public $config_folder](../classes/MVC.themes.md#property_config_folder)
* [public $session](../classes/MVC.themes.md#property_session)
* [public $root](../classes/MVC.router.md#property_root)
* [public $PHP_ERROR_FILE](../classes/MVC.router.md#property_PHP_ERROR_FILE)
* [public $env](../classes/MVC.router.md#property_env)
---
### Methods
* [public __construct()](../classes/MVC.router.md#method___construct)
* [public shutdown()](../classes/MVC.themes.md#method_shutdown)
* [public published()](../classes/MVC.themes.md#method_published)
* [public date()](../classes/MVC.themes.md#method_date)
* [public modified()](../classes/MVC.themes.md#method_modified)
* [public thumbnail()](../classes/MVC.themes.md#method_thumbnail)
* [public label()](../classes/MVC.themes.md#method_label)
* [public setThemeByZones()](../classes/MVC.themes.md#method_setThemeByZones)
* [public set()](../classes/MVC.themes.md#method_set)
* [public view()](../classes/MVC.themes.md#method_view)
* [public remove_root()](../classes/MVC.themes.md#method_remove_root)
* [public prepare_config()](../classes/MVC.themes.md#method_prepare_config)
* [public is_admin()](../classes/MVC.themes.md#method_is_admin)
* [public NoThemeRequest()](../classes/MVC.themes.md#method_NoThemeRequest)
* [public fix_slash()](../classes/MVC.themes.md#method_fix_slash)
* [public dump()](../classes/MVC.themes.md#method_dump)
* [public render()](../classes/MVC.themes.md#method_render)
* [public load_render()](../classes/MVC.themes.md#method_load_render)
* [public isJSONRequest()](../classes/MVC.themes.md#method_isJSONRequest)
* [public redirect()](../classes/MVC.router.md#method_redirect)
* [public safe_redirect()](../classes/MVC.router.md#method_safe_redirect)
* [public no_direct()](../classes/MVC.router.md#method_no_direct)
* [public environtment()](../classes/MVC.router.md#method_environtment)
* [public is_production()](../classes/MVC.router.md#method_is_production)
* [public get_env()](../classes/MVC.router.md#method_get_env)
* [public is_req()](../classes/MVC.router.md#method_is_req)
* [public is_reqs()](../classes/MVC.router.md#method_is_reqs)
* [public is_post()](../classes/MVC.router.md#method_is_post)
* [public is_hard_reload()](../classes/MVC.router.md#method_is_hard_reload)
* [public is_header()](../classes/MVC.router.md#method_is_header)
* [public findRoute()](../classes/MVC.router.md#method_findRoute)
* [public config()](../classes/MVC.router.md#method_config)
* [public GUID()](../classes/MVC.router.md#method_GUID)
---
### Details
* File: [MVC\router.php](../files/MVC.router.md)
* Package: Default
* Class Hierarchy: 
  * [\MVC\themes](../classes/MVC.themes.md)
  * \MVC\router
---
## Properties
<a name="property_root_theme"></a>
#### public $root_theme : 
---
**Type:** 

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)


<a name="property_theme"></a>
#### public $theme : 
---
**Type:** 

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)


<a name="property_view"></a>
#### public $view : 
---
**Type:** 

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)


<a name="property_meta"></a>
#### public $meta : 
---
**Type:** 

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)


<a name="property_title"></a>
#### public $title : 
---
**Type:** 

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)


<a name="property_config"></a>
#### public $config : 
---
**Type:** 

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)


<a name="property_config_folder"></a>
#### public $config_folder : 
---
**Type:** 

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)


<a name="property_session"></a>
#### public $session : \Session\session
---
**Summary**

Session instances.

**Type:** <a href="../classes/Session.session.html">\Session\session</a>

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)


<a name="property_root"></a>
#### public $root : 
---
**Type:** 

**Details:**


<a name="property_PHP_ERROR_FILE"></a>
#### public $PHP_ERROR_FILE : 
---
**Type:** 

**Details:**


<a name="property_env"></a>
#### public $env : 
---
**Type:** 

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct() 
```

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)




<a name="method_shutdown" class="anchor"></a>
#### public shutdown() : \MVC\themes

```
public shutdown(string&amp;#124;array  $zone) : \MVC\themes
```

**Summary**

Turn zone into maintenance mode (Maintenance page).

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string&#124;array</code> | $zone  | if empty, will turn into maintenance mode in all zone |

**Returns:** <a href="../classes/MVC.themes.html">\MVC\themes</a>


<a name="method_published" class="anchor"></a>
#### public published() 

```
public published(  $time) 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $time  |  |




<a name="method_date" class="anchor"></a>
#### public date() 

```
public date(  $time,   $format = &#039;m/j/y g:i A&#039;) 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $time  |  |
| <code></code> | $format  |  |




<a name="method_modified" class="anchor"></a>
#### public modified() 

```
public modified(  $time) 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $time  |  |




<a name="method_thumbnail" class="anchor"></a>
#### public thumbnail() 

```
public thumbnail(  $src) 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $src  |  |




<a name="method_label" class="anchor"></a>
#### public label() : \MVC\themes

```
public label(  $label = &#039;default&#039;) : \MVC\themes
```

**Summary**

Set Label Router.

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $label  |  |

**Returns:** <a href="../classes/MVC.themes.html">\MVC\themes</a>


<a name="method_setThemeByZones" class="anchor"></a>
#### public setThemeByZones() : $this

```
public setThemeByZones(array  $config,   $default) : $this
```

**Summary**

```php
setThemeByZones([ 'theme-name'=>['zone1', 'zone2'], 'another-theme'=>['zone3','zone4'], 'default-template'])
```
Set theme by zone divider.

**Description**

if not exists in zone divider, will using default template.

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $config  |  |
| <code></code> | $default  |  |
##### Throws:
| Type | Description |
| ---- | ----------- |
| \MVC\Exception |  |

**Returns:** $this


<a name="method_set" class="anchor"></a>
#### public set() : $this

```
public set(  $theme,   $useTheme = true) : $this
```

**Summary**

Set theme default.

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $theme  |  |
| <code></code> | $useTheme  |  |

**Returns:** $this


<a name="method_view" class="anchor"></a>
#### public view() 

```
public view(  $file) 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $file  |  |




<a name="method_remove_root" class="anchor"></a>
#### public remove_root() 

```
public remove_root(  $path) 
```

**Summary**

Remove root path.

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $path  |  |




<a name="method_prepare_config" class="anchor"></a>
#### public prepare_config() 

```
public prepare_config() 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)




<a name="method_is_admin" class="anchor"></a>
#### public is_admin() 

```
public is_admin() 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)




<a name="method_NoThemeRequest" class="anchor"></a>
#### public NoThemeRequest() 

```
public NoThemeRequest() 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)




<a name="method_fix_slash" class="anchor"></a>
#### public fix_slash() 

```
public fix_slash(  $path) 
```

**Summary**

Transform to linux separated file.

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $path  |  |




<a name="method_dump" class="anchor"></a>
#### public dump() 

```
public dump(\MVC\variadic  ...$var) 
```

**Summary**

Dump this variable.

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>\MVC\variadic</code> | $var <small>variadic</small> |  |




<a name="method_render" class="anchor"></a>
#### public render() 

```
public render(  $variables = array(),   $print = true) 
```

**Summary**

Include passed variable.

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $variables  |  |
| <code></code> | $print  |  |




<a name="method_load_render" class="anchor"></a>
#### public load_render() 

```
public load_render(array  $variables,   $print = true) 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $variables  |  |
| <code></code> | $print  |  |




<a name="method_isJSONRequest" class="anchor"></a>
#### public isJSONRequest() 

```
public isJSONRequest() 
```

**Details:**
* Inherited From: [\MVC\themes](../classes/MVC.themes.md)




<a name="method_redirect" class="anchor"></a>
#### public redirect() 

```
public redirect(  $path) 
```

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $path  |  |




<a name="method_safe_redirect" class="anchor"></a>
#### public safe_redirect() 

```
Static public safe_redirect(  $path) 
```

**Summary**

Safe redirect, support any conditions.

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $path  |  |




<a name="method_no_direct" class="anchor"></a>
#### public no_direct() 

```
public no_direct() 
```

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)




<a name="method_environtment" class="anchor"></a>
#### public environtment() : string

```
public environtment(  $env = &#039;production&#039;) : string
```

**Summary**

Define environtment
* development / production.

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $env  |  |

**Returns:** string


<a name="method_is_production" class="anchor"></a>
#### public is_production() 

```
public is_production() 
```

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)




<a name="method_get_env" class="anchor"></a>
#### public get_env() : string

```
Static public get_env() : string
```

**Summary**

Get framework environtment.

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)

**Returns:** string


<a name="method_is_req" class="anchor"></a>
#### public is_req() 

```
public is_req(  $any,   $alternative = null) 
```

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $any  |  |
| <code></code> | $alternative  |  |




<a name="method_is_reqs" class="anchor"></a>
#### public is_reqs() : boolean&amp;#124;string

```
public is_reqs(array  $anys) : boolean&amp;#124;string
```

**Summary**

check if one of the headers exists.

**Description**

```php
if ($this->is_reqs(['DNT', 'Connection']))
```

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $anys  |  |

**Returns:** boolean&#124;string


<a name="method_is_post" class="anchor"></a>
#### public is_post() 

```
public is_post(  $any,   $alternative = null) 
```

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $any  |  |
| <code></code> | $alternative  |  |




<a name="method_is_hard_reload" class="anchor"></a>
#### public is_hard_reload() : boolean

```
public is_hard_reload() : boolean
```

**Summary**

Check browser no-cache request (hard reload).

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)

**Returns:** boolean


<a name="method_is_header" class="anchor"></a>
#### public is_header() : string&amp;#124;null

```
public is_header(  $any) : string&amp;#124;null
```

**Summary**

Check if header request has $any.

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $any  |  |

**Returns:** string&#124;null


<a name="method_findRoute" class="anchor"></a>
#### public findRoute() 

```
public findRoute() 
```

**Summary**

Find router from parameter URL.

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)




<a name="method_config" class="anchor"></a>
#### public config() 

```
public config(  $router) 
```

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $router  |  |




<a name="method_GUID" class="anchor"></a>
#### public GUID() 

```
public GUID() 
```

**Details:**
* Inherited From: [\MVC\router](../classes/MVC.router.md)





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
