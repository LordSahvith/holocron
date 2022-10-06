'use strict';

/**
 * Animates the progress slider in the horizontal gallery
 * @param {Object} slick - the full slick item with all the slides
 * @param {jQuery} nextSlide - the slide that will be active when the scroll completes
 * @param {num} scrollbarFade - the ID of the timeout timer
 *
 * @returns {num} scrollbarFade - the ID of the timeout timer
*/
function animateProgressBar(slick, nextSlide, scrollbarFade) {

    /**
     * Fade the progress slider out of view
    **/
    function scrollBarFadeOut() {
        slick.$slider.parent().siblings('.scrollbar-container').animate({opacity: 0}, 500);
    }

    //Stop the Scrollbar from fading if animation is initiated again before it has faded out.
    if(scrollbarFade) {
        clearTimeout(scrollbarFade);
    }

    let totalSlides = slick.$slides.length;
    let slideProgress = ((nextSlide + 1) / totalSlides) * 100;

    // Show the Scrollbar
    slick.$slider.parent().siblings('.scrollbar-container').animate({opacity: 1}, 150);

    // Update the width of the progress bar
    slick.$slider.parent().siblings('.scrollbar-container').children('.scrollbar').animate({width: slideProgress + '%'}, 500);

    // Wait 3 seconds then fade the Scrollbar Out
    scrollbarFade = setTimeout(scrollBarFadeOut, 3000);

    return scrollbarFade;
}

$(document).ready(function () {
    let scrollbarFade;

    $('.experience-slidesContainer').each(function(index) {
        $('.experience-slidesContainer').eq(index).slick({
            arrows: true,
            prevArrow: $('.projectGallery-previous').eq(index),
            nextArrow: $('.projectGallery-next').eq(index),
            centerMode: true,
            infinite: false
        });

        // Before the slide transitions
        $('.experience-slidesContainer').eq(index).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            scrollbarFade = animateProgressBar(slick, nextSlide, scrollbarFade);
        });
    });
});