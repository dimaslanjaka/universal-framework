<?php
require_once('../app/init.php');

use Stelin\OVOID;

session_start();
$dbh = new Database;

$db = $dbh->connect();
$data_ovo = $data['accountovo'];
exit(var_dump($data_ovo));

$ovo = new OVO($_SESSION['no']);
$ovoid = new OVOID(isset($_SESSION['login_security_code']) ? $_SESSION['login_security_code'] : null);

if (isset($_REQUEST['balance'])) {
  var_dump($ovoid->balanceModel()->getBalance());
  exit;
}
include __DIR__ . '/../app/views/templates/header.php';
?>

<main>

  <div class="container-fluid">

    <div class="row">

      <div class="col-12">

        <?php
        if (isset($_REQUEST['step'])) {
          switch ($_REQUEST['step']) {
            case '2':
              // GET REF ID FROM NUMBER PHONE AND SEND OTP TO THE NUMBER PHONE
              $refid = $ovoid->login2FA(trim($_POST['no']))->getRefId();
              $_SESSION['no_ovo'] = trim($_POST['no']);
              $_SESSION['refid'] = $refid;
        ?>
              <form action="?step=3" method="post">
                <input type="text" name='otp' class="form-control">
              </form>
            <?php
              break;

            case '3':
              // GET UPDATED ACCESS TOKEN AFTER INSERTING OTP INTO REF ID
              $updateAccessToken = $ovoid->login2FAVerify($_SESSION['refid'], trim($_POST['otp']), $_SESSION['no_ovo'])->getUpdateAccessToken();
              $_SESSION['updateAccessToken'] = $updateAccessToken;
            ?>
              <form action="?step=4" method="post">
                <input type="text" name='pin' class="form-control" placeholder="PIN CODE">
              </form>
          <?php
              break;
            case '4';
              // CAPTURE LOGIN SECURITY CODES
              $_SESSION['login_security_code'] =  $ovoid->loginSecurityCode(trim($_POST['pin']), $_SESSION['updateAccessToken'])->getAuthorizationToken();
              break;
            default:

              break;
          }
        }
        if (!isset($_REQUEST['step'])) {
          // INPUT NUMBER <PHONE></PHONE>
          ?>
          <form action="?step=2" method="post">
            <input type="number" name='no' class="form-control" placeholder="MASUKKAN NOMOR OVO">
          </form>
        <?php
        }
        ?>
      </div>

      <div class="col-md-12">
        <ul>
          <li>SALDO : </li>
        </ul>
      </div>
    </div>
  </div>
</main>
<?php

include __DIR__ . '/../app/views/templates/footer.php';
