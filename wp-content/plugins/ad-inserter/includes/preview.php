<?php

//ini_set ('display_errors', 1);
//error_reporting (E_ALL);

function alt_styles_data ($alt_styles_text) {
  if (strpos ($alt_styles_text, "||") !== false) {
    $styles = explode ("||", $alt_styles_text);
    $alt_styles = array ();
    foreach ($styles as $index => $style) {
      $alt_styles ['css' . ($index + 1)] = str_replace ("'", '"', str_replace (array ("\"", "<", ">", "[", "]"), "", trim ($style)));
    }
    echo "data-alt-style='1' data-alt-styles='", json_encode ($alt_styles), "'";
  }
}

function padding_margin_code ($close_button, $class, $sticky_parameters, $wrapper_css, $block_code) {
?>
    <div id='padding-background'></div>
    <div id='margin-background'></div>
    <div id='padding-background-white'></div>
    <div id='wrapper'<?php echo $class; ?> style='<?php echo $wrapper_css;
    ?>'<?php echo $sticky_parameters; ?>>
<?php echo $block_code; ?>
    </div>
    <!--    IE bug: use inline CSS: position: absolute;-->
    <div id='code-background-white' class= "code-background-white" style="position: absolute;"></div>
    <div id='code-overlay' class="code-overlay" style="position: absolute;"></div>
    <div id='ad-info-overlay'></div>

<?php
}


function check_count_rotate_code ($obj, $check, $count, $rotate, $viewport) {

  if ($obj->check_names !== null) : ?>
    <div style="display: inline-block; margin: 10px 0;">
      <div style="display: inline-block; vertical-align: middle;">
        CHECK
      </div>
    <select id="check" style="min-width: 50px; margin: 0 10px 0 5px;">
<?php
    foreach ($obj->check_names as $index => $check_name) {
      echo '<option value="', $index, '" ', $check == $index ? AD_SELECT_SELECTED : AD_EMPTY_VALUE, '>', $check_name, '</option>';
    }
?>
    </select>
    </div>
<?php
  endif;

  if ($obj->count_names !== null) : ?>
    <div style="display: inline-block; margin: 10px 0;">
      <div style="display: inline-block; vertical-align: middle;">
        COUNT
      </div>
    <select id="count" style="min-width: 50px; margin: 0 10px 0 5px;">
<?php
    foreach ($obj->count_names as $index => $count_name) {
      echo '<option value="', $index, '" ', $count == $index ? AD_SELECT_SELECTED : AD_EMPTY_VALUE, '>', $count_name, '</option>';
    }
?>
    </select>
    </div>
<?php
  endif;

  if ($obj->roate_names !== null) : ?>
    <div style="display: inline-block; margin: 10px 0;">
      <div style="display: inline-block; vertical-align: middle;">
        ROTATE
      </div>
    <select id="rotate" style="min-width: 50px; margin: 0 10px 0 5px;">
<?php
    foreach ($obj->roate_names as $index => $roate_name) {
      echo '<option value="', $index, '" ', $rotate == $index ? AD_SELECT_SELECTED : AD_EMPTY_VALUE, '>', $roate_name, '</option>';
    }
?>
    </select>
    </div>
<?php
  endif;

  if ($obj->viewport_names !== null) : ?>
    <div style="display: inline-block; margin: 10px 0;">
      <div style="display: inline-block; vertical-align: middle;">
        VIEWPORT
      </div>
    <select id="viewport" style="min-width: 50px; margin: 0 10px 0 5px;">
<?php
    foreach ($obj->viewport_names as $index => $viewport_name) {
      echo '<option value="', $index, '" ', $viewport == $index ? AD_SELECT_SELECTED : AD_EMPTY_VALUE, '>', $viewport_name, '</option>';
    }
?>
    </select>
    </div>
<?php
  endif;
}


function generate_code_preview (
  $block,
  $preview_parameters) {

  global $block_object, $ai_wp_data, $wp_version;

  $ai_wp_data [AI_WP_DEBUGGING] = 0;

  $obj = new ai_Block ($block);
  $obj->wp_options = $block_object [$block]->wp_options;

  $block_name           = isset ($preview_parameters ['name'])              ? $preview_parameters ['name']              : $obj->get_ad_name();
  $code                 = isset ($preview_parameters ['code'])              ? $preview_parameters ['code']              : $obj->get_ad_data();
  $alignment_type       = isset ($preview_parameters ['alignment'])         ? $preview_parameters ['alignment']         : $obj->get_alignment_type();
  $horizontal_position  = isset ($preview_parameters ['horizontal'])        ? $preview_parameters ['horizontal']        : $obj->get_horizontal_position();
  $vertical_position    = isset ($preview_parameters ['vertical'])          ? $preview_parameters ['vertical']          : $obj->get_vertical_position();
  $horizontal_margin    = isset ($preview_parameters ['horizontal_margin']) ? $preview_parameters ['horizontal_margin'] : $obj->get_horizontal_margin();
  $vertical_margin      = isset ($preview_parameters ['vertical_margin'])   ? $preview_parameters ['vertical_margin']   : $obj->get_vertical_margin();
  $animation            = isset ($preview_parameters ['animation'])         ? $preview_parameters ['animation']         : $obj->get_animation();
  $wrapper_css          = isset ($preview_parameters ['alignment_css'])     ? $preview_parameters ['alignment_css']     : $obj->get_alignment_style ();
  $custom_css_code      = isset ($preview_parameters ['custom_css'])        ? $preview_parameters ['custom_css']        : $obj->get_custom_css();
  $close_button         = isset ($preview_parameters ['close'])             ? $preview_parameters ['close']             : $obj->get_close_button ();
  $process_php          = isset ($preview_parameters ['php'])               ? $preview_parameters ['php']               : $obj->get_process_php ();
  $show_label           = isset ($preview_parameters ['label'])             ? $preview_parameters ['label']             : $obj->get_show_label ();
  $read_only            = isset ($preview_parameters ['read_only'])         ? $preview_parameters ['read_only']         : 0;
  $iframe               = isset ($preview_parameters ['iframe'])            ? $preview_parameters ['iframe']            : 0;
  $check                = isset ($preview_parameters ['check'])             ? $preview_parameters ['check']             : 0;
  $count                = isset ($preview_parameters ['count'])             ? $preview_parameters ['count']             : 0;
  $rotate               = isset ($preview_parameters ['rotate'])            ? $preview_parameters ['rotate']            : 0;
  $viewport             = isset ($preview_parameters ['viewport'])          ? $preview_parameters ['viewport']          : 0;

  $separators = isset ($preview_parameters ['check']) || isset ($preview_parameters ['count']) || isset ($preview_parameters ['rotate']) || isset ($preview_parameters ['viewport']);

  $obj->wp_options [AI_OPTION_BLOCK_NAME]           = $block_name;
  $obj->wp_options [AI_OPTION_CODE]                 = $code;
  $obj->wp_options [AI_OPTION_ALIGNMENT_TYPE]       = $alignment_type;
  $obj->wp_options [AI_OPTION_HORIZONTAL_POSITION]  = $horizontal_position;
  $obj->wp_options [AI_OPTION_VERTICAL_POSITION]    = $vertical_position;
  $obj->wp_options [AI_OPTION_HORIZONTAL_MARGIN]    = $horizontal_margin;
  $obj->wp_options [AI_OPTION_VERTICAL_MARGIN]      = $vertical_margin;
  $obj->wp_options [AI_OPTION_ANIMATION]            = $animation;
  $obj->wp_options [AI_OPTION_CLOSE_BUTTON]         = $close_button;
  $obj->wp_options [AI_OPTION_PROCESS_PHP]          = $process_php;
  $obj->wp_options [AI_OPTION_SHOW_LABEL]           = $show_label;

  // Don't show iframe in preview unless requested
  if (!$iframe) $obj->wp_options [AI_OPTION_IFRAME] = false;

  $adsense = $block == 0;
  $sticky = false;
  $class = '';
  $sticky_parameters = '';
  $functions = function_exists ('ai_extract_features_2');
  $iframe_resize = $iframe && $obj->get_iframe_height () == '';

  if (!$adsense) {
    switch ($alignment_type) {
      case AI_ALIGNMENT_STICKY:
        $sticky = true;
        break;
      case AI_ALIGNMENT_CUSTOM_CSS:
        $custom_css = str_replace (' ', '', $custom_css_code);
        if (strpos ($custom_css, 'position:fixed') !== false && strpos ($custom_css, 'z-index:') !== false) $sticky = true;
        break;
    }

    $classes = array ();

    $sticky_parameters = $obj->sticky_parameters ($classes, true);

    // For non-sticky preview show close button only if enabled in block settings
    if ($sticky || $close_button != AI_CLOSE_NONE) {
      $classes [] = 'ai-close';
    }

    if ($sticky) {
      $classes [] = 'hide';
    }

    if (count ($classes) != 0) {
      $class = " class='" . trim (implode (' ', $classes)) . "'";
    }
  }

  // Head code must be called before ai_getProcessedCode (to process head PHP)
  ob_start ();
  ai_wp_head_hook ();

  if ($functions && !$ai_wp_data [AI_CLOSE_BUTTONS]) {
    echo "<style>\n";
    echo ".ai-close {position: relative;}\n";
    echo ".ai-close-button {position: absolute; top: -8px; right: -8px; width: 24px; height: 24px; background: url(".plugins_url ('css/images/close-button.png', AD_INSERTER_FILE).") no-repeat center center; cursor: pointer; z-index: 9; display: none;}\n";
    echo ".ai-close-show {display: block;}\n";
    echo ".ai-close-left {right: unset; left: -10px;}\n";
    echo ".ai-close-bottom {top: unset; bottom: -11px;}\n";
    echo ".ai-close-fit {width: fit-content; width: -moz-fit-content;}\n";
    echo "</style>\n";
  }
  $head_code = ob_get_clean ();

  // Disable AdSense Auto ads (page level ads)
  $head_code = str_replace ('enable_page_level_ads', 'disabled_page_level_ads', $head_code);

  $ai_wp_data [AI_FORCE_SERVERSIDE_CODE] = true;

  $obj->check_index  = $check;
  $obj->count_index  = $count;
  $obj->rotate_index = $rotate;
  $obj->viewport_index = $viewport;

  $obj->hide_debug_labels = true;
  $block_code = $obj->ai_getProcessedCode (true);
  $obj->hide_debug_labels = false;
  $ai_wp_data [AI_FORCE_SERVERSIDE_CODE] = false;

  $head_code = ai_process_head_codes ($head_code);

  // Fix for relative urls
  $block_code = str_replace ('src="wp-content', 'src="../wp-content', $block_code);
  $block_code = str_replace ("src='wp-content", "src='../wp-content", $block_code);
  $block_code = str_replace ('href="wp-content', 'href="../wp-content', $block_code);
  $block_code = str_replace ("href='wp-content", "href='../wp-content", $block_code);

?><html>
<head>
<title><?php echo AD_INSERTER_NAME; ?> <?php if ($sticky) _e ('Sticky Code Preview', 'ad-inserter'); else _e ('Code Preview', 'ad-inserter'); ?></title>
<meta name="viewport" content="width=device-width,initial-scale=1.0">

<script type='text/javascript' src='<?php echo includes_url ('js/jquery/jquery.js'); ?>?ver=<?php echo $wp_version, '+', AD_INSERTER_VERSION; ?>'></script>
<script type='text/javascript' src='<?php echo admin_url ('load-scripts.php?c=0&amp;load%5B%5D=jquery-core,jquery-migrate,utils,jquery-ui-core&amp;ver='); ?><?php echo $wp_version, '+', AD_INSERTER_VERSION; ?>'></script>
<script type='text/javascript' src='<?php echo includes_url ('js/jquery/ui/effect.min.js'); ?>?ver=<?php echo $wp_version, '+', AD_INSERTER_VERSION; ?>'></script>
<script type='text/javascript' src='<?php echo includes_url ('js/jquery/ui/widget.min.js'); ?>?ver=<?php echo $wp_version, '+', AD_INSERTER_VERSION; ?>'></script>
<script type='text/javascript' src='<?php echo includes_url ('js/jquery/ui/button.min.js'); ?>?ver=<?php echo $wp_version, '+', AD_INSERTER_VERSION; ?>'></script>
<script type='text/javascript' src='<?php echo includes_url ('js/jquery/ui/spinner.min.js'); ?>?ver=<?php echo $wp_version, '+', AD_INSERTER_VERSION; ?>'></script>
<link rel='stylesheet' href='<?php echo plugins_url ('css/jquery-ui-1.10.3.custom.min.css', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION; ?>' media='all' />

<script src='<?php echo plugins_url ('includes/js/jquery.mousewheel.min.js', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION; ?>'></script>
<script src='<?php echo plugins_url ('includes/js/jquery.ui.spinner.js', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION; ?>'></script>
<link rel='stylesheet' href='<?php echo plugins_url ('css/jquery.ui.spinner.css', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION; ?>'>
<link rel='stylesheet' href='<?php echo plugins_url ('css/image-picker.css', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION; ?>'>
<script src='<?php echo plugins_url ('includes/js/image-picker.js', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION; ?>'></script>
<?php if ($functions) : ?>
<link rel='stylesheet' href='<?php echo plugins_url ('includes/aos/ai-aos.css', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION.rand (1, 10000000); ?>'>
<script src='<?php echo plugins_url ('includes/aos/aos.js', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION; ?>'></script>
<?php endif; ?>
<script src='<?php echo plugins_url ('includes/js/ad-inserter-check.js', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION; ?>'></script>
<link rel='stylesheet' href='<?php echo plugins_url ('css/ai-settings.css', AD_INSERTER_FILE); ?>?ver=<?php echo AD_INSERTER_VERSION; ?>'>
<script>

  ajaxurl = "<?php echo admin_url ('admin-ajax.php'); ?>";
  var ai_preview = true;
  <?php echo get_frontend_javascript_debugging () ? 'ai_debugging = true;' : ''; ?>
  var sticky = <?php echo $sticky ? 'true' : 'false'; ?>;
  var remove_transform = <?php echo $sticky && $sticky_parameters != '' ? 'true' : 'false'; ?>;

  if (sticky) window.moveTo (0, 0);
  if (sticky) window.resizeTo (screen.width, screen.height - 40);

  const main_content_fixed_width = <?php echo is_numeric (get_main_content_element ()) ? "true" : "false"; ?>;
  const main_content_shift = <?php echo is_numeric (get_main_content_element ()) ? (int) (get_main_content_element () / 2) : 0; ?>;

  window.onkeydown = function( event ) {
    if (event.keyCode === 27 ) {
      window.close();
    }
  }

  function update_wrapper_size () {
    var wrapper = jQuery('#wrapper');
    if (typeof wrapper.width () != 'undefined' && typeof wrapper.height () != 'undefined') {
      var width  = parseInt (wrapper.width ());
      var height = parseInt (wrapper.height ());
      jQuery(".wrapper-size").html (width + "px &nbsp;&times;&nbsp;  " + height + "px").show ();
      if (width * height != 0) jQuery(".wrapper-size").css ("color", "#333"); else jQuery(".wrapper-size").css ("color", "#c00");
    }
  }

  function initialize_preview () {

    (function($) {

    var debug = typeof ai_debugging !== 'undefined';
    var block = <?php echo $block; ?>;
    var code_blocks;
    var spinning = false;

    var wrapper = $('#wrapper');
    var wrapping = wrapper.attr ("style") != "";

    var spinner_margin_top;
    var spinner_margin_bottom;
    var spinner_margin_left;
    var spinner_margin_right;
    var spinner_padding_top;
    var spinner_padding_bottom;
    var spinner_padding_left;
    var spinner_padding_right;

    var spinner_horizontal_margin;
    var spinner_vertical_margin;

    var AI_ALIGNMENT_DEFAULT        = 0;
    var AI_ALIGNMENT_LEFT           = 1;
    var AI_ALIGNMENT_RIGHT          = 2;
    var AI_ALIGNMENT_CENTER         = 3;
    var AI_ALIGNMENT_FLOAT_LEFT     = 4;
    var AI_ALIGNMENT_FLOAT_RIGHT    = 5;
    var AI_ALIGNMENT_NO_WRAPPING    = 6;
    var AI_ALIGNMENT_CUSTOM_CSS     = 7;
    var AI_ALIGNMENT_STICKY_LEFT    = 8;
    var AI_ALIGNMENT_STICKY_RIGHT   = 9;
    var AI_ALIGNMENT_STICKY_TOP     = 10;
    var AI_ALIGNMENT_STICKY_BOTTOM  = 11;
    var AI_ALIGNMENT_STICKY         = 12;

    var AI_CLOSE_NONE           = 0;
    var AI_CLOSE_TOP_RIGHT      = 1;
    var AI_CLOSE_TOP_LEFT       = 2;
    var AI_CLOSE_BOTTOM_RIGHT   = 3;
    var AI_CLOSE_BOTTOM_LEFT    = 4;

    var AI_STICK_TO_THE_LEFT          = 0;
    var AI_STICK_TO_THE_CONTENT_LEFT  = 1;
    var AI_STICK_HORIZONTAL_CENTER    = 2;
    var AI_STICK_TO_THE_CONTENT_RIGHT = 3;
    var AI_STICK_TO_THE_RIGHT         = 4;

    var AI_STICK_TO_THE_TOP         = 0;
    var AI_STICK_VERTICAL_CENTER    = 1;
    var AI_SCROLL_WITH_THE_CONTENT  = 2;
    var AI_STICK_TO_THE_BOTTOM      = 3;

    var AI_ANIMATION_NONE           = 0;
    var AI_ANIMATION_FADE           = 1;
    var AI_ANIMATION_SLIDE          = 2;
    var AI_ANIMATION_SLIDE_FADE     = 3;
    var AI_ANIMATION_FLIP           = 4;
    var AI_ANIMATION_ZOOM_IN        = 5;
    var AI_ANIMATION_ZOOM_OUT       = 6;
    var AI_ANIMATION_TURN           = 7;

    var STICKY_CONTEXT_NONE                 = 0;
    var STICKY_CONTEXT_INIT                 = 1;
    var STICKY_CONTEXT_BLOCK_ALIGNMENT      = 2;
    var STICKY_CONTEXT_HORIZONTAL_POSITION  = 3;
    var STICKY_CONTEXT_VERTICAL_POSITION    = 4;
    var STICKY_CONTEXT_SPINNER              = 5;
    var STICKY_CONTEXT_CUSTOM_CSS           = 6;
    var STICKY_CONTEXT_ANIMATION            = 7;

    var sticky_context = STICKY_CONTEXT_INIT;

    const ID_CSS_ALIGNMENT_DEFAULT        = "#css-" + AI_ALIGNMENT_DEFAULT;
    const ID_CSS_ALIGNMENT_LEFT           = "#css-" + AI_ALIGNMENT_LEFT;
    const ID_CSS_ALIGNMENT_RIGHT          = "#css-" + AI_ALIGNMENT_RIGHT;
    const ID_CSS_ALIGNMENT_CENTER         = "#css-" + AI_ALIGNMENT_CENTER;
    const ID_CSS_ALIGNMENT_FLOAT_LEFT     = "#css-" + AI_ALIGNMENT_FLOAT_LEFT;
    const ID_CSS_ALIGNMENT_FLOAT_RIGHT    = "#css-" + AI_ALIGNMENT_FLOAT_RIGHT;
    const ID_CSS_ALIGNMENT_STICKY_LEFT    = "#css-" + AI_ALIGNMENT_STICKY_LEFT;
    const ID_CSS_ALIGNMENT_STICKY_RIGHT   = "#css-" + AI_ALIGNMENT_STICKY_RIGHT;
    const ID_CSS_ALIGNMENT_STICKY_TOP     = "#css-" + AI_ALIGNMENT_STICKY_TOP;
    const ID_CSS_ALIGNMENT_STICKY_BOTTOM  = "#css-" + AI_ALIGNMENT_STICKY_BOTTOM;
    const ID_CSS_ALIGNMENT_STICKY         = "#css-" + AI_ALIGNMENT_STICKY;

    const AI_ALIGNMENT_CSS_STICKY = '<?php echo AI_ALIGNMENT_CSS_STICKY; ?>';

    function b64e (str) {
      // first we use encodeURIComponent to get percent-encoded UTF-8,
      // then we convert the percent encodings into raw bytes which
      // can be fed into btoa.
      return btoa (encodeURIComponent (str).replace (/%([0-9A-F]{2})/g,
        function toSolidBytes (match, p1) {
          return String.fromCharCode ('0x' + p1);
      }));
    }

    function b64d (str) {
      // Going backwards: from bytestream, to percent-encoding, to original string.
      return decodeURIComponent (atob (str).split ('').map (function(c) {
        return '%' + ('00' + c.charCodeAt (0).toString (16)).slice (-2);
      }).join (''));
    }

    function open_window_post (url, name, params) {
       var form = document.createElement("form");
       form.setAttribute("method", "post");
       form.setAttribute("action", url);
       form.setAttribute("target", name);
       for (var i in params) {
         if (params.hasOwnProperty(i)) {
           var input = document.createElement('input');
           input.type = 'hidden';
           input.name = i;
           input.value = encodeURI (params[i]);
           form.appendChild(input);
         }
       }
       document.body.appendChild(form);
       form.submit();
       document.body.removeChild(form);
    }

    function load_preview_block () {
      var alignment           = $("select#block-alignment option:selected").attr ('value');
      var alignment_css       = wrapper.attr ('style');
      var custom_css          = $("#custom-css").val ();
      var close_button        = $("select#close-button-0 option:selected").attr ('value');

      if (sticky) {
        var horizontal          = $("select#horizontal-position option:selected").attr('value');
        var vertical            = $("select#vertical-position option:selected").attr('value');
        var vertical_margin     = spinner_vertical_margin.spinner ("value");
        var horizontal_margin   = spinner_horizontal_margin.spinner ("value");
        var animation           = $("select#animation option:selected").attr ('value');
      } else {
          var horizontal          = 0;
          var vertical            = 0;
          var vertical_margin     = 0;
          var horizontal_margin   = 0;
          var animation           = 0;
        }

      var check   = $("select#check option:selected").attr('value');
      if (typeof check == 'undefined') check = 0; else check = parseInt (check);

      var count   = $("select#count option:selected").attr('value');
      if (typeof count == 'undefined') count = 0; else count = parseInt (count);

      var rotate  = $("select#rotate option:selected").attr('value');
      if (typeof rotate == 'undefined') rotate = 0; else rotate = parseInt (rotate);

      var viewport = $("select#viewport option:selected").attr('value');
      if (typeof viewport == 'undefined') viewport = 0; else viewport = parseInt (viewport);

      var param = {
        'action':             'ai_ajax_backend',
        'read_only':          <?php echo $read_only; ?>,
        'preview':            block,
        'ai_check':           b64d ('<?php echo base64_encode (wp_create_nonce ("adinserter_data")); ?>'),
        'name':               '<?php echo base64_encode ($block_name); ?>',
        'code':               '<?php echo base64_encode ($code); ?>',
        'alignment':          btoa (alignment),
        'horizontal':         btoa (horizontal),
        'vertical':           btoa (vertical),
        'horizontal_margin':  btoa (horizontal_margin),
        'vertical_margin':    btoa (vertical_margin),
        'animation':          btoa (animation),
        'alignment_css':      btoa (alignment_css),
        'custom_css':         btoa (custom_css),
        'php':                <?php echo $process_php ? '1' : '0'; ?>,
        'label':              <?php echo $show_label ? '1' : '0'; ?>,
        'close':              close_button,
        'iframe':             <?php echo $iframe ? '1' : '0'; ?>,
        'check':              check,
        'count':              count,
        'rotate':             rotate,
        'viewport':           viewport
      };

//      console.log (param);

      open_window_post (ajaxurl, 'preview', param);
    };

    function update_highlighting () {
      if ($('body').hasClass ("highlighted")) {
        $("#highlight-button").click ();
        $("#highlight-button").click ();
      }
    }

    function update_width () {
      $("#screen-width").text (window.innerWidth + " px");
      if (window.innerWidth != $(window).width()) $("#right-arrow").hide (); else $("#right-arrow").show ();
    }

//    function update_wrapper_size () {
//      if (typeof wrapper.width () != 'undefined' && typeof wrapper.height () != 'undefined') {
//        var width  = parseInt (wrapper.width ());
//        var height = parseInt (wrapper.height ());
//        $(".wrapper-size").html (width + "px &nbsp;&times;&nbsp;  " + height + "px").show ();
//        if (width * height != 0) $(".wrapper-size").css ("color", "#333"); else $(".wrapper-size").css ("color", "#c00");
//      }
//    }

    $(window).resize(function() {
      update_highlighting ();
      update_width ();
      update_wrapper_size ();
    });

    function load_from_settings () {

      if (window.opener != null && !window.opener.closed) {
        var settings = $(window.opener.document).contents();


//        // Replace document.write for old code that uses document.write
//        // Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.
//        var oldDocumentWrite = document.write;
//        document.write = function(node){
//          wrapper.append (node)
//        }

//        var simple_editor_switch = settings.find ('input#simple-editor-' + block);
//        if (!simple_editor_switch.is(":checked")) {
//          settings.find ('input#simple-editor-' + block).click ();
//          settings.find ('input#simple-editor-' + block).click ();
//        }
//        var code = settings.find ("#block-" + block).val();
//        wrapper.html (code);

//        // Restore document.write
//        setTimeout (function() {
//            document.write = oldDocumentWrite
//        }, 1000);

//        console.log (settings.find ("select#block-alignment-" + block + " option:selected").attr('value'));

        $("select#block-alignment").val (settings.find ("select#block-alignment-" + block + " option:selected").attr('value')).change();
        $("select#block-alignment option:selected").data ('alt-style', '1');
        $("#custom-css").val (settings.find ("#custom-css-" + block).val ());
        $("#block-name").text (settings.find ("#name-label-" + block).text ());
        $("select#close-button-0").val (settings.find ("select#close-button-" + block + " option:selected").attr('value')).change();

        if (sticky) {
          var alignment   = $("select#block-alignment option:selected").attr ('value');

          if (alignment == AI_ALIGNMENT_CUSTOM_CSS) {
            spinner_horizontal_margin.spinner ("value", extract_horizontal_margin ($("#custom-css").val ()));
            spinner_vertical_margin.spinner ("value", extract_vertical_margin ($("#custom-css").val ()));
          } else {
              spinner_horizontal_margin.spinner ("value", settings.find ("#horizontal-margin-" + block).val ());
              spinner_vertical_margin.spinner   ("value", settings.find ("#vertical-margin-" + block).val ());
            }
          $("select#horizontal-position").val (settings.find ("select#horizontal-position-" + block + " option:selected").attr('value')).change();
          $("select#vertical-position").val (settings.find ("select#vertical-position-" + block + " option:selected").attr('value')).change();
          $("select#animation").val (settings.find ("select#animation-" + block + " option:selected").attr('value')).change();
        }

        process_display_elements ();
      }
    }

    function apply_to_settings () {
      if (window.opener != null && !window.opener.closed) {
        var settings = $(window.opener.document).contents ();

        var selected_alignment  = $("select#block-alignment option:selected");
        var new_alignment       = selected_alignment.attr('value');
        var new_custom_css      = $("#custom-css").val ();
        var new_close_button    = $("select#close-button-0 option:selected").attr('value');

        var alt_styles          = selected_alignment.data ('alt-styles');
        if (typeof alt_styles != 'undefined') {
          css_index = selected_alignment.data ('alt-style')
          if (css_index != 1) {
            new_alignment   = AI_ALIGNMENT_CUSTOM_CSS;
            new_custom_css  = alt_styles ['css' + css_index].replace (/\"/g, "'");
          }
        }

        settings.find ("select#block-alignment-" + block).val (new_alignment).change ();
        if (new_alignment == AI_ALIGNMENT_CUSTOM_CSS) {
          settings.find ("#custom-css-" + block).val (new_custom_css);
        }
        settings.find ("select#close-button-" + block).val (new_close_button);
        settings.find ("select#close-button-sticky-" + block).val (new_close_button);

        if (sticky) {
          var new_horizontal_position = $("select#horizontal-position option:selected").attr('value');
          settings.find ("select#horizontal-position-" + block).val (new_horizontal_position);

          var new_vertical_position = $("select#vertical-position option:selected").attr('value');
          settings.find ("select#vertical-position-" + block).val (new_vertical_position);

          var new_horizontal_margin = spinner_horizontal_margin.spinner ("value");
          settings.find ("input#horizontal-margin-" + block).val (new_horizontal_margin);

          var new_vertical_margin = spinner_vertical_margin.spinner ("value");
          settings.find ("input#vertical-margin-" + block).val (new_vertical_margin);

          var new_animation = $("select#animation option:selected").attr('value');
          settings.find ("select#animation-" + block).val (new_animation).change ();
        }

        window.opener.change_block_alignment (block);
      }
    }

    function update_focused_spinner (event) {
      if (sticky) {
        if (spinner_horizontal_margin.is (":focus"))   spinner_horizontal_margin.spinner( "stepUp", event.deltaY); else
        if (spinner_vertical_margin.is (":focus"))     spinner_vertical_margin.spinner( "stepUp", event.deltaY);
      } else {
          if (spinner_margin_top.is (":focus"))     spinner_margin_top.spinner( "stepUp", event.deltaY); else
          if (spinner_margin_bottom.is (":focus"))  spinner_margin_bottom.spinner( "stepUp", event.deltaY); else
          if (spinner_margin_left.is (":focus"))    spinner_margin_left.spinner( "stepUp", event.deltaY); else
          if (spinner_margin_right.is (":focus"))   spinner_margin_right.spinner( "stepUp", event.deltaY); else
          if (spinner_padding_top.is (":focus"))    spinner_padding_top.spinner( "stepUp", event.deltaY); else
          if (spinner_padding_bottom.is (":focus")) spinner_padding_bottom.spinner( "stepUp", event.deltaY); else
          if (spinner_padding_left.is (":focus"))   spinner_padding_left.spinner( "stepUp", event.deltaY); else
          if (spinner_padding_right.is (":focus"))  spinner_padding_right.spinner( "stepUp", event.deltaY);
        }
    }


    $(window).on ('mousewheel', function (event) {
      if (!spinning) update_focused_spinner (event);
    });


    function create_spinner (selector, css_parameter, alignment) {
      var spinner_element = $(selector).spinner ({
        alignment: alignment,
        start: function (event, ui) {
          spinning = true;
          if (!$(this).is (":focus")) {
            update_focused_spinner (event)
            event.preventDefault();
          }
        },
        stop: function (event, ui) {
          spinning = false;
          wrapper.css (css_parameter, $(this).spinner ("value") + "px");
          wrapper.attr ("data-css", wrapper.attr ('style'))
          update_custom_css ();
          update_highlighting ();
          update_wrapper_size ();
        }
      }).spinner ("option", "mouseWheel", true).spinner ("option", "min", 0).spinner ("option", "max", 600).spinner ("value", parseInt (wrapper.css (css_parameter))).show ();

      return spinner_element;
    }

    function create_spinner_sticky (selector, alignment) {
      var spinner_element = $(selector).spinner ({
        alignment: alignment,
        start: function (event, ui) {
          spinning = true;
          if (!$(this).is (":focus")) {
            update_focused_spinner (event)
            event.preventDefault();
          }
        },
        stop: function (event, ui) {
          spinning = false;

          if (sticky_context == STICKY_CONTEXT_NONE) sticky_context = STICKY_CONTEXT_SPINNER;

          update_sticky_css (STICKY_CONTEXT_SPINNER);
          process_display_elements ();
          update_close_button ();

          update_sticky_elements (STICKY_CONTEXT_SPINNER);

          var new_css = $('#css-' + AI_ALIGNMENT_STICKY).text ();
          wrapper.attr ('data-css', new_css);
          wrapper.attr ('style', new_css);
          if (remove_transform) wrapper.css ('transform', '');
          update_custom_css ();
          update_sticky_elements (STICKY_CONTEXT_SPINNER);
          update_highlighting ();

          if (sticky_context == STICKY_CONTEXT_SPINNER) sticky_context = STICKY_CONTEXT_NONE;
        }
      }).spinner ("option", "mouseWheel", true).spinner ("option", "min", 0).spinner ("option", "max", 600).show ();

      return spinner_element;
    }


    function process_display_elements () {

//      console.log ('process_display_elements');

      var style = "";
      $("#css-label").css('display', 'inline-block');
      $("#edit-css-button").css('display', 'inline-block');

      $(ID_CSS_ALIGNMENT_DEFAULT).hide();
      $(ID_CSS_ALIGNMENT_LEFT).hide();
      $("#css-" + AI_ALIGNMENT_RIGHT).hide();
      $("#css-" + AI_ALIGNMENT_CENTER).hide();
      $("#css-" + AI_ALIGNMENT_FLOAT_LEFT).hide();
      $("#css-" + AI_ALIGNMENT_FLOAT_RIGHT).hide();
      $("#css-" + AI_ALIGNMENT_STICKY_LEFT).hide();
      $("#css-" + AI_ALIGNMENT_STICKY_RIGHT).hide();
      $("#css-" + AI_ALIGNMENT_STICKY_TOP).hide();
      $("#css-" + AI_ALIGNMENT_STICKY_BOTTOM).hide();
      $("#css-" + AI_ALIGNMENT_STICKY).hide();
      $("#custom-css").hide();
      $("#css-no-wrapping").hide();

      $("#demo-box").show ();
      $("#demo-box-no-wrapping").hide ();
      wrapping = true;

      $("#css-index").text ('');

      var selected_alignment = $("select#block-alignment option:selected");
      var alignment   = selected_alignment.attr ('value');
      var alt_styles  = selected_alignment.data ('alt-styles');
      if (typeof alt_styles != 'undefined') {
        var alt_style_index = selected_alignment.data ('alt-style');
        var num_styles = Object.keys(alt_styles).length;
        if (alt_style_index > num_styles) {
          alt_style_index = 1;
        }
        $('#css-' + alignment).text (alt_styles ['css' + alt_style_index].replace (/\"/g, "'"));
        if (num_styles > 1) {
          $("#css-index").text (alt_style_index);
        }
      }

      if (alignment == AI_ALIGNMENT_DEFAULT) {
        $(ID_CSS_ALIGNMENT_DEFAULT).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_DEFAULT).text ();
      } else
      if (alignment == AI_ALIGNMENT_LEFT) {
        $(ID_CSS_ALIGNMENT_LEFT).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_LEFT).text ();
      } else
      if (alignment == AI_ALIGNMENT_RIGHT) {
        $(ID_CSS_ALIGNMENT_RIGHT).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_RIGHT).text ();
      } else
      if (alignment == AI_ALIGNMENT_CENTER) {
        $(ID_CSS_ALIGNMENT_CENTER).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_CENTER).text ();
      } else
      if (alignment == AI_ALIGNMENT_FLOAT_LEFT) {
        $(ID_CSS_ALIGNMENT_FLOAT_LEFT).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_FLOAT_LEFT).text ();
      } else
      if (alignment == AI_ALIGNMENT_FLOAT_RIGHT) {
        $(ID_CSS_ALIGNMENT_FLOAT_RIGHT).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_FLOAT_RIGHT).text ();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_LEFT) {
        $(ID_CSS_ALIGNMENT_STICKY_LEFT).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_STICKY_LEFT).text ();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_RIGHT) {
        $(ID_CSS_ALIGNMENT_STICKY_RIGHT).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_STICKY_RIGHT).text ();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_TOP) {
        $(ID_CSS_ALIGNMENT_STICKY_TOP).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_STICKY_TOP).text ();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_BOTTOM) {
        $(ID_CSS_ALIGNMENT_STICKY_BOTTOM).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_STICKY_BOTTOM).text ();
      } else
      if (alignment == AI_ALIGNMENT_STICKY) {
        $(ID_CSS_ALIGNMENT_STICKY).css('display', 'inline-block');
          style = $(ID_CSS_ALIGNMENT_STICKY).text ();
      } else
      if (alignment == AI_ALIGNMENT_CUSTOM_CSS) {
        $("#custom-css").show();
        style = $("#custom-css").val ();
      } else
      if (alignment == AI_ALIGNMENT_NO_WRAPPING) {
        $("#css-no-wrapping").css('display', 'inline-block');
        $("#css-label").hide();
        $("#edit-css-button").hide();

        wrapping = false;
        style = "";

        $("#demo-box").hide ();
        $("#demo-box-no-wrapping").show ();
      }

      wrapper.attr ("data-css", style);
      wrapper.attr ("style", style);
      if (remove_transform) wrapper.css ('transform', '');

//      console.log ('process_display_elements');

      if (wrapping) update_margin_padding ();

      update_highlighting ();
      update_wrapper_size ();
    }

    function update_custom_css () {

//      console.log ('update_custom_css');

      $("#custom-css").val (wrapper.attr ("data-css"));
      if (!sticky) {
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
        $("#edit-css-button").click ();
      }
    }

    function ai_css_value_px (css, property) {
      var value = '';

      styles = css.split (';');
      styles.forEach ((style, index) => {
        style = style.trim ();
        if (style.indexOf (property) == 0) {
          style_parts = style.split (':');
          if (style_parts.length == 2) {
            style_property = style_parts [0].trim ();
            style_value = style_parts [1].trim ();
            if (style_property == property && style_value.endsWith ('px')) {
              value = parseInt (style_value);
            }
          }
        }
      });

      return value;
    }

    function extract_horizontal_margin (style) {
      var horizontal_margin = '';

      if (style !== '') {
        horizontal_margin = ai_css_value_px (style, 'left');
        if (horizontal_margin == '') horizontal_margin = ai_css_value_px (style, 'right');
        if (horizontal_margin == '') horizontal_margin = ai_css_value_px (style, 'margin-left');
        if (horizontal_margin == '') horizontal_margin = ai_css_value_px (style, 'margin-right');

        if (isNaN (horizontal_margin)) horizontal_margin = '';
      }

      return horizontal_margin;
    }

    function extract_vertical_margin (style) {
      var vertical_margin = '';

      if (style !== '') {
        vertical_margin = ai_css_value_px (style, 'top');
        if (vertical_margin == '') vertical_margin = ai_css_value_px (style, 'bottom');

        if (isNaN (vertical_margin)) vertical_margin = '';
      }

      return vertical_margin;
    }

    function update_margin_padding () {
      if (wrapping) {
        if (sticky) {
          if (sticky_context == STICKY_CONTEXT_CUSTOM_CSS) {
            spinner_horizontal_margin.spinner ("value", extract_horizontal_margin (wrapper.attr ('data-css')));
            spinner_vertical_margin.spinner ("value", extract_vertical_margin (wrapper.attr ('data-css')));
          }
        } else {
            spinner_margin_top.spinner ("value", parseInt (wrapper.css ("margin-top")));
            spinner_margin_bottom.spinner ("value", parseInt (wrapper.css ("margin-bottom")));
            spinner_margin_left.spinner ("value", parseInt (wrapper.css ("margin-left")));
            spinner_margin_right.spinner ("value", parseInt (wrapper.css ("margin-right")));
            spinner_padding_top.spinner ("value", parseInt (wrapper.css ("padding-top")));
            spinner_padding_bottom.spinner ("value", parseInt (wrapper.css ("padding-bottom")));
            spinner_padding_left.spinner ("value", parseInt (wrapper.css ("padding-left")));
            spinner_padding_right.spinner ("value", parseInt (wrapper.css ("padding-right")));
          }
      }
    }

    function update_close_button () {
      var close_button = wrapper.find ('.ai-close-button');
      if (wrapper.hasClass ('ai-close') && typeof close_button != 'undefined') {

        var alignment   = $("select#block-alignment option:selected").attr ('value');

        if (alignment != AI_ALIGNMENT_NO_WRAPPING) {
          $("#close-button-selection").show ();

          var selected_close_button =  $("#close-button-0 option:selected").attr('value');
          var button_class = 'ai-close-button';

          switch (parseInt (selected_close_button)) {
            case AI_CLOSE_NONE:
              button_class = 'ai-close-button ai-close-hidden';
              break;
            case AI_CLOSE_TOP_RIGHT:
              button_class = 'ai-close-button';
              break;
            case AI_CLOSE_TOP_LEFT:
              button_class = 'ai-close-button ai-close-left';
              break;
            case AI_CLOSE_BOTTOM_RIGHT:
              button_class = 'ai-close-button ai-close-bottom';
              break;
            case AI_CLOSE_BOTTOM_LEFT:
              button_class = 'ai-close-button ai-close-bottom ai-close-left';
              break;
          }

          close_button.attr ('class', button_class);
        } else {
            $("#close-button-selection").hide ();
            close_button.addClass ('ai-close-hidden');
          }
      }
    }

    function get_sticky_classes (custom_css) {

      const SETTINGS = $(window.opener.document).contents();
      const MAIN_CONTENT_ELEMENT = SETTINGS.find ('#main-content-element').val ().trim ();
      const MAIN_CONTENT_FIXED_WIDTH = parseInt (MAIN_CONTENT_ELEMENT) == MAIN_CONTENT_ELEMENT;

      custom_css = custom_css.replace (/\s+/g, '');
      var sticky_classes = [];

      if (custom_css.indexOf ("position:fixed") != - 1 &&
          custom_css.indexOf ("z-index:") != - 1 &&
          custom_css.indexOf ("display:none") != - 1) {
        if (!MAIN_CONTENT_FIXED_WIDTH &&
          custom_css.indexOf (";left:auto") != - 1) {
          sticky_classes.push ('ai-sticky-content');
          sticky_classes.push ('ai-sticky-left');
        } else
        if (!MAIN_CONTENT_FIXED_WIDTH &&
          custom_css.indexOf ("right:auto") != - 1) {
          sticky_classes.push ('ai-sticky-content');
          sticky_classes.push ('ai-sticky-right');
        };

        if (custom_css.indexOf ("margin-bottom:auto") != - 1) {
          sticky_classes.push ('ai-sticky-content');
          sticky_classes.push ('ai-sticky-scroll');
        };
      }

    //  console.log ('sticky_classes', sticky_classes);

      return sticky_classes;
    }

    function update_sticky_css (context) {

//      console.log ('update_sticky_css', context, 'sticky_context', sticky_context);

      if (sticky_context != context) return;

      var alignment = parseInt ($("select#block-alignment option:selected").attr ('value'));
      var horizontal_position = parseInt ($("select#horizontal-position option:selected").attr('value'));
      var vertical_position   = parseInt ($("select#vertical-position option:selected").attr('value'));

      if (alignment != AI_ALIGNMENT_CUSTOM_CSS) {
        var selected_horizontal_position = $("select#horizontal-position option:selected");
        var selected_vertical_position   = $("select#vertical-position option:selected");

        var custom_vertical_position_css = selected_vertical_position.data ('css-' + horizontal_position);

        if (typeof custom_vertical_position_css != 'undefined') var vertical_position_css = custom_vertical_position_css; else
          var vertical_position_css = selected_vertical_position.data ('css');

        var custom_horizontal_position_css = selected_horizontal_position.data ('css-' + vertical_position);

        if (typeof custom_horizontal_position_css != 'undefined') var horizontal_position_css = custom_horizontal_position_css; else
          var horizontal_position_css = selected_horizontal_position.data ('css');

        var sticky_css = vertical_position_css + horizontal_position_css;
      } else {
          var sticky_css = $('#css-' + AI_ALIGNMENT_STICKY + ' .ai-sticky-css').text ();
        }

      var vertical_margin = spinner_vertical_margin.spinner ("value");
      var horizontal_margin = spinner_horizontal_margin.spinner ("value");

      if (vertical_margin == null) vertical_margin = '';
      if (horizontal_margin == null) horizontal_margin = '';

      sticky_css = window.opener.update_sticky_margins (sticky_css, horizontal_margin, vertical_margin);

      if (main_content_fixed_width && parseInt (alignment) == AI_ALIGNMENT_STICKY) {
        if (horizontal_position == AI_STICK_TO_THE_CONTENT_LEFT) {
          sticky_css = sticky_css + ' right: calc(50% + ' + main_content_shift + 'px); display: block;';
        }
        if (horizontal_position == AI_STICK_TO_THE_CONTENT_RIGHT) {
          sticky_css = sticky_css + ' left: calc(50% + ' + main_content_shift + 'px); display: block;';
        }
      }

      $('#css-' + AI_ALIGNMENT_STICKY + ' .ai-sticky-css').text (sticky_css);

      wrapper.removeClass ('ai-sticky-content').removeClass ('ai-sticky-left').removeClass ('ai-sticky-right').removeClass ('ai-sticky-scroll');

      switch (parseInt (alignment)) {
        case AI_ALIGNMENT_STICKY:
          if (!main_content_fixed_width) {
            if (horizontal_position == AI_STICK_TO_THE_CONTENT_LEFT) {
              wrapper.addClass ('ai-sticky-content');
              wrapper.addClass ('ai-sticky-left');
            } else
            if (horizontal_position == AI_STICK_TO_THE_CONTENT_RIGHT) {
              wrapper.addClass ('ai-sticky-content');
              wrapper.addClass ('ai-sticky-right');
            }
          }

          if (vertical_position == AI_SCROLL_WITH_THE_CONTENT) {
            wrapper.addClass ('ai-sticky-content');
            wrapper.addClass ('ai-sticky-scroll');
          }
          break;
        case AI_ALIGNMENT_CUSTOM_CSS:
          var custom_css = $("#custom-css").val ().replace (/\s+/g, '');

          sticky_classes = [];
          if (window.opener != null && !window.opener.closed) {
            sticky_classes = get_sticky_classes (custom_css);
          }

//      console.log ('sticky_classes', sticky_classes);

          sticky_classes.forEach(function (sticky_class) {
            wrapper.addClass (sticky_class);
          });
          break;
      }

      wrapper.removeClass ('ai-center-h').removeClass ('ai-center-v').removeClass ('ai-sticky-turn');
      wrapper.attr ('data-aos', '');

      var animation = parseInt ($("select#animation option:selected").attr ('value'));

      var data_aos = '';
      var direction = '';

      switch (horizontal_position) {
        case AI_STICK_TO_THE_LEFT:
        case AI_STICK_TO_THE_CONTENT_LEFT:
          direction = 'right';
          break;
        case AI_STICK_HORIZONTAL_CENTER:
          wrapper.addClass ('ai-center-h');
          switch (vertical_position) {
            case AI_STICK_TO_THE_TOP:
            case AI_SCROLL_WITH_THE_CONTENT:
              direction = 'down';
              break;
            case AI_STICK_VERTICAL_CENTER:
              direction = 'left';
              switch (animation) {
                case AI_ANIMATION_SLIDE:
                case AI_ANIMATION_SLIDE_FADE:
                  animation = AI_ANIMATION_FADE;
                  break;
                case AI_ANIMATION_ZOOM_IN:
                case AI_ANIMATION_ZOOM_OUT:
                  direction = 'up';
                  break;
              }
              break;
            case AI_STICK_TO_THE_BOTTOM:
              direction = 'up';
              break;
          }
          break;
        case AI_STICK_TO_THE_CONTENT_RIGHT:
        case AI_STICK_TO_THE_RIGHT:
          direction = 'left';
          break;
      }

      if (vertical_position == AI_STICK_VERTICAL_CENTER) wrapper.addClass ('ai-center-v');

//      console.log ('direction', direction);
//      console.log ('animation', animation);
//      console.log ('horizontal_position', horizontal_position);

      switch (horizontal_position) {
        case AI_STICK_TO_THE_LEFT:
          if (animation == AI_ANIMATION_TURN) direction = 'left';
          break;
        case AI_STICK_TO_THE_RIGHT:
          if (animation == AI_ANIMATION_TURN) direction = 'right';
          break;
        case AI_STICK_TO_THE_CONTENT_LEFT:
        case AI_STICK_TO_THE_CONTENT_RIGHT:
          if (animation == AI_ANIMATION_SLIDE) animation = AI_ANIMATION_SLIDE_FADE;
          break;
      }

      switch (animation) {
        case AI_ANIMATION_FADE:
          data_aos = 'fade';
          break;
        case AI_ANIMATION_SLIDE:
          data_aos = 'slide-' + direction;
          break;
        case AI_ANIMATION_SLIDE_FADE:
          data_aos = 'fade-' + direction;
          break;
        case AI_ANIMATION_TURN:
          wrapper.addClass ('ai-sticky-turn');
          data_aos = 'flip-' + direction;
          break;
        case AI_ANIMATION_FLIP:
          if (direction == 'right') direction = 'left'; else
            if (direction == 'left') direction = 'right';
          data_aos = 'flip-' + direction;
          break;
        case AI_ANIMATION_ZOOM_IN:
          data_aos = 'zoom-in-' + direction;
          break;
        case AI_ANIMATION_ZOOM_OUT:
          data_aos = 'zoom-out-' + direction;
          break;
      }

      remove_transform = false;
      if (data_aos != '') {
        wrapper.attr ('data-aos', data_aos);
        remove_transform = true;
      }
    }

    function update_sticky_elements (context) {

//      console.log ('update_sticky_elements', context, 'sticky_context', sticky_context);

      if (sticky_context != context) return;

      if (sticky_context == STICKY_CONTEXT_INIT) {
        setTimeout (function() {ai_process_sticky_elements (jQuery);}, 100);
      } else ai_process_sticky_elements (jQuery);
    }

    var start_time = new Date().getTime();

    if (sticky) {
      spinner_horizontal_margin = create_spinner_sticky ("#spinner-horizontal-margin", "horizontal").spinner ("option", "min", - 600).spinner ("option", "max", 5000);
      spinner_vertical_margin   = create_spinner_sticky ("#spinner-vertical-margin", "horizontal").spinner ("option", "min", - 600).spinner ("option", "max", 5000);

      spinner_horizontal_margin.spinner ("value", <?php echo $horizontal_margin == '' ? "''" : $horizontal_margin; ?>);
      spinner_vertical_margin.spinner   ("value", <?php echo $vertical_margin == '' ? "''" : $vertical_margin; ?>);
    } else {
        spinner_margin_top      = create_spinner ("#spinner-margin-top",      "margin-top", "horizontal").spinner ("option", "min", - $("#p1").outerHeight (true));
        spinner_margin_bottom   = create_spinner ("#spinner-margin-bottom",   "margin-bottom", "horizontal").spinner ("option", "min", - $("#p1").outerHeight (true));
        spinner_margin_left     = create_spinner ("#spinner-margin-left",     "margin-left", "vertical").spinner ("option", "min", - 600);
        spinner_margin_right    = create_spinner ("#spinner-margin-right",    "margin-right", "vertical").spinner ("option", "min", - 600);
        spinner_padding_top     = create_spinner ("#spinner-padding-top",     "padding-top", "horizontal");
        spinner_padding_bottom  = create_spinner ("#spinner-padding-bottom",  "padding-bottom", "horizontal");
        spinner_padding_left    = create_spinner ("#spinner-padding-left",    "padding-left", "vertical");
        spinner_padding_right   = create_spinner ("#spinner-padding-right",   "padding-right", "vertical");
      }

    $("select#block-alignment").change (function() {

      if (sticky_context == STICKY_CONTEXT_NONE) sticky_context = STICKY_CONTEXT_BLOCK_ALIGNMENT;

      var alignment = $("select#block-alignment option:selected").attr ('value');

      if (sticky && sticky_context == STICKY_CONTEXT_BLOCK_ALIGNMENT && alignment == AI_ALIGNMENT_CUSTOM_CSS) {
        if ($("input#custom-css").val () == '') {
          var vertical_margin = spinner_vertical_margin.spinner ("value");
          var horizontal_margin = spinner_horizontal_margin.spinner ("value");

          $('#css-' + AI_ALIGNMENT_STICKY + ' .ai-sticky-css').text (' top: ' + vertical_margin + 'px; left: ' + horizontal_margin + 'px;');
          $("input#custom-css").val ($('#css-' + AI_ALIGNMENT_STICKY).text ());
        }
      }

//      console.log ('select#block-alignment change', $("select#block-alignment option:selected").attr ('value'));

      if (sticky) update_sticky_css (STICKY_CONTEXT_BLOCK_ALIGNMENT);

      process_display_elements ();
      update_close_button ();

//      console.log ('select#block-alignment');

      if (sticky) update_sticky_elements (STICKY_CONTEXT_BLOCK_ALIGNMENT);
      if (sticky) update_highlighting ();

      if (sticky_context == STICKY_CONTEXT_BLOCK_ALIGNMENT) sticky_context = STICKY_CONTEXT_NONE;
    });

    $("select#close-button-0").change (function() {
      update_close_button ();
      update_highlighting ();
    });

    $("select#horizontal-position").change (function() {
      if (sticky_context == STICKY_CONTEXT_NONE) sticky_context = STICKY_CONTEXT_HORIZONTAL_POSITION;

//      console.log ('select#horizontal-position change');

      if (sticky_context == STICKY_CONTEXT_HORIZONTAL_POSITION) $("select#block-alignment").val (AI_ALIGNMENT_STICKY).change();
      update_sticky_css (STICKY_CONTEXT_HORIZONTAL_POSITION);
      process_display_elements ();
      update_close_button ();

//      console.log ('select#horizontal-position');

      update_sticky_elements (STICKY_CONTEXT_HORIZONTAL_POSITION);
      update_highlighting ();

      wrapper.css ('transition-property', 'none');
      setTimeout (function() {wrapper.css ('transition-property', '');}, 10);

      if (sticky_context == STICKY_CONTEXT_HORIZONTAL_POSITION) sticky_context = STICKY_CONTEXT_NONE;
    });

    $("select#vertical-position").change (function() {
      if (sticky_context == STICKY_CONTEXT_NONE) sticky_context = STICKY_CONTEXT_VERTICAL_POSITION;

//      console.log ('select#vertical-position change');


      if (sticky_context == STICKY_CONTEXT_VERTICAL_POSITION) $("select#block-alignment").val (AI_ALIGNMENT_STICKY).change();
      update_sticky_css (STICKY_CONTEXT_VERTICAL_POSITION);
      process_display_elements ();
      update_close_button ();

//      console.log ('select#vertical-position');

      update_sticky_elements (STICKY_CONTEXT_VERTICAL_POSITION);
      update_highlighting ();

      wrapper.css ('transition-property', 'none');
      setTimeout (function() {wrapper.css ('transition-property', '');}, 10);

      if (sticky_context == STICKY_CONTEXT_VERTICAL_POSITION) sticky_context = STICKY_CONTEXT_NONE;
    });


    $("select#animation").change (function() {
      if (sticky_context == STICKY_CONTEXT_NONE) sticky_context = STICKY_CONTEXT_ANIMATION;

//      console.log ('select#animation change');

//      if (sticky_context == STICKY_CONTEXT_VERTICAL_POSITION) $("select#block-alignment").val (AI_ALIGNMENT_STICKY).change();
      update_sticky_css (STICKY_CONTEXT_ANIMATION);
      process_display_elements ();
      update_close_button ();

////      console.log ('select#vertical-position');

      update_sticky_elements (STICKY_CONTEXT_ANIMATION);
      update_highlighting ();

      wrapper.css ('transition-property', 'none');
      setTimeout (function() {wrapper.css ('transition-property', '');}, 10);

      if (sticky_context == STICKY_CONTEXT_ANIMATION) sticky_context = STICKY_CONTEXT_NONE;
    });

    $("#animate-button").button ({
    }).click (function () {

      if ($('body').hasClass ("highlighted")) {
        $("#highlight-button").click ();
      }

      wrapper.toggleClass ('aos-animate');
    });

    $('.ai-close-button').click (function () {
      if ($('body').hasClass ("highlighted")) {
        setTimeout (function () {
          $("#highlight-button").click ();
          $("#highlight-button").click ();
        }, 10);
      }
    });

    $(".css-code").click (function () {
      if (!$('#custom-css').is(':visible')) {
        $("#edit-css-button").click ();
      }
    });

    $("#edit-css-button").button ({
    }).click (function () {

      $(ID_CSS_ALIGNMENT_DEFAULT).hide();
      $(ID_CSS_ALIGNMENT_LEFT).hide();
      $(ID_CSS_ALIGNMENT_RIGHT).hide();
      $(ID_CSS_ALIGNMENT_CENTER).hide();
      $(ID_CSS_ALIGNMENT_FLOAT_LEFT).hide();
      $(ID_CSS_ALIGNMENT_FLOAT_RIGHT).hide();
      $(ID_CSS_ALIGNMENT_STICKY_LEFT).hide();
      $(ID_CSS_ALIGNMENT_STICKY_RIGHT).hide();
      $(ID_CSS_ALIGNMENT_STICKY_TOP).hide();
      $(ID_CSS_ALIGNMENT_STICKY_BOTTOM).hide();
      $(ID_CSS_ALIGNMENT_STICKY).hide();

      var alignment = $("select#block-alignment"+" option:selected").attr('value');

      if (alignment == AI_ALIGNMENT_DEFAULT) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_DEFAULT).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_LEFT) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_LEFT).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_RIGHT) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_RIGHT).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_CENTER) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_CENTER).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_FLOAT_LEFT) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_FLOAT_LEFT).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_FLOAT_RIGHT) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_FLOAT_RIGHT).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_LEFT) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_STICKY_LEFT).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_RIGHT) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_STICKY_RIGHT).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      }
      if (alignment == AI_ALIGNMENT_STICKY_TOP) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_STICKY_TOP).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_BOTTOM) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_STICKY_BOTTOM).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_STICKY) {
        $("#custom-css").show().val ($(ID_CSS_ALIGNMENT_STICKY).text ());
        $("select#block-alignment").val (AI_ALIGNMENT_CUSTOM_CSS).change();
      }
    });

    $("#custom-css").on ('input', function() {
      if (sticky_context == STICKY_CONTEXT_NONE) sticky_context = STICKY_CONTEXT_CUSTOM_CSS;

//      console.log ('#custom-css input');

      if (wrapping) {
        var custom_css = $("#custom-css").val ();
        wrapper.attr ("data-css", custom_css);
        wrapper.attr ("style", custom_css);
      }
      if (remove_transform) wrapper.css ('transform', '');
      if (sticky) update_sticky_css (STICKY_CONTEXT_CUSTOM_CSS);

//      console.log ('#custom-css');

      if (sticky) update_sticky_elements (STICKY_CONTEXT_CUSTOM_CSS);
      update_margin_padding ();
      update_close_button ();
      update_highlighting ();
      update_wrapper_size ();

      if (sticky_context == STICKY_CONTEXT_CUSTOM_CSS) sticky_context = STICKY_CONTEXT_NONE;
    });

    $("#highlight-button").button ({
    }).click (function () {
      $('body').toggleClass ("highlighted");

      if (!$('body').hasClass ("highlighted")) {
        $(".highlighting").remove ();
        $('.ai-debug-ad-info').remove();
        return;
      }

<?php
      if (defined ('AI_ADSENSE_OVERLAY')) {
        echo "
        ai_process_adsense_ads (jQuery);
        $('.ai-debug-ad-info').each (function () {
          var info_top  = $(this).offset ().top;
          var info_left = $(this).offset ().left;
          var ad_width = $(this).parent ().width ();
          $(this).css ({top: info_top, left: info_left, width: ad_width});
          if (wrapper.css ('position') == 'fixed') $(this).css ('position', 'fixed');
          $('#ad-info-overlay').append ($(this));
        });
        ";
      }
?>

      if (wrapping) {

        var overlay_position = '';
        if (wrapper.css ('position') == 'fixed') overlay_position = 'fixed';
        $('#margin-background').css ('position', overlay_position);
        $('#padding-background').css ('position', overlay_position);
        $('#padding-background-white').css ('position', overlay_position);

        var wrapper_offset        = wrapper.offset ();
        var wrapper_left          = wrapper_offset.left;
        var wrapper_top           = wrapper_offset.top;
        var wrapper_width         = wrapper.outerWidth (true);
        var wrapper_height        = wrapper.outerHeight (true);
        var wrapper_outer_width   = wrapper.outerWidth ();
        var wrapper_outer_height  = wrapper.outerHeight ();
        var code_width            = wrapper.width  ();
        var code_height           = wrapper.height ();

        var wrapper_margin_width  = wrapper_width  - wrapper_outer_width;
        var wrapper_margin_height = wrapper_height - wrapper_outer_height;
        var wrapper_margin_top    = parseInt (wrapper.css ('margin-top'));
        var wrapper_margin_left   = parseInt (wrapper.css ('margin-left'));
        var wrapper_border_width  = wrapper.outerWidth () - wrapper.innerWidth ();
        var wrapper_border_height = wrapper.outerHeight () - wrapper.innerHeight ();
        var wrapper_border_top    = parseInt (wrapper.css ('border-top-width'));
        var wrapper_border_left   = parseInt (wrapper.css ('border-left-width'));
        var wrapper_padding_width  = wrapper.innerWidth () - code_width;
        var wrapper_padding_height = wrapper.innerHeight () - code_height;

        if (debug) {
          console.log ("wrapper_left: " + wrapper_left);
          console.log ("wrapper_top: " + wrapper_top);
          console.log ("wrapper_width: " + wrapper_width);
          console.log ("wrapper_height: " + wrapper_height);
          console.log ("wrapper_margin_top: " + wrapper_margin_top);
          console.log ("wrapper_margin_left: " + wrapper_margin_left);
          console.log ("wrapper_border_top: " + wrapper_border_top);
          console.log ("wrapper_border_left: " + wrapper_border_left);
          console.log ("wrapper_outer_width: " + wrapper_outer_width);
          console.log ("wrapper_outer_height: " + wrapper_outer_height);
          console.log ("wrapper_margin_height: " + wrapper_margin_height);
          console.log ("wrapper_margin_width: " + wrapper_margin_width);
          console.log ("wrapper_margin_height: " + wrapper_margin_height);
          console.log ("wrapper_border_width: " + wrapper_border_width);
          console.log ("wrapper_border_height: " + wrapper_border_height);
          console.log ("wrapper_padding_width: " + wrapper_padding_width);
          console.log ("wrapper_padding_height: " + wrapper_padding_height);
          console.log ("code_width: " + code_width);
          console.log ("code_height: " + code_height);
        }

        $('#margin-background').show ();
        $("#padding-background-white").show ();

        $('#margin-background').css ('width', wrapper_width).css ('height', wrapper_height);
        $("#margin-background").offset ({top:  wrapper_top - wrapper_margin_top, left: wrapper_left - wrapper_margin_left});

        $('#padding-background').css ('width', wrapper_outer_width - wrapper_border_width).css ('height', wrapper_outer_height - wrapper_border_height);
        $("#padding-background").offset ({top:  wrapper_top + wrapper_border_top, left: wrapper_left + wrapper_border_left});

        $('#padding-background-white').css ('width', wrapper_outer_width - wrapper_border_width).css ('height', wrapper_outer_height - wrapper_border_height);
        $("#padding-background-white").offset ({top:  wrapper_top + wrapper_border_top, left: wrapper_left + wrapper_border_left});

        code_blocks = wrapper.children ();
      } else {
          $('#margin-background').hide ();
          $("#padding-background-white").hide ();

          $('#padding-background').css ('width', wrapper.outerWidth ()).css ('height', wrapper.outerHeight ());
          $("#padding-background").offset ({top: wrapper.offset ().top, left: wrapper.offset ().left});

          code_blocks = wrapper.children ();
        }

      var code_index = 0;
      var overlay_div = $("#code-overlay");
      var overlay_background_div = $("#code-background-white");
      var last_code_div = "code-overlay";
      var last_bkg_div  = "code-background-white";
      var invalid_tags = ['script', 'style'];

//      console.log ('code_blocks', code_blocks);

      var filtered_code_blocks = $();
      code_blocks.each (function () {
        var element_tag = $(this).prop("tagName").toLowerCase();

        // Don't highlight close button
        if (element_tag == 'span' && $(this).hasClass ('ai-close-button')) return true;

        if (element_tag == 'a') {
          var a_children = $(this).children ();
          if (a_children.length == 0)
            filtered_code_blocks = filtered_code_blocks.add ($(this)); else
              filtered_code_blocks = filtered_code_blocks.add (a_children);
        } else filtered_code_blocks = filtered_code_blocks.add ($(this));
      });

//      code_blocks.each (function () {
      filtered_code_blocks.each (function () {
        var element_tag = $(this).prop("tagName");
        if (typeof element_tag != 'undefined') element_tag = element_tag.toLowerCase();

        if (invalid_tags.indexOf (element_tag) < 0) {
          code_index ++;
          var element_offset = $(this).offset ();

          var element_display       = $(this).css ('display');
          var element_left          = element_offset.left;
          var element_top           = element_offset.top;
          var element_outer_width   = $(this).outerWidth ();
          var element_outer_height  = $(this).outerHeight ();

          if (debug) {
            console.log ("");
            console.log ("element " + code_index + ": " + element_tag);
            console.log ("element_display: " + element_display);
            console.log ("element_left: " + element_left);
            console.log ("element_top: " + element_top);
            console.log ("element_outer_width: " + element_outer_width);
            console.log ("element_outer_height: " + element_outer_height);
          }

          if (element_display == 'none') return; // continue

          var overlay_div_position = overlay_div.css ('position');
          var overlay_background_div_position = overlay_background_div.css ('position');
          var fixed_offset_top = 0;
          var fixed_offset_left = 0;
          if (wrapper.css ('position') == 'fixed') {
            overlay_div_position = 'fixed';
            overlay_background_div_position = 'fixed';
            fixed_offset_top = $(document).scrollTop();
            fixed_offset_left = $(document).scrollLeft();
          }

          var new_id = "code-" + code_index;
          $("#" + last_code_div).after (overlay_div.clone ().
            css ('position', overlay_div_position).
            css ('width', element_outer_width).
            css ('height', element_outer_height).
            offset ({top:  element_top - fixed_offset_top, left: element_left - fixed_offset_left}).
            attr ("id", new_id).
            addClass ("highlighting"));
          last_code_div = new_id;

          var new_bkg_id = "code-background-" + code_index;
          $("#" + last_bkg_div).after (overlay_background_div.clone ().
            css ('position', overlay_background_div_position).
            css ('width', element_outer_width).
            css ('height', element_outer_height).
            offset ({top:  element_top - fixed_offset_top, left: element_left - fixed_offset_left}).
            attr ("id", new_bkg_id).
            addClass ("highlighting"));
          last_bkg_div = new_bkg_id;
        }
      });
      if (debug) console.log ("");
    });

    $("#use-button").button ({
    }).click (function () {
      apply_to_settings ();
      window.close();
    });

    $("#reset-button").button ({
    }).click (function () {
      load_from_settings ();
    });

    $("#cancel-button").button ({
    }).click (function () {
      window.close();
    });

    $(".viewport-box").click (function () {
      var new_width = parseInt ($(this).attr ("data")) - 1;
      if (window.innerWidth == new_width) {
        window.resizeTo (836, $(window).height());
      } else {
          // Add body margin
          window.resizeTo (new_width + 16, $(window).height());
        }
    });

    $('.demo-code').click (function () {
      wrapper.toggleClass ('fit-content');
      $('.demo-code span.name').toggle ();
      update_highlighting ();
      update_wrapper_size ();
    });

    update_width ();

    update_close_button ();

<?php if (!$read_only && !$separators) : ?>
    load_from_settings ();
<?php endif; ?>
<?php if ($separators) : ?>
    process_display_elements ();
<?php endif; ?>

    if (sticky) {
      update_sticky_css (STICKY_CONTEXT_INIT);
      process_display_elements ();
      ai_process_sticky_elements_on_ready = false;
      update_sticky_elements (STICKY_CONTEXT_INIT);
    }

    setTimeout (update_wrapper_size, 250);
    setTimeout (update_wrapper_size, 750);

    var current_time = new Date().getTime();
    if (debug) console.log ("TIME: " + ((current_time - start_time) / 1000).toFixed (3));

    var titles = new Array();
    $("select#block-alignment").imagepicker({hide_select: false}).find ('option').each (function (index) {
      titles.push ($(this).data ('title'));
    });
    $("select#block-alignment + ul").appendTo("#alignment-style").css ('padding-top', '10px').find ('li').each (function (index) {
      $(this).attr ('title', titles [index]);
    });

    if (sticky) {
      var titles = new Array();
      $("select#close-button-0").imagepicker({hide_select: false}).find ('option').each (function (index) {
        titles.push ($(this).data ('title'));
      });
      $("select#close-button-0 + ul").appendTo("#close-buttons").css ('padding-top', '10px').find ('li').each (function (index) {
        $(this).attr ('title', titles [index]);
      });
    }

    var titles = new Array();
    $("select#horizontal-position").imagepicker({hide_select: false}).find ('option').each (function (index) {
      titles.push ($(this).data ('title'));
    });
    $("select#horizontal-position + ul").appendTo("#horizontal-positions").css ('padding-top', '10px').find ('li').each (function (index) {
      $(this).attr ('title', titles [index]);
    });

    var titles = new Array();
    $("select#vertical-position").imagepicker({hide_select: false}).find ('option').each (function (index) {
      titles.push ($(this).data ('title'));
    });
    $("select#vertical-position + ul").appendTo("#vertical-positions").css ('padding-top', '10px').find ('li').each (function (index) {
      $(this).attr ('title', titles [index]);
    });

    $("div.automatic-insertion").dblclick (function () {
      var selected_alignment = $("select#block-alignment option:selected");
      var alignment_value = selected_alignment.val ();
      var alt_styles = selected_alignment.data ('alt-styles');
      if (typeof alt_styles != 'undefined') {
        var alt_style_index = selected_alignment.data ('alt-style');
        var num_styles = Object.keys(alt_styles).length;
        alt_style_index ++;
        if (alt_style_index > num_styles) alt_style_index = 1;
        selected_alignment.data ('alt-style', alt_style_index)
        process_display_elements ();
      }
    });

    if (sticky) {
      $('.spinner.normal').hide ();
      wrapper.removeClass ('hide');
    } else {
        $('.spinner.sticky').show ();
      }

    sticky_context = STICKY_CONTEXT_NONE;

    $("select#check").change (function() {
      load_preview_block ();
    });

    $("select#count").change (function() {
      load_preview_block ();
    });

    $("select#rotate").change (function() {
      load_preview_block ();
    });

    $("select#viewport").change (function() {
      load_preview_block ();
    });

    }) (jQuery);
  }

  jQuery(document).ready(function($) {

    initialize_preview ();

    setTimeout (show_blocked_warning, 400);
  });

  function show_blocked_warning () {
    jQuery("#blocked-warning.warning-enabled").show ();
  }

</script>
<style>

/*html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {*/
a, img {
  border: 0;
  font: inherit;
  font-size: 100%;
  font-style: inherit;
  font-weight: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
}

body.sticky {
  margin: 0;
}

#main.sticky {
  width: 728px;
  margin: 100px auto;
}

.sticky #content {
  padding: 20px 10px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.responsive-table td {
  white-space: nowrap;
}
.small-button .ui-button-text-only .ui-button-text {
   padding: 0;
}
#margin-background {
  z-index: 2;
  position: absolute;
  display: none;
}
.highlighted #margin-background {
  background: rgba(255, 145, 0, 0.5);
  display: block;
}
#padding-background-white {
  z-index: 3;
  position: absolute;
  background: #fff;
  width: 0px;
  height: 0px;
  display: none;
}
.highlighted #padding-background-white {
  display: block;
}
#padding-background {
  z-index: 4;
  position: absolute;
  display: none;
}
.highlighted #padding-background {
  background: rgba(50, 220, 140, 0.5);
  display: block;
}
#wrapper {
  z-index: 6;
  position: relative;
  border: 0;
}

#wrapper.hide {
  visibility: hidden;
}
.code-background-white {
  z-index: 5;
  position: absolute;
  background: #fff;
  width: 0px;
  height: 0px;
  display: none;
}
.highlighted .code-background-white {
  display: block;
}
.code-overlay {
  z-index: 99999;
  position: absolute;
  display: none;
}
.highlighted .code-overlay {
  background: rgba(50, 140, 220, 0.5);
  display: block;
}
.ad-info-overlay {
  position: absolute;
}

table.screen td {
  padding: 0;
  font-size: 12px;
}

table.demo-box {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
#demo-box-no-wrapping {
  height: 200px;
}
table.demo-box input {
  display: none;
}
.demo-box td {
  font-size: 12px;
  padding: 0;
}
td.demo-wrapper-margin-lr, td.demo-wrapper-margin {
  width: 22px;
  height: 22px;
  text-align: center;
}
td.demo-wrapper-margin-tb {
  width: 300px;
  height: 22px;
  text-align: center;
}
.highlighted td.demo-wrapper-margin-tb, .highlighted td.demo-wrapper-margin-lr, .highlighted td.demo-wrapper-margin {
  background: rgba(255, 145, 0, 0.5);
}
td.demo-code-padding-tb {
  text-align: center;
}
td.demo-code-padding-lr {
  width: 22px;
  text-align: center;
}
td.demo-code {
  text-align: center;
  user-select: none;
  text-decoration: none;
  box-shadow: 0 0 0;
  cursor: pointer;
}
#demo-box td.demo-code {
  height: 110px;
}
.highlighted td.demo-code, .highlighted td.demo-code-padding-lr, .highlighted td.demo-code-padding-tb {
  background: rgba(50, 140, 220, 0.5);
}
td.demo-wrapper-background {
  width: 80px;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
}
.highlighted td.demo-wrapper-background {
  background: rgba(50, 220, 140, 0.5);
}
.ui-widget-content {
  background: transparent;
}
.fit-content {
  width: fit-content;
  width: -moz-fit-content;
}
.ui-spinner {
  border: 0;
}

.ui-spinner-horizontal, .ui-spinner-horizontal .ui-spinner-input {
  height: 14px;
}
.ui-spinner-horizontal .ui-spinner-input {
  width: 23px;
  outline: 0;
  margin: 0 12px 0 12px;
}

.spinner.sticky .ui-spinner-horizontal .ui-spinner-input {
  width: 26px;
  margin-top: 0;
  height: 13px;
  font-size: 13px;
}

.ui-spinner-vertical, .ui-spinner-vertical .ui-spinner-input {
  width: 18px;
}
.ui-spinner-vertical .ui-spinner-input {
  height: 11px;
  outline: 0;
  margin: 12px 0 12px 0;
  font-size: 11px;
}

.thumbnail {
  border-radius: 6px;
}
ul.image_picker_selector {
  overflow: hidden!important;
}

div.automatic-insertion {
  width: 50px;
  height: 50px;
}

li.automatic-insertion p {
  width: 50px;
  height: 50px;
}

div.automatic-insertion img {
  width: 50px;
  height: 50px;
}

select {
  border-radius: 5px;
}
.ai-close-hidden {
  visibility: hidden;
}

.ai-debug-ad-info {position: absolute; top: 0; left: 0; overflow: hidden; width: auto; height: auto; font-size: 11px; line-height: 11px; text-align: left; z-index: 999999991;}
.ai-info {display: inline-block; padding: 2px 4px;}
.ai-info-1 {background: #000; color: #fff;}
.ai-info-2 {background: #fff; color: #000;}

</style>
<?php echo $head_code; ?>
</head>
<body class="ai-preview <?php if ($sticky) echo 'sticky'; ?>" style='font-family: arial; text-align: justify; overflow-x: hidden;'>

<?php if ($sticky) padding_margin_code ($close_button, $class, $sticky_parameters, $wrapper_css, $block_code); ?>

  <div id="ai-data" style="display: none;" version="<?php echo AD_INSERTER_VERSION; ?>"></div>

  <div style="margin: 0 -8px 10px; display: none;">
    <table class="screen" cellspacing=0 cellpadding=0>
      <tr>
<?php
    $previous_width = 0;
    $previous_name = '';
    for ($viewport_index = 6 - 1; $viewport_index > 0; $viewport_index --) {
      $viewport_name  = get_viewport_name ($viewport_index);
      $viewport_width = get_viewport_width ($viewport_index);
      if ($viewport_name != '' && $viewport_width != 0) {
        echo "<td class='viewport-box' data='", $viewport_width, "' style='background: #eee; text-align: center; border: 1px solid #888; border-left-width: 0; min-width: ", $viewport_width - $previous_width - 1, "px'>",
          $previous_name, "<span style='float: left; margin-left: 5px;'>", $previous_width != 0 ? $previous_width . "px" : "", "</span></td>";
      }
      $previous_name  = $viewport_name;
      $previous_width = $viewport_width;
    }
    echo "<td style='background: #eee; text-align: left; border: 1px solid #888; border-left-width: 0; min-width: 2000px'><span style='margin-left: 30px;'>", get_viewport_name (1), "</span><span style='float: left; margin-left: 5px;'>", $previous_width != 0 ? $previous_width . "px" : "", "</span></td>";
?>
      </tr>
    </table>
  </div>

<?php if (!$read_only) : ?>
  <div style="margin: 10px -8px 10px -8px">
    <table class="screen" cellspacing=0 cellspacing="0">
      <tr>
        <td><span>&#9667;</span></td>
        <td style="width: 50%;"><div style="height: 2px; width: 100%; border-bottom: 1px solid #ddd;"></div></td>
        <td id="screen-width" style="min-width: 45px; text-align: center; font-size: 12px;">820 px</td>
        <td style="width: 50%;"><div style="height: 2px; width: 100%; border-bottom: 1px solid #ddd;"></div></td>
        <td><span id="right-arrow" >&#9657;</span></td>
      </tr>
    </table>
  </div>
<?php endif; ?>

  <div id="main" class="<?php if ($sticky) echo 'sticky'; ?>">
  <div id="content">

  <div id="blocked-warning" class="warning-enabled" style="padding: 2px 8px 2px 8px; margin: 8px 0 8px 0; border: 1px solid rgb(221, 221, 221); border-radius: 5px;">
    <div style="float: right; text-align: right; margin: 20px 0px 0px 0;">
       <?php _e ('This page was not loaded properly. Please check browser, plugins and ad blockers.', 'ad-inserter'); ?>
    </div>
    <h3 style="color: red;" title="Error loading page"><?php _e ('PAGE BLOCKED', 'ad-inserter'); ?></h3>

    <div style="clear: both;"></div>
  </div>

  <div style="float: right; width: 90px; margin-left: 20px;">
    <button id="highlight-button" type="button" style="margin: 0 0 10px 0; font-size: 12px; width: 90px; height: 35px; float: right;" title="<?php _e ('Highlight inserted code', 'ad-inserter'); ?>" ><?php _e ('Highlight', 'ad-inserter'); ?></button>
<?php if (!$read_only) : ?>
    <button id="use-button" type="button" style="margin: 0 0 10px 0; font-size: 12px; width: 90px; height: 35px; float: right;" title="<?php _e ('Use current settings', 'ad-inserter'); ?>" ><?php _e ('Use', 'ad-inserter'); ?></button>
    <button id="reset-button" type="button" style="margin: 0 0 10px 0; font-size: 12px; width: 90px; height: 35px; float: right;" title="<?php _e ('Reset to block settings', 'ad-inserter'); ?>" ><?php _e ('Reset', 'ad-inserter'); ?></button>
<?php endif; ?>
    <button id="cancel-button" type="button" style="margin: 0 0 10px 0; font-size: 12px; width: 90px; height: 35px; float: right;" title="<?php _e ('Close preview window', 'ad-inserter'); ?>" ><?php _e ('Cancel', 'ad-inserter'); ?></button>
  </div>

<?php if (!$read_only) : ?>
  <div style="float: left; max-width: 300px; margin-right: 20px">
<?php else : ?>
  <div style="float: left; max-width: 600px; margin-right: 20px">
<?php endif; ?>

    <h1 style="margin: 0;"><?php _e ('Preview', 'ad-inserter'); ?></h1>
<?php if ($block != 0) : ?>
    <h2><?php _e ('Block', 'ad-inserter'); ?> <?php echo $block; ?></h2>
<?php else : ?>
    <h2><?php _e ('AdSense ad unit', 'ad-inserter'); ?></h2>
<?php endif; ?>
    <h3 id="block-name" style="text-align: left;"><?php echo $block_name; ?></h3>
  </div>

<?php if (!$read_only) : ?>
  <div style="float: left; min-height: 200px; margin: 0 auto;">
    <table id="demo-box" class="demo-box" style="display: none;" cellspacing=0 cellspacing="0">
      <tr>
        <td class="demo-wrapper-margin-tb" style="border-right: 1px solid #ccc;" colspan="5">
          <span class="spinner normal">
            <span style="float: left; margin-left: 43px;">margin</span>
            <span style="float: right; margin-right: 70px">px</span>
            <input id="spinner-margin-top" name="value">
          </span>
        </td>
        <td class="demo-wrapper-background"></td>
      </tr>
      <tr>
        <td class="demo-wrapper-margin"></td>
        <td class="demo-code-padding-tb" style="border-top:1px solid #ccc; border-left: 1px solid #ccc; border-right: 1px solid #ccc;" colspan="3">
          <span class="spinner normal">
            <span style="float: left; margin-left: 14px;">padding</span>
            <span style="float: right; margin-right: 48px">px</span>
            <input id="spinner-padding-top" name="value">
          </span>
        </td>
        <td class="demo-wrapper-margin" style="border-right: 1px solid #ccc;"></td>
        <td class="demo-wrapper-background"></td>
      </tr>
      <tr>
        <td class="demo-wrapper-margin-lr">
          <span class="spinner normal">
            <input id="spinner-margin-left" name="value">
          </span>
        </td>
        <td class="demo-code-padding-lr" style="border-left: 1px solid #ccc;">
          <span class="spinner normal">
            <input id="spinner-padding-left" name="value">
          </span>
        </td>
        <td class="demo-code"><p><span class="name"><?php _e ('Block', 'ad-inserter'); ?></span><span class="name" style="display: none;"><?php _e ('Code', 'ad-inserter'); ?></span></p><p class="wrapper-size">&nbsp;</p></td>
        <td class="demo-code-padding-lr" style="border-right: 1px solid #ccc;">
          <span class="spinner normal">
            <input id="spinner-padding-right" name="value">
          </span>
        </td>
        <td class="demo-wrapper-margin-lr" style="border-right: 1px solid #ccc;">
          <span class="spinner normal">
            <input id="spinner-margin-right" name="value">
          </span>
        </td>
        <td class="demo-wrapper-background"></td>
      </tr>
      <tr>
        <td class="demo-wrapper-margin"></td>
        <td class="demo-code-padding-tb" style="border-bottom:1px solid #ccc; border-left: 1px solid #ccc; border-right: 1px solid #ccc;" colspan="3">
          <span class="spinner normal">
            <input id="spinner-padding-bottom" name="value">
          </span>
        </td>
        <td class="demo-wrapper-margin" style="border-right: 1px solid #ccc;"></td>
        <td class="demo-wrapper-background"></td>
      </tr>
      <tr>
        <td class="demo-wrapper-margin-tb" style="border-right: 1px solid #ccc;" colspan="5">
          <span class="spinner normal">
            <span style="float: left; margin-left: 2px; min-width: 72px;"><?php _e ('wrapping div', 'ad-inserter'); ?></span>
            <span style="float: right; margin-right: 72px">&nbsp;</span>
            <input id="spinner-margin-bottom" name="value">
          </span>
        </td>
        <td class="demo-wrapper-background"><?php _e ('background', 'ad-inserter'); ?></td>
      </tr>
    </table>

    <table id="demo-box-no-wrapping" class="demo-box" style="display: none;" cellspacing=0 cellspacing="0">
      <tr>
        <td class="demo-code" style="border-right: 1px solid #ccc;"><p><span class="name"><?php _e ('Block', 'ad-inserter'); ?></span><span class="name" style="display: none;"><?php _e ('Code', 'ad-inserter'); ?></span></p><p class="wrapper-size">&nbsp;</p></td>
        <td class="demo-wrapper-background"><?php _e ('background', 'ad-inserter'); ?></td>
      </tr>
    </table>
  </div>
<?php endif; ?>

  <div style="clear: both;"></div>

<?php if (!$read_only) : ?>
  <div id="alignment-editor" style="margin: 20px 0;">
<?php else : ?>
  <div style="margin: 10px 0;">
<?php check_count_rotate_code ($obj, $check, $count, $rotate, $viewport); ?>
  </div>
  <div id="alignment-editor" style="margin: 20px 0; display: none;">
<?php endif; ?>

<?php if (defined ('AI_STICKY_SETTINGS') && AI_STICKY_SETTINGS && $sticky) : ?>

    <div style="">

      <div style="margin: 10px 0;">
<?php if (!$read_only) check_count_rotate_code ($obj, $check, $count, $rotate, $viewport); ?>
      </div>

      <div style="float: left;">

        <?php _e ('Alignment', 'ad-inserter'); ?>
        &nbsp;&nbsp;&nbsp;
        <select id="block-alignment" style="min-width: 120px;">
<?php if (function_exists ('ai_preview_style_options')) ai_preview_style_options ($obj, $alignment_type, true); ?>
          <option data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-custom-css" value="<?php echo AI_ALIGNMENT_CUSTOM_CSS; ?>" data-title="<?php echo AI_TEXT_CUSTOM_CSS; ?>" <?php echo ($alignment_type == AI_ALIGNMENT_CUSTOM_CSS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CUSTOM_CSS; ?></option>
        </select>
        <span id="css-index" style="display: inline-block; min-width: 30px; min-height: 12px; margin: 0 0 0 10px; font-size: 14px;" title="CSS code index"></span>
        <div id="alignment-style" style="margin: 4px 0; min-height: 74px;"></div>
      </div>

      <div style="float: right; text-align: right;">
<?php if (function_exists ('ai_close_button_select')) ai_close_button_select (0, $close_button, $close_button, 'close-button-0'); ?>
        <div id="close-buttons" style="margin: 4px 0; min-height: 74px;"></div>
      </div>
      <div style="clear: both;"></div>

    </div>

    <div style="margin: 8px 0;">
      <div style="float: left;">
        <div style="margin: 4px 0;">
          <?php _e ('Horizontal position', 'ad-inserter'); ?>
          <select class="ai-image-selection" id="horizontal-position">
             <option
               data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>"
               data-img-class="automatic-insertion preview im-sticky-left"
               data-css="<?php echo AI_ALIGNMENT_CSS_STICK_TO_THE_LEFT; ?>"
               data-title="<?php echo AI_TEXT_STICK_TO_THE_LEFT; ?>"
               value="<?php echo AI_STICK_TO_THE_LEFT; ?>"
               <?php echo ($horizontal_position == AI_STICK_TO_THE_LEFT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_STICK_TO_THE_LEFT; ?></option>
             <option
               data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>"
               data-img-class="automatic-insertion preview im-sticky-content-left"
               data-css="<?php echo AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_LEFT; ?>"
               data-title="<?php echo AI_TEXT_STICK_TO_THE_CONTENT_LEFT; ?>"
               value="<?php echo AI_STICK_TO_THE_CONTENT_LEFT; ?>"
               <?php echo ($horizontal_position == AI_STICK_TO_THE_CONTENT_LEFT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_STICK_TO_THE_CONTENT_LEFT; ?></option>
             <option
               data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>"
               data-img-class="automatic-insertion preview im-sticky-center-horizontal"
               data-css="<?php echo AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL; ?>"
               data-css-<?php echo AI_STICK_VERTICAL_CENTER; ?>="<?php echo AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL_V; ?>"
               data-title="<?php echo AI_TEXT_CENTER; ?>"
               value="<?php echo AI_STICK_HORIZONTAL_CENTER; ?>"
               <?php echo ($horizontal_position == AI_STICK_HORIZONTAL_CENTER) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CENTER; ?></option>
             <option
               data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>"
               data-img-class="automatic-insertion preview im-sticky-content-right"
               data-css="<?php echo AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_RIGHT; ?>"
               data-title="<?php echo AI_TEXT_STICK_TO_THE_CONTENT_RIGHT; ?>"
               value="<?php echo AI_STICK_TO_THE_CONTENT_RIGHT; ?>"
               <?php echo ($horizontal_position == AI_STICK_TO_THE_CONTENT_RIGHT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_STICK_TO_THE_CONTENT_RIGHT; ?></option>
             <option
               data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>"
               data-img-class="automatic-insertion preview im-sticky-right"
               data-css="<?php echo AI_ALIGNMENT_CSS_STICK_TO_THE_RIGHT; ?>"
               data-css-<?php echo AI_SCROLL_WITH_THE_CONTENT; ?>="<?php echo AI_ALIGNMENT_CSS_STICK_TO_THE_RIGHT_SCROLL; ?>"
               data-title="<?php echo AI_TEXT_STICK_TO_THE_RIGHT; ?>"
               value="<?php echo AI_STICK_TO_THE_RIGHT; ?>"
               <?php echo ($horizontal_position == AI_STICK_TO_THE_RIGHT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_STICK_TO_THE_RIGHT; ?></option>
          </select>

          <div style="clear: both;"></div>
        </div>

        <div id="horizontal-positions"></div>

        <div class="spinner sticky" style="margin: 8px 0;">
          <span><?php _e ('Horizontal margin', 'ad-inserter'); ?> </span>
          <input id="spinner-horizontal-margin" name="value">
          <span> px</span>
        </div>
      </div>

      <div style="float: right;">
        <div style="margin: 4px 0;">
          <?php _e ('Vertical position', 'ad-inserter'); ?>
          <select id="vertical-position">
             <option
               data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>"
               data-img-class="automatic-insertion preview im-sticky-top"
               data-css="<?php echo AI_ALIGNMENT_CSS_STICK_TO_THE_TOP_OFFSET; ?>"
               data-css-<?php echo AI_STICK_HORIZONTAL_CENTER; ?>="<?php echo AI_ALIGNMENT_CSS_STICK_TO_THE_TOP; ?>"
               data-title="<?php echo AI_TEXT_STICK_TO_THE_TOP; ?>"
               value="<?php echo AI_STICK_TO_THE_TOP; ?>"
               <?php echo ($vertical_position == AI_STICK_TO_THE_TOP) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_STICK_TO_THE_TOP; ?></option>
             <option
               data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-sticky-center-vertical"
               data-css="<?php echo AI_ALIGNMENT_CSS_CENTER_VERTICAL; ?>"
               data-css-<?php echo AI_STICK_HORIZONTAL_CENTER; ?>="<?php echo AI_ALIGNMENT_CSS_CENTER_VERTICAL_H_ANIM; ?>"
               data-title="<?php echo AI_TEXT_CENTER; ?>"
               value="<?php echo AI_STICK_VERTICAL_CENTER; ?>"
               <?php echo ($vertical_position == AI_STICK_VERTICAL_CENTER) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CENTER; ?></option>
             <option
               data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>"
               data-img-class="automatic-insertion preview im-sticky-scroll"
               data-css="<?php echo AI_ALIGNMENT_CSS_SCROLL_WITH_THE_CONTENT; ?>"
               data-title="<?php echo AI_TEXT_SCROLL_WITH_THE_CONTENT; ?>"
               value="<?php echo AI_SCROLL_WITH_THE_CONTENT; ?>"
               <?php echo ($vertical_position == AI_SCROLL_WITH_THE_CONTENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_SCROLL_WITH_THE_CONTENT; ?></option>
             <option
               data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>"
               data-img-class="automatic-insertion preview im-sticky-bottom"
               data-css="<?php echo AI_ALIGNMENT_CSS_STICK_TO_THE_BOTTOM_OFFSET; ?>"
               data-css-<?php echo AI_STICK_HORIZONTAL_CENTER; ?>="<?php echo AI_ALIGNMENT_CSS_STICK_TO_THE_BOTTOM; ?>"
               data-title="<?php echo AI_TEXT_STICK_TO_THE_BOTTOM; ?>"
               value="<?php echo AI_STICK_TO_THE_BOTTOM; ?>"
               <?php echo ($vertical_position == AI_STICK_TO_THE_BOTTOM) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_STICK_TO_THE_BOTTOM; ?></option>
          </select>
          <div style="clear: both;"></div>
        </div>

        <div id="vertical-positions" style="float: right; margin-bottom: 4px;"></div>

        <div style="clear: both;"></div>

        <div class="spinner sticky" style="text-align: right; margin: 8px 0;">
          <span><?php _e ('Vertical margin', 'ad-inserter'); ?> </span>
          <input id="spinner-vertical-margin" name="value">
          <span> px</span>
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>

    <div style="margin: 8px 0;">
      <span style="vertical-align: middle;">
        <?php _e ('Animation', 'ad-inserter'); ?>
        <select id="animation">
           <option value="<?php echo AI_ANIMATION_NONE; ?>" <?php echo ($animation  == AI_ANIMATION_NONE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_NONE; ?></option>
           <option value="<?php echo AI_ANIMATION_FADE; ?>" <?php echo ($animation  == AI_ANIMATION_FADE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_FADE; ?></option>
           <option value="<?php echo AI_ANIMATION_SLIDE; ?>" <?php echo ($animation  == AI_ANIMATION_SLIDE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_SLIDE; ?></option>
           <option value="<?php echo AI_ANIMATION_SLIDE_FADE; ?>" <?php echo ($animation  == AI_ANIMATION_SLIDE_FADE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_SLIDE_FADE; ?></option>
           <option value="<?php echo AI_ANIMATION_TURN; ?>" <?php echo ($animation  == AI_ANIMATION_TURN) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_TURN; ?></option>
           <option value="<?php echo AI_ANIMATION_FLIP; ?>" <?php echo ($animation  == AI_ANIMATION_FLIP) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_FLIP; ?></option>
           <option value="<?php echo AI_ANIMATION_ZOOM_IN; ?>" <?php echo ($animation  == AI_ANIMATION_ZOOM_IN) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ZOOM_IN; ?></option>
           <option value="<?php echo AI_ANIMATION_ZOOM_OUT; ?>" <?php echo ($animation  == AI_ANIMATION_ZOOM_OUT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ZOOM_OUT; ?></option>
        </select>
      </span>
      <button id="animate-button" type="button" style="margin: 0 0 0 10px; height: 30px; font-size: 12px;"><?php _e ('Animate', 'ad-inserter'); ?></button>
    </div>


<?php else : ?>

    <div style="margin: 20px 0 0 0;">

      <?php check_count_rotate_code ($obj, $check, $count, $rotate, $viewport); ?>

      <div style="display: inline-block;">
        <div style="display: inline-block; vertical-align: middle;">
      <?php _e ('Alignment', 'ad-inserter'); ?>
        </div>

        <select id="block-alignment" style="min-width:120px; margin: 0 10px 0 5px;">
           <option data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-default" <?php alt_styles_data ($obj->alignment_style (AI_ALIGNMENT_DEFAULT, true)); ?> value="<?php echo AI_ALIGNMENT_DEFAULT; ?>" data-title="<?php echo AI_TEXT_DEFAULT; ?>" <?php echo ($alignment_type == AI_ALIGNMENT_DEFAULT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DEFAULT; ?></option>
           <option data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-align-left" <?php alt_styles_data ($obj->alignment_style (AI_ALIGNMENT_LEFT, true)); ?> value="<?php echo AI_ALIGNMENT_LEFT; ?>" data-title="<?php echo AI_TEXT_LEFT; ?>" <?php echo ($alignment_type == AI_ALIGNMENT_LEFT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_LEFT; ?></option>
           <option data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-center" <?php alt_styles_data ($obj->alignment_style (AI_ALIGNMENT_CENTER, true)); ?> value="<?php echo AI_ALIGNMENT_CENTER; ?>" data-title="<?php echo AI_TEXT_CENTER; ?>" <?php echo ($alignment_type == AI_ALIGNMENT_CENTER) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CENTER; ?></option>
           <option data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-align-right" <?php alt_styles_data ($obj->alignment_style (AI_ALIGNMENT_RIGHT, true)); ?> value="<?php echo AI_ALIGNMENT_RIGHT; ?>" data-title="<?php echo AI_TEXT_RIGHT; ?>" <?php echo ($alignment_type == AI_ALIGNMENT_RIGHT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_RIGHT; ?></option>
           <option data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-float-left" <?php alt_styles_data ($obj->alignment_style (AI_ALIGNMENT_FLOAT_LEFT, true)); ?> value="<?php echo AI_ALIGNMENT_FLOAT_LEFT; ?>" data-title="<?php echo AI_TEXT_FLOAT_LEFT; ?>" <?php echo ($alignment_type == AI_ALIGNMENT_FLOAT_LEFT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_FLOAT_LEFT; ?></option>
           <option data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-float-right" <?php alt_styles_data ($obj->alignment_style (AI_ALIGNMENT_FLOAT_RIGHT, true)); ?> value="<?php echo AI_ALIGNMENT_FLOAT_RIGHT; ?>" data-title="<?php echo AI_TEXT_FLOAT_RIGHT; ?>" <?php echo ($alignment_type == AI_ALIGNMENT_FLOAT_RIGHT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_FLOAT_RIGHT; ?></option>
<?php if (function_exists ('ai_preview_style_options')) ai_preview_style_options ($obj, $alignment_type); ?>
          <option data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-custom-css" value="<?php echo AI_ALIGNMENT_CUSTOM_CSS; ?>" data-title="<?php echo AI_TEXT_CUSTOM_CSS; ?>" <?php echo ($alignment_type == AI_ALIGNMENT_CUSTOM_CSS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CUSTOM_CSS; ?></option>
          <option data-img-src="<?php echo plugins_url ('css/images/blank.png', AD_INSERTER_FILE); ?>" data-img-class="automatic-insertion preview im-no-wrapping" value="<?php echo AI_ALIGNMENT_NO_WRAPPING; ?>" data-title="<?php echo AI_TEXT_NO_WRAPPING; ?>" <?php echo ($alignment_type == AI_ALIGNMENT_NO_WRAPPING) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_NO_WRAPPING; ?></option>
        </select>
      </div>
      <span id="css-index" style="display: inline-block; min-width: 30px; min-height: 12px; margin: 0 0 0 10px; font-size: 14px;" title="CSS code index"></span>
      &nbsp;&nbsp;&nbsp;
      <span id="close-button-selection" style="display: <?php echo $alignment_type == AI_ALIGNMENT_NO_WRAPPING || $close_button == AI_CLOSE_NONE ? 'none': 'inline'; ?>;">
<?php if (function_exists ('ai_close_button_select')) ai_close_button_select (0, $close_button, $close_button, 'close-button-0'); ?>
      </span>
    </div>

    <div id="alignment-style" style="margin: 4px 0; min-height: 74px;"></div>

<?php endif; ?>

    <table class="responsive-table"<?php if ($sticky) echo 'style="height: 60px;"'; ?>>
      <tr>
        <td style="vertical-align: middle; padding:0;">
          <span id="css-label" style="vertical-align: middle; margin: 4px 0 0 0 0; width: 36px; font-size: 14px; font-weight: bold; display: none;">CSS</span>
        </td>
        <td style="width: 100%; height: 32px; padding:0;">
          <input id="custom-css" style="width: 100%; display: inline-block; padding: 5px 0 0 3px; border-radius: 4px; display: none; font-size: 12px; font-family: monospace, Courier, 'Courier New'; font-weight: bold;" type="text" value="<?php echo $custom_css_code; ?>" size="70" maxlength="500" title="Custom CSS code for wrapping div" />
          <span style="width: 100%; display: inline-block; padding: 5px 0 0 5px; font-family: monospace, Courier, 'Courier New'; font-size: 12px; font-weight: bold; cursor: pointer; white-space: normal;">
            <span id="css-no-wrapping" style="vertical-align: middle; display: none;"></span>
            <span id="css-<?php echo AI_ALIGNMENT_DEFAULT; ?>" class="css-code" style="vertical-align: middle; display: none;" title="CSS code for wrapping div, click to edit"><?php echo $obj->alignment_style (AI_ALIGNMENT_DEFAULT); ?></span>
            <span id="css-<?php echo AI_ALIGNMENT_LEFT; ?>" class="css-code" style="vertical-align: middle;display: none;" title="CSS code for wrapping div, click to edit"><?php echo $obj->alignment_style (AI_ALIGNMENT_LEFT); ?></span>
            <span id="css-<?php echo AI_ALIGNMENT_RIGHT; ?>" class="css-code" style="vertical-align: middle;display: none;" title="CSS code for wrapping div, click to edit"><?php echo $obj->alignment_style (AI_ALIGNMENT_RIGHT); ?></span>
            <span id="css-<?php echo AI_ALIGNMENT_CENTER; ?>" class="css-code" style="vertical-align: middle;display: none;" title="CSS code for wrapping div, click to edit"><?php echo $obj->alignment_style (AI_ALIGNMENT_CENTER); ?></span>
            <span id="css-<?php echo AI_ALIGNMENT_FLOAT_LEFT; ?>" class="css-code" style="vertical-align: middle;display: none;" title="CSS code for wrapping div, click to edit"><?php echo $obj->alignment_style (AI_ALIGNMENT_FLOAT_LEFT); ?></span>
            <span id="css-<?php echo AI_ALIGNMENT_FLOAT_RIGHT; ?>" class="css-code" style="vertical-align: middle;display: none;" title="CSS code for wrapping div, click to edit"><?php echo $obj->alignment_style (AI_ALIGNMENT_FLOAT_RIGHT); ?></span>
<?php if (function_exists ('ai_preview_style_css')) ai_preview_style_css ($obj, $horizontal_position, $vertical_position, $horizontal_margin, $vertical_margin); ?>
          </span>
        </td>
        <td padding:0;>
          <button id="edit-css-button" type="button" style="margin: 0 0 0 10px; height: 30px; font-size: 12px; display: none;"><?php _e ('Edit', 'ad-inserter'); ?></button>
        </td>
      </tr>
    </table>
  </div>

<?php if (!$sticky) { ?>

<?php if (!$read_only) : ?>
    <p id="p1"><?php _e ('This is a preview of the code between dummy paragraphs. Here you can test various block alignments, visually edit margin and padding values of the wrapping div
or write CSS code directly and watch live preview. Highlight button highlights background, wrapping div margin and code area, while Reset button restores all the values to those of the current block.', 'ad-inserter'); ?></p>
<?php elseif (!$adsense) : ?>
    <p id="p1"><?php _e ('This is a preview of the saved block between dummy paragraphs. It shows the code with the alignment and style as it is set for this block. Highlight button highlights background, wrapping div margin and code area.', 'ad-inserter'); ?></p>
<?php else : ?>
    <p id="p1"><?php _e ('This is a preview of AdSense ad block between dummy paragraphs. AdSense ad code was loaded from your AdSense account. The ad block is displayed on a dummy page so it may be blank (no ads). Click on the Highlight button to highlight ad block.', 'ad-inserter'); ?></p>
<?php endif; ?>

<?php if (!$sticky) padding_margin_code ($close_button, $class, $sticky_parameters, $wrapper_css, $block_code); ?>

<?php if (!$read_only) : ?>
    <p id="p2"><?php _e ('You can resize the window (and refresh the page to reload ads) to check display with different screen widths.
Once you are satisfied with alignment click on the Use button and the settings will be copied to the active block.', 'ad-inserter'); ?></p>
    <p id="p3"><?php _e ("Please note that the code, block name, alignment and style are taken from the current block settings (may not be saved).
<strong>No wrapping</strong> style inserts the code as it is so margin and padding can't be set. However, you can use own HTML code for the block.", 'ad-inserter'); ?></p>
<?php else : ?>
<?php endif; ?>

    <p id="p4"><?php _e ("Ad Inserter can be configured to insert any code anywhere on the page. Each code with it's settings is called a block.
Free Ad Inserter supports 16 blocks, Ad Inserter Pro supports up to 96 blocks (depending on the license type).
The settings page is divided into tabs - 16 blocks and general plugin settings. Black number means inactive block (code is not inserted anywhere),
red number means block is using automatic insertion, blue number means block is using manual insertion while violet number means block is using automatic and manual insertion.", 'ad-inserter'); ?></p>

    <p id="p5"><?php _e ('Few very important things you need to know in order to insert code and display some ad:
Enable and use at least one insertion option (Automatic insertion, Widget, Shortcode, PHP function call).
Enable insertion on at least one WordPress page type (Posts, Static pages, Homepage, Category pages, Search pages, Archive pages).
Single pages (posts and static pages) have also additional setting for individual exceptions. Use default blank value unless you are using individual post/page exceptions.', 'ad-inserter'); ?></p>

<?php } else { ?>
    <p id="p1"><?php _e ('This is a preview of the code for sticky ads. Here you can test various horizontal and vertical alignments, close button locations, visually edit margin values
or write CSS code directly and watch live preview. Highlight button highlights background, margin and code area, while Reset button restores all the values to those of the current block.', 'ad-inserter'); ?></p>

    <p id="p2"><?php _e ("Ad Inserter can be configured to insert any code anywhere on the page. Each code with it's settings is called a block.
Free Ad Inserter supports 16 blocks, Ad Inserter Pro supports up to 96 blocks (depending on the license type).
The settings page is divided into tabs - 16 blocks and general plugin settings. Black number means inactive block (code is not inserted anywhere),
red number means block is using automatic insertion, blue number means block is using manual insertion while violet number means block is using automatic and manual insertion.", 'ad-inserter'); ?></p>

    <p id="p3"><?php _e ('Few very important things you need to know in order to insert code and display some ad:
Enable and use at least one insertion option (Automatic insertion, Widget, Shortcode, PHP function call).
Enable insertion on at least one WordPress page type (Posts, Static pages, Homepage, Category pages, Search pages, Archive pages).
Single pages (posts and static pages) have also additional setting for individual exceptions. Use default blank value unless you are using individual post/page exceptions.', 'ad-inserter'); ?></p>

    <p id="p4"><?php _e ("Ad Inserter can be configured to insert any code anywhere on the page. Each code with it's settings is called a block.
Free Ad Inserter supports 16 blocks, Ad Inserter Pro supports up to 96 blocks (depending on the license type).
The settings page is divided into tabs - 16 blocks and general plugin settings. Black number means inactive block (code is not inserted anywhere),
red number means block is using automatic insertion, blue number means block is using manual insertion while violet number means block is using automatic and manual insertion.", 'ad-inserter'); ?></p>

    <p id="p5"><?php _e ('Few very important things you need to know in order to insert code and display some ad:
Enable and use at least one insertion option (Automatic insertion, Widget, Shortcode, PHP function call).
Enable insertion on at least one WordPress page type (Posts, Static pages, Homepage, Category pages, Search pages, Archive pages).
Single pages (posts and static pages) have also additional setting for individual exceptions. Use default blank value unless you are using individual post/page exceptions.', 'ad-inserter'); ?></p>

    <p id="p6"><?php _e ("Ad Inserter can be configured to insert any code anywhere on the page. Each code with it's settings is called a block.
Free Ad Inserter supports 16 blocks, Ad Inserter Pro supports up to 96 blocks (depending on the license type).
The settings page is divided into tabs - 16 blocks and general plugin settings. Black number means inactive block (code is not inserted anywhere),
red number means block is using automatic insertion, blue number means block is using manual insertion while violet number means block is using automatic and manual insertion.", 'ad-inserter'); ?></p>

    <p id="p7"><?php _e ('Few very important things you need to know in order to insert code and display some ad:
Enable and use at least one insertion option (Automatic insertion, Widget, Shortcode, PHP function call).
Enable insertion on at least one WordPress page type (Posts, Static pages, Homepage, Category pages, Search pages, Archive pages).
Single pages (posts and static pages) have also additional setting for individual exceptions. Use default blank value unless you are using individual post/page exceptions.', 'ad-inserter'); ?></p>

    <p id="p8"><?php _e ("Ad Inserter can be configured to insert any code anywhere on the page. Each code with it's settings is called a block.
Free Ad Inserter supports 16 blocks, Ad Inserter Pro supports up to 96 blocks (depending on the license type).
The settings page is divided into tabs - 16 blocks and general plugin settings. Black number means inactive block (code is not inserted anywhere),
red number means block is using automatic insertion, blue number means block is using manual insertion while violet number means block is using automatic and manual insertion.", 'ad-inserter'); ?></p>

    <p id="p9"><?php _e ('Few very important things you need to know in order to insert code and display some ad:
Enable and use at least one insertion option (Automatic insertion, Widget, Shortcode, PHP function call).
Enable insertion on at least one WordPress page type (Posts, Static pages, Homepage, Category pages, Search pages, Archive pages).
Single pages (posts and static pages) have also additional setting for individual exceptions. Use default blank value unless you are using individual post/page exceptions.', 'ad-inserter'); ?></p>
<?php }  ?>

    <span class="ai-content"></span>
  </div>
  </div>

<?php ai_wp_footer_hook (); ?>
<script>
<?php if (function_exists ('ai_extract_features_2')) echo ai_get_js ('ai-cookie'), ai_get_js ('ai-close'); ?>
<?php
  if ($sticky) echo ai_get_js ('ai-sticky');
  echo ai_get_js ('ai-rotate');
  if (function_exists ('add_footer_inline_scripts_2')) {
    echo ai_get_js ('ai-load');
  }
  if ($sticky) echo "setTimeout (function() {AOS.init();}, 200);\n";
  if (defined ('AI_ADSENSE_OVERLAY')) {
    echo ai_get_js ('ai-ads');
  }
  if ($iframe_resize) {
    echo 'function ai_resize_iframe (iframe) {
  function getDocHeight (doc) {
    doc = doc || document;
    // from http://stackoverflow.com/questions/1145850/get-height-of-entire-document-with-javascript
    var body = doc.body, html = doc.documentElement;
    var height = Math.max (body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    return height;
  }

  function resizeIframe (iframe) {
    var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document;
    iframe.style.visibility = "hidden";
    iframe.style.height = "10px"; // reset to minimal height ...
    // IE opt. for bing/msn needs a bit added or scrollbar appears
    iframe.style.height = getDocHeight (doc) + "px";
    iframe.style.visibility = "visible";

    update_wrapper_size ();
  }

  setTimeout (function(){resizeIframe (iframe);}, 200);
}
';
  }
?>
</script>
</body>
</html>
<?php
}

