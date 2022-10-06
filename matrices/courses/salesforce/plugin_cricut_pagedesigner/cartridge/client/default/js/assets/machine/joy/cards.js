'use strict';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sideDistPercent = 31;
const centerDistPercent = 17;

const PRM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

$(document).ready(function () {

    let section = document.querySelector(".joy-cards");

    let cardContainer = section.querySelector(".cards");
    let leftCol = section.querySelector(".card-left-col");
    let centerCol = section.querySelector(".card-center-col");
    let rightCol = section.querySelector(".card-right-col");

    const orderedCards = section.querySelectorAll(".card-image");
    let cards = [
        orderedCards[3],
        orderedCards[0],
        orderedCards[6],
        orderedCards[4],
        orderedCards[1],
        orderedCards[7],
        orderedCards[5],
        orderedCards[2],
        orderedCards[8]
    ];

    let hasFired = false;

    ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 1025px)": () => {
            // Fade in of the cards
            if (!hasFired) {
                gsap.from(cards, {
                    duration: 1,
                    opacity: 0,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: cardContainer,
                        start: "top 70%",
                        once: true,
                        onEnter: () => hasFired = true
                    }
                });
            }

            // The translation of the columns
            if (!PRM) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        scrub: 0.1,
                        start: "center center",
                        end: "+=75%"
                    },
                    defaults: { ease: "none" }
                }).fromTo(centerCol, {
                    yPercent: centerDistPercent
                }, {
                    yPercent: -centerDistPercent
                }).fromTo([leftCol, rightCol], {
                    yPercent: sideDistPercent
                }, {
                    yPercent: -sideDistPercent
                }, "<");
            }
        },

        // Tablet & mobile
        "(max-width: 1024px)": () => {
            // Fade in of the cards
            if (!hasFired) {
                gsap.set(cards, { autoAlpha: 0, y: PRM ? 0 : 50 });

                ScrollTrigger.batch(cards, {
                    start: "top 70%",
                    once: true,
                    onEnter: (batch) => {
                        gsap.to(batch, {
                            autoAlpha: 1,
                            y: 0,
                            stagger: 0.1,
                            duration: 0.3
                        });
                        gsap.to(batch, {
                            y: 0,
                            stagger: 0.1
                        });
                    }
                });

                ScrollTrigger.create({
                    trigger: cardContainer,
                    start: "top 70%",
                    onEnter: () => hasFired = true,
                    once: true
                });
            }

            let resize = () => {
                if (innerWidth < 1025) {
                    gsap.set(centerCol, { yPercent: 0 });
                    gsap.set([leftCol, rightCol], { yPercent: 16.66 });
                }
            };
            ScrollTrigger.addEventListener("refresh", resize);

        }
    });
});