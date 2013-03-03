/*
 * ToggleElement Plugin for jQuery.
 * ======================================
 *
 * Usage: 
 *
 *     $(elem).toggleElement(options);
 *
 * Options is a JSON object and have following attributes:
 *
 *     {
 *       // the element to be toggled, can be string or DOM object or jQuery Object.
 *       element: null,
 *       // the time to toggle the element when mouse leave the element.
 *       duration: 5000, 
 *       // the way to trigger, can be 'click', 'hover' or 'manual'. Default is 'click'.
 *       trigger: 'click',
 *       // the function which will be called when toggling the object. 
 *       toggle: slideToggle,  
 *     }
 *
 * The default value for toggle function is a internal function. If you want to customize the toggle function, the toggle function should look like
 *
 *     function ($elem, event) {
 *       if ($elem.css('display') != 'none') {
 *         $elem.css('display', 'none');
 *       } else {
 *         $elem.css('display', 'block');
 *       }
 *       // alternatively, $elem.toggle() is the same here.
 *     }
 *
 * @author Gtf.code
 * @date 2013.1.31
 */

(function ($) {
  "use strict"

  function slideToggle(elem) {
    $elem = $(elem);
    $elem.slideToggle();
  }

  $.fn.toggleElement = function (options) {
    var defaultOptions = {
      element: null,
      duration: 5000,
      trigger: 'click',
      toggle: slideToggle
    };
    var opt = $.extend(defaultOptions, options);

    return this.each(function (index, elem) {
      var $elem = $(elem);
      var $toggle = opt.element? $(opt.element) : $($elem.data('toggle'));

      var t = null;
      $toggle.hover(function mouseover(event) {
        if (opt.duration > 0 && t) {
          clearTimeout(t);
          t = null;
        }
      }, function mouseleave(event) {
        if (opt.duration > 0 && !t) {
          t = setTimeout(function () {
            opt.toggle($toggle);
            t = null;
          }, opt.duration);
        }
      });

      if (opt.trigger != 'manual') {
        $elem[opt.trigger](function (event) {
          event.preventDefault();
          if ($toggle.css('display') == 'none') {
            opt.toggle($toggle, event);
            if (opt.duration > 0) {
              $toggle.trigger('mouseleave');
            }
          } else {
            opt.toggle($toggle, event);
          }
        });
      }

    });
  }
})(jQuery);
