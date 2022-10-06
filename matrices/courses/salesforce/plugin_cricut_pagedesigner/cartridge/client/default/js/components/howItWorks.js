'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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

const colors = ['#0A3728', '#00A977'];
const minScale = 0.5;

const maxItemOffsetPercent = 0.2;
const startDistPercent = 0.3;

/**
 * Get random item different than last item, as long as it's not of the index given
 * @param {Array} array array to loop through
 * @param {Integer} i index of current item
 * @param {*} selected the item selected
 * @returns {Array} array
 */
function getRandomFrom(array, i, selected) {
    selected = selected || array.selected;
    const newSelect = Math.floor(Math.random() * array.length);

    if(selected === newSelect || newSelect === i) {
        return getRandomFrom(array, i, selected);
    } else {
        array.selected = newSelect;
        return array[newSelect];
    }
}

/**
 * Create How It Works section
 * @param {HTML} section section to create animations
 */
function HowItWorksSection(section) {
    let howItWorksSection = section;
    let content = howItWorksSection.querySelector('.how-pinned');
    let title = howItWorksSection.querySelector('.how-title');
    let visuals = howItWorksSection.querySelectorAll('.how-visual');
    let texts = howItWorksSection.querySelectorAll('.how-text');

    // Create the animations for each visual
    visuals.forEach((visual, i) => {
        const svgItems = [...visual.querySelectorAll('svg > *')];

        visual.intro = gsap
            .timeline({ paused: true })
            .set(visual, { zIndex: 1 })
            .set(svgItems, { opacity: 0 })
            .from(visual, {
                scale: 1.2,
                autoAlpha: 0
            })
            .add('pre-star', i ? '-=0.3' : '-=0')
            .add(() => { // The star and circle animations
                svgItems
                    .slice(0, gsap.utils.random([4, 5, 6])) // Choose 4, 5, or 6 of the items
                    .forEach((item) => {
                        // Give it a random fill, scale, and rotation
                        gsap.set(item, {
                            fill: gsap.utils.random(colors),
                            scale: gsap.utils.random(minScale, 1),
                            xPercent: -50,
                            yPercent: -50
                        });

                        // Animate it to a random position near a random group location
                        const group = i ? getRandomFrom(groups) : getRandomFrom(groups, i);
                        const endX = group.x + gsap.utils.random(0, maxItemOffsetPercent) * svgWidth;
                        const endY = group.y + gsap.utils.random(0, maxItemOffsetPercent) * svgHeight;
                        gsap.fromTo(
                            item,
                            {
                                x: (center.x - endX) * startDistPercent + endX,
                                y: (center.y - endY) * startDistPercent + endY,
                                rotation: gsap.utils.random(0, 72),
                                opacity: 0
                            },
                            {
                                x: endX,
                                y: endY,
                                rotation: gsap.utils.random(0, 72),
                                opacity: 1,
                                duration: 'random(0.3, 0.4)',
                                delay: 'random(0, 0.2)'
                            }
                        );
                    });
            }, '+=0.01');

        if (i === 0) {
            visual.intro.pause('pre-star');
        }

        visual.outro = gsap
            .timeline({ paused: true })
            .set(visual, { zIndex: 0 })
            .fromTo(
                visual,
                {
                    autoAlpha: 1,
                    scale: 1
                },
                {
                    autoAlpha: 0,
                    duration: 0.2,
                    scale: 1,
                    immediateRender: false
                }
            );
    });

    // Animate the title
    gsap.to(title, {
        y: -30,
        autoAlpha: 0,
        scrollTrigger: {
            trigger: section,
            start: 'top 5%',
            end: 'top -10%',
            scrub: 0.1,
            onToggle: scrollTrigger => {
                // refresh because height start changes
                scrollTrigger.refresh();
            }
        }
    });

    // What controls the scroll-based animation
    let scrollAnim = gsap
        .timeline({
            scrollTrigger: {
                trigger: content,
                start: 'center center',
                end: `${100 * texts.length}%`,
                pin: true,
                scrub: 0.1,
                onToggle: scrollTrigger => {
                    // refresh because height start changes
                    scrollTrigger.refresh();
                }
            },
        })
        .add('start');

    texts.forEach((text, i) => {
        if (i) {
            scrollAnim
                .to(texts[i - 1], { // Animate out old text
                    autoAlpha: 0,
                    duration: 0.3,
                    immediateRender: false
                })
                .from( // Animate in new text
                    text,
                    {
                        autoAlpha: 0,
                        y: 50
                    },
                    '-=0.05'
                );
        }

        // Fire relevant visual animations
        scrollAnim.add(
            () => {
                const dir = scrollAnim.scrollTrigger.direction;

                // Going down
                if (dir === 1) {
                    if (i) {
                        visuals[i - 1].intro.pause();
                        visuals[i - 1].outro.play(0);
                    }

                    visuals[i].outro.pause();
                    visuals[i].intro.play(0);
                } else { // Going up
                    if (i) {
                        visuals[i - 1].outro.pause();
                        visuals[i - 1].intro.play(0);
                        visuals[i].intro.pause();
                        visuals[i].outro.play(0);
                    }
                }
            },
            i ? '<' : '+=0'
        );

        if (i === 0) {
            scrollAnim.to({}, { duration: 0.25 });
        }

        scrollAnim.add(`text${i}`);

        // Add some space to the end
        if (i) {
            scrollAnim.to({}, {});
        }
    });

    scrollAnim.add('end');
}

$(document).ready(function () {
    let howItWorkSections = document.querySelectorAll('.how-it-works');

    howItWorkSections.forEach((section) => {
        HowItWorksSection(section);
    });
});
