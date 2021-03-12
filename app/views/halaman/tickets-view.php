<?php
$tiket = $data['tiket'];
$id_tiket = $tiket['id'];
/**
 * @var PDO
 */
$pdo = $data['db'];
$scr = "<script>window.location = window.location.href;</script>";
if (isset($_POST['read'])) {
  $pdo->exec("UPDATE tiket SET status = 'Responded' WHERE id = '$id_tiket'");
  echo $scr;
} else if (isset($_POST['close'])) {
  $pdo->exec("UPDATE tiket SET status = 'Closed' WHERE id = '$id_tiket'");
  echo $scr;
} else if (isset($_POST['wait'])) {
  $pdo->exec("UPDATE tiket SET status = 'Waiting' WHERE id = '$id_tiket'");
  echo $scr;
}
?>
<main>
  <div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <h6 class="card-title">
          <div class="d-flex justify-content-between">
            <div>Tiket#<?= $id_tiket ?></div>
            <div><?= $tiket['subjek'] ?> </div>
            <div><span class="badge badge-primary"><?= $tiket['status'] ?></span></div>
          </div>
        </h6>
        <p class="card-text"><?= $tiket['pesan'] ?></p>
        <?php
        if ($_SESSION['user']['level'] == 'Developers') {
        ?>
          <div class="d-flex justify-content-between mt-5">
            <div>
              <form action="" method="post">
                <input type="hidden" name="read" value="<?= uniqid() ?>">
                <button href="#" class="btn btn-primary" type="submit">Mark as read</button>
              </form>
            </div>
            <div>
              <form action="" method="post">
                <input type="hidden" name="close" value="<?= uniqid() ?>">
                <button href="#" class="btn btn-danger" type="submit">Mark as closed</button>
              </form>
            </div>
            <div>
              <form action="" method="post">
                <input type="hidden" name="wait" value="<?= uniqid() ?>">
                <button href="#" class="btn btn-warning" type="submit">Mark as waiting</button>
              </form>
            </div>
          </div>
        <?php
        }
        ?>
      </div>
    </div>
  </div>
</main>