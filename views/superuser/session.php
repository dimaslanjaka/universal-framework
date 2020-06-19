<?php

use JSON\json;

user()->admin_required();

?>

<textarea name="" id="editor" cols="30" rows="10" class="d-none"><?= json_encode($_SESSION) ?></textarea>
<pre><?= \JSON\json::beautify($_SESSION) ?></pre>