<?php
include __DIR__ . '/../breadcrumb.php';
include __DIR__ . '/breadcrumbs.php';

$roles = [];
if (user()->is_admin()) {
  $roles = array_unique(\DB\schema::get_enumset_values(pdo(), 'userdata', 'role'));
}
?>
<section class="mb-3">
  <div class="card">
    <div class="card-body">
      <form action="roles" method="post" enctype="application/json">
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
      </form>
    </div>
  </div>
</section>

<?php $accessList = user()->access()->getAccess();
$managedAccess = user()->access()->get_managed_access();
?>

<script>
  const selectOptions = <?= json_encode($managedAccess) ?>;
</script>

<section>
  <div class="card">
    <div class="card-body">
      <div class="mb-2">
        <div class="card-label">Access Control</div>
      </div>
      <form action="roles" method="post">
        <?php
        foreach ($accessList as $key => $value) {
        ?>
          <!-- Grid row -->
          <div class="form-group row">
            <!-- Material input -->
            <label for="input<?= $key ?>MD" class="col-sm-2 col-form-label"><?= $key ?></label>
            <div class="col-sm-10">
              <div class="md-form mt-0" id="group-<?= $key ?>" data-key="<?= $key ?>">
                <?php
                foreach ($value as $path) {
                  //echo '<input type="' . $key . '" class="form-control" id="input' . $key . 'MD" placeholder="' . ucwords($key) . '" value="' . $path . '">';
                  echo '<div class="row"><div class="col"><select name="access[' . $key . '][]" data-key="' . $path . '" id="select-' . md5($key . $path) . '" class="select2"><option></option></select></div><div class="col-md-2 p-0 m-0"><button class="btn btn-danger" role="button" type="button"><i class="fad fa-trash"></i></button></div></div>';
                }
                //echo '<select name="access[' . $key . '][]" data-key="" id="select-" class="select2"><option></option></select>';
                ?>
                <div class="mt-2">
                  <div class="d-block">
                    <button class="btn btn-success" data-key="<?= $key ?>" data-target="group-<?= $key ?>" id="add-select-<?= $key ?>" role="button" type="button"><i class="fad fa-plus"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Grid row -->
        <?php
        }
        ?>

        <div class="md-form">
          <button type="submit" class="btn btn-block">Save</button></div>
      </form>
    </div>
  </div>
</section>