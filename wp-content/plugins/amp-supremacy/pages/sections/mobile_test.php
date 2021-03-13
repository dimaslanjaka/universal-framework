<div class="uk-panel uk-panel-box" id="templatesettings">

    <div class="uk-alert">
        <p><span class="uk-badge">NOTE</span> By using Mobile Ready Test you will be able to verify how Google is treating the selected page or post. Passing a test with 100% means that your page/post is responsive and ready for mobile usage.</p>
    </div>
    <hr/>
    <div class="uk-panel uk-panel-box" style="border-top-color: #ccc !important;">
        <div class="uk-form">
            <fieldset>
                <legend><i class="fa fa-dashboard"></i> Mobile Ready Test:</legend>

                <div class="uk-form-row">
                    <label for="mobile-test-url"><i class="fa fa-globe"></i> URL to Check:</label>
                    <input id="mobile-test-url" type="url" placeholder="eg. http://mywebsite.com/page-1/"/>
                    <button class="uk-button uk-button-small uk-button-success uk-button-run-test" type="button"><i class="fa fa-play"></i> Run Test</button>
                </div>

                <div class="uk-form-row mobile-results" style="display: none">
                    <hr>

                    <h3 class="mobile-status">...</h3>

                    <div class="uk-progress">
                        <div class="uk-progress-bar" style="width: 100%;">...</div>
                    </div>

                    <div class="uk-grid uk-grid-small mobile-problems" style="display:none">
                        <div class="uk-width-1-2">
                            <dl class="mobile-success-list"></dl>
                            <dl class="mobile-problems-list"></dl>
                        </div>
                        <div class="uk-width-1-2">
                            <div class="mobile-screenshot-container">
                                <img src="" class="mobile-screenshot"/>
                                <div class="mobile-screenshot-tab">
                                    <a target="_blank" href="#" class="mobile-screenshot-button"><span class="mobile-screenshot-square"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
</div>
