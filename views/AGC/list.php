<div class="row">
  <?php
  $dirpath = ROOT . '/views/AGC/saved';
  if (!isreq('niche')) {
    include __DIR__ . '/lists.php';
  } else {
    $niche = isreq('niche');
    $folder = "$dirpath/$niche";
    if (file_exists($folder)) {
  ?>
      <div class="col-md-12">
        <h1>AGC Lists (Available)</h1>
        <?php
        $post_indexer = 1;
        $wrapper_indexer = 1;
        $html = '';
        for ($i = 0; $i < count($jsc); $i++) {
          if ($post_indexer == 1) {
            $html .= '<div class="jumbotron page" id="page' . $wrapper_indexer . '"><h1 class="display-4">Page ' . $wrapper_indexer . '</h1>
            <p class="lead">';
          }
          $html .= $jsc[$i];
          ++$post_indexer;
          if ($post_indexer == 10 || $i == count($jsc) - 1) {
            $post_indexer = 1;
            $html .= '</p>
            <hr class="my-4">
            <p>this agc was created for free. Its using utility <b>PHP</b> <b>NodeJS</b> for Backend, and using <b>Bootstrap 4</b>,<b>jQuery</b> for Front End</p>
            </div>';
            ++$wrapper_indexer;
          }
        }
        echo $html;
        ?>
        <div class="container">
          <nav aria-label="Page navigation">
            <ul class="pagination" id="pagination-demo"></ul>
          </nav>
        </div>
      </div>
    <?php
    } else {
    ?>
      <div class="col-md-12">
        <p class="tx-danger">Sorry this niche isnt available for now</p>
      </div>
  <?php
      include __DIR__ . '/lists.php';
    }
  }
  $script[] = 'https://cdn.jsdelivr.net/gh/josecebe/twbs-pagination@master/jquery.twbsPagination.js';
  ?>
</div>


<hr class="my-4">
<div class="container">
  <iframe src="/social.html" frameborder="0" width="100%" height="200px"></iframe>
</div>

<div class="modal fade" id="ModalContentPreview" tabindex="-1" role="dialog" aria-labelledby="ModalContentPreviewTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalContentPreviewTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <form action="/AGC/post/process" method="post">
          <input type="hidden" name="title">
          <input type="hidden" name="hash">
          <textarea name="body" class="d-none form-control"></textarea>
          <input type="hidden" name="sl">
          <input type="hidden" name="target_translator">
          <input type="hidden" name="niche">
          <button type="submit" class="btn btn-primary">Process This Article</button>
        </form>
      </div>
    </div>
  </div>
</div>