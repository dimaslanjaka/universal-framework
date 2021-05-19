# [Universal Framework PHP Documentation](../home.md)

# Class: \Bulletproof\Image
### Namespace: [\Bulletproof](../namespaces/Bulletproof.md)
---
---
### Constants
* No constants found
---
### Properties
* [protected $name](../classes/Bulletproof.Image.md#property_name)
* [protected $width](../classes/Bulletproof.Image.md#property_width)
* [protected $height](../classes/Bulletproof.Image.md#property_height)
* [protected $mime](../classes/Bulletproof.Image.md#property_mime)
* [protected $path](../classes/Bulletproof.Image.md#property_path)
* [protected $storage](../classes/Bulletproof.Image.md#property_storage)
* [protected $size](../classes/Bulletproof.Image.md#property_size)
* [protected $dimensions](../classes/Bulletproof.Image.md#property_dimensions)
* [protected $mimeTypes](../classes/Bulletproof.Image.md#property_mimeTypes)
* [protected $acceptedMimes](../classes/Bulletproof.Image.md#property_acceptedMimes)
* [protected $commonErrors](../classes/Bulletproof.Image.md#property_commonErrors)
---
### Methods
* [public __construct()](../classes/Bulletproof.Image.md#method___construct)
* [public offsetSet()](../classes/Bulletproof.Image.md#method_offsetSet)
* [public offsetExists()](../classes/Bulletproof.Image.md#method_offsetExists)
* [public offsetUnset()](../classes/Bulletproof.Image.md#method_offsetUnset)
* [public offsetGet()](../classes/Bulletproof.Image.md#method_offsetGet)
* [public setDimension()](../classes/Bulletproof.Image.md#method_setDimension)
* [public getSize()](../classes/Bulletproof.Image.md#method_getSize)
* [public setSize()](../classes/Bulletproof.Image.md#method_setSize)
* [public getJson()](../classes/Bulletproof.Image.md#method_getJson)
* [public getError()](../classes/Bulletproof.Image.md#method_getError)
* [public upload()](../classes/Bulletproof.Image.md#method_upload)
* [public getWidth()](../classes/Bulletproof.Image.md#method_getWidth)
* [public getHeight()](../classes/Bulletproof.Image.md#method_getHeight)
* [public getPath()](../classes/Bulletproof.Image.md#method_getPath)
* [public getStorage()](../classes/Bulletproof.Image.md#method_getStorage)
* [public setStorage()](../classes/Bulletproof.Image.md#method_setStorage)
* [public getName()](../classes/Bulletproof.Image.md#method_getName)
* [public setName()](../classes/Bulletproof.Image.md#method_setName)
* [public getMime()](../classes/Bulletproof.Image.md#method_getMime)
* [public setMime()](../classes/Bulletproof.Image.md#method_setMime)
* [protected constraintValidator()](../classes/Bulletproof.Image.md#method_constraintValidator)
* [protected getImageMime()](../classes/Bulletproof.Image.md#method_getImageMime)
* [protected isSaved()](../classes/Bulletproof.Image.md#method_isSaved)
---
### Details
* File: [bulletproof\src\bulletproof.php](../files/bulletproof.src.bulletproof.md)
* Package: Default
* Class Hierarchy:
  * \Bulletproof\Image
* Implements:
  * []()
---
## Properties
<a name="property_name"></a>
#### protected $name : string
---
**Type:** string
The new image name, to be provided or will be generated
**Details:**


<a name="property_width"></a>
#### protected $width : integer
---
**Type:** integer
The image width in pixels
**Details:**


<a name="property_height"></a>
#### protected $height : integer
---
**Type:** integer
The image height in pixels
**Details:**


<a name="property_mime"></a>
#### protected $mime : string
---
**Type:** string
The image mime type (extension)
**Details:**


<a name="property_path"></a>
#### protected $path : string
---
**Type:** string
The full image path (dir + image + mime)
**Details:**


<a name="property_storage"></a>
#### protected $storage : string
---
**Type:** string
The folder or image storage storage
**Details:**


<a name="property_size"></a>
#### protected $size : array
---
**Type:** array
The min and max image size allowed for upload (in bytes)
**Details:**


<a name="property_dimensions"></a>
#### protected $dimensions : array
---
**Type:** array
The max height and width image allowed
**Details:**


<a name="property_mimeTypes"></a>
#### protected $mimeTypes : array
---
**Type:** array
The mime types allowed for upload
**Details:**


<a name="property_acceptedMimes"></a>
#### protected $acceptedMimes : array
---
**Type:** array
list of known image types
**Details:**


<a name="property_commonErrors"></a>
#### protected $commonErrors : array
---
**Type:** array
error messages strings
**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(array  $_files = array()) 
```

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $_files  | represents the $_FILES array passed as dependency |




<a name="method_offsetSet" class="anchor"></a>
#### public offsetSet() 

```
public offsetSet(mixed  $offset, mixed  $value) 
```

**Summary**

\ArrayAccess unused method.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>mixed</code> | $offset  |  |
| <code>mixed</code> | $value  |  |




<a name="method_offsetExists" class="anchor"></a>
#### public offsetExists() 

```
public offsetExists(mixed  $offset) 
```

**Summary**

\ArrayAccess unused method.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>mixed</code> | $offset  |  |




<a name="method_offsetUnset" class="anchor"></a>
#### public offsetUnset() 

```
public offsetUnset(mixed  $offset) 
```

**Summary**

\ArrayAccess unused method.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>mixed</code> | $offset  |  |




<a name="method_offsetGet" class="anchor"></a>
#### public offsetGet() : string&amp;#124;boolean

```
public offsetGet(mixed  $offset) : string&amp;#124;boolean
```

**Summary**

\ArrayAccess - get array value from object.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>mixed</code> | $offset  |  |

**Returns:** string&#124;boolean


<a name="method_setDimension" class="anchor"></a>
#### public setDimension() : $this

```
public setDimension(  $maxWidth,   $maxHeight) : $this
```

**Summary**

Sets max image height and width limit.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $maxWidth  | int max width value |
| <code></code> | $maxHeight  | int max height value |

**Returns:** $this


<a name="method_getSize" class="anchor"></a>
#### public getSize() : integer

```
public getSize() : integer
```

**Summary**

Returns the image size in bytes.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** integer


<a name="method_setSize" class="anchor"></a>
#### public setSize() : $this

```
public setSize(  $min,   $max) : $this
```

**Summary**

Define a min and max image size for uploading.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $min  | int minimum value in bytes |
| <code></code> | $max  | int maximum value in bytes |

**Returns:** $this


<a name="method_getJson" class="anchor"></a>
#### public getJson() : string

```
public getJson() : string
```

**Summary**

Returns a JSON format of the image width, height, name, mime .

**Description**

..

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** string


<a name="method_getError" class="anchor"></a>
#### public getError() : string

```
public getError() : string
```

**Summary**

Returns error string.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** string


<a name="method_upload" class="anchor"></a>
#### public upload() : false&amp;#124;\Bulletproof\Image

```
public upload() : false&amp;#124;\Bulletproof\Image
```

**Summary**

Validate and save (upload) file.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** false&#124;<a href="../classes/Bulletproof.Image.html">\Bulletproof\Image</a>


<a name="method_getWidth" class="anchor"></a>
#### public getWidth() : integer

```
public getWidth() : integer
```

**Summary**

Returns the image width.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** integer


<a name="method_getHeight" class="anchor"></a>
#### public getHeight() : integer

```
public getHeight() : integer
```

**Summary**

Returns the image height in pixels.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** integer


<a name="method_getPath" class="anchor"></a>
#### public getPath() : string

```
public getPath() : string
```

**Summary**

Returns the full path of the image ex 'storage/image.mime'.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** string


<a name="method_getStorage" class="anchor"></a>
#### public getStorage() : string

```
public getStorage() : string
```

**Summary**

Returns the storage / folder name.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** string


<a name="method_setStorage" class="anchor"></a>
#### public setStorage() : $this

```
public setStorage(  $dir = &#039;uploads&#039;, integer  $permission = 438) : $this
```

**Summary**

Creates a storage for upload storage.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $dir  | string the folder name to create |
| <code>integer</code> | $permission  | chmod permission |

**Returns:** $this


<a name="method_getName" class="anchor"></a>
#### public getName() : string

```
public getName() : string
```

**Summary**

Returns the image name.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** string


<a name="method_setName" class="anchor"></a>
#### public setName() : $this

```
public setName(null  $isNameProvided = null) : $this
```

**Summary**

Provide image name if not provided.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>null</code> | $isNameProvided  |  |

**Returns:** $this


<a name="method_getMime" class="anchor"></a>
#### public getMime() : string&amp;#124;null

```
public getMime() : string&amp;#124;null
```

**Summary**

Returns the image mime type.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** string&#124;null


<a name="method_setMime" class="anchor"></a>
#### public setMime() : $this

```
public setMime(array  $fileTypes) : $this
```

**Summary**

Define a mime type for uploading.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>array</code> | $fileTypes  |  |

**Returns:** $this


<a name="method_constraintValidator" class="anchor"></a>
#### protected constraintValidator() : boolean

```
protected constraintValidator() : boolean
```

**Summary**

Validate image size, dimension or mimetypes.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)

**Returns:** boolean


<a name="method_getImageMime" class="anchor"></a>
#### protected getImageMime() : string&amp;#124;null

```
protected getImageMime(  $tmp_name) : string&amp;#124;null
```

**Summary**

Gets the real image mime type.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $tmp_name  | string The upload tmp directory |

**Returns:** string&#124;null


<a name="method_isSaved" class="anchor"></a>
#### protected isSaved() : boolean

```
protected isSaved(  $tmp_name,   $destination) : boolean
```

**Summary**

Final upload method to be called, isolated for testing purposes.

**Details:**
* Inherited From: [\Bulletproof\Image](../classes/Bulletproof.Image.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $tmp_name  | int the temporary storage of the image file |
| <code></code> | $destination  | int upload destination |

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
