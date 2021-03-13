<div class="row row-sm">
  <div class="col">
    <div class="card bd-0">
      <div class="card-header tx-medium bd-0 tx-white bg-indigo">
        Input Jurnal Pendapatan (Kas Masuk) <span class="float-sm-right"><a data-toggle="tooltip-danger"
            data-title="List Pendapatan" href="/akuntansi/pendapatan"><i class="fas fa-external-link-alt"></i></a>
      </div><!-- card-header -->
      <div class="card-body bd bd-t-0">
        <p class="mg-b-0">
          <form action="?j-masuk" method="post" id="ajax">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Invoice P#</span>
              </div>
              <input type="text"
                value="<?= $AChain->get_records_current_month('invoice', 'pdate', 'AND type = \'pendapatan\'')->count(); ?>"
                class="form-control" name="invoice" id="pendapatan-inv" readonly>
            </div>
            <div class="form-group">
              <label for="">Pilih Client</label>
              <select name="client" class="form-control" required>
                <?= dimas_user_html::init()->select_options($user->get_all_clients($user->company())); ?>
              </select>
            </div>
            <div class="form-group">
              <textarea name="keterangan" class="form-control" placeholder="Keterangan pendapatan" required></textarea>
            </div>
            <div class="form-group">
              <label for="">Jumlah Total Pendapatan</label>
              <input type="text" name="total" id="format-rupiah" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="">Jumlah Pendapatan</label>
              <input type="text" name="total-masuk" id="format-rupiah" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="">Metode Pendapatan</label>
              <select name="metode" id="method" class="form-control" required>
                <?= dimas_user_html::init()->select_method('pendapatan', 'credit'); ?>
              </select>
            </div>
            <input type="hidden" name="pendapatan">
            <button class="btn btn-az-primary pd-x-20 btn-block" type="submit" disabled>Input Pendapatan <i
                class="fas fa-paper-plane"></i></button>
          </form>
        </p>
      </div><!-- card-body -->
    </div><!-- card -->
  </div><!-- col -->
</div>