'use strict';

import { gsap, Power1, Sine } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(ScrollTrigger);

/**
 * autopress js
 * @param {section} section - a section
 */
function VulcanAutopress(section) {

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

    this.boxBlend = (box1, box2, percent) => {
        const deltaX = box2.x - box1.x;
        const deltaY = box2.y - box1.y;
        const deltaW = box2.width - box1.width;
        const deltaH = box2.height - box1.height;
        return {
            x: box1.x + (deltaX * percent),
            y: box1.y + (deltaY * percent),
            width: box1.width + (deltaW * percent),
            height: box1.height + (deltaH * percent)
        };
    };

    this.boxCenter = (box) => {
        return {
            x: box.x + (box.width * 0.5),
            y: box.y + (box.height * 0.5),
        };
    };

    this.boxContainsBox = (box1, box2) => {
        return (
            box2.x >= box1.x &&
            box2.y >= box1.y &&
            box2.x + box2.width <= box1.x + box1.width &&
            box2.y + box2.height <= box1.y + box1.height
        );
    };

    this.boxUnion = (box1, box2) => {
        if (!box2) return box1;

        const x0 = Math.min(box1.x, box2.x);
        const y0 = Math.min(box1.y, box2.y);
        const w0 = Math.max(box1.x + box1.width, box2.x + box2.width) - x0;
        const h0 = Math.max(box1.y + box1.height, box2.y + box2.height) - y0;
        return {
            x: x0,
            y: y0,
            width: w0,
            height: h0
        };
    };

    this.boxClip = (box, clippingBox) => {
        const x0 = Math.max(box.x, clippingBox.x);
        const y0 = Math.max(box.y, clippingBox.y);
        const w0 = Math.min(box.x + box.width, clippingBox.x + clippingBox.width) - x0;
        const h0 = Math.min(box.y + box.height, clippingBox.y + clippingBox.height) - y0;
        return {
            x: x0,
            y: y0,
            width: w0,
            height: h0
        };
    };

    this.nearestLoadedImage = (requestedIndex) => {
        if (this.imagesLoaded === 0) return -1;

        if (this.sequenceImages[requestedIndex]) return requestedIndex;

        var searchUp = requestedIndex + 1;
        var searchDown = requestedIndex - 1;

        while (searchDown >= 0 && searchUp < this.sequenceLength) {
            if (searchDown >= 0) {
                if (this.sequenceImages[searchDown]) return searchDown;
                searchDown--;
            }
            if (searchUp < this.sequenceLength) {
                if (this.sequenceImages[searchUp]) return searchUp;
                searchUp++;
            }
        }

        return -1;
    };

    /*
    Worker Functions
    */

    this.assignMetrics = () => {
        const boundingRect = this.section.getBoundingClientRect();
        this.topY = scrollY + boundingRect.y;
        this.bottomY = this.topY + boundingRect.height;
        this.bottomYOffset = this.bottomY - innerHeight;

        const sequenceBoundingParentRect = this.positionReferenceOne.offsetParent.getBoundingClientRect();
        const sequenceBoundingRect1 = this.positionReferenceOne.getBoundingClientRect();
        const sequenceBoundingRect2 = this.positionReferenceTwo.getBoundingClientRect();

        const canvasClientWidth = this.canvas.clientWidth;
        const canvasClientHeight = this.canvas.clientHeight;

        const pixelRatio = devicePixelRatio;
        this.pixelRatio = pixelRatio;

        const createSequenceBox = (rect) => {
            return {
                x: (rect.x) * pixelRatio,
                y: (rect.y - sequenceBoundingParentRect.y) * pixelRatio,
                width: rect.width * pixelRatio,
                height: rect.height * pixelRatio
            };
        };

        this.sequenceBox1 = createSequenceBox(sequenceBoundingRect1);
        this.sequenceBox2 = createSequenceBox(sequenceBoundingRect2);

        const center1 = this.boxCenter(this.sequenceBox1);
        const dX = (canvasClientWidth / 2 * pixelRatio);
        let dY;
        if ((center1.y / pixelRatio) < (canvasClientHeight / 2)) {
            dY = (canvasClientHeight * pixelRatio) - center1.y;
        }
        else {
            dY = center1.y;
        }
        this.maxRadius = Math.sqrt((dX * dX) + (dY * dY));
        this.minRadius = sequenceBoundingRect2.width / 2 * pixelRatio;

        this.canvas.width = canvasClientWidth * pixelRatio;
        this.canvas.height = canvasClientHeight * pixelRatio;
        this.canvasBox = {
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height
        };

        this.isDesktop = (window.innerWidth > 1024);
    };

    this.assignSourceIndex = (deferLoad) => {
        const sourceIndex = this.sourceRefUrls.indexOf(this.sourceRefImg.currentSrc);
        if (!deferLoad && sourceIndex != this.currentSourceIndex) {
            this.currentSourceIndex = sourceIndex;
            this.sequenceImageDataKey = this.sequenceImageDataKeys[sourceIndex];
            this.loadSequence();
        }
    };

    this.loadSequence = () => {
        this.nonLoadedImages = [...Array(this.sequenceLength).keys()];
        this.imagesLoaded = 0;
        this.sequenceImages = Array(this.sequenceLength);

        const loadersLength = this.sequenceImageLoaders.length;
        for (let i = 0; i < loadersLength; i++) {
            this.loadSequenceImage(this.sequenceImageLoaders[i]);
        }
    };

    this.loadSequenceImage = (loader) => {
        const nonLoadedLength = this.nonLoadedImages.length;
        if (nonLoadedLength === 0) {
            return;
        }

        const i = Math.floor((nonLoadedLength - 1) * loader.indexOffset);
        const index = this.nonLoadedImages.splice(i, 1);
        loader.index = index;
        loader.src = this.sequenceDataElems[index].dataset[this.sequenceImageDataKey];
    };

    /*
    Event Listeners
    */

    this.onSequenceImageLoaded = (e) => {
        const img = e.target;

        if (window.createImageBitmap) {
            const finish = () => {
                createImageBitmap(img).then((bmp) => {
                    this.sequenceImages[img.index] = bmp;
                    this.imagesLoaded++;

                    this.loadSequenceImage(img);
                });
            };

            if (window.requestIdleCallback) {
                requestIdleCallback(finish);
            }
            else {
                finish();
            }
        }
        else {
            const i = this.sequenceImageLoaders.indexOf(img);
            this.sequenceImageLoaders[i] = new Image();
            this.sequenceImageLoaders[i].indexOffset = img.indexOffset;
            this.sequenceImageLoaders[i].addEventListener("load", this.onSequenceImageLoaded);

            this.sequenceImages[img.index] = img;
            this.imagesLoaded++;

            this.loadSequenceImage(this.sequenceImageLoaders[i]);
        }
    };

    this.onResize = () => {
        if (this.currentSrcTimeout) {
            clearTimeout(this.currentSrcTimeout);
        }
        this.currentSrcTimeout = null;

        if (!this.sourceRefImg.currentSrc) {
            this.currentSrcTimeout = setTimeout(this.onCurrentSrcTimeout, 10);
            return;
        }

        this.assignSourceIndex();
        this.assignMetrics();

        this.progressTarget = Math.max(Math.min((scrollY - this.topY) / (this.bottomYOffset - this.topY), 1), 0);
        this.progress = this.progressTarget;
        this.drawnBox = undefined;
        this.forceDraw = true;
    };

    this.onScroll = () => {
        this.progressTarget = Math.max(Math.min((scrollY - this.topY) / (this.bottomYOffset - this.topY), 1), 0);

        if (this.isPaused) {
            this.isPaused = false;
            if (!this.isAnimating) requestAnimationFrame(this.onAnimationFrame);
        }
    };

    this.onBgColor = (e) => {
        this.bgColor = `rgb(${e.detail.r}, ${e.detail.g}, ${e.detail.b})`;
        this.forceDraw = true;
    };

    this.onCurrentSrcTimeout = () => {
        if (!this.sourceRefImg.currentSrc) {
            this.currentSrcTimeout = setTimeout(this.onCurrentSrcTimeout, 10);
            return;
        }

        this.assignSourceIndex();
        this.assignMetrics();

        this.progressTarget = Math.max(Math.min((scrollY - this.topY) / (this.bottomYOffset - this.topY), 1), 0);
        this.forceDraw = true;
    };

    this.onVisibilityChange = () => {
        if (document.hidden) {
            this.isPaused = true;
        }
        else {
            this.isPaused = false;
            if (!this.isAnimating) requestAnimationFrame(this.onAnimationFrame);
        }
    };

    this.onFocus = () => {
        this.isPaused = false;
        if (!this.isAnimating) requestAnimationFrame(this.onAnimationFrame);
    };

    this.onBlur = () => {
        this.isPaused = true;
    };

    this.onAnimationFrame = () => {
        if (this.progress === this.drawnProgress
            && this.progress === this.progressTarget
            && !this.forceDraw) {
            if (!this.isPaused) {
                this.isAnimating = true;
                return requestAnimationFrame(this.onAnimationFrame);
            }
            else {
                this.isAnimating = false;
            }

        }

        const progressDelta = this.progressTarget - this.progress;
        if (Math.abs(progressDelta) < 0.001) {
            this.progress = this.progressTarget;
        }
        else {
            this.progress += progressDelta * 0.25;
        }

        const cropIn = this.isDesktop ? 0.1 : 0;
        const cropOut = 30 / this.sequenceLength;

        const isCropping = this.progress >= cropIn;

        let drawX;
        let drawY;
        let drawWidth;
        let drawHeight;
        const position = Power1.easeInOut(this.normalizeRange(this.progress, cropIn, 0.95));
        const box = this.boxBlend(this.sequenceBox1, this.sequenceBox2, position);
        const drawCenter = this.boxCenter(box);
        drawX = box.x;
        drawY = box.y;
        drawWidth = box.width;
        drawHeight = box.height;

        const bgColor = isCropping ? "white" : this.bgColor;
        this.ctx.fillStyle = bgColor;
        if (bgColor !== this.drawnBgColor || this.drawnBox === undefined) {
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        else if (!isCropping) {
            this.ctx.fillRect(this.drawnBox.x, this.drawnBox.y, this.drawnBox.width, this.drawnBox.height);
        }
        else if (isCropping && !this.boxContainsBox(box, this.drawnBox)) {
            this.ctx.fillRect(this.drawnBox.x, this.drawnBox.y, this.drawnBox.width, this.drawnBox.height);
        }

        const minRadius = drawWidth / 2;
        const radiusDelta = this.maxRadius - minRadius;
        let radius = minRadius + radiusDelta * Sine.easeOut(this.normalizeRange(this.progress, cropIn, cropOut, 1, 0));

        if (isCropping) {
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fillRect(
                (drawCenter.x - radius),
                (drawCenter.y - radius),
                radius * 2,
                radius * 2);
        }

        const lastIndex = this.sequenceLength - 1;
        let requestedIndex = Math.floor(lastIndex * this.progress);

        const index = this.nearestLoadedImage(requestedIndex);

        if (index != -1) {
            this.ctx.drawImage(
                this.sequenceImages[index],
                drawX,
                drawY,
                drawWidth,
                drawHeight
            );
        }

        if (isCropping) {
            const clearBox = this.boxClip(this.boxUnion(box, this.drawnBox), this.canvasBox);
            this.ctx.fillStyle = "white";
            this.ctx.beginPath();
            this.ctx.moveTo(drawCenter.x, Math.min(clearBox.y, drawCenter.y - radius - 1));
            this.ctx.arc(drawCenter.x, drawCenter.y, radius, -Math.PI / 2 - 0.01, Math.PI / 2 + 0.01);
            this.ctx.lineTo(drawCenter.x, Math.max(clearBox.y + clearBox.height, drawCenter.y + radius + 1));
            this.ctx.lineTo(Math.max(clearBox.x + clearBox.width, drawCenter.x + radius + 1), Math.max(clearBox.y + clearBox.height, drawCenter.y + radius + 1));
            this.ctx.lineTo(Math.max(clearBox.x + clearBox.width, drawCenter.x + radius + 1), Math.min(clearBox.x, drawCenter.y - radius - 1));
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.moveTo(drawCenter.x, Math.min(clearBox.y, drawCenter.y - radius - 1));
            this.ctx.arc(drawCenter.x, drawCenter.y, radius, -Math.PI / 2 - 0.01, Math.PI / 2 + 0.01, true);
            this.ctx.lineTo(drawCenter.x, Math.max(clearBox.y + clearBox.height, drawCenter.y + radius + 1));
            this.ctx.lineTo(Math.min(clearBox.x, drawCenter.x - radius - 1), Math.max(clearBox.y + clearBox.height, drawCenter.y + radius + 1));
            this.ctx.lineTo(Math.min(clearBox.x, drawCenter.x - radius - 1), Math.min(clearBox.y, drawCenter.y - radius - 1));
            this.ctx.fill();
        }

        let dX, dY, dW, dH;
        if (isCropping) {
            dX = Math.max(Math.floor(drawCenter.x - radius), -1);
            dY = Math.max(Math.floor(drawCenter.y - radius), -1);
            dW = Math.min(Math.ceil(drawCenter.x + radius) - dX, this.canvas.width + 2);
            dH = Math.min(Math.ceil(drawCenter.y + radius) - dY, this.canvas.height + 2);
        }
        else {
            dX = Math.max(box.x, -1);
            dY = Math.max(box.y, -1);
            dW = Math.min(box.x + box.width - dX, this.canvas.width + 2);
            dH = Math.min(box.y + box.height - dY, this.canvas.height + 2);
        }

        this.drawnProgress = this.progress;
        this.drawnBgColor = bgColor;
        this.drawnBox = {
            x: dX,
            y: dY,
            width: dW,
            height: dH
        };
        this.forceDraw = (requestedIndex != index);

        if (!this.isPaused) {
            this.isAnimating = true;
            return requestAnimationFrame(this.onAnimationFrame);
        }
        else {
            this.isAnimating = false;
        }
    };

    // Deferred constructor
    const construct = () => {
        this.section = section;
        this.bgColor = getComputedStyle(section).getPropertyValue("--bgColor");
        this.cropEase =  CustomEase.create("crop", "M0,0,C0,0,0.9,1,1,1");

        this.positionReferenceOne = section.getElementsByClassName("position-reference-one")[0];
        this.positionReferenceTwo = section.getElementsByClassName("position-reference-two")[0];

        this.canvas = section.getElementsByClassName("product-canvas")[0];
        this.ctx = this.canvas.getContext("2d");

        this.drawnProgress = -1;
        this.progress = 0;

        const concurrentLoads = 4;
        this.sequenceImageLoaders = Array(concurrentLoads);
        for (let i = 0; i < concurrentLoads; i++) {
            this.sequenceImageLoaders[i] = new Image();
            this.sequenceImageLoaders[i].indexOffset = i / (concurrentLoads - 1);
            this.sequenceImageLoaders[i].addEventListener("load", this.onSequenceImageLoaded);
        }

        this.sequenceContainer = section.getElementsByClassName("vulcan-autopress-images")[0];
        this.sequenceDataElems = [...this.sequenceContainer.getElementsByClassName("sequence-images")[0].getElementsByClassName("sequence-image-data")];

        this.sourceRef = section.getElementsByClassName("source-ref")[0];
        this.sourceRefImg = this.sourceRef.getElementsByTagName("img")[0];
        this.sourceRefUrls = [...this.sourceRef.getElementsByTagName("source"), this.sourceRefImg].map(s => s.src || s.srcset);

        this.sequenceLength = this.sequenceDataElems.length;
        this.sequenceImageDataKeys = ["dTW", "dT", "dW", "d", "tTW", "tT", "tW", "t", "pTW", "pT", "pW", "p"];
        this.assignMetrics();
        this.assignSourceIndex();
        this.onScroll();
        this.progress = this.progressTarget;
        this.isPaused = false;
        this.isAnimating = true;
        requestAnimationFrame(this.onAnimationFrame);

        window.addEventListener("resize", this.onResize);
        window.addEventListener("scroll", this.onScroll);
        window.addEventListener("bgColor", this.onBgColor);

        document.addEventListener("visibilitychange", this.onVisibilityChange, false);
        window.addEventListener("focus", this.onFocus, false);
        window.addEventListener("blur", this.onBlur, false);
    };

    if (scrollY < innerHeight) {
        if (window.requestIdleCallback) {
            requestIdleCallback(construct);
        }
        else {
            setTimeout(construct, 1650);
        }
    }
    else {
        construct();
    }
}

$(document).ready(function () {
    const vulcanAutopresses = document.querySelectorAll(".vulcan-autopress");
    vulcanAutopresses.forEach(vulcanAutopress => new VulcanAutopress(vulcanAutopress));
});