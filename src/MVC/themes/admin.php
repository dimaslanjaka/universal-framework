<?php
$user = new \User\user();
if (!$user->is_admin()) {
  return;
}
if (isset($_POST['meta-save'])) {
  unset($_POST['meta-save']);
  if (isset($_POST['meta-config'])) {
    $config_meta = $_POST['meta-config'];
    unset($_POST['meta-config']);
    if ($config_meta = realpath($config_meta)) {
      foreach ($_POST as $key => $value) {
        if ($value == 'true') {
          $_POST[$key] = true;
        } else if ($value == 'false') {
          $_POST[$key] = false;
        } else if (is_numeric($value)) {
          settype($_POST[$key], 'integer');
        } else if (is_string($value)) {
          $_POST[$key] = trim($value);
        }
      }
      $meta_data = $_POST;
      //robot tag header
      if (!isset($meta_data['robot'])) {
        $meta_data['robot'] = 'noindex, nofollow';
      }
      //allow comments
      if (!isset($meta_data['comments'])) {
        $meta_data['comments'] = false;
      }
      //cache page
      if (!isset($meta_data['cache'])) {
        $meta_data['cache'] = false;
      }
      // obfuscate javascript
      if (!isset($meta_data['obfuscate'])) {
        $meta_data['obfuscate'] = true;
      }
      if (file_exists($config_meta)) {
        \Filemanager\file::file($config_meta, $meta_data, true);
        if (!\MVC\helper::cors()) {
          safe_redirect(\MVC\helper::geturl());
        } else {
          ob_get_clean();
          e(['message' => 'Meta Saved', 'title' => 'Meta Changer', 'reload' => true]);
        }
      }
    }
  }
}
?>
<div class="fixed-action-btn smooth-scroll" style="bottom: 5px; right: 5px;">
  <a href="#meta-editor" class="btn-floating btn-large red" data-toggle="modal" data-target="#MetaEditorModal">
    <i class="fas fa-cog"></i>
  </a>
</div>

<div class="modal fade" id="MetaEditorModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="MetaEditorLabel">Meta Editor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form action="" method="post">
        <div class="modal-body">
          <input type="hidden" name="meta-save">
          <input type="hidden" name="meta-config" value="<?= $this->config; ?>">
          <?php
          $c_meta = \Filemanager\file::get($this->config, true);
          ksort($c_meta);
          foreach ($c_meta as $key => $value) {
            $typeMeta = 'text';
            $readonly = '';
            $attributes = '';
            if (in_array($key, ['published', 'modified'])) {
              $typeMeta = 'datetime-local';
              $value = date("Y-m-d\TH:i:s", strtotime($value));
              $attributes = 'step="1"';
            }
            if (in_array($key, ['content'])) {
              $readonly = 'readonly';
            }

            $inputhtml = '<input type="' . $typeMeta . '" id="meta-' . $key . '" name="' . $key . '" value="' . $value . '" class="form-control" ' . $attributes . ' ' . $readonly . '>
            <label for="meta-' . $key . '">' . $key . ' (' . gettype($value) . ')</label>';
            if ('thumbnail' == $key) {
              $inputhtml = '<textarea cols="30" rows="10" id="meta-' . $key . '" name="' . $key . '" value="' . $value . '" class="form-control md-textarea" onchange="preview_thumb(this);">' . $value . '</textarea>
              <label for="meta-' . $key . '">' . $key . ' (' . gettype($value) . ')</label>
              <div style="position: relative;"><img id="thumb-preview" src="' . $value . '" alt="preview" width="100%" height="180px" /><div class="card-label">preview</div></div>';
            } elseif ('desc' == $key) {
              $inputhtml = '<textarea cols="30" rows="10" id="meta-' . $key . '" name="' . $key . '" value="' . $value . '" class="form-control md-textarea" onchange="preview_thumb(this);">' . $value . '</textarea>
              <label for="meta-' . $key . '">' . $key . ' (' . gettype($value) . ')</label>';
            } elseif (in_array($key, ['theme', 'share', 'comments', 'cache', 'obfuscate'])) {
              if ('boolean' != gettype($value)) {
                $value = false;
              }
              echo '
              <select name="' . $key . '" class="mdb-select md-form colorful-select dropdown-primary" id="meta-' . $key . '">
                <option value="" disabled>Choose your option</option>
                <option value="true" ' . (true === $value ? 'selected' : '') . '>True</option>
                <option value="false" ' . (false === $value ? 'selected' : '') . '>False</option>
              </select>
              <label class="mdb-main-label">' . $key . ' (' . gettype($value) . ')</label>';
              continue;
            }
            echo '
            <div class="md-form">
              ' . $inputhtml . '
            </div>';
          }
          ?>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</div>
<script src="<?= \MVC\helper::get_url_path(__DIR__ . '/admin.min.js', true); ?>">
</script>