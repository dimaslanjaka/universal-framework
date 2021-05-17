<?php

namespace HTML\minify\css;

class minifyCSS
{
    public function __construct($css)
    {
        return startminify($css);
    }
}

$singleQuoteSequenceFinder = new QuoteSequenceFinder('\'');
$doubleQuoteSequenceFinder = new QuoteSequenceFinder('"');
$blockCommentFinder = new StringSequenceFinder('/*', '*/');
function startminify($css)
{
    global $minificationStore, $singleQuoteSequenceFinder, $doubleQuoteSequenceFinder, $blockCommentFinder;
    $css_special_chars = [
        $blockCommentFinder, // CSS Comment
        $singleQuoteSequenceFinder, // single quote escape, e.g. :before{ content: '-';}
        $doubleQuoteSequenceFinder,
    ]; // double quote
    // pull out everything that needs to be pulled out and saved
    while ($sequence = getNextSpecialSequence($css, $css_special_chars)) {
        switch ($sequence->type) {
            case '/*': // remove comments
                $css = substr($css, 0, $sequence->start_idx) . substr($css, $sequence->end_idx);
                break;
            default: // strings that need to be preservered
                $placeholder = getNextMinificationPlaceholder();
                $minificationStore[$placeholder] = substr($css, $sequence->start_idx, $sequence->end_idx -
                    $sequence->start_idx);
                $css = substr($css, 0, $sequence->start_idx) . $placeholder . substr($css, $sequence->end_idx);
        }
    }
    // minimize the string
    $css = preg_replace('/\s{2,}/s', ' ', $css);
    $css = preg_replace('/\s*([:;{}])\s*/', '$1', $css);
    $css = preg_replace('/;}/', '}', $css);
    // put back the preserved strings
    foreach ($minificationStore as $placeholder => $original) {
        $css = str_replace($placeholder, $original, $css);
    }

    return trim($css);
}

function getNextSpecialSequence($string, $sequences)
{
    // $special_idx is an array of the nearest index for all special characters
    $special_idx = [];
    foreach ($sequences as $finder) {
        $finder->findFirstValue($string);
        if ($finder->isValid()) {
            $special_idx[$finder->start_idx] = $finder;
        }
    }
    // if none found, return
    if (0 == count($special_idx)) {
        return false;
    }
    // get first occuring item
    asort($special_idx);

    return $special_idx[min(array_keys($special_idx))];
}

$minificationStore = [];
function getNextMinificationPlaceholder()
{
    global $minificationStore;

    return '<-!!-' . sizeof($minificationStore) . '-!!->';
}
