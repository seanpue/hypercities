/**
 * jQuery Form Input Prompt Plugin 0.5.1
 *
 * Seemingly populate form inputs with text that disappears when the field is focussed.
 * Works by not actually modifying the form field at all, instead an overlay div with
 * the prompt text is added to the DOM. This approach works better than direct
 * form field modification with AJAX-submitted forms and components.
 *
 * This script will become unnecessary once target browsers support HTML 5 and the
 * placeholder attribute for form fields.
 *
 * Usage
 *
 *  $('input#first_name').form_prompt('Don');
 *  $('input#email').form_prompt(function() {
 *    return $(this).attr('alt');
 *  });
 *  $('textarea#description').form_prompt('Type your message here', {
 *    className: 'form-prompt-class'
 *  });
 *
 * Copyright (c) Henry Poydar (henry@poydar.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Contributors: xaviershay, triplef, binary42
 *
**/

(function($) {

  // Setup jQuery object method based on the definition below
  $.fn.form_prompt = form_prompt;

  function form_prompt(text, options) {

    var prompt_text = '';
    options = options || {};

    // If text is passed as a callback, evaluate it
    if ($.isFunction(text)) {
      prompt_text = text.call(this);
    } else {
      prompt_text = text;
    }

    // Evaluate options
    var className = options.className || 'formPromptText';

    return this.each(function() {

      var input = $(this);

      // Use native placeholder attribute in Safari
      if ($.browser.safari) {
        input.attr('placeholder', prompt_text);
        return;
      }

      // This may need adjustment for MSIE ...
      if (input.val() == '') {
        input.before("<div class='" + className + "'>" + prompt_text + "</div>");
      } else {
        input.before("<div class='" + className + "'></div>");
      }

      var prompt = input.parent().find('.' + className);

      var selectInput = function() {
        input.focus();
        prompt.hide();
      };

      input.click(selectInput);   // Form field is clicked
      input.keyup(selectInput);   // Form field is tabbed into
      prompt.click(selectInput);  // Prompt element is clicked

      input.blur(function() {
        if (input.val() == '') { prompt.show(); }
      });
    });
  };

})(jQuery);
