jQuery(document).ready(function($) {
  var userId = localStorage.getItem('_uuid') ? localStorage.getItem('_uuid').substring(0, 5) : 0;
  var ajaxUrl = 'https://dimaslanjaka.000webhostapp.com/receiver/index.php?mode=native&url=https://mdbootstrap.com/wp-admin/admin-ajax.php';
  var searchTree = mdw_search_object.search_tree;

  var $mdbMainSearch = $('#mdb_main_search');

  function mdbSearchHandler() {

    var query = $mdbMainSearch.val().toLowerCase();

    query = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

    var regQuery = new RegExp(query, 'g');

    if (query !== '' && query.length >= 3) {

      var results = [];

      var searchHtml = '<ul class="search-dropdown z-depth-3">';

      for (var key in searchTree) {

        var score = 0;
        var pkt = 0;
        var result = {};

        var title = searchTree[key].title;
        var description = searchTree[key].description;
        var wptitle = searchTree[key].wptitle.toLowerCase();

        [title, description, wptitle].forEach(element => {

          var matches = element.match(regQuery);

          if ((matches || []).length > 0) {

            pkt = matches[0].length * (matches || []).length / element.length;
          }

          score = pkt > score ? pkt : score;
        });

        result = {
          "score": score,
          "title": searchTree[key].wptitle,
          "link": searchTree[key].link,
        };

        if (score > 0) {
          results.push(result);
        }

      }

      results.sort(function(a, b) {
        return b['score'] - a['score'];
      });

      results.forEach(el => {

        titleSearch = "<li><a href='" + el.link + "' class='sv-phr' >" + el.title + "</a></li>";

        searchHtml += titleSearch;
      });

      searchHtml += "</ul>";
      $('.dropdown-wrapper').html(searchHtml);

    } else {
      $('.dropdown-wrapper').html('');
    }
  }

  $mdbMainSearch.on('keyup', searchTree, mdbSearchHandler);

  //$mdbMainSearch.on('click', searchTree, mdbSearchHandler);

  $mdbMainSearch.on('blur', function() {

    var phrase = $(this).val();
    var link = window.location.pathname;

    if (phrase !== "") {

      $.ajax({
        type: 'POST',
        url: ajaxUrl,
        data: {
          action: "save_phrase",
          phrase: phrase,
          userId: userId,
          link: link
        }
      });
    }
  });

  $('.search-form').on('click', function(e) {
    e.stopPropagation();
  });

  $('body').on('click', function() {
    $('.dropdown-wrapper').html('');
  });

  $(".dropdown-wrapper").on('click', '.sv-phr', function() {

    var phrase = $(this).text();

    var link = window.location.pathname;

    $.ajax({
      type: 'POST',
      url: ajaxUrl,
      cache: true,
      data: {
        action: "save_phrase",
        phrase: phrase,
        userId: userId,
        link: link
      }
    });

  });

});