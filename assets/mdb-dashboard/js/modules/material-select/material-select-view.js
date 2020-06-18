"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// eslint-disable-next-line no-unused-vars
var MaterialSelectView =
/*#__PURE__*/
function () {
  // eslint-disable-next-line object-curly-newline
  function MaterialSelectView($nativeSelect, _ref) {
    var {
      options: options,
      properties: {
        id: id
      }
    } = _ref;

    _classCallCheck(this, MaterialSelectView);

    this.properties = {
      id: id,
      isMultiple: Boolean($nativeSelect.attr('multiple')),
      isSearchable: Boolean($nativeSelect.attr('searchable')),
      isRequired: Boolean($nativeSelect.attr('required')),
      isEditable: Boolean($nativeSelect.attr('editable'))
    };
    this.options = this._copyOptions(options);
    this.$nativeSelect = $nativeSelect;
    this.$selectWrapper = $('<div class="select-wrapper"></div>');
    this.$materialOptionsList = $("<ul id=\"select-options-".concat(this.properties.id, "\" class=\"dropdown-content select-dropdown w-100 ").concat(this.properties.isMultiple ? 'multiple-select-dropdown' : '', "\"></ul>"));
    this.$materialSelectInitialOption = $nativeSelect.find('option:selected').text() || $nativeSelect.find('option:first').text() || '';
    this.$nativeSelectChildren = this.$nativeSelect.children('option, optgroup');
    this.$materialSelect = $("<input type=\"text\" class=\"".concat(this.options.defaultMaterialInput ? 'browser-default custom-select multi-bs-select select-dropdown form-control' : 'select-dropdown form-control', "\" ").concat(!this.options.validate && 'readonly="true"', " required=\"").concat(this.options.validate ? 'true' : 'false', "\" ").concat(this.$nativeSelect.is(' :disabled') ? 'disabled' : '', " data-activates=\"select-options-").concat(this.properties.id, "\" value=\"\"/>"));
    this.$dropdownIcon = this.options.defaultMaterialInput ? '' : $('<span class="caret">&#9660;</span>');
    this.$searchInput = null;
    this.$noSearchResultsInfo = $("<li><span><i>".concat(this.options.labels.noSearchResults, "</i></span></li>"));
    this.$toggleAll = $("<li class=\"select-toggle-all\"><span><input type=\"checkbox\" class=\"form-check-input\"><label>".concat(this.options.labels.selectAll, "</label></span></li>"));
    this.$addOptionBtn = $('<i class="select-add-option fas fa-plus"></i>');
    this.$mainLabel = this._jQueryFallback(this.$nativeSelect.next('label.mdb-main-label'), $("label[for='".concat(this.properties.id, "']")));
    this.$customTemplateParts = this._jQueryFallback(this.$nativeSelect.nextUntil('select', '.mdb-select-template-part'), $("[data-mdb-select-template-part-for='".concat(this.properties.id, "']")));
    this.$btnSave = this.$nativeSelect.nextUntil('select', '.btn-save'); // @Depreciated

    this.$validFeedback = $("<div class=\"valid-feedback\">".concat(this.options.labels.validFeedback, "</div>"));
    this.$invalidFeedback = $("<div class=\"invalid-feedback\">".concat(this.options.labels.invalidFeedback, "</div>"));
    this.keyCodes = {
      tab: 9,
      esc: 27,
      enter: 13,
      arrowUp: 38,
      arrowDown: 40
    }; // eslint-disable-next-line no-undef

    this.renderer = new MaterialSelectViewRenderer(this);
    this.dropdown = null;
  }

  _createClass(MaterialSelectView, [{
    key: "destroy",
    value: function destroy() {
      this.renderer.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      this.renderer.render();
    }
  }, {
    key: "selectPreselectedOptions",
    value: function selectPreselectedOptions(handler) {
      var _this = this;

      if (this.isMultiple) {
        this.$nativeSelect.find('option:selected:not(:disabled)').each(function (i, element) {
          var index = element.index;

          _this.$materialOptionsList.find('li:not(.optgroup):not(.select-toggle-all)').eq(index).addClass('selected active').find(':checkbox').prop('checked', true);

          handler(index);
        });
      } else {
        var $preselectedOption = this.$nativeSelect.find('option:selected').first();
        var indexOfPreselectedOption = this.$nativeSelect.find('option').index($preselectedOption.get(0));

        if ($preselectedOption.get(0) && $preselectedOption.attr('disabled') !== 'disabled') {
          handler(indexOfPreselectedOption);
        }
      }
    }
  }, {
    key: "bindMaterialSelectFocus",
    value: function bindMaterialSelectFocus() {
      var _this2 = this;

      this.$materialSelect.on('focus', function (e) {
        var $this = $(e.target);

        if ($('ul.select-dropdown').not(_this2.$materialOptionsList.get(0)).is(':visible')) {
          $('input.select-dropdown').trigger('close');
        }

        _this2.$mainLabel.addClass('active');

        if (!_this2.$materialOptionsList.is(':visible')) {
          $this.trigger('open', ['focus']);
          var label = $this.val();

          var $selectedOption = _this2.$materialOptionsList.find('li').filter(function () {
            return $(this).text().toLowerCase() === label.toLowerCase();
          }).get(0);

          _this2._selectSingleOption($selectedOption);

          _this2._updateDropdownScrollTop();
        }

        if (!_this2.isMultiple) {
          _this2.$mainLabel.addClass('active');
        }
      });
    }
  }, {
    key: "bindMaterialSelectClick",
    value: function bindMaterialSelectClick() {
      var _this3 = this;

      this.$materialSelect.on('mousedown', function (e) {
        if (e.which === 3) {
          e.preventDefault();
        }
      });
      this.$materialSelect.on('click', function (e) {
        _this3.$mainLabel.addClass('active');

        e.stopPropagation();
      });
    }
  }, {
    key: "bindMaterialSelectBlur",
    value: function bindMaterialSelectBlur() {
      var _this4 = this;

      this.$materialSelect.on('blur', function (e) {
        var $this = $(e);

        if (!_this4.isMultiple && !_this4.isSearchable) {
          $this.trigger('close');
        }

        _this4.$materialOptionsList.find('li.selected').removeClass('selected');
      });
    }
  }, {
    key: "bindMaterialSelectKeydown",
    value: function bindMaterialSelectKeydown() {
      var _this5 = this;

      this.$materialSelect.on('keydown', function (e) {
        var $this = $(e.target);
        var isTab = e.which === _this5.keyCodes.tab;
        var isEsc = e.which === _this5.keyCodes.esc;
        var isEnter = e.which === _this5.keyCodes.enter;
        var isEnterWithShift = isEnter && e.shiftKey;
        var isArrowUp = e.which === _this5.keyCodes.arrowUp;
        var isArrowDown = e.which === _this5.keyCodes.arrowDown;

        var isMaterialSelectVisible = _this5.$materialOptionsList.is(':visible');

        if (isTab) {
          _this5._handleTabKey($this);

          return;
        } else if (isArrowDown && !isMaterialSelectVisible) {
          $this.trigger('open');
          return;
        } else if (isEnter && !isMaterialSelectVisible) {
          return;
        }

        e.preventDefault();
        /* eslint-disable consistent-return */

        switch (true) {
          case isEnterWithShift:
            return _this5._handleEnterWithShiftKey($this);

          case isEnter:
            return _this5._handleEnterKey($this);

          case isArrowDown || isArrowUp:
            return _this5._handleArrowUpDownKey(e.which);

          case isEsc:
            return _this5._handleEscKey($this);

          default:
            return _this5._handleLetterKey(e);
        }
        /* eslint-disable consistent-return */

      });
    }
  }, {
    key: "bindMaterialSelectDropdownToggle",
    value: function bindMaterialSelectDropdownToggle() {
      var _this6 = this;

      this.$materialSelect.on('open', function () {
        return _this6.$materialSelect.attr('aria-expanded', 'true');
      });
      this.$materialSelect.on('close', function () {
        return _this6.$materialSelect.attr('aria-expanded', 'false');
      });
    }
  }, {
    key: "bindToggleAllClick",
    value: function bindToggleAllClick(handler) {
      var _this7 = this;

      this.$toggleAll.on('click', function (e) {
        var checkbox = $(_this7.$toggleAll).find('input[type="checkbox"]').first();
        var currentState = Boolean($(checkbox).prop('checked'));
        var isToggleChecked = !currentState;
        $(checkbox).prop('checked', !currentState);

        _this7.$materialOptionsList.find('li:not(.optgroup):not(.select-toggle-all)').each(function (materialOptionIndex, materialOption) {
          var $materialOption = $(materialOption);
          var $optionCheckbox = $materialOption.find('input[type="checkbox"]');
          $materialOption.attr('aria-selected', isToggleChecked);

          if (isToggleChecked && $optionCheckbox.is(':checked') || !isToggleChecked && !$optionCheckbox.is(':checked') || $(materialOption).is(':hidden') || $(materialOption).is('.disabled')) {
            return;
          }

          $optionCheckbox.prop('checked', isToggleChecked);

          _this7.$nativeSelect.find('option').eq(materialOptionIndex).prop('selected', isToggleChecked);

          $materialOption.toggleClass('active');

          _this7._selectOption(materialOption);

          handler(materialOptionIndex);
        });

        _this7.$nativeSelect.data('stop-refresh', true);

        _this7._triggerChangeOnNativeSelect();

        _this7.$nativeSelect.removeData('stop-refresh');

        e.stopPropagation();
      });
    }
  }, {
    key: "bindMaterialOptionMousedown",
    value: function bindMaterialOptionMousedown() {
      var _this8 = this;

      this.$materialOptionsList.on('mousedown', function (e) {
        var option = e.target;
        var inModal = $('.modal-content').find(_this8.$materialOptionsList).length;

        if (inModal && option.scrollHeight > option.offsetHeight) {
          e.preventDefault();
        }
      });
    }
  }, {
    key: "bindMaterialOptionClick",
    value: function bindMaterialOptionClick(handler) {
      var _this9 = this;

      this.$materialOptionsList.find('li:not(.optgroup)').not(this.$toggleAll).each(function (materialOptionIndex, materialOption) {
        $(materialOption).on('click', function (e) {
          e.stopPropagation();
          var $this = $(materialOption);

          if ($this.hasClass('disabled') || $this.hasClass('optgroup')) {
            return;
          }

          var selected = true;

          if (_this9.isMultiple) {
            $this.find('input[type="checkbox"]').prop('checked', function (index, oldPropertyValue) {
              return !oldPropertyValue;
            });
            var hasOptgroup = Boolean(_this9.$nativeSelect.find('optgroup').length);
            var thisIndex = _this9._isToggleAllPresent() ? $this.index() - 1 : $this.index();
            /* eslint-disable max-statements-per-line */

            switch (true) {
              case _this9.isSearchable && hasOptgroup:
                selected = handler(thisIndex - $this.prevAll('.optgroup').length - 1);
                break;

              case _this9.isSearchable:
                selected = handler(thisIndex - 1);
                break;

              case hasOptgroup:
                selected = handler(thisIndex - $this.prevAll('.optgroup').length);
                break;

              default:
                selected = handler(thisIndex);
                break;
            }
            /* eslint-disable max-statements-per-line */


            if (_this9._isToggleAllPresent()) {
              _this9._updateToggleAllOption();
            }

            _this9.$materialSelect.trigger('focus');
          } else {
            _this9.$materialOptionsList.find('li').removeClass('active').attr('aria-selected', 'false');

            _this9.$materialSelect.val($this.text().replace(/  +/g, ' ').trim());

            _this9.$materialSelect.trigger('close');
          }

          $this.toggleClass('active');
          var ariaSelected = $this.attr('aria-selected');
          $this.attr('aria-selected', ariaSelected === 'true' ? 'false' : 'true');

          _this9._selectSingleOption($this);

          _this9.$nativeSelect.data('stop-refresh', true);

          _this9.$nativeSelect.find('option').eq(materialOptionIndex).prop('selected', selected);

          _this9.$nativeSelect.removeData('stop-refresh');

          _this9._triggerChangeOnNativeSelect();

          if (_this9.$materialSelect.val()) {
            _this9.$mainLabel.addClass('active');
          }

          if ($this.hasClass('li-added')) {
            _this9.renderer.buildSingleOption($this, '');
          }
        });
      });
    }
  }, {
    key: "bindSingleMaterialOptionClick",
    value: function bindSingleMaterialOptionClick() {
      var _this10 = this;

      this.$materialOptionsList.find('li').on('click', function () {
        _this10.$materialSelect.trigger('close');
      });
    }
  }, {
    key: "bindSearchInputKeyup",
    value: function bindSearchInputKeyup() {
      var _this11 = this;

      this.$searchInput.find('.search').on('keyup', function (e) {
        var $this = $(e.target);
        var isTab = e.which === _this11.keyCodes.tab;
        var isEsc = e.which === _this11.keyCodes.esc;
        var isEnter = e.which === _this11.keyCodes.enter;
        var isEnterWithShift = isEnter && e.shiftKey;
        var isArrowUp = e.which === _this11.keyCodes.arrowUp;
        var isArrowDown = e.which === _this11.keyCodes.arrowDown;

        if (isArrowDown || isTab || isEsc || isArrowUp) {
          _this11.$materialSelect.focus();

          _this11._handleArrowUpDownKey(e.which);

          return;
        }

        var $ul = $this.closest('ul');
        var searchValue = $this.val();
        var $options = $ul.find('li span.filtrable');
        var isOptionInList = false;
        $options.each(function () {
          var $option = $(this);

          if (typeof this.outerHTML === 'string') {
            var liValue = this.textContent.toLowerCase();

            if (liValue.includes(searchValue.toLowerCase())) {
              $option.show().parent().show();
            } else {
              $option.hide().parent().hide();
            }

            if (liValue.trim() === searchValue.toLowerCase()) {
              isOptionInList = true;
            }
          }
        });

        if (isEnter) {
          if (_this11.isEditable && !isOptionInList) {
            _this11.renderer.addNewOption();

            return;
          }

          if (isEnterWithShift) {
            _this11._handleEnterWithShiftKey($this);
          }

          _this11.$materialSelect.trigger('open');

          return;
        }

        _this11.$addOptionBtn[searchValue && _this11.isEditable && !isOptionInList ? 'show' : 'hide']();

        var anyOptionMatch = $options.filter(function (_, e) {
          return $(e).is(':visible') && !$(e).parent().hasClass('disabled');
        }).length !== 0;

        if (!anyOptionMatch) {
          _this11.$toggleAll.hide();

          _this11.$materialOptionsList.append(_this11.$noSearchResultsInfo);
        } else {
          _this11.$toggleAll.show();

          _this11.$materialOptionsList.find(_this11.$noSearchResultsInfo).remove();

          _this11._updateToggleAllOption();
        }

        _this11.dropdown.updatePosition(_this11.$materialSelect, _this11.$materialOptionsList);
      });
    }
  }, {
    key: "bindHtmlClick",
    value: function bindHtmlClick() {
      var _this12 = this;

      $('html').on('click', function (e) {
        if (!$(e.target).closest("#select-options-".concat(_this12.properties.id)).length && !$(e.target).hasClass('mdb-select') && $("#select-options-".concat(_this12.properties.id)).hasClass('active')) {
          _this12.$materialSelect.trigger('close');

          if (!_this12.$materialSelect.val() && !_this12.options.placeholder) {
            _this12.$mainLabel.removeClass('active');
          }
        }

        if (_this12.isSearchable && _this12.$searchInput !== null && _this12.$materialOptionsList.hasClass('active')) {
          _this12.$materialOptionsList.find('.search-wrap input.search').focus();
        }
      });
    }
  }, {
    key: "bindMobileDevicesMousedown",
    value: function bindMobileDevicesMousedown() {
      $('select').siblings('input.select-dropdown', 'input.multi-bs-select').on('mousedown', function (e) {
        if (MaterialSelectView.isMobileDevice && (e.clientX >= e.target.clientWidth || e.clientY >= e.target.clientHeight)) {
          e.preventDefault();
        }
      });
    }
  }, {
    key: "bindSaveBtnClick",
    value: function bindSaveBtnClick() {
      var _this13 = this;

      // @Depreciated
      this.$btnSave.on('click', function () {
        _this13.$materialSelect.trigger('close');
      });
    }
  }, {
    key: "_isToggleAllPresent",
    value: function _isToggleAllPresent() {
      return this.$materialOptionsList.find(this.$toggleAll).length;
    }
  }, {
    key: "_updateToggleAllOption",
    value: function _updateToggleAllOption() {
      var $allOptionsButToggleAll = this.$materialOptionsList.find('li').not('.select-toggle-all, .disabled, :hidden').find('[type=checkbox]');
      var $checkedOptionsButToggleAll = $allOptionsButToggleAll.filter(':checked');
      var isToggleAllChecked = this.$toggleAll.find('[type=checkbox]').is(':checked');

      if ($checkedOptionsButToggleAll.length === $allOptionsButToggleAll.length && !isToggleAllChecked) {
        this.$toggleAll.find('[type=checkbox]').prop('checked', true);
      } else if ($checkedOptionsButToggleAll.length < $allOptionsButToggleAll.length && isToggleAllChecked) {
        this.$toggleAll.find('[type=checkbox]').prop('checked', false);
      }
    }
  }, {
    key: "_handleTabKey",
    value: function _handleTabKey($materialSelect) {
      this._handleEscKey($materialSelect);
    }
  }, {
    key: "_handleEnterWithShiftKey",
    value: function _handleEnterWithShiftKey($materialSelect) {
      if (!this.isMultiple) {
        this._handleEnterKey($materialSelect);
      } else {
        this.$toggleAll.trigger('click');
      }
    }
  }, {
    key: "_handleEnterKey",
    value: function _handleEnterKey($materialSelect) {
      var $activeOption = this.$materialOptionsList.find('li.selected:not(.disabled)');
      $activeOption.trigger('click').addClass('active');

      if (!this.isMultiple) {
        $materialSelect.trigger('close');
      }
    }
  }, {
    key: "_handleArrowUpDownKey",
    value: function _handleArrowUpDownKey(keyCode) {
      var _this14 = this;

      var $availableOptions = this.$materialOptionsList.find('li:visible').not('.disabled, .select-toggle-all');
      var $firstOption = $availableOptions.first();
      var $lastOption = $availableOptions.last();
      var anySelected = this.$materialOptionsList.find('li.selected').length > 0;
      var $matchedMaterialOption = null;
      var $activeOption = null;
      var isArrowUp = keyCode === this.keyCodes.arrowUp;

      if (isArrowUp) {
        var $currentOption = anySelected ? this.$materialOptionsList.find('li.selected').first() : $lastOption;
        var $prevOption = $currentOption.prev('li:visible:not(.disabled, .select-toggle-all)');
        $activeOption = $prevOption;
        $availableOptions.each(function (key, el) {
          if ($(el).hasClass(_this14.options.keyboardActiveClass)) {
            $prevOption = $availableOptions.eq(key - 1);
            $activeOption = $availableOptions.eq(key);
          }
        });
        $matchedMaterialOption = $currentOption.is($firstOption) || !anySelected ? $currentOption : $prevOption;
      } else {
        var _$currentOption = anySelected ? this.$materialOptionsList.find('li.selected').first() : $firstOption;

        var $nextOption = _$currentOption.next('li:visible:not(.disabled, .select-toggle-all)');

        $activeOption = $nextOption;
        $availableOptions.each(function (key, el) {
          if ($(el).hasClass(_this14.options.keyboardActiveClass)) {
            $nextOption = $availableOptions.eq(key + 1);
            $activeOption = $availableOptions.eq(key);
          }
        });
        $matchedMaterialOption = _$currentOption.is($lastOption) || !anySelected ? _$currentOption : $nextOption;
      }

      this._selectSingleOption($matchedMaterialOption);

      this._removeKeyboardActiveClass();

      if (!$matchedMaterialOption.find('input').is(':checked')) {
        $matchedMaterialOption.removeClass(this.options.keyboardActiveClass);
      }

      if (!$activeOption.hasClass('selected') && !$activeOption.find('input').is(':checked') && this.isMultiple) {
        $activeOption.removeClass('active', this.options.keyboardActiveClass);
      }

      $matchedMaterialOption.addClass(this.options.keyboardActiveClass);

      if ($matchedMaterialOption.position()) {
        this.$materialOptionsList.scrollTop(this.$materialOptionsList.scrollTop() + $matchedMaterialOption.position().top);
      }
    }
  }, {
    key: "_handleEscKey",
    value: function _handleEscKey($materialSelect) {
      this._removeKeyboardActiveClass();

      $materialSelect.trigger('close');
    }
  }, {
    key: "_handleLetterKey",
    value: function _handleLetterKey(e) {
      var _this15 = this;

      this._removeKeyboardActiveClass();

      if (this.isSearchable) {
        var isLetter = e.which > 46 && e.which < 91;
        var isNumber = e.which > 93 && e.which < 106;
        var isBackspace = e.which === 8;

        if (isLetter || isNumber) {
          this.$searchInput.find('input').val(e.key).focus();
        }

        if (isBackspace) {
          this.$searchInput.find('input').val('').focus();
        }
      } else {
        var filterQueryString = '';
        var letter = String.fromCharCode(e.which).toLowerCase();
        var nonLetters = Object.keys(this.keyCodes).map(function (key) {
          return _this15.keyCodes[key];
        });
        var isLetterSearchable = letter && nonLetters.indexOf(e.which) === -1;

        if (isLetterSearchable) {
          filterQueryString += letter;
          var $matchedMaterialOption = this.$materialOptionsList.find('li').filter(function (index, element) {
            return $(element).text().toLowerCase().includes(filterQueryString);
          }).first();

          if (!this.isMultiple) {
            this.$materialOptionsList.find('li').removeClass('active');
          }

          $matchedMaterialOption.addClass('active');

          this._selectSingleOption($matchedMaterialOption);
        }
      }
    }
  }, {
    key: "_removeKeyboardActiveClass",
    value: function _removeKeyboardActiveClass() {
      this.$materialOptionsList.find('li').removeClass(this.options.keyboardActiveClass);
    }
  }, {
    key: "_triggerChangeOnNativeSelect",
    value: function _triggerChangeOnNativeSelect() {
      var keyboardEvt = new KeyboardEvent('change', {
        bubbles: true,
        cancelable: true
      });
      this.$nativeSelect.get(0).dispatchEvent(keyboardEvt);
    }
  }, {
    key: "_selectSingleOption",
    value: function _selectSingleOption(newOption) {
      this.$materialOptionsList.find('li.selected').removeClass('selected');

      this._selectOption(newOption);
    }
  }, {
    key: "_updateDropdownScrollTop",
    value: function _updateDropdownScrollTop() {
      var $preselected = this.$materialOptionsList.find('li.active').first();

      if ($preselected.length) {
        this.$materialOptionsList.scrollTo($preselected);
      } else {
        this.$materialOptionsList.scrollTop(0);
      }
    }
  }, {
    key: "_selectOption",
    value: function _selectOption(newOption) {
      var option = $(newOption);
      option.addClass('selected');
    }
  }, {
    key: "_copyOptions",
    value: function _copyOptions(options) {
      return $.extend({}, options);
    }
  }, {
    key: "_jQueryFallback",
    value: function _jQueryFallback() {
      var $lastElem = null;

      for (var i = 0; i < arguments.length; i++) {
        $lastElem = i < 0 || arguments.length <= i ? undefined : arguments[i];

        if ($lastElem.length) {
          return $lastElem;
        }
      }

      return $lastElem;
    }
  }, {
    key: "isMultiple",
    get: function get() {
      return this.properties.isMultiple;
    }
  }, {
    key: "isSearchable",
    get: function get() {
      return this.properties.isSearchable;
    }
  }, {
    key: "isRequired",
    get: function get() {
      return this.properties.isRequired;
    }
  }, {
    key: "isEditable",
    get: function get() {
      return this.properties.isEditable;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this.$nativeSelect.is(':disabled');
    }
  }], [{
    key: "isMobileDevice",
    get: function get() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  }]);

  return MaterialSelectView;
}();