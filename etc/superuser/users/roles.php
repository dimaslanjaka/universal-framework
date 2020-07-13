<?php
include __DIR__ . '/../breadcrumb.php';
include __DIR__ . '/breadcrumb.php';

$roles = array_unique(\DB\schema::get_enumset_values(pdo(), 'userdata', 'role'));
$rolesList = $roles;
$element = new HTML\element();

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

<?php
$accessList = user()->access()->getAccess();
//pre($accessList);
//pre($rolesList);
?>

<section>
  <div class="card">
    <div class="card-body">
      <div class="mb-2">
        <div class="card-label">Access Control</div>
      </div>
      <form action="roles" method="post" id="access-management">
        <div id="access-wrapper">
          <?php
          foreach ($accessList as $key => $value) {
            $identifier = uniqid('Roles-'); ?>
            <!-- Grid row -->
            <div class="form-group row border pb-2" id="<?= $identifier; ?>">
              <div class="col-md-2">
                <div class="md-form">
                  <!--<input type="text" name="access" value="<?= $key; ?>"
                class="form-control" data-target="#group-<?= $key; ?>"
                required>-->
                  <select class="select2 form-control">
                    <?php
                    foreach ($rolesList as $rolex) {
                      if ($rolex != $key) {
                        echo '<option value="' . $rolex . '">' . $rolex . '</option>';
                      } else {
                        echo '<option value="' . $rolex . '" selected>' . $rolex . '</option>';
                      }
                    } ?>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="md-form" id="group-<?= $key; ?>" data-key="<?= $key; ?>">
                  <?php
                  foreach ($value as $path) {
                    //echo '<input type="' . $key . '" class="form-control" id="input' . $key . 'MD" placeholder="' . ucwords($key) . '" value="' . $path . '">';
                    echo '<div class="row"><div class="col"><select data-key="' . $path . '" id="Access-' . uniqid($path) . '" class="select2 form-control"><option></option></select></div><div class="col-md-2 p-0 m-0"><button class="btn btn-danger" role="button" type="button"><i class="fad fa-trash"></i></button></div></div>';
                  }
                  //echo '<select name="access[' . $key . '][]" data-key="" id="select-" class="select2"><option></option></select>';
                  ?>
                </div>
                <div class="mt-2">
                  <div class="d-block">
                    <button class="btn btn-success float-right" data-key="<?= $key; ?>" data-target="#group-<?= $key; ?>" id="add-select-<?= $key; ?>" role="button" type="button"><i class="fad fa-plus"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Grid row -->
          <?php
          }
          ?>

        </div>
        <div class="form-row">
          <div class="col-md-3">
            <button id="addAccess" type="button" class="btn btn-success btn-block"><i class="fad fa-plus"></i></button>
          </div>
          <div class="col">
            <button type="submit" class="btn btn-warning btn-block" id="saveAccess">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>