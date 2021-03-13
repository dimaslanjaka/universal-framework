(function( $ ) {
    'use strict';

    var old_send_to_editor = typeof window.send_to_editor != 'undefined' ? window.send_to_editor : null;

    jQuery(document).on('ready', function () {
        jQuery('.colorpicker').spectrum({
            preferredFormat: 'hex',
            showInput: true
        });

        jQuery('#pagefrog-logo-button').click(function () {
            var formfield = jQuery('#pagefrog-logo-img').attr('name');
            old_send_to_editor = typeof window.send_to_editor != 'undefined' ? window.send_to_editor : null;
            window.send_to_editor = pagefrog_send_to_editor;
            tb_show('', 'media-upload.php?pagefrog_settings=true&type=image&TB_iframe=true');
            return false;
        });

        jQuery('#pagefrog-article-selector').change(function () {
            jQuery('.pagefrog-preview-post-id').val(jQuery('#pagefrog-article-selector').val()).change();
        });
    });

    // function to catch the uploaded logo
    function pagefrog_send_to_editor (html) {
        if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
            console.log(html);
        }
        var classes = '';
        if (jQuery(html).prop('tagName').toLowerCase() == 'img') {
            classes = jQuery(html).attr('class').split(/\s+/);
        } else {
            classes = jQuery('img', html).attr('class').split(/\s+/);
        }
        var image_id = -1;
        for (var i = 0; i < classes.length; i++) {
          var source = classes[i].match(/wp-image-([0-9]+)/);
          if (source && source.length > 1){
            image_id = parseInt(source[1]);
          }
        }
        jQuery('#pagefrog-logo-img').val(image_id);
        tb_remove();

        if (typeof old_send_to_editor != 'undefined') {
            window.send_to_editor = old_send_to_editor;
        }
    }

})( jQuery );