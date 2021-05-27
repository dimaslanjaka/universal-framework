<?php

/** @noinspection HttpUrlsUsage */
$class = new GoogleExt\client();
/**
 * @var Google\Client
 */
$client = $class->custom_client('blogger', '/auth/google');
$service = new GoogleExt\blogger($client);
$blogUrl = null;
if (isset($_SESSION['blogger']['url'])) {
    $blogUrl = $_SESSION['blogger']['url'];
} else {
    return "<div>Blog URL currently null</div>";
}
$blog = $service->byUrl($blogUrl);
?>

<section>
    <div class="m-4">
        <div class="text-center">
            <h5><?= $blog->getName() ?></h5>
        </div>
        <div>
            <div class="card">
                <div class="card-body">
                    <table class="table table-loader" id="list">
                        <thead>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>

            <?php
            /*
             foreach ($service->listPosts(10) as $post) {
                ?>
                <div class="card mb-2 post">
                    <div class="card-body">
                        <div class='card-title'>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <a href='/blogger/edit?pid=<?= $post['id'] ?>&bid=<?= $blog->getId() ?>'><?= $post->getTitle() ?></a>
                                </div>
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
                            <small class='text-muted'>
                                <a href='<?= $post->getUrl() ?>' class="text-muted"><?= $post->getUrl() ?></a>
                            </small>
                            <div class="card-body">
                                <p class="card-text"><?= $post->content ?></p>
                            </div>
                        </div>

                    </div>
                </div>
                <?php
            }
             */
            ?>
        </div>
    </div>
</section>