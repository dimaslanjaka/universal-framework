<section>
    <div class="m-4">
        <div class="card">
            <div class="card-body">
                <form action="" id="translator" method="POST">
                    <div class="form-group mb-2">
                        <input type="text" class="form-control" name="title" placeholder="Insert Article Title"/>
                    </div>
                    <div class="form-group mb-2">
                        <textarea name="body" id="" cols="30" rows="10" class="form-control"></textarea>
                    </div>

                    <div class="form-group mb-2">
                        <label for="slang">Source Language</label>
                        <select name="sl" class="form-control" id="slang" select2-country=""></select>
                    </div>

                    <div class="form-group mb-2">
                        <select class="form-control" name="tl[]" multiple="multiple" select2-country=""></select>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit Article</button>
                </form>
            </div>
        </div>
    </div>
</section>

<?php
define("select2", 1);
//define("STYLESRC", "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/css/flag-icon.min.css");