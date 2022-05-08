(function( $ ) {
    'use strict';

    jQuery(document).on('ready', function () {
        jQuery(document).on('click', '.nav>li>a', function (e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery('.tab-pane').removeClass('active');
            jQuery(jQuery(this).attr('href')).addClass('active');
            jQuery('.nav>li').removeClass('active');
            jQuery(this).parent().addClass('active');
        });
    });

})( jQuery );    
