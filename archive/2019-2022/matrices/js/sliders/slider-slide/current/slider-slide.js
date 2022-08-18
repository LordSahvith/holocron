(function ($) {
    $(document).ready(function () {
        var sliderWrapperQS = $($(window).outerWidth() < 768) ? '#quickSwap .slider-wrapper' : '#quickSwap .tabs-wrapper';
        var initialSlideLengthQS = ($(window).outerWidth < 768) ? $(sliderWrapperQS + ' .slide').length : $(sliderWrapperQS + ' .slide').length;
        var slides = $(sliderWrapperQS + ' .slide');
        var slidesCopy = [];
        var currentSlideQS = 0;
        var initialLeftPercentage;
        var slideDistance = 0;
        var tabMargin = 15;
        var beenEngagedQS = false;
        var firstClick;
        var intervalQS;
        var hasFadedQS;

        $(window).on('resize', function () {
            sliderSetup();
            setLeftPosition();
            createDots();
            startInterval();
        });

        function sliderSetup() {
            if ($(window).outerWidth() < 768) {
                sliderWrapperQS = '#quickSwap .slider-wrapper';
                slides = $(sliderWrapperQS + ' .slide');
                $(sliderWrapperQS + ' .slide').removeClass('fadeOut');
                firstClick = false;
                hasFadedQS = false;
                beenEngagedQS = false;
            } else if ($(window).outerWidth() < 992) {
                tabMargin = 15;
                sliderWrapperQS = '#quickSwap .tabs-wrapper';
                slides = $(sliderWrapperQS + ' .slide');
                firstClick = true;
                beenEngagedQS = false;
                addCopiedSlides();
                fadeOutSlides();
            } else {
                tabMargin = 15;
                sliderWrapperQS = '#quickSwap .tabs-wrapper';
                slides = $(sliderWrapperQS + ' .slide');
                firstClick = true;
                beenEngagedQS = false;
                addCopiedSlides();
                fadeOutSlides();
            }
        }

        function fadeOutSlides() {
            if (!hasFadedQS) {
                $('#quickSwap .slider-wrapper .slide').addClass('fadeOut');
                $('#quickSwap .slider-wrapper .slide').first().removeClass('fadeOut').addClass('fadeIn');
                hasFadedQS = true;
            }
        }

        // listens for click on next/prev buttons
        $('#quickSwap .button').on('click', function () {
            // checks what was clicked prev or next
            var direction = ($(this).hasClass("prev")) ? -1 : 1;
            currentSlideQS += direction;
            currentIndex();
            if (direction === -1) {
                if (!firstClick) {
                    if ($(window).outerWidth() < 768) {
                        slideLeft();
                        beenEngagedQS = true;
                    } else {
                        if ($(window).outerWidth() < 992) {
                            beenEngagedQS = true;
                        }
                        tabSlideTo(true);
                    }
                }
            } else {
                if ($(window).outerWidth() < 768) {
                    slideRight();
                    beenEngagedQS = true;
                } else {
                    if ($(window).outerWidth() < 992) {
                        beenEngagedQS = true;
                    }
                    tabSlideTo(false);
                }
            }
            startInterval();
            activeDot(currentSlideQS);
        });

        $('#quickSwap .slider-selector').on('click', { sliderObj: $(event) }, function (event) {
            let slideNumber = Number($(event.target).attr('data-selector'));
            // let target = $(event.target).attr('data-target');
            if (!$(event.target).hasClass('slider-selector')) {
                if ($(window).outerWidth() < 768) {
                    slideTo(slideNumber);
                    beenEngagedQS = true;
                }
            }
            startInterval();
        });

        $('#quickSwap .slider-tab').on('click', { sliderObj: $(event) }, function (event) {
            let slideNumber = Number($(event.target).attr('data-selector'));
            // let target = $(event.target).attr('data-target');
            if (!$(event.target).hasClass('slider-selector')) {
                if ($(window).outerWidth() < 992) {
                    beenEngagedQS = true;
                }
                activeImage(slideNumber);
            }
            startInterval();
        });

        // listens for swipe to right
        $(sliderWrapperQS).on('swiperight', function () {
            if ($(window).outerWidth() < 768) {
                slideLeft(true);
                beenEngagedQS = true;
            } else {
                if ($(window).outerWidth() < 992) {
                    beenEngagedQS = true;
                }
                tabSlideTo(true);
            }
            startInterval();
        });

        // listens for swipe to left
        $(sliderWrapperQS).on('swipeleft', function () {
            if ($(window).outerWidth() < 768) {
                slideRight(true);
                beenEngagedQS = true;
            } else if ($(window).outerWidth() < 992) {
                tabSlideTo(false);
                beenEngagedQS = true;
            } else {
                tabSlideTo(false);
            }
            startInterval();
        });

        // starts/stops interval on hover/leave
        $('#quickSwap .slider-viewport').hover(function () {
            stopInterval();
        }, function () {
            startInterval();
        });

        // stops intervalQS
        function stopInterval() {
            clearInterval(intervalQS);
        }

        // resets intervalQS
        function startInterval() {
            stopInterval();
            if ($(window).outerWidth() < 768 && !beenEngagedQS) {
                intervalQS = setInterval(function () {
                    slideRight(true);
                    beenEngagedQS = true;
                }, 4000);
            } else if ($(window).outerWidth() < 992 && !beenEngagedQS) {
                intervalQS = setInterval(function () {
                    tabSlideTo(false);
                    currentIndex();
                    activeDot(currentSlideQS);
                    activeImage(currentSlideQS);
                    currentSlideQS++;
                }, 4000);
            } else if (!beenEngagedQS) {
                intervalQS = setInterval(function () {
                    tabSlideTo(false);
                    currentIndex();
                    activeDot(currentSlideQS);
                    activeImage(currentSlideQS);
                    currentSlideQS++;
                }, 4000);
            }
        }

        function slideRight(isInterval) {
            if (isInterval) {
                currentSlideQS++;
                currentIndex();
                activeDot(currentSlideQS);
            }
            let middle;
            slides = $(sliderWrapperQS + ' .slide');

            // clone middle slide          
            middle = slides[Math.round((slides.length - 1) / 2)];

            // set 1st slide's width to 0%
            $('#quickSwap .slide:first .mediaText').css('display', 'none');
            slides.first().removeClass('fullWidth').addClass('noWidth');
            slides.first().one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                function () {
                    // delete first slide
                    slides.first().remove();

                    // append clone to end of slides
                    slides.last().after($(middle).clone(true));
                });
            if ($(window).outerWidth() >= 768) {
                firstClick = false;
            }
        }

        function slideLeft(isInterval) {
            if (isInterval) {
                currentSlideQS--;
                currentIndex();
                activeDot(currentSlideQS);
            }
            let middle;
            // clone middle slide          
            slides = $(sliderWrapperQS + ' .slide');
            middle = slides[Math.round((slides.length - 1) / 2)];

            // set width of clone to 0%
            middle = $(middle).clone(true);

            // prepend clone to front
            slides.first().before(middle);

            // set width of first slide to 100%
            slides = $(sliderWrapperQS + ' .slide');
            slides.first().removeClass('noWidth').addClass('fullWidth');

            // delete last slide
            slides.last().remove();
        }

        function slideTo(targetSlide) {
            let distance = targetSlide - currentSlideQS;
            if (distance < 0) {
                if (distance === -(initialSlideLengthQS - 1)) {
                    for (let i = 0; i < 1; i++) {
                        slideRight();
                    }
                } else {
                    for (let i = distance; i < 0; i++) {
                        slideLeft();
                    }
                }
            } else {
                if (distance === initialSlideLengthQS - 1) {
                    for (let i = 0; i < 1; i++) {
                        slideLeft();
                    }
                } else if (distance === 1) {
                    slideRight();
                } else {
                    let leftPercentage = ((initialSlideLengthQS - 1) * 100);
                    let newDiff = distance;
                    let tabSlide = (100 * newDiff);
                    leftPercentage += tabSlide;
                    slides = $(sliderWrapperQS + ' .slide');
                    slides.each(function () {
                        slidesCopy = slides;
                    });
                    var j = initialSlideLengthQS - 1;
                    for (let i = slides.length - 1; i > initialSlideLengthQS - 2; i--) {
                        if (i !== slides.length - 1) {
                            $(sliderWrapperQS + ' .slide').last().after($(slidesCopy[j]).clone(true));
                            j++;
                        }
                    }
                    $(sliderWrapperQS).animate({ 'left': '-' + leftPercentage + '%' }, 1000, function () {
                        leftPercentage *= -1;
                        for (let i = 0; i < initialSlideLengthQS - 1; i++) {
                            slides = $(sliderWrapperQS + ' .slide');
                            $(sliderWrapperQS + ' .slide').first().remove();
                            leftPercentage += 100;
                            $('#quickSwap .slider-wrapper').css('left', leftPercentage + '%');
                        }
                    });
                }
            }
            // currentIndex();
            currentSlideQS = targetSlide;
            activeDot(targetSlide);
        }

        function tabSlideTo(isLeft) {
            if (isLeft) {
                let leftPercentage = $(sliderWrapperQS + ' .slide').outerWidth() + tabMargin;
                slideDistance += leftPercentage;
                initialLeftPercentage += leftPercentage;
                $(sliderWrapperQS).animate({ 'left': initialLeftPercentage + 'px' }, 1000, function () {
                    let middle;
                    slides = $(sliderWrapperQS + ' .slide');

                    // clone middle slide          
                    middle = slides[Math.round((slides.length - 1) / 2)];
                    // append clone to end of slides
                    slides.first().before($(middle).clone(true));
                    initialLeftPercentage += -$(sliderWrapperQS + ' .slide').outerWidth() + tabMargin;
                    $(sliderWrapperQS).css('left', initialLeftPercentage);
                    // delete first slide
                    slides.last().remove();
                });
            } else {
                let leftPercentage = $(sliderWrapperQS + ' .slide').outerWidth() + tabMargin;
                initialLeftPercentage += -leftPercentage;
                let middle;
                slides = $(sliderWrapperQS + ' .slide');

                // clone middle slide          
                middle = slides[Math.round((slides.length - 1) / 2)];
                // append clone to end of slides
                slides.last().after($(middle).clone(true));
                $(sliderWrapperQS).animate({ 'left': initialLeftPercentage + 'px' }, 1000, function () {
                    slides.first().remove();
                    initialLeftPercentage += $(sliderWrapperQS + ' .slide').outerWidth() + tabMargin;
                    $(sliderWrapperQS).css('left', initialLeftPercentage);
                });
                if ($(window).outerWidth() >= 768) {
                    firstClick = false;
                }
            }
        }

        // keeps currentSlideQS at the same 'index' as the sliders
        function currentIndex() {
            var cycle = !!(currentSlideQS <= 0 || currentSlideQS === initialSlideLengthQS);
            if (cycle) {
                if (currentSlideQS < 0) {
                    currentSlideQS = initialSlideLengthQS - 1;
                } else if (currentSlideQS === initialSlideLengthQS) {
                    currentSlideQS = 0;
                }
            }
        }

        /**
         * sets left position of slide container
         * dynamically depending how many slides
         * there are
         */
        function setLeftPosition() {
            let leftPercentage = (-(initialSlideLengthQS - 1) * 100);
            initialLeftPercentage = leftPercentage;
            leftPercentage += '%';
            if ($(window).outerWidth() < 768) {
                $(sliderWrapperQS).css('left', leftPercentage);
            } else {
                // leftPercentage = (-(slides.length - 2) * ($(sliderWrapperQS + ' .slide').outerWidth() + tabMargin));
                // leftPercentage = 0;
                leftPercentage = -($(sliderWrapperQS + ' .slide').outerWidth() + tabMargin);
                initialLeftPercentage = leftPercentage;
                leftPercentage += 'px';
                $('#quickSwap .tabs-wrapper').css('left', leftPercentage);
                $('#quickSwap .slider-wrapper').css('left', '0%');
            }
        }

        /**
         * add slides to array and then
         * prepend all but the first
         * one to the front
         */
        function addCopiedSlides() {
            slides = $(sliderWrapperQS + ' .slide');
            slides.each(function () {
                slidesCopy = slides;
            });

            for (let i = 0; i < slides.length; i++) {
                if (i > initialSlideLengthQS) {
                    slides[i].remove();
                }
            }

            if ($(window).outerWidth() < 768) {
                for (let i = 1; i < slidesCopy.length; i++) {
                    slides.first().before($(slidesCopy[i]).clone(true));
                }
            } else {
                for (let i = 1; i < slidesCopy.length * 2; i++) {
                    slides.first().before($(slidesCopy[i]).clone(true));
                }
            }
            setLeftPosition();
        }

        // create dots and adds them to page
        function createDots() {
            $('#quickSwap .slider-dots').empty();
            if ($(window).outerWidth() < 768) {
                setDots(1);
            } else if ($(window).outerWidth() < 992) {
                setDots(4);
            } else {
                setDots(5);
            }
        }

        // controls how many dots show up
        function setDots(dotIncrement) {
            if (dotIncrement !== initialSlideLengthQS) {
                for (let i = 0; i < initialSlideLengthQS; i += dotIncrement) {
                    // gives first dot class of active
                    if (i === 0) {
                        $('#quickSwap .slider-dots').append('<div class="slider-dot active" data-target="#slider1" data-selector="' + i + '"></div>');
                    } else {
                        $('#quickSwap .slider-dots').append('<div class="slider-dot" data-target="#slider1" data-selector="' + i + '"></div>');
                    }
                }
            }
        }

        // sets active dot that correlates to slide being displayed
        function activeDot(slideIndex) {
            let prev = $('#quickSwap .slider-dot.active');
            let currentSlideQS = $('#quickSwap .slider-dot[data-selector="' + slideIndex + '"]');
            prev.removeClass('active');
            currentSlideQS.addClass('active');
        }

        // sets active tab that correlates to slide being displayed
        function activeTab(slideIndex) {
            let prev = $('#quickSwap .slider-tab.active');
            let currentSlideQS = $('#quickSwap .slider-tab[data-selector="' + slideIndex + '"]');
            prev.removeClass('active');
            currentSlideQS.addClass('active');
        }

        // sets active image that correlates to slide being displayed
        function activeImage(slideIndex) {
            let prev = $('#quickSwap .slider-wrapper .slide.fadeIn');
            let currentSlideQS = $('#quickSwap .slider-wrapper .slide[data-slide="' + slideIndex + '"]');
            prev.removeClass('fadeIn').addClass('fadeOut');
            currentSlideQS.removeClass('fadeOut').addClass('fadeIn');
            activeTab(slideIndex);
        }

        function init() {
            addCopiedSlides();
            sliderSetup();
            createDots();
            startInterval();
        }

        init();
    });
})(jQuery);