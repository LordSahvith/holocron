(function ($) {
    $(document).ready(function () {
        const sliderWrapper = $('.inner-wrapper');
        var firstSlide = $('.slide:first');
        var lastSlide = $('.slide:last');
        var current = 1;
        var slideWrapWidth;
        var slide;
        var slideLength;
        var cycle;
        var interval; 

        firstSlide.before(lastSlide.clone(true));

        sliderWrapper.hover(function () {
            stopInterval();
        }, function () {
            startInterval();
        });

        function stopInterval() {
            clearInterval(interval);
        }

        function startInterval() {
            stopInterval();
            interval = setInterval(function () { slideRight(); }, 3000);
        }

        function setWidths() {
            slide = $('.slide');
            slideLength = slide.length;
            slideWrapWidth = 100 * slideLength + '%';
            sliderWrapper.css('width', slideWrapWidth);
            slide.css('width', 'calc(100% / ' + slideLength);
        }

        $('.button').on('click', function () {
            var direction = (this.id === "prev") ? -1 : 1;
            console.log(direction);
            current += direction;
            cycle = !!(current === 0 || current > slideLength);

            if (cycle) {
                current = (current === 0)? slideLength : 1; 
            }
            translateDir = current * -100 + '%';
            if (direction === -1) {
                slideLeft();
            } else {
                slideRight();
            }
        });

        function slideRight() {
            $('.slide').first().css({'width': '0%'});
            setTimeout(function() {
                $('.slide').first().remove();
                $('.slide').last().after($('.slide').first().clone(true));
                setWidths();
            }, 300);
            startInterval();
        }

        function slideLeft() {
            $('.slide').last().remove();
            $('.slide').first().before($('.slide').last().clone(true).css('width', '0%'));
            $('.slide').last().animate({ 'width': '100%' }, 0, function () {
                setWidths();
            });
            startInterval();
        }

        function init() {
            interval = setInterval(function () { slideRight(); }, 3000);
            setWidths();
        }

        init();
    });
})(jQuery);