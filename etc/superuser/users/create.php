<?php
include __DIR__ . '/../breadcrumb.php';
include __DIR__ . '/breadcrumbs.php';
?>
<section class="pt-3">
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
            <div class="d-block">
              <?php
              $roles = user()->get_roles();
              for ($i = 0; $i < count($roles); $i++) {
                $role = $roles[$i];
                echo '
              <div class="mr-2 ml-2 float-left">
                <div class="form-check">
                  <input type="radio" value="admin" class="form-check-input" id="roleGroup' . $i . '" name="role" required>
                  <label class="form-check-label" for="roleGroup' . $i . '">
                  <span class="badge badge-primary">' . $role . '</span>
                  </label>
                </div>
              </div>';
              }
              ?>
            </div>
          </div>

          <!-- Sign up button -->
          <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">
            Sign up
          </button>
          <hr>

          <!-- Terms of service -->
          <p>By clicking
            <em>Sign up</em> you agree to our
            <a href="" target="_blank">terms of service</a>

        </form>
      </p>

    </div>

  </div>
</section>