<center>
  <h2>Insert Blogger Email</h2>
</center>
<form action="" method="post">
  <input type="text" name="bemail" id="" class="form-control" placeholder="username.secret@blogger.com" <?=(isset($_SESSION['for']) ? 'value="' . $_SESSION['for'] . '"' : false); ?>>
  <button type="submit" class="btn-block btn btn-primary">Submit</button>
</form>
<?php
if (isset($_COOKIE['for'])) {
  ?>
<div class="mt-5">
  <p>Last Email</p>
  <ol>
    <li><?=$_COOKIE['for']; ?>
    </li>
  </ol>
</div>
<?php
}
