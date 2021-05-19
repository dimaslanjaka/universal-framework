# [Universal Framework PHP Documentation](../home.md)

# Class: \DB\Backup
### Namespace: [\DB](../namespaces/DB.md)
---
**Summary:**

The Backup_Database class.

---
### Constants
* No constants found
---
### Properties
* [public $host](../classes/DB.Backup.md#property_host)
* [public $username](../classes/DB.Backup.md#property_username)
* [public $passwd](../classes/DB.Backup.md#property_passwd)
* [public $dbName](../classes/DB.Backup.md#property_dbName)
* [public $charset](../classes/DB.Backup.md#property_charset)
* [public $conn](../classes/DB.Backup.md#property_conn)
* [public $outputDir](../classes/DB.Backup.md#property_outputDir)
* [public $result](../classes/DB.Backup.md#property_result)
---
### Methods
* [public __construct()](../classes/DB.Backup.md#method___construct)
* [public initializeDatabase()](../classes/DB.Backup.md#method_initializeDatabase)
* [public clean()](../classes/DB.Backup.md#method_clean)
* [public backupTables()](../classes/DB.Backup.md#method_backupTables)
* [public download()](../classes/DB.Backup.md#method_download)
* [protected saveFile()](../classes/DB.Backup.md#method_saveFile)
---
### Details
* File: [DB\Backup.php](../files/DB.Backup.md)
* Package: Default
* Class Hierarchy:
  * \DB\Backup
---
## Properties
<a name="property_host"></a>
#### public $host : 
---
**Summary**

Host where database is located.

**Type:** 

**Details:**


<a name="property_username"></a>
#### public $username : 
---
**Summary**

Username used to connect to database.

**Type:** 

**Details:**


<a name="property_passwd"></a>
#### public $passwd : 
---
**Summary**

Password used to connect to database.

**Type:** 

**Details:**


<a name="property_dbName"></a>
#### public $dbName : 
---
**Summary**

Database to backup.

**Type:** 

**Details:**


<a name="property_charset"></a>
#### public $charset : 
---
**Summary**

Database charset.

**Type:** 

**Details:**


<a name="property_conn"></a>
#### public $conn : \mysqli|null
---
**Type:** \mysqli|null

**Details:**


<a name="property_outputDir"></a>
#### public $outputDir : string
---
**Summary**

Output Directory.

**Type:** string

**Details:**


<a name="property_result"></a>
#### public $result : array
---
**Summary**

Result.

**Type:** array

**Details:**



---
## Methods
<a name="method___construct" class="anchor"></a>
#### public __construct() 

```
public __construct(  $host,   $username,   $passwd,   $dbName,   $charset = &#039;utf8&#039;) 
```

**Summary**

Constructor initializes database.

**Details:**
* Inherited From: [\DB\Backup](../classes/DB.Backup.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $host  |  |
| <code></code> | $username  |  |
| <code></code> | $passwd  |  |
| <code></code> | $dbName  |  |
| <code></code> | $charset  |  |
##### Throws:
| Type | Description |
| ---- | ----------- |
| \Exception |  |




<a name="method_initializeDatabase" class="anchor"></a>
#### public initializeDatabase() 

```
public initializeDatabase() 
```

**Summary**

Initialize Configured Database.

**Details:**
* Inherited From: [\DB\Backup](../classes/DB.Backup.md)
##### Throws:
| Type | Description |
| ---- | ----------- |
| \Exception |  |




<a name="method_clean" class="anchor"></a>
#### public clean() : void

```
public clean() : void
```

**Summary**

Clean All Backup Databases SQL.

**Details:**
* Inherited From: [\DB\Backup](../classes/DB.Backup.md)

**Returns:** void


<a name="method_backupTables" class="anchor"></a>
#### public backupTables() 

```
public backupTables(string  $tables = &#039;*&#039;) 
```

**Summary**

Backup the whole database or just some tables
Use '*' for whole database or 'table1 table2 table3.

**Description**

..'.

**Details:**
* Inherited From: [\DB\Backup](../classes/DB.Backup.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $tables  |  |




<a name="method_download" class="anchor"></a>
#### public download() 

```
public download(  $sqlFile) 
```

**Summary**

Download SQL File To Client Browser.

**Details:**
* Inherited From: [\DB\Backup](../classes/DB.Backup.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code></code> | $sqlFile  |  |
##### Throws:
| Type | Description |
| ---- | ----------- |
| \Exception |  |




<a name="method_saveFile" class="anchor"></a>
#### protected saveFile() 

```
protected saveFile(string  $sql, string  $format = &#039;&#039;) 
```

**Summary**

Save SQL to file.

**Details:**
* Inherited From: [\DB\Backup](../classes/DB.Backup.md)
##### Parameters:
| Type | Name | Description |
| ---- | ---- | ----------- |
| <code>string</code> | $sql  |  |
| <code>string</code> | $format  | date('Ymd-His', time()) or other |





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
