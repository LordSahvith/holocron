'use strict';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const horizontalGallerySelector = '.gallery-slides-inner';

$(document).ready(function() {
    let scrollbarFade;

    /**
     * Okay, this feels weird, I know.
     * In order to get the arrows to work with multiple sliders on the page, I needed
     * to use the .eq() function to connect the arrows to their respective slider.
     */
    $(horizontalGallerySelector).each(function(index) {
        var $slider = $(horizontalGallerySelector).eq(index).slick({
            slidestoShow: 1,
            swipeToSlide: true,
            arrows: false,
            draggable: true,
            nextArrow: $('.gallery-next').eq(index),
            prevArrow: $('.gallery-previous').eq(index),
            variableWidth: false,
            adaptiveHeight: true,
            infinite: false,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 577,
                    settings: {
                        slidesToShow: 1.62,
                        variableWidth: false,
                        adaptiveHeight: false
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2.21,
                        swipeToSlide: false,
                        slidesToScroll: 2,
                        variableWidth: false,
                        adaptiveHeight: false
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 2.75,
                        swipeToSlide: false,
                        slidesToScroll: 2,
                        arrows: true,
                        variableWidth: false,
                        adaptiveHeight: false
                    }
                },
                {
                    breakpoint: 1439,
                    settings: {
                        slidesToShow: 3.65,
                        swipeToSlide: false,
                        slidesToScroll: 3,
                        arrows: true,
                        variableWidth: false,
                        adaptiveHeight: false
                    }
                },
                {
                    breakpoint: 2047,
                    settings: {
                        slidesToShow: 3.65,
                        swipeToSlide: false,
                        slidesToScroll: 4,
                        arrows: true,
                        variableWidth: false,
                        adaptiveHeight: false
                    }
                }
            ]
        });

        // Slide Gallery Track in from right
        var $slickTrack = $slider.parents('.gallery-wrapper').eq(-1);

        if($slickTrack) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: $slickTrack,
                    start: "top 70%",
                    once: true
                }
            }).from($slickTrack, { opacity: 0, duration: 0.2 }).from($slickTrack, { xPercent: 100, duration: 1, ease: "circ" }, 0);
        }

        var $progressBar = $slider.parents('.horizontal-gallery').find('.progress');
        var $progressBarLabel = $progressBar.find( '.slider__label' );

        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            let totalSlides = slick.$slides.length;
            let slideProgress = ((nextSlide + 1) / totalSlides) * 100;

            /**
             * Fade the progress slider out of view
            **/
            function scrollBarFadeOut() {
                $progressBar.animate({opacity: 0}, 500);
            }

            if(scrollbarFade) {
                clearTimeout(scrollbarFade);
            }

            $progressBar
                .css('background-size', slideProgress + '% 100%')
                .attr('aria-valuenow', slideProgress )
                .animate({opacity: 1}, 150);

            $progressBarLabel.text( slideProgress + '% completed' );

            scrollbarFade = setTimeout( scrollBarFadeOut, 3000);
        });
    });

    /**
     * If on a mobile device, we need to move the leading text above the slider. It does not slide
     * with the rest of the slider on mobile, only tablet and desktop.
     * This assumes that the first paragraph text component is the leading text.
     */
    if(window.innerWidth < 577) {
    // Needed to wrap this into a function to get the proper parent
        $('div.slick-slide[data-slick-index=0] .experience-commerce_assets-paragraphtext').each(function() {
            $(this).clone()
                .prependTo($(this).parents('.gallery-wrapper'))
                .addClass('gallery-text');

            $(this).parents(horizontalGallerySelector).slick('slickRemove', 0);
        });
    }

});


