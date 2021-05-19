# [Universal Framework PHP Documentation](../home.md)

# Class: \simplehtmldom\Debug
### Namespace: [\simplehtmldom](../namespaces/simplehtmldom.md)
---
**Summary:**

Implements functions for debugging purposes. Debugging can be enabled and
disabled on demand. Debug messages are send to error_log by default but it
is also possible to register a custom debug handler.

---
### Constants
* No constants found
---
### Properties
---
### Methods
* [public enable()](../classes/simplehtmldom.Debug.md#method_enable)
* [public log()](../classes/simplehtmldom.Debug.md#method_log)
* [public isEnabled()](../classes/simplehtmldom.Debug.md#method_isEnabled)
* [public disable()](../classes/simplehtmldom.Debug.md#method_disable)
* [public setDebugHandler()](../classes/simplehtmldom.Debug.md#method_setDebugHandler)
* [public log_once()](../classes/simplehtmldom.Debug.md#method_log_once)
---
### Details
* File: [simplehtmldom\Debug.php](../files/simplehtmldom.Debug.md)
* Package: Default
* Class Hierarchy:
  * \simplehtmldom\Debug

---
## Methods
<a name="method_enable" class="anchor"></a>
#### public enable() 

```
Static public enable() 
```

**Summary**

Enables debug mode.

**Details:**
* Inherited From: [\simplehtmldom\Debug](../classes/simplehtmldom.Debug.md)




<a name="method_log" class="anchor"></a>
#### public log() 

```
Static public log(  $message) 
```

**Summary**

Adds a debug message to error_log if debug mode is enabled. Does nothing
if debug mode is disabled.

**Details:**
* Inherited From: [\simplehtmldom\Debug](../classes/simplehtmldom.Debug.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $message  |  |




<a name="method_isEnabled" class="anchor"></a>
#### public isEnabled() : boolean

```
Static public isEnabled() : boolean
```

**Summary**

Checks whether debug mode is enabled.

**Details:**
* Inherited From: [\simplehtmldom\Debug](../classes/simplehtmldom.Debug.md)

**Returns:** boolean - true if debug mode is enabled, false otherwise


<a name="method_disable" class="anchor"></a>
#### public disable() 

```
Static public disable() 
```

**Summary**

Disables debug mode.

**Details:**
* Inherited From: [\simplehtmldom\Debug](../classes/simplehtmldom.Debug.md)




<a name="method_setDebugHandler" class="anchor"></a>
#### public setDebugHandler() 

```
Static public setDebugHandler(  $function = null) 
```

**Summary**

Sets the debug handler.

**Description**

`null`: error_log (default)

**Details:**
* Inherited From: [\simplehtmldom\Debug](../classes/simplehtmldom.Debug.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $function  |  |




<a name="method_log_once" class="anchor"></a>
#### public log_once() 

```
Static public log_once(  $message) 
```

**Summary**

Adds a debug message to error_log if debug mode is enabled. Does nothing
if debug mode is disabled. Each message is logged only once.

**Details:**
* Inherited From: [\simplehtmldom\Debug](../classes/simplehtmldom.Debug.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $message  |  |





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
