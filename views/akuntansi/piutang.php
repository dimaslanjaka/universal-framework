<?php

$piu = $AChain->get_all_piutang()->SQL_result;
if ($core->isDump()) {
  echo $core->precom($piu);
}
?>
<div class="row">
  <div class="col">
    <div class="card bd-0">
      <div class="card-header tx-medium bd-0 tx-white bg-indigo">
        Pendapatan
      </div><!-- card-header -->
      <div class="card-body bd bd-t-0">
        <table id="datatable1" class="display responsive nowrap dataTable no-footer dtr-inline" role="grid" aria-describedby="datatable1_info">
          <thead>
            <tr role="row">
              <th class="wd-15p sorting_asc" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1" style="width: 73px;" aria-sort="ascending" aria-label="">
                Tanggal</th>
              <th class="wd-15p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1" style="width: 72px;" aria-label="">Client</th>
              <th class="wd-20p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1" style="width: 161px;" aria-label="">Total Pendapatan</th>
              <th class="wd-15p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1" style="width: 78px;" aria-label="">Total Piutang</th>
              <th class="wd-10p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1" style="width: 64px;" aria-label="">Sisa Piutang</th>
              <th class="wd-25p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1" style="width: 162px;" aria-label="">Keterangan</th>
              <th class="wd-25p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1" style="width: 162px;" aria-label="">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($piu as $tr) {
              $bersisa = $tr->piutang_sisa > 0; ?>
              <tr role="row" class="odd">
                <td class="sorting_1" tabindex="0">
                  <?= date('d M Y H:i:s', strtotime($tr->pdate)); ?>
                </td>
                <td>
                  <?= dimas_user::user_init(OPT())->set_user($tr->client)->dname(); ?>
                </td>
                <td>
                  <?= uang::format($tr->pendapatan_total); ?>
                </td>
                <td>
                  <?= uang::format($tr->piutang_total); ?>
                </td>
                <td>
                  <?= uang::format($tr->piutang_sisa) . '&ensp;' . ($bersisa ? '<span class="badge badge-danger" data-toggle="tooltip-danger" data-title="Belum Lunas">BL</span>' : '<span class="badge badge-success" data-toggle="tooltip-success" data-title="Lunas">BL</span>'); ?>
                </td>
                <td>
                  <?= $tr->keterangan; ?>
                </td>
                <td>
                  <?php
                  if ($bersisa) {
                    ?>
                    <form action="/akuntansi/pelunasan-piutang" method="POST">
                      <input type="hidden" name="invoice" value="<?= $tr->inv ?>">
                      <button type="submit" class="btn">Lunasi</button>
                    </form>
                  <?php
                  }
                  ?>
                </td>
              </tr>
            <?php } ?>
          </tbody>
        </table>
      </div><!-- card-body -->
      <div class="card-footer bd-t">
        January, 20, 2017 4:30am
      </div>
    </div>
  </div>
</div>