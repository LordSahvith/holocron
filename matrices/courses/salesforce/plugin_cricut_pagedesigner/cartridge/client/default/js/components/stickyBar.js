'use strict';

import { gsap } from 'gsap';

/**
 * Adds functionality to the sticky bar
 * @param {HTMl} bar html element to be sticky
 */
function StickyBar(bar) {
    let stickyBar = bar;
    let stickyListBtn = stickyBar.querySelector('.mobile-sticky-list-button');
    let arrow = stickyListBtn.querySelector('svg');
    let stickyList = stickyBar.querySelector('.mobile-sticky-list');

    document.body.classList.add('with-sticky-stickyBar');

    let buttonList = stickyList.querySelector('.experience-buttons');
    let buttonListLength = buttonList.childElementCount;

    if (buttonListLength === 0) {
        stickyListBtn.classList.add('no-items');
    } else {
        stickyListBtn.classList.remove('no-items');
    }

    if (stickyList && buttonListLength !== 0) {
        let arrowAnim = gsap
            .timeline({
                paused: true,
                reversed: true,
                defaults: { duration: 0.2 }
            })
            .fromTo(arrow, { rotate: 180 }, { rotate: 360 })
            .to(stickyList, { y: 0 }, 0);

        stickyListBtn.addEventListener('click', () => {
            arrowAnim.reversed() ? arrowAnim.play() : arrowAnim.reverse();
        });

        window.addEventListener('resize', function () {
            if (innerWidth >= 768) {
                arrowAnim.progress(1).reversed(true).progress(0);
            }
        });
    }

    window.addEventListener('load', () => {
        stickyBar.classList.add('visible');
    });
}

$(document).ready(function () {
    let stickyBars = document.querySelectorAll('.sticky-bar');

    stickyBars.forEach((section) => {
        StickyBar(section);
    });
});
