<?php

use Filemanager\file;
use MVC\helper;

if (isset($meta_config)) {
  $c_meta = file::get($meta_config, true);
  if (!isset($c_meta['meta_config'])) {
    $c_meta['meta_config'] = $meta_config;
  } elseif (is_null($c_meta['meta_config'])) {
    $c_meta['meta_config'] = $meta_config;
  }
  if (!file_exists($c_meta['content'])) {
    $c_meta['content'] = $content;
  }
}

// @todo Metadata receiver
if (isset($_POST['meta-save']) && helper::is_header('Save-Metadata')) {
  unset($_POST['meta-save']);
  if (isset($_POST['meta-config'])) {
    $config_meta = $_POST['meta-config'];
    unset($_POST['meta-config']);
    if ($config_meta = realpath($config_meta)) {
      foreach ($_POST as $key => $value) {
        if ('true' == $value) {
          $_POST[$key] = true;
        } elseif ('false' == $value) {
          $_POST[$key] = false;
        } elseif (is_numeric($value)) {
          settype($_POST[$key], 'integer');
        } elseif (is_string($value)) {
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
        $this->meta = array_replace($this->meta, $meta_data);
        \Filemanager\file::file($config_meta, $meta_data, true);
        if (!\MVC\helper::cors()) {
          safe_redirect(\MVC\helper::geturl());
        } else {
          // @todo remove all output buffers
          if (ob_get_level()) {
            ob_end_clean();
          }
          // return json
          exit(\JSON\json::json(['message' => 'Meta Saved', 'title' => 'Meta Changer', 'reload' => true]));
        }
      }
    }
  }
}

?>

<div class="card m-4 ">
    <div class="card-body">
        <h5 class="card-title text-center">Meta Editor</h5>
        <div class="md-form">
            <form action="" method="post" class="" id="meta-admin-toolbox-<?php echo uniqid(); ?>">
                <input type="hidden" name="meta-config" value="<?php echo $meta_config; ?>">
                <input type="hidden" name="meta-save" value="<?php echo random_int(1, 20); ?>">
                <?php
                foreach ($c_meta as $key => $value) {
                  $typeMeta = 'text';
                  $attributes = [];
                  if (in_array($key, ['published', 'modified'])) {
                    $typeMeta = 'datetime-local';
                    $value = date("Y-m-d\TH:i:s", strtotime($value));
                    $attributes[] = 'step="1"';
                  }
                  if (in_array($key, ['meta_config', 'content'])) {
                    $attributes[] = 'readonly';
                  }

                  $inputhtml = '<input no-save="true" type="' . $typeMeta . '" id="meta-' . $key . '" name="' . $key . '" value="' . $value . '" class="form-control" ' . implode(' ', $attributes) . '>
          <label for="meta-' . $key . '">' . $key . ' (' . gettype($value) . ')</label>';
                  if ('thumbnail' == $key) {
                    $inputhtml = '<textarea cols="30" rows="10" id="meta-' . $key . '" name="' . $key . '" value="' . $value . '" class="form-control md-textarea" no-save="true">' . $value . '</textarea>
            <label for="meta-' . $key . '">' . $key . ' (' . gettype($value) . ')</label>
            <div style="position: relative;"><img id="thumb-preview" src="' . $value . '" alt="preview" width="100%" height="180px" /><div class="card-label">preview</div></div>';
                  } elseif ('desc' == $key) {
                    $inputhtml = '<textarea no-save="true" cols="30" rows="10" id="meta-' . $key . '" name="' . $key . '" value="' . $value . '" class="form-control md-textarea">' . $value . '</textarea>
            <label for="meta-' . $key . '">' . $key . ' (' . gettype($value) . ')</label>';
                  } elseif (in_array($key, ['theme', 'share', 'comments', 'cache', 'obfuscate'])) {
                    if ('boolean' != gettype($value)) {
                      $value = false;
                    }
                    echo '
            <select no-save="true" name="' . $key . '" class="mdb-select md-form colorful-select dropdown-primary" id="meta-' . $key . '">
              <option value="" disabled>Choose your option</option>
              <option value="true" ' . (true === $value ? 'selected' : '') . '>True</option>
              <option value="false" ' . (false === $value ? 'selected' : '') . '>False</option>
            </select>
            <label class="mdb-main-label">' . $key . ' (' . gettype($value) . ')</label>
            ';
                    continue;
                  }
                  echo '
          <div class="md-form">
            ' . $inputhtml . '
          </div>';
                }
                //echo "<pre>" . json::json($_SESSION, false) . "</pre>";
                ?>
                <div class="form-group mb-2">
                    <button type="submit" class="btn btn-primary">Save meta</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script async="true">
    let script = document.createElement('script');
    script.src = "<?php echo path2url(__DIR__ . '/admin.min.js'); ?>";
    script.async = false;
    document.body.append(script); // (*)
</script>