'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let minXPercent = 10;
let maxXPercent = 100 - minXPercent;
let clampPercent = gsap.utils.clamp(minXPercent, maxXPercent);

/**
 * bright drag compare section js
 * @param {section} section - a section
 */
function Bright360DragCompare(section) {
    this.section = section;
    this.comparison = section.querySelector(".comparison-container");
    this.wrapper = section.querySelector(".comparison-wrapper");
    this.dragProxy = document.createElement("div");

    this.input = section.querySelector(".comparison-range");

    if(!PRM) {
        gsap.from(section, {
            "--x": `${maxXPercent}%`,
            duration: 2,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: section,
                start: "top 60%",
                once: true
            }
        });
    }

    let width = this.comparison.offsetWidth;
    const resize = () => {
        width = this.comparison.offsetWidth;

        // Keep the text visible
        if(innerWidth > 1024) {
            const maxDist = Math.max(
                width - document.querySelector(".right-section h6").offsetLeft,
                document.querySelector(".left-section h6").offsetLeft + document.querySelector(".left-section h6").offsetWidth,
            ) + 15;

            minXPercent = maxDist / width * 100;
            maxXPercent = 100 - minXPercent;
            clampPercent = gsap.utils.clamp(minXPercent, maxXPercent);
        } else {
            minXPercent = 10;
            maxXPercent = 100 - minXPercent;
            clampPercent = gsap.utils.clamp(minXPercent, maxXPercent);
        }
    };

    window.addEventListener("resize", resize);

    const updateX = x => {
        const percent = clampPercent(x / width * 100);
        gsap.to(section, {
            "--x": `${ percent }%`,
            duration: 0.1,
            overwrite: true
        });

        this.input.value = Math.ceil(percent / 10) * 10;
    };

    const comparison = this.comparison;

    // this is actually used but js lint doesn't like how it's defined so
    // we need to use a disable here... sadly.
    /* eslint-disable no-unused-vars */
    let draggable = Draggable.create(this.dragProxy, {
        type: "x",
        trigger: comparison,
        onDrag: function(e) {
            if(e.target !== comparison) return;

            const val = e.layerX || (e.touches ? e.touches[0].clientX : false);
            if(val !== false) {
                updateX(val);
            }
        }
    })[0];
    /* eslint-enable no-unused-vars */

    resize();

    // Handle keyboard input
    this.input.addEventListener("input", () => {
        updateX(this.input.value / 100 * width);
    });
}

$(document).ready(function () {
    const dragCompare = document.querySelectorAll(".bright360-drag-compare");
    dragCompare.forEach(section => new Bright360DragCompare(section));
});