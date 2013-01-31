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
 *       // the element to be toggled.
 *       element: null,
 *       // the time to toggle the element when mouse leave the element.
 *       duration: 5000, 
 *       //the toggle function. 
 *       toggle: slideToggle,  
 *     }
 *
 * The default value for toggle function is a internal function. If you want to customize the toggle function, the toggle function should look like
 *
 *     function ($elem) {
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
  function slideToggle(elem) {
    $elem = $(elem);
    $elem.slideToggle();
  }
  $.fn.toggleElement = function (options) {
    var defaultOptions = {
      element: null,
      duration: 5000,
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

      $elem.click(function (event) {
        event.preventDefault();
        if ($toggle.css('display') == 'none') {
          opt.toggle($toggle);
          if (opt.duration > 0) {
            $toggle.trigger('mouseleave');
          }
        } else {
          opt.toggle($toggle);
        }
      });

    });
  }
})(jQuery);
