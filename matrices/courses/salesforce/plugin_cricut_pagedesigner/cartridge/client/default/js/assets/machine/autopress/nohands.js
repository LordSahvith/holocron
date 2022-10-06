'use strict';

/**
 * autopress nohands js
 * @param {section} section - a section
 */
function VulcanNoHands(section) {

    this.onResize = () => {
        const boundingRect = this.section.getBoundingClientRect();
        this.topY = scrollY + boundingRect.y;
        this.bottomY = this.topY + boundingRect.height;
        this.bottomYOffset = this.bottomY - innerHeight;
    };

    this.onScroll = () => {
        this.enterProgress = Math.max(Math.min(1 + (scrollY - this.topY) / innerHeight, 1), 0);
        if (this.prevEnterProgress === this.enterProgress) return;

        if (this.hasFired && this.enterProgress === 0) {
            if (this.video.fastSeek) {
                this.video.pause();
                this.video.fastSeek(0);
            }
            else {
                this.video.pause();
                this.video.currentTime = 0;
            }
            this.hasFired = false;
        }

        if (!this.hasFired && this.enterProgress > 0.6) {
            this.video.play();
            this.hasFired = true;
        }

        this.prevEnterProgress = this.enterProgress;
    };

    // Deferred constructor
    const construct = () => {
        this.section = section;
        this.section.nextElementSibling.style.background = "#fff";

        this.video = section.getElementsByTagName("video")[0];
        this.video.load();
        this.hasFired = false;

        window.addEventListener("resize", this.onResize);
        window.addEventListener("scroll", this.onScroll);

        this.onResize();
        this.onScroll();

        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 2500);
    };

    if (scrollY < innerHeight) {
        if (window.requestIdleCallback) {
            requestIdleCallback(construct);
        }
        else {
            setTimeout(construct, 1700);
        }
    }
    else {
        construct();
    }
}

$(document).ready(function () {
    const vulcanNoHands = document.querySelectorAll(".vulcan-no-hands");
    vulcanNoHands.forEach(noHands => new VulcanNoHands(noHands));
});