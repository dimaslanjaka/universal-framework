(function( $ ) {// jscs:ignore validateLineBreaks

  'use strict';
  var api;

  api = wpNavMenu;

  $( '#submit-shapelysection' ).on('click', function( evt ) {
    var section = $( '#shapelysectionsdiv' ).find( '#shapely-section-item-widget' ).val(),
        label = $( '#shapelysectionsdiv' ).find( '#shapely-section-item-name' ).val(),
        url = $( '#shapelysectionsdiv' ).find( '#shapely-section-item-url' ).val();

    evt.preventDefault();

    if ( '0' === section || '' === label || '' === url ) {
      $( '#shapelysectionsdiv' ).addClass( 'form-invalid' );
      return false;
    }

    $( '.customlinkdiv .spinner' ).addClass( 'is-active' );

    api.addItemToMenu( {
      '-1': {
        'menu-item-type': 'custom',
        'menu-item-extra': 'shapely-section',
        'menu-item-url': url,
        'menu-item-widget': section,
        'menu-item-title': label
      }
    }, api.addMenuItemToBottom, shapelyMenuAdded );

  } );

  function shapelyMenuAdded() {

    // Remove the ajax spinner
    $( '#shapelysectionsdiv .spinner' ).removeClass( 'is-active' );

    // Set custom link form back to defaults
    $( '#shapelysectionsdiv #shapely-section-item-widget' ).val( '0' ).trigger('blur');
    $( '#shapelysectionsdiv #shapely-section-item-url' ).val( '' ).trigger('blur');
    $( '#shapelysectionsdiv #shapely-section-item-name' ).val( '' ).trigger('blur');

  }

})( jQuery );
