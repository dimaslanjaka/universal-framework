<?php
$notif = [];
if (is_user_logged_in()) {
  $sisa_transaksi_not_in_piutang = $accounting->get_sisa_transaksi_not_in_piutang()->SQL_result;
}
if (!empty($sisa_transaksi_not_in_piutang)) {
  foreach ($sisa_transaksi_not_in_piutang as $p) {
    $notif[$p->staff][] = ['text' => 'Piutang <b>belum ditambahkan</b> ke dalam jurnal sebesar ' . uang::format($p->total - $p->in), 'tgl' => date('d M Y H:i:s', strtotime($p->pdate)), 'url' => '/akuntansi/jurnal-piutang'];
  }
}
$user_notif = isset($notif[get_current_user_id()]) ? $notif[get_current_user_id()] : [];
$user_notif_count = count($user_notif);
?>

<div class="az-header">
  <div class="container-fluid">
    <div class="az-header-left">
      <a href="" id="azIconbarShow" class="az-header-menu-icon d-lg-none"><span></span></a>
    </div><!-- az-header-left -->
    <div class="az-header-center">
      <form action="/search" method="get" id="search_form">
        <input type="search" name="s" class="form-control" placeholder="Search for anything here...">
        <button class="btn" type="submit"><i class="fas fa-search"></i></button>
      </form>
    </div><!-- az-header-center -->
    <div class="az-header-right">
      <div class="az-header-message" <?=attr_login_disabled(); ?>>
        <a href="app-chat.html"><i class="typcn typcn-messages"></i></a>
      </div><!-- az-header-message -->
      <div class="dropdown az-header-notification" <?=attr_login_disabled(); ?>>
        <a href=""
          class="<?=!empty($user_notif) ? 'new' : ''; ?>"><i
            class="typcn typcn-bell"></i></a>
        <div class="dropdown-menu">
          <div class="az-dropdown-header mg-b-20 d-sm-none">
            <a href="" class="az-header-arrow"><i class="icon ion-md-arrow-back"></i></a>
          </div>
          <h6 class="az-notification-title">Notifications</h6>
          <p class="az-notification-text">You have <?=$user_notif_count; ?> unread notification</p>
          <div class="az-notification-list">
            <?php
  if (!empty($user_notif)) {
    foreach ($user_notif as $N) {
      ?>
            <div class="media new"
              onclick="location.replace('<?=$N['url']; ?>')">
              <div class="az-img-user online"><img
                  src="<?=$user->avatar(); ?>" alt=""></div>
              <div class="media-body">
                <p><?=$N['text']; ?>
                </p>
                <span><?=$N['tgl']; ?></span>
              </div><!-- media-body -->
            </div><!-- media -->
            <?php
    }
  }?>
          </div><!-- az-notification-list -->
          <div class="dropdown-footer" disabled><a href="">View All Notifications</a></div>
        </div><!-- dropdown-menu -->
      </div><!-- az-header-notification -->
      <div class="dropdown az-profile-menu">
        <a href="#" class="az-img-user"><img
            src="<?=$user->avatar(); ?>" alt=""></a>
        <div class="dropdown-menu">
          <div class="az-dropdown-header d-sm-none">
            <a href="" class="az-header-arrow"><i class="icon ion-md-arrow-back"></i></a>
          </div>
          <div class="az-header-profile">
            <div class="az-img-user">
              <img src="<?=$user->avatar(); ?>" alt="">
            </div><!-- az-img-user -->
            <h6><?=$user->dname(); ?>
            </h6>
            <span><?=$user->company(); ?></span>
          </div><!-- az-header-profile -->

          <a <?=attr_login_disabled(); ?> href="/user/profile"
            class="dropdown-item"><i class="typcn typcn-user-outline"></i> My Profile</a>
          <a <?=attr_login_disabled(); ?> href="/user/edit-profile"
            class="dropdown-item"><i class="typcn typcn-edit"></i> Edit Profile</a>
          <a <?=attr_login_disabled(); ?> href=""
            class="dropdown-item"><i class="typcn typcn-time"></i> Activity Logs</a>
          <a <?=attr_login_disabled(); ?> href=""
            class="dropdown-item"><i class="typcn typcn-cog-outline"></i> Account Settings</a>
          <a <?=attr_login_disabled(); ?> href="<?= wp_logout_url(get_permalink()); ?>"
            id="logout" class="dropdown-item"><i class="typcn typcn-power-outline"></i> Sign Out</a>
        </div><!-- dropdown-menu -->
      </div>
    </div><!-- az-header-right -->
  </div><!-- container -->
</div><!-- az-header -->