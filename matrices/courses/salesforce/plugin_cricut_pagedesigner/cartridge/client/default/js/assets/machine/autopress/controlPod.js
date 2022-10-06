'use strict';

/**
 * autopress control pod js
 * @param {section} section - a section
 */
function VulcanControlPad(section) {
    /*
    Utilities
    */

    this.normalizeRange = (value, inBottom, inTop, outBottom, outTop) => {
        if (outBottom === undefined) outBottom = 0;
        if (outTop === undefined) outTop = 1;

        const outDelta = outTop - outBottom;
        const inDelta = inTop - inBottom;
        const normalized = Math.min(Math.max((value - inBottom) / inDelta, 0), 1);

        return outBottom + (outDelta * normalized);
    };

    this.blendColor = (value, color1, color2) => {
        const dR = color2.r - color1.r;
        const dG = color2.g - color1.g;
        const dB = color2.b - color1.b;
        return {
            r: color1.r + dR * value,
            g: color1.g + dG * value,
            b: color1.b + dB * value
        };
    };

    /*
    Event Listeners
    */

    this.onResize = () => {
        const boundingRect = this.section.getBoundingClientRect();
        this.topY = scrollY + boundingRect.y;
        this.bottomY = this.topY + boundingRect.height;
        this.bottomYOffset = this.bottomY - innerHeight;
    };

    this.onScroll = () => {
        this.progress = Math.max(Math.min((scrollY - this.topY) / (this.bottomYOffset - this.topY), 1), 0);
        this.enterProgress = Math.max(Math.min(1 + (scrollY - this.topY) / innerHeight, 1), 0);
        this.exitProgress = Math.max(Math.min((scrollY - this.bottomYOffset) / innerHeight, 1), 0);

        if (this.prevProgress === this.progress &&
            this.prevEnterProgress === this.enterProgress &&
            this.prevExitProgress === this.exitProgress) return;

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

        const hotProgress = this.normalizeRange(this.progress, 0.15, 0.55);
        this.hotText.style.opacity = 1 - hotProgress;
        this.hotText.style.transform = `translateY(${hotProgress * -30}px)`;
        this.hotText.style.pointerEvents = (hotProgress === 1) ? "none" : "";

        const controlProgress = this.normalizeRange(this.progress, 0.5, 0.95);
        this.controlText.style.opacity = controlProgress;
        this.controlText.style.transform = `translateY(${(1 - controlProgress) * 30}px)`;
        this.controlText.style.pointerEvents = controlProgress ? "none" : "";

        if (this.progress < 1) {
            const colorProgress = this.normalizeRange(this.progress, 0.15, 0.95);
            const c = this.blendColor(colorProgress, this.gray, this.orange);
            const event = new CustomEvent('bgColor', {detail: c});
            window.dispatchEvent(event);
        }
        else {
            const colorProgress = this.normalizeRange(this.exitProgress, 0.55, 0.9);
            const c = this.blendColor(colorProgress, this.orange, this.gray);
            const event = new CustomEvent('bgColor', {detail: c});
            window.dispatchEvent(event);
        }

        this.prevProgress = this.progress;
        this.prevEnterProgress = this.enterProgress;
        this.prevExitProgress = this.exitProgress;
    };

    this.onBgColor = (e) => {
        $('.page.page-designer').css('background-color', `rgb(${e.detail.r}, ${e.detail.g}, ${e.detail.b})`);
    };

    // Deferred constructor
    const construct = () => {
        this.section = section;
        this.hotText = section.getElementsByClassName("hot-text")[0];
        this.controlText = section.getElementsByClassName("control-text")[0];
        this.video = section.getElementsByTagName("video")[0];
        this.video.load();

        this.gray = {r: 240, g: 240, b: 240};
        this.orange = {r: 243, g: 221, b: 202};

        window.addEventListener("resize", this.onResize);
        window.addEventListener("scroll", this.onScroll);
        window.addEventListener("bgColor", this.onBgColor);

        this.onResize();
        this.onScroll();

        this.hasFired = false;
    };

    if (scrollY < innerHeight) {
        if (window.requestIdleCallback) {
            requestIdleCallback(construct);
        }
        else {
            setTimeout(construct, 1600);
        }
    }
    else {
        construct();
    }
}

$(document).ready(function () {
    const vulcanControlPads = document.querySelectorAll(".vulcan-control-pod");
    vulcanControlPads.forEach(vulcanControlPad => new VulcanControlPad(vulcanControlPad));
});