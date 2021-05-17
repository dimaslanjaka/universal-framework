<?php

use JSON\json;

?>


<section id="jsonx">
    <div class="container">
        <div class="">
            <form class="form">
                <label class="form__label--hidden" for="msg">Input json:</label>
                <textarea class="form__input" class="form__input" id="msg" placeholder="Input json..." rows="6">
            <?= json::json($_SESSION, false) ?>
        </textarea>
            </form>
        </div>
        <div class="overlay btn-group">
            <button type="button" id="load-j" class="load-json">Load</button>
            <button type="button" class="collapse">Collapse</button>
            <button type="button" class="expand"><i class="fas fa-expand-arrows-alt"></i></button>
            <button type="button" class="reset d-none">Reset</button>
        </div>
        <div id="three">
            <div id="json"></div>
        </div>
    </div>
</section>