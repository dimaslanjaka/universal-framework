<?php

$settings = \Filemanager\file::get(ROOT . '/.vscode/settings.json', true);

$settings = sort_iterable($settings);
?>

<section>
    <div class="card">
        <div class="card-body">
            <div class="md-form mb-4 pink-textarea active-pink-textarea">
                <textarea id="vscode" class="md-textarea form-control" rows="10">
                    <?= \JSON\json::json($settings, false, true); ?>
                </textarea>
            </div>
        </div>
    </div>
</section>