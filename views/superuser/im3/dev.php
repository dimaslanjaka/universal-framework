<div class="col-md-12 mb-4">
  <div class="view overlay rounded z-depth-2 mb-4">
    <div class="m-2">
      <div class="text-center">
        API Simulation
      </div>
      <form method="post" action="/im3/api" accept="application/json">
        <div class="input-group mb-2 d-none">
          <div class="input-group-prepend">
            <div class="input-group-text"><i class="fal fa-phone"></i></div>
          </div>
          <input type="number" name="M" placeholder="851234567890" class="form-control" disabled>
        </div>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text"><i class="fal fa-link"></i></div>
          </div>
          <input type="text" name="url" placeholder="https://tdw.telkomsel.com/api/paket-details/v2/ML4_BP_2112" class="form-control">
        </div>
        <div class="input-group mb-2">
          <textarea height="500px" name="headers" cols="30" rows="3" placeholder="Headers" class="form-control" id="headers"></textarea>
        </div>

        <!-- Grid row -->
        <div class="row accordion-gradient-bcg d-flex justify-content-center">

          <!-- Grid column -->
          <div class="col-md-12 col-xl-6 py-5">

            <!--Accordion wrapper-->
            <div class="accordion md-accordion accordion-2" id="result_header" aria-multiselectable="true">
              <div class="card-header rgba-stylish-strong z-depth-1 mb-1" id="heading3">
                <a data-toggle="collapse" data-parent="#result_header" href="#collapse1" aria-expanded="true" aria-controls="collapse1">
                  <h5 class="mb-0 white-text text-uppercase font-thin">
                    <div class="d-flex justify-content-between">
                      <div>Parsed Headers</div>
                      <div><i class="fad fa-angle-down rotate-icon"></i></div>
                    </div>
                  </h5>
                </a>
              </div>

              <div id="collapse1" class="collapse" aria-labelledby="heading1" data-parent="#result_header">
                <div class="card-body mb-1 rgba-grey-light white-text">
                  <p result-header="">-</p>
                </div>
              </div>

              <div class="card-header rgba-stylish-strong z-depth-1 mb-1" id="heading3">
                <a class="collapsed" data-toggle="collapse" data-parent="#result_header" href="#Collapse2" aria-expanded="false" aria-controls="Collapse2">
                  <h5 class="mb-0 white-text text-uppercase font-thin">
                    <div class="d-flex justify-content-between">
                      <div>Post Data</div>
                      <div><i class="fad fa-angle-down rotate-icon"></i></div>
                    </div>
                  </h5>
                </a>
              </div>

              <div id="Collapse2" class="collapse" aria-labelledby="heading3" data-parent="#result_header">
                <div class="card-body mb-1 rgba-grey-light white-text">
                  <div class="md-form">
                    <textarea class="form-control" name="postdata" id="" cols="30" rows="10" placeholder="Post Body"></textarea>
                  </div>
                </div>
              </div>
            </div>


            <!--/.Accordion wrapper-->

          </div>
          <!-- Grid column -->

        </div>
        <!-- Grid row -->

        <div class="md-form input-group">
          <div class="form-check">
            <input type="checkbox" name="post" class="form-check-input" id="PostControl" data-placement="top" data-toggle="tooltip" title="POST method">
            <label class="form-check-label" for="PostControl">POST</label>
          </div>
        </div>
        <div class="md-form input-group">
          <button type="submit" class="btn btn-block" id="simulate">Start</button>
        </div>
      </form>

      <div id="apiResult">
        <ul class="nav nav-tabs md-tabs" id="myTabMD">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab-md" data-toggle="tab" href="#home-md" aria-controls="home-md">Request</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="profile-tab-md" data-toggle="tab" href="#profile-md" aria-controls="profile-md">Response</a>
          </li>
        </ul>

        <div class="tab-content card pt-5" id="myTabContentMD">
          <div id="apiR"></div>
          <div class="tab-pane fade show active" id="home-md" aria-labelledby="home-tab-md">
            <div id="apiReq"></div>
          </div>
          <div class="tab-pane fade" id="profile-md" aria-labelledby="profile-tab-md">
            <div id="apiResH"></div>
            <div id="apiResB"></div>
            <div id="apiResC"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>