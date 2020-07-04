<?php
$roles = \DB\schema::get_enumset_values(pdo(), 'userdata', 'role');
?>
<section>
  <div class="card">
    <div class="card-body">
      <form action="roles" method="post" enctype="application/json">
        <div class="form-row">
          <div class="col">Roles</div>
          <div class="col-md-10">
            <div class="md-form">
              <?php
              foreach ($roles as $role) {
                echo "<span class='badge rand-bg-color mr-3'>$role <span class='vertical-line'><i class='fad fa-times link' data-dismiss='badge'></i></span></span>";
              }
              ?>
              <select name="userdata[role]" id="" class="form-control">

              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>