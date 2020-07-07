<?php
include __DIR__ . '/../breadcrumb.php';
include __DIR__ . '/breadcrumbs.php';
?>
<section>
  <div class="row">
    <div class="col-md-12 mb-3">
      <div class="card card-cascade narrower">

        <!-- Card image -->
        <div class="view view-cascade gradient-card-header purple-gradient">

          <!-- Title -->
          <h2 class="card-header-title">Users</h2>
          <h5 class="mb-0 pb-3 pt-2">User Lists</h5>

        </div>

        <!-- Card content -->
        <div class="card-body card-body-cascade text-center">

          <!-- Text -->
          <p class="card-text">
            <table id="dtMaterial" class="table table-striped table-responsive" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th class="th-sm">Name
                  </th>
                  <th class="th-sm">Username
                  </th>
                  <th class="th-sm">
                    Max
                  </th>
                  <th class="th-sm">
                    Info
                  </th>
                  <th class="th-sm">Role
                  </th>
                  <th class="th-sm">Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <?php
                $db = user()->pdo_instance();
                $users = $db->SQL_MultiFetch("SELECT * FROM `userdata` WHERE `role` <> 'superadmin';", false, true);
                foreach ($users as $user) {
                  $limit = getLimit($user['id']);
                  $idx = uniqid($limit['user_id']); ?>
                  <tr>
                    <td><?= $user['display_name']; ?>
                    </td>
                    <td><?= $user['username']; ?>
                    </td>
                    <td>
                      <form action="/superuser" method="post" id="<?= uniqid('max'); ?>">
                        <div class="md-form" style="margin-bottom: 0px;margin-top: 0px">
                          <input type="hidden" no-save="<?= uniqid('max'); ?>" name="change" value="max">
                          <input type="hidden" no-save="<?= uniqid('max'); ?>" name="user_id" value="<?= $user['id']; ?>">
                          <input name="value" no-save="<?= uniqid('max'); ?>" type="number" value="<?= $limit['max']; ?>" class="form-control">
                          <label>Max</label>
                        </div>
                      </form>
                    </td>
                    <td class='text-left'>
                      <b class="text-success"><?= $limit['success'] ?> Success</b> <?= $limit['max'] - $limit['success']; ?> Left
                    </td>
                    <td>
                      <select id="role_<?= $user['id']; ?>" data-id="<?= $user['id']; ?>">
                        <option value="" disabled>Roles</option>
                        <option value="admin" <?= 'admin' == $user['role'] ? 'selected' : false; ?>>Admin
                        </option>
                        <option value="client" <?= 'client' == $user['role'] ? 'selected' : false; ?>>Client
                        </option>
                      </select>
                    </td>
                    <td>
                      <div class="btn-group" role="group">
                        <a class="btn btn-warning" href="#change" data-id="<?= $user['id']; ?>"><i class="fad fa-key-skeleton"></i></a>
                        <a class="btn btn-danger" href="#delete" data-id="<?= $user['id']; ?>"><i class="fad fa-trash-alt"></i></a>
                      </div>
                    </td>
                  </tr>
                <?php
                } ?>
              </tbody>
            </table>
          </p>
        </div>

      </div>
    </div>
  </div>
</section>

<?php
const datatables = 1;
