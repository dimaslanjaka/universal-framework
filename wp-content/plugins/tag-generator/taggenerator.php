<?php
class TagGeneratorApiException extends Exception {};

/*
  Plugin Name: Tag Generator
  Description: Generates tags for posts, using Yahoo and Yandex API. Supported text language: Russian, English, Polish, Ukrainian, German, French, Belorussian, Spanish, Italian, Bulgarian, Czech, Turkish, Romanian, Serbian.
  Version: 0.1.3.7
  Author: Nikitian
  Author URI: http://nikitian.ru/
 */

class TagGenerator {

    public $pluginuid = 'taggenerator';
    public $default_language = null;
    public $use_title = null;
    
    /**
     * @var Yandex_Translate
     */
    protected $translator;

    /**
     * Default Yandex key
     * @var string
     */
    public $yandexkey = 'trnsl.1.1.20131206T094251Z.b51e11a5a422e13b.40d21e303b11a66d49609216926a325c0fddbbbe';
    public $yahooID = 'dj0yJmk9RHhVemM1bzhUQzM2JmQ9WVdrOU5YYzVhRnBOTXpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1jNA--';

    public function TagGenerator() {
        $this->RegisterHooks();
        load_plugin_textdomain($this->pluginuid, PLUGINDIR . '/' . dirname(plugin_basename(__FILE__)) . '/languages');
    }

    private function autoTagSetup() {
        add_action('publish_post', array(&$this, 'TagOne'), 20);
        $this->autoTag = 1;
    }

    private function autoTagRemove() {
        remove_action('publish_post', array(&$this, 'TagOne'), 20);
        $this->autoTag = 0;
    }

    private function RegisterHooks() {
        add_action('admin_menu', array(&$this, 'AdminMenu'));
        $this->autoTag = get_option($this->pluginuid . '_autoTag');
        if ($this->autoTag === false) {//Not specified
            add_option($this->pluginuid . '_autoTag', 1);
            $this->autoTagSetup();
        } elseif ($this->autoTag) {//1
            $this->autoTagSetup();
        } elseif ($this->autoTag !== false) {
            $this->autoTagRemove();
        }
        if ($this->default_language === null) {
            $this->default_language = get_option($this->pluginuid . '_language');
            if ($this->default_language === false) {
                add_option($this->pluginuid . '_language', 'ru');
                $this->default_language = 'ru';
            }
        }
        if ($this->use_title === null) {
            $this->use_title = get_option($this->pluginuid . '_use_title');
            if ($this->use_title === false) {
                add_option($this->pluginuid . '_use_title', '1');
            }
        }
        $this->yandexkey = get_option($this->pluginuid . '_YandexKey', $this->yandexkey);
    }

    public function Prefences() {
        echo'<h2>' . __('Tag Generation', $this->pluginuid) . ' <a href="?page=' . $_REQUEST['page'] . '" class="button" style="font-size: 20px;" title="' . __('Return back', $this->pluginuid) . '">&larr;</a></h2>';
        echo'<h3>' . __('Prefences', $this->pluginuid) . '</h3>';
        include_once(dirname(__FILE__) . '/Yandex_Translate.php');
        $translate = new Yandex_Translate($this->yandexkey);
        $froms = $translate->yandexGet_FROM_Langs();
        if (!empty($_POST)) {
            if (array_key_exists('lang', $_POST)) {
                update_option($this->pluginuid . '_language', $_POST['lang']);
                $this->default_language = $_POST['lang'];
            }
            update_option($this->pluginuid . '_use_title', $_POST['use_title']);
            $this->use_title = $_POST['use_title'];
            if ($_POST['auto_tag']) {
                $this->autoTagSetup();
            } else {
                $this->autoTagRemove();
            }
            update_option($this->pluginuid . '_autoTag', $_POST['auto_tag']);
            update_option($this->pluginuid . '_YandexKey', $_POST['yandex_key']);
            echo'<div id="ajax-response"><div class="updated"><p>' . __('New propertys saved', $this->pluginuid) . '</p></div></div>';
        }
        echo'<form action="" method="post">
            ' . __('Select language', $this->pluginuid) . ': <select name="lang">';
        foreach ($froms as $from) {
            echo'<option value="' . $from . '"' . ($from == $this->default_language ? ' selected="selected"' : '') . '>' . __('Language ' . $from, $this->pluginuid) . '</option>';
        }
        echo'</select><br />
            <input type="hidden" name="use_title" value="1" />
            <label>
                ' . __('Use only text without title', $this->pluginuid) . ':
                <input type="checkbox" name="use_title" value="0"' . ($this->use_title ? '' : ' checked="checked"') . ' />
            </label><br />
            <input type="hidden" name="auto_tag" value="0" />
            <label>
                ' . __('Auto generate tag for new posts', $this->pluginuid) . ':
                <input type="checkbox" name="auto_tag" value="1"' . ($this->autoTag ? ' checked="checked"' : '') . ' />
            </label><br />
            <label>
                ' . __('Yandex API-key', $this->pluginuid) . ':
                <input type="text" name="yandex_key" value="' . $this->yandexkey . '" style="width:50em" />
                <a href="https://tech.yandex.ru/keys/get/?service=trnsl" target="_blank">' . __('Register new key', $this->pluginuid) . '</a>
            </label><br />
            <input type="submit" class="button" value="' . __('Save', $this->pluginuid) . '" />
            <input type="button" class="button" value="' . __('Return back', $this->pluginuid) . '" onclick="window.location.href=\'?page=' . $_REQUEST['page'] . '\';" />
            </form>
        ';
    }

    public function TagOne($post_id = null, $text = '') {
        $object = get_post($post_id);
        if ($object == false || $object == null) {
            return false;
        }
        //if this post already has tags then no tagging needed
        /* $has_tags = get_the_tags($object->ID);
          if ($has_tags) {
          unset($object);
          if($text!=''){
          return __('Nothing to do. Post already has tags.',$this->pluginuid);
          }
          return false;
          } */
        $objectarr = (array) $object;

        if ($this->default_language != 'en' && is_null($this->translator)) {
            include_once(dirname(__FILE__) . '/Yandex_Translate.php');
            $this->translator = new Yandex_Translate($this->yandexkey);
        }
        if ($text == '') {
            //Build searched string
            if ($this->use_title) {
                $text = $objectarr['post_title'] . ' ' . $objectarr['post_content'];
            } else {
                $text = $objectarr['post_content'];
            }
        }
        try {
            if ($this->default_language != 'en') {
                if($this->default_language == 'ru') {
                    $text = strip_tags(stripslashes($this->translator->yandexTranslate($this->default_language, 'en', strip_tags(stripslashes($text)))));
                } else {
                    $ru = strip_tags(stripslashes($this->translator->yandexTranslate($this->default_language, 'ru', strip_tags(stripslashes($text)))));
                    $text = strip_tags(stripslashes($this->translator->yandexTranslate('ru', 'en', strip_tags(stripslashes($ru)))));
                }
            } else {
                $text = strip_tags(stripslashes($text));
            }
            $tags = $this->YahooYqlTags($text);
            $ret = '';
            if(is_string($tags)) {
                $tags = array($tags);
            }
            if (sizeof($tags) > 0) {
                $tags = array_unique($tags);
                if ($this->default_language != 'en') {
                    if($this->default_language == 'ru') {
                        $rutagsstr = $this->translator->yandexTranslate('en', $this->default_language, implode(',', $tags));
                    } else {
                        $rutagsstr = $this->translator->yandexTranslate('en', 'ru', implode(',', $tags));
                        $rutagsstr = $this->translator->yandexTranslate('ru', $this->default_language, $rutagsstr);
                    }
                } else {
                    $rutagsstr = implode(',', $tags);
                }
                $ret = $rutagsstr . '<br />';
                wp_set_post_terms($post_id, $rutagsstr, 'post_tag', true);
            } else {
                $ret = __('Can\'t generate tags', $this->pluginuid);
            }
            if (trim(strip_tags($ret)) == '') {
                $ret = __('Can\'t generate tags', $this->pluginuid);
            }
        } catch (TagGeneratorApiException $e) {
            $ret = __('Can\'t generate tags', $this->pluginuid) . ': ' . $e->getMessage();
            if(in_array($e->getCode(), array(404, 401))) {
                $ret .= '<br /><a href="?page=' . $_REQUEST['page'] . '&subact=Prefences">' . __('Set your API-key',$this->pluginuid) . '</a><script type="text/javascript">window.TagGeneratorNoRedirect = true;</script>';
            }
        }
        return$ret;
    }

    public function AdminMenu() {
        //manage page
        add_management_page(
                __('Tag Generator', $this->pluginuid)
                , __('Tag Generator', $this->pluginuid)
                , 'administrator'
                , md5(__FILE__)
                , array(&$this, 'TagAll')
        );
    }

    public function UpdateDirect() {
        echo'<h2>' . __('Tag Generation', $this->pluginuid) . ' <a href="?page=' . $_REQUEST['page'] . '" class="button" style="font-size: 20px;" title="' . __('Return back', $this->pluginuid) . '">&larr;</a></h2>';
        echo'<h3>' . __('Custom load tags', $this->pluginuid) . '</h3>';
        echo'<div id="ajax-response"><div class="updated"><p>';
        echo'#' . $_REQUEST['id'] . '<br />';
        echo $this->TagOne($_REQUEST['id']);
        echo'</p></div></div>';
        echo'<script type="text/javascript">
            if(typeof(window.TagGeneratorNoRedirect) === "undefined") {
                var timeout = setTimeout(function(){
                    var url = "' . $_REQUEST['return'] . '";
                    window.location.href = url;
                },5000);
            }
            </script>
            <a class="button" href="' . $_REQUEST['return'] . '" onclick="clearTimeout(timeout);return true;">' . __('Return back', $this->pluginuid) . '</a>
        ';
    }

    public function ListPosts() {
        echo'<h2>' . __('Tag Generation', $this->pluginuid) . ' <a href="?page=' . $_REQUEST['page'] . '" class="button" style="font-size: 20px;" title="' . __('Return back', $this->pluginuid) . '">&larr;</a></h2>';
        echo'<h3>' . __('List posts', $this->pluginuid) . '</h3>';
        global $wpdb;
        $onpage = 20;
        $countdb = $wpdb->get_results("SELECT count(*) as c FROM {$wpdb->posts} WHERE post_status = 'publish' and post_type = 'post'", ARRAY_A);
        $count = $countdb[0]['c'];
        $posts = $wpdb->get_results("SELECT id FROM {$wpdb->posts} WHERE post_status = 'publish' and post_type = 'post' order by id desc limit " . intval($_REQUEST['paged'] * $onpage) . "," . $onpage, ARRAY_A);
        echo'<a class="button" href="?page=' . $_REQUEST['page'] . '">' . __('Load all', $this->pluginuid) . '</a><br />';
        echo'<table class="wp-list-table widefat fixed posts" cellspacing="0">';
        echo'<thead>
            <tr>
            <th id="cb" class="manage-column column-comments">#</th>
            <th class="manage-column column-cb column-title sortable desc">' . __('Title', $this->pluginuid) . '</th>
            <th class="manage-column column-cb column-tags">' . __('Tags', $this->pluginuid) . '</th>
            <th class="manage-column column-cb column-tags">' . __('Action', $this->pluginuid) . '</th>
            </tr>
            </thead>';
        echo'<tbody id="the-list">';
        $i = 0;
        foreach ($posts as $post) {
            $i++;
            $object = get_post($post['id']);
            $has_tags = get_the_tags($object->ID);
            echo'<tr>
                <td>' . $object->ID . '</td>
                <th>
                    <a href="./post.php?post=' . $object->ID . '&action=edit">' . $object->post_title . '</a>
                </th>
                <td>';
            if ($has_tags) {
                foreach ($has_tags as $tag) {
                    echo'<a href="/wp-admin/edit.php?tag=' . $tag->slug . '">' . $tag->name . '</a> ';
                }
            }
            echo '</td>
                <td><a class="button" href="?subact=UpdateDirect&id=' . $object->ID . '&page=' . $_REQUEST['page'] . '&return=' . urlencode($_SERVER['REQUEST_URI']) . '">' . __('Load tags from Yahoo', $this->pluginuid) . '</a></td>
                </tr>';
        }
        echo'</tbody></table>';
        $get = $_GET;
        if (array_key_exists('paged', $_GET)) {
            unset($get['paged']);
        }
        echo '<div class="tablenav bottom"><div class="tablenav-pages">' . paginate_links(array(
            'current' => (array_key_exists('paged', $_REQUEST) ? $_REQUEST['paged'] : 1),
            'total' => floor($count / $onpage),
            'add_args' => $get,
            'format' => '?paged=%#%',
            'end_size' => $onpage,
        )) . '</div></div>';
    }

    public function TagAll() {
        if (array_key_exists('subact', $_REQUEST) && method_exists($this, $_REQUEST['subact'])) {
            call_user_func(array($this,$_REQUEST['subact']));
            return;
        }
        echo'<h2>' . __('Tag Generation', $this->pluginuid) . '</h2>';
        $byiter = 5;
        global $wpdb;
        $countdb = $wpdb->get_results("SELECT count(*) as c FROM {$wpdb->posts} WHERE post_status = 'publish' and post_type = 'post'", ARRAY_A);
        $count = $countdb[0]['c'];
        echo __('Count posts', $this->pluginuid) . ': ' . $count . '<br />';
        if (array_key_exists('action', $_REQUEST) && $_REQUEST['action'] == 'gotag') {
            if (array_key_exists('lastiter', $_REQUEST)) {
                $lastiter = $_REQUEST['lastiter'];
            } else {
                $lastiter = 0;
            }
            if ($lastiter >= $count) {
                _e('all work done', $this->pluginuid);
                echo '<a class="button" href="?page=' . $_REQUEST['page'] . '&action=gotag" onclick="return confirm(\'' . __('Really load tags for all posts?', $this->pluginuid) . '\');">' . str_replace('##COUNT##', $count, __('Load tags for all ##COUNT## posts', $this->pluginuid)) . '</a><br />';
            } else {
                $results = $wpdb->get_results("SELECT * FROM {$wpdb->posts} WHERE post_status = 'publish' and post_type = 'post' order by id desc limit " . intval($lastiter) . "," . $byiter, ARRAY_A);
                $lastiter+=$byiter;
                echo ($count > $lastiter ? ($count - $lastiter) : '0') . ' ' . __('left', $this->pluginuid) . '<br />';
                foreach ($results as $result) {
                    echo'#' . $result['ID'] . '. ' . $result['post_title'] . ': <pre style="padding-left:20px;">Tags: ';
                    if ($this->use_title) {
                        $text = $result['post_title'] . ' ' . $result['post_content'];
                    } else {
                        $text = $result['post_content'];
                    }
                    echo $this->TagOne($result['ID'], $text);
                    echo'</pre><br />';
                }
                echo'<script type="text/javascript">
                    if(typeof(window.TagGeneratorNoRedirect) === "undefined") {
                        var timeout = setTimeout(function(){
                            var url = "tools.php?page=' . $_REQUEST['page'] . '&action=' . $_REQUEST['action'] . '&lastiter=' . $lastiter . '";
                            window.location.href = url;
                        },5000);
                    }
                    </script>
                    <a class="button" href="?page=' . $_REQUEST['page'] . '" onclick="clearTimeout(timeout);return true;">' . __('Stop', $this->pluginuid) . '</a>
                ';
            }
            return;
        }
        echo '<a class="button" href="?page=' . $_REQUEST['page'] . '&action=gotag" onclick="return confirm(\'' . __('Really load tags for all posts?', $this->pluginuid) . '\');">' . str_replace('##COUNT##', $count, __('Load tags for all ##COUNT## posts', $this->pluginuid)) . '</a><br />';
        echo '<a class="button" href="?page=' . $_REQUEST['page'] . '&subact=ListPosts">' . __('Custom load tags from list posts', $this->pluginuid) . '</a><br />';
        echo '<a class="button" href="?page=' . $_REQUEST['page'] . '&subact=Prefences">' . __('Prefences', $this->pluginuid) . '</a><br />';
    }

    private function YahooYqlTags($text) {
        $text = iconv('UTF-8', 'ISO-8859-1//TRANSLIT', stripslashes($text));
        if (strlen($text) > 1000) {
            $text = substr($text, 0, 1000);
            $text = iconv('ISO-8859-1', 'ISO-8859-1//TRANSLIT', $text);
        }
        $url = 'http://query.yahooapis.com/v1/public/yql';
        $fields = 'q=' . urlencode('select * from contentanalysis.analyze where text="' . str_replace('"', ' ', $text) . '"') . '&format=json&diagnostics=true';
        $vch = curl_init();
        curl_setopt($vch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; ru-RU; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1");
        curl_setopt($vch, CURLOPT_URL, $url);
        curl_setopt($vch, CURLOPT_POST, true);
        curl_setopt($vch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($vch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($vch, CURLOPT_CONNECTTIMEOUT, 5);

        $vurlcontents = curl_exec($vch);
        $vhttp_code = curl_getinfo($vch, CURLINFO_HTTP_CODE);
        curl_close($vch);
        $arr = json_decode($vurlcontents, true);
        if ($vhttp_code !== 200) {
            $errMessage = '';
            if(json_last_error() == 0) {
                if(is_array($arr) && array_key_exists('error', $arr) && !empty($arr['error']['description'])) {
                    $errMessage = $arr['error']['description'];
                }
            }
            throw new TagGeneratorApiException(__('Wrong response code', $this->pluginuid) . ': ' . $vhttp_code . ' ' . $errMessage);
        }
        unset($vch);
        if(array_key_exists('query', $arr) && array_key_exists('results', $arr['query']) && $arr['query']['results'] === null) {
            throw new TagGeneratorApiException(__('Yahoo error', $this->pluginuid) . ' ' . $arr['query']['diagnostics']['javascript'][0]);
        } elseif (array_key_exists('results', $arr['query'])) {
            $ret = array();
            foreach($arr['query']['results']['entities']['entity'] as $entity) {
                if(is_array($entity) && array_key_exists('text', $entity) && array_key_exists('content', $entity['text'])) {
                    $ret[] = $entity['text']['content'];
                }
            }
            return $ret;
        }
        return array();
    }

}

$TagGenerator = new TagGenerator();
