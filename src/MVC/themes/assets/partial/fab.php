<?php

$GLOBALS['fab-creator'] = '';

/**
 * Floating action bar creator
 * ```php
 * echo fab(['href' => '#', 'icon' => 'fa-question', 'attributes' => 'title="#href" rel="nofollow"'], ['href' => '#user', 'icon' => 'fa-user', 'attributes' => 'title="#user" rel="nofollow"']);
 * ```
 * @param array $c1 max 4 options
 */
function fab(...$c1)
{
    $return = '';
    $id_wrapper = uniqid('fab-wrapper-');
    $id_checkbox = uniqid('fab-checkbox-');
    if (empty($GLOBALS['fab-creator'])) {
        $css = read_file(ROOT . '/src/MVC/themes/assets/partial/fab.min.css');
        $return .= '<style>' . $css . '</style>';
        $js = read_file(ROOT . '/src/MVC/themes/assets/partial/fab.min.js');
        $return .= "<script>const id_fab = '$id_wrapper'; const id_fab_checkbox = '$id_checkbox';" . $js . '</script>';
        $GLOBALS['fab-creator'] = 'true';
    }
    $return .= '
<div class="fab-wrapper" id="' . $id_wrapper . '">
    <input id="' . $id_checkbox . '" name="' . $id_checkbox . '" type="checkbox" class="fab-checkbox" />
    <label class="fab-label" for="' . $id_checkbox . '">
        <span class="fab-dots fab-dots-1"></span>
        <span class="fab-dots fab-dots-2"></span>
        <span class="fab-dots fab-dots-3"></span>
    </label>
    <div class="fab-wheel"> ';
    for ($i = 0; $i < count($c1); $i++) {
        $id = "fAb$i";
        if (!isset($c1[$i]['href'])) {
            $c1[$i]['href'] = "#$id";
        }
        if (!isset($c1[$i]['attributes'])) {
            $c1[$i]['attributes'] = "";
        }
        if (!isset($c1[$i]['icon'])) {
            $c1[$i]['icon'] = "fa-question";
        }
        $return .= '
        <a id="' . $id . '" class="fab-action fab-action-1" href="' . $c1[$i]['href'] . '" ' . trim($c1[$i]['attributes']) . '>
            <i class="fas ' . $c1[$i]['icon'] . '"></i>
        </a>';
    }
    $return .= '
    </div>
</div>';
    return $return;
}
