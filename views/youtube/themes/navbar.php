<div class="az-navbar az-navbar-two az-navbar-dashboard-eight">
  <div class="container">
    <div><a href="index.html" class="az-logo">az<span>i</span>a</a></div>
    <div class="az-navbar-search">
      <input type="search" class="form-control" placeholder="Search for schedules and events...">
      <button class="btn"><i class="fas fa-search "></i></button>
    </div><!-- az-navbar-search -->
    <ul class="nav">
      <li class="nav-label">Main Menu</li>
      <?php if (is_user_logged_in()) { ?>
      <li id="admin-nav" class="nav-item">
        <a href="#dashboard" class="nav-link with-sub"><i class="typcn typcn-clipboard"></i>Dashboard</a>
        <nav class="nav-sub">
          <a href="/youtube/admin" class="nav-sub-link">Options</a>
          <a href="/youtube/stats" class="nav-sub-link">Statistics</a>
        </nav>
      </li><!-- nav-item -->
      <?php } ?>
      <li id="trending-nav" class="nav-item">
        <a href="#trend" class="nav-link with-sub"><i class="typcn typcn-star"></i>Trending</a>
        <nav class="nav-sub" style="max-height:200px;overflow:auto">
          <?php foreach (unserialize(COUNTRIES) as $key => $value) {
  echo "<a href=\"/youtube/trending/$key\" class=\"nav-sub-link\">$value</a>";
} ?>
        </nav>
      </li><!-- nav-item -->
      <li class="nav-item">
        <a href="" class="nav-link with-sub"><i class="typcn typcn-time"></i>Last Visited</a>
        <nav class="nav-sub">
          <?php
  foreach ($core->recents('yt-nav') as $A) {
    $endid = explode('/', $A);
    $cfle = $_SERVER['DOCUMENT_ROOT'] . '/assets/config/youtube/details/' . end($endid) . '.json';
    if (file_exists($cfle)) {
      $gj = json_decode(file_get_contents($cfle));
      if (!empty($gj) && isset($gj->items[0]->snippet->title)) {
        $in = $gj->items[0]->snippet->title;
        $out = strlen($in) > 50 ? substr($in, 0, 50) . '...' : $in;
        echo '<a href="' . $A . '" class="nav-sub-link" id="nav-long" style="width:100%" alt="' . $gj->items[0]->snippet->title . '" title="' . $gj->items[0]->snippet->title . '">' . $out . '</a>';
      }
    } else {
      echo '<a href="' . $A . '" class="nav-sub-link">' . $A . '</a>';
    }
  }
  ?>
        </nav>
      </li><!-- nav-item -->
      <li class="nav-item d-none">
        <a href="" class="nav-link with-sub"><i class="typcn typcn-edit"></i>Forms</a>
        <nav class="nav-sub">
          <a href="form-elements.html" class="nav-sub-link">Form Elements</a>
          <a href="form-layouts.html" class="nav-sub-link">Form Layouts</a>
          <a href="form-validation.html" class="nav-sub-link">Form Validation</a>
          <a href="form-wizards.html" class="nav-sub-link">Form Wizards</a>
          <a href="form-editor.html" class="nav-sub-link">WYSIWYG Editor</a>
        </nav>
      </li><!-- nav-item -->
      <li class="nav-item d-none">
        <a href="" class="nav-link with-sub"><i class="typcn typcn-chart-bar-outline"></i>Statistics</a>
        <nav class="nav-sub">
          <a href="/shortlink/user/cpc" class="nav-sub-link">CPC</a>
          <a href="/shortlink/user/cpm" class="nav-sub-link" disabled>CPM</a>
          <a href="/shortlink/user/rpm" class="nav-sub-link" disabled>RPM</a>
          <a href="/shortlink/user/stats" class="nav-sub-link">Statistics</a>
        </nav>
      </li><!-- nav-item -->
      <li class="nav-item d-none">
        <a href="" class="nav-link with-sub"><i class="typcn typcn-map"></i>Maps</a>
        <nav class="nav-sub">
          <a href="map-google.html" class="nav-sub-link">Google Maps</a>
          <a href="map-leaflet.html" class="nav-sub-link">Leaflet</a>
          <a href="map-vector.html" class="nav-sub-link">Vector Maps</a>
        </nav>
      </li><!-- nav-item -->
      <li class="nav-item d-none" aria-disabled="">
        <a href="" class="nav-link with-sub"><i class="typcn typcn-tabs-outline"></i>Witdrawal</a>
        <nav class="nav-sub">
          <a href="user/witdrawal" class="nav-sub-link">Witdrawal Dashboard</a>
        </nav>
      </li><!-- nav-item -->
    </ul><!-- nav -->
  </div><!-- container -->
</div><!-- az-navbar -->