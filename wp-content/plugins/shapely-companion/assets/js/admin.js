jQuery( document ).ready(function() {// jscs:ignore validateLineBreaks

    jQuery( '#demo_content .button' ).click(function( evt ) {
        var currentButton = jQuery( this );
        var ajaxData = { 'action': 'shapely_companion_import_content', 'import': jQuery( this ).data( 'action' ) };
        evt.preventDefault();
        jQuery( this ).addClass( 'disabled' );
        jQuery( this ).next( '.spinner' ).addClass( 'is-active' );
        jQuery.ajax({
            type: 'POST',
            data: ajaxData,
            url: shapelyCompanion.ajaxurl,
            success: function( data ) {
                if ( 'succes' === data ) {
                    currentButton.removeClass( 'disabled' );
                    currentButton.next( '.spinner' ).removeClass( 'is-active' );
                    currentButton.parent().parent().find( '.updated-message' ).show();
                    location.reload();
                }

            }

        });

    });

});

jQuery(function( $ ) {
    var mediaControl = {

        // Initializes a new media manager or returns an existing frame.
        // @see wp.media.featuredImage.frame()
        selector: null,
        size: null,
        container: null,
        frame: function() {
            if ( this._frame ) {
                return this._frame;

            }

            this._frame = wp.media({
                title: 'Media',
                button: {
                    text: 'Update'
                },
                multiple: false
            });

            this._frame.on( 'open', this.updateFrame ).state( 'library' ).on( 'select', this.select );

            return this._frame;

        },

        select: function() {

            // Do something when the "update" button is clicked after a selection is made.
            var id = $( '.attachments' ).find( '.selected' ).attr( 'data-id' );
            var selector = $( '.shapely-media-control' ).find( mediaControl.selector );
            var data = {
                action: 'shapely_get_attachment_media',
                attachment_id: id
            };

            if ( ! selector.length ) {
                return false;

            }

            jQuery.post( shapelyCompanion.ajaxurl, data, function( response ) {
                var ext = response.substr( ( response.lastIndexOf( '.' ) + 1 ) );
                if ( 'mp4' !== ext ) {
                    $( mediaControl.container ).find( 'img' ).attr( 'src', response );
                }

                selector.val( response ).change();

            });

        },

        init: function() {
            var context = $( '#wpbody, .wp-customizer' );
            context.on( 'click', '.shapely-media-control > .upload-button', function( e ) {
                var container = $( this ).parent(),
                    sibling = container.find( '.image-id' ),
                    id = sibling.attr( 'id' );
                e.preventDefault();
                mediaControl.size = $( '[data-delegate="' + id + '"]' ).val();
                mediaControl.container = container;
                mediaControl.selector = '#' + id;
                mediaControl.frame().open();

            });

            context.on( 'click', '.shapely-media-control > .remove-button', function( e ) {
                var container = $( this ).parent(),
                    sibling = container.find( '.image-id' ),
                    img = container.find( 'img' );
                e.preventDefault();
                img.attr( 'src', img.attr( 'data-default' ) );
                sibling.val( '' ).trigger( 'change' );

            });

        }

    };

    mediaControl.init();
});
