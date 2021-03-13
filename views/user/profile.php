<div class="az-content az-content-profile">
  <div class="container mn-ht-100p">
    <div class="az-content-left az-content-left-profile">

      <div class="az-profile-overview">
        <div class="az-img-user">
          <img src="<?=$user->avatar(); ?>" alt="">
        </div><!-- az-img-user -->
        <div class="d-flex justify-content-between mg-b-20">
          <div>
            <h5 class="az-profile-name"><?=$user->dname(); ?>
            </h5>
            <p class="az-profile-name-text">UI/UX Designer</p>
          </div>
          <div class="btn-icon-list">
            <button class="btn btn-indigo btn-icon"><i class="typcn typcn-plus-outline"></i></button>
            <button class="btn btn-primary btn-icon"><i class="typcn typcn-message"></i></button>
          </div>
        </div>

        <div class="az-profile-bio">
          Genius, Compiler, Powerful Multitasker, Fantasy Fruit Loop, Replacement President of a Major Soft Drink
          Manufacturer. <a
            href="//google.com/search?q=<?=$user->dname(); ?>"
            target="_blank">More</a>
        </div><!-- az-profile-bio -->

        <hr class="mg-y-30">

        <label class="az-content-label tx-13 mg-b-20 d-none">Websites &amp; Social Channel</label>
        <div class="az-profile-social-list d-none">
          <div class="media">
            <div class="media-icon"><i class="icon ion-logo-github"></i></div>
            <div class="media-body">
              <span>Github</span>
              <a href="">github.com/sophia.white</a>
            </div>
          </div><!-- media -->
          <div class="media">
            <div class="media-icon"><i class="icon ion-logo-twitter"></i></div>
            <div class="media-body">
              <span>Twitter</span>
              <a href="">twitter.com/sophia.me</a>
            </div>
          </div><!-- media -->
          <div class="media">
            <div class="media-icon"><i class="icon ion-logo-linkedin"></i></div>
            <div class="media-body">
              <span>Linkedin</span>
              <a href="">linkedin.com/in/sophiaw</a>
            </div>
          </div><!-- media -->
          <div class="media">
            <div class="media-icon"><i class="icon ion-md-link"></i></div>
            <div class="media-body">
              <span>My Portfolio</span>
              <a href="">themepixels.me/</a>
            </div>
          </div><!-- media -->
        </div><!-- az-profile-social-list -->

      </div><!-- az-profile-overview -->

    </div><!-- az-content-left -->
    <div class="az-content-body az-content-body-profile">
      <nav class="nav az-nav-line d-none">
        <a href="" class="nav-link active" data-toggle="tab">Overview</a>
        <a href="" class="nav-link" data-toggle="tab">Reviews</a>
        <a href="" class="nav-link" data-toggle="tab">Followers</a>
        <a href="" class="nav-link" data-toggle="tab">Following</a>
        <a href="" class="nav-link" data-toggle="tab">Account Settings</a>
      </nav>

      <div class="az-profile-body">

        <div class="row mg-b-20">
          <div class="col-md-7 col-xl-8">
            <div class="az-profile-view-chart">
              <canvas id="chart-login"></canvas>
              <div class="az-profile-view-info">
                <div class="d-flex align-items-baseline">
                  <h6>508</h6>
                  <span>-1.2% since last week</span>
                </div>
                <p>Profile viewers past 10 days</p>
              </div>
            </div>
          </div><!-- col -->
          <div class="col-md-5 col-xl-4 mg-t-40 mg-md-t-0">
            <div class="az-content-label tx-13 mg-b-20">Traffic Details</div>
            <div class="az-traffic-detail-item">
              <div>
                <span>People with title Founder &amp; CEO</span>
                <span>24 <span>(20%)</span></span>
              </div>
              <div class="progress">
                <div class="progress-bar wd-20p" role="progressbar" aria-valuenow="20" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div><!-- progress -->
            </div>
            <div class="az-traffic-detail-item">
              <div>
                <span>People with title UX Designer</span>
                <span>16 <span>(15%)</span></span>
              </div>
              <div class="progress">
                <div class="progress-bar bg-success wd-15p" role="progressbar" aria-valuenow="15" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div><!-- progress -->
            </div>
            <div class="az-traffic-detail-item">
              <div>
                <span>People with title Recruitment</span>
                <span>87 <span>(45%)</span></span>
              </div>
              <div class="progress">
                <div class="progress-bar bg-pink wd-45p" role="progressbar" aria-valuenow="45" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div><!-- progress -->
            </div>
            <div class="az-traffic-detail-item">
              <div>
                <span>People with title Software Engineer</span>
                <span>32 <span>(25%)</span></span>
              </div>
              <div class="progress">
                <div class="progress-bar bg-teal wd-25p" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div><!-- progress -->
            </div>
          </div><!-- col -->
        </div><!-- row -->

        <hr class="mg-y-40">

        <div class="row">
          <div class="col-md-7 col-xl-8 d-none">
            <div class="az-content-label tx-13 mg-b-25">Work &amp; Education</div>
            <div class="az-profile-work-list">
              <div class="media">
                <div class="media-logo bg-success"><i class="icon ion-logo-whatsapp"></i></div>
                <div class="media-body">
                  <h6>UI/UX Designer at <a href="">Whatsapp</a></h6>
                  <span>2016 - present</span>
                  <p>Past Work: ThemePixels, Inc. and ThemeForest, Inc.</p>
                </div><!-- media-body -->
              </div><!-- media -->
              <div class="media">
                <div class="media-logo bg-primary"><i class="icon ion-logo-buffer"></i></div>
                <div class="media-body">
                  <h6>Studied at <a href="">Buffer University</a></h6>
                  <span>2002 - 2006</span>
                  <p>Degree: Bachelor of Science in Computer Science</p>
                </div><!-- media-body -->
              </div><!-- media -->
            </div><!-- az-profile-work-list -->
          </div><!-- col -->
          <div class="col-md-5 col-xl-4 mg-t-40 mg-md-t-0">
            <div class="az-content-label tx-13 mg-b-25">Contact Information</div>
            <div class="az-profile-contact-list">
              <div class="media">
                <div class="media-icon"><i class="icon ion-md-phone-portrait"></i></div>
                <div class="media-body">
                  <span>Phone</span>
                  <div><?=$user->phone(); ?>
                  </div>
                </div><!-- media-body -->
              </div><!-- media -->
              <div class="media">
                <div class="media-icon"><i class="icon ion-logo-slack"></i></div>
                <div class="media-body">
                  <span>Email</span>
                  <div><?=$user->email(); ?>
                  </div>
                </div><!-- media-body -->
              </div><!-- media -->
              <div class="media">
                <div class="media-icon"><i class="icon ion-md-locate"></i></div>
                <div class="media-body">
                  <span>Current Address</span>
                  <div>San Francisco, CA</div>
                </div><!-- media-body -->
              </div><!-- media -->
            </div><!-- az-profile-contact-list -->
          </div><!-- col -->
        </div><!-- row -->

        <div class="mg-b-20"></div>

      </div><!-- az-profile-body -->
    </div><!-- az-content-body -->
  </div><!-- container -->
</div><!-- az-content -->

<?php
$script[] = ROOT . '/views/js/profile.js';
