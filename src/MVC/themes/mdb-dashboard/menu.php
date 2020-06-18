<!-- Sidebar navigation -->
<div id="slide-out" class="side-nav fixed wide sn-bg-1 slim">
  <ul class="custom-scrollbar">
    <!-- Logo -->
    <li>
      <div class="logo-wrapper sn-ad-avatar-wrapper">
        <a href="#"><img src="/assets/img/vs.png" class="rounded-circle"><span><?= $title ?></span></a>
      </div>
    </li>
    <!--/. Logo -->
    <!-- Side navigation links -->
    <li>
      <ul class="collapsible collapsible-accordion">
        <li><a class="collapsible-header waves-effect arrow-r"><i class="sv-slim-icon fas fa-user"></i> User<i class="fas fa-angle-down rotate-icon"></i></a>
          <div class="collapsible-body">
            <ul>
              <li><a href="#" class="waves-effect d-none">
                  <span class="sv-slim"> SL </span>
                  <span class="sv-normal">Submit listing</span></a>
              </li>
              <li><a href="/logout" class="waves-effect">
                  <span class="sv-slim"> <i class="fas fa-sign-out-alt"></i> </span>
                  <span class="sv-normal">Registration form</span></a>
              </li>
            </ul>
          </div>
        </li>
        <li><a class="collapsible-header waves-effect arrow-r"><img src="/assets/img/telkomsel.png" alt="telkomsel panel" width="20px" height="20px" class="p-0 m-0"><i class="fas fa-angle-down rotate-icon"></i></a>
          <div class="collapsible-body">
            <ul>
              <li><a href="/telkomsel/dashboard" class="waves-effect">
                  <span class="sv-slim"> <i class="fad fa-columns"></i> </span>
                  <span class="sv-normal">Dashboard</span></a>
              </li>
              <li><a href="/telkomsel/gift" class="waves-effect">
                  <span class="sv-slim"> <i class="fad fa-gift"></i> </span>
                  <span class="sv-normal">Indosat Panel</span></a>
              </li>
            </ul>
          </div>
        </li>
        <li><a class="collapsible-header waves-effect arrow-r"><img src="/assets/img/im3.png" alt="telkomsel panel" width="20px" height="20px" class="p-0 m-0"><i class="fas fa-angle-down rotate-icon"></i></a>
          <div class="collapsible-body">
            <ul>
              <li><a href="/im3/" class="waves-effect">
                  <span class="sv-slim"> <i class="fad fa-columns"></i> </span>
                  <span class="sv-normal">Indosat Panel</span></a>
              </li>
              <li><a href="/coupon/dashboard/im3" class="waves-effect">
                  <span class="sv-slim"> <i class="fad fa-business-time"></i> </span>
                  <span class="sv-normal">Coupon</span></a>
              </li>
            </ul>
          </div>
        </li>

        <li><a class="collapsible-header waves-effect arrow-r"><i class="sv-slim-icon fal fa-toolbox"></i><i class="fas fa-angle-down rotate-icon"></i></a>
          <div class="collapsible-body">
            <ul>
              <li><a href="/tools/json-viewer" alt="JSON viewer Online" class="waves-effect">
                  <span class="sv-slim"> <img src="/assets/img/json.png" alt="telkomsel panel" width="20px" height="20px" class="p-0 m-0"> </span>
                  <span class="sv-normal">JSON Viewer Online</span></a>
              </li>
            </ul>
          </div>
        </li>
        <li class="d-none"><a id="toggle" class="waves-effect"><i class="sv-slim-icon fas fa-angle-double-right"></i>Minimize menu</a>
        </li>
      </ul>
    </li>
    <!--/. Side navigation links -->
  </ul>
  <div class="sidenav-bg rgba-blue-strong"></div>
</div>
<!--/. Sidebar navigation -->
<!-- Navbar -->
<nav class="navbar fixed-top navbar-toggleable-md navbar-expand-lg scrolling-navbar double-nav">
  <!-- SideNav slide-out button -->
  <div class="float-left">
    <a href="#" data-activates="slide-out" class="button-collapse" id="button-collapse"><i class="fas fa-bars"></i></a>
  </div>
  <!-- Breadcrumb-->
  <div class="breadcrumb-dn mr-auto">
    <p><?= $title; ?></p>
  </div>
</nav>
<!-- Navbar -->