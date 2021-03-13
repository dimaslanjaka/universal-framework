var aform = $('[form]');
if (aform.length > 1){
  aform.click(function(e){
    e.preventDefault()
    $('form#'+$(this).attr('form')).submit()
  })
}