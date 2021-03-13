//supplier js
$('[name="supplier"]').on('keyup change', function(){
  var t = $(this), v = t.val();
  var em = t.parents('form').find('[name="email"]');
  var mv = v+'@'+location.host, mv = mv.replace(/\s+/gm, ''), mv = mv.toLowerCase();
  em.val(mv);
});