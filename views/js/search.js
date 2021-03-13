var search_form = $('#search_form');
if (search_form.length){
  search_form.submit(function(e) {
    e.preventDefault();
    var v = $(this).find('[name="s"]').val().split(' ').join('+');
    return location.replace('/search/'+v);
  })
}