(function ( $ ) {
    'use strict';

    jQuery(document).ready(function () {
        jQuery(document).on('click', '.pagefrog-show-preview', function (e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery('#pagefrog-preview-modal .pagefrog-preview-post-id').val(jQuery(this).attr('data-post-id')).change();
            tb_show(jQuery(this).attr('data-post-title'), '#TB_inline?inlineId=pagefrog-preview-modal&height=670&width=450');
            jQuery('#TB_window').css({
                width:450
            });
        });
    });

})( jQuery );