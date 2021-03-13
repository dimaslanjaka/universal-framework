<?php
    // Define a variable to understand if this is the general page. If not, this settings is in post settings page.
    // Take some actions according to this.
    $isGeneralPage = !isset($isPostPage) || !$isPostPage;
    $isOption = !isset($isOption) ? ($isGeneralPage ? true : false) : $isOption;
?>

{{-- TABS IF GENERAL PAGE --}}
@if($isGeneralPage)
    <h2 class="nav-tab-wrapper">
        <a href="#" data-tab="#tab-gs-scheduling" class="
            nav-tab nav-tab-active
            {{ isset($settings['_wpcc_is_scheduling_active']) && !empty($settings['_wpcc_is_scheduling_active']) && $settings['_wpcc_is_scheduling_active'][0] ? 'nav-tab-highlight-on' : 'nav-tab-highlight-off' }}
        ">
            {{ _wpcc('Scheduling') }}
        </a>
        <a href="#" data-tab="#tab-gs-post" class="nav-tab">{{ _wpcc('Post') }}</a>
        <a href="#" data-tab="#tab-gs-seo" class="nav-tab">{{ _wpcc('SEO') }}</a>
        <a href="#" data-tab="#tab-gs-notifications" class="nav-tab">{{ _wpcc('Notifications') }}</a>
        <a href="#" data-tab="#tab-gs-advanced" class="nav-tab">{{ _wpcc('Advanced') }}</a>
        @include('partials/button-toggle-info-texts')
    </h2>

{{-- SOME BUTTONS IF POST PAGE --}}
@else
    <div class="section-header-button-container">
        <button class="button" id="btn-load-general-settings">{{ _wpcc("Load General Settings") }}</button>
        <button class="button" id="btn-clear-general-settings">{{ _wpcc("Clear General Settings") }}</button>
    </div>
@endif

{{-- SCHEDULING --}}
<div id="tab-gs-scheduling" class="tab{{ $isGeneralPage ? '' : '-inside' }}">
    @include('general-settings.tab-scheduling')
</div>

{{-- POST SETTINGS --}}
<div id="tab-gs-post" class="tab{{ $isGeneralPage ? '' : '-inside' }} {{ $isGeneralPage ? 'hidden' : '' }}">
    @include('general-settings.tab-post')
</div>

@if($isGeneralPage)
    {{-- SEO --}}
    <div id="tab-gs-seo" class="tab hidden">
        @include('general-settings.tab-seo')
    </div>

    {{-- NOTIFICATIONS --}}
    <div id="tab-gs-notifications" class="tab hidden">
        @include('general-settings.tab-notifications')
    </div>
@endif

{{-- ADVANCED --}}
<div id="tab-gs-advanced" class="tab{{ $isGeneralPage ? '' : '-inside' }} {{ $isGeneralPage ? 'hidden' : '' }}">
    @include('general-settings.tab-advanced')
</div>