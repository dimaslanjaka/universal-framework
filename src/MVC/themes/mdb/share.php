<div id="share-wrap">
  <style>
    .switch-version {
      z-index: 1000;
    }

    .switch-off {
      display: none;
    }

    .switch-title {
      font-size: 11px;
    }

    .switch-web {
      border-top: 1px solid #33b5e5;
      border-left: 1px solid #33b5e5;
      color: #6b6e72;
      border-top-left-radius: 4px;
      transition: background-color 0.3s;
    }

    .switch-mobile {
      border-bottom: 1px solid #FF8800;
      border-left: 1px solid #FF8800;
      color: #6b6e72;
      border-bottom-left-radius: 4px;
      transition: background-color 0.3s;
    }

    .switch-web.active,
    .switch-web:not(.active):hover {
      color: white;
      background-color: #33b5e5;
    }

    .switch-mobile.active,
    .switch-mobile:not(.active):hover {
      color: white;
      background-color: #FF8800;
    }

    .switch-web i,
    .switch-mobile i {
      position: relative;
      top: 4px;
    }

    .switch-web span,
    .switch-mobile span {
      width: 100%;
      position: relative;
      top: -4px;
    }

    .switch-web-products {
      border-left: 1px solid #33b5e5;
    }

    .switch-mobile-products {
      border-left: 1px solid #FF8800;
    }

    .switch-version a:last-child>.switch-to {
      -webkit-border-bottom-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .switch-version a:first-child>.switch-to {
      -webkit-border-top-left-radius: 0;
      border-top-left-radius: 0;
    }

    /*
      .switch-to-mobile.mdb-vue-mobile {
        background-image: url('img/logo/mdb-angular.png');
        background-position: 0 -84px;
      }

      .switch-to-mobile.mdb-angular-mobile {
        background-image: url('img/logo/mdb-angular.png');
        background-position: 0 0;
      }

      .switch-to-mobile.mdb-react-mobile {
        background-image: url('img/logo/mdb-angular.png');
        background-position: 0 -123px;
      }
      */
    .wow {
      visibility: hidden;
    }
  </style>
  <div class="switch-version d-none d-md-block">
    <div class="switch-web active">
      <a class="d-block text-center">
        <i class="fas fa-share"></i>
        <span class="switch-title">share</span>
      </a>
    </div>
    <div class="switch-web-products ">
      <a href="#" id="tw-share">
        <center><i class="fab fa-twitter"></i></center>
      </a>
      <a href="/docs/angular/" id="fb-share">
        <center><i class="fab fa-facebook-f"></i></center>
      </a>
      <a href="/docs/react/" id="pin-share">
        <center><i class="fab fa-pinterest"></i></center>
      </a>
      <a href="/docs/vue/mobile/" id="mail-share">
        <center><i class="fad fa-envelope"></i></center>
      </a>
    </div>
    <div class="switch-mobile-products switch-off">
      <a href="/docs/angular/mobile/" id="tu-share">
        <center><i class="fab fa-tumblr"></i></center>
      </a>
      <a href="/docs/react/mobile/" id="lin-share">
        <center><i class="fab fa-linkedin"></i></center>
      </a>
      <a href="/docs/vue/mobile/" id="st-share">
        <center><i class="fab fa-stumbleupon-circle"></i></center>
      </a>
      <a href="/docs/vue/mobile/" id="more-share">
        <center><i class="far fa-share-alt"></i></center>
      </a>
    </div>
    <div class="switch-mobile ">
      <a class="d-block text-center">
        <i class="far fa-retweet"></i>
        <span class="switch-title">share</span>
      </a>
    </div>
  </div>
  <script>
    var share = document.getElementById('tw-share');
    share.setAttribute('href', 'https://twitter.com/share?url=' + location.href + '&text=' + document.title + '&via=' + location.host);
    share.setAttribute('target', '_blank');
    var share = document.getElementById('fb-share');
    share.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + location.href + '&text=' + document.title + '&via=' + location.host);
    share.setAttribute('target', '_blank');
    var share = document.getElementById('tu-share');
    share.setAttribute('href', 'https://www.tumblr.com/share/link?url=' + location.href + '&text=' + document.title + '&via=' + location.host);
    share.setAttribute('target', '_blank');
    var share = document.getElementById('lin-share');
    share.setAttribute('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + location.href + '&text=' + document.title + '&via=' + location.host);
    share.setAttribute('target', '_blank');
    var share = document.getElementById('pin-share');
    share.setAttribute('href', 'https://www.pinterest.com/pin/create/button/?url=' + location.href + '&text=' + document.title + '&via=' + location.host);
    share.setAttribute('target', '_blank');
    var share = document.getElementById('st-share');
    share.setAttribute('href', 'http://www.stumbleupon.com/submit?url=' + location.href + '&text=' + document.title + '&via=' + location.host);
    share.setAttribute('target', '_blank');
    var share = document.getElementById('more-share');
    share.setAttribute('href', 'https://www.addtoany.com/share_save?linkurl=' + location.href + '&text=' + document.title + '&via=' + location.host);
    share.setAttribute('target', '_blank');
    var share = document.getElementById('mail-share');
    share.setAttribute('href', 'mailto:?subject=Share&body=' + location.href + ' ' + document.title + ' from ' + location.host);
    share.setAttribute('target', '_blank');
  </script>

</div>