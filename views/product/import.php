<div class="row">
  <div class="col-md-12">
    <pre>
    nama obat<t/>product alias (default -)<t/>brand id (1)<t/>category id (1)<t/>product type(DS/SS)<t/>unit/satuan<t/>active (1)<t/>status (1)
    </pre>
    <textarea class="form-control" id="importer" rows="10"></textarea>

    <div class="mt-3">
      <button class="btn btn-danger" id="importUpdate">Import</button>
    </div>
  </div>
</div>

<?php


$lastname = pdo()->escape("A.B.U.II (khusus ular dari Papua) inj (inj)");

$sql = "INSERT INTO Persons (LastName) VALUES ('$lastname')";
echo $sql;
