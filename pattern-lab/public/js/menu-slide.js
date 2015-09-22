/**
 * @file
 * Add "js-active-menu" class to the body tag for the mobile menu.
 */

(function ($) {
  "use strict";

  // Menu Toggle
  $('.js-slide').on('click', function(e){

    e.preventDefault();

    $('body').toggleClass('js-active-menu');

  });

})(jQuery);