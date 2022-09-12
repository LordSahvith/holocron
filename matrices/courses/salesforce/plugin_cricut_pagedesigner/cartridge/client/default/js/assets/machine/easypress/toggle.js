'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * easypress toggle js
 * @param {container} container - a container
 */
function Toggle (container) {
    let $toggleInput = $(container).find('.toggle-input');
    let $switchText = $(container).find('.switch-text');

    $toggleInput.on('change', () => {
        if($toggleInput.is(':checked')) {
            $switchText.text($switchText.data('checked'));
        } else {
            $switchText.text($switchText.data('unchecked'));
        }
    });
}

/**
 * easypress toggle js
 * @param {section} section - a section
 */
function EasypressToggle(section) {
    // TODO: Fix small visual jump when double clicking
    this.section = section;

    this.toggleInput = $(section).find(".toggle-input");
    this.toggleContainer = section.querySelector(".toggle-with-arrow");

    this.textContainer = section.querySelector(".toggle-text");
    this.firstText = section.querySelector(".first-text");
    this.firstTextTargets = this.firstText.querySelectorAll("*");
    this.secondText = section.querySelector(".second-text");
    this.secondTextTargets = this.secondText.querySelectorAll("*");

    this.firstVisual = section.querySelector(".first-visual");
    this.secondVisual = section.querySelector(".second-visual");

    gsap.set([this.firstVisual, this.secondVisual], {
        xPercent: -50,
        yPercent: -50
    });

    const toggleAnimation = (outVars, inVars, heightDiff) => {
        // Animate the toggle container position to where it will need to be
        gsap.to(this.toggleContainer, {
            y: heightDiff,
            duration: 0.2,
            overwrite: true
        });

        // The actual toggling animation
        gsap.to([outVars.text, outVars.visual], {
            autoAlpha: 0,
            duration: 0.2,
            overwrite: true,
            onComplete: () => {
                // Set out properties
                gsap.set([outVars.text, outVars.visual], { display: "none" });
                gsap.set(outVars.visual, { scale: PRM ? 1 : 1.2 });

                // Clear y transform on toggle container
                gsap.set(this.toggleContainer, { y: 0 });

                // Animate in
                gsap.set([inVars.text, inVars.visual], { display: "block" });
                if(PRM) gsap.set(inVars.visual, { scale: 1 });

                gsap.to(inVars.text, {
                    autoAlpha: 1,
                    stagger: 0.05
                });
                gsap.to(inVars.visual, {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.25
                });
            }
        });
    };

    this.toggleInput.on('change', () => {
        if(!this.toggleInput.is(':checked')) {
            toggleAnimation({
                text: this.firstTextTargets,
                visual: this.firstVisual
            }, {
                text: this.secondTextTargets,
                visual: this.secondVisual
            },  this.heightDiff);
        } else {
            toggleAnimation({
                text: this.secondTextTargets,
                visual: this.secondVisual
            }, {
                text: this.firstTextTargets,
                visual: this.firstVisual
            }, this.heightDiff);
        }
    });

    this.resize = () => {
        const firstDisplay = gsap.getProperty(this.firstTextTargets[0], "display");
        const secondDisplay = gsap.getProperty(this.secondTextTargets[0], "display");

        gsap.set([this.firstTextTargets, this.secondTextTargets], { display: "block" });
        this.heightDiff = this.firstText.offsetHeight - this.secondText.offsetHeight;

        gsap.set(this.textContainer, {
            height: Math.max(this.firstText.offsetHeight, this.secondText.offsetHeight) + this.toggleContainer.offsetHeight + gsap.getProperty(this.toggleContainer, "marginTop")
        });

        gsap.set(this.firstTextTargets, { display: firstDisplay });
        gsap.set(this.secondTextTargets, { display: secondDisplay });
    };

    this.resize();
    window.addEventListener("resize", this.resize);
}

$(document).ready(function () {
    const easypressToggles = document.querySelectorAll(".easypress-toggle");
    easypressToggles.forEach(section => new EasypressToggle(section));

    const toggles = document.querySelectorAll(".cricut-toggle");
    toggles.forEach(container => new Toggle(container));
});