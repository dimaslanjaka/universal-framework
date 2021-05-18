<section>
    <div class="m-4">
        <div class="card">
            <div class="card-body">
                <form action="" id="translator" method="POST">
                    <input type="hidden" name="new" value="<?= uniqid() ?>">
                    <div class="form-group mb-2">
                        <input type="text" id="a-title" class="form-control" name="title"
                               placeholder="Insert Article Title"/>
                    </div>
                    <div class="form-group mb-2">
                        <textarea name="body" id="a-body" cols="30" rows="10" class="form-control"></textarea>
                    </div>

                    <div class="form-group mb-2">
                        <label for="slang">Source Language</label>
                        <select name="sl" class="form-control" id="slang" select2-country=""></select>
                    </div>

                    <div class="form-group mb-2">
                        <label for="tolang">Target Language</label>
                        <select id="tolang" class="form-control" name="tl[]" multiple="multiple"
                                select2-country=""></select>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit Article</button>
                </form>
            </div>
        </div>
    </div>
</section>

<?php
define("select2", 1);