'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(ScrollTrigger);
var contentModal = require('base/components/contentModal');

/**
 * Get random item from array that's different from the last
 * @param {hero} hero - a hero object
 * @returns {Hero} hero object
 */
function Hero(hero) {
    const phoneBreakpoint = 641;

    // Set scroll position to top before refreshing
    window.addEventListener("unload", () => {
        document.documentElement.scrollTop = 0;
    });

    this.createHeroWide = () => {
        const titleRect = this.title.getBoundingClientRect();
        const productRect = this.product.getBoundingClientRect();
        const y = (productRect.top + productRect.height / 2) - (titleRect.top + titleRect.height / 2);

        this.scrollAnim = gsap.timeline({
            scrollTrigger: {
                start: 0,
                end: y,
                scrub: 0.2,
                pin: this.title,
                pinSpacing: false
            }
        });

        const loadAnim = gsap.timeline({
            paused: true,
            onComplete: () => {
                //this.enableScroll();
                this.scrollAnim.to(this.title, {
                    duration: 0.25,
                    opacity: 0,
                    y: 0
                }, 0);
            }
        })
            .to(this.title, {
                y: 0,
                opacity: 1,
                ease: "heroEase",
                duration: 0.95
            }, 0)
            .to(this.product, {
                opacity: 1,
                ease: "heroEase",
                duration: 0.15,
            }, 0)
            .to(this.product, {
                y: 0,
                scale: 1,
                ease: "heroEase",
                duration: 0.95
            }, 0.05)
            .fromTo(this.copyCTA, {
                yPercent: 20,
                opacity: 0,
            }, {
                yPercent: 0,
                opacity: 1,
                ease: "heroEase",
                duration: 0.95
            }, 0.15);

        if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            loadAnim.play();
        } else {
            document.addEventListener("DOMContentLoaded", () => loadAnim.play());
        }
    };

    this.createHeroSplit = () => {
        const loadAnim = gsap.timeline({
            paused: true,
            onComplete: this.enableScroll
        })
            .to(this.title, {
                xPercent: 0,
                x: 0,
                opacity: 1,
                duration: 0.95,
                ease: "heroEase"
            }, 0)
            .to(this.product, {
                opacity: 1,
                ease: "heroEase",
                duration: 0.15,
            }, 0)
            .to(this.product, {
                xPercent: 0,
                x: 0,
                duration: 0.95,
                ease: "heroEase"
            }, 0)
            .fromTo(this.copyCTA, {
                yPercent: 20,
                opacity: 0,
            }, {
                yPercent: 0,
                opacity: 1,
                ease: "heroEase",
                duration: 0.95
            }, 0.1);

        if (innerWidth < phoneBreakpoint) {
            this.product.style.opacity = 1;
            this.product.style.transform = 'none';

            this.title.style.opacity = 1;
            this.title.style.transform = 'none';
            if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
                loadAnim.play();
            } else {
                document.addEventListener("DOMContentLoaded", () => loadAnim.play());
            }
            return;  // Disable split anim and scroll anim on mobile
        }

        const gap = 24;
        gsap.set(this.product, {
            xPercent: -50,
            x: -gap,
        });
        gsap.set(this.title, {
            xPercent: 50,
            x: gap,
            opacity: 0
        });

        if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            loadAnim.play();
        } else {
            document.addEventListener("DOMContentLoaded", () => loadAnim.play());
        }
    };

    this.createHeroStandard = () => {
        const loadAnim = gsap.timeline({
            paused: true,
            onComplete: this.enableScroll
        })
            .to(this.product, {
                opacity: 1,
                ease: "heroEase",
                duration: 0.15,
            }, 0)
            .to(this.product, {
                scale: 1,
                y: 0,
                ease: "heroEase",
                duration: 0.95
            }, 0)
            .to(this.title, {
                y: 0,
                opacity: 1,
                ease: "heroEase",
                duration: 0.95
            }, 0.05)
            .fromTo(this.copyCTA, {
                yPercent: 20,
                opacity: 0,
            }, {
                yPercent: 0,
                opacity: 1,
                ease: "heroEase",
                duration: 0.95
            }, 0.1);

        if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            loadAnim.play();
        } else {
            document.addEventListener("DOMContentLoaded", () => loadAnim.play());
        }
    };

    this.cleanupScrollAnim = () => {
        if (this.scrollAnim) {
            this.scrollAnim.scrollTrigger.kill();
            this.scrollAnim.kill();
        }
        this.myMatchMedia.removeEventListener("change", this.cleanupScrollAnim);
    };

    this.hero = hero;
    this.title = hero.querySelector(".product-title");
    this.product = hero.querySelector(".product-image");
    this.productImage = this.product.querySelector("img");
    this.copyCTA = hero.querySelector(".copy-cta-container");

    CustomEase.create("heroEase", "0.48, 0.04, 0.52, 0.96");

    if (hero.classList.contains("product-hero-wide")) {
        this.createHeroWide(hero);
    } else if (hero.classList.contains("product-hero-split")) {
        this.createHeroSplit(hero);
    } else if (hero.classList.contains("product-hero-standard")) {
        this.createHeroStandard(hero);
    }

    this.myMatchMedia = window.matchMedia(`(min-width: ${phoneBreakpoint}px)`);
    this.myMatchMedia.addEventListener("change", this.cleanupScrollAnim);

    return Hero;
}

$(document).ready(function () {
    const heroes = document.querySelectorAll(".hero-product");
    heroes.forEach(hero => new Hero(hero));

    contentModal.modalOpenEvent();
});