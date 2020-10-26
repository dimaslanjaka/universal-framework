"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// eslint-disable-next-line no-unused-vars
var MaterialSelectViewRenderer =
/*#__PURE__*/
function () {
  function MaterialSelectViewRenderer(view) {
    _classCallCheck(this, MaterialSelectViewRenderer);

    this.view = view;
  }

  _createClass(MaterialSelectViewRenderer, [{
    key: "destroy",
    value: function destroy() {
      var currentUuid = this.view.$nativeSelect.data('select-id');
      this.view.$nativeSelect.data('select-id', null).removeClass('initialized');
      this.view.$nativeSelect.parent().find('span.caret').remove();
      this.view.$nativeSelect.parent().find('input').remove();
      this.view.$nativeSelect.unwrap();
      $("ul#select-options-".concat(currentUuid)).remove();
    }
  }, {
    key: "render",
    value: function render() {
      this.setWrapperClasses();
      this.setMaterialSelectInitialValue();
      this.view.$nativeSelect.data('select-id', this.view.properties.id);
      this.view.$nativeSelect.before(this.view.$selectWrapper);
      this.appendDropdownIcon();
      this.appendMaterialSelect();
      this.appendMaterialOptionsList();
      this.appendNativeSelect();
      this.appendSelectLabel();
      this.appendCustomTemplateParts();

      if (this.shouldValidate) {
        this.appendValidationFeedbackElements();
      }

      if (this.isRequired) {
        this.enableValidation();
      }

      if (!this.isDisabled) {
        this.setMaterialOptionsListMaxHeight();
        this.view.dropdown = this.view.$materialSelect.dropdown({
          hover: false,
          closeOnClick: false,
          resetScroll: false
        });
      }

      if (this.shouldInheritTabindex) {
        this.view.$materialSelect.attr('tabindex', this.view.$nativeSelect.attr('tabindex'));
      }

      if (this.isDefaultMaterialInput) {
        this.view.$mainLabel.css('top', '-7px');
      }

      if (this.isCustomSelect) {
        this.view.$materialSelect.css({
          display: 'inline-block',
          width: '100%',
          height: 'calc(1.5em + .75rem + 2px)',
          padding: '.375rem 1.75rem .375rem .75rem',
          fontSize: '1rem',
          lineHeight: '1.5',
          backgroundColor: '#fff',
          border: '1px solid #ced4da'
        });
      }

      this.addAccessibilityAttributes();
      this.markInitialized();
    }
  }, {
    key: "setWrapperClasses",
    value: function setWrapperClasses() {
      if (this.isDefaultMaterialInput) {
        this.view.$selectWrapper.addClass(this.view.$nativeSelect.attr('class').split(' ').filter(function (el) {
          return el !== 'md-form';
        }).join(' ')).css({
          marginTop: '1.5rem',
          marginBottom: '1.5rem'
        });
      } else {
        this.view.$selectWrapper.addClass(this.view.$nativeSelect.attr('class'));
      }
    }
  }, {
    key: "setMaterialSelectInitialValue",
    value: function setMaterialSelectInitialValue() {
      if (!this.view.options.placeholder) {
        var sanitizedLabelHtml = this.view.$materialSelectInitialOption.replace(/"/g, '&quot;').replace(/  +/g, ' ').trim();
        this.view.$materialSelect.val(sanitizedLabelHtml);
      } else {
        this.view.$materialSelect.attr('placeholder', this.view.options.placeholder);

        if (!this.view.$nativeSelect.find('option[value=""][selected][disabled][data-mdb-placeholder]').length) {
          this.view.$nativeSelect.prepend('<option value="" selected disabled data-mdb-placeholder></option>');
        }
      }
    }
  }, {
    key: "appendDropdownIcon",
    value: function appendDropdownIcon() {
      if (this.isDisabled) {
        this.view.$dropdownIcon.addClass('disabled');
      }

      this.view.$selectWrapper.append(this.view.$dropdownIcon);
    }
  }, {
    key: "appendMaterialSelect",
    value: function appendMaterialSelect() {
      this.view.$selectWrapper.append(this.view.$materialSelect);
    }
  }, {
    key: "appendMaterialOptionsList",
    value: function appendMaterialOptionsList() {
      if (this.isSearchable) {
        this.appendSearchInputOption();
      }

      if (this.isEditable && this.isSearchable) {
        this.appendAddOptionBtn();
      }

      this.buildMaterialOptions();

      if (this.isMultiple) {
        this.appendToggleAllCheckbox();
      }

      this.view.$selectWrapper.append(this.view.$materialOptionsList);
    }
  }, {
    key: "appendNativeSelect",
    value: function appendNativeSelect() {
      this.view.$nativeSelect.appendTo(this.view.$selectWrapper);
    }
  }, {
    key: "appendSelectLabel",
    value: function appendSelectLabel() {
      if (this.view.$materialSelect.val() || this.view.options.placeholder) {
        this.view.$mainLabel.addClass('active');
      }

      this.view.$mainLabel[this.isDisabled ? 'addClass' : 'removeClass']('disabled');
      this.view.$mainLabel.appendTo(this.view.$selectWrapper);
    }
  }, {
    key: "appendCustomTemplateParts",
    value: function appendCustomTemplateParts() {
      var _this = this;

      this.view.$customTemplateParts.each(function (_, element) {
        var $templatePart = $(element);
        $templatePart.appendTo(_this.view.$materialOptionsList).wrap('<li></li>');
      });
      this.view.$btnSave.appendTo(this.view.$materialOptionsList); // @Depreciated
    }
  }, {
    key: "appendValidationFeedbackElements",
    value: function appendValidationFeedbackElements() {
      this.view.$validFeedback.insertAfter(this.view.$selectWrapper);
      this.view.$invalidFeedback.insertAfter(this.view.$selectWrapper);
    }
  }, {
    key: "enableValidation",
    value: function enableValidation() {
      this.view.$nativeSelect.css({
        position: 'absolute',
        top: '1rem',
        left: '0',
        height: '0',
        width: '0',
        opacity: '0',
        padding: '0',
        'pointer-events': 'none'
      });

      if (this.view.$nativeSelect.attr('style').indexOf('inline!important') === -1) {
        this.view.$nativeSelect.attr('style', "".concat(this.view.$nativeSelect.attr('style'), " display: inline!important;"));
      }

      this.view.$nativeSelect.attr('tabindex', -1);
      this.view.$nativeSelect.data('inherit-tabindex', false);
    }
  }, {
    key: "setMaterialOptionsListMaxHeight",
    value: function setMaterialOptionsListMaxHeight() {
      var multiplier = this.view.options.visibleOptions;
      var additionalHeight = 0;
      this.view.$materialOptionsList.show();
      var $materialOptions = this.view.$materialOptionsList.find('li').not('.disabled');
      var optionHeight = $materialOptions.first().height();
      var optionsCount = $materialOptions.length;

      if (this.isSearchable) {
        additionalHeight += this.view.$searchInput.height();
      }

      if (this.isMultiple) {
        additionalHeight += this.view.$toggleAll.height();
      }

      this.view.$materialOptionsList.hide();

      if (multiplier >= 0 && multiplier < optionsCount) {
        var maxHeight = optionHeight * multiplier + additionalHeight;
        this.view.$materialOptionsList.css('max-height', maxHeight);
        this.view.$materialSelect.data('maxheight', maxHeight);
      }
    }
  }, {
    key: "addAccessibilityAttributes",
    value: function addAccessibilityAttributes() {
      this.view.$materialSelect.attr({
        role: this.isSearchable ? 'combobox' : 'listbox',
        'aria-multiselectable': this.isMultiple,
        'aria-disabled': this.isDisabled,
        'aria-required': this.isRequired,
        'aria-labelledby': this.view.$mainLabel.attr('id'),
        'aria-haspopup': true,
        'aria-expanded': false
      });

      if (this.view.$searchInput) {
        this.view.$searchInput.attr('role', 'searchbox');
      }

      this.view.$materialOptionsList.find('li').each(function () {
        var $this = $(this);
        $this.attr({
          role: 'option',
          'aria-selected': $this.hasClass('active'),
          'aria-disabled': $this.hasClass('disabled')
        });
      });
    }
  }, {
    key: "markInitialized",
    value: function markInitialized() {
      this.view.$nativeSelect.addClass('initialized');
    }
  }, {
    key: "appendSearchInputOption",
    value: function appendSearchInputOption() {
      var placeholder = this.view.$nativeSelect.attr('searchable');
      var divClass = this.isDefaultMaterialInput ? '' : 'md-form';
      var inputClass = this.isDefaultMaterialInput ? 'select-default mb-2' : '';
      this.view.$searchInput = $("<span class=\"search-wrap ml-2\"><div class=\"".concat(divClass, " mt-0\"><input type=\"text\" class=\"search w-100 d-block ").concat(inputClass, "\" tabindex=\"-1\" placeholder=\"").concat(placeholder, "\"></div></span>"));
      this.view.$materialOptionsList.append(this.view.$searchInput);
      this.view.$searchInput.on('click', function (e) {
        return e.stopPropagation();
      });
    }
  }, {
    key: "appendAddOptionBtn",
    value: function appendAddOptionBtn() {
      this.view.$searchInput.append(this.view.$addOptionBtn);
      this.view.$addOptionBtn.on('click', this.addNewOption.bind(this));
    }
  }, {
    key: "buildMaterialOptions",
    value: function buildMaterialOptions() {
      var _this2 = this;

      this.view.$nativeSelectChildren.each(function (index, option) {
        var $this = $(option);

        if ($this.is('option')) {
          _this2.buildSingleOption($this, _this2.isMultiple ? 'multiple' : '');
        } else if ($this.is('optgroup')) {
          var $materialOptgroup = $("<li class=\"optgroup\"><span>".concat($this.attr('label'), "</span></li>"));

          _this2.view.$materialOptionsList.append($materialOptgroup);

          var $optgroupOptions = $this.children('option');
          $optgroupOptions.each(function (index, optgroupOption) {
            _this2.buildSingleOption($(optgroupOption), 'optgroup-option');
          });
        }
      });
    }
  }, {
    key: "appendToggleAllCheckbox",
    value: function appendToggleAllCheckbox() {
      var firstOption = this.view.$materialOptionsList.find('li').first();

      if (firstOption.hasClass('disabled') && firstOption.find('input').prop('disabled')) {
        firstOption.after(this.view.$toggleAll);
      } else {
        this.view.$materialOptionsList.find('li').first().before(this.view.$toggleAll);
      }
    }
  }, {
    key: "addNewOption",
    value: function addNewOption() {
      var val = this.view.$searchInput.find('input').val();
      var $newOption = $("<option value=\"".concat(val.toLowerCase(), "\" selected>").concat(val, "</option>")).prop('selected', true);

      if (!this.isMultiple) {
        this.view.$nativeSelectChildren.each(function (index, option) {
          $(option).attr('selected', false);
        });
      }

      this.view.$nativeSelect.append($newOption);
    }
  }, {
    key: "buildSingleOption",
    value: function buildSingleOption($nativeSelectChild, type) {
      var disabled = $nativeSelectChild.is(':disabled') ? 'disabled' : '';
      var active = $nativeSelectChild.is(':selected') ? 'active' : '';
      var optgroupClass = type === 'optgroup-option' ? 'optgroup-option' : '';
      var iconUrl = $nativeSelectChild.data('icon');
      var fas = $nativeSelectChild.data('fas') ? "<i class=\"fa-pull-right m-2 fas fa-".concat($nativeSelectChild.data('fas'), " ").concat(this.view.options.fasClasses, "\"></i> ") : '';
      var far = $nativeSelectChild.data('far') ? "<i class=\"fa-pull-right m-2 far fa-".concat($nativeSelectChild.data('far'), " ").concat(this.view.options.farClasses, "\"></i> ") : '';
      var fab = $nativeSelectChild.data('fab') ? "<i class=\"fa-pull-right m-2 fab fa-".concat($nativeSelectChild.data('fab'), " ").concat(this.view.options.fabClasses, "\"></i> ") : '';
      var classes = $nativeSelectChild.attr('class');
      var iconHtml = iconUrl ? "<img alt=\"\" src=\"".concat(iconUrl, "\" class=\"").concat(classes, "\">") : '';
      var checkboxHtml = this.isMultiple ? "<input type=\"checkbox\" class=\"form-check-input\" ".concat(disabled, "/><label></label>") : '';
      this.view.$materialOptionsList.append($("<li class=\"".concat(disabled, " ").concat(active, " ").concat(optgroupClass, " ").concat(this.view.options.copyClassesOption ? classes : '', " \">").concat(iconHtml, "<span class=\"filtrable\">").concat(checkboxHtml, " ").concat($nativeSelectChild.html(), " ").concat(fas, " ").concat(far, " ").concat(fab, "</span></li>")));
    }
  }, {
    key: "shouldValidate",
    get: function get() {
      return this.view.options.validate;
    }
  }, {
    key: "shouldInheritTabindex",
    get: function get() {
      return this.view.$nativeSelect.data('inherit-tabindex') !== false;
    }
  }, {
    key: "isMultiple",
    get: function get() {
      return this.view.isMultiple;
    }
  }, {
    key: "isSearchable",
    get: function get() {
      return this.view.isSearchable;
    }
  }, {
    key: "isRequired",
    get: function get() {
      return this.view.isRequired;
    }
  }, {
    key: "isEditable",
    get: function get() {
      return this.view.isEditable;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this.view.isDisabled;
    }
  }, {
    key: "isDefaultMaterialInput",
    get: function get() {
      return this.view.options.defaultMaterialInput;
    }
  }, {
    key: "isCustomSelect",
    get: function get() {
      return this.view.$materialSelect.hasClass('custom-select') && this.view.$materialSelect.hasClass('select-dropdown');
    }
  }]);

  return MaterialSelectViewRenderer;
}();