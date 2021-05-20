---
editLink: false
pageClass: phpdoc-api-generated-page


---

# Classes
        
##  `HTML\minify\css\MinificationSequenceFinder`   <Badge text="abstract"/> 








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\HTML\minify\css\MinificationSequenceFinder</span> Constants
> This class has not constants.

### <span style="display: none;">\HTML\minify\css\MinificationSequenceFinder</span> Methods
  
:::warning <a id="HTML-minify-css-MinificationSequenceFinder::findFirstValue" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> findFirstValue ( )  <Badge text="abstract"/> 
-----



```php
protected function findFirstValue( mixed $string ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$string` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="HTML-minify-css-MinificationSequenceFinder::isValid" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> isValid ( )   
-----



```php
public function isValid(  ) : void
```



| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\HTML\minify\css\MinificationSequenceFinder</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\HTML\minify\css\MinificationSequenceFinder</span> Properties
  
:::tip <a id="HTML-minify-css-MinificationSequenceFinder::$start_idx" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $start_idx   
-----




```php
public $start_idx;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="HTML-minify-css-MinificationSequenceFinder::$end_idx" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $end_idx   
-----




```php
public $end_idx;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="HTML-minify-css-MinificationSequenceFinder::$type" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $type   
-----




```php
public $type;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\HTML\minify\css\MinificationSequenceFinder</span> Inherited properties
> This class has not inherited properties.
        
##  `HTML\minify\css\minifyCSS`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\HTML\minify\css\minifyCSS</span> Constants
> This class has not constants.

### <span style="display: none;">\HTML\minify\css\minifyCSS</span> Methods
  
:::tip <a id="HTML-minify-css-minifyCSS::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $css ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$css` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\HTML\minify\css\minifyCSS</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\HTML\minify\css\minifyCSS</span> Properties
> This class has not properties.

#### <span style="display: none;">\HTML\minify\css\minifyCSS</span> Inherited properties
> This class has not inherited properties.
        
##  `HTML\minify\css\QuoteSequenceFinder`    








|     |     |
| ---:|:--- |
| **Extends** |[HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\HTML\minify\css\QuoteSequenceFinder</span> Constants
> This class has not constants.

### <span style="display: none;">\HTML\minify\css\QuoteSequenceFinder</span> Methods
  
:::tip <a id="HTML-minify-css-QuoteSequenceFinder::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $type ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$type` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="HTML-minify-css-QuoteSequenceFinder::findFirstValue" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> findFirstValue ( )   
-----



```php
public function findFirstValue( mixed $string ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$string` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\HTML\minify\css\QuoteSequenceFinder</span> Inherited methods

- [HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)::<a href="classes.html#HTML-minify-css-MinificationSequenceFinder::isValid">isValid()</a>   

### <span style="display: none;">\HTML\minify\css\QuoteSequenceFinder</span> Properties
> This class has not properties.

#### <span style="display: none;">\HTML\minify\css\QuoteSequenceFinder</span> Inherited properties

- [HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)::<a href="classes.html#HTML-minify-css-MinificationSequenceFinder::$start_idx">$start_idx</a>   

- [HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)::<a href="classes.html#HTML-minify-css-MinificationSequenceFinder::$end_idx">$end_idx</a>   

- [HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)::<a href="classes.html#HTML-minify-css-MinificationSequenceFinder::$type">$type</a>   
        
##  `HTML\minify\css\StringSequenceFinder`    








|     |     |
| ---:|:--- |
| **Extends** |[HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\HTML\minify\css\StringSequenceFinder</span> Constants
> This class has not constants.

### <span style="display: none;">\HTML\minify\css\StringSequenceFinder</span> Methods
  
:::tip <a id="HTML-minify-css-StringSequenceFinder::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $start_delimiter, mixed $end_delimiter ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$start_delimiter` | **`mixed`** |  |
| `$end_delimiter` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="HTML-minify-css-StringSequenceFinder::findFirstValue" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> findFirstValue ( )   
-----



```php
public function findFirstValue( mixed $string ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$string` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\HTML\minify\css\StringSequenceFinder</span> Inherited methods

- [HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)::<a href="classes.html#HTML-minify-css-MinificationSequenceFinder::isValid">isValid()</a>   

### <span style="display: none;">\HTML\minify\css\StringSequenceFinder</span> Properties
  
:::warning <a id="HTML-minify-css-StringSequenceFinder::$start_delimiter" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $start_delimiter   
-----




```php
protected $start_delimiter;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="HTML-minify-css-StringSequenceFinder::$end_delimiter" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $end_delimiter   
-----




```php
protected $end_delimiter;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\HTML\minify\css\StringSequenceFinder</span> Inherited properties

- [HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)::<a href="classes.html#HTML-minify-css-MinificationSequenceFinder::$start_idx">$start_idx</a>   

- [HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)::<a href="classes.html#HTML-minify-css-MinificationSequenceFinder::$end_idx">$end_idx</a>   

- [HTML\minify\css\\<span style="font-weight: bold;">MinificationSequenceFinder</span>](classes.html#html-minify-css-minificationsequencefinder)::<a href="classes.html#HTML-minify-css-MinificationSequenceFinder::$type">$type</a>   
        
##  `DB\Backup`    

The Backup_Database class.






|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\DB\Backup</span> Constants
> This class has not constants.

### <span style="display: none;">\DB\Backup</span> Methods
  
:::tip <a id="DB-Backup::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----

Constructor initializes database.

```php
public function __construct( mixed $host, mixed $username, mixed $passwd, mixed $dbName, mixed $charset = 'utf8' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$host` | **`mixed`** |  |
| `$username` | **`mixed`** |  |
| `$passwd` | **`mixed`** |  |
| `$dbName` | **`mixed`** |  |
| `$charset` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="DB-Backup::backupTables" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> backupTables ( )   
-----

Backup the whole database or just some tables
Use '*' for whole database or 'table1 table2 table3.

```php
public function backupTables( string $tables = '*' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$tables` <Badge text="optional" type="warn"/>| **`string`** |  |

***Description:***

..'.

| | |
|:--------:| ----------- |




:::

  
:::tip <a id="DB-Backup::clean" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> clean ( )   
-----

Clean All Backup Databases SQL.

```php
public function clean(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="DB-Backup::download" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> download ( )   
-----

Download SQL File To Client Browser.

```php
public function download( mixed $sqlFile ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$sqlFile` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="DB-Backup::initializeDatabase" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> initializeDatabase ( )   
-----

Initialize Configured Database.

```php
public function initializeDatabase(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::warning <a id="DB-Backup::saveFile" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> saveFile ( )   
-----

Save SQL to file.

```php
protected function saveFile( string &$sql, string $format = '' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$sql` | **`string`** |  |
| `$format` <Badge text="optional" type="warn"/>| **`string`** | date('Ymd-His', time()) or other |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\DB\Backup</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\DB\Backup</span> Properties
  
:::tip <a id="DB-Backup::$host" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $host   
-----

Host where database is located.


```php
public $host = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="DB-Backup::$username" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $username   
-----

Username used to connect to database.


```php
public $username = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="DB-Backup::$passwd" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $passwd   
-----

Password used to connect to database.


```php
public $passwd = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="DB-Backup::$dbName" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $dbName   
-----

Database to backup.


```php
public $dbName = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="DB-Backup::$charset" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $charset   
-----

Database charset.


```php
public $charset = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="DB-Backup::$conn" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $conn   
-----




```php
public $conn;
```

***Types:***
- `\mysqli`
-`null`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="DB-Backup::$outputDir" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $outputDir   
-----

Output Directory.


```php
public $outputDir = __DIR__ . '/backup';
```

***Types:***
- `string`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="DB-Backup::$result" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $result   
-----

Result.


```php
public $result = array();
```

***Types:***
- `array`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\DB\Backup</span> Inherited properties
> This class has not inherited properties.
        
##  `DB\EPDOStatement`    








|     |     |
| ---:|:--- |
| **Extends** |[\\<span style="font-weight: bold;"></span>](classes.html#pdostatement)|
| **Implements** |[Psr\Log\\<span style="font-weight: bold;">LoggerAwareInterface</span>](interfaces.html#psr-log-loggerawareinterface) <br />|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\DB\EPDOStatement</span> Constants
    
:::tip WARNING_USING_ADDSLASHES   
-----



```php
WARNING_USING_ADDSLASHES = 'addslashes is not suitable for production logging, etc. Please consider updating your processes to provide a valid PDO object that can perform the necessary translations and can be updated with your e.g. package management, etc.';
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::


### <span style="display: none;">\DB\EPDOStatement</span> Methods
  
:::warning <a id="DB-EPDOStatement::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----

The first argument passed in should be an instance of the PDO object. If so, we'll cache it's reference locally
to allow for the best escaping possible later when interpolating our query. Other parameters can be added if
needed.

```php
protected function __construct( \PDO $pdo = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$pdo` <Badge text="optional" type="warn"/>| **`\PDO`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="DB-EPDOStatement::_debugQuery" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> _debugQuery ( )   
-----



```php
public function _debugQuery( mixed $replaced = true ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$replaced` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="DB-EPDOStatement::_debugReplace" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> _debugReplace ( )   
-----



```php
protected function _debugReplace( mixed $m ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$m` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="DB-EPDOStatement::bindParam" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> bindParam ( )   
-----

Overrides the default \PDOStatement method to add the named parameter and it's reference to the array of bound
parameters - then accesses and returns parent::bindParam method.

```php
public function bindParam( string $param, mixed &$value, integer $datatype = \PDO::PARAM_STR, integer $length = 0, mixed $driverOptions = false ) : boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$param` | **`string`** |  |
| `$value` | **`mixed`** |  |
| `$datatype` <Badge text="optional" type="warn"/>| **`integer`** |  |
| `$length` <Badge text="optional" type="warn"/>| **`integer`** |  |
| `$driverOptions` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |



***Returns:***

- default of \PDOStatement::bindParam()


:::

  
:::tip <a id="DB-EPDOStatement::bindValue" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> bindValue ( )   
-----

Overrides the default \PDOStatement method to add the named parameter and it's value to the array of bound values
- then accesses and returns parent::bindValue method.

```php
public function bindValue( string $param, mixed $value, integer $datatype = \PDO::PARAM_STR ) : boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$param` | **`string`** |  |
| `$value` | **`mixed`** |  |
| `$datatype` <Badge text="optional" type="warn"/>| **`integer`** |  |


| | |
|:--------:| ----------- |



***Returns:***

- default of \PDOStatement::bindValue()


:::

  
:::tip <a id="DB-EPDOStatement::execute" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> execute ( )   
-----

Overrides the default \PDOStatement method to generate the full query string - then accesses and returns
parent::execute method.

```php
public function execute( array $inputParams = array() ) : boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$inputParams` <Badge text="optional" type="warn"/>| **`array`** |  |


| | |
|:--------:| ----------- |



***Returns:***

- default of \PDOStatement::execute()


:::

  
:::tip <a id="DB-EPDOStatement::interpolateQuery" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> interpolateQuery ( )   
-----

Copies $this->queryString then replaces bound markers with associated values ($this->queryString is not modified
but the resulting query string is assigned to $this->fullQuery).

```php
public function interpolateQuery( array $inputParams = null ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$inputParams` <Badge text="optional" type="warn"/>| **`array`** | - array of values to replace ? marked parameters in the query string |


| | |
|:--------:| ----------- |



***Returns:***

$testQuery - interpolated db query string


:::

  
:::tip <a id="DB-EPDOStatement::setLogger" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> setLogger ( )   
-----

{@inheritdoc}

```php
public function setLogger( \Psr\Log\LoggerInterface $logger ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$logger` | **`\Psr\Log\LoggerInterface`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\DB\EPDOStatement</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\DB\EPDOStatement</span> Properties
  
:::tip <a id="DB-EPDOStatement::$fullQuery" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $fullQuery   
-----




```php
public $fullQuery;
```

***Types:***
- `string`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="DB-EPDOStatement::$_pdo" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $_pdo   
-----




```php
protected $_pdo = '';
```

***Types:***
- `\PDO`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="DB-EPDOStatement::$boundParams" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $boundParams   
-----




```php
protected $boundParams = array();
```

***Types:***
- `array`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="DB-EPDOStatement::$_debugValues" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $_debugValues   
-----

Migrate from \DB\statement.


```php
protected $_debugValues = null;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\DB\EPDOStatement</span> Inherited properties
> This class has not inherited properties.
        
##  `DB\manager`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\DB\manager</span> Constants
> This class has not constants.

### <span style="display: none;">\DB\manager</span> Methods
  
:::tip <a id="DB-manager::backup_tables" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> backup_tables ( )   
-----



```php
public function backup_tables( mixed $host, mixed $user, mixed $pass, mixed $name, mixed $nama_file, mixed $tables = '*' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$host` | **`mixed`** |  |
| `$user` | **`mixed`** |  |
| `$pass` | **`mixed`** |  |
| `$name` | **`mixed`** |  |
| `$nama_file` | **`mixed`** |  |
| `$tables` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\DB\manager</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\DB\manager</span> Properties
> This class has not properties.

#### <span style="display: none;">\DB\manager</span> Inherited properties
> This class has not inherited properties.
        
##  `DB\schema`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\DB\schema</span> Constants
> This class has not constants.

### <span style="display: none;">\DB\schema</span> Methods
  
:::tip <a id="DB-schema::get_enumset_values" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> get_enumset_values ( )  <Badge text="static" type="warn"/>  
-----

Get ENUM or SET values.

```php
public static function get_enumset_values( \DB\pdo $pdo, mixed $table, mixed $field ) : array
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$pdo` | **`\DB\pdo`** |  |
| `$table` | **`mixed`** |  |
| `$field` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="DB-schema::interpolateQuery" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> interpolateQuery ( )  <Badge text="static" type="warn"/>  
-----

Replaces any parameter placeholders in a query with the value of that
parameter. Useful for debugging. Assumes anonymous parameters from
$params are are in the same order as specified in $query.

```php
public static function interpolateQuery( string $query, array $params ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$query` | **`string`** | The sql query with parameter placeholders |
| `$params` | **`array`** | The array of substitution parameters |


| | |
|:--------:| ----------- |



***Returns:***

The interpolated query


:::

  
:::tip <a id="DB-schema::modify_enumset_values" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> modify_enumset_values ( )  <Badge text="static" type="warn"/>  
-----

Modify ENUM or SET values.

```php
public static function modify_enumset_values( \DB\pdo $pdo, mixed $table, mixed $field, array $newData ) : array
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$pdo` | **`\DB\pdo`** |  |
| `$table` | **`mixed`** |  |
| `$field` | **`mixed`** |  |
| `$newData` | **`array`** |  |


| | |
|:--------:| ----------- |
| **See also** |`https://stackoverflow.com/questions/1501958/how-do-i-add-more-members-to-my-enum-type-column-in-mysql`   <br /> |




:::


#### <span style="display: none;">\DB\schema</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\DB\schema</span> Properties
> This class has not properties.

#### <span style="display: none;">\DB\schema</span> Inherited properties
> This class has not inherited properties.
        
##  `Filemanager\file`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\Filemanager\file</span> Constants
> This class has not constants.

### <span style="display: none;">\Filemanager\file</span> Methods
  
:::tip <a id="Filemanager-file::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::__istatic" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __istatic ( )   
-----



```php
public function __istatic(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::cleanDump" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> cleanDump ( )   
-----



```php
public function cleanDump( mixed $c, mixed $_ ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$c` | **`mixed`** |  |
| `$_` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::createFile" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> createFile ( )   
-----

Create file and directory recursively.

```php
public function createFile( string $path, boolean $create = true, boolean $force = false, boolean $append = false, mixed $dump = false ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`string`** | File Path |
| `$create` <Badge text="optional" type="warn"/>| **`boolean`** | * true to create                       * false to abort create |
| `$force` <Badge text="optional" type="warn"/>| **`boolean`** | * true force overwrite                       * false not create if exists |
| `$append` <Badge text="optional" type="warn"/>| **`boolean`** | append to file |
| `$dump` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |



***Returns:***

filepath


:::

  
:::tip <a id="Filemanager-file::createFolder" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> createFolder ( )   
-----

Create folder recursively.

```php
public function createFolder( string $d, mixed $root = null, boolean $noroot = null, mixed $dump = false ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$d` | **`string`** | pathname or dirname |
| `$root` <Badge text="optional" type="warn"/>| **`mixed`** | root directory                       * default $_SERVER['DOCUMENT_ROOT'] |
| `$noroot` <Badge text="optional" type="warn"/>| **`boolean`** | false will return begins with $root |
| `$dump` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::delete" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> delete ( )  <Badge text="static" type="warn"/>  
-----

Recursive delete.

```php
public static function delete( string $path ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`string`** | files or folder |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::deleteDirectory" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> deleteDirectory ( )  <Badge text="static" type="warn"/>  
-----

Delete Non-Empty Directory.

```php
public static function deleteDirectory( mixed $dir ) : boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$dir` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::deleteFile" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> deleteFile ( )   
-----

Delete file.

```php
public function deleteFile( mixed $file ) : boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$file` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::destroy_old_files" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> destroy_old_files ( )   
-----



```php
public function destroy_old_files( mixed $dir, mixed $sec = 3600, mixed $prefix = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$dir` | **`mixed`** |  |
| `$sec` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$prefix` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::determineContent" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> determineContent ( )   
-----



```php
public function determineContent( mixed $create ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$create` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::emptyDir" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> emptyDir ( )  <Badge text="static" type="warn"/>  
-----

Flush directory.

```php
public static function emptyDir( mixed $dir ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$dir` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::file" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> file ( )  <Badge text="static" type="warn"/>  
-----

Create file nested.

```php
public static function file( mixed $path, boolean $create = true, boolean $force = false, boolean $append = false, boolean $dump = false ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |
| `$create` <Badge text="optional" type="warn"/>| **`boolean`** | content |
| `$force` <Badge text="optional" type="warn"/>| **`boolean`** |  |
| `$append` <Badge text="optional" type="warn"/>| **`boolean`** |  |
| `$dump` <Badge text="optional" type="warn"/>| **`boolean`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::folder" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> folder ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function folder( mixed $path ) : mixed
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::get" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> get ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function get( mixed $file, mixed $parse_json = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$file` | **`mixed`** |  |
| `$parse_json` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::isWin" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> isWin ( )  <Badge text="static" type="warn"/>  
-----

Is Device Windows?

```php
public static function isWin(  ) : boolean
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::mkdir" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> mkdir ( )   
-----

Create folder 777.

```php
public function mkdir( mixed $x ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$x` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::remove" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> remove ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function remove( mixed $str ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::smartFilePath" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> smartFilePath ( )   
-----

Normalize Path To Linux Format.

```php
public function smartFilePath( string $path ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`string`** |  |


| | |
|:--------:| ----------- |



***Returns:***

$dir


:::

  
:::tip <a id="Filemanager-file::tmp" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> tmp ( )  <Badge text="static" type="warn"/>  
-----

Get TMP Folder.

```php
public static function tmp(  ) : mixed
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-file::withPath" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> withPath ( )  <Badge text="static" type="warn"/>  
-----

Initialize File (Alternative Multiple Constructor).

```php
public static function withPath( mixed $filepath ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$filepath` | **`mixed`** |  |


| | |
|:--------:| ----------- |
| **See also** |`https://stackoverflow.com/a/1701337`   <br /> |




:::

  
:::tip <a id="Filemanager-file::write" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> write ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function write( mixed $path, mixed $content = '', mixed $append = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |
| `$content` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$append` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\Filemanager\file</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\Filemanager\file</span> Properties
  
:::tip <a id="Filemanager-file::$content" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $content   
-----




```php
public $content = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="Filemanager-file::$modified" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $modified   
-----




```php
public $modified = array();
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="Filemanager-file::$created" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $created   
-----




```php
public $created = array();
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\Filemanager\file</span> Inherited properties
> This class has not inherited properties.
        
##  `Filemanager\scan`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\Filemanager\scan</span> Constants
> This class has not constants.

### <span style="display: none;">\Filemanager\scan</span> Methods
  
:::tip <a id="Filemanager-scan::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $opt = array() ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$opt` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-scan::getStatic" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getStatic ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function getStatic(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-scan::scanAllFiles" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> scanAllFiles ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function scanAllFiles( mixed $dir, mixed $exclude = '/^(.{1,2}|\.htaccess)$/s' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$dir` | **`mixed`** |  |
| `$exclude` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Filemanager-scan::scandir" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> scandir ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function scandir( mixed $dir ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$dir` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\Filemanager\scan</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\Filemanager\scan</span> Properties
  
:::tip <a id="Filemanager-scan::$static" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $static  <Badge text="static" type="warn"/>  
-----




```php
public static $static = null;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="Filemanager-scan::$opt" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $opt  <Badge text="static" type="warn"/>  
-----




```php
public static $opt;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\Filemanager\scan</span> Inherited properties
> This class has not inherited properties.
        
##  `GoogleExt\recaptcha`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\GoogleExt\recaptcha</span> Constants
> This class has not constants.

### <span style="display: none;">\GoogleExt\recaptcha</span> Methods
  
:::tip <a id="GoogleExt-recaptcha::getInstance" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getInstance ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function getInstance(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="GoogleExt-recaptcha::set_secret" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> set_secret ( )   
-----



```php
public function set_secret( mixed $key ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$key` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="GoogleExt-recaptcha::setSecret" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> setSecret ( )   
-----



```php
public function setSecret( mixed $key ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$key` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="GoogleExt-recaptcha::verifyCaptcha" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> verifyCaptcha ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function verifyCaptcha( mixed $callback ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$callback` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="GoogleExt-recaptcha::verifyCaptchaOld" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> verifyCaptchaOld ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function verifyCaptchaOld( mixed $callback = null, mixed $error = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$callback` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$error` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\GoogleExt\recaptcha</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\GoogleExt\recaptcha</span> Properties
  
:::tip <a id="GoogleExt-recaptcha::$secretKey" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $secretKey  <Badge text="static" type="warn"/>  
-----




```php
public static $secretKey;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="GoogleExt-recaptcha::$secret" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $secret   
-----




```php
public $secret = '6LeLW-MUAAAAADaHQWVpUV5CqjNymO0cu_gbL0vv';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="GoogleExt-recaptcha::$siteKey" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $siteKey   
-----




```php
public $siteKey = '6LeLW-MUAAAAALgiXAKP0zo2oslXXbCy57CjFcie';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\GoogleExt\recaptcha</span> Inherited properties
> This class has not inherited properties.
        
##  `GoogleExt\Translator`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\GoogleExt\Translator</span> Constants
> This class has not constants.

### <span style="display: none;">\GoogleExt\Translator</span> Methods
  
:::tip <a id="GoogleExt-Translator::insert" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> insert ( )   
-----

Insert Target String To Be Translated.

```php
public function insert( string $content ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$content` | **`string`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\GoogleExt\Translator</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\GoogleExt\Translator</span> Properties
> This class has not properties.

#### <span style="display: none;">\GoogleExt\Translator</span> Inherited properties
> This class has not inherited properties.
        
##  `HTML\array2element`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\HTML\array2element</span> Constants
> This class has not constants.

### <span style="display: none;">\HTML\array2element</span> Methods
  
:::tip <a id="HTML-array2element::select" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> select ( )   
-----



```php
public function select( array $data, array $attributes = array(), array $options = array() ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$data` | **`array`** |  |
| `$attributes` <Badge text="optional" type="warn"/>| **`array`** |  |
| `$options` <Badge text="optional" type="warn"/>| **`array`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\HTML\array2element</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\HTML\array2element</span> Properties
> This class has not properties.

#### <span style="display: none;">\HTML\array2element</span> Inherited properties
> This class has not inherited properties.
        
##  `HTML\minify`    

-----------------------------------------------------------------------------------------
Based on `https://github.com/mecha-cms/mecha-cms/blob/master/system/kernel/converter.php`
-----------------------------------------------------------------------------------------.






|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\HTML\minify</span> Constants
> This class has not constants.

### <span style="display: none;">\HTML\minify</span> Methods
  
:::tip <a id="HTML-minify::minify_css" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> minify_css ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function minify_css( mixed $input ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$input` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="HTML-minify::minify_html" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> minify_html ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function minify_html( mixed $input ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$input` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="HTML-minify::minify_js" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> minify_js ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function minify_js( mixed $input ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$input` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\HTML\minify</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\HTML\minify</span> Properties
> This class has not properties.

#### <span style="display: none;">\HTML\minify</span> Inherited properties
> This class has not inherited properties.
        
##  `HTML\XDOMDocument`    








|     |     |
| ---:|:--- |
| **Extends** |[\\<span style="font-weight: bold;"></span>](classes.html#domdocument)|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\HTML\XDOMDocument</span> Constants
> This class has not constants.

### <span style="display: none;">\HTML\XDOMDocument</span> Methods
  
:::tip <a id="HTML-XDOMDocument::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $version = null, mixed $encoding = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$version` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$encoding` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="HTML-XDOMDocument::createElement" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> createElement ( )   
-----



```php
public function createElement( mixed $name, mixed $value = null, mixed $namespaceURI = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |
| `$value` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$namespaceURI` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\HTML\XDOMDocument</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\HTML\XDOMDocument</span> Properties
> This class has not properties.

#### <span style="display: none;">\HTML\XDOMDocument</span> Inherited properties
> This class has not inherited properties.
        
##  `HTML\XDOMElement`    








|     |     |
| ---:|:--- |
| **Extends** |[\\<span style="font-weight: bold;"></span>](classes.html#domelement)|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\HTML\XDOMElement</span> Constants
> This class has not constants.

### <span style="display: none;">\HTML\XDOMElement</span> Methods
  
:::tip <a id="HTML-XDOMElement::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $name, mixed $value = null, mixed $namespaceURI = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |
| `$value` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$namespaceURI` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\HTML\XDOMElement</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\HTML\XDOMElement</span> Properties
> This class has not properties.

#### <span style="display: none;">\HTML\XDOMElement</span> Inherited properties
> This class has not inherited properties.
        
##  `JSON\json`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\JSON\json</span> Constants
> This class has not constants.

### <span style="display: none;">\JSON\json</span> Methods
  
:::tip <a id="JSON-json::assoc" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> assoc ( )  <Badge text="static" type="warn"/>  
-----

Force Assoc.

```php
public static function assoc( array|object $arr ) : \JSON\json_decode
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$arr` | **`array`** <br /> **`object`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::beautify" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> beautify ( )  <Badge text="static" type="warn"/>  
-----

beautify JSON.

```php
public static function beautify( \stdClass|array|object|string $data ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$data` | **`\stdClass`** <br /> **`array`** <br /> **`object`** <br /> **`string`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::headerJSON" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> headerJSON ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function headerJSON(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::init" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> init ( )  <Badge text="static" type="warn"/>  
-----

chaining.

```php
public static function init(  ) : \JSON\json
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::is_json" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_json ( )  <Badge text="static" type="warn"/>  
-----

Validate json string.

```php
public static function is_json( string $string ) : boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$string` | **`string`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::isJson" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> isJson ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function isJson( mixed $string ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$string` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::json" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> json ( )  <Badge text="static" type="warn"/>  
-----

JSON formatter.

```php
public static function json( mixed $data = array(), boolean $header = true, boolean $print = true ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$data` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$header` <Badge text="optional" type="warn"/>| **`boolean`** |  |
| `$print` <Badge text="optional" type="warn"/>| **`boolean`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::json_decode" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> json_decode ( )  <Badge text="static" type="warn"/>  
-----

json_decode default assoc.

```php
public static function json_decode( mixed $str, mixed $err_callback = null, boolean $assoc = true ) : \JSON\json_decode
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` | **`mixed`** |  |
| `$err_callback` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$assoc` <Badge text="optional" type="warn"/>| **`boolean`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::json_last_error_e" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> json_last_error_e ( )  <Badge text="static" type="warn"/>  
-----

JSON error explanatory.

```php
public static function json_last_error_e(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::jsond" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> jsond ( )  <Badge text="static" type="warn"/>  
-----

JSON decode with verification.

```php
public static function jsond( string $str, mixed $callback = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` | **`string`** |  |
| `$callback` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::jsonDecode" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> jsonDecode ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function jsonDecode( mixed $input ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$input` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::load" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> load ( )   
-----

Load JSON.

```php
public function load( mixed $file, mixed $assoc = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$file` | **`mixed`** |  |
| `$assoc` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="JSON-json::save" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> save ( )   
-----

Save JSON from `load($file, $assoc = false)`.

```php
public function save(  ) : \JSON\json
```



| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\JSON\json</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\JSON\json</span> Properties
  
:::tip <a id="JSON-json::$static" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $static  <Badge text="static" type="warn"/>  
-----




```php
public static $static;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="JSON-json::$result" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $result   
-----




```php
public $result;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\JSON\json</span> Inherited properties
> This class has not inherited properties.
        
##  `MVC\captcha`    








|     |     |
| ---:|:--- |
| **Extends** |[MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\MVC\captcha</span> Constants
> This class has not constants.

### <span style="display: none;">\MVC\captcha</span> Methods
  
:::tip <a id="MVC-captcha::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-captcha::create" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> create ( )   
-----

Create captcha ids.

```php
public function create(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-captcha::jpeg" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> jpeg ( )   
-----



```php
public function jpeg( mixed $captcha_code ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$captcha_code` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-captcha::receiver" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> receiver ( )   
-----

Receiver (Create captcha).

```php
public function receiver( string $header_name = 'hname' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$header_name` <Badge text="optional" type="warn"/>| **`string`** | javascript function name in header format |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-captcha::receiver2" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> receiver2 ( )   
-----



```php
public function receiver2( mixed $header_name = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$header_name` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-captcha::validate" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> validate ( )   
-----

Validate coupon codes.

```php
public function validate( mixed $captcha ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$captcha` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\MVC\captcha</span> Inherited methods

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::redirect">redirect()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::safe_redirect">safe_redirect()</a>  <Badge text="static" type="warn"/>  

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::no_direct">no_direct()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::environtment">environtment()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::is_production">is_production()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::get_env">get_env()</a>  <Badge text="static" type="warn"/>  

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::is_req">is_req()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::is_reqs">is_reqs()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::is_post">is_post()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::is_hard_reload">is_hard_reload()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::is_header">is_header()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::findRoute">findRoute()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::config">config()</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::GUID">GUID()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::shutdown">shutdown()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::published">published()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::date">date()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::modified">modified()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::thumbnail">thumbnail()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::label">label()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::setThemeByZones">setThemeByZones()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::set">set()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::view">view()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::remove_root">remove_root()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::prepare_config">prepare_config()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::is_admin">is_admin()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::NoThemeRequest">NoThemeRequest()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::fix_slash">fix_slash()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::dump">dump()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::render">render()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::load_render">load_render()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::isJSONRequest">isJSONRequest()</a>   

### <span style="display: none;">\MVC\captcha</span> Properties
  
:::tip <a id="MVC-captcha::$key" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $key   
-----




```php
public $key = null;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\MVC\captcha</span> Inherited properties

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::$root">$root</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::$PHP_ERROR_FILE">$PHP_ERROR_FILE</a>   

- [MVC\\<span style="font-weight: bold;">router</span>](classes.html#mvc-router)::<a href="classes.html#MVC-router::$env">$env</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$root_theme">$root_theme</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$theme">$theme</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$view">$view</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$meta">$meta</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$title">$title</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$config">$config</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$config_folder">$config_folder</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$session">$session</a>   
        
##  `MVC\Exception`    








|     |     |
| ---:|:--- |
| **Extends** |[\\<span style="font-weight: bold;"></span>](classes.html#exception)|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\MVC\Exception</span> Constants
> This class has not constants.

### <span style="display: none;">\MVC\Exception</span> Methods
  
:::tip <a id="MVC-Exception::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $message, mixed $code = 0, \MVC\Exception $previous = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$message` | **`mixed`** |  |
| `$code` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$previous` <Badge text="optional" type="warn"/>| **`\MVC\Exception`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-Exception::__toString" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __toString ( )   
-----



```php
public function __toString(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-Exception::debug_string_backtrace" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> debug_string_backtrace ( )   
-----



```php
public function debug_string_backtrace(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-Exception::generateCallTrace" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> generateCallTrace ( )   
-----



```php
public function generateCallTrace(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-Exception::is_admin" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_admin ( )   
-----



```php
public function is_admin(  ) : void
```



| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\MVC\Exception</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\MVC\Exception</span> Properties
> This class has not properties.

#### <span style="display: none;">\MVC\Exception</span> Inherited properties
> This class has not inherited properties.
        
##  `MVC\helper`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\MVC\helper</span> Constants
> This class has not constants.

### <span style="display: none;">\MVC\helper</span> Methods
  
:::tip <a id="MVC-helper::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::_cloudflare_CheckIP" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> _cloudflare_CheckIP ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function _cloudflare_CheckIP( mixed $ip ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$ip` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::_cloudflare_Requests_Check" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> _cloudflare_Requests_Check ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function _cloudflare_Requests_Check(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::asset_find" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> asset_find ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function asset_find( array $fn = array() ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$fn` <Badge text="optional" type="warn"/>| **`array`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::babel" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> babel ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function babel( mixed $path ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::base_url" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> base_url ( )  <Badge text="static" type="warn"/>  
-----

Get path base URL
* example (/cookie/file.html) -> (https://httpbin.org/cookie/file.html).

```php
public static function base_url( string $path, boolean $forceSSL = false ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`string`** | pathname from base url |
| `$forceSSL` <Badge text="optional" type="warn"/>| **`boolean`** | force https protocol returned                         * true or false or null |


| | |
|:--------:| ----------- |



***Returns:***

protocol://origin/pathname


:::

  
:::tip <a id="MVC-helper::clean_multiple_hypens" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> clean_multiple_hypens ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function clean_multiple_hypens( mixed $string ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$string` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::clean_special_characters" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> clean_special_characters ( )  <Badge text="static" type="warn"/>  
-----

Clean special characters from string.

```php
public static function clean_special_characters( mixed $string, string $replace = '' ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$string` | **`mixed`** |  |
| `$replace` <Badge text="optional" type="warn"/>| **`string`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::clean_whitespace" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> clean_whitespace ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function clean_whitespace( mixed $str ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::cleanBuffer" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> cleanBuffer ( )  <Badge text="static" type="warn"/>  
-----

Clean output buffers.

```php
public static function cleanBuffer(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::config" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> config ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function config(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::cors" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> cors ( )  <Badge text="static" type="warn"/>  
-----

Cors domain verify, detect AJAX, and validate AJAX CORS.

```php
public static function cors( boolean $print_server = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$print_server` <Badge text="optional" type="warn"/>| **`boolean`** | Debug mode |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::ddos_key" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> ddos_key ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function ddos_key(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::delcookie" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> delcookie ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function delcookie( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::env" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> env ( )  <Badge text="static" type="warn"/>  
-----

```php
if (env('dev')) return boolean; //is development environtment or not
```
Get environtment framework.

```php
public static function env( string $for ) : string|boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$for` | **`string`** | dev or prod |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::fixSlash" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> fixSlash ( )  <Badge text="static" type="warn"/>  
-----

Fix path string `default OS` separate slash and replaced by `/`
* WIN (\\)
* LINUX (/).

```php
public static function fixSlash( mixed $path, mixed $maxlength = 10 ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |
| `$maxlength` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::get_canonical" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> get_canonical ( )  <Badge text="static" type="warn"/>  
-----

get canonical url.

```php
public static function get_canonical( string $url = null, boolean $whos = true ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$url` <Badge text="optional" type="warn"/>| **`string`** | null for current page |
| `$whos` <Badge text="optional" type="warn"/>| **`boolean`** | include host or not (http://domain) |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::get_clean_uri" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> get_clean_uri ( )  <Badge text="static" type="warn"/>  
-----

Get `request uri` without parameter.

```php
public static function get_clean_uri( string $url = null ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$url` <Badge text="optional" type="warn"/>| **`string`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::get_client_ip" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> get_client_ip ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function get_client_ip(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::get_url_path" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> get_url_path ( )  <Badge text="static" type="warn"/>  
-----

Get URL from local file.

```php
public static function get_url_path( array|string $path, boolean $cache = null ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`array`** <br /> **`string`** | destinations                            * `array` will be looped, which found first, return them |
| `$cache` <Badge text="optional" type="warn"/>| **`boolean`** |  |


| | |
|:--------:| ----------- |



***Returns:***

if empty == not found


:::

  
:::tip <a id="MVC-helper::getcookie" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getcookie ( )  <Badge text="static" type="warn"/>  
-----

Get Cookie By Name.

```php
public static function getcookie( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::getOrigin" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getOrigin ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function getOrigin(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::getRequestIP" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getRequestIP ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function getRequestIP(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::geturl" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> geturl ( )  <Badge text="static" type="warn"/>  
-----

Get current URL.

```php
public static function geturl( boolean $forceSSL = false ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$forceSSL` <Badge text="optional" type="warn"/>| **`boolean`** | force https protocol returned                       * true or false or null |


| | |
|:--------:| ----------- |



***Returns:***

protocol://origin/pathname


:::

  
:::tip <a id="MVC-helper::HeaderAccept" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> HeaderAccept ( )  <Badge text="static" type="warn"/>  
-----

Get Header Request Accept.

```php
public static function HeaderAccept(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::headerExt" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> headerExt ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function headerExt( mixed $ext ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$ext` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::include_asset" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> include_asset ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function include_asset( mixed $fn, mixed $fn2 = null, mixed $callback = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$fn` | **`mixed`** |  |
| `$fn2` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$callback` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::ip_in_multirange" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> ip_in_multirange ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function ip_in_multirange( mixed $ip, array $ranges ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$ip` | **`mixed`** |  |
| `$ranges` | **`array`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::ip_in_range" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> ip_in_range ( )  <Badge text="static" type="warn"/>  
-----

Check if a given ip is in a network.

```php
public static function ip_in_range( string $ip, string $range ) : boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$ip` | **`string`** | IP to check in IPV4 format eg. 127.0.0.1 |
| `$range` | **`string`** | IP/CIDR netmask eg. 127.0.0.0/24, also 127.0.0.1 is accepted and /32 assumed |


| | |
|:--------:| ----------- |
| **See also** |`https://gist.github.com/ryanwinchester/578c5b50647df3541794`   <br /> |



***Returns:***

true if the ip is in this range / false if not


:::

  
:::tip <a id="MVC-helper::is_google" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_google ( )  <Badge text="static" type="warn"/>  
-----

Check if request is google.

```php
public static function is_google(  ) : boolean
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::is_header" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_header ( )  <Badge text="static" type="warn"/>  
-----

Check if header request has $any.

```php
public static function is_header( mixed $any ) : string|null
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$any` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::is_url" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_url ( )  <Badge text="static" type="warn"/>  
-----

is url ?

```php
public static function is_url( string $url ) : boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$url` | **`string`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::is_windows" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_windows ( )  <Badge text="static" type="warn"/>  
-----

Detect current OS is Windows.

```php
public static function is_windows(  ) : boolean
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::isCloudflare" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> isCloudflare ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function isCloudflare(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::isLocal" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> isLocal ( )  <Badge text="static" type="warn"/>  
-----

Check if current is localhost.

```php
public static function isLocal( string $regex = null ) : boolean
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$regex` <Badge text="optional" type="warn"/>| **`string`** | new regex |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::load_asset" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> load_asset ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function load_asset( mixed $path ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::parse_url2" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> parse_url2 ( )  <Badge text="static" type="warn"/>  
-----

Parse URL deeper.

```php
public static function parse_url2( string $url, boolean $encoded = false ) : \MVC\parse_url
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$url` | **`string`** |  |
| `$encoded` <Badge text="optional" type="warn"/>| **`boolean`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::php_error_log" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> php_error_log ( )  <Badge text="static" type="warn"/>  
-----

GET PHP ERROR LOG.

```php
public static function php_error_log( mixed $onlypath = false ) : string|null
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$onlypath` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::platformSlashes" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> platformSlashes ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function platformSlashes( mixed $path ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::print_server" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> print_server ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function print_server(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::request_data" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> request_data ( )  <Badge text="static" type="warn"/>  
-----

Get request data
* $_GET[$name]
* $_REQUEST[$name]
* $_POST[$name].

```php
public static function request_data( string $type = 'get', mixed $name ) : string|null
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$type` <Badge text="optional" type="warn"/>| **`string`** | request method                     * get = only accept get                     * post = only accept post                     * any = accept all request |
| `$name` | **`mixed`** | What data requests will you take? |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::require_method" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> require_method ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function require_method( mixed $method ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$method` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::sanitize_output" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> sanitize_output ( )  <Badge text="static" type="warn"/>  
-----

Minify HTML.

```php
public static function sanitize_output( string $buffer ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$buffer` | **`string`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::sass" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> sass ( )  <Badge text="static" type="warn"/>  
-----

Sass Compiler.

```php
public static function sass( mixed $path ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::setcookie" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> setcookie ( )  <Badge text="static" type="warn"/>  
-----

Set cookie helper.

```php
public static function setcookie( mixed $name, mixed $value = true, float|integer $day, string $path = '/', string $domain = '', boolean $secure = false, boolean $httponly = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |
| `$value` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$day` | **`float`** <br /> **`integer`** |  |
| `$path` <Badge text="optional" type="warn"/>| **`string`** |  |
| `$domain` <Badge text="optional" type="warn"/>| **`string`** |  |
| `$secure` <Badge text="optional" type="warn"/>| **`boolean`** |  |
| `$httponly` <Badge text="optional" type="warn"/>| **`boolean`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::trycatch" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> trycatch ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function trycatch( mixed $try ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$try` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::url2host" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> url2host ( )  <Badge text="static" type="warn"/>  
-----

transfor url to host (domain only).

```php
public static function url2host( mixed $url, mixed $fallback = null ) : string|null
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$url` | **`mixed`** |  |
| `$fallback` <Badge text="optional" type="warn"/>| **`mixed`** | if url is not valid return $fallback value |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::useragent" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> useragent ( )  <Badge text="static" type="warn"/>  
-----

Get Useragent.

```php
public static function useragent(  ) : string
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-helper::webkit_asset" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> webkit_asset ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function webkit_asset( mixed $path, mixed $alternative = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |
| `$alternative` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\MVC\helper</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\MVC\helper</span> Properties
  
:::tip <a id="MVC-helper::$key" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $key  <Badge text="static" type="warn"/>  
-----




```php
public static $key = 'AUX';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-helper::$expire" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $expire  <Badge text="static" type="warn"/>  
-----




```php
public static $expire = 10;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-helper::$router" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $router  <Badge text="static" type="warn"/>  
-----




```php
public static $router;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-helper::$arch" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $arch  <Badge text="static" type="warn"/>  
-----

Class architecture database.


```php
public static $arch = array();
```

***Types:***
- `array`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\MVC\helper</span> Inherited properties
> This class has not inherited properties.
        
##  `MVC\router`    








|     |     |
| ---:|:--- |
| **Extends** |[MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\MVC\router</span> Constants
> This class has not constants.

### <span style="display: none;">\MVC\router</span> Methods
  
:::tip <a id="MVC-router::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::config" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> config ( )   
-----



```php
public function config( mixed $router ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$router` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::environtment" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> environtment ( )   
-----

Define environtment
* development / production.

```php
public function environtment( mixed $env = 'production' ) : string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$env` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::findRoute" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> findRoute ( )   
-----

Find router from parameter URL.

```php
public function findRoute(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::get_env" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> get_env ( )  <Badge text="static" type="warn"/>  
-----

Get framework environtment.

```php
public static function get_env(  ) : string
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::GUID" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> GUID ( )   
-----



```php
public function GUID(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::is_hard_reload" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_hard_reload ( )   
-----

Check browser no-cache request (hard reload).

```php
public function is_hard_reload(  ) : boolean
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::is_header" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_header ( )   
-----

Check if header request has $any.

```php
public function is_header( mixed $any ) : string|null
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$any` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::is_post" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_post ( )   
-----



```php
public function is_post( mixed $any, mixed $alternative = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$any` | **`mixed`** |  |
| `$alternative` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::is_production" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_production ( )   
-----



```php
public function is_production(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::is_req" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_req ( )   
-----



```php
public function is_req( mixed $any, mixed $alternative = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$any` | **`mixed`** |  |
| `$alternative` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::is_reqs" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_reqs ( )   
-----

check if one of the headers exists.

```php
public function is_reqs( array $anys ) : boolean|string
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$anys` | **`array`** |  |

***Description:***

```php
if ($this->is_reqs(['DNT', 'Connection']))
```

| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::no_direct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> no_direct ( )   
-----



```php
public function no_direct(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::redirect" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> redirect ( )   
-----



```php
public function redirect( mixed $path ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-router::safe_redirect" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> safe_redirect ( )  <Badge text="static" type="warn"/>  
-----

Safe redirect, support any conditions.

```php
public static function safe_redirect( mixed $path ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\MVC\router</span> Inherited methods

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::shutdown">shutdown()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::published">published()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::date">date()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::modified">modified()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::thumbnail">thumbnail()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::label">label()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::setThemeByZones">setThemeByZones()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::set">set()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::view">view()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::remove_root">remove_root()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::prepare_config">prepare_config()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::is_admin">is_admin()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::NoThemeRequest">NoThemeRequest()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::fix_slash">fix_slash()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::dump">dump()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::render">render()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::load_render">load_render()</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::isJSONRequest">isJSONRequest()</a>   

### <span style="display: none;">\MVC\router</span> Properties
  
:::tip <a id="MVC-router::$root" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $root   
-----




```php
public $root;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-router::$PHP_ERROR_FILE" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $PHP_ERROR_FILE   
-----




```php
public $PHP_ERROR_FILE = PHP_ERROR_FILE;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-router::$env" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $env   
-----




```php
public $env;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\MVC\router</span> Inherited properties

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$root_theme">$root_theme</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$theme">$theme</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$view">$view</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$meta">$meta</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$title">$title</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$config">$config</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$config_folder">$config_folder</a>   

- [MVC\\<span style="font-weight: bold;">themes</span>](classes.html#mvc-themes)::<a href="classes.html#MVC-themes::$session">$session</a>   
        
##  `MVC\themes`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\MVC\themes</span> Constants
> This class has not constants.

### <span style="display: none;">\MVC\themes</span> Methods
  
:::tip <a id="MVC-themes::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::date" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> date ( )   
-----



```php
public function date( mixed $time, mixed $format = 'm/j/y g:i A' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$time` | **`mixed`** |  |
| `$format` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::dump" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> dump ( )   
-----

Dump this variable.

```php
public function dump( \MVC\variadic $var ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$var` | **`\MVC\variadic`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::fix_slash" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> fix_slash ( )   
-----

Transform to linux separated file.

```php
public function fix_slash( mixed $path ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::is_admin" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_admin ( )   
-----



```php
public function is_admin(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::isJSONRequest" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> isJSONRequest ( )   
-----



```php
public function isJSONRequest(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::label" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> label ( )   
-----

Set Label Router.

```php
public function label( mixed $label = 'default' ) : \MVC\themes
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$label` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::load_render" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> load_render ( )   
-----



```php
public function load_render( array $variables, mixed $print = true ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$variables` | **`array`** |  |
| `$print` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::modified" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> modified ( )   
-----



```php
public function modified( mixed $time ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$time` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::NoThemeRequest" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> NoThemeRequest ( )   
-----



```php
public function NoThemeRequest(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::prepare_config" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> prepare_config ( )   
-----



```php
public function prepare_config(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::published" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> published ( )   
-----



```php
public function published( mixed $time ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$time` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::remove_root" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> remove_root ( )   
-----

Remove root path.

```php
public function remove_root( mixed $path ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$path` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::render" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> render ( )   
-----

Include passed variable.

```php
public function render( mixed $variables = array(), mixed $print = true ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$variables` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$print` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::set" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> set ( )   
-----

Set theme default.

```php
public function set( mixed $theme, mixed $useTheme = true ) : $this
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$theme` | **`mixed`** |  |
| `$useTheme` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::setThemeByZones" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> setThemeByZones ( )   
-----

```php
setThemeByZones([ 'theme-name'=>['zone1', 'zone2'], 'another-theme'=>['zone3','zone4'], 'default-template'])
```
Set theme by zone divider.

```php
public function setThemeByZones( array $config, mixed $default ) : $this
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$config` | **`array`** |  |
| `$default` | **`mixed`** |  |

***Description:***

if not exists in zone divider, will using default template.

| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::shutdown" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> shutdown ( )   
-----

Turn zone into maintenance mode (Maintenance page).

```php
public function shutdown( array|string $zone ) : \MVC\themes
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$zone` | **`array`** <br /> **`string`** | if empty, will turn into maintenance mode in all zone |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::thumbnail" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> thumbnail ( )   
-----



```php
public function thumbnail( mixed $src ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$src` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-themes::view" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> view ( )   
-----



```php
public function view( mixed $file ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$file` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\MVC\themes</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\MVC\themes</span> Properties
  
:::tip <a id="MVC-themes::$root_theme" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $root_theme   
-----




```php
public $root_theme;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-themes::$theme" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $theme   
-----




```php
public $theme;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-themes::$view" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $view   
-----




```php
public $view;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-themes::$meta" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $meta   
-----




```php
public $meta = array();
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-themes::$title" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $title   
-----




```php
public $title = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-themes::$config" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $config   
-----




```php
public $config;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-themes::$config_folder" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $config_folder   
-----




```php
public $config_folder;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="MVC-themes::$session" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $session   
-----

Session instances.


```php
public $session = null;
```

***Types:***
- `\Session\session`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\MVC\themes</span> Inherited properties
> This class has not inherited properties.
        
##  `MVC\uid`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\MVC\uid</span> Constants
> This class has not constants.

### <span style="display: none;">\MVC\uid</span> Methods
  
:::tip <a id="MVC-uid::checkRequestUID" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> checkRequestUID ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function checkRequestUID( mixed $header_name, mixed $regen_session_timeout = 60 ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$header_name` | **`mixed`** |  |
| `$regen_session_timeout` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-uid::include_uid_js" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> include_uid_js ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function include_uid_js(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-uid::receiveUID" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> receiveUID ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function receiveUID( mixed $header_name, mixed $regen_session_timeout = 60 ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$header_name` | **`mixed`** |  |
| `$regen_session_timeout` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-uid::removeLastCache" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> removeLastCache ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function removeLastCache(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="MVC-uid::verifyUID" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> verifyUID ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function verifyUID(  ) : void
```



| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\MVC\uid</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\MVC\uid</span> Properties
> This class has not properties.

#### <span style="display: none;">\MVC\uid</span> Inherited properties
> This class has not inherited properties.
        
##  `Session\FileSessionHandler`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |[\\<span style="font-weight: bold;">SessionHandlerInterface</span>](interfaces.html#sessionhandlerinterface) <br />|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\Session\FileSessionHandler</span> Constants
> This class has not constants.

### <span style="display: none;">\Session\FileSessionHandler</span> Methods
  
:::tip <a id="Session-FileSessionHandler::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $sess_path, mixed $prefix = 'sess_', mixed $postfix = '' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$sess_path` | **`mixed`** |  |
| `$prefix` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$postfix` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-FileSessionHandler::close" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> close ( )   
-----



```php
public function close(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-FileSessionHandler::destroy" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> destroy ( )   
-----



```php
public function destroy( mixed $sess_id ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$sess_id` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-FileSessionHandler::gc" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> gc ( )   
-----



```php
public function gc( mixed $lifetime ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$lifetime` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-FileSessionHandler::open" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> open ( )   
-----



```php
public function open( mixed $save_path, mixed $sess_name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$save_path` | **`mixed`** |  |
| `$sess_name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-FileSessionHandler::read" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> read ( )   
-----



```php
public function read( mixed $sess_id ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$sess_id` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-FileSessionHandler::write" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> write ( )   
-----



```php
public function write( mixed $sess_id, mixed $data ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$sess_id` | **`mixed`** |  |
| `$data` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\Session\FileSessionHandler</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\Session\FileSessionHandler</span> Properties
  
:::warning <a id="Session-FileSessionHandler::$sess_path" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $sess_path   
-----




```php
protected $sess_path;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="Session-FileSessionHandler::$prefix" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $prefix   
-----




```php
protected $prefix;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="Session-FileSessionHandler::$postfix" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $postfix   
-----




```php
protected $postfix;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\Session\FileSessionHandler</span> Inherited properties
> This class has not inherited properties.
        
##  `Session\session`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\Session\session</span> Constants
> This class has not constants.

### <span style="display: none;">\Session\session</span> Methods
  
:::tip <a id="Session-session::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $timeout = 3600, mixed $session_folder = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$timeout` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$session_folder` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::all" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> all ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function all(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::dump" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> dump ( )   
-----



```php
public function dump(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::get" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> get ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function get( mixed $key ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$key` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::getInstance" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getInstance ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function getInstance(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::gets" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> gets ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function gets( array $keys ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$keys` | **`array`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::handle" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> handle ( )   
-----



```php
public function handle( mixed $timeout, mixed $folder = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$timeout` | **`mixed`** |  |
| `$folder` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::has" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> has ( )  <Badge text="static" type="warn"/>  
-----

Is session set ?

```php
public static function has( mixed $key, mixed $empty = true ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$key` | **`mixed`** |  |
| `$empty` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::is_sess" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_sess ( )   
-----



```php
public function is_sess( mixed $session_name, mixed $not_found = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$session_name` | **`mixed`** |  |
| `$not_found` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::is_session_started" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_session_started ( )   
-----



```php
public function is_session_started(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::now" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> now ( )   
-----



```php
public function now(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::sess" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> sess ( )   
-----



```php
public function sess( mixed $key, mixed $val ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$key` | **`mixed`** |  |
| `$val` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::set_session" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> set_session ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function set_session( mixed $data, mixed $value = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$data` | **`mixed`** |  |
| `$value` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::start_timeout" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> start_timeout ( )   
-----



```php
public function start_timeout( mixed $timeout = 5, mixed $probability = 100 ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$timeout` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$probability` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="Session-session::unses" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> unses ( )  <Badge text="static" type="warn"/>  
-----

Unset Session.

```php
public static function unses( \Session\Number|array|string $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`\Session\Number`** <br /> **`array`** <br /> **`string`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\Session\session</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\Session\session</span> Properties
  
:::tip <a id="Session-session::$sessionCookieName" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $sessionCookieName   
-----




```php
public $sessionCookieName = 'uf';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="Session-session::$cookiePath" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $cookiePath   
-----




```php
public $cookiePath = '/';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="Session-session::$cookieDomain" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $cookieDomain   
-----




```php
public $cookieDomain = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\Session\session</span> Inherited properties
> This class has not inherited properties.
        
##  `simplehtmldom\Debug`    

Implements functions for debugging purposes. Debugging can be enabled and
disabled on demand. Debug messages are send to error_log by default but it
is also possible to register a custom debug handler.






|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\simplehtmldom\Debug</span> Constants
> This class has not constants.

### <span style="display: none;">\simplehtmldom\Debug</span> Methods
  
:::tip <a id="simplehtmldom-Debug::disable" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> disable ( )  <Badge text="static" type="warn"/>  
-----

Disables debug mode.

```php
public static function disable(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-Debug::enable" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> enable ( )  <Badge text="static" type="warn"/>  
-----

Enables debug mode.

```php
public static function enable(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-Debug::isEnabled" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> isEnabled ( )  <Badge text="static" type="warn"/>  
-----

Checks whether debug mode is enabled.

```php
public static function isEnabled(  ) : boolean
```



| | |
|:--------:| ----------- |



***Returns:***

true if debug mode is enabled, false otherwise


:::

  
:::tip <a id="simplehtmldom-Debug::log" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> log ( )  <Badge text="static" type="warn"/>  
-----

Adds a debug message to error_log if debug mode is enabled. Does nothing
if debug mode is disabled.

```php
public static function log( mixed $message ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$message` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-Debug::log_once" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> log_once ( )  <Badge text="static" type="warn"/>  
-----

Adds a debug message to error_log if debug mode is enabled. Does nothing
if debug mode is disabled. Each message is logged only once.

```php
public static function log_once( mixed $message ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$message` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-Debug::setDebugHandler" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> setDebugHandler ( )  <Badge text="static" type="warn"/>  
-----

Sets the debug handler.

```php
public static function setDebugHandler( mixed $function = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$function` <Badge text="optional" type="warn"/>| **`mixed`** |  |

***Description:***

`null`: error_log (default)

| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\simplehtmldom\Debug</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\simplehtmldom\Debug</span> Properties
> This class has not properties.

#### <span style="display: none;">\simplehtmldom\Debug</span> Inherited properties
> This class has not inherited properties.
        
##  `simplehtmldom\helper`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\simplehtmldom\helper</span> Constants
> This class has not constants.

### <span style="display: none;">\simplehtmldom\helper</span> Methods
  
:::tip <a id="simplehtmldom-helper::str_get_html" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> str_get_html ( )  <Badge text="static" type="warn"/>  
-----

str_get_html.

```php
public static function str_get_html( \simplehtmldom\[type] $str, boolean $lowercase = true, boolean $forceTagsClosed = true, \simplehtmldom\[type] $target_charset = DEFAULT_TARGET_CHARSET, boolean $stripRN = true, \simplehtmldom\[type] $defaultBRText = DEFAULT_BR_TEXT, \simplehtmldom\[type] $defaultSpanText = DEFAULT_SPAN_TEXT ) : \simplehtmldom\HtmlDocument
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` | **`\simplehtmldom\[type]`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`boolean`** |  |
| `$forceTagsClosed` <Badge text="optional" type="warn"/>| **`boolean`** |  |
| `$target_charset` <Badge text="optional" type="warn"/>| **`\simplehtmldom\[type]`** |  |
| `$stripRN` <Badge text="optional" type="warn"/>| **`boolean`** |  |
| `$defaultBRText` <Badge text="optional" type="warn"/>| **`\simplehtmldom\[type]`** |  |
| `$defaultSpanText` <Badge text="optional" type="warn"/>| **`\simplehtmldom\[type]`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\simplehtmldom\helper</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\simplehtmldom\helper</span> Properties
> This class has not properties.

#### <span style="display: none;">\simplehtmldom\helper</span> Inherited properties
> This class has not inherited properties.
        
##  `simplehtmldom\HtmlDocument`    

HTMLDocument class.






|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\simplehtmldom\HtmlDocument</span> Constants
> This class has not constants.

### <span style="display: none;">\simplehtmldom\HtmlDocument</span> Methods
  
:::tip <a id="simplehtmldom-HtmlDocument::__call" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __call ( )   
-----



```php
public function __call( mixed $func, mixed $args ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$func` | **`mixed`** |  |
| `$args` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $str = null, mixed $lowercase = true, mixed $forceTagsClosed = true, mixed $target_charset = DEFAULT_TARGET_CHARSET, mixed $stripRN = true, mixed $defaultBRText = DEFAULT_BR_TEXT, mixed $defaultSpanText = DEFAULT_SPAN_TEXT, mixed $options = 0 ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$forceTagsClosed` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$target_charset` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$stripRN` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultBRText` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultSpanText` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$options` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::__debugInfo" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __debugInfo ( )   
-----



```php
public function __debugInfo(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::__destruct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __destruct ( )   
-----



```php
public function __destruct(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::__get" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __get ( )   
-----



```php
public function __get( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::__toString" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __toString ( )   
-----



```php
public function __toString(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::as_text_node" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> as_text_node ( )   
-----



```php
protected function as_text_node( mixed $tag ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$tag` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::childNodes" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> childNodes ( )   
-----



```php
public function childNodes( mixed $idx = -1 ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$idx` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::copy_skip" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> copy_skip ( )   
-----



```php
protected function copy_skip( mixed $chars ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$chars` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::copy_until" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> copy_until ( )   
-----



```php
protected function copy_until( mixed $chars ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$chars` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::copy_until_char" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> copy_until_char ( )   
-----



```php
protected function copy_until_char( mixed $char ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$char` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::createElement" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> createElement ( )   
-----



```php
public function createElement( mixed $name, mixed $value = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |
| `$value` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::createTextNode" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> createTextNode ( )   
-----



```php
public function createTextNode( mixed $value ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$value` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::decode" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> decode ( )   
-----



```php
protected function decode(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::dump" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> dump ( )   
-----



```php
public function dump( mixed $show_attr = true ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$show_attr` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::expect" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> expect ( )   
-----



```php
public function expect( mixed $selector, mixed $idx = null, mixed $lowercase = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$selector` | **`mixed`** |  |
| `$idx` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::find" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> find ( )   
-----

Find elements by CSS Selector.

```php
public function find( string $selector, \simplehtmldom\number|null $idx = null, boolean $lowercase = false ) : array&lt;mixed,\simplehtmldom\HtmlNode&gt;|\simplehtmldom\HtmlNode
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$selector` | **`string`** | CSS Selector |
| `$idx` <Badge text="optional" type="warn"/>| **`\simplehtmldom\number`** <br /> **`null`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`boolean`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::firstChild" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> firstChild ( )   
-----



```php
public function firstChild(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::getElementById" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getElementById ( )   
-----



```php
public function getElementById( mixed $id ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$id` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::getElementByTagName" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getElementByTagName ( )   
-----



```php
public function getElementByTagName( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::getElementsById" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getElementsById ( )   
-----



```php
public function getElementsById( mixed $id, mixed $idx = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$id` | **`mixed`** |  |
| `$idx` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::getElementsByTagName" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getElementsByTagName ( )   
-----



```php
public function getElementsByTagName( mixed $name, mixed $idx = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |
| `$idx` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::lastChild" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> lastChild ( )   
-----



```php
public function lastChild(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::link_nodes" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> link_nodes ( )   
-----



```php
protected function link_nodes( mixed &$node, mixed $is_child ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$node` | **`mixed`** |  |
| `$is_child` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::load" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> load ( )   
-----



```php
public function load( mixed $str, mixed $lowercase = true, mixed $stripRN = true, mixed $defaultBRText = DEFAULT_BR_TEXT, mixed $defaultSpanText = DEFAULT_SPAN_TEXT, mixed $options = 0 ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` | **`mixed`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$stripRN` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultBRText` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultSpanText` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$options` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::loadFile" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> loadFile ( )   
-----



```php
public function loadFile( mixed $file ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$file` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::parse" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> parse ( )   
-----



```php
protected function parse( mixed $trim = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$trim` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::parse_attr" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> parse_attr ( )   
-----



```php
protected function parse_attr( mixed $node, mixed $name, mixed &$space, mixed $trim ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$node` | **`mixed`** |  |
| `$name` | **`mixed`** |  |
| `$space` | **`mixed`** |  |
| `$trim` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::parse_charset" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> parse_charset ( )   
-----



```php
protected function parse_charset(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::prepare" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> prepare ( )   
-----



```php
protected function prepare( mixed $str, mixed $lowercase = true, mixed $defaultBRText = DEFAULT_BR_TEXT, mixed $defaultSpanText = DEFAULT_SPAN_TEXT ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` | **`mixed`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultBRText` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultSpanText` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::read_tag" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> read_tag ( )   
-----



```php
protected function read_tag( mixed $trim ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$trim` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::remove_callback" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> remove_callback ( )   
-----



```php
public function remove_callback(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::remove_noise" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> remove_noise ( )   
-----



```php
protected function remove_noise( mixed $pattern, mixed $remove_tag = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$pattern` | **`mixed`** |  |
| `$remove_tag` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::restore_noise" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> restore_noise ( )   
-----



```php
public function restore_noise( mixed $text ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$text` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::save" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> save ( )   
-----

Save modified html.

```php
public function save( string $filepath = '' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$filepath` <Badge text="optional" type="warn"/>| **`string`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::search_noise" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> search_noise ( )   
-----



```php
public function search_noise( mixed $text ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$text` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::set_callback" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> set_callback ( )   
-----



```php
public function set_callback( mixed $function_name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$function_name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlDocument::skip" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> skip ( )   
-----



```php
protected function skip( mixed $chars ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$chars` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlDocument::title" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> title ( )   
-----



```php
public function title(  ) : void
```



| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\simplehtmldom\HtmlDocument</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\simplehtmldom\HtmlDocument</span> Properties
  
:::tip <a id="simplehtmldom-HtmlDocument::$root" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $root   
-----

HtmlNode instance.


```php
public $root = null;
```

***Types:***
- `\simplehtmldom\HtmlNode`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlDocument::$nodes" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $nodes   
-----




```php
public $nodes = array();
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlDocument::$callback" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $callback   
-----




```php
public $callback = null;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlDocument::$lowercase" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $lowercase   
-----




```php
public $lowercase = false;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlDocument::$original_size" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $original_size   
-----




```php
public $original_size;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlDocument::$size" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $size   
-----




```php
public $size;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlDocument::$_charset" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $_charset   
-----




```php
public $_charset = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlDocument::$_target_charset" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $_target_charset   
-----




```php
public $_target_charset = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlDocument::$default_br_text" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $default_br_text   
-----




```php
public $default_br_text = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlDocument::$default_span_text" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $default_span_text   
-----




```php
public $default_span_text = '';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$pos" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $pos   
-----




```php
protected $pos;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$doc" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $doc   
-----




```php
protected $doc;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$char" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $char   
-----




```php
protected $char;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$cursor" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $cursor   
-----




```php
protected $cursor;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$parent" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $parent   
-----




```php
protected $parent;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$noise" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $noise   
-----




```php
protected $noise = array();
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$token_blank" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $token_blank   
-----




```php
protected $token_blank = " \t\r\n";
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$token_equal" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $token_equal   
-----




```php
protected $token_equal = ' =/>';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$token_slash" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $token_slash   
-----




```php
protected $token_slash = " />\r\n\t";
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$token_attr" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $token_attr   
-----




```php
protected $token_attr = ' >';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$self_closing_tags" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $self_closing_tags   
-----




```php
protected $self_closing_tags = array('area' => 1, 'base' => 1, 'br' => 1, 'col' => 1, 'embed' => 1, 'hr' => 1, 'img' => 1, 'input' => 1, 'link' => 1, 'meta' => 1, 'param' => 1, 'source' => 1, 'track' => 1, 'wbr' => 1);
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$block_tags" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $block_tags   
-----




```php
protected $block_tags = array('body' => 1, 'div' => 1, 'form' => 1, 'root' => 1, 'span' => 1, 'table' => 1);
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::warning <a id="simplehtmldom-HtmlDocument::$optional_closing_tags" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $optional_closing_tags   
-----




```php
protected $optional_closing_tags = array('b' => array('b' => 1), 'dd' => array('dd' => 1, 'dt' => 1), 'dl' => array('dd' => 1, 'dt' => 1), 'dt' => array('dd' => 1, 'dt' => 1), 'li' => array('li' => 1), 'optgroup' => array('optgroup' => 1, 'option' => 1), 'option' => array('optgroup' => 1, 'option' => 1), 'p' => array('p' => 1), 'rp' => array('rp' => 1, 'rt' => 1), 'rt' => array('rp' => 1, 'rt' => 1), 'td' => array('td' => 1, 'th' => 1), 'th' => array('td' => 1, 'th' => 1), 'tr' => array('td' => 1, 'th' => 1, 'tr' => 1));
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\simplehtmldom\HtmlDocument</span> Inherited properties
> This class has not inherited properties.
        
##  `simplehtmldom\HtmlNode`    

HTMLNode class.






|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\simplehtmldom\HtmlNode</span> Constants
    
:::tip HDOM_INFO_BEGIN   
-----



```php
HDOM_INFO_BEGIN = 0;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_INFO_END   
-----



```php
HDOM_INFO_END = 1;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_INFO_ENDSPACE   
-----



```php
HDOM_INFO_ENDSPACE = 7;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_INFO_INNER   
-----



```php
HDOM_INFO_INNER = 5;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_INFO_OUTER   
-----



```php
HDOM_INFO_OUTER = 6;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_INFO_QUOTE   
-----



```php
HDOM_INFO_QUOTE = 2;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_INFO_SPACE   
-----



```php
HDOM_INFO_SPACE = 3;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_INFO_TEXT   
-----



```php
HDOM_INFO_TEXT = 4;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_QUOTE_DOUBLE   
-----



```php
HDOM_QUOTE_DOUBLE = 0;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_QUOTE_NO   
-----



```php
HDOM_QUOTE_NO = 3;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_QUOTE_SINGLE   
-----



```php
HDOM_QUOTE_SINGLE = 1;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_TYPE_CDATA   
-----



```php
HDOM_TYPE_CDATA = 7;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_TYPE_COMMENT   
-----



```php
HDOM_TYPE_COMMENT = 2;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_TYPE_ELEMENT   
-----



```php
HDOM_TYPE_ELEMENT = 1;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_TYPE_ROOT   
-----



```php
HDOM_TYPE_ROOT = 5;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_TYPE_TEXT   
-----



```php
HDOM_TYPE_TEXT = 3;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::

    
:::tip HDOM_TYPE_UNKNOWN   
-----



```php
HDOM_TYPE_UNKNOWN = 6;
```

**Type:** **`mixed`**


| | |
|:--------:| ----------- |


:::


### <span style="display: none;">\simplehtmldom\HtmlNode</span> Methods
  
:::tip <a id="simplehtmldom-HtmlNode::__call" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __call ( )   
-----



```php
public function __call( mixed $func, mixed $args ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$func` | **`mixed`** |  |
| `$args` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct( mixed $dom ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$dom` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::__debugInfo" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __debugInfo ( )   
-----



```php
public function __debugInfo(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::__get" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __get ( )   
-----



```php
public function __get( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::__isset" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __isset ( )   
-----



```php
public function __isset( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::__set" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __set ( )   
-----



```php
public function __set( mixed $name, mixed $value ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |
| `$value` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::__toString" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __toString ( )   
-----



```php
public function __toString(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::__unset" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __unset ( )   
-----



```php
public function __unset( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::addClass" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> addClass ( )   
-----



```php
public function addClass( mixed $class ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$class` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::appendChild" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> appendChild ( )   
-----



```php
public function appendChild( mixed $node ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$node` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::childNodes" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> childNodes ( )   
-----



```php
public function childNodes( mixed $idx = -1 ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$idx` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::clear" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> clear ( )   
-----



```php
public function clear(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::convert_text" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> convert_text ( )   
-----



```php
public function convert_text( mixed $text ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$text` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::dump" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> dump ( )   
-----



```php
public function dump( mixed $show_attr = true, mixed $depth = 0 ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$show_attr` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$depth` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::dump_node" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> dump_node ( )   
-----



```php
public function dump_node( mixed $echo = true ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$echo` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::expect" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> expect ( )   
-----



```php
public function expect( mixed $selector, mixed $idx = null, mixed $lowercase = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$selector` | **`mixed`** |  |
| `$idx` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::find" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> find ( )   
-----

Element selector.

```php
public function find( string $selector, integer $idx = null, boolean $lowercase = false ) : \simplehtmldom\HtmlNode
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$selector` | **`string`** |  |
| `$idx` <Badge text="optional" type="warn"/>| **`integer`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`boolean`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::find_ancestor_tag" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> find_ancestor_tag ( )   
-----



```php
public function find_ancestor_tag( mixed $tag ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$tag` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::firstChild" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> firstChild ( )   
-----



```php
public function firstChild(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::get_display_size" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> get_display_size ( )   
-----



```php
public function get_display_size(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::getAllAttributes" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getAllAttributes ( )   
-----



```php
public function getAllAttributes(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::getAttribute" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getAttribute ( )   
-----



```php
public function getAttribute( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::getElementById" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getElementById ( )   
-----



```php
public function getElementById( mixed $id ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$id` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::getElementByTagName" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getElementByTagName ( )   
-----



```php
public function getElementByTagName( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::getElementsById" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getElementsById ( )   
-----



```php
public function getElementsById( mixed $id, mixed $idx = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$id` | **`mixed`** |  |
| `$idx` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::getElementsByTagName" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> getElementsByTagName ( )   
-----



```php
public function getElementsByTagName( mixed $name, mixed $idx = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |
| `$idx` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::hasAttribute" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> hasAttribute ( )   
-----



```php
public function hasAttribute( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::hasChildNodes" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> hasChildNodes ( )   
-----



```php
public function hasChildNodes(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::hasClass" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> hasClass ( )   
-----



```php
public function hasClass( mixed $class ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$class` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::innertext" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> innertext ( )   
-----



```php
public function innertext(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlNode::is_block_element" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_block_element ( )   
-----

Returns true if the provided element is a block level element.

```php
protected function is_block_element( mixed $node ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$node` | **`mixed`** |  |


| | |
|:--------:| ----------- |
| **See also** |`https://www.w3resource.com/html/HTML-block-level-and-inline-elements.php`   <br /> |




:::

  
:::warning <a id="simplehtmldom-HtmlNode::is_inline_element" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_inline_element ( )   
-----

Returns true if the provided element is an inline level element.

```php
protected function is_inline_element( mixed $node ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$node` | **`mixed`** |  |


| | |
|:--------:| ----------- |
| **See also** |`https://www.w3resource.com/html/HTML-block-level-and-inline-elements.php`   <br /> |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::is_utf8" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> is_utf8 ( )  <Badge text="static" type="warn"/>  
-----



```php
public static function is_utf8( mixed $str ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::lastChild" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> lastChild ( )   
-----



```php
public function lastChild(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::makeup" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> makeup ( )   
-----



```php
public function makeup(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlNode::match" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> match ( )   
-----



```php
protected function match( mixed $exp, mixed $pattern, mixed $value, mixed $case_sensitivity ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$exp` | **`mixed`** |  |
| `$pattern` | **`mixed`** |  |
| `$value` | **`mixed`** |  |
| `$case_sensitivity` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::nextSibling" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> nextSibling ( )   
-----



```php
public function nextSibling(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::nodeName" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> nodeName ( )   
-----



```php
public function nodeName(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::outertext" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> outertext ( )   
-----



```php
public function outertext(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::parent" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> parent ( )   
-----



```php
public function parent( mixed $parent = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$parent` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::parentNode" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> parentNode ( )   
-----



```php
public function parentNode(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlNode::parse_selector" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> parse_selector ( )   
-----



```php
protected function parse_selector( mixed $selector_string ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$selector_string` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::previousSibling" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> previousSibling ( )   
-----



```php
public function previousSibling(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::remove" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> remove ( )   
-----



```php
public function remove(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::removeAttribute" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> removeAttribute ( )   
-----



```php
public function removeAttribute( mixed $name ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::removeChild" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> removeChild ( )   
-----



```php
public function removeChild( mixed $node ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$node` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::removeClass" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> removeClass ( )   
-----



```php
public function removeClass( mixed $class = null ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$class` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::save" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> save ( )   
-----



```php
public function save( mixed $filepath = '' ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$filepath` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::warning <a id="simplehtmldom-HtmlNode::seek" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> seek ( )   
-----



```php
protected function seek( mixed $selector, mixed &$ret, mixed $parent_cmd, mixed $lowercase = false ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$selector` | **`mixed`** |  |
| `$ret` | **`mixed`** |  |
| `$parent_cmd` | **`mixed`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::setAttribute" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> setAttribute ( )   
-----



```php
public function setAttribute( mixed $name, mixed $value ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$name` | **`mixed`** |  |
| `$value` | **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::text" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> text ( )   
-----



```php
public function text( mixed $trim = true ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$trim` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-HtmlNode::xmltext" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> xmltext ( )   
-----



```php
public function xmltext(  ) : void
```



| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\simplehtmldom\HtmlNode</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\simplehtmldom\HtmlNode</span> Properties
  
:::tip <a id="simplehtmldom-HtmlNode::$nodetype" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $nodetype   
-----




```php
public $nodetype = self::HDOM_TYPE_TEXT;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$tag" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $tag   
-----




```php
public $tag = 'text';
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$attr" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $attr   
-----




```php
public $attr = array();
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$children" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $children   
-----




```php
public $children = array();
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$nodes" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $nodes   
-----




```php
public $nodes = array();
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$parent" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $parent   
-----




```php
public $parent = null;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$_" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $_   
-----




```php
public $_ = array();
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$innertext" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $innertext   
-----




```php
public $innertext;
```

***Types:***
- `string`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$title" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $title   
-----




```php
public $title;
```

***Types:***
- `string`
-`null`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$alt" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $alt   
-----




```php
public $alt;
```

***Types:***
- `string`
-`null`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$src" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $src   
-----




```php
public $src;
```

***Types:***
- `string`
-`null`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$href" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $href   
-----




```php
public $href;
```

***Types:***
- `string`
-`null`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$async" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $async   
-----




```php
public $async;
```

***Types:***
- `string`
-`null`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-HtmlNode::$defer" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $defer   
-----




```php
public $defer;
```

***Types:***
- `string`
-`null`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\simplehtmldom\HtmlNode</span> Inherited properties
> This class has not inherited properties.
        
##  `simplehtmldom\HtmlWeb`    








|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\simplehtmldom\HtmlWeb</span> Constants
> This class has not constants.

### <span style="display: none;">\simplehtmldom\HtmlWeb</span> Methods
  
:::tip <a id="simplehtmldom-HtmlWeb::load" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> load ( )   
-----



```php
public function load( mixed $url ) : \simplehtmldom\HtmlDocument
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$url` | **`mixed`** |  |


| | |
|:--------:| ----------- |



***Returns:***

Returns the DOM for a webpage


:::


#### <span style="display: none;">\simplehtmldom\HtmlWeb</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\simplehtmldom\HtmlWeb</span> Properties
> This class has not properties.

#### <span style="display: none;">\simplehtmldom\HtmlWeb</span> Inherited properties
> This class has not inherited properties.
        
##  `simplehtmldom\simple_html_dom`    

String to get html dom.






|     |     |
| ---:|:--- |
| **Extends** |_Nothing_|
| **Implements** |_Nothing_|
| **Uses** |_Nothing_|

| | |
|:--------:| ----------- |


### <span style="display: none;">\simplehtmldom\simple_html_dom</span> Constants
> This class has not constants.

### <span style="display: none;">\simplehtmldom\simple_html_dom</span> Methods
  
:::tip <a id="simplehtmldom-simple_html_dom::__construct" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> __construct ( )   
-----



```php
public function __construct(  ) : void
```



| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-simple_html_dom::file_get_html" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> file_get_html ( )   
-----



```php
public function file_get_html( mixed $url, mixed $use_include_path = false, mixed $context = null, mixed $offset = 0, mixed $maxLen = -1, mixed $lowercase = true, mixed $forceTagsClosed = true, mixed $target_charset = \simplehtmldom\DEFAULT_TARGET_CHARSET, mixed $stripRN = true, mixed $defaultBRText = \simplehtmldom\DEFAULT_BR_TEXT, mixed $defaultSpanText = \simplehtmldom\DEFAULT_SPAN_TEXT ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$url` | **`mixed`** |  |
| `$use_include_path` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$context` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$offset` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$maxLen` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$forceTagsClosed` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$target_charset` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$stripRN` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultBRText` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultSpanText` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::

  
:::tip <a id="simplehtmldom-simple_html_dom::str_get_html" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> str_get_html ( )   
-----



```php
public function str_get_html( mixed $str, mixed $lowercase = true, mixed $forceTagsClosed = true, mixed $target_charset = DEFAULT_TARGET_CHARSET, mixed $stripRN = true, mixed $defaultBRText = DEFAULT_BR_TEXT, mixed $defaultSpanText = DEFAULT_SPAN_TEXT ) : void
```

| Parameter | Type(s) | Description |
|-----------|------|-------------|
| `$str` | **`mixed`** |  |
| `$lowercase` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$forceTagsClosed` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$target_charset` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$stripRN` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultBRText` <Badge text="optional" type="warn"/>| **`mixed`** |  |
| `$defaultSpanText` <Badge text="optional" type="warn"/>| **`mixed`** |  |


| | |
|:--------:| ----------- |




:::


#### <span style="display: none;">\simplehtmldom\simple_html_dom</span> Inherited methods
> This class has not inherited methods.

### <span style="display: none;">\simplehtmldom\simple_html_dom</span> Properties
  
:::tip <a id="simplehtmldom-simple_html_dom::$innertext" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $innertext   
-----




```php
public $innertext;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::

  
:::tip <a id="simplehtmldom-simple_html_dom::$outertext" style="display: block; position: relative; top: -5rem; visibility: hidden;"></a> $outertext   
-----




```php
public $outertext;
```

***Types:***
- `mixed`


| | |
|:--------:| ----------- |


:::


#### <span style="display: none;">\simplehtmldom\simple_html_dom</span> Inherited properties
> This class has not inherited properties.

--------

<div class="page-edit">
    <div class="last-updated">
        <span class="prefix">Auto-generated at: </span>
        <span class="time">2021-05-21, 12:42 AM</span>
    </div>
</div>


<style src="./.assets/normalization.css" scoped/>
