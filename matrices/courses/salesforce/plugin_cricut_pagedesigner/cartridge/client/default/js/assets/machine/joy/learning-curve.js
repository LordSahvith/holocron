'use strict';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phoneBreakpoint = 640;

let section;
let xDist;
let hasFired = false;
let introAnim;

/**
 * Get random item from array that's different from the last
 * @param {el} topRight - the top right element containing an image
 * @param {el} left - the left element containing an image
 * @param {el} botRight - the bottom right element containing an image
 */
function setDesktopPos(topRight, left, botRight) {
    gsap.set(topRight, { x: xDist, y: -375, xPercent: 0, yPercent: 0 });
    gsap.set(left, { x: -420, y: -70, xPercent: 0, yPercent: 0 });
    gsap.set(botRight, { x: xDist, y: 185, xPercent: 0, yPercent: 0 });
}

/**
 * Get random item from array that's different from the last
 * @param {el} topRight - the top right element containing an image
 * @param {el} left - the left element containing an image
 * @param {el} botRight - the bottom right element containing an image
 */
function setMobilePos(topRight, left, botRight) {
    gsap.set(topRight, { x: 0, y: 0, xPercent: 105, yPercent: -135 });
    gsap.set(left, { x: 0, y: 0, xPercent: -205, yPercent: -50 });
    gsap.set(botRight, { x: 0, y: 0, xPercent: 105, yPercent: 80 });
}

/**
 * Verify if viewport is mobile or tablet and larger then run the animations as needed for background project images.
 */
function resize() {
    let visuals = section.querySelector(".learning-visuals");
    let secondaryImages = section.querySelectorAll(".learning-secondary");
    let topRight = section.querySelector(".top-right");
    let left = section.querySelector(".left");
    let botRight = section.querySelector(".bottom-right");

    xDist = Math.min(0.29 * innerWidth, 275);

    // Animation has ran, so just set the values
    if (hasFired) {
        if (innerWidth > phoneBreakpoint) {
            setDesktopPos(topRight, left, botRight);
        } else {
            setMobilePos(topRight, left, botRight);
        }

        return;
    }

    // Animation hasn't ran, so set the animation up if necessary
    if (innerWidth > phoneBreakpoint && !hasFired) {
        if (introAnim) {
            introAnim.scrollTrigger.kill();
            introAnim.kill();
        }

        // let wasDesktop = true;

        setDesktopPos(topRight, left, botRight);

        introAnim = gsap.timeline({
            scrollTrigger: {
                trigger: visuals,
                start: "center 70%",
                once: true,
                onEnter: () => {
                    hasFired = true;
                }
            }
        }).from(secondaryImages, {
            x: 0,
            y: 0,
            stagger: 0.1
        });
    } else if (!hasFired) {
        if (introAnim) {
            introAnim.scrollTrigger.kill();
            introAnim.kill();
        }

        // let wasPhone = true;

        setMobilePos(topRight, left, botRight);

        introAnim = gsap.timeline({
            scrollTrigger: {
                trigger: visuals,
                start: "center 80%",
                once: true,
                onEnter: () => {
                    hasFired = true;
                }
            }
        }).from(secondaryImages, {
            x: 0,
            y: 0,
            stagger: 0.1
        });
    }
}

/**
 * Run the resize function with each refresh of page.
 */
function JoyLearningCurve() {

    resize();
    ScrollTrigger.addEventListener("refresh", resize);

}

$(document).ready(function () {

    section = document.querySelector(".joy-learning-curve");
    JoyLearningCurve();

});