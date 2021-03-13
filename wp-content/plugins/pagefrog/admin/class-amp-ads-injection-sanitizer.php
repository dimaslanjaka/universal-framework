<?php 
class PageFrog_Amp_Ad_Injection_Sanitizer extends AMP_Base_Sanitizer {
    public function sanitize() {
        if ( ! $this->can_inject_ads() || ! $this->should_inject_ads() ) {
            return;
        }

        $body = $this->get_body_node();

        // If we have a lot of paragraphs, insert before the 4th one.
        // Otherwise, add it to the end.
        $p_nodes = $body->getElementsByTagName( 'p' );
        $word_count = 0;
        $ads_injected = 0;
        $p_count = 0;
        foreach ( $p_nodes as $p_node ) {
            $word_count += $this->word_count( $p_node->textContent );

            if ( $word_count >= $this->args['ads']->get_amp_words_per_ad() ) {
                // inject an ad
                $new_node = $this->create_ad_node();
                if ( $p_nodes->item( $p_count ) ) {
                    $p_nodes->item( $p_count )->insertBefore( $new_node );
                } else {
                    $body->appendChild( $new_node );
                }

                // reset the word count
                $word_count = 0;

                // count the number of ads we injected
                $ads_injected++;

                if ( $ads_injected === 3 ) {
                    break;
                }
            }

            // keep the index up to date
            $p_count++;
        }

        if ( $ads_injected == 0 ) {
            // we never injected a single ad. Append one at the very end of
            // the article to monetize short posts.
            $new_node = $this->create_ad_node();
            $body->appendChild( $new_node );
        }
    }

    private function word_count( $string ) {
        return str_word_count( $string );
    }

    private function can_inject_ads() {
        // checks if it's possible for us to inject ads using the platform that was selected
        return (
            $this->args['ads']->get_google_adsense_adunit_width() > 0 &&
            $this->args['ads']->get_google_adsense_adunit_height() > 0 &&
            $this->args['ads']->get_google_adsense_ad_client() != '' &&
            $this->args['ads']->get_google_adsense_ad_slot() != ''
        );
    }

    private function should_inject_ads() {
        // checks if ad injection is enabled (we should inject ads) for the platform selected
        return $this->args['ads']->get_amp_enable_google_adsense_bool();
    }

    private function create_ad_node() {
        // if we add more ad engine variety, we can choose which type of node we create
        // here by examining $this->args['ads']. For now, it's just adsense.
        return $this->create_google_adsense_ad_node();
    }

    private function create_google_adsense_ad_node() {
        $top_node = AMP_DOM_Utils::create_node( $this->dom, 'div', array(
            'class' => 'ad-container',
        ) );

        $ad_node = AMP_DOM_Utils::create_node( $this->dom, 'amp-ad', array(
            'width' => $this->args['ads']->get_google_adsense_adunit_width(),
            'height' => $this->args['ads']->get_google_adsense_adunit_height(),
            'type' => 'adsense',
            'data-ad-client' => $this->args['ads']->get_google_adsense_ad_client(),
            'data-ad-slot' => $this->args['ads']->get_google_adsense_ad_slot()
        ) );

        $top_node->appendChild( $ad_node );

        // TODO: we can add placeholders and fallbacks here (if they are supported by the ad engine)
        // they just need to be appended as a child to $node.
        // For example: https://github.com/Automattic/amp-wp#step-1-build-the-sanitizer

        return $top_node;
    }

    private function create_debug_node( $text ) {
        $node = AMP_DOM_Utils::create_node( $this->dom, 'div', array() );
        $node->textContent = $text;
        return $node;
    }
}

?>