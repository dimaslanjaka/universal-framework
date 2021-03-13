<?php
if (isreq('save')) {
  if (isreq('userid')) {
    update_user_meta(get_current_user_id(), 'blogger_user_id', isreq('blogid'));
  }
  if (isreq('blogid')) {
    update_user_meta(get_current_user_id(), 'blogger_blog_id', isreq('blogid'));
  }
}
$blogid = get_user_meta(get_current_user_id(), 'blogger_blog_id', true);
$userid = get_user_meta(get_current_user_id(), 'blogger_user_id', true);
?>

<div class="row">
  <div class="col-md-12 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Your blog info</h5>
        <h6 class="card-subtitle mb-2 text-muted">insert your blogger id and blog id</h6>
        <p class="card-text">
          <form action="" method="post" id="blogi">
            <div class="form-group">
              <label for="blogid">User ID</label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">https://www.blogger.com/profile/</div>
                </div>
                <input type="number" name="userid" class="form-control" id="blogid" placeholder="insert your blogger id" value="<?= $userid ?>">
              </div>
              <small id="emailHelp" class="form-text text-muted">your blogger user id.</small>
            </div>
            <div class="form-group">
              <label for="bloggerid">Blog ID</label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">https://www.blogger.com/blogger.g?blogID=</div>
                </div>
                <input type="number" name="blogid" value="<?= $blogid ?>" class="form-control" id="bloggerid" placeholder="insert your blog id">
              </div>
              <small id="emailHelp" class="form-text text-muted">your blogger blog id.</small>
            </div>
            <input type="hidden" name="save" value="1">
          </form>
        </p>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-md-3 mb-3">
    <form id="submission" enctype='application/json' action="/crawler/compose/preview" method="post" target="ResultFrame">
      <div id="input-fields">
        <small id="emailHelp" class="form-text text-muted mb-2"><a href="/crawler/compose/support" target="_blank" rel="noopener noreferrer">Supported domains <i class="fas fa-link"></i></a></small>
        <div class="input-group mb-3">
          <input type="url" class="form-control" name="url[]" placeholder="input url">
          <div class="input-group-btn">
            <button class="btn btn-success" type="button" id="addi"> <i class="fas fa-plus"></i> </button>
          </div>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="source">Source Language</label>
        <div id="translator-wrapper" data-id="source" data-name="sl"></div>
      </div>
      <div class="form-group mb-3">
        <label for="target">Target Language</label>
        <div id="translator-wrapper" data-id="target" data-name="tl"></div>
      </div>
      <div class="form-group mb-3">
        <label for="proxy"><b>HTTPS</b> Proxies list</label>
        <textarea placeholder="64.227.14.30:8080\n165.22.57.92:8080\n200.89.178.229:8080" name="proxies" id="proxy" cols="30" rows="10" class="form-control"><?= isses('proxies') ?></textarea>
        <small class="form-text text-muted">One proxy each lines</small>
      </div>
      <input type="hidden" name="html" value="1">
      <button type="submit" class="btn btn-primary btn-block mb-3">Submit</button>
    </form>
  </div>
  <div class="col-md-9 mb-3">
    <div id="ResultFrame">

    </div>
  </div>
</div>