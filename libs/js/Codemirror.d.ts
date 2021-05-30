interface CodeMirrorConfig {
    addon : 'CodeMirror-comment-comment' | 'CodeMirror-comment-continuecomment' | 'CodeMirror-dialog-dialog' | 'CodeMirror-display-autorefresh' | 'CodeMirror-display-fullscreen' | 'CodeMirror-display-panel' | 'CodeMirror-display-placeholder' | 'CodeMirror-display-rulers' | 'CodeMirror-edit-closebrackets' | 'CodeMirror-edit-closetag' | 'CodeMirror-edit-continuelist' | 'CodeMirror-edit-matchbrackets' | 'CodeMirror-edit-matchtags' | 'CodeMirror-edit-trailingspace' | 'CodeMirror-fold-brace-fold' | 'CodeMirror-fold-comment-fold' | 'CodeMirror-fold-foldcode' | 'CodeMirror-fold-foldgutter' | 'CodeMirror-fold-indent-fold' | 'CodeMirror-fold-markdown-fold' | 'CodeMirror-fold-xml-fold' | 'CodeMirror-hint-anyword-hint' | 'CodeMirror-hint-css-hint' | 'CodeMirror-hint-html-hint' | 'CodeMirror-hint-javascript-hint' | 'CodeMirror-hint-show-hint' | 'CodeMirror-hint-sql-hint' | 'CodeMirror-hint-xml-hint' | 'CodeMirror-lint-coffeescript-lint' | 'CodeMirror-lint-css-lint' | 'CodeMirror-lint-html-lint' | 'CodeMirror-lint-javascript-lint' | 'CodeMirror-lint-json-lint' | 'CodeMirror-lint-lint' | 'CodeMirror-lint-yaml-lint' | 'CodeMirror-merge-merge' | 'CodeMirror-mode-loadmode' | 'CodeMirror-mode-multiplex' | 'CodeMirror-mode-multiplex_test' | 'CodeMirror-mode-overlay' | 'CodeMirror-mode-simple' | 'CodeMirror-runmode-colorize' | 'CodeMirror-runmode-runmode-standalone' | 'CodeMirror-runmode-runmode' | 'CodeMirror-runmode-runmode.node' | 'CodeMirror-scroll-annotatescrollbar' | 'CodeMirror-scroll-scrollpastend' | 'CodeMirror-scroll-simplescrollbars' | 'CodeMirror-search-jump-to-line' | 'CodeMirror-search-match-highlighter' | 'CodeMirror-search-matchesonscrollbar' | 'CodeMirror-search-search' | 'CodeMirror-search-searchcursor' | 'CodeMirror-selection-active-line' | 'CodeMirror-selection-mark-selection' | 'CodeMirror-selection-selection-pointer' | 'CodeMirror-tern-tern' | 'CodeMirror-tern-worker' | 'CodeMirror-wrap-hardwrap';
    theme : '3024-day' | '3024-night' | 'abbott' | 'abcdef' | 'ambiance-mobile' | 'ambiance' | 'ayu-dark' | 'ayu-mirage' | 'base16-dark' | 'base16-light' | 'bespin' | 'blackboard' | 'cobalt' | 'colorforth' | 'darcula' | 'dracula' | 'duotone-dark' | 'duotone-light' | 'eclipse' | 'elegant' | 'erlang-dark' | 'gruvbox-dark' | 'hopscotch' | 'icecoder' | 'idea' | 'isotope' | 'lesser-dark' | 'liquibyte' | 'lucario' | 'material-darker' | 'material-ocean' | 'material-palenight' | 'material' | 'mbo' | 'mdn-like' | 'midnight' | 'monokai' | 'moxer' | 'neat' | 'neo' | 'night' | 'nord' | 'oceanic-next' | 'panda-syntax' | 'paraiso-dark' | 'paraiso-light' | 'pastel-on-dark' | 'railscasts' | 'rubyblue' | 'seti' | 'shadowfox' | 'solarized' | 'ssms' | 'the-matrix' | 'tomorrow-night-bright' | 'tomorrow-night-eighties' | 'ttcn' | 'twilight' | 'vibrant-ink' | 'xq-dark' | 'xq-light' | 'yeti' | 'yonce' | 'zenburn';
    mode : 'apl' | 'asciiarmor' | 'asn.1' | 'asterisk' | 'brainfuck' | 'clike' | 'clojure' | 'cmake' | 'cobol' | 'coffeescript' | 'commonlisp' | 'crystal' | 'css' | 'cypher' | 'd' | 'dart' | 'diff' | 'django' | 'dockerfile' | 'dtd' | 'dylan' | 'ebnf' | 'ecl' | 'eiffel' | 'elm' | 'erlang' | 'factor' | 'fcl' | 'forth' | 'fortran' | 'gas' | 'gfm' | 'gherkin' | 'go' | 'groovy' | 'haml' | 'handlebars' | 'haskell' | 'haskell-literate' | 'haxe' | 'htmlembedded' | 'htmlmixed' | 'http' | 'idl' | 'javascript' | 'jinja2' | 'jsx' | 'julia' | 'livescript' | 'lua' | 'markdown' | 'mathematica' | 'mbox' | 'meta.js' | 'mirc' | 'mllike' | 'modelica' | 'mscgen' | 'mumps' | 'nginx' | 'nsis' | 'ntriples' | 'octave' | 'oz' | 'pascal' | 'pegjs' | 'perl' | 'php' | 'pig' | 'powershell' | 'properties' | 'protobuf' | 'pug' | 'puppet' | 'python' | 'q' | 'r' | 'rpm' | 'rst' | 'ruby' | 'rust' | 'sas' | 'sass' | 'scheme' | 'shell' | 'sieve' | 'slim' | 'smalltalk' | 'smarty' | 'solr' | 'soy' | 'sparql' | 'spreadsheet' | 'sql' | 'stex' | 'stylus' | 'swift' | 'tcl' | 'textile' | 'tiddlywiki' | 'tiki' | 'toml' | 'tornado' | 'troff' | 'ttcn' | 'ttcn-cfg' | 'turtle' | 'twig' | 'vb' | 'vbscript' | 'velocity' | 'verilog' | 'vhdl' | 'vue' | 'wast' | 'webidl' | 'xml' | 'xquery' | 'yacas' | 'yaml' | 'yaml-frontmatter' | 'z80';
    modes : 'apl'[] | 'asciiarmor'[] | 'asn.1'[] | 'asterisk'[] | 'brainfuck'[] | 'clike'[] | 'clojure'[] | 'cmake'[] | 'cobol'[] | 'coffeescript'[] | 'commonlisp'[] | 'crystal'[] | 'css'[] | 'cypher'[] | 'd'[] | 'dart'[] | 'diff'[] | 'django'[] | 'dockerfile'[] | 'dtd'[] | 'dylan'[] | 'ebnf'[] | 'ecl'[] | 'eiffel'[] | 'elm'[] | 'erlang'[] | 'factor'[] | 'fcl'[] | 'forth'[] | 'fortran'[] | 'gas'[] | 'gfm'[] | 'gherkin'[] | 'go'[] | 'groovy'[] | 'haml'[] | 'handlebars'[] | 'haskell'[] | 'haskell-literate'[] | 'haxe'[] | 'htmlembedded'[] | 'htmlmixed'[] | 'http'[] | 'idl'[] | 'javascript'[] | 'jinja2'[] | 'jsx'[] | 'julia'[] | 'livescript'[] | 'lua'[] | 'markdown'[] | 'mathematica'[] | 'mbox'[] | 'meta.js'[] | 'mirc'[] | 'mllike'[] | 'modelica'[] | 'mscgen'[] | 'mumps'[] | 'nginx'[] | 'nsis'[] | 'ntriples'[] | 'octave'[] | 'oz'[] | 'pascal'[] | 'pegjs'[] | 'perl'[] | 'php'[] | 'pig'[] | 'powershell'[] | 'properties'[] | 'protobuf'[] | 'pug'[] | 'puppet'[] | 'python'[] | 'q'[] | 'r'[] | 'rpm'[] | 'rst'[] | 'ruby'[] | 'rust'[] | 'sas'[] | 'sass'[] | 'scheme'[] | 'shell'[] | 'sieve'[] | 'slim'[] | 'smalltalk'[] | 'smarty'[] | 'solr'[] | 'soy'[] | 'sparql'[] | 'spreadsheet'[] | 'sql'[] | 'stex'[] | 'stylus'[] | 'swift'[] | 'tcl'[] | 'textile'[] | 'tiddlywiki'[] | 'tiki'[] | 'toml'[] | 'tornado'[] | 'troff'[] | 'ttcn'[] | 'ttcn-cfg'[] | 'turtle'[] | 'twig'[] | 'vb'[] | 'vbscript'[] | 'velocity'[] | 'verilog'[] | 'vhdl'[] | 'vue'[] | 'wast'[] | 'webidl'[] | 'xml'[] | 'xquery'[] | 'yacas'[] | 'yaml'[] | 'yaml-frontmatter'[] | 'z80'[];
    modeAll : 'apl' | 'asciiarmor' | 'asn.1' | 'asterisk' | 'brainfuck' | 'clike' | 'clojure' | 'cmake' | 'cobol' | 'coffeescript' | 'commonlisp' | 'crystal' | 'css' | 'cypher' | 'd' | 'dart' | 'diff' | 'django' | 'dockerfile' | 'dtd' | 'dylan' | 'ebnf' | 'ecl' | 'eiffel' | 'elm' | 'erlang' | 'factor' | 'fcl' | 'forth' | 'fortran' | 'gas' | 'gfm' | 'gherkin' | 'go' | 'groovy' | 'haml' | 'handlebars' | 'haskell' | 'haskell-literate' | 'haxe' | 'htmlembedded' | 'htmlmixed' | 'http' | 'idl' | 'javascript' | 'jinja2' | 'jsx' | 'julia' | 'livescript' | 'lua' | 'markdown' | 'mathematica' | 'mbox' | 'meta.js' | 'mirc' | 'mllike' | 'modelica' | 'mscgen' | 'mumps' | 'nginx' | 'nsis' | 'ntriples' | 'octave' | 'oz' | 'pascal' | 'pegjs' | 'perl' | 'php' | 'pig' | 'powershell' | 'properties' | 'protobuf' | 'pug' | 'puppet' | 'python' | 'q' | 'r' | 'rpm' | 'rst' | 'ruby' | 'rust' | 'sas' | 'sass' | 'scheme' | 'shell' | 'sieve' | 'slim' | 'smalltalk' | 'smarty' | 'solr' | 'soy' | 'sparql' | 'spreadsheet' | 'sql' | 'stex' | 'stylus' | 'swift' | 'tcl' | 'textile' | 'tiddlywiki' | 'tiki' | 'toml' | 'tornado' | 'troff' | 'ttcn' | 'ttcn-cfg' | 'turtle' | 'twig' | 'vb' | 'vbscript' | 'velocity' | 'verilog' | 'vhdl' | 'vue' | 'wast' | 'webidl' | 'xml' | 'xquery' | 'yacas' | 'yaml' | 'yaml-frontmatter' | 'z80' | 'apl'[] | 'asciiarmor'[] | 'asn.1'[] | 'asterisk'[] | 'brainfuck'[] | 'clike'[] | 'clojure'[] | 'cmake'[] | 'cobol'[] | 'coffeescript'[] | 'commonlisp'[] | 'crystal'[] | 'css'[] | 'cypher'[] | 'd'[] | 'dart'[] | 'diff'[] | 'django'[] | 'dockerfile'[] | 'dtd'[] | 'dylan'[] | 'ebnf'[] | 'ecl'[] | 'eiffel'[] | 'elm'[] | 'erlang'[] | 'factor'[] | 'fcl'[] | 'forth'[] | 'fortran'[] | 'gas'[] | 'gfm'[] | 'gherkin'[] | 'go'[] | 'groovy'[] | 'haml'[] | 'handlebars'[] | 'haskell'[] | 'haskell-literate'[] | 'haxe'[] | 'htmlembedded'[] | 'htmlmixed'[] | 'http'[] | 'idl'[] | 'javascript'[] | 'jinja2'[] | 'jsx'[] | 'julia'[] | 'livescript'[] | 'lua'[] | 'markdown'[] | 'mathematica'[] | 'mbox'[] | 'meta.js'[] | 'mirc'[] | 'mllike'[] | 'modelica'[] | 'mscgen'[] | 'mumps'[] | 'nginx'[] | 'nsis'[] | 'ntriples'[] | 'octave'[] | 'oz'[] | 'pascal'[] | 'pegjs'[] | 'perl'[] | 'php'[] | 'pig'[] | 'powershell'[] | 'properties'[] | 'protobuf'[] | 'pug'[] | 'puppet'[] | 'python'[] | 'q'[] | 'r'[] | 'rpm'[] | 'rst'[] | 'ruby'[] | 'rust'[] | 'sas'[] | 'sass'[] | 'scheme'[] | 'shell'[] | 'sieve'[] | 'slim'[] | 'smalltalk'[] | 'smarty'[] | 'solr'[] | 'soy'[] | 'sparql'[] | 'spreadsheet'[] | 'sql'[] | 'stex'[] | 'stylus'[] | 'swift'[] | 'tcl'[] | 'textile'[] | 'tiddlywiki'[] | 'tiki'[] | 'toml'[] | 'tornado'[] | 'troff'[] | 'ttcn'[] | 'ttcn-cfg'[] | 'turtle'[] | 'twig'[] | 'vb'[] | 'vbscript'[] | 'velocity'[] | 'verilog'[] | 'vhdl'[] | 'vue'[] | 'wast'[] | 'webidl'[] | 'xml'[] | 'xquery'[] | 'yacas'[] | 'yaml'[] | 'yaml-frontmatter'[] | 'z80'[];
    addons : 'CodeMirror-comment-comment'[] | 'CodeMirror-comment-continuecomment'[] | 'CodeMirror-dialog-dialog'[] | 'CodeMirror-display-autorefresh'[] | 'CodeMirror-display-fullscreen'[] | 'CodeMirror-display-panel'[] | 'CodeMirror-display-placeholder'[] | 'CodeMirror-display-rulers'[] | 'CodeMirror-edit-closebrackets'[] | 'CodeMirror-edit-closetag'[] | 'CodeMirror-edit-continuelist'[] | 'CodeMirror-edit-matchbrackets'[] | 'CodeMirror-edit-matchtags'[] | 'CodeMirror-edit-trailingspace'[] | 'CodeMirror-fold-brace-fold'[] | 'CodeMirror-fold-comment-fold'[] | 'CodeMirror-fold-foldcode'[] | 'CodeMirror-fold-foldgutter'[] | 'CodeMirror-fold-indent-fold'[] | 'CodeMirror-fold-markdown-fold'[] | 'CodeMirror-fold-xml-fold'[] | 'CodeMirror-hint-anyword-hint'[] | 'CodeMirror-hint-css-hint'[] | 'CodeMirror-hint-html-hint'[] | 'CodeMirror-hint-javascript-hint'[] | 'CodeMirror-hint-show-hint'[] | 'CodeMirror-hint-sql-hint'[] | 'CodeMirror-hint-xml-hint'[] | 'CodeMirror-lint-coffeescript-lint'[] | 'CodeMirror-lint-css-lint'[] | 'CodeMirror-lint-html-lint'[] | 'CodeMirror-lint-javascript-lint'[] | 'CodeMirror-lint-json-lint'[] | 'CodeMirror-lint-lint'[] | 'CodeMirror-lint-yaml-lint'[] | 'CodeMirror-merge-merge'[] | 'CodeMirror-mode-loadmode'[] | 'CodeMirror-mode-multiplex'[] | 'CodeMirror-mode-multiplex_test'[] | 'CodeMirror-mode-overlay'[] | 'CodeMirror-mode-simple'[] | 'CodeMirror-runmode-colorize'[] | 'CodeMirror-runmode-runmode-standalone'[] | 'CodeMirror-runmode-runmode'[] | 'CodeMirror-runmode-runmode.node'[] | 'CodeMirror-scroll-annotatescrollbar'[] | 'CodeMirror-scroll-scrollpastend'[] | 'CodeMirror-scroll-simplescrollbars'[] | 'CodeMirror-search-jump-to-line'[] | 'CodeMirror-search-match-highlighter'[] | 'CodeMirror-search-matchesonscrollbar'[] | 'CodeMirror-search-search'[] | 'CodeMirror-search-searchcursor'[] | 'CodeMirror-selection-active-line'[] | 'CodeMirror-selection-mark-selection'[] | 'CodeMirror-selection-selection-pointer'[] | 'CodeMirror-tern-tern'[] | 'CodeMirror-tern-worker'[] | 'CodeMirror-wrap-hardwrap'[];
    addonAll : 'CodeMirror-comment-comment' | 'CodeMirror-comment-continuecomment' | 'CodeMirror-dialog-dialog' | 'CodeMirror-display-autorefresh' | 'CodeMirror-display-fullscreen' | 'CodeMirror-display-panel' | 'CodeMirror-display-placeholder' | 'CodeMirror-display-rulers' | 'CodeMirror-edit-closebrackets' | 'CodeMirror-edit-closetag' | 'CodeMirror-edit-continuelist' | 'CodeMirror-edit-matchbrackets' | 'CodeMirror-edit-matchtags' | 'CodeMirror-edit-trailingspace' | 'CodeMirror-fold-brace-fold' | 'CodeMirror-fold-comment-fold' | 'CodeMirror-fold-foldcode' | 'CodeMirror-fold-foldgutter' | 'CodeMirror-fold-indent-fold' | 'CodeMirror-fold-markdown-fold' | 'CodeMirror-fold-xml-fold' | 'CodeMirror-hint-anyword-hint' | 'CodeMirror-hint-css-hint' | 'CodeMirror-hint-html-hint' | 'CodeMirror-hint-javascript-hint' | 'CodeMirror-hint-show-hint' | 'CodeMirror-hint-sql-hint' | 'CodeMirror-hint-xml-hint' | 'CodeMirror-lint-coffeescript-lint' | 'CodeMirror-lint-css-lint' | 'CodeMirror-lint-html-lint' | 'CodeMirror-lint-javascript-lint' | 'CodeMirror-lint-json-lint' | 'CodeMirror-lint-lint' | 'CodeMirror-lint-yaml-lint' | 'CodeMirror-merge-merge' | 'CodeMirror-mode-loadmode' | 'CodeMirror-mode-multiplex' | 'CodeMirror-mode-multiplex_test' | 'CodeMirror-mode-overlay' | 'CodeMirror-mode-simple' | 'CodeMirror-runmode-colorize' | 'CodeMirror-runmode-runmode-standalone' | 'CodeMirror-runmode-runmode' | 'CodeMirror-runmode-runmode.node' | 'CodeMirror-scroll-annotatescrollbar' | 'CodeMirror-scroll-scrollpastend' | 'CodeMirror-scroll-simplescrollbars' | 'CodeMirror-search-jump-to-line' | 'CodeMirror-search-match-highlighter' | 'CodeMirror-search-matchesonscrollbar' | 'CodeMirror-search-search' | 'CodeMirror-search-searchcursor' | 'CodeMirror-selection-active-line' | 'CodeMirror-selection-mark-selection' | 'CodeMirror-selection-selection-pointer' | 'CodeMirror-tern-tern' | 'CodeMirror-tern-worker' | 'CodeMirror-wrap-hardwrap' | 'CodeMirror-comment-comment'[] | 'CodeMirror-comment-continuecomment'[] | 'CodeMirror-dialog-dialog'[] | 'CodeMirror-display-autorefresh'[] | 'CodeMirror-display-fullscreen'[] | 'CodeMirror-display-panel'[] | 'CodeMirror-display-placeholder'[] | 'CodeMirror-display-rulers'[] | 'CodeMirror-edit-closebrackets'[] | 'CodeMirror-edit-closetag'[] | 'CodeMirror-edit-continuelist'[] | 'CodeMirror-edit-matchbrackets'[] | 'CodeMirror-edit-matchtags'[] | 'CodeMirror-edit-trailingspace'[] | 'CodeMirror-fold-brace-fold'[] | 'CodeMirror-fold-comment-fold'[] | 'CodeMirror-fold-foldcode'[] | 'CodeMirror-fold-foldgutter'[] | 'CodeMirror-fold-indent-fold'[] | 'CodeMirror-fold-markdown-fold'[] | 'CodeMirror-fold-xml-fold'[] | 'CodeMirror-hint-anyword-hint'[] | 'CodeMirror-hint-css-hint'[] | 'CodeMirror-hint-html-hint'[] | 'CodeMirror-hint-javascript-hint'[] | 'CodeMirror-hint-show-hint'[] | 'CodeMirror-hint-sql-hint'[] | 'CodeMirror-hint-xml-hint'[] | 'CodeMirror-lint-coffeescript-lint'[] | 'CodeMirror-lint-css-lint'[] | 'CodeMirror-lint-html-lint'[] | 'CodeMirror-lint-javascript-lint'[] | 'CodeMirror-lint-json-lint'[] | 'CodeMirror-lint-lint'[] | 'CodeMirror-lint-yaml-lint'[] | 'CodeMirror-merge-merge'[] | 'CodeMirror-mode-loadmode'[] | 'CodeMirror-mode-multiplex'[] | 'CodeMirror-mode-multiplex_test'[] | 'CodeMirror-mode-overlay'[] | 'CodeMirror-mode-simple'[] | 'CodeMirror-runmode-colorize'[] | 'CodeMirror-runmode-runmode-standalone'[] | 'CodeMirror-runmode-runmode'[] | 'CodeMirror-runmode-runmode.node'[] | 'CodeMirror-scroll-annotatescrollbar'[] | 'CodeMirror-scroll-scrollpastend'[] | 'CodeMirror-scroll-simplescrollbars'[] | 'CodeMirror-search-jump-to-line'[] | 'CodeMirror-search-match-highlighter'[] | 'CodeMirror-search-matchesonscrollbar'[] | 'CodeMirror-search-search'[] | 'CodeMirror-search-searchcursor'[] | 'CodeMirror-selection-active-line'[] | 'CodeMirror-selection-mark-selection'[] | 'CodeMirror-selection-selection-pointer'[] | 'CodeMirror-tern-tern'[] | 'CodeMirror-tern-worker'[] | 'CodeMirror-wrap-hardwrap'[];
}