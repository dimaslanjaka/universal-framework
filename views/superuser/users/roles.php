<?php include __DIR__ . '/../breadcrumb.php';
$roles = [];
if (user()->is_admin()) {
  $roles = array_unique(\DB\schema::get_enumset_values(pdo(), 'userdata', 'role'));
}
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
                echo "<span class='badge bg-purple mr-3'>$role <span class='vertical-line'><i class='fad fa-times link' data-dismiss='badge'></i></span> <input type='hidden' name='userdata[role][]' value='$role' id='hrole-$role'></span>";
              }
              ?>
              <div class="input-group md-form">
                <input type="text" class="form-control" name="userdata[role][]" placeholder="Add New Role">

                <div class="input-group-append">
                  <button class="btn bg-success text-white" id="role-add" type="submit"><i class="fad fa-plus"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>