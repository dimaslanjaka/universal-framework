var ayat = $('[id^="ayat"]:not(#ayatPertama):not(#ayatTerakhir)');
var pageContent = $('#page-content p');
require("//cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/jquery.twbsPagination.min.js", function () {
  $('#pagination-demo').twbsPagination({
    totalPages: ayat.length,
    visiblePages: 3,
    next: 'Next',
    prev: 'Prev',
    onPageClick: function (event, page) {
      pageContent.slideUp('slow', function(){
        pageContent.text($('#ayat' + page).text());
        pageContent.slideDown('500');
      });
    }
  });
});

$(document).on('submit', 'form[id="rangeAyat"]', function (e) {
  e.preventDefault();
  var min = $(this).find('input#ayatPertama').val() - 1;
  var max = $(this).find('input#ayatTerakhir').val();
  var result = [];
  for (let index = min; index < max; index++) {
    const element = ayat[index];
    result.push(element.innerHTML + ' <small style="vertical-align:super;font-size: .75em;margin-left:4em;">[' + (index + 1) + ']</small> ');
  }
  console.log(result);
  pageContent.html(result.join('<br/>'));
});

function require(url, callback) {
  var e = document.createElement("script");
  e.src = url;
  e.type = "text/javascript";
  e.addEventListener('load', callback);
  document.getElementsByTagName("head")[0].appendChild(e);
}

