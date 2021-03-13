if (typeof blogList != 'undefined' && typeof blogList.forEach == 'function') {
  var blogList_wrapper = $('tbody#blogList');
  if (blogList.length){
    blogList_wrapper.html('');
  }
  blogList.forEach(ei => {
    //console.log(ei);
    if (typeof ei.name != 'undefined') {
      var status = '<span class="tx-danger">offline</span>';
      if (typeof ei.status != 'undefined') {
        if (ei.status == 'LIVE') {
          status = '<span class="tx-success">online</span>';
        }
      }
      blogList_wrapper.append(`<tr ${ei.status != 'LIVE' ? 'disabled' : false}>
      <th scope="row"><a href="${ei.url}" data-toggle="tooltip" title="${ei.url}" target="_blank" rel="nofollow noopener">${ei.name}</a></th>
      <td data-toggle="tooltip" title="${ei.posts.totalItems} Posts | ${ei.pages.totalItems} Pages">${ei.description}</td>
      <td><button data-blog="${ei.id}" class="btn btn-white border" data-toggle="tooltip" title="Use this">${status}</button></td>
      </tr>`);
    }
  });
}

$(document).on('click', '[data-blog]', function (e) {
  e.preventDefault();
  $.post('/AGC/blogger/index', {'set-blog': $(this).data('blog')}, function(ex){
    location.replace('/AGC/blogger/menu');
  });
});