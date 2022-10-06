'use strict';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".joy-connect");
const visuals = section.querySelector(".connect-visuals");
const leftVisual = section.querySelector(".left-visual");
const rightVisual = section.querySelector(".right-visual");
const rings = section.querySelectorAll(".rings path, .rings circle");

const xDist = 150;

$(document).ready(function () {

    gsap.timeline({
        scrollTrigger: {
            trigger: visuals,
            start: "top 60%",
            once: true
        },
        defaults: {
            duration: 1
        }
    }).from([leftVisual, rightVisual], {
        duration: 0.5,
        autoAlpha: 0
    }).from(leftVisual, {
        x: -xDist
    }, "<").from(rightVisual, {
        x: xDist
    }, "<").from(rings, {
        opacity: 0,
        duration: 0.3,
        stagger: 0.1
    }, "+=0.1");
});