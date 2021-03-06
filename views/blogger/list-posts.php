<?php
$class = new GoogleExt\client();
/**
 * @var Google\Client
 */
$client = $class->custom_client('blogger', '/auth/google');
$service = new GoogleExt\blogger($client);
$blog = $service->get_blog_byurl('http://web-manajemen.blogspot.com/');
?>

<section>
  <div class="container">
    <div class="text-center">
      <h5 class="card-title"><?= $blog->getName() ?> (<?= $blog->getPosts()->totalItems ?> Posts)</h5>
    </div>
    <div>
      <?php
      foreach ($service->list_posts(10) as $post) {
      ?>
        <div class="card mb-2 post">
          <div class="card-body">
            <div class='card-title'>
              <div class="d-flex justify-content-between">
                <div><a href='/blogger/edit?pid=<?= $post['id'] ?>&bid=<?= $blog->getId() ?>'><?= $post->getTitle() ?></a></div>
                <div>
                  <?php
                  foreach ($post->getLabels() as $labelname) {
                  ?>
                    <span class="badge badge-primary mr-1"><?= $labelname ?></span>
                  <?php
                  }
                  ?>
                </div>
              </div>
              <small class='text-muted'><a href='<?= $post->getUrl() ?>' class="text-muted"><?= $post->getUrl() ?></a></small>
              <div class="card-body">
                <p class="card-text"><?= $post->content ?></p>
              </div>
            </div>

          </div>
        </div>
      <?php
      }
      ?>
    </div>
  </div>
</section>