'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * easypress peace js
 * @param {section} section - a section
 */
function EasypressPeace(section) {
    this.section = section;
    this.peaceVisual = section.querySelector(".peace-visual");

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
        "(max-width: 640px)": () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: this.peaceVisual,
                    start: "top 50%",
                    once: true
                }
            })
                .from(this.peaceVisual, {
                    duration: 0.5,
                    autoAlpha: 0
                })
                .from(this.peaceVisual, {
                    y: PRM ? 0 : 150,
                    duration: 1
                }, "<");
        },
        "(min-width: 641px)": () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: this.peaceVisual,
                    start: "top 50%",
                    once: true
                }
            })
                .from(this.peaceVisual, {
                    duration: 0.5,
                    autoAlpha: 0
                })
                .from(this.peaceVisual, {
                    x: PRM ? 0 : -150,
                    duration: 1
                }, "<");
        },
    });

    gsap.delayedCall(0.1, () => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
    });
}

$(document).ready(function () {
    const easypressPeaces = document.querySelectorAll(".easypress-peace");
    easypressPeaces.forEach(section => new EasypressPeace(section));
});