'use strict';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


/**
 * Setups the App section's annimations
 * @param {*} section - The App component on the page as defined by a section with a class of app.
 */
function App(section) {
    gsap.set(".alt-screen", { transform: "none" });
    gsap.set(".alt-screen", { yPercent: -50 });

    let device = section.querySelector(".app-device");
    let left1 = section.querySelector(".left1");
    let left2 = section.querySelector(".left2");
    let right1 = section.querySelector(".right1");
    let right2 = section.querySelector(".right2");

    gsap.timeline({
        scrollTrigger: {
            trigger: device,
            start: "35% bottom",
            once: true
        }
    })
        .from(device, {
            transformOrigin: "top center",
            scale: 1.5,
            duration: 0.6,
            autoAlpha: 0
        })
        .from([left2, right1], {
            scale: 1.3,
            autoAlpha: 0
        }, "-=0.3")
        .from([left1, right2], {
            scale: 1.3,
            autoAlpha: 0
        }, "-=0.3");
}

$(document).ready(function () {
    const appSections = document.querySelectorAll(".app");
    appSections.forEach(section => new App(section));
});