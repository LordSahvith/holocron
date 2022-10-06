'use strict';

import { Power1 } from 'gsap';

// Position the underlaid shirt where it should be each frame
const shirtPoses = {
    48: {
        opacity: 0.25,
        clip: -0.6804
    },
    49: {
        opacity: 0.5,
        clip: -0.4536
    },
    50: {
        opacity: 0.75,
        clip: -0.2268
    },
    // Start of the shirt being in-frame of the sequence
    51: { clip: 0 },
    52: { clip: .2268 },
    53: { clip: .4447 },
    54: { clip: .687 },
    55: { clip: .777 },
    56: { clip: .799 },
    57: { clip: .830 },
    58: { clip: .857 },
    59: { clip: .879 },
    60: { clip: .897 },
    61: { clip: .913 },
    62: { clip: .924 },
    63: { clip: .933 },
    64: { clip: .934 },
    65: { clip: .938 },
    66: { clip: .938 },
    67: { clip: .942 }
};

/**
 * autopress sequence js
 * @param {section} section - a section
 */
function VulcanProductSequence(section) {
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

    this.setText = (text, progress, inStart, inStop, outStart, outStop) => {
        if (progress < inStart || progress >= outStop) {
            text.style.opacity = 0;
            text.style.visbility = "hidden";
        }
        else if (progress < inStop) {
            const normalized = this.normalizeRange(progress, inStart, inStop);
            const eased = Power1.easeOut(normalized);
            text.style.opacity = normalized;
            text.style.visbility = "visible";
            text.children[0].style.transform = `translateY(${30 * (1 - eased)}px)`;
            text.children[1].style.transform = `translateY(${30 * (1 - eased)}px)`;
        }
        else if (progress < outStart) {
            text.style.opacity = 1;
            text.style.visbility = "visible";
            text.children[0].style.transform = "";
            text.children[1].style.transform = "";
        }
        else {
            const normalized = this.normalizeRange(progress, outStart, outStop);
            const eased = Power1.easeIn(normalized);
            text.style.opacity = 1 - normalized;
            text.style.visbility = "visible";
            text.children[0].style.transform = `translateY(${-30 * eased}px)`;
            text.children[1].style.transform = `translateY(${-30 * eased}px)`;
        }
    };

    this.setIndicators = (text, progress, inStart, inStop, outStart, outStop) => {
        if (progress < inStart || progress >= outStop) {
            text.style.opacity = 0;
            text.style.visbility = "hidden";
        }
        else if (progress < inStop) {
            text.style.opacity = this.normalizeRange(progress, inStart, inStop);
            text.style.visbility = "visible";
        }
        else if (progress < outStart) {
            text.style.opacity = 1;
            text.style.visbility = "visible";
        }
        else {
            text.style.opacity = this.normalizeRange(progress, outStart, outStop, 1, 0);
            text.style.visbility = "visible";
        }
    };

    this.assignMetrics = () => {
        const oldTopY = this.topY;
        const oldBottomYOffset = this.bottomYOffset;
        const oldWidth = this.sequenceBox1 ? this.sequenceBox1.width : 0;

        const boundingRect = this.section.getBoundingClientRect();
        this.topY = scrollY + boundingRect.y;
        this.bottomY = this.topY + boundingRect.height;
        this.bottomYOffset = this.bottomY - innerHeight;

        const sequenceBoundingParentRect = this.positionReferenceOne.offsetParent.getBoundingClientRect();
        const sequenceBoundingRect1 = this.positionReferenceOne.getBoundingClientRect();
        const sequenceBoundingRect2 = this.positionReferenceTwo.getBoundingClientRect();
        const sequenceBoundingRect3 = this.positionReferenceThree.getBoundingClientRect();
        const sequenceBoundingRect4 = this.positionReferenceFour.getBoundingClientRect();

        const pixelRatio = devicePixelRatio;
        this.pixelRatio = pixelRatio;

        const createSequenceBox = (rect) => {
            return {
                x: (rect.x - sequenceBoundingParentRect.x) * pixelRatio,
                y: (rect.y - sequenceBoundingParentRect.y) * pixelRatio,
                width: rect.width * pixelRatio,
                height: rect.height * pixelRatio
            };
        };

        this.sequenceBox1 = createSequenceBox(sequenceBoundingRect1);
        this.sequenceBox2 = createSequenceBox(sequenceBoundingRect2);
        this.sequenceBox3 = createSequenceBox(sequenceBoundingRect3);
        this.sequenceBox4 = createSequenceBox(sequenceBoundingRect4);

        this.canvas.style.width = sequenceBoundingRect1.width + "px";
        this.canvas.width = this.sequenceBox1.width;
        this.canvas.height = this.canvas.clientHeight * pixelRatio;

        this.backgroundSvgPositions = Array(this.backgroundSVGs.length);
        const parentBBox = this.backgroundSVGContainer.getBoundingClientRect();
        const canvasParentBox = this.canvas.offsetParent.getBoundingClientRect();

        this.backgroundSVGs.forEach((svg, i) => {
            svg.style.transform = "";
            if (i === 0) {
                this.svgTransformExtra = getComputedStyle(svg).getPropertyValue("transform");
                if (this.svgTransformExtra === "none") this.svgTransformExtra = "";
            }
            svg.offsetX = 0;
            const svgBox = svg.getBoundingClientRect();
            this.backgroundSvgPositions[i] = {
                x: svgBox.x - canvasParentBox.x,
                y: svgBox.y - parentBBox.y,
                width: svgBox.width,
                height: svgBox.height
            };
            const relativeLeftX = this.backgroundSvgPositions[i].x - (this.sequenceBox1.x / pixelRatio);
            const relativeRightX = relativeLeftX + svgBox.width;
            // TODO: put back allowedOverlap of 0.25 if you can work out stacking
            // const allowedOverlap = 0.25;
            const allowedOverlap = 0;
            if (relativeLeftX < 0 && relativeRightX > 0) {
                const overlap = relativeRightX / svgBox.width;
                if (overlap <= allowedOverlap) {
                    // slight overlap; leave
                }
                else if (overlap < 0.5) {
                    // too much overlap; move out
                    svg.offsetX = -(svgBox.width * (overlap - allowedOverlap)) - (Math.random() * 20);
                }
                else {
                    // too much overlap; move in
                    svg.offsetX = (svgBox.width * (1 - overlap)) + (Math.random() * 20);
                }
                this.backgroundSvgPositions[i].x += svg.offsetX;
            }
            const pixelWidth = (this.sequenceBox1.width / pixelRatio);
            if (relativeLeftX < pixelWidth && relativeRightX > pixelWidth) {
                const overlap = -(relativeLeftX - pixelWidth) / svgBox.width;
                if (overlap <= allowedOverlap) {
                    // slight overlap; leave
                }
                else if (overlap < 0.5) {
                    // too much overlap; move out
                    svg.offsetX = (svgBox.width * (overlap - allowedOverlap)) + (Math.random() * 20);
                }
                else {
                    // too much overlap; move in
                    svg.offsetX = -(svgBox.width * (1 - overlap)) - (Math.random() * 20);
                }
                this.backgroundSvgPositions[i].x += svg.offsetX;
            }
        });

        return (oldTopY != this.topY) || (oldBottomYOffset != this.bottomYOffset) || (oldWidth != this.sequenceBox1.width);
    };

    this.assignSourceIndex = (deferLoad) => {
        const sourceIndex = this.sourceRefUrls.indexOf(this.sourceRefImg.currentSrc);
        if (!deferLoad && sourceIndex != this.currentSourceIndex) {
            this.currentSourceIndex = sourceIndex;
            this.sequenceImageDataKey = this.sequenceImageDataKeys[sourceIndex];
            this.loadSequence();
            this.loadShirt();
            this.loadSvgs();
        }
    };

    this.loadShirt = () => {
        this.shirtImage = null;
        this.shirtLoader.src = this.shirtUnderlayElem.dataset[this.sequenceImageDataKey];
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

    this.loadSvgs = () => {
        const svgLength = this.backgroundSVGs.length;
        this.nonLoadedSVGs = [...Array(svgLength).keys()];
        this.svgsLoaded = 0;
        this.svgBitmaps = Array(svgLength);

        this.loadSvgImage(this.svgLoader);
    };

    this.loadSvgImage = (loader) => {
        const nonLoadedLength = this.nonLoadedSVGs.length;
        if (nonLoadedLength === 0) {
            return;
        }

        const i = Math.floor((nonLoadedLength - 1) * loader.indexOffset);
        const index = this.nonLoadedSVGs.splice(i, 1);
        loader.index = index;
        loader.src = this.backgroundSVGs[index].src;
    };

    /*
    Event Listeners
    */

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
        this.forceDraw = true;
    };

    this.onScroll = () => {
        this.progressTarget = Math.max(Math.min((scrollY - this.topY) / (this.bottomYOffset - this.topY), 1), 0);

        if (this.isPaused) {
            this.isPaused = false;
            if (!this.isAnimating) requestAnimationFrame(this.onAnimationFrame);
        }
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

        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let drawX;
        let drawY;
        let drawWidth;
        let drawHeight;

        // 0.00 -> 0.05 hold position 1
        // 0.05 -> 0.15 move position 1-2
        // 0.15 -> 0.30 hold position 2
        // 0.30 -> 0.45 move position 2-3
        // 0.45 -> 1.00 hold position 3
        if (this.progress < 0.05) {
            drawX = this.sequenceBox1.x;
            drawY = this.sequenceBox1.y;
            drawWidth = this.sequenceBox1.width;
            drawHeight = this.sequenceBox1.height;
        }
        else if (this.progress >= 0.05 && this.progress < 0.15) {
            const normalized = this.normalizeRange(this.progress, 0.05, 0.15);
            const eased = Power1.easeInOut(normalized);
            const box = this.boxBlend(this.sequenceBox1, this.sequenceBox2, eased);
            drawX = box.x;
            drawY = box.y;
            drawWidth = box.width;
            drawHeight = box.height;
        }
        else if (this.progress >= 0.15 && this.progress < 0.3) {
            drawX = this.sequenceBox2.x;
            drawY = this.sequenceBox2.y;
            drawWidth = this.sequenceBox2.width;
            drawHeight = this.sequenceBox2.height;
        }
        else if (this.progress >= 0.3 && this.progress < 0.45) {
            const normalized = this.normalizeRange(this.progress, 0.3, 0.45);
            const eased = Power1.easeInOut(normalized);
            const box = this.boxBlend(this.sequenceBox2, this.sequenceBox3, eased);
            drawX = box.x;
            drawY = box.y;
            drawWidth = box.width;
            drawHeight = box.height;
        }
        else if (this.progress >= 0.45 && this.progress < 0.7) {
            drawX = this.sequenceBox3.x;
            drawY = this.sequenceBox3.y;
            drawWidth = this.sequenceBox3.width;
            drawHeight = this.sequenceBox3.height;
        }
        else if (this.progress >= 0.7 && this.progress < 0.75) {
            const normalized = this.normalizeRange(this.progress, 0.7, 0.75);
            const eased = Power1.easeInOut(normalized);
            const box = this.boxBlend(this.sequenceBox3, this.sequenceBox4, eased);
            drawX = box.x;
            drawY = box.y;
            drawWidth = box.width;
            drawHeight = box.height;
        }
        else {
            drawX = this.sequenceBox4.x;
            drawY = this.sequenceBox4.y;
            drawWidth = this.sequenceBox4.width;
            drawHeight = this.sequenceBox4.height;
        }

        const svgOffsetY = -this.progressTarget * (this.bottomYOffset - this.topY);

        let needsMissingSvg = false;
        this.backgroundSVGs.forEach((svg, i) => {
            svg.style.transform = `translateX(${(drawX - this.sequenceBox1.x) / this.pixelRatio + (svg.offsetX)}px) ${this.svgTransformExtra}`;
            const svgX = this.backgroundSvgPositions[i].x * this.pixelRatio - this.sequenceBox1.x;
            const svgY = (this.backgroundSvgPositions[i].y + svgOffsetY) * this.pixelRatio;
            const svgWidth = this.backgroundSvgPositions[i].width * this.pixelRatio;
            const svgHeight = this.backgroundSvgPositions[i].height * this.pixelRatio;
            const leftOn = svgX >= 0;
            const rightOn = svgX + svgWidth <= drawWidth;
            const aboveTop = svgY + svgHeight > 0;
            const belowBottom = svgY < this.canvas.height;

            if (leftOn && rightOn && aboveTop && belowBottom) {
                if (this.svgBitmaps[i]) {
                    svg.style.zIndex = -1;
                    this.ctx.drawImage(
                        this.svgBitmaps[i],
                        svgX,
                        svgY,
                        svgWidth,
                        this.backgroundSvgPositions[i].height * this.pixelRatio
                    );
                }
                else {
                    svg.style.zIndex = 0;
                    needsMissingSvg = true;
                }
            }
            else {
                svg.style.zIndex = 0;
            }
        });

        // 0.000 -> 0.475 Frames 0-49
        // 0.475 -> 0.675 Hold Frame 50
        // 0.675 -> 0.950 Frames 51-lastIndex
        const lastIndex = this.sequenceLength - 1;
        let requestedIndex;

        if (this.progress < 0.475) {
            const normalized = this.normalizeRange(this.progress, 0, 0.475);
            requestedIndex = Math.floor(50 * normalized);
        }
        else if (this.progress < 0.675) {
            requestedIndex = 50;
        }
        else {
            const normalized = this.normalizeRange(this.progress, 0.675, 0.95);
            const delta = lastIndex - 51;
            requestedIndex = 51 + Math.floor(delta * normalized);
        }

        const index = this.nearestLoadedImage(requestedIndex);

        if (index != -1) {
            this.canvas.style.transform = `translate3d(${drawX / this.pixelRatio}px,0,0)`;
            this.ctx.drawImage(
                this.sequenceImages[index],
                0,
                drawY,
                drawWidth,
                drawHeight
            );
        }

        const needsDrawShirt = index >= 50;
        if (needsDrawShirt && this.shirtImage) {
            const offset = this.normalizeRange(this.progress, 0.66, 0.675, 3, 0);
            if (offset < 3) {
                const offsetIndex = index - Math.floor(offset);
                const pose = shirtPoses[Math.min(offsetIndex, 67)];
                const clipY = Math.max(pose.clip, 0) * this.shirtImage.height;
                const shirtWidth = drawWidth * 0.54;
                const shirtHeight = shirtWidth  * this.shirtImage.height / this.shirtImage.width;
                const offsetY = Math.max(-pose.clip, 0) * shirtHeight;

                if (pose.opacity != undefined) this.ctx.globalAlpha = pose.opacity;
                this.ctx.drawImage(
                    this.shirtImage,
                    0,
                    clipY,
                    this.shirtImage.width,
                    this.shirtImage.height - clipY,
                    drawWidth * 0.21,
                    drawY + drawHeight + offsetY,
                    shirtWidth,
                    shirtHeight * (1 - Math.max(pose.clip, 0))
                );
                this.ctx.globalAlpha = 1;
            }
        }

        // 0.10 -> 0.15 1 in
        // 0.15 -> 0.30 1 hold
        // 0.30 -> 0.35 1 out
        this.setText(this.openText, this.progress, 0.1, 0.15, 0.3, 0.35);

        this.setText(this.effortText, this.progress, 0.45, 0.5, 0.65, 0.7);
        this.setIndicators(this.positionReferenceThree, this.progress, 0.45, 0.5, 0.65, 0.675);

        this.setText(this.transferText, this.progress, 0.7, 0.75, 999, 999);

        this.drawnProgress = this.progress;
        // if we had to draw a different frame, redraw next frame
        // if we needed to draw the shirt and couldn't, redraw next frame
        // if we needed to draw a SVG and couldn't, redraw next frame
        this.forceDraw = (requestedIndex != index) || (needsDrawShirt && !this.shirtImage) || needsMissingSvg;

        if (!this.isPaused) {
            this.isAnimating = true;
            return requestAnimationFrame(this.onAnimationFrame);
        }
        else {
            this.isAnimating = false;
        }
    };

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

    this.onShirtImageLoaded = (e) => {
        const img = e.target;
        if (window.createImageBitmap) {
            const finish = () => {
                createImageBitmap(img).then((bmp) => {
                    this.shirtImage = bmp;
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
            this.shirtImage = img;
        }
    };

    this.onSvgImageLoaded = (e) => {
        const img = e.target;

        if (window.createImageBitmap) {
            const finish = () => {
                createImageBitmap(img, {
                    resizeWidth: img.width * this.pixelRatio,
                    resizeHeight: img.height * this.pixelRatio
                }).then((bmp) => {
                    this.svgBitmaps[img.index] = bmp;
                    this.svgsLoaded++;

                    this.loadSvgImage(img);
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
            // if createImageBitmap is not available, better to not draw SVGs to canvas
        }
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

    // Deferred constructor
    const construct = () => {
        this.section = section;
        this.bgColor = "#f0f0f0";

        this.positionReferenceOne = section.getElementsByClassName("position-reference-one")[0];
        this.positionReferenceTwo = section.getElementsByClassName("position-reference-two")[0];
        this.positionReferenceThree = section.getElementsByClassName("position-reference-three")[0];
        this.positionReferenceFour = section.getElementsByClassName("position-reference-four")[0];

        this.canvas = section.getElementsByClassName("product-canvas")[0];
        this.ctx = this.canvas.getContext("2d");

        this.openText = section.getElementsByClassName("open-text")[0];
        this.effortText = section.getElementsByClassName("effort-text")[0];
        this.transferText = section.getElementsByClassName("transfer-text")[0];

        this.drawnProgress = -1;
        this.progress = 0;

        const concurrentLoads = 5;
        this.sequenceImageLoaders = Array(concurrentLoads);
        for (let i = 0; i < concurrentLoads; i++) {
            this.sequenceImageLoaders[i] = new Image();
            this.sequenceImageLoaders[i].indexOffset = i / (concurrentLoads - 1);
            this.sequenceImageLoaders[i].addEventListener("load", this.onSequenceImageLoaded);
        }

        this.shirtLoader = new Image();
        this.shirtLoader.addEventListener("load", this.onShirtImageLoaded);

        this.sequenceContainer = section.getElementsByClassName("vulcan-product-images")[0];
        this.sequenceDataElems = [...this.sequenceContainer.getElementsByClassName("sequence-images")[0].getElementsByClassName("sequence-image-data")];
        this.shirtUnderlayElem = this.sequenceContainer.getElementsByClassName("shirt-underlay")[0].getElementsByClassName("sequence-image-data")[0];

        this.sourceRef = section.getElementsByClassName("source-ref")[0];
        this.sourceRefImg = this.sourceRef.getElementsByTagName("img")[0];
        this.sourceRefUrls = [...this.sourceRef.getElementsByTagName("source"), this.sourceRefImg].map(s => s.src || s.srcset);

        this.backgroundSVGContainer = section.getElementsByClassName("vulcan-background-svgs")[0];
        this.backgroundSVGs = [...this.backgroundSVGContainer.getElementsByTagName("img")];
        this.svgLoader = new Image();
        this.svgLoader.addEventListener("load", this.onSvgImageLoaded);

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

        document.addEventListener("visibilitychange", this.onVisibilityChange, false);
        window.addEventListener("focus", this.onFocus, false);
        window.addEventListener("blur", this.onBlur, false);
    };

    if (scrollY < innerHeight) {
        if (window.requestIdleCallback) {
            requestIdleCallback(construct);
        }
        else {
            setTimeout(construct, 1500);
        }
    }
    else {
        construct();
    }
}

$(document).ready(function () {
    const vulcanProductSequences = document.querySelectorAll(".vulcan-product-sequence");
    vulcanProductSequences.forEach(vulcanProductSequence => new VulcanProductSequence(vulcanProductSequence));
});