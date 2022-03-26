/* jshint es3:false, esversion:6 */
/* jshint -W117 */
(function( $ ) {// jscs:ignore validateLineBreaks
  'use strict';
  $( document ).ready( function() {

    /* Clonning of Logo Client Widgets */
    $( document ).on( 'widget-added widget-updated', function( e, widget ) {
      shapelySort();
      shapelyCreateColorPicker();
      let context = $( widget ).find( '.shapely-editor-container' );
      $( context ).each( function() {
        shapelyCompanion.textEditor.init( $( this ) );
      } );
    } );

    shapelySort();
    shapelyCreateColorPicker();

    /* Client widget sorting and cloning*/
    /* Font awsome selector */
    $( 'select.shapely-icon' ).on('change', function() {
      $( this ).siblings( 'span' ).removeClass().addClass( 'fa ' + $( this ).val() );
    } );

    /*
     * Function for sorting
     */
    function shapelySort() {
      $( '.client-sortable' ).sortable( {
        handle: '.logo_heading'
      } ).bind( 'sortupdate', function() {
        let index = 0, img;
        let attrname = $( this ).find( 'input:first' ).attr( 'name' );
        let attrbase = attrname.substring( 0, attrname.indexOf( '][' ) + 1 );
        let attrid = $( this ).find( 'input:first' ).attr( 'id' );
        let attrbaseid = attrid.substring( 0, attrid.indexOf( '-client_logo' ) + 13 );

        $( this ).find( 'li' ).each( function() {
          $( this ).find( '.count' ).html( index + 1 );
          $( this ).find( '.image-id' ).attr( 'id', attrbaseid + index ).attr( 'name', attrbase + '[client_logo][img]' + '[' + index + ']' );
          $( this ).find( '.shapely-media-control' ).attr( 'data-delegate-container', attrbaseid + index );
          $( this ).find( 'img' ).attr( 'id', 'link-' + index ).attr( 'name', attrbase + '[client_logo][link]' + '[' + index + ']' ).trigger( 'change' );
          index++;
        } );
      } );

      /* Cloning */
      $( '.clone-wrapper' ).cloneya().on( 'after_append.cloneya after_delete.cloneya', function( toClone, newClone ) {
        let img = $( newClone ).next( 'li' ).find( 'img' );
        $( '.client-sortable' ).trigger( 'sortupdate' );
        img.attr( 'src', img.attr( 'data-default' ) );
      } );

    }

    function shapelyCreateColorPicker() {
      let context = $( '#widgets-right' );
      let colorPickers = context.find( '.shapely-color-picker' );
      if ( colorPickers.length > 0 ) {
        $.each( colorPickers, function() {
          if ( ! $( this ).hasClass( 'wp-color-picker' ) ) {
            $( this ).wpColorPicker( {
              change: function( $this, ui ) {
                let color = $( $this.target ).wpColorPicker( 'color' );
                $( $this.target ).val( color ).trigger( 'change' );
              }
            } );
          }
        } );
      }
    }

    let shapelyCompanion = {};
    shapelyCompanion.textEditor = {
      init: function( selector ) {
        let context = $( selector ),
            editorId = $( context.find( 'textarea' ) ).attr( 'id' );

        if ( tinymce.get( editorId ) ) {
          wp.editor.remove( editorId );
        }

        wp.editor.initialize( editorId, {
          tinymce: {
            browser_spellcheck: true,
            mediaButtons: false,
            wp_autoresize_on: true,
            toolbar1: 'bold,italic,link,strikethrough',
            wpautop: true,
            setup: function( editor ) {
              editor.on( 'change', function() {
                editor.save();
                $( editor.getElement() ).trigger( 'change' );
              } );
            }
          },
          quicktags: true
        } );
      }
    };

    /**
     * #widgets-right is absolutely needed to get this to actually work;
     * The widgets panel is split into two (with cloned HTML): #widgets-right (clone of #widgets-left) or #widgets-left
     *
     * Without specifying the exact widget area you're looking to initialise, you're going to run into the risk of initialising TinyMCE twice
     */
    $( '#widgets-right .shapely-editor-container' ).each( function() {
      shapelyCompanion.textEditor.init( $( this ) );
    } );
  } );
})( jQuery );
