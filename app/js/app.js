// Import jQuery module (npm i jquery)
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'slick-carousel';

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {
    $(".menu__a-hasSub").parent( "li" ).hover(function () {
        $(".menu__a-hasSub").addClass('active');
        $(".menu__a-hasSub").next('.submenu').addClass('active');
    }, function () {
        // change to any color that was previously used.
        $(".menu__a-hasSub").removeClass('active');
        $(".menu__a-hasSub").next('.submenu').removeClass('active');
    });

    $(document).mouseup(function (e) {
        if (
            !$('.burger').is(e.target) &&
            $('.burger').has(e.target).length === 0 &&
            !$('.header').is(e.target) &&
            $('.header').has(e.target).length === 0
        ) {
            $('.burger').removeClass('burger-active');
            $('.menu__ul').removeClass('menu__ul-active');
            $('.phone').removeClass('phone-active');
        }
        if (!$('.popup__wrap').is(e.target) && $('.popup__wrap').has(e.target).length === 0) {
            $('.popup').removeClass('popup-open');
            $('body').css('overflow', 'auto');
        }
    });
    // *end dropdown menu

    // burger
    $('.burger').click(function () {
        if ($(this).hasClass('burger-active')) {
            $(this).removeClass('burger-active');
            $('.menu__ul').removeClass('menu__ul-active');
            $('.phone').removeClass('phone-active');
        } else {
            $(this).addClass('burger-active');
            $('.menu__ul').addClass('menu__ul-active');
            $('.phone').addClass('phone-active');
        }
    });
    // * end burger

    // popup
    $('.wrap__btn').click(function () {
        $('.popup').addClass('popup-open');
        $('body').css('overflow', 'hidden');
    });

    $('.close').click(function () {
        $(this).closest('.popup').removeClass('popup-open');
        $('body').css('overflow', 'auto');
    });
    // * end popup

    // * service list
    $('.service__item').click(function () {
        $('.service__item').removeClass('service__item-active');
        $(this).addClass('service__item-active');

        $('.service__txt').removeClass('service__txt-active');

        //var cur = $(this).attr('data-service');
        //$(".service-desc").find(`.service__txt[data-service='${$(this).attr('data-service')}']`).addClass("service__txt-active");
        $(`.service__txt[data-service='${$(this).attr('data-service')}']`).addClass(
            'service__txt-active',
        );
    });

    $('.slider').slick();
    // * end service list

    // * start form validation
    $('.popup .popup__input-name').bind('input', function () {
        if ($(this).val().match('^[a-zA-Za-яА-Я].*[\s\.]*$')) {
            $(this).removeClass('popup__input-bad');
            $(this).addClass('popup__input-good');
            buttonActive();
        } else {
            $(this).removeClass('popup__input-good');
            $(this).addClass('popup__input-bad');
            buttonsDisable();
        }
    });
    $('.popup .popup__input-email').bind('input', function () {
        var EmailRegex = '([0-9]{10})|(([0-9]{3})s+[0-9]{3}-[0-9]{4})';
        if ($(this).val().match(EmailRegex)) {
            $(this).removeClass('popup__input-bad');
            $(this).addClass('popup__input-good');
            buttonActive();
        } else {
            $(this).removeClass('popup__input-good');
            $(this).addClass('popup__input-bad');
            buttonsDisable();
        }
    });

    function buttonActive() {
        if (
            $('.popup .popup__input-name').hasClass('popup__input-good') &&
            $('.popup .popup__input-email').hasClass('popup__input-good')
        ) {
            $('.popup .popup__submit').attr('disabled', false);
        }
    }

    function buttonsDisable() {
        if (
            $('.popup .popup__input-name').hasClass('popup__input-bad') ||
            $('.popup .popup__input-email').hasClass('popup__input-bad')
        ) {
            $('.popup .popup__submit').attr('disabled', true);
        }
    }

    $('.b-contacts .popup__input-name').bind('input', function () {
        if ($(this).val().match('^[a-zA-Za-яА-Я].*[\s\.]*$')) {
            $(this).removeClass('popup__input-bad');
            $(this).addClass('popup__input-good');
            buttonActive();
        } else {
            $(this).removeClass('popup__input-good');
            $(this).addClass('popup__input-bad');
            buttonsDisable();
        }
    });
    
    $('.b-contacts .popup__input-email').bind('input', function () {
        var EmailRegex = /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/;
        if ($(this).val().match(EmailRegex)) {
            $(this).removeClass('popup__input-bad');
            $(this).addClass('popup__input-good');
            buttonActiveContacts();
        } else {
            $(this).removeClass('popup__input-good');
            $(this).addClass('popup__input-bad');
            buttonsDisableContacts();
        }
    });

    function buttonActiveContacts() {
        if (
            $('.b-contacts .popup__input-name').hasClass('popup__input-good') &&
            $('.b-contacts .popup__input-email').hasClass('popup__input-good')
        ) {
            $('.b-contacts .popup__submit').attr('disabled', false);
        }
    }

    function buttonsDisableContacts() {
        if (
            $('.b-contacts .popup__input-name').hasClass('popup__input-bad') ||
            $('.b-contacts .popup__input-email').hasClass('popup__input-bad')
        ) {
            $('.b-contacts .popup__submit').attr('disabled', true);
        }
    }
    
    $('.popup .popup__submit').attr('disabled', true);
    $('.b-contacts .popup__submit').attr('disabled', true);

    // * end form validation

    // smoth scroll
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate(
                        {
                            scrollTop: target.offset().top,
                        },
                        1000,
                        function () {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(':focus')) {
                                // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            }
                        },
                    );
                }
            }
        });
});
