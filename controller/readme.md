# this is automatic form controller

- override header metadata
- override before header sent
- CRUD cookie
- AJAX receiver

<p>
All inside this folder is receiver based on url path
</p>

## Some tutorial

- return json for api rest
```php
header("Content-Type: application/json")
$json = json_encode(['hello'=>'world']);
echo $json;
exit;
```