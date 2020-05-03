var formotpc = $('form#otpc');
formotpc.fadeOut('fast');
var formotpr = $('form#otp');
var info = $('#msisdn-info');
var fnx = $('#fn');
var tfn = $('#tfn');
var puk1 = $('#puk1');
var puk2 = $('#puk2');
var imgwel = $('#imgwel');
var pkdt = $('#pkdt');
var pkgs = $('select[id^="pkg-stats"]');
var pkgls = $('select#pkgls'); // package select list
var pkgr = $('button#pkg-refresh'); //package refresh
var pkgb = $('button#pkg-buy'); //package buy
if (pkgb.length) {
  pkgb.click(function(e) {
    e.preventDefault();
    var id = $('select#pkgls').val();
    if (id) {
      $.post(location.protocol + '//' + location.host + '/tsel-paket-info', {
        'paket-id': id
      }, function(res) {
        res.child('id', function(pkgid) {
          $.post(location.protocol + '//' + location.host + '/tsel-paket-buy', {
            'paket-id': pkgid
          }, function(res) {
            console.log(res);
            if (typeof res == 'object') {
              res.child('error', function(error) {
                if (error) {
                  res.child('message', function(msg) {
                    switch (msg.toLowerCase()) {
                      case 'access token required':
                        msg = 'Login OTP required, please login number first';
                        break;

                      default:
                        break;
                    }
                    toastr.error(msg, 'package info');
                  });
                }
              });
            }
          });
        })
      });

    } else {
      toastr.error('Package not selected, please select one', 'package info');
    }
  });
}
var list_pkg = function(refresh) {
  $.ajax({
    type: 'POST',
    url: location.protocol + '//' + location.host + '/tsel-paket-info',
    data: {
      list: true
    },
    success: function(data) {
      if (data.hasOwnProperty('message')) {
        toastr.error(data.message, 'package info');
      }
      pkgls.empty();
      pkgls.append('<option value="" disabled selected>Select package</option>');
      var shows;
      for (var i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty('name')) {
          shows = true;
        } else {
          continue;
        }
        pkgls.append(`<option value="${data[i].id}">${data[i].name} ${data[i].quota} ${data[i].price} ${data[i].period}</option>`);
        if (refresh && shows && i == data.length - 1) {
          toastr.success('Packages refreshed successfully', 'package info');
        }
      }
      //pkgls.change();
    }
  });
}
if (pkgls.length) {
  list_pkg();
}
if (pkgr.length) {
  pkgr.click(function(e) {
    e.preventDefault();
    list_pkg(true);
  });
}
if (pkgs.length) {
  pkgs.change(function(e) {

    e.preventDefault();
    var value = $(this).val();
    var id = $(this).data('id');
    console.log(`changing status of package ${value} for ${id}`);
    $.post(location.protocol + '//' + location.host + '/dashboard', {
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
if (pkdt.length) {
  var preq;
  var pkgl = $('#pkg-loading');
  pkgl.fadeOut('fast');
  var tbc = $('#paket-details');
  pkdt.on('change keyup', function(e) {
    e.preventDefault();
    var value = $(this).val();
    if (!value || value == '') {
      return;
    }
    if (preq) {
      preq.abort();
    }
    pkgl.fadeIn('slow');
    preq = $.post(location.protocol + '//' + location.host + '/tsel-paket-info', {
      'paket-id': value
    }, function(res) {
      if (typeof res != 'object') {
        console.error('res is not object');
        return;
      }
      var size = Object.size(res);
      tbc.html('');
      pkgl.fadeOut('slow');
      var i = 0;
      for (key in res) {
        i++;
        //console.log(size, i);
        var tbdv = res[key];
        if (typeof tbdv == 'object') {
          tbdv = `<pre>${JSON.stringify(tbdv, null, 4)}</pre>`;
        }
        tbc.append(`<tr><td>${key}</td><td >${tbdv}</td></tr>`);
        if (i == size) {
          toastr.warning("<button type='button' id='cYes' class='btn clear btn-block btn-success'>Yes</button>", `add package ${value} ?`, {
            closeButton: true,
            allowHtml: true,
            onShown: function(toast) {
              $("#cYes").click(function() {
                console.log('clicked yes');
                $.post(location.protocol + '//' + location.host + '/dashboard', {
                  'add-pkg': 1,
                  id: value
                }, function(res) {
                  console.log(res);
                  if (typeof res == 'string') {
                    if (res.includes('Duplicate entry')) {
                      return toastr.error('package id already added', 'package info');
                    }
                  }
                  if (typeof res == 'object') {

                  }
                  return toastr.success('package added successfully', 'package info');
                });
              });
            }
          }, {
            timeOut: 0,
            extendedTimeOut: 0,
            closeHtml: '<button><i class="fas fa-times"></i></button>',
            closeMethod: 'fadeOut',
            closeDuration: 60000,
            closeEasing: 'swing',
            preventDuplicates: true,
            progressBar: true
          });
        }
      }
    });
  });
}


var check_msisdn = function(relogin) {
  if (!relogin) {
    $.post(location.protocol + '//' + location.host + '/tsel-profile2', {}, function(res) {
      console.log(res);
      if (res && typeof res == 'object') {
        res.child('puk', function(puk) {
          puk1.html(puk.profiles.puk1);
          puk2.html(puk.profiles.puk2);
          res.child('me', function(me) {
            //formotpc.fadeOut();
            //formotpr.fadeOut();
            fnx.html(`Welcome, ${me.title} ${me.givenName} ${me.sn}`);
            tfn.html(`Account status ${me.accountStatus}`);
            var today = new Date();
            var curHr = today.getHours();
            var src = imgwel.attr('src');
            if (today.getHours() < 12) {
              src = 'https://www.lovethispic.com/uploaded_images/361167-Good-Morning-And-Have-A-Nice-Day.jpg';
            } else if (today.getHours() >= 12 && today.getHours() <= 14) {
              src = 'https://www.goodmorningimagesdownload.com/wp-content/uploads/2019/08/good-afternoon-pics-17.jpg';
            } else if (today.getHours() > 14 && today.getHours() <= 22) {
              src = 'https://www.lovethispic.com/uploaded_images/361528-Good-Evening-Take-Care.jpg';
            } else {
              src = 'https://www.happybirthdaymsg.com/wp-content/uploads/2015/11/good-night-image-5.jpg';
            }
            $('#imgwel').attr('src', src);
          });
        });
      }
    });
  }
}

check_msisdn();

$('form#otpc #back').click(function(e) {
  e.preventDefault();
  formotpc.fadeOut('slow', function() {
    formotpr.fadeIn('slow');
  });
});

formotpr.on('submit', function(e) {
  e.preventDefault();
  var data = $(this).serialize();
  requestOTP(data);
});
formotpc.on('submit', function(e) {
  e.preventDefault();
  var data = $(this).serialize();
  verifyOTP(data);
});

function requestOTP(data) {
  $.post(location.protocol + '//' + location.host + '/tsel-otp', data, function(res) {
    console.log(res);
    if (res && typeof res == 'object') {
      res.child('response', function(resp){
        //console.log(resp);
        res = resp.body;
      });
      res.child('error-codes', function(hasres) {
        if (hasres) {
          console.log('recaptcha failure');
          gexec('reloadForm', true, function(token) {
            formotpc = $('form#otp');
            requestOTP(formotpc.serialize());
          });
        }
      });
      res.child('authId', function(auth) {
        toastr.success('otp request successfully', 'otp information');
        formotpr.fadeOut('slow', function(e) {
          formotpc.fadeIn('slow');
        });
      });
      res.child('message', function(msg) {
        toastr.error(msg, 'otp information'.toUpperCase());
      });
      res.child('tokenId', function(token) {
        $.post(location.protocol + '//' + location.host + '/tsel-get', {
          tokenId: res.tokenId
        }, function(resp) {
          console.log(resp);
          toastr.success('Relogin successfully', 'login information'.toUpperCase());
          formotpc.fadeOut('slow');
          check_msisdn();
        });
      });
    }
  });
}

function verifyOTP(data) {
  $.post(location.protocol + '//' + location.host + '/tsel-callback', data, function(res) {
    console.log(res);
    if (res && typeof res == 'object') {
      if (res.hasOwnProperty('response')){
        res = res.response.body;
      }
      res.child('response', function(resp){
        res = resp.body;
      });
      console.log(res);
      res.child('tokenId', function(token) {
        $.post(location.protocol + '//' + location.host + '/tsel-get', {
          tokenId: res.tokenId
        }, function(resp) {
          console.log(resp);
          toastr.success('Login request successfully'.capitalize(), 'login information'.toUpperCase());
          formotpc.fadeOut('slow');
          check_msisdn();
        });
      });
      res.child('authId', function(auth){
        toastr.error('Login request failed'.capitalize(), 'login information'.toUpperCase());
      });
      res.child('message', function(msg) {
        toastr.error(msg, 'otp information'.toUpperCase());
      });
    }
  })
}

///==== admin
if ($('form#regist').length) {
  $('form#regist').submit(function(e) {
    e.preventDefault();
    $.post(location.protocol + '//' + location.host + '/signup', $(this).serialize(), function(res) {
      if (res) {
        if (typeof res == 'object') {
          res.child('success', function(success) {
            if (success === true) {
              toastr.success('User created successfully'.capitalize(), 'user management'.toUpperCase());
            }
          });
        }
      }
    });
  });
}
if ($('a[href="#change"]').length) {
  $('a[href="#change"]').click(function(e) {
    e.preventDefault();
    var id = $(this).data('id');
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your password",
          type: "text"
        },
      },
    }).then((value) => {
      $.post(location.protocol + '//' + location.host + '/user', {
        change: 'password',
        id: id,
        value: value
      }, function(res) {
        res.child('success', function(s) {
          if (s) {
            toastr.success('Password changed successfully', 'user management');
          }
        })
      });
    });
  });
}
if ($('a[href="#delete"]').length) {
  $('a[href="#delete"]').click(function(e) {
    e.preventDefault();
    var id = $(this).data('id');
    swal({
        title: "Are you sure?".capitalize(),
        text: "Once deleted, you will not be able to recover this user!".capitalize(),
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          $.post(location.protocol + '//' + location.host + '/user', {
            id: id,
            delete: true
          }, function(res) {
            swal("Poof! User has been deleted!".capitalize(), {
              icon: "success",
            });
          });
        } else {
          swal("User file is safe!");
        }
      });
  });
}
if ($('select[id^="role"]').length) {
  $('select[id^="role"]').change(function() {
    var id = $(this).data('id');
    var value = $(this).val();
    console.log(id, value);
    if (id && value) {
      $.post(location.protocol + '//' + location.host + '/user', {
        change: 'role',
        id: id,
        value: value
      }, function(res) {
        res.child('success', function(s) {
          if (s) {
            toastr.success('Role changed successfully'.capitalize(), 'user management'.toUpperCase());
          }
        })
      });
    }
  });
}
if ($('#dtMaterial').length) {
  $('#dtMaterial').DataTable();
  $('#dtMaterial_wrapper').find('label').each(function() {
    $(this).parent().append($(this).children());
  });
  $('#dtMaterial_wrapper .dataTables_filter').find('input').each(function() {
    const $this = $(this);
    $this.attr("placeholder", "Search");
    $this.removeClass('form-control-sm');
  });
  $('#dtMaterial_wrapper .dataTables_length').addClass('d-flex flex-row');
  $('#dtMaterial_wrapper .dataTables_filter').addClass('md-form');
  $('#dtMaterial_wrapper select').removeClass('custom-select custom-select-sm form-control form-control-sm');
  $('#dtMaterial_wrapper select').addClass('mdb-select');
  $('#dtMaterial_wrapper .mdb-select').materialSelect();
  $('#dtMaterial_wrapper .dataTables_filter').find('label').remove();
}