'use strict';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let bbox;

$(document).ready(function () {

    let section = document.querySelector('.joy-long-cut');

    let imageContainer = section.querySelector(".long-cut-visual");
    let image = section.querySelector(".long-cut-image");

    gsap.to(image, {
        x: () => {
            if (bbox) {
                return -(bbox.width - (innerWidth - bbox.left));
            }
        },
        ease: "none",
        scrollTrigger: {
            trigger: imageContainer,
            pin: true,
            scrub: 0.1,
            invalidateOnRefresh: true,
            start: () => {
                bbox = image.getBoundingClientRect();
                if (bbox.height < innerHeight - 72) {
                    return "center center";
                } else {
                    return "top top";
                }
            },
            end: "+=100%"
        }
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
});
