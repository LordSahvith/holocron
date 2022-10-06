'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);

/**
 * Get random item from array that's different from the last
 * @param {section} section - a section
 */
function RocketScene(section) {
    const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.loadScene = () => {
        if(!PRM) {
            // Load the backgrounds
            this.backgroundPictures.forEach((picture, i) => {
                if(i) { // Skip first
                    const img = document.createElement("img");
                    img.style.opacity = 0;
                    this.backgroundImages.push(img);
                    picture.appendChild(img);
                }
            });

            // Load the rockets
            this.rocketPictures.forEach((picture, i) => {
                if(i) { // Skip first
                    const img = document.createElement("img");
                    img.style.display = "none";
                    this.rocketImages.push(img);
                    picture.appendChild(img);
                }
            });

            const spriteDist = 0.1; // This number doesn't really matter
            // The rocket sprite animation
            this.rocketSprite = gsap.timeline({ repeat: 10 });
            for(let i = 0; i < this.rocketImages.length; i++) {
                let j = i + 1;
                if(j === this.rocketImages.length) {
                    j = 0;
                }

                this.rocketSprite
                    .set(this.rocketImages[i], { display: "none" }, spriteDist * i)
                    .set(this.rocketImages[j], { display: "inline" }, spriteDist * i);
            }

            // The background sprite animation
            this.bgSprite = gsap.timeline({
                defaults: { duration: 0.0001 }
            });
            for(let i = 0; i < this.backgroundImages.length - 1; i++) {
                const j = i + 1;
                this.bgSprite
                    .to(this.backgroundImages[i], { opacity: 0 }, spriteDist * i)
                    .to(this.backgroundImages[j], { opacity: 1 }, spriteDist * i);
            }
            this.bgDur = this.bgSprite.duration();

            this.resize();
            ScrollTrigger.addEventListener("refresh", this.resize);
        }

        else { // Reduced motion version
            this.section.style.display = "none";
            ScrollTrigger.refresh();
        }
    };

    this.resize = () => {
        // The rocket animation along the path
        if(this.rocketPathAnim) this.rocketPathAnim.kill();

        this.rocketPathAnim = gsap.to(this.rocketContainer, {
            motionPath: {
                path: this.rocketPath,
                autoRotate: 90,
                align: this.rocketPath
            }
        });

        // What actually controls the animation
        if(this.spaceAnimation) {
            this.spaceAnimation.scrollTrigger.kill();
            this.spaceAnimation.kill();
        }

        this.spaceAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: this.pinnedScene,
                start: "top top",
                pin: true,
                end: "+=2000px",
                scrub: 0.1
            }
        })
            .add(this.bgSprite)
            .add(this.rocketSprite.totalDuration(this.bgDur), 0)
            .add(this.rocketPathAnim.totalDuration(this.bgDur), 0);
    };

    this.section = section;
    this.pinnedScene = section.querySelector(".pinned-scene");

    this.backgroundContainer = section.querySelector(".space-backgrounds");
    this.backgroundPictures = this.backgroundContainer.querySelectorAll("picture");
    this.backgroundImages = [...this.backgroundContainer.querySelectorAll("img")];

    this.rocketContainer = section.querySelector(".rocket");
    this.rocketPictures = this.rocketContainer.querySelectorAll("picture");
    this.rocketImages = [...this.rocketContainer.querySelectorAll("img")];
    this.rocketPath = section.querySelector(".rocket-svg path");

    // Lazy load the additonal images
    ScrollTrigger.create({
        trigger: section,
        start: "top 150%",
        once: true,
        onEnter: this.loadScene
    });
}

$(document).ready(function () {
    const rocketScenes = document.querySelectorAll(".rocket-scene");
    rocketScenes.forEach(section => new RocketScene(section));
});
