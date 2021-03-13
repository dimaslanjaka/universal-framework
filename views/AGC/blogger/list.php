<?php

validateBloggerId('setUserId');
jscfg('bloggerId', isses('blogId'), true);
define('toastr', true);
?>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">Posts list</h5>
    <p class="card-text">
      <table id="post_blogger" class="table">
        <thead>
          <tr>
            <th scope="col">Post title</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </p>
    <button id="blogger_paging" data-toggle="tooltip" data-api="#" class="btn btn-primary">Fetch next</button>
  </div>
</div>