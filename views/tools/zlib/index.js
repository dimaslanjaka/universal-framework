smartform();

framework().js('/node_modules/pako/dist/pako.min.js', function() {

  $('textarea#raw').change(function(e) {
    e.preventDefault();
    var t = $(this);
    var comp = ZLIB.compress(t.val().toString().trim());
    $('textarea#enc').val(comp);
    $('textarea#decraw').val(comp).trigger('change');
    $.ajax({
      url: location.href,
      silent: true,
      indicator: false,
      method: 'POST',
      data: {
        str: t.val().toString().trim(),
        compress: true
      },
      success: function(res) {
        console.log(res);
      }
    });
  });

  $('textarea#decraw').change(function(e) {
    e.preventDefault();
    var t = $(this);

    $.ajax({
      url: location.href,
      silent: true,
      indicator: false,
      method: 'POST',
      data: {
        str: t.val().toString().trim(),
        decompress: true
      },
      success: function(res) {
        console.log(res);
      }
    });

    $('textarea#dec').val(ZLIB.decompress(t.val().toString().trim()));
  });

  /*
  const utf8_encoder = new TextEncoder('utf-8');
  const utf8_decoder = new TextDecoder('utf-8');
  console.log('zlib_cookies', Cookies.get('zlib'));
  console.log('zlib_rawcookies', pako.inflateRaw(Cookies.get('zlib'), {
    to: 'string'
  }));
  console.log('zlib_encode_cookies', pako.deflateRaw('yes', {
    to: 'string'
  }));
  */
  var set = Cookies.set('zc', Cookies.compress('yes'), 5, 'm', location.pathname);
  console.log('cookie_set', set);
});