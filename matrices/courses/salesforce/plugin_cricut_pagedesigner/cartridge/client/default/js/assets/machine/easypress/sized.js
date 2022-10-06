'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * easypress sized js
 * @param {section} section - a section
 */
function EasypressSized(section) {
    this.section = section;
    this.sizedVisuals = section.querySelector(".sized-visuals");
    this.leftImage = section.querySelector(".left-image");
    this.rightImage = section.querySelector(".right-image");

    const xDist = 150;

    gsap.timeline({
        scrollTrigger: {
            trigger: this.sizedVisuals,
            start: "top 70%",
            once: true
        },
        defaults: {
            duration: 1
        }
    })
        .from([this.leftImage, this.rightImage], {
            duration: 0.5,
            autoAlpha: 0
        })
        .from(this.leftImage, {
            x: PRM ? 0 : -xDist
        }, "<")
        .from(this.rightImage, {
            x: PRM ? 0 : xDist
        }, "<");
}

$(document).ready(function () {
    const easypressSizes = document.querySelectorAll(".easypress-sized");
    easypressSizes.forEach(section => new EasypressSized(section));
});