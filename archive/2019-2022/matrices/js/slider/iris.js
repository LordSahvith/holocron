(function ($) {
    $(document).ready(function () {        
        /*  sliderContainer should be the unique class for the slider
            heightBasis is the element that the height should be derived from */
        function customSlider(sliderContainer, heightBasis) {
            var slideIndex = 1;

            showSlide(slideIndex);

            var interval = setInterval(function () { showSlide(slideIndex++, 0); }, 3000);

            // console.log(sliderContainer);

            var imageHeight = $(heightBasis).height();
            // console.log('Image Height ' + imageHeight);
            $(sliderContainer).css({ 'height': imageHeight });

            $(window).on('resize', function () {
                imageHeight = $(heightBasis).height();
                $(sliderContainer).css({ 'height': imageHeight });

                if ($(window).outerWidth() < 768) {
                    startInterval();
                } else {
                    stopInterval();
                }
            });

            function startInterval() {
                clearInterval(interval);
                interval = setInterval(function () { showSlide(slideIndex++); }, 3000);
                // console.log("start");
            }

            function stopInterval() {
                clearInterval(interval);
                // console.log("stop");
            }

            $(sliderContainer + ' .slider-switch span').on('click', function () {
                let slide = Number($(this).attr('data-target'));
                showSlide(slideIndex += slide, 1);
                startInterval();
            });

            $(sliderContainer + ' .slider-dots .slider-dot').on('click', function () {
                let dot = Number($(this).attr('data-target'));
                showSlide(slideIndex = dot, 1);
                startInterval();
            });

            function showSlide(n, type) {
                var i;
                var image = $(heightBasis);
                var dots = $(sliderContainer + " .slider-dot");
                var dots2 = $(sliderContainer + " .slider-dots-wrapper .slider-dot");
                if (type === 0) {
                    n++;
                } else {
                    n = slideIndex;
                }
                if (n > image.length) { slideIndex = 1; }
                if (n < 1) { slideIndex = image.length; }
                for (i = 0; i < image.length; i++) {
                    $(image[i]).removeClass('fadeIn').addClass('fadeOut');
                }
                for (i = 0; i < dots.length; i++) {
                    $(dots[i]).removeClass('active-dot');
                    $(dots2[i]).removeClass('active-dot');
                }
                // console.log("n=" + n, "slideIndex=" + slideIndex);
                $(image[slideIndex - 1]).removeClass('fadeOut hide').addClass('fadeIn');
                $(dots[slideIndex - 1]).addClass('active-dot');
                $(dots2[slideIndex - 1]).addClass('active-dot');
            }
        }
        customSlider('.slider-container.slider-1', '.slider-image.slider-image-1');
        customSlider('.slider-container.slider-2', '.slider-image.slider-image-2');
    });
})(jQuery);