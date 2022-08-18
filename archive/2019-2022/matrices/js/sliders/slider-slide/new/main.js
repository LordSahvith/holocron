(function ($) {
    $(document).ready(function () {
        const sliderWrapper = $('.inner-wrapper');
        var firstSlide = $('.slide:first');
        var lastSlide = $('.slide:last');
        var initialSlideLength = $('.slide').length;
        var current = 0;
        var slideWrapWidth,
            slide,
            slideLength,
            interval,
            cycle;

        /**
         * clone last slide and add to front
         * this is for making sure the slide
         * initially set at '1' in html is
         * the one displayed
         * also is VERY IMPORTANT for the 
         * slideLeft() & slideRight() to 
         * work properly
         */
        firstSlide.before(lastSlide.clone(true));

        // starts/stops interval on hover/leave
        sliderWrapper.hover(function () {
            stopInterval();
        }, function () {
            startInterval();
        });

        // stops interval
        function stopInterval() {
            clearInterval(interval);
        }

        // resets interval
        function startInterval() {
            stopInterval();
            // interval = setInterval(function () { slideRight(true); }, 3000);
        }

        // set widths of slider elements
        function setWidths() {
            slide = $('.slide');
            slideLength = slide.length;
            slideWrapWidth = 100 * slideLength + '%';
            sliderWrapper.css('width', slideWrapWidth);
            slide.css('width', 'calc(100% / ' + slideLength);
        }

        // listens for click on next/prev buttons
        $('.button').on('click', function () {
            // checks what was clicked prev or next
            var direction = (this.id === "prev") ? -1 : 1;
            current += direction;
            currentIndex();
            if (direction === -1) {
                slideLeft(false);
            } else {
                slideRight(false);
            }
        });

        // listens for swipe to right
        sliderWrapper.on('swiperight', function () {
            slideLeft(true);
        });

        // listens for swipe to left
        sliderWrapper.on('swipeleft', function () {
            slideRight(true);
        });

        // slides to the right
        function slideRight(isInterval) {
            if (isInterval) {
                current++;
                currentIndex();
            }
            $('.slide').first().css({ 'width': '0%' });
            setTimeout(function () {
                $('.slide').first().remove();
                $('.slide').last().after($('.slide').first().clone(true));
                setWidths();
            }, 300);
            startInterval();
        }

        // slides to the left
        function slideLeft(isInterval) {
            if (isInterval) {
                current--;
                currentIndex();
            }
            $('.slide').last().remove();
            $('.slide').first().before($('.slide').last().clone(true).css('width', '0%'));
            $('.slide').last().animate({ 'width': '100%' }, 0, function () {
                setWidths();
            });
            startInterval();
        }

        function currentIndex() {
            cycle = !!(current <= 0 || current === initialSlideLength);
            console.log('current is:', current);
            if (cycle) {
                if (current < 0) {
                    current = initialSlideLength - 1;
                } else if (current === initialSlideLength) {
                    current = 0;
                }
            }
            console.log('current is now:', current);
        }

        // starts intervals and sets widths
        function init() {
            // interval = setInterval(function () { slideRight(true); }, 3000);
            setWidths();
        }

        init();
    });
})(jQuery);