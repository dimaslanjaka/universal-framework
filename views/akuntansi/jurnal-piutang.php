<?php
$trans = $accounting->get_sisa_transaksi_not_in_piutang()->SQL_result;
//echo $core->precom($trans);
?>
<div class="row">
  <div class="col">
    <div class="card bd-0">
      <div class="card-header tx-medium bd-0 tx-white bg-primary">
        Input Jurnal Piutang (Semi Automated) <span class="float-sm-right"><a data-toggle="tooltip-primary"
            data-title="List Piutang" href="/akuntansi/piutang"><i class="fas fa-external-link-alt"></i></a></span>
      </div><!-- card-header -->
      <div class="card-body bd bd-t-0">
        <p class="mg-b-0">
          <form action="?piutang" method="post" id="ajax">
            <?php if (!empty($trans)) {?>
            <div class="form-group">
              <label for="" class="tx-danger">Penting (*)</label>
              <select id="transaksi-piutang-pending" class="form-control border-danger">
                <option value="">Transaksi Tidak Tercatat Di piutang</option>
                <?=dimas_user_html::init()->build_select_invoice(null, null, $trans); ?>
              </select>
            </div>
            <?php }?>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Invoice PI#</span>
              </div>
              <input type="text"
                value="<?= $AChain->get_records_current_month('invoice', 'pdate', 'AND type = \'piutang\'')->count(); ?>"
                class="form-control" name="invoice-piutang" readonly required id="piutang-inv">
            </div>
            <div class="form-group">
              <label for="">Pilih Client</label>
              <select name="client-piutang" class="form-control" required>
                <?= dimas_user_html::init()->select_options($user->get_all_clients($user->company())); ?>
              </select>
            </div>
            <div class="form-group">
              <label for="">Total piutang</label>
              <input type="text" name="total-piutang" id="format-rupiah" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="">Sisa piutang</label>
              <input type="text" name="sisa-piutang" id="format-rupiah" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="">Berlaku Dari</label>
              <input type="datetime-local" name="start-piutang" id="datetime" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="">Sampai</label>
              <input type="datetime-local" name="end-piutang" id="datetime" class="form-control" required>
            </div>
            <input type="hidden" name="piutang">
            <button class="btn btn-az-primary pd-x-20 btn-block" type="submit" disabled>Input Piutang <i
                class="fas fa-paper-plane"></i></button>
          </form>
        </p>
      </div><!-- card-body -->
    </div><!-- card -->
  </div><!-- col -->
</div>