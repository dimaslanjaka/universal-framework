<?php
require_once __DIR__ . '/url.php';
?>
<form action="/im3/api" method="post" id="api">
  <div class="md-form">
    <select name="url" id="select-url" class="form-control" onchange="display_url(this);" required>
      <option value="" readonly>Select URL</option>
      <?php
      foreach (getProperties() as $key => $value) {
        echo "<option value='$value'>$key</option>";
      }
      ?>
    </select>
    <small id="" class="form-text text-muted mb-4">
      <i id="display-url">protocol://host/path</i>
    </small>
  </div>

  <div class="md-form">
    <textarea name="headers" id="header" cols="30" rows="10" class="form-control"></textarea>
    <label for="header">Header</label>
    <small class="form-text text-muted">
      Default Headers : <br>
      <?php
      if (!isset($m3)) {
        $m3 = new \Indosat\api();
        pre($m3->default_header());
      }
      ?>
    </small>
  </div>

  <div class="md-form">
    <textarea name="postbody" id="pbody" class="form-control"></textarea>
    <label for="pbody">Postdata or query url in JSON format</label>
    <small class="form-text text-muted">
      example: {"search": "query", "param": "value"}<br>
      auto formatted result: <br>
      query (GET): search=query&amp;param=value <br>
      postdata (POST): automatically formatted based on <b>Content-Type</b> Headers
    </small>
  </div>

  <div class="md-form">
    <!-- Material inline 1 -->
    <div class="form-check form-check-inline">
      <input type="radio" class="form-check-input" id="Post-method" name="method" required>
      <label class="form-check-label" for="Post-method">POST</label>
    </div>

    <!-- Material inline 2 -->
    <div class="form-check form-check-inline">
      <input type="radio" class="form-check-input" id="Get-method" name="method" required>
      <label class="form-check-label" for="Get-method">GET</label>
    </div>
  </div>

  <div class="md-form">
    <button class="btn btn-block btn-sm">Simulate</button>
  </div>
</form>