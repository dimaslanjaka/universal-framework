const OAUTH2_CLIENT_ID = "439429450847-2r1oa7oj8r0hghopmaasi1brdbc3f2vj.apps.googleusercontent.com";
//const CLIENT_TOKEN =
$.get( 'https://www.googleapis.com/youtube/v3/subscriptions', {
            forChannelId: objectForDeed,
            mine: true,
            part: 'id',
            key: OAUTH2_CLIENT_ID,
            access_token: CLIENT_TOKEN
        }, function(json) {
            console.log('Youtube Subscribe:');
            console.log(json['items'].length > 0);
            if (json['items'].length > 0) {
                enable['youtube_subscribe'] = true;
                $.post(url, {
                    task: typeId,
                    user: userId,
                    csrfmiddlewaretoken: csrf
                }, function(json) {
                    el.addClass('task-ok');
                    checkYouTubeBlock(youtubeTaskNumber);
                });
            } else {
                el.addClass('task-fail');
                enable['youtube_subscribe'] = false;
            }
            reward();
        }).fail(function(resp) {
            modal_switch_domain(c_domain);
            c_modal = true;
        });