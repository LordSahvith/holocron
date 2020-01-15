(function ($) {
    $(document).ready(function () {
        const sliderWrapper = $('.inner-wrapper');
        var firstSlide = $('.slide:first');
        var lastSlide = $('.slide:last');
        var slideWrapWidth,
            slide = [],
            slideLength,
            interval;

        /**
         * clone last slide and add to front
         * this is for making sure the slide
         * initially set at '1' in html is
         * the one displayed
         * also is very important for the 
         * slideLeft() & slideRight() to 
         * work properly
         */
        // firstSlide.before(lastSlide.clone(true));
        $('.slide').each(function () {
            slide.push(this);
        });

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
            // interval = setInterval(function () { slideRight(); }, 3000);
            console.log('(setWidths) array length', slideLength);
        }

        // set widths of slider elements
        function setWidths() {
            slideLength = slide.length;
            slideWrapWidth = 100 * slideLength + '%';
            sliderWrapper.css('width', slideWrapWidth);
            $(slide).each(function () {
                $(this).css('width', 'calc(100% / ' + slideLength);
            });
        }

        // listens for click on next/prev buttons
        $('.button').on('click', function () {
            // checks what was clicked prev or next
            var direction = (this.id === "prev") ? -1 : 1;
            if (direction === -1) {
                slideLeft();
            } else {
                slideRight();
            }
        });

        // listens for swipe to right
        sliderWrapper.on('swiperight', function () {
            slideLeft();
        });

        // listens for swipe to left
        sliderWrapper.on('swipeleft', function () {
            slideRight();
        });

        // slides to the right
        function slideRight() {
            // set first item in array width to 0%
            $('.slide').first().css({ 'width': '0%' });
            console.log(slide[0]);
            setTimeout(function () {
                let clone;
                // removes first item in array
                slide.shift();
                // copy new first item in array
                clone = slide[0];
                // append copy to end of array
                slide.push(clone);
                addToPage();
                setWidths();
            }, 300);
            startInterval();
        }

        // slides to the left
        function slideLeft() {
            $('.slide').last().remove();
            $('.slide').first().before($('.slide').last().clone(true).css('width', '0%'));
            $('.slide').last().animate({ 'width': '100%' }, 0, function () {
                setWidths();
            });
            startInterval();
        }

        function addToPage() {     
            // empty out slide contents
            sliderWrapper.empty();   
            // append array    
            for (var i = 0; i < slide.length; i++) {
                sliderWrapper.append(slide[i].outerHTML);
            }
        }

        function cloneLastToFirst() {      
            // copy new first item in array
            let clone = slide[slideLength - 1];
            // append copy to end of array
            slide.unshift(clone);
            setWidths();
        }

        // starts intervals and sets widths
        function init() {
            // interval = setInterval(function () { slideRight(); }, 3000);
            setWidths();
            cloneLastToFirst();
            addToPage();
        }

        init();
    });
})(jQuery);