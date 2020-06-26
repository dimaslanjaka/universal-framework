var url = new URL(location.href);
try {
  var c = url.searchParams.get("c");
  try {
    t = window.atob(c);
    rs = document.getElementById('result_txt');
    if (rs) {
      if (window.btoa(t) == c) {
        rs.innerHTML = t;
      } else {
        rs.innerHTML = '<s'+'c'+'r'+'i'+'p'+'t async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></s'+'c'+'r'+'i'+'p'+'t>\
        <!-- Responsive -->\
        <ins class="adsbygoogle"\
             style="display:block"\
             data-ad-client="ca-pub-7975270895217217"\
             data-ad-slot="4722632936"\
             data-ad-format="auto"\
             data-full-width-responsive="true"></ins>\
        <s'+'c'+'r'+'i'+'p'+'t>\
             (adsbygoogle = window.adsbygoogle || []).push({});\
        </s'+'c'+'r'+'i'+'p'+'t>';
      }
    }

  } catch (e) {
    console.log(e);
  }
} catch (u) {
  console.log(u);
}