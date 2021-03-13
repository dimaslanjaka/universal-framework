<div class="row">
  <div class="col-md-12">
    <div class="text-center">
      <h5>Twitter Email Validation</h5>
      <p>
        Validate Email Is Available Or Not For <a href="//twitter.com"><i class="fab fa-twitter"></i> Twitter</a>
      </p>

      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="Nsingle-tab" data-toggle="tab" href="#Nsingle" role="tab"
            aria-controls="Nsingle" aria-selected="true">Single</a>
          <a class="nav-item nav-link" id="Nbulk-tab" data-toggle="tab" href="#Nbulk" role="tab" aria-controls="Nbulk"
            aria-selected="false">Bulk</a>
          <a class="nav-item nav-link" id="Ncontact-tab" data-toggle="tab" href="#Ncontact" role="tab"
            aria-controls="Ncontact" aria-selected="false">Contact</a>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade pt-2 show active" id="Nsingle" role="tabpanel" aria-labelledby="Nsingle-tab">
          <form action="#twitter-email-validation" method="post" id="ajax">
            <input type="email" name="email" id="" placeholder="name@domain.tld" class="form-control mt-2">
            <div class="input-group mb-2">
              <input type="text" name="proxy" id="single-proxy"
                placeholder="<?=get_client_ip(); ?>:<?=$_SERVER['SERVER_PORT']; ?>"
                class="form-control" disabled>
              <div class="input-group-prepend">
                <div class="input-group-text form-check">
                  <input class="form-check-input" type="checkbox" value="" id="chkprx">
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block"><i class="fas fa-paper-plane"></i></button>
          </form>
        </div>
        <div class="tab-pane fade pt-2" id="Nbulk" role="tabpanel" aria-labelledby="Nbulk-tab">
          <form action="#bulk-check" id="bulk" method="post">
            <div class="form-group">
              <label for="">Emails (<span id="alrt">Max 30</span>)</label>
              <textarea name="email" id="email-b" cols="30" rows="10" placeholder="One Email By Line"
                class="form-control"></textarea>
            </div>

            <label for="">Proxies</label>
            <div class="input-group mb-2">
              <textarea name="proxy" id="prx-b" cols="30" rows="10" placeholder="One Proxy By Line" class="form-control"
                disabled></textarea>
              <div class="input-group-prepend">
                <div class="input-group-text form-check">
                  <input class="form-check-input" type="checkbox" value="" id="chkprx-b">
                </div>
              </div>
            </div>

            <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#ModalResultBulk">
              Show Result
            </button>

            <button type="submit" class="btn btn-success btn-block"><i class="fas fa-paper-plane"></i></button>
          </form>
        </div>
        <div class="tab-pane fade pt-2" id="Ncontact" role="tabpanel" aria-labelledby="Ncontact-tab">
          <div class="container mt-2">
            <ul>
              <li><i class="fab fa-whatsapp tx-success"></i> +6285655667573</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>


<div class="modal fade" id="ModalResultBulk" tabindex="-1" role="dialog" aria-labelledby="ModalResultBulkTitle"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Bulk Twitter Email Checker</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <span id="bulk-l">---result---</span>
        <pre id="bulk-r"></pre>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>