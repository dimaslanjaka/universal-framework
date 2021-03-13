<?php
if (isset($_POST['glogin'])) {
  update_option('google-login', $_POST['glogin']);
}
if (isset($_POST['sitename'])) {
  update_option('sitename', $_POST['sitename']);
}
?>

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item">
    <a class="nav-link" href="#site" role="tab" data-toggle="tab">Site</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#buzz" role="tab" data-toggle="tab">buzz</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#references" role="tab" data-toggle="tab">references</a>
  </li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane fade" id="site">
    <table class="table">
      <tr>
        <td>Site Name</td>
        <td>
          <form action="" method="post">
            <input type="text" name="sitename" class="form-control"
              value="<?=get_option('sitename'); ?>">
          </form>
        </td>
      </tr>
      <tr>
        <td>Google login</td>
        <td>
          <form action="" method="post">
            <select name="glogin" class="form-control" onchange="sub(this)">
              <option value="">Select Google Login Option</option>
              <option value="no" <?=('no' == get_option('google-login') ? 'selected' : false); ?>>No
              </option>
              <option value="yes" <?=('yes' == get_option('google-login') ? 'selected' : false); ?>>Yes
              </option>
            </select>
          </form>
        </td>
      </tr>
    </table>
  </div>
  <div role="tabpanel" class="tab-pane fade" id="buzz">bbb</div>
  <div role="tabpanel" class="tab-pane fade" id="references">ccc</div>
</div>

<script>
  function sub(x) {
    console.log($(x).parent('form').submit());
  }

  function fsub(x) {
    var v = x.value != '' ? x.value : false;
    obj = {};
    if (x.hasAttribute('name')) {
      var xn = x.getAttribute('name');
      if (xn.trim() != '') {
        obj[xn] = v;
      }
    }
    if (v) {
      jQuery.post(location.href, obj, function(r) {
        console.log(r);
      })
    }
  }
</script>