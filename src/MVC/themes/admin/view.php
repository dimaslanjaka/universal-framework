<?php

use Filemanager\file;
use Filemanager\scan;
use HTML\element;
use MVC\helper;

$scan = scan::scandir($theme->config_folder);
?>
<div class="w3-center w3-padding">
  <div class="w3-margin-bottom"><input type="text" autocomplete="true" placeholder="filter"></div>
  <script>
    var autocompleteTags = [];

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
  </script>
</div>
<div class="w3-row-padding w3-grayscale" id="filter-result">

  <?php
  foreach ($scan as $file) {
    if ($path = realpath($file['path'])) {
      $config = json_decode(file::get($path), true);

      $keys = array_keys((array) $config);
      $values = array_values((array) $config);
      //pre($file);
      if (!isset($file['path']) || 'theme-admin' == basename($file['path'], '.json') || !isset($config['content'])) {
        continue;
      }
      // check if view content exists
      $contentFile = helper::platformSlashes(ROOT) . $config['content'];
      if (!file_exists($contentFile)) {
        // if view content not exist, delete it
        unlink($file['path']);
        continue;
      } ?>
      <script>
        autocompleteTags.push('<?php echo str_replace(DIRECTORY_SEPARATOR, '/', $path); ?>');
        var unique = autocompleteTags.filter(onlyUnique);
        localStorage.setItem('autocomplete', JSON.stringify(unique));
      </script>
      <div class="w3-col l6 m6 w3-margin-bottom" style="word-wrap: break-word" autocomplete-result="<?php echo str_replace(DIRECTORY_SEPARATOR, '/', $path); ?>">
        <h3><?= $file['path']; ?></h3>
        <form method="post" action="<?= helper::geturl(); ?>" id="<?= md5(serialize($config)); ?>" class="loop">
          <?php
  $dom = new element();
      echo $dom->create('input', [
        'value' => $path,
        'name' => 'config',
        'type' => 'hidden',
      ])->outerText();
      for ($i = 0; $i < count($keys); ++$i) {
        //$dom = new element();
        $name = $keys[$i];
        $val = $values[$i];
        $id = "$name-$i";
        $field = 'input';
        $field_attr = [
          'id' => uniqid($id),
          'name' => $name,
          'value' => $val,
          'type' => 'text',
        ];
        if (is_bool($val)) {
          $field = 'select';
          unset($field_attr['type'], $field_attr['value']);

          $field_attr['option'] = [];
          if ($val) {
            $field_attr['option'][] = [
              'value' => '1',
              'inner' => 'true',
              'selected' => true,
            ];
            $field_attr['option'][] = [
              'value' => '0',
              'inner' => 'false',
            ];
          } else {
            $field_attr['option'][] = [
              'value' => '1',
              'inner' => 'true',
            ];
            $field_attr['option'][] = [
              'value' => '0',
              'inner' => 'false',
              'selected' => true,
            ];
          }
        }

        // label
        echo $dom->create('label', strtoupper($name), [
          'for' => $id,
        ])->outerText();
        // form field
        echo $dom->create($field, '', $field_attr)->outerText();
      } ?>
          <input type="submit" value="Submit">
        </form>
      </div>
  <?php
    }
  }
  ?>

</div>