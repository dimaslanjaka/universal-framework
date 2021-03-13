<?php

include 'init.php';
$current_user = wp_get_current_user();
$current_user_id = get_current_user_id();
?>
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
      aria-selected="true">Site Config</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="channel-tab" data-toggle="tab" href="#channel" role="tab" aria-controls="channel"
      aria-selected="false">Channel Config</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="details-tab" data-toggle="tab" href="#details" role="tab" aria-controls="details"
      aria-selected="false">Details Config</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="update-tab" data-toggle="tab" href="#update" role="tab" aria-controls="update"
      aria-selected="false">Update</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="border border-info p-2 mt-2 tab-pane fade show active" id="home" role="tabpanel"
    aria-labelledby="home-tab">
    <form action="" method="post">
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Admin Email</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="yt-admin-email" id="staticEmail"
            value="<?=(get_option('yt-admin-email') ? get_option('yt-admin-email') : $current_user->user_email); ?>">
        </div>
      </div>
      <div class="form-group row">
        <label for="siteG" class="col-sm-2 col-form-label">Site Google Meta Tag</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="siteG" name="yt-google-site-verification"
            placeholder="Google site tag"
            value="<?=get_option('yt-google-site-verification'); ?>">
        </div>
      </div>
      <div class="form-group row">
        <label for="siteT" class="col-sm-2 col-form-label">Main Site Title</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="yt-site-title" id="siteT" placeholder="Site Title"
            value="<?=get_option('yt-site-title'); ?>">
        </div>
      </div>
      <div class="form-group row">
        <label for="siteD" class="col-sm-2 col-form-label">Main Site Description</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="yt-site-description" id="siteD" placeholder="Site Description"
            value="<?=get_option('yt-site-description'); ?>">
        </div>
      </div>
    </form>
  </div>
  <div class="tab-pane fade border border-warning p-2 mt-2" id="channel" role="tabpanel" aria-labelledby="channel-tab">
    <form action="" method="post">
      <div class="form-group row">
        <label for="" class="col-sm-2 col-form-label">Prefix First Title</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="" name="yt-prefix1-channel-title"
            value="<?=get_option('yt-prefix1-channel-title'); ?>"
            placeholder="Prefix First Title">
          <span id="emailHelp" class="form-text text-muted">Example: <b>Your First Prefix</b> Content Title</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="" class="col-sm-2 col-form-label">Prefix Last Title</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="" name="yt-prefix2-channel-title"
            value="<?=get_option('yt-prefix2-channel-title'); ?>"
            placeholder="Prefix Last Title">
          <span id="emailHelp" class="form-text text-muted">Example: Content Title <b>Your Last Prefix</b></span>
        </div>
      </div>
      <div class="form-group row">
        <label for="" class="col-sm-2 col-form-label">Full Example Title Prefix</label>
        <div class="col-sm-10">
          <blockquote class="p-2 border border-success">
            <b>Your First Prefix</b> Content title <b>Your Last Prefix</b>
          </blockquote>
        </div>
      </div>

    </form>
  </div>
  <div class="tab-pane fade border border-primary p-2 mt-2" id="details" role="tabpanel" aria-labelledby="details-tab">
    ...</div>
  <div class="border border-success p-2 mt-2 tab-pane fade show active" id="update" role="tabpanel"
    aria-labelledby="update-tab">
    <form action="" method="post">
      <button type="submit" class="btn btn-secondary">Check update</button>
    </form>
  </div>
</div>