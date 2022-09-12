'use strict';
const sideDistPercent = -31;
const centerDistPercent = -17;
const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * autopress tshirts js
 * @param {section} section - a section
 */
function VulcanTShirts(section) {
    this.onResize = () => {
        const boundingRect = this.section.getBoundingClientRect();
        this.topY = scrollY + boundingRect.y;
        this.bottomY = this.topY + boundingRect.height;
        this.bottomYOffset = this.bottomY - innerHeight;

        this.prevProgress = undefined;
        this.onScroll();
    };

    this.onScroll = () => {
        this.progress = Math.max(Math.min((scrollY - this.topY) / (this.bottomYOffset - this.topY), 1), 0);

        if (!this.hasFired && this.topY - scrollY < innerHeight * 0.7) {
            this.shirts.forEach((shirt, i) => {
                if (!PRM && innerWidth < 1025) {
                    shirt.style.transition = "none";
                    shirt.style.transform = "translateY(50px)";
                }
                setTimeout(() => {
                    shirt.style.transition = "";
                    shirt.style.opacity = 1;
                    shirt.style.transform = "";
                }, i * 100);
            });
            this.hasFired = true;
        }

        if (this.progress !== this.prevProgress) {
            const slidingOffset = 106 * (1 - this.progress);
            const baseOffset = slidingOffset + (this.bottomYOffset - this.topY) * this.progress;
            const offset = (this.progress - 0.5) * 2;

            if (innerWidth < 1025) {
                this.leftCol.style.transform = "translateY(16.66%)";
                this.centerCol.style.transform = "";
                this.rightCol.style.transform = "translateY(16.66%)";
            }
            else {
                this.leftCol.style.transform = `translateY(${baseOffset}px) translateY(${offset * sideDistPercent}%)`;
                this.centerCol.style.transform = `translateY(${baseOffset}px) translateY(${offset * centerDistPercent}%)`;
                this.rightCol.style.transform = `translateY(${baseOffset}px) translateY(${offset * sideDistPercent}%)`;
            }
        }

        this.prevProgress = this.progress;
    };

    // Deferred constructor
    const construct = () => {
        this.section = section;

        this.shirtContainer = section.getElementsByClassName("shirts")[0];

        this.leftCol = section.getElementsByClassName("shirt-left-col")[0];
        this.centerCol = section.getElementsByClassName("shirt-center-col")[0];
        this.rightCol = section.getElementsByClassName("shirt-right-col")[0];

        const orderedShirts = section.getElementsByClassName("shirt-image");
        this.shirts = [
            orderedShirts[3],
            orderedShirts[0],
            orderedShirts[6],
            orderedShirts[4],
            orderedShirts[1],
            orderedShirts[7],
            orderedShirts[5],
            orderedShirts[2],
            orderedShirts[8]
        ];

        this.shirts.forEach((shirt) => {
            shirt.style.opacity = 0;
        });

        window.addEventListener("resize", this.onResize);
        window.addEventListener("scroll", this.onScroll);

        this.onResize();
        this.hasFired = false;
    };

    if (scrollY < innerHeight) {
        if (window.requestIdleCallback) {
            requestIdleCallback(construct);
        }
        else {
            setTimeout(construct, 1550);
        }
    }
    else {
        construct();
    }
}

$(document).ready(function () {
    const vulcanTShirts = document.querySelectorAll(".vulcan-t-shirts");
    vulcanTShirts.forEach(vulcanTShirt => new VulcanTShirts(vulcanTShirt));
});