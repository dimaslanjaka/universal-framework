var pkgs = $('select[id^="pkg-stats"]');
var pkgls = $('select#pkgls'); // package select list
var pkgr = $('button#pkg-refresh'); //package refresh

// change package status
if (pkgs.length) {
  pkgs.change(function(e) {
    e.preventDefault();
    var value = $(this).val();
    var id = $(this).data('id');
    toastr.info(`changing status of package ${value} for ${id}`);
    $.post(location.href, {
      id: id,
      status: value,
      'status-pkg': 1
    }, function(res) {
      if (typeof res == 'object') {
        res.child('success', function(success) {
          if (success) {
            toastr.success('Package status changed successfully', 'package info');
          }
        });
      }
    });
  });
}






