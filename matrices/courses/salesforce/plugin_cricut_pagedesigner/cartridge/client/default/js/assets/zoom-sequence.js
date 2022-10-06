'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/**
 * Get random item from array that's different from the last
 * @param {machineZoomSection} section - a machineZoomSection
 */
function MachineZoom(section) {
    const mobileBreakpoint = 641;

    this.setupSection = () => {
        // Load the images
        const numArmImages = this.type === "voldemort" ? 8 : 15;
        for (let i = 2; i <= numArmImages; i++) {
            const img = document.createElement("img");
            img.src = `${this.imagePath}arm${i}.jpg`;
            img.style.display = "none";
            img.className = "machine-arm";
            this.machineArms.push(img);
            this.machineContainer.appendChild(img);
        }

        // The arm animation
        const armSpeed = 0.1;
        const armAnim = gsap.timeline({
            repeat: -1,
            yoyo: true
        });
        for (let i = 0; i < this.machineArms.length - 2; i++) {
            const j = i + 1;
            armAnim
                .set(this.machineArms[i], { display: "none" }, armSpeed * i)
                .set(this.machineArms[j], { display: "inline" }, armSpeed * i);
        }

        // The dash animation
        const dashAnim = gsap.to(".speed-comparison path", {
            strokeDashoffset: 7,
            repeat: -1,
            ease: "none"
        });

        // The animation that is strictly tied to the scrolling
        const scrollDist = 2000;
        const scrollAnim = gsap.timeline({
            scrollTrigger: {
                trigger: this.section,
                start: "top top",
                end: `+=${scrollDist}px`,
                scrub: 0.1,
                pin: true
            },
            defaults: {
                duration: 1, // Make calculating relative times easier
                ease: "none"
            },
            invalidateOnRefresh: true
        })
            .to(this.machineContainer, {
                scale: 0.5,
                y: () => innerWidth < mobileBreakpoint ? 0 : -200
            })
            .fromTo(this.firstContent, {
                yPercent: 0,
                opacity: 1,
            }, {
                yPercent: -20,
                opacity: 0,
                duration: 0.25,
                ease: "heroEase"
            }, 0)
            .fromTo(this.secondContent, {
                yPercent: 0,
                opacity: 0,
            }, {
                yPercent: -300,
                opacity: 1,
                duration: 0.25,
                ease: "heroEase"
            }, 0.25)
            .fromTo(this.finalText, {
                xPercent: -50,
                y: 400
            }, {
                xPercent: -50,
                y: 0,
                ease: "heroEase"
            }, 0);

        // Restrict the arm and dash animations to only when in view (or almost at least)
        ScrollTrigger.create({
            trigger: this.section,
            start: "top bottom",
            onEnter: () => {
                armAnim.play();
                dashAnim.play();
            },
            onLeaveBack: () => {
                armAnim.pause();
                dashAnim.play();
            }
        });

        let isAfterScrollST = false;
        ScrollTrigger.sort();
        ScrollTrigger.getAll().forEach(ST => {
            if (isAfterScrollST) {
                ST.refresh();
                return;
            }

            if (ST === scrollAnim.scrollTrigger) {
                isAfterScrollST = true;
            }
        });

        this.resize();
        window.addEventListener("resize", this.resize);
    };

    this.resize = () => {
        if (innerWidth < mobileBreakpoint) {
            const imageHeight = this.machineContainer.offsetHeight * gsap.getProperty(this.machineContainer, "scale");
            gsap.set(this.finalText, { bottom: imageHeight * 0.25 });
        } else {
            gsap.set(this.finalText, { clearProps: "bottom" });
        }
    };

    this.section = section;
    this.type = section.classList.contains("voldemort") ? "voldemort" : "scamander";
    this.imagePath = `https://d2e2oszluhwxlw.cloudfront.net/img/home/2021/${this.type}/img/machine-arms/`;

    this.topText = section.querySelector(".top-text");
    this.firstContent = section.querySelector(".first-content");
    this.secondContent = section.querySelector(".second-content");
    this.finalText = section.querySelector(".final-text");

    this.machineContainer = section.querySelector(".machine-container");
    this.machineArms = [...section.querySelectorAll(".machine-arm")];

    // Lazy load the additonal images
    ScrollTrigger.create({
        trigger: section,
        start: "top 150%",
        once: true,
        onEnter: this.setupSection
    });
}

$(document).ready(function () {
    const machineZoomSections = document.querySelectorAll(".cutting-machine-zoom-sequence");
    machineZoomSections.forEach(machineZoomSection => new MachineZoom(machineZoomSection));
});
