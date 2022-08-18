(function ($) {
    $(document).ready(function () {
        var inWrap = $('.inner-wrapper');
        var slide;
        var inWrapLength;
        var inWrapWidth;
        var isFirst = true;


        var interval = setInterval(function () { slideRight(); }, 3000);
        // $('.slide').first().clone().appendTo(inWrap);
        let clone = $('.slide').last().clone();
        inWrap.prepend(clone);

        inWrap.hover(function () {
            stopInterval();
        }, function () {
            startInterval();
        });

        function setWidths() {
            slide = $('.slide');
            inWrapLength = slide.length;
            inWrapWidth = inWrapLength * 100 + '%';
            inWrap.css('width', inWrapWidth);
            slide.css('width', 'calc(100% / ' + inWrapLength + ')');
        }

        function stopInterval() {
            clearInterval(interval);
        }

        function startInterval() {
            stopInterval();
            interval = setInterval(function () { slideRight(); }, 3000);
        }


        $('.prev').on('click', function () {
            slideLeft();
        });

        inWrap.on('swiperight', function () {
            slideRight();
        });

        $('.next').on('click', function () {
            slideRight();
        });

        inWrap.on('swipeleft', function () {
            slideLeft();
        });

        function slideLeft() {
            $('.slide').first().clone().appendTo(inWrap);
            setWidths();
            inWrap.animate({ left: '-200%' }, 300, function () {
                inWrap.css('left', '-100%');
                $('.slide').first().remove();
                // $('.slide').last().after($('.slide').first());
                startInterval();
            });
        }

        function slideRight() {
            if (isFirst) {
                $('.slide').last().remove();
                isFirst = false;
            }
            let clone = $('.slide').last().clone();
            // inWrap.css('left', '-100%');
            // inWrap.prepend(clone);
            // setWidths();
            inWrap.animate({ left: '0%' }, 300, function () {
                inWrap.prepend(clone);
                setWidths();
                inWrap.css('left', '-100%');
                $('.slide').last().remove();
                startInterval();
            });
        }

        setWidths();
    });
})(jQuery);