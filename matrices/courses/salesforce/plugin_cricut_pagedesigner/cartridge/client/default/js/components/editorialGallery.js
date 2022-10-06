'use strict';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let colors = ["#0A3728", "#B9DCC8", "#EB786E", "#FAC3BE", "#0F4BC3", "#A5CDEB"];
let startVal = "top 130%";

/**
 * Get random item from array that's different from the last
 * @param {*} array - an array of hex color codes
 * @returns {string} - a hex color code starting with # at the beginning of the string
 */
function getRandomFrom(array) {
    const selected = array.selected;
    while (selected === array.selected) {
        array.selected = Math.floor(Math.random() * array.length);
    }
    return array[array.selected];
}

/**
 * Setups the Editorial Gallery Groups in an Editorial Gallery Container, to hide all but the first Group, and to setup the Event Listner on the Load More button
 * @param {*} container - The Editorial Gallery Multi-Group Containers on the page
 */
function EditorialGalleryContainer(container) {

    let galleryGroups;

    let hiddenGroups;
    let hiddenIndex = 0;

    let loadMoreSection;
    let loadMoreBtn;

    // Adjust display features of editorial gallery groups
    galleryGroups = container.querySelectorAll(".editorial-gallery-group");

    //TODO: Add conditional statement around this each to check if Page Designer is being used to construct the Editorial Gallery Groups, if so do not add .d-none so that these sections will still be visible.
    galleryGroups.forEach(group => {
        group.classList.add("d-none"); //Hide all the Editorial Groups
    });
    galleryGroups[0].classList.remove("d-none"); //Show the first Gallery Group

    // Load more functionality
    loadMoreSection = container.querySelector(".load-more-section");
    loadMoreBtn = container.querySelector(".load-more-button");

    hiddenGroups = container.querySelectorAll(".editorial-gallery-group.d-none");

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", handleLoadMore);

        const svg = loadMoreBtn.querySelector("svg");
        const dist = 50;

        loadMoreBtn.anim = gsap.timeline({
            paused: true,
            defaults: { duration: 0.2 }
        })
            .to(svg, {
                y: dist,
                ease: "power1.in"
            })
            .fromTo(svg, {
                y: -dist
            }, {
                y: 0,
                immediateRender: false
            });

        loadMoreBtn.addEventListener("pointerenter", () => {
            if (loadMoreBtn.anim.isActive()) return;

            loadMoreBtn.anim.restart();
        });
    }

    /**
     * Causes the next Editorial Gallery Group in an Editorial Gallery Container to be shown. If the the last Editorial Gallery Group in the container is being shown, remove the Load More button.
     */
    function handleLoadMore() {
        const groupToShow = hiddenGroups[hiddenIndex];
        if (groupToShow) {
            groupToShow.classList.remove("d-none");
            galleryGroupLoader(groupToShow);

            hiddenIndex++;

            if (hiddenIndex === hiddenGroups.length) {
                loadMoreSection.style.display = "none";
            }
            ScrollTrigger.refresh();
        }

        setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }
}

/**
 * Kicks off the animated loading of the Editorial Gallery Group Item(s)
 * @param {*} group - The Editorial Gallery Group
 */
function galleryGroupLoader(group) {
    let title = group.querySelectorAll(".editorial-gallery-group-title");
    let galleryItems = group.querySelectorAll(".editorial-gallery-item");

    if (title) {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
                trigger: title,
                start: "top 75%",
                once: true
            }
        });
    }

    setupItemLoadAnims(galleryItems);
}

/**
 * Setup the Editorial Gallery Items to be loaded in using the GSAP animations
 * @param {*} items - all the Editorial Gallery Items within a particular Editorial Gallery Group
 */
let setupItemLoadAnims = (items) => {
    const itemCovers = [];
    items.forEach(item => {
        itemCovers.push(item.querySelector(".editorial-cover"));
    });

    gsap.set(items, { y: "60vh" });
    gsap.set(itemCovers, {
        display: "block",
        backgroundColor: () => getRandomFrom(colors)
    });

    gsap.from(items, { opacity: 0, duration: 0.3 });

    ScrollTrigger.batch(items, {
        start: startVal,
        onEnter: (elements, triggers) => {
            gsap.to(elements, {
                stagger: {
                    each: -0.15,
                    onStart: function () {
                        const target = this.targets()[0];
                        gsap.timeline()
                            .to(target, { y: 0 })
                            .to(target.querySelector(".editorial-cover"), { scaleY: 0 });
                        // .from(target.querySelector("img"), { scale: 1.2 })
                    }
                }
            });

            triggers.forEach(trigger => trigger.kill());
        }
    });
};

$(document).ready(function () {
    const containedGalleryGroups = document.querySelectorAll(".editorial-gallery-container");
    containedGalleryGroups.forEach(container => new EditorialGalleryContainer(container));
    const standAloneGalleryGroups = document.querySelectorAll(".editorial-gallery-group:not(.d-none)");
    standAloneGalleryGroups.forEach(group => new galleryGroupLoader(group));
});