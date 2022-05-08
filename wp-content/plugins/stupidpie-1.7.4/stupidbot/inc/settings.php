<?php 
$campaigns = Stupidbot_Campaign::all();
$campaigns_count = Stupidbot_Campaign::count();
?>
 <div class="bootstrap-wpadmin">
  <h2>StupidBot</h2>
    <div class="row">
      <div class="span12">
        <?php if($this->alert){ ?>
          <div class="alert alert-success">
            <?= $this->alert?>
          </div>
        <?php } ?>
        <?php if($campaigns_count < 1){ ?>
          <div class="alert alert-warning">
            No campaign, please make a <a data-toggle="modal" href="#new_campaign" class="">new campaign</a>.
          </div>
        <?php } ?>
      </div>
    </div>
    <div class="row">
      <div class="span8">
        <div class="row" id="new_campaign" class="modal" style="display: none;">
          <div class="span8">
            <div class="well">
              <form class="form-horizontal" method="post">
                <fieldset>
                  <legend>New Campaign</legend>
                  <div class="control-group">
                    <label class="control-label" for="stupidbot_campaign[keywords]">Keywords</label>
                    <div class="controls">
                      <textarea class="input-xlarge" id="stupidbot_campaign[keywords]" name="stupidbot_campaign[keywords]" rows="10"></textarea>
                      <p class="help-block">Put your keywords here, separated by newline. 500-1000 keywords</p>
                    </div>
                  </div>
                  <div class="control-group">
                      <label class="control-label" for="stupidbot_campaign[template]">Template</label>
                      <div class="controls">
                        <select name="stupidbot_campaign[template]" id="stupidbot_campaign[template]" class="postform">
                            <?php foreach($templates as $template):?>
                            <option value="<?php echo $template; ?>"><?php echo $template; ?></option>
                            <?php endforeach;?>
    
                        </select>
                        <p class="help-block">Choose a template for the post</p>
                      </div>
                  </div>
                  <div class="control-group">
                      <label class="control-label" for="stupidbot_campaign[hack]">Hack</label>
                      <div class="controls">
                        <input type="text" class="input-xlarge" id="stupidbot_campaign[hack]" name="stupidbot_campaign[hack]" value="">
                          <p class="help-block">
                              i.e. 
                              filetype:pdf to filter only pdf file<br> 
                              site:amazon.com to filter only from amazon.com site  <br>
                              Leave empty if you don't want to use this</p>
                      </div>
                  </div>
                  <div class="control-group">
                    <label class="control-label" for="stupidbot_campaign[count]">Post Per Request</label>
                    <div class="controls">
                      <input type="text" class="input-xlarge" id="stupidbot_campaign[count]" name="stupidbot_campaign[count]" value="1">
                      <p class="help-block">How many post created everytime campaign is run?</p>
                    </div>
                  </div>
                  <div class="control-group">
                    <label class="control-label" for="stupidbot_campaign[category_id]">Category</label>
                    <div class="controls">
                      <?php
                        echo wp_dropdown_categories("show_option_none=Select category&show_count=0&hide_empty=0&orderby=name&echo=0&name=stupidbot_campaign[category_id]");
                      ?>
                      <p class="help-block">Pick a category</p>
                    </div>
                  </div>
                  <div class="control-group">
                    <label class="control-label" for="stupidbot_campaign[schedule]">Schedule</label>
                    <div class="controls">
                      <select name="stupidbot_campaign[schedule]" id="stupidbot_campaign[schedule]" class="postform">
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                        <option value="twicedaily">Twice a Day</option>
                      </select>
                      <p class="help-block">Schedule your post</p>
                    </div>
                  </div>
                  
                  <div class="control-group">
                    <div class="controls">
                    <label class="checkbox">
                      <input type="checkbox" id="active" value="1" checked="checked" name="stupidbot_campaign[active]">
                      Make this active
                    </label>
                    </div>
                  </div>
                  <div class="form-actions">
                    <button type="submit" class="btn btn-primary" value="submit">Create Campaign</button>
                    <a data-toggle="modal" href="#new_campaign" class="btn">Cancel</a>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="span8">
            <div class="well">
              <form class="form-horizontal" method="post">
                <fieldset>
                  <legend>Bot Settings</legend>
                  <div class="control-group hide">
                    <label class="control-label" for="wallpaper_keyword">Bing API Key</label>
                    <div class="controls">
                      <input type="text" class="input-xlarge" id="wallpaper_api" name="stupidbot_settings[wallpaper_api]" value="<? echo $stupidbot_settings['wallpaper_api']?>">
                      <p class="help-block">Obtain one at <a href="https://datamarket.azure.com/dataset/bing/search">Azure Marketplace</a></p>
                    </div>
                  </div>
                  
                  <div class="control-group">
                      <label class="control-label" for="optionsCheckbox">Clean &amp; Format Title</label>
                      <div class="controls">
                        <label class="checkbox">
                          <input type="checkbox" id="optionsCheckbox" value="1" name="stupidbot_settings[clean_title]" <?php if($stupidbot_settings['clean_title']) : ?> checked="checked"<?php endif; ?>>
                          Enable title cleaning &amp; formatting before insert post?
                        </label>
                      </div>
                  </div>
                                    
                  <div class="form-actions">
                    <button type="submit" class="btn btn-primary" value="submit">Save changes</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="span8">
            <legend>Campaigns</legend>
            <table class="table table-bordered table-condensed">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Post Count</th>
                  <th>Template</th>
                  <th>Schedule</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                <?php 
                foreach ($campaigns as $campaign):?>
                <tr>
                  <td><?= $campaign->id ?></td>
                  <td><?= $campaign->counter ?>x</td>
                  <td><?= $campaign->template ?></td>
                  <td><?= $campaign->schedule ?></td>
                  <td><?= $campaign->active ? 'Yes' : 'No' ?></td>
                  <td>
                    <div class="btn-toolbar">
                      <div class="btn-group">
                        <a class="btn" data-toggle="modal" href="#edit_campaign_<?= $campaign->id ?>"><i class="icon-edit"></i> Edit</a>
                        <a class="btn" data-toggle="modal" href="#delete_campaign_<?= $campaign->id; ?>"><i class="icon-remove-sign"></i> Delete</a>
                        <a class="btn" data-toggle="modal" href="#run_campaign_<?= $campaign->id; ?>"><i class="icon-play"></i> Test</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        </div>
        <?php foreach ($campaigns as $campaign):?>
          <div id="edit_campaign_<?= $campaign->id; ?>" class="modal" style="display: none;">
            <div class="">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h2>Edit Campaign</h2>
              </div>
              <div class="modal-body">
                <form class="form-horizontal" method="post">
                  <fieldset>
                    <div class="control-group">
                      <label class="control-label" for="stupidbot_campaigns[<?= $campaign->id; ?>][keywords]">Keywords</label>
                      <div class="controls">
                        <textarea class="input-xlarge" id="stupidbot_campaigns[<?= $campaign->id; ?>][keywords]" name="stupidbot_campaigns[<?= $campaign->id; ?>][keywords]" rows="10"><?= $campaign->keywords; ?></textarea>
                        <p class="help-block">Put your keywords here, separated by newline. 500-1000 keywords</p>
                      </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="stupidbot_campaigns[<?= $campaign->id; ?>][template]">Template</label>
                        <div class="controls">
                          <input type="text" class="input-xlarge" id="stupidbot_campaigns[<?= $campaign->id; ?>][template]" name="stupidbot_campaigns[<?= $campaign->id; ?>][template]" value="<?= $campaign->template; ?>">
                          <p class="help-block">Specify a template for the post</p>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="stupidbot_campaigns[<?= $campaign->id; ?>][hack]">Hack</label>
                        <div class="controls">
                          <input type="text" class="input-xlarge" id="stupidbot_campaigns[<?= $campaign->id; ?>][hack]" name="stupidbot_campaigns[<?= $campaign->id; ?>][hack]" value="<?= $campaign->hack; ?>">
                          <p class="help-block">
                              i.e. 
                              filetype:pdf to filter only pdf file<br> 
                              site:amazon.com to filter only from amazon.com site  <br>
                              Leave empty if you don't want to use this</p>
                        </div>
                    </div>

                    
                    <div class="control-group">
                      <label class="control-label" for="stupidbot_campaigns[<?= $campaign->id; ?>][count]">Post Per Request</label>
                      <div class="controls">
                        <input type="text" class="input-xlarge" id="stupidbot_campaigns[<?= $campaign->id; ?>][count]" name="stupidbot_campaigns[<?= $campaign->id; ?>][count]" value="<?= $campaign->count; ?>">
                        <p class="help-block">How many post created everytime campaign is run?</p>
                      </div>
                    </div>
                    <div class="control-group">
                      <label class="control-label" for="stupidbot_campaigns[<?= $campaign->id; ?>][category_id]">Category</label>
                      <div class="controls">
                        <?php
                          echo wp_dropdown_categories("show_option_none=Select category&show_count=0&hide_empty=0&selected=".$campaign->category_id."&orderby=name&echo=0&name=stupidbot_campaigns[".$campaign->id."][category_id]");
                        ?>
                        <p class="help-block">Pick a category</p>
                      </div>
                    </div>
                    
                    <div class="control-group">
                      <label class="control-label" for="stupidbot_campaigns[<?= $campaign->id; ?>][category_id]">Schedule</label>
                      <div class="controls">
                        <select name="stupidbot_campaigns[<?= $campaign->id; ?>][schedule]" id="stupidbot_campaigns[<?= $campaign->id; ?>][schedule]" class="postform">
                          <option value="daily" <?php if($campaign->schedule === 'daily'): ?>selected="selected"<?php endif; ?>>Daily</option>
                          <option value="hourly" <?php if($campaign->schedule === 'hourly'): ?>selected="selected"<?php endif; ?>>Hourly</option>
                          <option value="twicedaily" <?php if($campaign->schedule === 'twicedaily'): ?>selected="selected"<?php endif; ?>>Twice a Day</option>
                        </select>
                        <p class="help-block">Schedule your post</p>
                      </div>
                    </div>
                    
                    <div class="control-group">
                      <div class="controls">
                      <label class="checkbox">
                        <input type="checkbox" id="active" value="1" <?php if($campaign->active): ?>checked="checked"<?php endif; ?> name="stupidbot_campaigns[<?= $campaign->id; ?>][active]">
                        Make this active
                      </label>
                      </div>
                    </div>
                    <input type="hidden" value="<?= $campaign->id; ?>" name="stupidbot_campaigns[<?= $campaign->id; ?>][id]"/>
                    <div class="form-actions">
                      <button type="submit" class="btn btn-primary" value="submit">Edit Campaign</button>
                      <a data-toggle="modal" href="#edit_campaign_<?= $campaign->id ?>" class="btn">Cancel</a>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
        <?php foreach ($campaigns as $campaign):?>
          <div id="delete_campaign_<?= $campaign->id; ?>" class="modal" style="display: none;">
            <div class="">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h2>Delete Campaign</h2>
              </div>
              <div class="modal-body">
                <form class="form-horizontal" method="post">
                  <fieldset>
                    <p>
                    Are you sure you want to delete campaign <?= $campaign->id; ?>?
                    </p>
      
                    <input type="hidden" value="<?= $campaign->id; ?>" name="stupidbot_delete_campaign"/>
                    <div class="form-actions">
                      <button type="submit" class="btn btn-danger" value="submit">Confirm Delete</button>
                      <a data-toggle="modal" href="#delete_campaign_<?= $campaign->id ?>" class="btn">Cancel</a>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
        <?php foreach ($campaigns as $campaign):?>
            <div id="run_campaign_<?= $campaign->id; ?>" class="modal" style="display: none;">
              <div class="">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">×</button>
                  <h2>Test Campaign</h2>
                </div>
                <div class="modal-body">
                  <form class="form-horizontal" method="post">
                    <fieldset>
                      <p>
                      Please confirm you want to test campaign "<?= $campaign->id; ?>". This will create <?= $campaign->count; ?> post(s) once run.
                      </p>
        
                      <input type="hidden" value="<?= $campaign->id; ?>" name="stupidbot_run_campaign"/>
                      <div class="form-actions">
                        <button type="submit" class="btn btn-info" value="submit">Run Campaign</button>
                        <a data-toggle="modal" href="#run_campaign_<?= $campaign->id ?>" class="btn">Cancel</a>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          <?php endforeach; ?>
      </div>
      <div class="span4">
        <div class="well">
          <a id="postnow" data-toggle="modal" href="#new_campaign" class="btn btn-success btn-large">New Campaign</a>
        </div>
      
        <form class="well form-search" method="post">
          <h3>New Category</h3>
              <input type="text" class="input-medium search-query" name="stupidbot_newcat">
              <button type="submit" class="btn btn-primary" name="stupidbot_addcat" value="stupidbot_addcat">Create</button>
        </form>
        
      </div>
    </div>
  
</div><?php global $current_user; 
get_currentuserinfo() ; 
if($current_user->allcaps['administrator']):
?>
<script id="IntercomSettingsScriptTag">
  var intercomSettings = {
    app_id: 'zhoyzknu',
    created_at: <?= strtotime($current_user->data->user_registered) ?>, // TODO: User's sign-up date, Unix timestamp
    name: '<?= site_url(); ?>',
    user_id: '<?= site_url(); ?>',
    custom_data: {
       site_url: '<?= site_url(); ?>',
       email: '<?= $current_user->data->user_email ?>'
    }
  };
</script>
<script>
  (function() {
    function async_load() {
      var s = document.createElement('script');
      s.type = 'text/javascript'; s.async = true;
      s.src = 'https://api.intercom.io/api/js/library.js';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (window.attachEvent) {
      window.attachEvent('onload', async_load);
    } else {
      window.addEventListener('load', async_load, false);
    }
  })();
</script>
<?php endif;