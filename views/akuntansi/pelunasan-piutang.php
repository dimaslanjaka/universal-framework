<?php

$form = dimas_form::form(OPT());
$valid = $form->formcheck('post', true) && $form->validate_referer(true);
$inv = $form->post('invoice');
$piutang = $AChain->get_all_piutang($inv)->r();
$log = json_decode(file_get_contents($piutang->piutang_log));
$log->{date('Y-m-d H:i:s')} = ['inv' => $inv, 'text', 'total', 'sisa'];
//echo $core->precom($log);
?>

<div class="row">
  <div class="col">
    <div class="card bd-0">
      <div class="card-header tx-medium bd-0 tx-white bg-indigo">
        Pelunasan <?= date('d M Y H:i:s'); ?>
      </div><!-- card-header -->
      <div class="card-body bd bd-t-0">
        <form action="" method="POST">
          <div class="pd-30 pd-sm-40 bg-light">
            <div class="row row-xs align-items-center mg-b-20">
              <div class="col-md-4">
                <label class="form-label mg-b-0">Sisa Awal</label>
              </div><!-- col -->
              <div class="col-md-8 mg-t-5 mg-md-t-0">
                <input type="text" name="awal" class="form-control" value="<?= round($piutang->piutang_total, 0); ?>" readonly>
              </div><!-- col -->
            </div><!-- row -->

            <div class="row row-xs align-items-center mg-b-20">
              <div class="col-md-4">
                <label class="form-label mg-b-0">Bayar</label>
              </div><!-- col -->
              <div class="col-md-8 mg-t-5 mg-md-t-0">
                <input type="text" name="bayar" class="form-control" placeholder="Berapa Nominal Yang Dilunasi" required>
              </div><!-- col -->
            </div><!-- row -->

            <div class="row row-xs align-items-center mg-b-20">
              <div class="col-md-4">
                <label class="form-label mg-b-0">Sisa Akhir</label>
              </div><!-- col -->
              <div class="col-md-8 mg-t-5 mg-md-t-0">
                <input type="text" name="akhir" class="form-control" placeholder="Sisa piutang akhir" required>
              </div><!-- col -->
            </div><!-- row -->

            <div class="row row-xs align-items-center mg-b-20">
              <div class="col-md-4">
                <label class="form-label mg-b-0">Keterangan</label>
              </div><!-- col -->
              <div class="col-md-8 mg-t-5 mg-md-t-0">
                <textarea name="ket" class="form-control">-</textarea>
              </div><!-- col -->
            </div><!-- row -->

            <div class="row row-xs align-items-center mg-b-20">
              <div class="col-md-4">
                <label class="form-label mg-b-0">Tanggal Pelunasan</label>
              </div><!-- col -->
              <div class="col-md-8 mg-t-5 mg-md-t-0">
                <input type="datetime-local" name="tgl" class="form-control">
              </div><!-- col -->
            </div><!-- row -->

            <button type="submit" class="btn btn-az-primary pd-x-30 mg-r-5">Lunasi</button>
            <button type="button" class="btn btn-dark pd-x-30" onclick="location.replace((location.referer && location.referer != location.href ? location.referer : '/akuntansi/piutang'))">Cancel</button>
        </form>
      </div>
    </div><!-- card-body -->
  </div>
</div>
<div class="col-sm-3">
  <div class="card bd-0">
    <div class="card-header tx-medium bd-0 tx-white bg-primary">
      Log pelunasan
    </div>
    <div class="card-body bd bd-t-0">
      <table id="datatable1" class="display responsive nowrap dataTable no-footer dtr-inline collapsed" role="grid" aria-describedby="datatable2_info">
        <thead>
          <tr role="row">
            <th>Tgl</th>
            <th>Sisa Awal</th>
            <th>Bayar</th>
            <th>Sisa Akhir</th>
            <th>Ket</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <?php
          foreach ($log as $tgl => $v) {
            ?>
            <tr role="row" class="even">
              <td>
                <?= date('d M Y H:i:s', strtotime($tgl)); ?>
              </td>
              <td>
                <?= uang::format($v->total); ?>
              </td>
              <td>
                <?= uang::format($v->bayar); ?>
              </td>
              <td>
                <?= uang::format($v->total - $v->bayar); ?>
              </td>
              <td>
                <?= (empty($v->ket) ? '-' : $v->ket); ?>
              </td>
              <td>
                <?= (empty($v->staff) ? '-' : $v->staff); ?>
              </td>
            </tr>
          <?php
          }
          ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>