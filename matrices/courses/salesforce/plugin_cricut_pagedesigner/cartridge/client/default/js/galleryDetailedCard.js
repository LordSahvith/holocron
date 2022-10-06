'use strict';
import { gsap } from 'gsap';

let lastIndex = 0;

/**
 * Handles the click on the Gallery Detailed Card.
 * @param {int} newIndex The Gallery Detailed Card that was clicked.
 */
function handleSpecialSlideClick(newIndex) {
    let specialContent = gsap.utils.toArray($('.specialImageCuts')[0].querySelectorAll( "img" ));

    if(lastIndex != newIndex) {
        gsap.timeline()
            .to(specialContent[lastIndex], {
                opacity: 0,
                duration: 0.15,
                onComplete: function () {
                    gsap.set(this.targets(), { display: "none" });
                }
            })
            .fromTo(specialContent[newIndex], {
                scale: 0.8,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                onStart: function () {
                    gsap.set(this.targets(), { display: "inline" });
                }
            });
    }

    lastIndex = parseInt(newIndex);
}

$(document).ready(function() {
    $('.js-info-toggle').on('click', function() {
        let opened = $(this).parent('.gallery-slide').hasClass('open');
        let $dataToggle = $(this).children('.product-info-toggle');
        let closed = $dataToggle.data('closed');
        let open = $dataToggle.data('open');
        let dataSpecial = $(this).parent('.gallery-slide').data('special') >= 0 ? $(this).parent('.gallery-slide').data('special') : null;
        if(!opened) {
            $(this).parents('.gallery-slides').find('.gallery-slide').removeClass('open');
            $(this).parents('.gallery-slides').find('.product-info-toggle').text(open);
            $(this).parent('.gallery-slide').toggleClass('open');
            $(this).children('.product-info-toggle').text(closed);
            if(dataSpecial >= 0) {
                let newIndex = parseInt(dataSpecial);
                handleSpecialSlideClick(newIndex);
            }
        }
        else {
            $(this).parent('.gallery-slide').toggleClass('open');
            $(this).children('.product-info-toggle').text(open);
        }
    });
});