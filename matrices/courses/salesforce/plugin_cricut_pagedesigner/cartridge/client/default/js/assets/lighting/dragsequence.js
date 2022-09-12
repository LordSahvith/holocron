'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

let hasRan = false;
let count = 1;

/**
 * bright dark section js
 * @param {section} section - a section
 */
function Bright360DragSequence(section) {
    this.section = section;
    this.sequencePictures = [...section.querySelectorAll("picture")];
    const midIndex = Math.floor(this.sequencePictures.length / 2);

    this.range = section.querySelector(".sequence-range");

    this.leftLabel = section.querySelector(".left-label");
    this.rightLabel = section.querySelector(".right-label");

    /**
     * increment js
     */
    function increment() {
        this.range.value = Math.round(this.range.value) + 1;
        this.range.dispatchEvent(new Event('input'));
    }
    /**
     * decrement js
     */
    function decrement() {
        this.range.value = Math.round(this.range.value) - 1;
        this.range.dispatchEvent(new Event('input'));
    }

    if(!hasRan) {
        hasRan = true;

        ScrollTrigger.create({
            trigger: ".bright-dark-section",
            start: "top top",
            end: "top top-=1",
            onEnter: () => gsap.set("body .page", { backgroundColor: "#000" }),
            onLeaveBack: () => gsap.set("body .page", { backgroundColor: "" }),
        });

        const lastSequence = document.querySelectorAll(".bright360-drag-sequence")[1];
        gsap.timeline({
            scrollTrigger: {
                trigger: lastSequence,
                start: "bottom 80%",
                end: "bottom 40%",
                scrub: true
            }
        })
            .fromTo("body .page", {
                backgroundColor: "#000"
            }, {
                backgroundColor: "#f0f0f0",
                immediateRender: false
            });

        gsap.delayedCall(0.1, () => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
        });
    }

    // Load the backgrounds when section is nearby
    ScrollTrigger.create({
        trigger: section,
        start: "top 200%",
        once: true,
        onEnter: () => {
            this.sequencePictures.forEach((picture) => {
                if($(picture).children('img').length === 0) { // Skip any with img already
                    const img = document.createElement("img");
                    picture.appendChild(img);
                    gsap.set(picture, { opacity: 0.001, display: "none" });
                }
            });
        }
    });

    // Probably navigated to using the keyboard, so change the step to 1 for ease of use
    this.range.addEventListener("keyup", () => {
        this.range.step = 1;
    });

    this.leftLabel.addEventListener("click", decrement.bind(this));
    this.rightLabel.addEventListener("click", increment.bind(this));

    // Handle slider functionality
    let anim;
    let lastVal = midIndex;
    const showImage = () => {
        const val = Math.round(this.range.value);
        if(val !== lastVal) {
            if(anim) anim.kill();

            anim = gsap.fromTo(this.sequencePictures[val], {
                zIndex: count++, // Make sure it's on top
                opacity: 0,
                display: "none" // Helps rendering in Chrome
            },{
                opacity: 1,
                overwrite: true,
                display: "inline",
                duration: 0.3
            });

            lastVal = val;
        }
    };
    this.range.addEventListener("input", showImage);
}

$(document).ready(function () {
    const bright360DragSequence = document.querySelectorAll(".bright360-drag-sequence");
    bright360DragSequence.forEach(section => new Bright360DragSequence(section));
});