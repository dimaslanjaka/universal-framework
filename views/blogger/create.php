<?php

$class = new GoogleExt\client();
/**
 * @var Google\Client
 */
$client = $class->custom_client('blogger', '/auth/google');
$service = new GoogleExt\blogger($client);
?>

<div class="container">
  <form action="" method="post">
    <div class="form-group mb-2">
      <input type="text" name="title" class="form-control" placeholder="Title post" required>
    </div>

    <div class="form-group mb-2">
      <textarea name="body" id="" cols="30" rows="10" class="form-control" placeholder="Content Article" required></textarea>
    </div>

    <div class="form-group mb-2">
      <label for="">Label</label>
      <input name="label" type="text" class="form-control" placeholder="Label1, Label2" required><small class="form-text text-muted">
        Separate with commas (,)
      </small>
    </div>

    <div class="form-group">
      <input type="hidden" name="update">
      <input type="hidden" name="blogid" value="<?= $_REQUEST['bid'] ?>">
      <button type="submit" class="btn btn-primary">Update</button>
    </div>
  </form>
</div>