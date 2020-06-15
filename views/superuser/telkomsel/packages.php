<?php include __DIR__ . '/../breadcrumb.php'; ?><section>
  <div class="card">
    <div class="mb-3">
      <div class="card-label">Packages list</div>
    </div>
    <div class="card-body">
      <table id="pkgList" class="table table-bordered" style="max-width: 100%;">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="paket-lists" class="text-left">
          <tr>
            <td colspan="5">
              <center>No Data</center>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<?php

const datatables = true;
