ace.define ('ace/mode/ai-php', function (require, exports, module) {

var oop = require ("ace/lib/oop");
var PhpMode = require ("ace/mode/php").Mode;
var AiPhpHighlightRules = require ("ace/mode/ai_php_highlight_rules").AiPhpHighlightRules;

var Mode = function() {
    this.HighlightRules = AiPhpHighlightRules;
};
oop.inherits (Mode, PhpMode);

(function() {}).call(Mode.prototype);

exports.Mode = Mode;
});


ace.define ('ace/mode/ai_php_highlight_rules', function (require, exports, module) {

var oop = require("ace/lib/oop");
var PhpHighlightRules = require ("ace/mode/php_highlight_rules").PhpHighlightRules;

var AiPhpHighlightRules = function() {
  this.$rules = new PhpHighlightRules().getRules();
  this.$lang = require ("ace/lib/lang");
  add_ai_highlighting_rules (this, PhpHighlightRules);
}

oop.inherits (AiPhpHighlightRules, PhpHighlightRules);
exports.AiPhpHighlightRules = AiPhpHighlightRules;
});
