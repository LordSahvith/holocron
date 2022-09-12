'use strict';

var debounce = require('lodash/debounce');
const isDesktopSize = 623; // actually breaks at 641

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const pauseButton = `
    <div class="icon-wrapper">
        <svg width="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g class="play-pause-icon">
                <line x1="15.5" y1="12" x2="15.5" y2="25" stroke="black"></line>
                <line x1="20.5" y1="12" x2="20.5" y2="25" stroke="black"></line>
            </g>
        </svg>
    </div>
`;
const playButton = `
    <div class="icon-wrapper">
        <svg width="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g class="play-pause-icon">
                <path d="M23.5489 17.2871L15.2511 13.0911C14.9872 12.962 14.6723 12.9701 14.417 13.1153C14.1532 13.2606 14 13.5269 14 13.8093V22.1931C14 22.4755 14.1532 22.7418 14.417 22.887C14.5532 22.9597 14.7064 23 14.8511 23C14.9872 23 15.1234 22.9677 15.2511 22.9032L23.5489 18.7072C23.8298 18.5701 24 18.2957 24 17.9972C24 17.6986 23.8298 17.4323 23.5489 17.2871Z" fill="black"></path>
            </g>
        </svg>
    </div>
`;

/**
 * Toggles inline video of specified video button
 * @param {Object} button
 * HTML button element that targets video element
 */
function toggleVideo(button) {
    let videoContainer = button.parentNode.parentNode;
    let video = videoContainer.querySelector('.video-container video');

    if (video.paused) {
        video.play();
        button.innerHTML = pauseButton;
        button.setAttribute('aria-label', 'play');
    } else {
        video.pause();
        button.innerHTML = playButton;
        button.setAttribute('aria-label', 'pause');
    }
}

/**
 * Sets the video source url for desktop / mobile
 * @param {Element} videoContainer the video container element
 */
function setVideoSource(videoContainer) {
    var isDesktop = $(window).innerWidth() > isDesktopSize;
    let $video = $(videoContainer).children('video');
    let $src = $video.find('source');
    let desktopSrc = $video.data('videodesktop');
    let mobileSrc = $video.data('videomobile');

    if (isDesktop) {
        if (desktopSrc) {
            $src.attr('src', desktopSrc);
        }
    } else {
        if (mobileSrc) {
            $src.attr('src', mobileSrc);
        } else if (desktopSrc) {
            $src.attr('src', desktopSrc);
        }
    }

    $video[0].load();
}

/**
 * Creates the apporpriate hooks for Textural Videos
 * @param {HTML} videoSection
 * Video section to be controlled
 */
function TexturalVideoSection(videoSection) {
    let texturalVideo = videoSection;
    let videoContainer = texturalVideo.querySelector('.video-container');

    if (!texturalVideo.classList.contains('textural-image')) {
        // initialize and swap video source as needed
        $(window).on('load', function() {
            setVideoSource(videoContainer);
        });

        $(window).on('resize', debounce(function () {
            setVideoSource(videoContainer);
        }, 100));

        let videoButton = texturalVideo.querySelector('[data-toggle="texturalVideo"]');
        videoButton.addEventListener('click', function () {
            toggleVideo(this);
        });

        // Handle video playing
        ScrollTrigger.create({
            trigger: texturalVideo,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: function() {toggleVideo(videoButton);},
            onEnterBack: function() {toggleVideo(videoButton);},
            onLeave: function() {toggleVideo(videoButton);},
            onLeaveBack: function() {toggleVideo(videoButton);}
        });
    }

    let videoTexts = texturalVideo.querySelectorAll('.video-text');
    const length = videoTexts.length > 3 ? videoTexts.length : 3;
    texturalVideo.style.height = `${100 * length}vh`;

    // Handle the scrubbed animation
    const tl = gsap
        .timeline({
            scrollTrigger: {
                trigger: texturalVideo,
                start: `${(1 / length) * 2 * 100}% 100%`,
                end: 'bottom bottom',
                scrub: true,
            },
        })
        .to(videoContainer, { clipPath: 'inset(0px)' });

    videoTexts.forEach((text, i) => {
        if (i !== 0) {
            // Fade out previous
            tl.to(videoTexts[i - 1], { opacity: 0 }, '+=0.2');
        }

        // Fade in current
        tl.from(videoTexts[i], { opacity: 0 });
    });

    // Add some space to the end
    tl.to({}, {});
}

$(document).ready(function () {
    let videoSections = document.querySelectorAll('.textural-video');

    videoSections.forEach((video) => {
        TexturalVideoSection(video);
    });
});
