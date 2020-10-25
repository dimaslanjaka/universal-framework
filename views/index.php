<div class="global-container">
  <div class="card login-form">
    <div class="card-body">
      <h3 class="card-title text-center">Log in to Codepen</h3>
      <div class="card-text">
        <!--
			<div class="alert alert-danger alert-dismissible fade show" role="alert">Incorrect username or password.</div> -->
        <form>
          <!-- to error: add class "has-danger" -->
          <div class="form-group">
            <label for="inputUsername">Username</label>
            <input type="text" class="form-control form-control-sm" id="inputUsername">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <a href="/user/forgot" style="float:right;font-size:12px;">Forgot password?</a>
            <input type="password" class="form-control form-control-sm" id="exampleInputPassword1">
          </div>
          <button type="submit" class="btn btn-primary btn-block">Sign in</button>

          <!--
            <div class="sign-up">
            Don't have an account? <a href="#">Create One</a>
          </div>
        -->
        </form>
      </div>
    </div>
  </div>
</div>