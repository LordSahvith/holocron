(function ($) {
    $(document).ready(function () {
        var subNavOffsetTop = $('.subNav').offset().top;
        var subNavOffsetBottom = subNavOffsetTop + $('.subNav').outerHeight(true);
        var subNavContentOffsetTop = $('.subNavContent').offset().top;
        var subNavContentOffsetBottom = subNavContentOffsetTop + $('.subNavContent').outerHeight(true);
        var footerOffsetTop = $('footer').offset().top;

        $('.subNavBtn').addClass('slide');
        $('.content-doc').hide();
        $('.content-doc.active').fadeIn('slow');

        $(window).on('resize', function() {
            subNavOffsetTop = $('.subNav').offset().top;
            subNavOffsetBottom = subNavOffsetTop + $('.subNav').outerHeight(true);
        });

        // setup side menu when scrolled
        $(window).on('scroll', function () {
            var windowPos = $(window).scrollTop();
            subNavOffsetTop = $('.subNav').offset().top;
            subNavOffsetBottom = subNavOffsetTop + $('.subNav').outerHeight(true);
            subNavContentOffsetTop = $('.subNavContent').offset().top;
            subNavContentOffsetBottom = subNavContentOffsetTop + $('.subNavContent').outerHeight(true);
            footerOffsetTop = $('footer').offset().top;
            if (windowPos > subNavOffsetBottom && $(window).outerWidth(true) < 992) {
                $('.subNavBtn').removeClass('slide');
                $('.subNavContent').addClass('sideNav slide');
                $('.btnClose').removeClass('hidden');
            } else if (windowPos > subNavOffsetTop && $(window).outerWidth(true) >= 992) {
                $('.subNavContent').addClass('fixed');
            } else {
                $('.subNavBtn').addClass('slide');
                $('.subNavContent').removeClass('sideNav slide transition fixed');
                $('.btnClose').addClass('hidden');
            }

            // if (subNavContentOffsetBottom > footerOffsetTop) {
            //     $('.subNavContent').removeClass('fixed').addClass('bottom');
            // } 
        });

        // slide out menu when button clicked
        $('.subNavBtn').on('click', function () {
            $('.subNavContent').addClass('transition').removeClass('slide');
        });

        // close menu when btnClose is clicked
        $('.btnClose button').on('click', function () {
            $('.subNavContent').addClass('slide');
        });

        // scroll to top of desired section
        $('.scrollItem').on('click', function () {
            fadeInSection(this);
            scrollTo(this);
        });

        // SCROLL TO SECTION
        function scrollTo(scrollItem) {
            var scroll = $(scrollItem).attr('data-scroll');
            var offsetMove = $(scroll).offset().top;
            if (scroll) {
                $('html, body').animate({
                    scrollTop: offsetMove
                }, 1000);
            }
        }

        // fade in desired section 
        function fadeInSection(fadeItem) {
            var fade = $(fadeItem).attr('data-scroll');
            var prev = $('.content-doc.active');
            var current = $(fade);
            prev.removeClass('active');
            current.addClass('active');
            if (fade !== '#' + $(prev).attr('id') && fade !== '#top' && fade !== '#sales-terms' && fade !== '#order-terms' && fade != + '#digital-credit-terms') {
                prev.hide();
                current.fadeIn(1000);
            }
        }
    });
})(jQuery);