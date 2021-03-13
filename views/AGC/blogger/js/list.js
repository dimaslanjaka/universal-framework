_fetch(typeof bloggerId != 'undefined' ? build_query_blogger(bloggerId) : false);

$('#blogger_paging').click(function (e) {
  e.preventDefault();
  //console.log($(this).data('api'))
  _fetch($(this).data('api'));
});
$(document).on('click', '.edit-post', function (e) {
  e.preventDefault();
  var href = `/AGC/blogger/edit/${$(this).data('blog')}/${$(this).data('id')}`;
  location.replace(href);
});

function build_query_blogger(blogId, pageToken) {
  if (!blogId) {
    toastr.error('you will redirected to blog selector in 3 secs', 'Blogger ID is required');
    setTimeout(function () {
      location.replace('/AGC/blogger');
    }, 3000);
    throw 'Blogger ID is required';
    //blogId = '2771056599229295027';
  }
  var query = {
    key: GAPPID,
    maxResults: 100
  };
  if (pageToken) {
    query.pageToken = pageToken;
  }
  return `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?${jQuery.param(query)}`;
}

function _fetch(API) {
  if (!API) {
    API = build_query_blogger();
  }
  $.getJSON(API, listPosts);
}

var IDs = [];

function listPosts(response) {
  var post_number = Object.keys(response.items).length; //number of posts
  var blogger_wrapper = $('#post_blogger');
  for (var i = 0; i < post_number; i++) {
    var item = response.items[i];
    var ID = 'post_' + item.id;
    if (!inArray(item.id, IDs)) {
      IDs.push(item.id);
      blogger_wrapper.append('<tr><td class="mb-2"><a data-toggle="tooltip" title="' + item.url + '">' + item.title + '</a></td><td><button data-toggle="collapse" data-target="#wrapper_' + ID + '" class="btn btn-sm btn-info"><i class="fas fa-info fa-sm mr-1"></i> Expand Information</button> <button class="btn btn-warning edit-post" data-toggle="tooltip" title="Edit" data-id="' + item.id + '" data-blog="' + item.blog.id + '"><i class="fas fa-pen"></i></button><div id="wrapper_' + ID + '" class="collapse ' + (i == 0 ? 'show' : false) + '"><p id="' + ID + '"></p></div></td></tr>');
      uLi(item, 'p#post_' + item.id, ['kind', 'blog', 'etag', 'url', 'title', 'selfLink'], {
        author: 'displayName',
        replies: 'totalItems'
      }, '<div class="" data-toggle="tooltip" title="%index%">%content%</div>');
    }
  }

  if (response.hasOwnProperty('nextPageToken')) {
    var paging = $('#blogger_paging');
    paging.attr('data-api', build_query_blogger(response.items[0].blog.id, response.nextPageToken));
    paging.attr('title', response.nextPageToken);
  }
}
/**
 * Create UL LI from array
 * @param array data array items
 * @param string target pseudo element
 * @param array exclude index
 * @param object modify
 * @param string content_pattern content with spesific replacements
 * * %index% converted as key
 * * %content% converted as value
 */
function uLi(data, target, exclude, modify, content_pattern) {
  var sub_ul = $('<ul/>').addClass('mt-2');
  $.each(data, function (index) {
    if (inArray(index, exclude)) {
      return;
    }
    if (inArray(index, array_keys(modify))) {
      //console.log(modify, index, data[index][modify[index]]);
      data[index] = data[index][modify[index]];
    }
    var content = WordCount(data[index]) && WordCount(data[index]) > 100 || index == 'content' ? WordCount(data[index]) + ' Words' : data[index];
    if (Date.parse(content) && content.length > 5) {
      content = new Date(content);
    }
    var sub_li = $('<li/>')
      .html(content_pattern.replace('%content%', content).replace('%index%', index))
      .addClass('border-bottom mb-2')
      .attr('role', 'menuitem');
    sub_ul.append(sub_li);
  });
  $(target).append(sub_ul);
}

function WordCount(str) {
  if (typeof str != 'string') {
    return str;
  }
  return str.split(' ').length;
}