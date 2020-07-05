<?php
$office = office();
$list = $office->user->getOffices();

foreach ($list as $offc) {
  echo $offc;
}
?>

<div class="container">

  <h2>Welcome</h2>
  <div class="card-deck">
    <div class="card">
      <!-- set a width on the image otherwise it will expand to full width       -->
      <img class="card-img-top img-fluid" src="https://dummyimage.com/400x200/563d7c/ffffff&text=.card-img-topfff&text=Admin" alt="Card image cap" width="400">
      <div class="card-body">
        <h4 class="card-title">Admin</h4>
        <p class="card-text">
          <ul>
            <li>Manage Office</li>
          </ul>
        </p>
      </div>
      <div class="card-footer">
        <a href="superuser" class="btn btn-round rand-bg-color"><i class="fad fa-arrow-right"></i></a>
      </div>
    </div>

    <div class="card">
      <!-- set a width on the image otherwise it will expand to full width       -->
      <img class="card-img-top img-fluid" src="https://dummyimage.com/400x200/563d7c/ffffff&text=.card-img-topfff&text=Inventory" alt="Card image cap" width="400">
      <div class="card-body">
        <h4 class="card-title">Inventory</h4>
        <p class="card-text">
          <ul>
            <li>Inventory Management</li>
            <li>Storage Users</li>
          </ul>
        </p>
      </div>
      <div class="card-footer">
        <a href="user" class="btn btn-round rand-bg-color"><i class="fad fa-arrow-right"></i></a>
      </div>
    </div>

    <div class="card">
      <!-- set a width on the image otherwise it will expand to full width       -->
      <img class="card-img-top img-fluid" src="https://dummyimage.com/400x200/563d7c/ffffff&text=.card-img-topfff&text=.card-img-top" alt="Card image cap" width="400">
      <div class="card-body">
        <h4 class="card-title">.card-title</h4>
        <p class="card-text">.card-text</p>
      </div>
    </div>


    <div class="card">
      <!-- set a width on the image otherwise it will expand to full width       -->
      <img class="card-img-top img-fluid" src="https://dummyimage.com/400x200/563d7c/ffffff&text=.card-img-topfff&text=.card-img-top" alt="Card image cap" width="400">
      <div class="card-body">
        <h4 class="card-title">.card-title</h4>
        <p class="card-text">.card-text</p>
      </div>
    </div>



  </div>
  <!-- /.card-deck -->
</div>
<!-- /.container -->