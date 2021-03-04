<?php

require_once('../app/init.php');

if (isDev()) {
  session_start();
  if (isset($_POST['fake-mutation'])) {
    set_cookie('fake-mutation', trim($_POST['value']), 10);
    dumpJSON(['success' => true, 'message' => 'Fake mutation injected successful']);
  }
  include __DIR__ . '/../app/views/templates/header.php';
?>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <form action="" method="post">
            <input type="hidden" name="fake-mutation" value="<?= uniqid() ?>">
            <div class="d-flex justify-content-between">
              <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">Rp</div>
                </div>
                <input type="text" class="form-control" name="value" id="fake-mutation" placeholder="ammounts of mutation">
              </div>

              <div>
                <button type="submit" class="btn btn-primary">submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
<?php
  include __DIR__ . '/../app/views/templates/footer.php';
}
?>

<script>
  $('input').on('input', function(e) {
    e.preventDefault();
    switch ($(this).attr('id')) {
      case 'fake-mutation':
        var orivalue = $(this).val();
        setTimeout(() => {
          $(this).val(orivalue.replace(/\D/g, ''));
        }, 500);
        break;

      default:
        break;
    }
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');

    $.ajax({
      type: form.attr('method').toUpperCase(),
      url: url,
      data: form.serialize(), // serializes the form's elements.
      success: function(data) {
        toastr.success('Info', data.message);
      }
    });
  });
</script>