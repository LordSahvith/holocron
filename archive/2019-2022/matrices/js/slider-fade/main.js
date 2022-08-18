(function ($) {
    $(document).ready(function () {

        const mySlider = new Slider('#slider1', false, true);
        const mySlider2 = new Slider('#slider2', false, false);
        
        mySlider.init();
        mySlider2.init();


        // function customSlider (slider) {
        //     var slideIndex = 1;

        //     showSlide(slider, slideIndex, true);
        //     var interval = setInterval(function () { showSlide(slider, slideIndex++, true); }, 3000);

        //     function startInterval(target) {
        //         stopInterval();
        //         interval = setInterval(function () { showSlide(target, slideIndex++, true); }, 3000);
        //     }

        //     function stopInterval() {
        //         clearInterval(interval);
        //     }

        //     function showSlide(target, index, start) {
        //         var i;
        //         var content = $(target + " .slider-content").children();
        //         var selector = $(target + " .slider-selector").children();
        //         console.log(target, $(target + " .slider-selector"));
        //         if (start) {
        //             index++;
        //         } else {
        //             index = slideIndex;
        //         }
        //         if (index > content.length) { slideIndex = 1; }
        //         if (index < 1) { slideIndex = content.length; }
        //         for (i = 0; i < content.length; i++) {
        //             $(content[i]).removeClass('fadeIn').addClass('fadeOut');
        //         }
        //         for (i = 0; i < selector.length; i++) {
        //             $(selector[i]).removeClass('active');
        //         }
        //         // console.log("index=" + index, "slideIndex=" + slideIndex);
        //         $(content[slideIndex - 1]).removeClass('fadeOut').addClass('fadeIn');
        //         // console.log(target, content[slideIndex - 1]);
        //         $(selector[slideIndex - 1]).addClass('active');
        //     }

        // }

        // customSlider('#slider1');
        // customSlider('#slider2');



        // var slideIndex = 1;
        // $('.slider').each(function () {
        //     slider = "#" + $(this).attr('id');
        //     console.log(slider);
        //     showSlide(slider, slideIndex, true);
        // });
        // var interval = setInterval(function () { showSlide(slider, slideIndex++, true); }, 3000);

        // // set interval for each slider
        // // var interval = setInterval(function () {
        // //     $('.slider').each(function () {
        // //         let slider = "#" + $(this).attr('id');
        // //         showSlide(slider, slideIndex, true);
        // //     });
        // //     slideIndex++;
        // // }, 3000);

        // $('.slider-selector').on('click', function (event) {
        //     let slide = Number($(event.target).attr('data-selector'));
        //     let target = $(event.target).attr('data-target');
        //     console.log(slide);
        //     if (!$(event.target).hasClass('slider-selector')) {
        //         showSlide(target, slideIndex = slide, false);
        //     }
        //     startInterval(target);
        // });

        // function startInterval(target) {
        //     stopInterval();
        //     interval = setInterval(function () { showSlide(target, slideIndex++, true); }, 3000);
        // }

        // function stopInterval() {
        //     clearInterval(interval);
        // }

        // function showSlide(target, index, start) {
        //     var i;
        //     var content = $(target + " .slider-content").children();
        //     var selector = $(target + " .slider-selector").children();
        //     if (start) {
        //         index++;
        //     } else {
        //         index = slideIndex;
        //     }
        //     if (index > content.length) { slideIndex = 1; }
        //     if (index < 1) { slideIndex = content.length; }
        //     for (i = 0; i < content.length; i++) {
        //         $(content[i]).removeClass('fadeIn').addClass('fadeOut');
        //     }
        //     for (i = 0; i < selector.length; i++) {
        //         $(selector[i]).removeClass('active');
        //     }
        //     console.log("index=" + index, "slideIndex=" + slideIndex);
        //     $(content[slideIndex - 1]).removeClass('fadeOut').addClass('fadeIn');
        //     console.log(target, content[slideIndex - 1]);
        //     $(selector[slideIndex - 1]).addClass('active');
        // }
    });
})(jQuery);