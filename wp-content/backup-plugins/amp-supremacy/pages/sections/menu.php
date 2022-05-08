<div class="uk-panel uk-panel-box" id="amp_menu">

    <div class="uk-alert">
        <p><span class="uk-badge">NOTE</span> If 'Default Menu' is selected then your website's primary menu will be displayed.</p>
    </div>
    <hr/>
    <div class="uk-form">
        <fieldset>
            <div class="uk-form-row uk-grid">
                <div class="uk-width-4-4">
                    <input type="hidden" value="0" name="amps[disable_menu_display]"/>
                    <label class="switch">
                        <input id="disable_menu_display" value="1" name="amps[disable_menu_display]" <?php if (isset($amps['disable_menu_display'])) checked($amps['disable_menu_display']); ?> type="checkbox">
                        <div class="slider round"></div>
                    </label>
                    <label class="switch_button text-13">Hide Navigation Menu on AMP Page <i title="By checking this, AMP will stop displaying menu on your AMP Page." class="fa fa-info-circle"></i></label>
                </div>
            </div>
            <?php $display_menus = !empty($amps['disable_menu_display']) ? 'none' : 'block'; ?>
            <div class="uk-form-row" style="display: <?php echo $display_menus; ?> ;" id="select_amp_menu_block">
                <label for="select_amp_menu">Select AMP Menu: </label>
                <select name="amps[select_amp_menu]" id="select_amp_menu">
                    <option value="default" <?php echo (isset($amps['select_amp_menu']) && ($amps['select_amp_menu'] == 'default' )) ? 'selected' : ''; ?>>Default Menu</option>
                    <?php
                    foreach ($amp_menu_list as $amp_menu) {
                        $selected = (!empty($amps['select_amp_menu']) && ($amps['select_amp_menu'] == $amp_menu->term_id)) ? 'selected' : '';
                        echo "<option value=\"{$amp_menu->term_id}\" {$selected}>{$amp_menu->name}</option>";
                    }
                    ?>
                </select>
            </div>
        </fieldset>
    </div>
</div>
