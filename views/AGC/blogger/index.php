<?php

$google = blogger_client();
$validate = validateToken($google);

if (isURL($validate) || is_object($validate)) {
  return login();
}

$bloggerId = validateBloggerId(function () {
  setUserId();
  return false;
});

if (isreq('reset_blogger_id')) {
  setUserId();
} else if (isreq('reset_blog_id')) {
  setBlogId();
} else if ($bloggerId) {
  $blog = get_blogger_list($google, function ($error) {
    //precom($error);
    if (isset($error->error)) {
      if (($error->error->code == 500 || isreq('input-blog')) && !isses('blogId')) {
        setBlogId();
      } else {
?>
        <script>
          location.replace('/AGC/blogger/menu');
        </script>
<?php
      }
    }
  });
  if ($blog) {
    jscfg('blogList', $blog->items, true);
  }
}

?>

<div class="row">
  <div class="col-md-12">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">title</th>
          <th scope="col">description</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody id="blogList">
        <tr>
          <td colspan="7">
            <div class="text-center">Nothing to show</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="modal fade" id="modal_BloggerID" tabindex="-1" role="dialog" aria-labelledby="modal_BloggerIDLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal_BloggerIDLabel">How to obtain Blogger ID</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src="https://4.bp.blogspot.com/-MX8xW-v5Gpk/XgSWIhC70wI/AAAAAAAAAjE/M2iS1QyJZagMiCNbGDPGfEl36EWPC3QswCLcBGAsYHQ/s1600/Screenshot_1.png" class="card-img-top" alt="How to obtain your Blogger ID">
        <div class="mt-2">
          Visit <a href="http://blogger.com/blogger.g" target="_blank" rel="noopener noreferrer">Blogger <i class="fas fa-external-link-square-alt"></i></a>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal_BlogID" tabindex="-1" role="dialog" aria-labelledby="modal_BlogIDLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal_BlogIDLabel">How to obtain Blog ID</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src="https://1.bp.blogspot.com/-UD3cQJMWkCc/XgaIVNmGRJI/AAAAAAAAAjg/IhQEjoECGRIir1_ChdoZM7FtF32jrNXiwCLcBGAsYHQ/s1600/Screenshot_1.png" class="card-img-top" alt="How to obtain your Blogger ID">
        <div class="mt-2">
          Visit <a href="http://blogger.com/blogger.g" target="_blank" rel="noopener noreferrer">Blogger <i class="fas fa-external-link-square-alt"></i></a>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>