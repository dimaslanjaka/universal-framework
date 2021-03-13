jQuery('[id="pbtn"]').click(function(e){
  e.preventDefault();
  var b = jQuery(this).parent('#im');
      var c = jQuery(this).parents('.card-body').find('div.embed-responsive');
  b.hide();
  c.removeClass('d-none').show();
});
