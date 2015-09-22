/**
 * @file
 * Expand to secondary menu items when clicking collapsed menu items.
 */

(function ($) {
    "use strict";

    // Menu Expand
    $('.menu-item--expanded').click(function(){
        $('.primary-nav__item').slideUp();
        $('.menu-item--expanded').removeClass('open');
        if($(this).next('.primary-nav__item').css('display') == 'block'){
            $('.primary-nav__sub').slideUp('open');
        }
        else{
            $(this).next('.primary-nav__item').slideDown();
            $(this).children('.menu-item--expanded').addClass('open');
        }
    });

})(jQuery);