<?php

/**
 * A parser for instant articles conversion
 *
 * @link       http://pagefrog.com
 * @since      1.0.0
 *
 * @package    pagefrog
 * @subpackage pagefrog/public
 */

class PageFrog_Parser_InstantArticles {

    private $dom = NULL;

    /*
     * List of node names with an array of node types they can be inside (body = top level)
     *  NOTE: the first element in the array is the default node created if the node isn't setup properly)
     *  NOTE 2: inline elements are allowed to stay at the top-level but will be consolidated in a p in cleanDom
     */
    private $valid_node_names = array(
        'h1' => array('body', 'p', 'li'),
        'h2' => array('body', 'p', 'li'),
        'p' => array('body', 'li'),
        'ol' => array('body'),
        'ul' => array('body'),
        'li' => array('ul', 'ol'),
        'a' => array('body', 'p', 'li', 'blockquote', 'aside', 'figcaption', 'h1', 'h2'),
        'strong' => array('body', 'p', 'li', 'blockquote', 'aside', 'figcaption', 'h1', 'h2'),
        'em' => array('body', 'p', 'li', 'blockquote', 'aside', 'figcaption', 'h1', 'h2'),
        'blockquote' => array('body'),
        'aside' => array('body'),
        'img' => array('figure'),
        'figure' => array('body'),
        'iframe' => array('figure'),
        'figcaption' => array('figure'),
        'cite' => array('figcaption'),
        'video' => array('figure'),
        'source' => array(NULL, 'video'),
        // NOTE: that <br> element's aren't actually allowed in body, but are necessary so the text is split - they're
        //       made redundant in the IA preview CSS
        'br' => array(NULL, 'body', 'p', 'li', 'h1', 'h2', 'blockquote', 'aside', 'figcaption'),
    );

    /*
     * List of node names that should be replaced (by the value)
     */
    private $replace_tag_names = array(
        'h3' => 'h2',
        'h4' => 'h2',
        'h5' => 'h2',
        'h6' => 'h2',
        'pre' => 'p'
    );

    private $invalid_attribute_names = array(
	    'style',
	    'aria-describedby',
	);
	private $invalid_tags_when_empty = array(
	    'p',
	    'strong',
	    'em',
	    'figure',
	    'li',
	    'ol',
	    'ul',
	    'blockquote',
	    'aside',
	    'h1',
	    'h2',
	    'a'
	);

	/**
	 * Tag names that should be grouped together when consolidating top-level elements
	 */
	private $inline_tag_names = array(
	    '#text',
	    'em',
	    'strong',
	    'a'
	);

    /**
      * Replaces a tag with it another identical tag (but with a new tag name)
      */
    public static function changeTagName($node, $name) {
        $childnodes = array();
        foreach ($node->childNodes as $child){
            $childnodes[] = $child;
        }
        $newnode = $node->ownerDocument->createElement($name);
        foreach ($childnodes as $child){
            $child2 = $node->ownerDocument->importNode($child, True);
            $newnode->appendChild($child2);
        }
        foreach ($node->attributes as $attrName => $attrNode) {
            $attrName = $attrNode->name;
            $attrValue = $attrNode->value;
            $newnode->setAttribute($attrName, $attrValue);
        }
        $node->parentNode->replaceChild($newnode, $node);
        return $newnode;
    }

    /**
      * Travels up the DOM tree until we reach the second node from the top (or 'body' node) and returns it
      */
    public static function getSecondTopLevelNode($start_node) {
        $node = $start_node;
        while ($node->parentNode->nodeName != 'body') {
            $node = $node->parentNode;
        }
        return $node;
    }

    /**
      * Creates an embed (figure with an iframe) element and returns it
      *  in this format: (https://developers.facebook.com/docs/instant-articles/reference/social)
      *      <figure class="op-social">
      *          <iframe>
      *              <embed-code>
      *          </iframe>
      *      </figure>
      */
    public function createEmbedElement($src_slug, $convert_function) {
        $figure_node = $this->dom->createElement('figure');
        $figure_node->setAttribute("class", "op-social");
        $this->$convert_function($figure_node, $src_slug);
        return $figure_node;
    }

    /**
      * Walks down the tree, finding the first matching decendant and returning it (from children, recursively)
      */
    public function getFirstDecendantByNodeName($node, $desired_node_name) {
        $node_lists_to_search = array($node->childNodes);
        while (count($node_lists_to_search) > 0) {
            $node_list = array_pop($node_lists_to_search);
            foreach ($node_list as $search_node) {
                if ($search_node->nodeType == XML_ELEMENT_NODE) {
                    if ($search_node->nodeName == $desired_node_name) {
                        return $search_node;
                    }
                    else if ($search_node->childNodes->length > 0) {
                        array_push($node_lists_to_search, $search_node->childNodes);
                    }
                }
            }
        }
        return NULL;
    }

    /**
     * Parses a text node, returning the number of nodes we should backtrack and reprocess
     */
    public function processTextNode($node, $is_top_level) {
        global $wp_embed;

        // remove comments
        if ($node->nodeType == XML_COMMENT_NODE) {
            $node->parentNode->removeChild($node);
        }

        if ($node->nodeType != XML_TEXT_NODE)
            return;

        // if the text contains an embed shortcode, extract it (note: URL shortcodes must be on their own lines)
        $text_lines = explode("\n", $node->wholeText);
        $new_text_lines = array();
        $new_elements = array();

        // replace any embeds with their IA counterparts
        for ($index = 0; $index < count($text_lines); $index += 1) {
            $line = $text_lines[$index];

            // depending if it's a link-injection or embed, we want to process it
            $embed_output = $wp_embed->run_shortcode($line);  // transforms the embed text (returns same text if no embed code detected)
            $link_output = wp_oembed_get(trim($line));  // returns the result of the embed transformation, False if no embed code detected

            if ($embed_output != $line || $link_output != False) {
                if (count($new_text_lines) > 0) {
                    $text_node = $this->dom->createTextNode(implode("\n", $new_text_lines));
                    array_push($new_elements, $text_node);
                    $new_text_lines = array();
                }

                $embed_dom = new DomDocument();

                if ($embed_output != $line)
                    $new_element_html = $embed_output;
                else
                    $new_element_html = $link_output;
                $embed_dom->loadHTML(mb_convert_encoding($new_element_html, 'HTML-ENTITIES', 'UTF-8'));

                $embed_container = $embed_dom->getElementsByTagName('body')->item(0);

                if (preg_match("/(youtube\.com)/i", $new_element_html, $matches) > 0) {
                    // handle YouTube case - don't duplicate the iframes!
                    $figure_node = $this->dom->createElement("figure");
                    $figure_node->setAttribute("class", "op-social");
                    $figure_node->setAttribute("pagefrog-ignore", "true");
                    $figure_node->setAttribute("pagefrog-special", "youtube");

                    foreach ($embed_container->childNodes as $embed_child) {
                        $figure_node->appendChild($this->dom->importNode($embed_child, True));
                    }
                    array_push($new_elements, $figure_node);
                }
                else {
                    $figure_node = $this->dom->createElement("figure");
                    if (preg_match("/(vine\.co|facebook\.com|instagram\.com|youtube\.com|twitter\.com)/i", $new_element_html, $matches) > 0)
                        $figure_node->setAttribute("class", "op-social");
                    else
                        $figure_node->setAttribute("class", "op-interactive");
                    $figure_node->setAttribute("pagefrog-ignore", "true");

                    $iframe_node = $this->dom->createElement('iframe');
                    $figure_node->appendChild($iframe_node);

                    foreach ($embed_container->childNodes as $embed_child) {
                        $iframe_node->appendChild($this->dom->importNode($embed_child, True));
                    }
                    array_push($new_elements, $figure_node);
                }
            }
            else if ($is_top_level && filter_var(trim($line), FILTER_VALIDATE_URL) !== false) {
                // if a top-level line is just a URL on it's own, transform it into a hyperlink
                if (count($new_text_lines) > 0) {
                    $text_node = $this->dom->createTextNode(implode("\n", $new_text_lines));
                    array_push($new_elements, $text_node);
                    $new_text_lines = array();
                }

                $a_node = $this->dom->createElement("a", trim($line));
                $a_node->setAttribute("href", trim($line));
                array_push($new_elements, $a_node);
            }
            else {
                array_push($new_text_lines, $line);
            }
        }
        if (count($new_text_lines) > 0) {
            $text_node = $this->dom->createTextNode(implode("\n", $new_text_lines));
            array_push($new_elements, $text_node);
            $new_text_lines = array();
        }

        // if we have more than 1 text element, replace the node with the new elements
        if (count($new_elements) > 1 || (count($new_elements) == 1 && $new_elements[0]->nodeType == XML_ELEMENT_NODE)) {
            foreach ($new_elements as $new_element) {
                $node->parentNode->insertBefore($new_element, $node);
            }
            for ($index = 0; $index < $node->parentNode->childNodes->length; $index += 1) {
                $child = $node->parentNode->childNodes->item($index);
                if ($child->nodeType == XML_ELEMENT_NODE && $child->nodeName == 'figure') {
                    $this->moveNodeToTopLevel($child);
                    $index -= 1;
                }
            }
            $node->parentNode->removeChild($node);
            return count($new_elements);
        }

        return 0;
    }

    /**
	 * Parses a node's children according to strategy setout in pagefrog_format_instant_articles_content
	 */
    private function parseNodeChildren($node, $is_top_level) {
        if ($node->nodeType != XML_ELEMENT_NODE) {
            $this->processTextNode($node, $is_top_level);
            return;
        }


        // for each child...
        for ($index = 0; $index < $node->childNodes->length; $index += 1) {
            $child = $node->childNodes->item($index);

            if ($child == NULL || ($child->attributes != NULL && $child->attributes->getNamedItem("pagefrog-ignore") != NULL))
                continue;

            // if it's not an element node, process it as a text node and continue
            if ($child->nodeType != XML_ELEMENT_NODE) {
                $backtrack_count = $this->processTextNode($child, $is_top_level);
                $index -= $backtrack_count;
                continue;
            }

            // if we should replace the node name, do it
            if (array_key_exists($child->nodeName, $this->replace_tag_names)) {
                $this->changeTagName($child, $this->replace_tag_names[$child->nodeName]);
                $index -= 1;
                continue;
            }

            // SPECIAL CASES
            // if it's an img and not inside a figure, be sure to wrap it with a figure tag
            if ($child->nodeName == 'img' && $child->parentNode->nodeName != 'figure') {
                $figure_node = $this->dom->createElement('figure');
                $node->insertBefore($figure_node, $child);
                $inserted_node = $figure_node->appendChild($child); // move img into figure
                $this->parseNodeChildren($figure_node, False);
                $index -= 1;
                continue;
            }
            // if it's an figure.gallery-item, process gallery item
            if ($child->nodeName == 'figure' && $child->attributes != NULL &&
                $child->attributes->getNamedItem('class') != NULL &&
                $child->attributes->getNamedItem('class')->value == 'gallery-item') {
                // get the img
                $img_node = $this->getFirstDecendantByNodeName($child, 'img');
                if ($img_node != NULL) {
                    // setup new figure node
                    $figure_node = $this->dom->createElement('figure');
                    $figure_node->setAttribute('pagefrog-ignore', 'true');
                    $figure_node->appendChild($img_node);
                    $figcaption_node = $this->getFirstDecendantByNodeName($child, 'figcaption');
                    if ($figcaption_node != NULL)
                        $figure_node->appendChild($figcaption_node);

                    // replace old figure with new figure
                    $child->parentNode->replaceChild($figure_node, $child);
                    continue;
                }
            }
            // if it's an audio tag, process it
            if ($child->nodeName == 'audio') {
                // currently only support MP3s
                // if it's not an MP3, create a link (which is what happens without any edits)
                $mp3_source = NULL;
                foreach ($child->childNodes as $grandchild) {
                    if ($grandchild->nodeType != XML_ELEMENT_NODE)
                        continue;
                    if($grandchild->nodeName != 'source')
                        continue;
                    if($grandchild->attributes != NULL && $grandchild->attributes->getNamedItem('type')->value == 'audio/mpeg') {
                        // it's an mp3
                        $mp3_source = $grandchild->attributes->getNamedItem('src')->value;
                        break;
                    }
                }

                if ($mp3_source != NULL) {
                    // it's an mp3 - create a figure containing the audio
                    /* FORMAT:
                       <figure>
                          <img src="https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/images/music-wide01.jpg">
                          <audio title="Tap to Play">
                            <source src="$mp3_source">
                          </audio>
                       </figure>
                     */
                    $figure_node = $this->dom->createElement('figure');
                    $figure_node->setAttribute("pagefrog-ignore", "true");
                    $figure_node->setAttribute("data-mode", "fullscreen");
                    $img_node = $this->dom->createElement('img');
                    $img_node->setAttribute("src", "https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/images/music-wide01.jpg");
                    $figure_node->appendChild($img_node);
                    $audio_node = $this->dom->createElement("audio");
                    $audio_node->setAttribute("title", "TAP TO PLAY");
                    $source_node = $this->dom->createElement("source");
                    $source_node->setAttribute("src", $mp3_source);
                    $audio_node->appendChild($source_node);
                    $figure_node->appendChild($audio_node);
                    $filename = basename($mp3_source);
                    $filename = substr($filename, 0, strpos($filename, '.'));
                    $figcaption_node = $this->dom->createElement("figcaption", $filename);
                    $figure_node->appendChild($figcaption_node);
                    $child->parentNode->replaceChild($figure_node, $child);
                    $this->moveNodeToTopLevel($figure_node);
                    continue;
                }
            }
            // if it's a video tag, process it
            if ($child->nodeName == 'video') {
                // currently only support MP4s
                // if it's not an MP4, create a link (which is what happens without any edits)
                $mp4_source = NULL;
                foreach ($child->childNodes as $grandchild) {
                    if ($grandchild->nodeType != XML_ELEMENT_NODE)
                        continue;
                    if($grandchild->nodeName != 'source')
                        continue;
                    if($grandchild->attributes != NULL && $grandchild->attributes->getNamedItem('type')->value == 'video/mp4') {
                        // it's an mp4
                        $mp4_source = $grandchild->attributes->getNamedItem('src')->value;
                        break;
                    }
                }

                if ($mp4_source != NULL) {
                    // it's an mp4 - create a figure containing the video
                    /* FORMAT:
                       <figure>
                          <img src="OPTIONAL_POSTER_IMAGE" data-pagefrog-type='video_poster'>
                          <video loop="loop" autoplay="autoplay" muted="muted">
                            <source src="$mp4_source">
                          </video>
                       </figure>
                     */

                    $figure_node = $this->dom->createElement('figure');
                    $figure_node->setAttribute("pagefrog-ignore", "true");
                    $video_node = $this->dom->createElement("video");
                    $video_node->setAttribute("autoplay", "autoplay");
                    $video_node->setAttribute("loop", "loop");
                    $video_node->setAttribute("muted", "muted");
                    $source_node = $this->dom->createElement("source");
                    $source_node->setAttribute("src", $mp4_source);
                    $source_node->setAttribute("type", "video/mp4");
                    $video_node->appendChild($source_node);
                    $figure_node->appendChild($video_node);

                    // set image poster if available
                    if ($child->attributes != NULL && $child->attributes->getNamedItem("poster") != NULL) {
                        $poster_src = $child->attributes->getNamedItem("poster")->value;
                        $img_node = $this->dom->createElement('img');
                        $img_node->setAttribute("src", $poster_src);
                        $img_node->setAttribute("data-pagefrog-type", 'video_poster');
                        $figure_node->appendChild($img_node);
                    }

                    $child->parentNode->replaceChild($figure_node, $child);
                    $this->moveNodeToTopLevel($figure_node);
                    continue;
                }
            }

            // if it's a <caption> element, replace the embedded media with the proper formatting
            // TODO - captions only support imgs, embeds right now
            if ($child->nodeName == 'caption') {
                // try finding an img
                $img_src = NULL;
                $node_lists_to_search = array($child->childNodes);
                while (count($node_lists_to_search) > 0) {
                    $node_list = array_pop($node_lists_to_search);
                    foreach ($node_list as $search_node) {

                        if ($search_node->nodeType == XML_ELEMENT_NODE) {
                            if ($search_node->nodeName == 'img' && $search_node->attributes != NULL && $search_node->attributes->getNamedItem("src") != NULL) {
                                $img_src = $search_node->attributes->getNamedItem("src")->value;
                                $search_node->parentNode->removeChild($search_node);
                                break;
                            }
                            else if ($search_node->childNodes->length > 0) {
                                array_push($node_lists_to_search, $search_node->childNodes);
                            }
                        }
                    }
                }
                if ($img_src != NULL) {
                    $figure_node = $this->dom->createElement('figure');
                    $img_node = $this->dom->createElement('img');
                    $img_node->setAttribute("src", $img_src);
                    $figure_node->appendChild($img_node);
                    $figcaption_node = $this->dom->createElement('figcaption');
                    while ($child->childNodes->length > 0) {
                        $figcaption_node->appendChild($child->firstChild);
                    }
                    $figure_node->appendChild($figcaption_node);

                    $node->insertBefore($figure_node, $child);
                    $node->removeChild($child);

                    $this->parseNodeChildren($figure_node, False);
                    $index -= 1;
                    continue;
                }

                // try finding an embed
                if ($child->childNodes->length == 1 && $child->firstChild->nodeType == XML_TEXT_NODE && $child->attributes && $child->attributes->getNamedItem("caption") != NULL) {
                    $should_continue = False;
                    foreach ($this->media_convert_regexes as $regex_key => $convert_function) {
                        if (preg_match($regex_key, $child->firstChild->wholeText, $matches) > 0) {
                            $figure_node = $this->createEmbedElement($matches[1], $convert_function);
                            // currently FBIA doesn't support captions in non-image figure elements - for now, append after
                            $figcaption_node = $this->dom->createElement('p', $child->attributes->getNamedItem("caption")->value);  // note it's a paragraph element for now
                            $figcaption_node->setAttribute("pagefrog-ignore", "true");
                            $child->parentNode->replaceChild($figcaption_node, $child);
                            $figcaption_node->parentNode->insertBefore($figure_node, $figcaption_node);
                            $index -= 1;
                            $should_continue = True;
                            break;
                        }
                    }
                    if ($should_continue)
                        continue;
                }
            }

            // if we don't support this node, replace it with it's contents
            if (array_key_exists($child->nodeName, $this->valid_node_names) == False) {
                foreach ($child->childNodes as $grandchild) {
                    $new_grandchild = $grandchild->cloneNode(True);
                    $node->insertBefore($new_grandchild, $child);
                    $index -= 1;
                }

                $node->removeChild($child);
                $index -= 1;
                continue;
            }
            else {
                // if we support the node, make sure it's in a proper container
                $supported_containers = $this->valid_node_names[$child->nodeName];

                if (in_array($child->parentNode->nodeName, $supported_containers) == False) {
                    // uh oh!  it's not in the proper container
                    if ($supported_containers[0] == 'body') {
                        // move the element to the top-level
                        $new_node = $this->moveNodeToTopLevel($child);
                        $this->parseNodeChildren($new_node, False);
                        $index -= 1;
                        continue;
                    }
                    else {
                        if ($supported_containers[0] == NULL) {
                            // remove the element
                            $node->removeChild($child);
                        }
                        else {
                            // wrap the element in a container tag
                            $new_node = $this->dom->createElement($supported_containers[0]);
                            $node->insertBefore($new_node, $child);
                            $inserted_node = $new_node->insertBefore($child);
                            $this->parseNodeChildren($inserted_node, False);
                        }
                        $index -= 1;
                        continue;
                    }
                }
            }

            // if it's an iframe tag, make sure we've applied the op-interactive tag to it's parent (figure)
            if ($child->nodeName == 'iframe') {
                $figure_node = $child->parentNode;
                if ($figure_node->attributes == NULL || $figure_node->attributes->getNamedItem("class") == NULL) {
                    $figure_node->setAttribute("class", "op-interactive");
                }
                else if ($figure_node->attributes->getNamedItem("class")->value != 'op-social' || $figure_node->attributes->getNamedItem("class")->value != 'op-interactive') {
                    $figure_node->setAttribute("class", "op-interactive");
                }
            }

            // iterate - parse this node's children!
            $new_top_level = False;
            if ($child->nodeName == 'body')
                $new_top_level = True;
            $this->parseNodeChildren($child, $new_top_level);
        }
    }

    /**
      * Returns a boolean value describing if a text node's contents are purely whitespace
      */
    private function isNodeWhitespace($node) {
        // note \xC2 is ascii 194 and \xA0 is ascii 160, required due to a conversion issue in DomDocument (converts &nbsp; incorrectly)
        return $node->nodeType == XML_TEXT_NODE && strlen(trim($node->wholeText, " \t\n\r\0\x0B\xC2\xA0")) == 0;
    }

    /**
      * Moves $node upwards towards the top level, splitting all of the nodes affected so $node remains (roughly) in place
      */
    private function moveNodeToTopLevel($node) {

        if ($node->parentNode->nodeName == 'body')
            return $node;

        // take care of the ancestors/previous siblings
        $this->moveNodeAncestorsToNewTree($node);

        // take care of the current node
        $second_to_top = $this->getSecondTopLevelNode($node);
        $new_node = $second_to_top->parentNode->insertBefore($node, $second_to_top->nextSibling);

        // note: the remaining tree afterwards is simply the same as before with the ancestors/previous siblings and current node removed
        return $new_node;
    }

    /**
      * A recursive function which moves a node's ancestors/older siblings into a separate tree ahead of it
      */
    private function moveNodeAncestorsToNewTree($node) {
        // if we're already at the top, nothing to do!
        if ($node->parentNode->nodeName == 'body') {
            return;
        }

        // first, obtain the tree of all ancestors/older siblings
        $new_node = $this->dom->createElement($node->parentNode->nodeName);
        for ($index = 0; $index < $node->parentNode->childNodes->length; $index += 1) {
            $child = $node->parentNode->childNodes->item($index);
            if ($child->isSameNode($node)) {
                break;
            }
            else {
                $new_node->appendChild($child);
                $index -= 1;
            }
        }

        // inject the new node above the current node
        $new_node_injected = $node->parentNode->parentNode->insertBefore($new_node, $node->parentNode);
        $new_node_injected->appendChild($node);

        // recursively run on the new node
        $this->moveNodeAncestorsToNewTree($new_node_injected);
    }

    /**
	  * Recursively cleans the DOM tree
	  *   - remove any <br> tags at the beginning or end of the child list
	  *   - moves top level text/inline elements into p container tags
	  *   - replace any  top level <br> tags with new <p> tag
	  *   - removes all unnecessary attributes (TODO)
	  *   - removes unneeded/empty tags
	  *   - removes duplicate <br> tags
	  *   - split paragraph tags if there it contains >5 <br> tags
	  *   - merge adjacent images into a slideshow
	  *   - merge multiple figcaptions in a single figure
	  *   - move any text elements in a figure into the figcaption
	  */
    private function cleanDom($node) {

        if ($node->nodeType != XML_ELEMENT_NODE || ($node->attributes != NULL && $node->attributes->getNamedItem("pagefrog-ignore") != NULL))
            return;

        // remove <br> tags at the beginning/end of the child list
        while ($node->childNodes->length > 0) {
            $child = $node->firstChild;
            if ($child->nodeType == XML_ELEMENT_NODE && $child->nodeName == 'br') {
                $node->removeChild($child);
            }
            else {
                break;
            }
        }
        while ($node->childNodes->length > 0) {
            $child = $node->lastChild;
            if ($child->nodeType == XML_ELEMENT_NODE && $child->nodeName == 'br') {
                $node->removeChild($child);
            }
            else {
                break;
            }
        }

        // if we're at the top level...
        if ($node->nodeName == 'body') {
            // move any text/inline elements into p container tags
            $p_container = $this->dom->createElement('p');
            for ($index = 0; $index < $node->childNodes->length; $index += 1) {
                $child = $node->childNodes->item($index);

                if (in_array($child->nodeName, $this->inline_tag_names)) {
                    $p_container->appendChild($child);
                    $index -= 1;
                }
                else if ($p_container->childNodes->length > 0) {
                    $node->insertBefore($p_container, $child);
                    $p_container = $this->dom->createElement('p');
                }
            }
            if ($p_container->childNodes->length > 0)
                $node->appendChild($p_container);

            // replace any <br> tags with new <p> tags
            $processed_children = array();
            for ($index = 0; $index < $node->childNodes->length; $index += 1) {
                $child = $node->childNodes->item($index);

                // if it's marked to ignore, continue past
                if ($child->nodeType == XML_ELEMENT_NODE && $child->attributes != NULL && $child->attributes->getNamedItem("pagefrog-ignore") != NULL) {
                    array_push($processed_children, $child);
                    continue;
                }

                if ($child->nodeType == XML_ELEMENT_NODE && $child->nodeName == 'br') {
                    // split the <p> tag!
                    $p_node = $this->dom->createElement('p');
                    $node->parentNode->insertBefore($p_node, $node);
                    // add the processed children into the new tag
                    foreach ($processed_children as $processed_child) {
                        $p_node->appendChild($processed_child);
                    }
                    $processed_children = array();
                }
                else {
                    array_push($processed_children, $child);
                }
            }
        }

        // for each child, remove all attributes TODO - don't remove needed attributes!
        for ($index = 0; $index < $node->childNodes->length; $index += 1) {
            $child = $node->childNodes->item($index);

            // if it's not an element node, continue past
            if ($child->nodeType != XML_ELEMENT_NODE)
                continue;

            // remove all attributes
            $attributes = $child->attributes;
            for ($i = 0; $i < $attributes->length; $i += 1) {
                $attr_name = $attributes->item($i)->name;
                if (in_array($attr_name, $this->invalid_attribute_names)) {
                    $child->removeAttribute($attr_name);
                    $i -= 1;
                }
            }
        }

        // merge adjacent images into a slideshow
        $image_nodes = array();
        for ($index = 0; $index < $node->childNodes->length; $index += 1) {
            $child = $node->childNodes->item($index);

            // if it's not an element node, continue past
            if ($child->nodeType != XML_ELEMENT_NODE)
                continue;

            if ($child->nodeName == 'figure' && $this->getFirstDecendantByNodeName($child, 'img') != NULL)
                array_push($image_nodes, $child);
            else {
                if (count($image_nodes) > 1) {
                    $slideshow_node = $this->dom->createElement("figure");
                    $slideshow_node->setAttribute("pagefrog-ignore", "true");
                    $slideshow_node->setAttribute("class", "op-slideshow");
                    foreach ($image_nodes as $image_node)
                        $slideshow_node->appendChild($image_node);
                    $node->insertBefore($slideshow_node, $child);
                    $image_nodes = array();
                }
                else {
                    $image_nodes = array();
                }
            }
        }
        if (count($image_nodes) > 1) {
            $slideshow_node = $this->dom->createElement("figure");
            $slideshow_node->setAttribute("pagefrog-ignore", "true");
            $slideshow_node->setAttribute("class", "op-slideshow");
            foreach ($image_nodes as $image_node)
                $slideshow_node->appendChild($image_node);
            $node->appendChild($slideshow_node);
            $image_nodes = array();
        }

        // ensure <a> tag href attributes aren't blank - set to '#' if blank
        for ($index = 0; $index < $node->childNodes->length; $index += 1) {
            $child = $node->childNodes->item($index);
            if ($child->nodeName == 'a') {
                if ($child->attributes == NULL ||
                    $child->attributes->getNamedItem("href") == NULL ||
                    trim($child->attributes->getNamedItem("href")->value) == "") {
                        $child->setAttribute("href", "#");
                }
            }
        }

        // remove sequential <br> tags when more than 2 (at most 1 should be present)
        $prev_br_children = 0;
        $elems_to_remove = array();
        for ($index = 0; $index < $node->childNodes->length; $index += 1) {
            $child = $node->childNodes->item($index);

            // if it's not an element node, continue past
            if ($child->nodeType != XML_ELEMENT_NODE || ($child->attributes != NULL && $child->attributes->getNamedItem("pagefrog-ignore") != NULL)) {
                if ($child->nodeType == XML_TEXT_NODE && $this->isNodeWhitespace($child) == True) {
                    continue;
                }
                else {
                    $prev_br_children = 0;
                    continue;
                }
            }

            if ($child->nodeName == 'br') {
                if ($prev_br_children >= 1)
                    array_push($elems_to_remove, $child);
                $prev_br_children += 1;
            }
            else
                $prev_br_children = 0;
        }
        while (count($elems_to_remove) > 0) {
            $elem_to_remove = array_pop($elems_to_remove);
            $node->removeChild($elem_to_remove);
        }

        // split <p> tags if they contains >5 <br> tags
        if ($node->nodeName == 'p') {
            $prev_br_children = 0;
            $processed_children = array();
            for ($index = 0; $index < $node->childNodes->length; $index += 1) {
                $child = $node->childNodes->item($index);

                // if it's marked to ignore, continue past
                if ($child->nodeType == XML_ELEMENT_NODE && $child->attributes != NULL && $child->attributes->getNamedItem("pagefrog-ignore") != NULL) {
                    array_push($processed_children, $child);
                    continue;
                }

                if ($child->nodeType == XML_ELEMENT_NODE && $child->nodeName == 'br') {
                    if ($prev_br_children >= 5) {
                        // split the <p> tag!
                        $p_node = $this->dom->createElement('p');
                        $node->parentNode->insertBefore($p_node, $node);
                        // add the processed children into the new tag
                        foreach ($processed_children as $processed_child) {
                            $p_node->appendChild($processed_child);
                        }
                        $processed_children = array();
                        $prev_br_children = 0;
                    }
                    else {
                        $prev_br_children += 1;
                        array_push($processed_children, $child);
                    }
                }
                else {
                    array_push($processed_children, $child);
                }
            }
        }

        // merge multiple figcaption in a single figure
        if ($node->nodeName == 'figure') {
            $figcaption_nodes = array();
            for ($index = 0; $index < $node->childNodes->length; $index += 1) {
                $child = $node->childNodes->item($index);

                // if it's not an element node, continue past
                if ($child->nodeType != XML_ELEMENT_NODE)
                    continue;

                if ($child->nodeName == 'figcaption')
                    array_push($figcaption_nodes, $child);
            }
            if (count($figcaption_nodes) > 1) {
                // merge figcaptions!
                $main_figcaption_node = array_pop($figcaption_nodes);
                foreach ($figcaption_nodes as $figcaption_node) {
                    while ($figcaption_node->childNodes->length > 0)
                        $main_figcaption_node->appendChild($figcaption_node->childNodes->item(0));
                    $node->removeChild($figcaption_node);
                }
            }
        }

        // put text elements in a figure into a figcaption
        if ($node->nodeName == 'figure') {
            $figcaption_node = NULL;
            $text_nodes = array();
            for ($index = 0; $index < $node->childNodes->length; $index += 1) {
                $child = $node->childNodes->item($index);

                // if it's not an element node, continue past
                if ($child->nodeType == XML_TEXT_NODE)
                    array_push($text_nodes, $child);
                else if ($child->nodeType == XML_ELEMENT_NODE && $child->nodeName == 'figcaption')
                    $figcaption_node = $child;
            }
            if (count($text_nodes) > 0) {
                if ($figcaption_node == NULL) {
                    $figcaption_node = $this->dom->createElement('figcaption');
                    $node->appendChild($figcaption_node);
                }
                // add text nodes to figcaption
                foreach ($text_nodes as $text_node) {
                    $figcaption_node->appendChild($text_node);
                }
            }
        }

        // for each child, remove empty tags
        for ($index = 0; $index < $node->childNodes->length; $index += 1) {
            $child = $node->childNodes->item($index);

            // if it's not an element node, continue past
            if ($child->nodeType != XML_ELEMENT_NODE)
                continue;

            if (in_array($child->nodeName, $this->invalid_tags_when_empty)) {
                $has_contents = False;
                foreach ($child->childNodes as $grandchild) {
                    if ($grandchild->nodeType == XML_ELEMENT_NODE || ($grandchild->nodeType == XML_TEXT_NODE && $this->isNodeWhitespace($grandchild) == False)) {
                        $has_contents = True;
                        break;
                    }
                }

                if ($has_contents == False) {
                    $node->removeChild($child);
                    $this->cleanDom($node->parentNode); // remove the parent if it's empty too
                    $index -= 1;
                    $continue;
                }
            }
        }

        // for each child, clean it!
        for ($index = 0; $index < $node->childNodes->length; $index += 1) {
            $child = $node->childNodes->item($index);
            $this->cleanDom($child);
        }
    }

    /**
      * Preprocess the post HTML to make processing possible
      *
      * Current:
      *   - replace [caption][/caption] with <caption></caption>
      *   - replace [embed][/embed] with contents
      *   - replace raw instagram/twitter embeds with the raw url so we replace it with the embed
      *   - run do_shortcode so shortcodes are converted to their respective HTML versions
      *   - replace newlines's with a <p>
      */
    public function preprocessContent($content) {
        // replace [caption][/caption] with <caption></caption> so our DOM parser will recognize it as a tag
        $content = preg_replace("/\[caption([^\]]*)\](.+?(?=\[\/caption))\[\/caption\]/i", "<caption$1>$2</caption>", $content);

        // replace [embed][/embed] with it's contents so our DOM parser will recognize it as a text tag & process
        $content = preg_replace("/\[embed([^\]]*)\](.+?(?=\[\/embed))\[\/embed\]/i", "\n$2\n", $content);

        // replace raw instagram embeds
        $content = preg_replace('/<blockquote.+?(?=class="instagram-media")class="instagram-media".+?(?=http(s?):\/\/(www\.)?instagram\.com\/p\/)http(s?):\/\/(www\.)?instagram\.com\/p\/(.+?)(?=\/").+?(?=<\/blockquote>)<\/blockquote>/i', "\nhttp://instagram.com/p/$5/\n", $content);

        // replace raw twitter embeds
        $content = preg_replace('/<blockquote.+?(?=class="twitter-tweet")class="twitter-tweet".+?(?=https:\/\/twitter\.com\/)(.+?(?=")).+?(?=<\/blockquote>)<\/blockquote>/i', "\n$1\n", $content);

        // convert shortcodes to their HTML versions
        $content = do_shortcode($content);

        // replace carriage returns (%0D) with a  <p>
        $content = preg_replace("/\r\n/i", "<p>", $content);

        return $content;
    }


    /**
	 * Format article HTML into an Instant Articles-supported version
	 *
	 * Strategy:
	    - iterate through the DOM tree in a breadth-first manner
	    - if we encounter an unsupported tag, remove it (replace with contents)
	    - if we encounter a IA required top-level element then split it's container and add it in the middle
	    - at the end, do a top-level element clean up, removing empty nodes
	 */
	public function pagefrog_format_instant_articles_content($content) {

        if (trim($content) == "")
            return "";

        // preprocess
        $content = $this->preprocessContent($content);

        // create DOM parser
		$this->dom = new DOMDocument();
		libxml_use_internal_errors(true); // to suppress HTML5 errors
        $this->dom->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'));

        // parse!
        $html_node = $this->dom->documentElement;
        $body_node = $html_node->lastChild;
        $this->parseNodeChildren($body_node, True);
        $this->cleanDom($body_node);

        // render the final version of the DOM into a string
        $temp_body = $this->dom->getElementsByTagName('body');
        $final_html_string = $this->dom->saveHTML($temp_body->item(0));

        // remove the <body></body> tags
        $final_html_string = str_replace('<body>', '', $final_html_string);
        $final_html_string = str_replace('</body>', '', $final_html_string);

        // return the final version
        return $final_html_string;
	}

	/**
	 * Format instant articles HTML into the HTML preview
	 *
	 * Operations:
	    - remove unnecessary iframes in embeds
	    - replace audio/playlist images with the preview version
	    - add a swipe right indicator in slideshows
	 */
	public function pagefrog_format_instant_articles_content_preview($content) {

        if (trim($content) == "")
            return "";

        // replace audio images with preview version
        $content = str_replace("https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/images/music-wide01.jpg",
                               "https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/images/music01.jpg",
                               $content);

        // create DOM parser
		$dom = new DOMDocument();
		libxml_use_internal_errors(true); // to suppress HTML5 errors
        $dom->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'));

        // parse!
        $nodes_to_process = array($dom->documentElement->lastChild);
        while (count($nodes_to_process) > 0) {
            $node = array_pop($nodes_to_process);

            if ($node->nodeType != XML_ELEMENT_NODE)
                continue;

            if ($node->nodeName == 'figure') {
                if ($node->attributes != NULL && $node->attributes->getNamedItem("class") != NULL && $node->attributes->getNamedItem("class")->value == 'op-slideshow') {
                    // append a swipe right indicator in the slideshow
                    $arrow_node = $dom->createElement("i");
                    $arrow_node->setAttribute("class", "fa fa-angle-right");
                    $node->appendChild($arrow_node);
                }
                else if ($node->childNodes->length == 1 && $node->childNodes->item(0)->nodeName == 'iframe'
                    && $node->childNodes->item(0)->attributes->getNamedItem('src') == NULL) {
                    // remove extraneous iframe in embed code

                    $iframe_node = $node->childNodes->item(0);

                    // move the iframe's children into the figure node
                    while ($iframe_node->childNodes->length > 0)
                        $node->appendChild($iframe_node->childNodes->item(0));

                    // remove the iframe node
                    $node->removeChild($iframe_node);
                }
            }
            else {
                foreach ($node->childNodes as $child)
                    array_push($nodes_to_process, $child);
            }
        }

        // render the final version of the DOM into a string
        $temp_body = $dom->getElementsByTagName('body');
        $final_html_string = $dom->saveHTML($temp_body->item(0));

        // remove the <body></body> tags
        $final_html_string = str_replace('<body>', '', $final_html_string);
        $final_html_string = str_replace('</body>', '', $final_html_string);

        // return the final version
        return $final_html_string;
	}
}
