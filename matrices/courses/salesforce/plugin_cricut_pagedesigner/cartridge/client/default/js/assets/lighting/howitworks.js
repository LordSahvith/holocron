'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const svgWidth = 860;
const svgHeight = 632;
const groupOffsetPercent = 0.15;
const center = {
    x: svgWidth / 2,
    y: svgHeight / 2
};
const group1 = {
    x: svgWidth * 0.9,
    y: -svgHeight * (groupOffsetPercent * 2)
};
const group2 = {
    x: svgWidth,
    y: svgHeight * 0.5
};
const group3 = {
    x: svgWidth * 0.7,
    y: svgHeight
};
const group4 = {
    x: -svgWidth * 0.1,
    y: svgHeight
};
const group5 = {
    x: -svgWidth * (groupOffsetPercent * 2.5),
    y: svgHeight * 0.1
};
const group6 = {
    x: svgWidth * 0.1,
    y: -svgHeight * (groupOffsetPercent * 2)
};

const groups = [group1, group2, group3, group4, group5, group6];

let colors = ["#0A3728", "#00A977"];
const minScale = 0.5;

const startDistPercent = 0.3;

const starPosData = [
    {
        group: 0,
        xOffset: 0,
        yOffset: 0.05 * svgWidth
    }, {
        group: 1,
        xOffset: 0,
        yOffset: 0
    }, {
        group: 3,
        xOffset: 0,
        yOffset: 0
    }, {
        group: 4,
        xOffset: 0,
        yOffset: 0
    }, {
        group: 5,
        xOffset: 0,
        yOffset: 0
    }, {
        group: 0,
        xOffset: 0.1 * svgWidth,
        yOffset: 0.2 * svgWidth
    }, {
        group: 3,
        xOffset: 0.3 * svgWidth,
        yOffset: 0.1 * svgWidth
    }, {
        group: 5,
        xOffset: 0.15 * svgWidth,
        yOffset: 0.05 * svgWidth
    }
];

/**
 * bright hiw stars
 * @param {items} items - items
 * @return {anim} animation
 */
function addStarAnim(items) {
    const anim = gsap.timeline();

    items.forEach((item, i) => {
        // Give it a random fill, scale, and rotation
        anim.set(item, {
            fill: gsap.utils.random(colors),
            scale: gsap.utils.random(minScale, 1),
            xPercent: -50,
            yPercent: -50
        }, 0);

        // Animate it to a set position near a set group location
        const starData = starPosData[i];
        const group = groups[starData.group];
        const endX = group.x + starData.xOffset;
        const endY = group.y + starData.yOffset;
        anim.fromTo(item, {
            x: (center.x - endX) * startDistPercent + endX,
            y: (center.y - endY) * startDistPercent + endY,
            rotation: gsap.utils.random(0, 72),
            opacity: 0
        }, {
            x: endX,
            y: endY,
            rotation: gsap.utils.random(0, 72),
            opacity: 1,
            duration: "random(0.3, 0.4)",
            delay: "random(0, 0.2)"
        }, i * 0.05);
    });

    return anim;
}

/**
 * bright how it works section js
 * @param {section} section - a section
 */
function HowItWorksSequence(section) {
    let howItWorksSequence = section;
    let sectionContent = howItWorksSequence.querySelector('.how-pinned');
    let sectionText = howItWorksSequence.querySelector('.how-start-text');
    let sectionVisuals = howItWorksSequence.querySelector('.how-visuals');
    let sectionVisual = howItWorksSequence.querySelector('.how-visual');
    let sectionTexts = howItWorksSequence.querySelectorAll('.how-text');

    let starAnim;
    let sequenceAnim;

    let isPhone;

    const marginWiggleRoom = 50;
    const resize = () => {
        // Handle padding/margin at end
        howItWorksSequence.style.paddingBottom = 0;

        const overflow = (sectionVisual.offsetHeight - sectionVisual.parentElement.offsetHeight) / 2;
        howItWorksSequence.style.paddingBottom = `${ overflow }px`;

        const currentMargin = innerWidth > 640 ? 120 : 60;
        const newMargin = currentMargin - overflow + marginWiggleRoom;
        howItWorksSequence.style.marginBottom = `${ newMargin }px`;

        if(howItWorksSequence.nextElementSibling) {
            howItWorksSequence.nextElementSibling.style.marginTop = `${ newMargin }px`;
        }

        gsap.set(sectionTexts, { yPercent: innerWidth > 640 ? -50 : 0 });

        isPhone = innerWidth < 640;
    };

    const imageSequenceDur = 1;

    if(section.classList.contains("gray")) {
        colors = ["#929BA9", "#5C6167"];
    }

    // Handle resize
    resize();
    window.addEventListener("resize", resize());

    if(!PRM) {
        // Create the animations for each visual
        const sequencePictures = [...sectionVisual.querySelectorAll("picture")];
        const sequenceImages = [...sectionVisual.querySelectorAll("img")];

        const imageSequencePortion = imageSequenceDur / sequencePictures.length;

        // What controls the scroll-based animation
        starAnim = addStarAnim([...section.querySelectorAll(".how-svg-bg > *")], 0, true);

        var scrollAnim = gsap.timeline({
            scrollTrigger: {
                trigger: $(sectionContent),
                start: "center center",
                end: "500%",
                pin: true,
                scrub: 0.1,
                invalidateOnRefresh: true
            }
        });

        /////////////////////////
        // The title animation //
        /////////////////////////

        // Animate the startText
        gsap.to(sectionText, {
            y: -30,
            autoAlpha: 0,
            scrollTrigger: {
                trigger: section,
                start: "top 5%",
                end: "top -10%",
                scrub: 0.3
            }
        });

        /////////////////////////////////////////////
        // The other parts of the scroll animation //
        /////////////////////////////////////////////

        scrollAnim.from(sectionVisuals, {
            x: () => {
                if(isPhone) {
                    return 0;
                } else {
                    gsap.set(sectionVisuals, { x: 0 }); // Fix resize issue

                    const bcr = sectionVisuals.getBoundingClientRect();
                    return innerWidth / 2 - (bcr.left + bcr.width / 2);
                }
            },
            duration: 0.15,
            ease: "power1.inOut"
        });

        starAnim.duration(0.3);
        scrollAnim.add(starAnim, "<");

        scrollAnim.fromTo(sectionTexts[0], {
            autoAlpha: 0,
            y: 50
        }, {
            autoAlpha: 1,
            y: 0
        }, 0.1);

        sectionTexts.forEach((text, i) => {
            if(i) {
                scrollAnim
                    // Animate out old text
                    .to(sectionTexts[i - 1], {
                        autoAlpha: 0,
                        duration: 0.2,
                        immediateRender: false
                    })

                    // Animate in new text
                    .fromTo(text, {
                        autoAlpha: 0,
                        y: 50
                    }, {
                        autoAlpha: 1,
                        y: 0
                    }, "-=0.05");
            }
        });

        // Add some blank space
        scrollAnim.to({}, { duration: 0.2 });

        ////////////////////////////
        // The sequence animation //
        ////////////////////////////
        sequenceAnim = gsap.timeline();

        // Load the images if necessary
        sequencePictures.forEach(picture => {
            if(!picture.querySelector("img")) {
                const image = document.createElement("img");
                picture.appendChild(image);
                sequenceImages.push(image);
                image.style.opacity = 0;
            }
        });

        sequenceAnim.set(sequenceImages[0], { opacity: 1 });
        sequenceAnim.set(sequenceImages, { opacity: 0 });
        sequenceAnim.set(sequenceImages[0], { opacity: 1 });

        // Switch out the images
        sequenceImages.forEach((image, j) => {
            const pos = `pre-star+=${ imageSequencePortion * j }`;

            if(j) {
                sequenceAnim.set(sequenceImages[j - 1], { opacity: 0 }, pos);
            }

            sequenceAnim.set(image, { opacity: 1 }, pos);
        });

        // Add the sequence animation to the scroll animation
        sequenceAnim.duration(scrollAnim.duration());
        scrollAnim.add(sequenceAnim, 0);
    }

    else { // Reduced motion version

    }
}


$(document).ready(function () {
    let howItWorkSequenceSections = document.querySelectorAll('.how-it-works-scroll-sequence');

    howItWorkSequenceSections.forEach((section) => {
        HowItWorksSequence(section);
    });
});