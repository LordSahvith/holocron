'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import 'particles.js/particles';
const particlesJS = window.particlesJS;

/**
 * Get random item from array that's different from the last
 * @param {section} section - a section
 */
function ShoppingGallery(section) {
    this.lastIndex = 0;

    //Particles used for the planet background stars
    this.particlesJson = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
            },
            "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 4,
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": false,
                    "mode": "repulse"
                },
                "resize": true
            },
        },
        "retina_detect": true
    };

    this.loadImages = () => {
        if (this.type === "flower") {
            this.sequenceContainers.forEach((container) => {
                // Only load images & do anim if container is displayed
                if (gsap.getProperty(container, "display") === "none") return;

                const imgs = gsap.utils.toArray(container.querySelectorAll("img"));

                for (let i = 2; i < 7; i++) {
                    const img = document.createElement("img");
                    img.src = `https://d2e2oszluhwxlw.cloudfront.net/img/home/2021/maker/img/flower-sequence/${container.dataset.color}-${i}.png`;
                    img.style.display = "none";
                    imgs.push(img);
                    container.appendChild(img);
                }

                // Create the ScrollTrigger to go between the images
                let currImg = 0;
                ScrollTrigger.create({
                    trigger: container,
                    start: "top 75%",
                    end: "top 40%",
                    onUpdate: (self) => {
                        const newIndex = Math.round(self.progress * 5);
                        if (newIndex !== currImg) {
                            gsap.set(imgs[currImg], { display: "none" });
                            gsap.set(imgs[newIndex], { display: "inline" });
                            currImg = newIndex;
                        }
                    }
                });

                // Refresh ScrollTrigger once the images load
                imgs[0].addEventListener("load", () => ScrollTrigger.refresh());
            });

            const fog = { r: 240, g: 240, b: 240 };
            const sand = { r: 240, g: 230, b: 220 };
            ScrollTrigger.create({
                trigger: this.section,
                start: "top 75%",
                end: "top 40%",
                onUpdate: (self) => {
                    var r = parseInt(this.lerp(fog.r, sand.r, self.progress));
                    var g = parseInt(this.lerp(fog.g, sand.g, self.progress));
                    var b = parseInt(this.lerp(fog.b, sand.b, self.progress));
                    var colorname = 'rgb(' + r + ',' + g + ',' + b + ')';
                    $('.page.page-designer').css('background-color', colorname);
                }
            });
            ScrollTrigger.create({
                trigger: this.section,
                start: "bottom -45%",
                end: "bottom -70%",
                onUpdate: (self) => {
                    var r = parseInt(this.lerp(sand.r, fog.r, self.progress));
                    var g = parseInt(this.lerp(sand.g, fog.g, self.progress));
                    var b = parseInt(this.lerp(sand.b, fog.b, self.progress));
                    var colorname = 'rgb(' + r + ',' + g + ',' + b + ')';
                    $('.page.page-designer').css('background-color', colorname);
                }
            });
        }

        if (this.type === "planet") {
            particlesJS("particles-js", this.particlesJson);

            /* eslint-disable */
            function particleEnter() {
                pJSDom[0].pJS.particles.move.enable = true;
                pJSDom[0].pJS.fn.particlesRefresh();
            }

            function particleLeave() {
                // pJSDom[0].pJS.particles.move.enable = false;
            }
            /* eslint-enable */

            ScrollTrigger.create({
                trigger: this.section,
                onEnter: particleEnter,
                onLeave: particleLeave,
                onEnterBack: particleEnter,
                onLeaveBack: particleLeave
            });
        }
    };

    this.resize = () => {
        if (innerWidth < 500) {
            gsap.set(".flower-sequence", { y: this.text.offsetHeight / 2 });
        } else {
            gsap.set(".flower-sequence", { clearProps: "y" });
        }
    };

    this.lerp = (a, b, u) => {
        return (1 - u) * a + u * b;
    };

    this.section = section;
    this.type = section.classList.contains("maker-flowers") ? "flower" : "planet";
    this.slides = section.querySelectorAll(".shopping-gallery-slide");

    // For flower stuff
    this.sequenceContainers = section.querySelectorAll(".flower-sequence");
    this.text = section.querySelector(".maker-text");

    // Lazy load the additonal images
    ScrollTrigger.create({
        trigger: section,
        start: "top 150%",
        once: true,
        onEnter: this.loadImages
    });

    if (this.type === "flower") {
        this.resize();
        window.addEventListener("resize", this.resize);
    }
}

$(document).ready(function () {
    const shoppingGallerySections = document.querySelectorAll(".maker-flowers, .explore-planets");
    shoppingGallerySections.forEach(section => new ShoppingGallery(section));
});
