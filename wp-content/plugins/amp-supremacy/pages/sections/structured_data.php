<div class="uk-panel uk-panel-box" id="structured_data">
    <div class="uk-form">
        <fieldset>
            <legend><i class="fa fa-map"></i> Structured Data:</legend>
            <div class="uk-form-row">
                <label for="amp-structured-data-logo"> Logo to display in Google Structured Data</label><br>
                <input class="settings-page-control" id="structured_data_logo_image" name="amps[structured_data_logo_image]" type="text" placeholder="Upload/Select an Image" value="<?php echo (!empty($amps['structured_data_logo_image'])) ? $amps['structured_data_logo_image'] : ''; ?>">
                <button class="uk-button uk-button-small uk-button-primary imageSelect settings-page-control" data-target="structured_data_logo_image" type="button">Browse</button>
            </div>
        </fieldset>
        
    </div>
</div>