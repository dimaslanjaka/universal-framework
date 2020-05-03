<section>
  <div class="row">
    <div class="col-md-6 mb-3">
      <div class="card card-cascade narrower">

        <!-- Card image -->
        <div class="view view-cascade overlay">
          <img id="imgwel" class="card-img-top" src="http://dimaslanjaka.000webhostapp.com/receiver/?url=https://image.freepik.com/free-vector/security-otp-one-time-password-smartphone-shield_9904-104.jpg" alt="Card image cap">
          <a>
            <div class="mask rgba-white-slight"></div>
          </a>
        </div>

        <!-- Card content -->
        <div class="card-body card-body-cascade">

          <!-- Label -->
          <h5 class="pink-text pb-2 pt-1"><i class="fad fa-sms"></i> OTP Login</h5>
          <!-- Title -->
          <h4 class="font-weight-bold card-title">Login using On Time Password</h4>
          <!-- Text -->
          <p class="card-text">
            <form action="" method="post" id="otp" class="mb-2">
              <div class="md-form input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text md-addon" id="material-addon1">+62</span>
                </div>
                <input type="number" class="form-control" placeholder="81234567" aria-label="msisdn" aria-describedby="material-addon1" name="msisdn">
                <select name="version" id="" class="mdb-select">
                  <option value="5.1.1">5.1.1</option>
                  <option value="5.2.0">5.2.0</option>
                </select>
              </div>
              <button class="btn btn-unique" type="submit">Request <i class="fad fa-angle-right"></i></button>
            </form>
            <form action="" method="post" id="otpc" class="mb-2">
              <div class="md-form input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text md-addon" id="material-addon2"><i class="fad fa-key"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="AbCdEFg" aria-label="otpc" aria-describedby="material-addon2" name="otpc">
              </div>
              <button class="btn btn-unique" type="button" id="back"><i class="fad fa-angle-left"></i> Back</button>
              <button class="btn btn-unique" type="submit">Verify <i class="fad fa-angle-right"></i></button>
            </form>
            <div id="msisdn-info" class="border p-1">
              <p id="tfn"></p>
              <p id="fn"></p>
              <ul>
                <li>PUK1: <span id="puk1"></span></li>
                <li>PUK2: <span id="puk2"></span></li>
              </ul>
            </div>
          </p>
        </div>

      </div>
    </div>
    <div class="col-md-6 mb-3">
      <div class="card card-cascade wider">

        <!-- Card image -->
        <div class="view view-cascade gradient-card-header peach-gradient">

          <!-- Title -->
          <h2 class="card-header-title mb-3">Packages</h2>
          <!-- Text -->
          <p class="mb-0"><i class="fad fa-align-justify mr-2"></i>Package List</p>

        </div>

        <!-- Card content -->
        <div class="card-body card-body-cascade">
          <ul class="nav nav-tabs md-tabs" id="myTabMD" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab-md" data-toggle="tab" href="#home-md" role="tab" aria-controls="home-md" aria-selected="true">Lists</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="profile-tab-md" data-toggle="tab" href="#profile-md" role="tab" aria-controls="profile-md" aria-selected="false">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="buy-tab-md" data-toggle="tab" href="#buy-md" role="tab" aria-controls="buy-md" aria-selected="false">Buy</a>
            </li>
          </ul>
          <div class="tab-content card pt-5" id="myTabContentMD">
            <div class="tab-pane fade" id="buy-md" role="tabpanel" aria-labelledby="buy-tab-md">
              <div class="md-form mb-3">
                <select class="mdb-select mdb-form" id="pkgls">
                  <option value="" disabled selected>Select package</option>
                </select>
                <button class="btn" id="pkg-refresh"><i class="fal fa-sync-alt"></i></button>
                <button class="btn" id="pkg-buy"><i class="fad fa-shopping-cart"></i></button>

              </div>
            </div>
            <div class="tab-pane fade show active" id="home-md" role="tabpanel" aria-labelledby="home-tab-md">
              <table class="table table-bordered" style="max-width: 100%;">
                <thead>
                  <tr>
                    <th scope="col">Package</th>
                    <th scope="col">Active</th>
                  </tr>
                </thead>
                <tbody id="paket-lists" class="text-left">
                  <?php
                  foreach (telkomsel_api()->list_packages() as $paket) {
                    if (!$paket) {
                      continue;
                    }
                  ?>
                    <tr>
                      <td><?= user()->is_admin() ? $paket['code'] : $paket['name'] ?></td>
                      <td>
                        <?php
                        if (user()->is_admin()) {
                        ?>
                          <select id="pkg-stats-<?= $paket['id'] ?>" data-id="<?= $paket['id'] ?>" class="mdb-select md-form" name="<?= $paket['id'] ?>">
                            <option value="" disabled>Choose your option</option>
                            <option value="active" <?= ($paket['status'] == 'active' ? 'selected' : false) ?>>Active</option>
                            <option value="inactive" <?= ($paket['status'] == 'inactive' ? 'selected' : false) ?>>Inactive</option>
                          </select>
                        <?php
                        } else {
                          echo $paket['status'];
                        } ?>
                      </td>
                    </tr>
                  <?php
                  }
                  ?>
                </tbody>
              </table>
            </div>
            <div class="tab-pane fade" id="profile-md" role="tabpanel" aria-labelledby="profile-tab-md">
              <p class="card-text">
                <form action="" method="post" id="editPackages">
                  <div class="md-form input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text md-addon" id="material-addon1">@</span>
                    </div>
                    <input type="text" class="form-control" placeholder="package id" aria-label="pid" aria-describedby="material-addon1" id="pkdt">
                  </div>
                </form>
              </p>
              <div style="height:355px;overflow:auto;">
                <div class="loadingio-spinner-spinner-9epcps7tyt" id="pkg-loading">
                  <div class="ldio-ayi6ntmo6l">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <table class="table table-bordered" style="max-width: 100%;">
                  <thead>
                    <tr>
                      <th scope="col">Key</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody id="paket-details" class="text-left">
                    <tr>
                      <td>period</td>
                      <td>30 Days</td>
                    </tr>
                    <tr>
                      <td>resv</td>
                      <td>00010636</td>
                    </tr>
                    <tr>
                      <td>quota</td>
                      <td>50 GB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- Card content -->

      </div>
    </div>
  </div>
</section>


<?php
if (isset($_SESSION['login']['role']) && preg_match('/admin/s', $_SESSION['login']['role'])) {
?>
  <section>
    <div class="row">
      <div class="col-md-12 mb-3">
        <div class="card card-cascade narrower">

          <!-- Card image -->
          <div class="view view-cascade gradient-card-header purple-gradient">

            <!-- Title -->
            <h2 class="card-header-title">Register</h2>
            <h5 class="mb-0 pb-3 pt-2">Register new user</h5>

          </div>

          <!-- Card content -->
          <div class="card-body card-body-cascade text-center">

            <!-- Text -->
            <p class="card-text">
              <form class="text-center" style="color: #757575;" id="regist" action="#!">

                <div class="form-row">
                  <div class="col">
                    <!-- First name -->
                    <div class="md-form">
                      <input type="text" required id="materialDisplayName" name="display" class="form-control">
                      <label for="materialDisplayName">Display name</label>
                    </div>
                  </div>
                  <div class="col">
                    <!-- Last name -->
                    <div class="md-form">
                      <input type="text" name="user" required id="materialUsername" class="form-control">
                      <label for="materialUsername">User name</label>
                    </div>
                  </div>
                </div>

                <!-- Password -->
                <div class="md-form">
                  <input type="password" name="pass" id="materialPassword" class="form-control" aria-describedby="materialPasswordHelpBlock" required>
                  <label for="materialPassword">Password</label>
                  <small id="materialPasswordHelpBlock" class="form-text text-muted mb-4">
                    At least 8 characters and 1 digit
                  </small>
                </div>
                <div class="text-center">
                  <small>Role</small>
                </div>
                <div class="form-row">
                  <div class="col">
                    <div class="form-check">
                      <input type="radio" value="admin" class="form-check-input" id="roleGroup1" name="role" required>
                      <label class="form-check-label" for="roleGroup1">Admin</label>
                    </div>
                  </div>

                  <div class="col">
                    <div class="form-check">
                      <input type="radio" value="client" class="form-check-input" id="roleGroup2" name="role" required>
                      <label class="form-check-label" for="roleGroup2">Client</label>
                    </div>
                  </div>
                </div>

                <!-- Sign up button -->
                <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Sign
                  up</button>

                <hr>

                <!-- Terms of service -->
                <p>By clicking
                  <em>Sign up</em> you agree to our
                  <a href="" target="_blank">terms of service</a>

              </form>
            </p>

          </div>

        </div>
      </div>
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
              <table id="dtMaterial" class="table table-striped" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th class="th-sm">Name
                    </th>
                    <th class="th-sm">Username
                    </th>
                    <th class="th-sm">Created At
                    </th>
                    <th class="th-sm">Last Login
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
                  $users = $db->SQL_MultiFetch("SELECT * FROM `userdata` WHERE `role` <> 'superadmin';");
                  foreach ($users as $user) {
                  ?>
                    <tr>
                      <td><?= $user['display_name']; ?>
                      </td>
                      <td><?= $user['username']; ?>
                      </td>
                      <td><?= $user['created']; ?>
                      </td>
                      <td><?= $user['last_login']; ?>
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
}
