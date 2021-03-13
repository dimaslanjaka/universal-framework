jQuery(function(){
  'use strict'

  // This template is mobile first so active menu in navbar
  // has submenu displayed by default but not in desktop
  // so the code below will hide the active menu if it's in desktop
  if(window.matchMedia('(min-width: 992px)').matches) {
    jQuery('.az-navbar .active').removeClass('show');
  }

  // Shows header dropdown while hiding others
  jQuery('.az-header .dropdown > a').on('click', function(e) {
    e.preventDefault();
    jQuery(this).parent().toggleClass('show');
    jQuery(this).parent().siblings().removeClass('show');
  });

  // Showing submenu in navbar while hiding previous open submenu
  jQuery('.az-navbar .with-sub').on('click', function(e) {
    e.preventDefault();
    jQuery(this).parent().toggleClass('show');
    jQuery(this).parent().siblings().removeClass('show');
  });

  // this will hide dropdown menu from open in mobile
  jQuery('.dropdown-menu .az-header-arrow').on('click', function(e){
    e.preventDefault();
    jQuery(this).closest('.dropdown').removeClass('show');
  });

  // this will show navbar in left for mobile only
  jQuery('#azNavShow, #azNavbarShow').on('click', function(e){
    e.preventDefault();
    jQuery('body').addClass('az-navbar-show');
  });

  // this will hide currently open content of page
  // only works for mobile
  jQuery('#azContentLeftShow').on('click touch', function(e){
    e.preventDefault();
    jQuery('body').addClass('az-content-left-show');
  });

  // This will hide left content from showing up in mobile only
  jQuery('#azContentLeftHide').on('click touch', function(e){
    e.preventDefault();
    jQuery('body').removeClass('az-content-left-show');
  });

  // this will hide content body from showing up in mobile only
  jQuery('#azContentBodyHide').on('click touch', function(e){
    e.preventDefault();
    jQuery('body').removeClass('az-content-body-show');
  })

  // navbar backdrop for mobile only
  jQuery('body').append('<div class="az-navbar-backdrop"></div>');
  jQuery('.az-navbar-backdrop').on('click touchstart', function(){
    jQuery('body').removeClass('az-navbar-show');
  });

  // Close dropdown menu of header menu
  jQuery(document).on('click touchstart', function(e){
    e.stopPropagation();

    // closing of dropdown menu in header when clicking outside of it
    var dropTarg = jQuery(e.target).closest('.az-header .dropdown').length;
    if(!dropTarg) {
      jQuery('.az-header .dropdown').removeClass('show');
    }

    // closing nav sub menu of header when clicking outside of it
    if(window.matchMedia('(min-width: 992px)').matches) {
      var navTarg = jQuery(e.target).closest('.az-navbar .nav-item').length;
      if(!navTarg) {
        jQuery('.az-navbar .nav-item').removeClass('show');
      }
    }
  });


});
