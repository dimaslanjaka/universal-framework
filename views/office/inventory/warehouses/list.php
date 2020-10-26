<?php


$list = pdo()->select('warehouses')->row_array();
if (!\ArrayHelper\helper::isSequent($list)) {
  $list = [$list];
}

?>

<table class="table" id="dtMaterial">
  <thead></thead>
  <tbody></tbody>
</table>

<script>
  const warehouses = <?= json_encode($list) ?>;
</script>