'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/**
 * bright dark section js
 * @param {section} section - a section
 */
function BillboardFlexibleHeightParallax(section) {
    this.section = section;
    this.backgroundImage = section.querySelector("picture");
    this.parallaxScrollTrigger;

    this.parallaxScrollTrigger = gsap.fromTo(this.backgroundImage, {
        y: "10vh"
    }, {
        y: () => innerWidth < 1025 ? "0vh" : "-10vh",
        scrollTrigger: {
            trigger: this.section,
            start: "top bottom",
            end: "bottom center",
            scrub: 0.3
        }
    }).scrollTrigger;
    
}

$(document).ready(function () {
    const billboardFlexibleHeightParallax = document.querySelectorAll(".billboard-parallax");
    billboardFlexibleHeightParallax.forEach(section => new BillboardFlexibleHeightParallax(section));
});