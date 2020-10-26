<?php
include __DIR__ . '/../breadcrumb.php';
include __DIR__ . '/breadcrumb.php';

$roles = array_unique(\DB\schema::get_enumset_values(pdo(), 'userdata', 'role'));
$rolesList = $roles;
$element = new HTML\element();
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
                <div class="md-form" id="select-group-<?= uniqid($key); ?>" data-key="<?= $key; ?>">
                  <div class="mb-1">
                    <?php
                    foreach ($value as $path) {
                      echo '<div class="form-row mb-1" id="select-access-' . uniqid($path) . '"><div class="col"><select data-key="' . $path . '" id="Access-' . uniqid($path) . '" class="select2 form-control"><option></option></select></div>
                    <div class="col-md-1">
                    <button id="select-remove-' . uniqid() . '" class="btn btn-danger" role="button" type="button"><i class="fad fa-trash"></i></button>
                    </div>
                    </div>';
                    }
                    ?>
                  </div>
                  <div>
                    <div class="btn-group" style="width: 100%;">
                      <button id="select-add-<?= uniqid() ?>" class="btn btn-success btn-block" role="button" type="button"><i class="fad fa-plus"></i></button>
                      <button id="group-remove-<?= uniqid() ?>" class="btn btn-danger btn-block" role="button" type="button"><i class="fad fa-trash"></i></button>
                    </div>
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
            <button id="addAccess" type="button" class="btn btn-success btn-block" data-toggle="tooltip" title="add more access roles"><i class="fad fa-plus"></i></button>
          </div>
          <div class="col">
            <button type="submit" class="btn btn-warning btn-block" id="saveAccess">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>