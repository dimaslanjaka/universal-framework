<?php

$pen = $AChain->get_all_pendapatan()->SQL_result;
echo $core->precom($pen);
?>
<div class="row">
  <div class="col">
    <div class="card bd-0">
      <div class="card-header tx-medium bd-0 tx-white bg-indigo">
        Pendapatan
      </div><!-- card-header -->
      <div class="card-body bd bd-t-0">
        <table id="datatable1" class="display responsive nowrap dataTable no-footer dtr-inline" role="grid"
          aria-describedby="datatable1_info">
          <thead>
            <tr role="row">
              <th class="wd-15p sorting_asc" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1"
                style="width: 73px;" aria-sort="ascending" aria-label="First name: activate to sort column descending">
                Tanggal</th>
              <th class="wd-15p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1"
                style="width: 72px;" aria-label="Last name: activate to sort column ascending">Client</th>
              <th class="wd-20p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1"
                style="width: 161px;" aria-label="Position: activate to sort column ascending">Total</th>
              <th class="wd-15p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1"
                style="width: 78px;" aria-label="Start date: activate to sort column ascending">Masuk</th>
              <th class="wd-10p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1"
                style="width: 64px;" aria-label="Salary: activate to sort column ascending">Piutang</th>
              <th class="wd-25p sorting" tabindex="0" aria-controls="datatable1" rowspan="1" colspan="1"
                style="width: 162px;" aria-label="E-mail: activate to sort column ascending">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($pen as $tr) {?>
            <tr role="row" class="odd">
              <td class="sorting_1" tabindex="0">
                <?=date('d M Y H:i:s', strtotime($tr->pdate)); ?>
              </td>
              <td>
                <?=dimas_user::user_init(OPT())->set_user($tr->client)->dname(); ?>
              </td>
              <td>
                <?=uang::format($tr->total); ?>
              </td>
              <td>
                <?=uang::format($tr->pendapatan_in); ?>
              </td>
              <td>
                <?=uang::format($tr->piutang_sisa); ?>
              </td>
              <td>
                <?=$tr->keterangan; ?>
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