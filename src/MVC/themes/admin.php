<?php
$user = new \User\user();
if (!$user->is_admin() || !isset($Config)) {
  return;
}
echo fab(['icon' => 'fa-user-shield', 'href' => '/superuser/', 'attributes' => 'title="Open Superuser Panel" data-toggle="tooltip" newtab'], ['href' => '#meta-editor', 'icon' => 'fa-cog', 'attributes' => 'data-toggle="tooltip" data-trigger="modal" title="Open Metadata Editor" data-target="#MetaEditorModal"']);
?>
<div class="modal fade" id="MetaEditorModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="MetaEditorLabel">Meta Editor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form action="" method="post" id="adminToolbox">
        <div class="modal-body">
          <input type="hidden" name="meta-save">
          <input type="hidden" name="meta-config" value="<?= $Config; ?>">
          <?php
          $c_meta = \Filemanager\file::get($Config, true);
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
<script async="true">
  <?= read_file(__DIR__ . '/admin.min.js') ?>
</script>