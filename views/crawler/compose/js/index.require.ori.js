require(['jquery', 'Select', 'lang'], function ($) {
  var wrapper = $('[id="translator-wrapper"]');
  wrapper.each(function (i, el) {
    var sl = createSelect('form-control', $(this).data('id'), $(this).data('name'));
    $(this).html(sl);
    var mySelect = new dS('#' + $(this).data('id'), {
      save: true,
      filtered: 'auto',
      filter_threshold: 8,
      filter_placeholder: 'Filter options...',
      css: "/assets/components/Select/dist/select.min.css",
      start: true
    });
  });
});