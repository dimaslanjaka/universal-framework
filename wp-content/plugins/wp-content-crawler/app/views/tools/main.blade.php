<div class="wrap container-tools">
    <h1>{{ _wpcc('Tools') }}</h1>
    <br>

    <div class="content">
        <div class="details">
            @include('tools/crawl-post')
        </div>
        <div class="details">
            @include('tools/recrawl-post')
        </div>
        <div class="details">
            @include('tools/clear-urls')
        </div>
        <div class="details">
            @include('tools/unlock-urls')
        </div>
    </div>

</div>