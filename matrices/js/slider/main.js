(function ($) {
    $(document).ready(function () {
        var slideIndex = 1;
        showSlide(slideIndex);
        var interval = setInterval(function () { showSlide(slideIndex++, 0); }, 3000);

        var imageHeight = $('.slider-image').height();
        $('.slider-container').css({ 'height': imageHeight });

        $(window).on('resize', function() {
            imageHeight = $('.slider-image').height();
            $('.slider-container').css({ 'height': imageHeight });
        });

        function startInterval() {
            clearInterval(interval);
            interval = setInterval(function () { showSlide(slideIndex++); }, 3000);
        }

        $('.slider-switch span').on('click', function () {
            let slide = Number($(this).attr('data-target'));
            showSlide(slideIndex += slide, 1);
            startInterval();
        });

        $('.slider-dots .slider-dot').on('click', function () {
            let dot = Number($(this).attr('data-target'));
            showSlide(slideIndex = dot, 1);
            // startInterval();
        });

        function showSlide(n, type) {
            var i;
            var image = $(".slider-image");
            var dots = $(".slider-dot");
            if (type === 0) {
                n++;
            } else {
                n = slideIndex;
            }
            if (n > image.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = image.length; }
            for (i = 0; i < image.length; i++) {
                $(image[i]).removeClass('fadeIn').addClass('fadeOut');
                // $(image[i]).hide();
            }
            for (i = 0; i < dots.length; i++) {
                $(dots[i]).removeClass('active-dot');
            }
            // console.log("n=" + n, "slideIndex=" + slideIndex);
            $(image[slideIndex - 1]).removeClass('fadeOut hide').addClass('fadeIn');
            // $(image[slideIndex - 1]).fadeIn('slow');
            $(dots[slideIndex - 1]).addClass('active-dot');
        }
    });
})(jQuery);