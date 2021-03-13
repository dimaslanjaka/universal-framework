<?php

if (isset($_POST['body-wp'])) {
	require_once ABSPATH . 'wp-config.php';
	require_once ABSPATH . 'wp-includes/wp-db.php';
	require_once ABSPATH . 'wp-admin/includes/taxonomy.php';
	$title = strip_slashes_recursive($_POST['title-wp']);
	$exist = get_page_by_title($title, OBJECT, 'post');

	$body = strip_slashes_recursive($_POST['body-wp']);
	$category = [];
	$c = explode(', ', strip_slashes_recursive($_POST['category']));
	if (!empty($c)) {
		foreach ($c as $cat) {
			$catx = ucfirst(trim($cat));
			$category[] = wp_create_category($catx);
		}
	}
	$tag = [];
	if (isset($_POST['tag'])) {
		$l = explode(', ', strip_slashes_recursive($_POST['tag']));
		if (!empty($l)) {
			foreach ($l as $t) {
				$tag[] = ucfirst(trim($t));
			}
		}
	}
	$new_post = [
		'post_title' => $title,
		'post_content' => $body,
		'tags_input' => $tag,
		'post_status' => 'publish', // Choose: publish, preview, future, draft, etc.
		'post_type' => 'post',
		'post_category' => $category,
		'meta_input' => array(
			'target_translate' => $_SESSION['target_translate'],
		)
	];


	if (isset($_POST['save-wp'])) {
		if (!$exist) {
			$post_id = wp_insert_post($new_post);
			wp_set_object_terms($post_id, array_merge($category, $tag), 'meta');
		} else {
			$core->dump('post exists');
		}
	} else if (isset($_POST['update-wp'])) {
		if ($exist) {
			$exist->post_title = $title;
			$exist->post_content = $body;
			$post_id = wp_update_post($exist);
			wp_set_post_categories($exist->ID, $category);
			wp_set_post_tags($exist->ID, $tag);
			update_post_meta($exist->ID, 'target_translate', $_SESSION['target_translate']);
		}
	}
	if (isset($post_id)) {
		if (!is_wp_error($post_id)) {
			$new_post['id'] = $post_id;
			_file_(ROOT . '/assets/posts/' . $post_id . '.json', $new_post, true);
			if (!strpos(file_get_contents(ROOT . '/views/AGC/log.txt'), $_SESSION['target_translate'])) {
				file_put_contents(ROOT . '/views/AGC/log.txt', $_SESSION['target_translate'] . "\r\n", LOCK_EX | FILE_APPEND);
			}
		} else {
			$core->dump($post_id->get_error_message());
		}
	}
}

function hdump($arr)
{
	global $core;
	$core->hj();
	echo $core->cj($arr);
	exit;
}
