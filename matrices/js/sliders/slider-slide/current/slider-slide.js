
(function ($) {
    $(document).ready(function () {
        var sliderWrapper = $($(window).outerWidth() < 768) ? '#suiteTools .slider-wrapper' : '#suiteTools .tabs-wrapper';
        var initialSlideLength = ($(window).outerWidth < 768) ? $(sliderWrapper + ' .slide').length : $(sliderWrapper + ' .slide').length;
        var slides = $(sliderWrapper + ' .slide');
        var slidesCopy = [];
        var currentSlide = 0;
        var initialLeftPercentage;
        var slideDistance = 0;
        var tabMargin = 22;
        var firstClick;
        var interval;
        var hasFaded;


        $(window).on('resize', function () {
            sliderSetup();
            setLeftPosition();
            createDots();
            startInterval();
        });

        function sliderSetup() {
            if ($(window).outerWidth() < 768) {
                sliderWrapper = '#suiteTools .slider-wrapper';
                slides = $(sliderWrapper + ' .slide');
                $(sliderWrapper + ' .slide').removeClass('fadeOut');
                firstClick = false;
                hasFaded = false;
            } else if ($(window).outerWidth() < 992) {
                tabMargin = 14;
                sliderWrapper = '#quickSwap .tabs-wrapper';
                slides = $(sliderWrapper + ' .slide');
                firstClick = true;
                // addCopiedSlides();
                fadeOutSlides();
            } else {
                sliderWrapper = '#suiteTools .tabs-wrapper';
                slides = $(sliderWrapper + ' .slide');
                firstClick = true;
                // addCopiedSlides();
                fadeOutSlides();
            }
        }

        function fadeOutSlides() {
            if (!hasFaded) {
                $('#suiteTools .slider-wrapper .slide').addClass('fadeOut');
                $('#suiteTools .slider-wrapper .slide').first().removeClass('fadeOut').addClass('fadeIn');
                hasFaded = true;
            }
        }

        // listens for click on next/prev buttons
        $('#suiteTools .button').on('click', function () {
            // checks what was clicked prev or next
            var direction = ($(this).hasClass("prev")) ? -1 : 1;
            currentSlide += direction;
            currentIndex();
            if (direction === -1) {
                if (!firstClick) {
                    if ($(window).outerWidth() < 768) {
                        slideLeft();
                    } else {
                        tabSlideTo(true);
                    }
                }
            } else {
                if ($(window).outerWidth() < 768) {
                    slideRight();
                } else {
                    tabSlideTo(false);
                }
            }
            activeDot(currentSlide);
        });

        $('#suiteTools .slider-selector').on('click', { sliderObj: $(event) }, function (event) {
            let slideNumber = Number($(event.target).attr('data-selector'));
            // let target = $(event.target).attr('data-target');
            if (!$(event.target).hasClass('slider-selector')) {
                if ($(window).outerWidth() < 768) {
                    slideTo(slideNumber);
                } else {
                    activeImage(slideNumber);
                }
            }
        });

        // listens for swipe to right
        $(sliderWrapper).on('swiperight', function () {
            if ($(window).outerWidth() < 768) {
                slideLeft(true);
            } else {
                tabSlideTo(true);
            }
        });

        // listens for swipe to left
        $(sliderWrapper).on('swipeleft', function () {
            if ($(window).outerWidth() < 768) {
                slideRight(true);
            } else {
                tabSlideTo(false);
            }
        });

        // starts/stops interval on hover/leave
        $('#suiteTools .slider-viewport').hover(function () {
            stopInterval();
        }, function () {
            startInterval();
        });

        // stops interval
        function stopInterval() {
            clearInterval(interval);
        }

        // resets interval
        function startInterval() {
            stopInterval();
            if ($(window).outerWidth() < 768) {
                interval = setInterval(function () { slideRight(true); }, 3000);
            } else {
                interval = setInterval(function () {
                    // tabSlideTo(false);
                    currentIndex();
                    activeDot(currentSlide);
                    activeImage(currentSlide);
                    currentSlide++;
                }, 3000);
            }
        }

        function slideRight(isInterval) {
            if (isInterval) {
                currentSlide++;
                currentIndex();
                activeDot(currentSlide);
            }
            let middle;
            slides = $(sliderWrapper + ' .slide');

            // clone middle slide          
            middle = slides[Math.round((slides.length - 1) / 2)];

            // set 1st slide's width to 0%
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
                currentSlide--;
                currentIndex();
                activeDot(currentSlide);
            }
            let middle;
            // clone middle slide          
            slides = $(sliderWrapper + ' .slide');
            middle = slides[Math.round((slides.length - 1) / 2)];

            // set width of clone to 0%
            middle = $(middle).clone(true);

            // prepend clone to front
            slides.first().before(middle);

            // set width of first slide to 100%
            slides = $(sliderWrapper + ' .slide');
            slides.first().removeClass('noWidth').addClass('fullWidth');

            // delete last slide
            slides.last().remove();
        }

        // handles siding for mobile dots
        function slideTo(targetSlide) {
            let distance = targetSlide - currentSlide;
            // slide left
            if (distance < 0) {
                // checks if its the last slide and goes backwards
                // otherwise go forward
                if (distance === -(initialSlideLength - 1)) {
                    for (let i = 0; i < 1; i++) {
                        slideRight();
                    }
                } else {
                    for (let i = distance; i < 0; i++) {
                        slideLeft();
                    }
                }
            } else {
                // checks if its the last slide and goes forwards
                if (distance === initialSlideLength - 1) {
                    for (let i = 0; i < 1; i++) {
                        slideLeft();
                    }
                } else if (distance === 1) {
                    slideRight();
                } else {
                    // handles how far to slide
                    let leftPercentage = ((initialSlideLength - 1) * 100);
                    let newDiff = distance;
                    let tabSlide = (100 * newDiff);
                    leftPercentage += tabSlide;
                    slides = $(sliderWrapper + ' .slide');
                    slides.each(function () {
                        slidesCopy = slides;
                    });
                    var j = initialSlideLength - 1;
                    for (let i = slides.length - 1; i > initialSlideLength - 2; i--) {
                        if (i !== slides.length - 1) {
                            $(sliderWrapper + ' .slide').last().after($(slidesCopy[j]).clone(true));
                            j++;
                        }
                    }
                    $(sliderWrapper).animate({ 'left': '-' + leftPercentage + '%' }, 1000, function () {
                        leftPercentage *= -1;
                        for (let i = 0; i < initialSlideLength - 1; i++) {
                            slides = $(sliderWrapper + ' .slide');
                            $(sliderWrapper + ' .slide').first().remove();
                            leftPercentage += 100;
                            $('#suiteTools .slider-wrapper').css('left', leftPercentage + '%');
                        }
                    });
                }
            }
            currentSlide = targetSlide;
            activeDot(targetSlide);
        }

        // handles sliding for tablet/desktop tabs
        function tabSlideTo(isLeft) {
            if (isLeft) {
                let leftPercentage = $(sliderWrapper + ' .slide').outerWidth() + tabMargin;
                // slideDistance += leftPercentage;
                initialLeftPercentage += leftPercentage;
                $(sliderWrapper).animate({ 'left': initialLeftPercentage + 'px' }, 1000, function () {
                    let middle;
                    slides = $(sliderWrapper + ' .slide');

                    // clone middle slide          
                    middle = slides[Math.round((slides.length - 1) / 2)];
                    // append clone to end of slides
                    slides.first().before($(middle).clone(true));
                    initialLeftPercentage += -$(sliderWrapper + ' .slide').outerWidth() - tabMargin;
                    $(sliderWrapper).css('left', initialLeftPercentage);
                    // delete first slide
                    slides.last().remove();
                });
            } else {
                let leftPercentage = $(sliderWrapper + ' .slide').outerWidth() + tabMargin;
                initialLeftPercentage += -leftPercentage;
                let middle;
                slides = $(sliderWrapper + ' .slide');

                // clone middle slide          
                middle = slides[Math.round((slides.length - 1) / 2)];
                // append clone to end of slides
                slides.last().after($(middle).clone(true));
                $(sliderWrapper).animate({ 'left': initialLeftPercentage + 'px' }, 1000, function () {
                    slides.first().remove();
                    initialLeftPercentage += $(sliderWrapper + ' .slide').outerWidth() + tabMargin;
                    $(sliderWrapper).css('left', initialLeftPercentage);
                });
                if ($(window).outerWidth() >= 768) {
                    firstClick = false;
                }
            }
        }

        // keeps currentSlide at the same 'index' as the sliders
        function currentIndex() {
            var cycle = !!(currentSlide <= 0 || currentSlide === initialSlideLength);
            if (cycle) {
                if (currentSlide < 0) {
                    currentSlide = initialSlideLength - 1;
                } else if (currentSlide === initialSlideLength) {
                    currentSlide = 0;
                }
            }
        }

        /**
         * sets left position of slide container
         * dynamically depending how many slides
         * there are
         */
        function setLeftPosition() {
            let leftPercentage = (-(initialSlideLength - 1) * 100);
            initialLeftPercentage = leftPercentage;
            leftPercentage += '%';
            if ($(window).outerWidth() < 768) {
                $(sliderWrapper).css('left', leftPercentage);
            } else {
                leftPercentage = 0;
                initialLeftPercentage = leftPercentage;
                leftPercentage += 'px';
                $('#suiteTools .slider-wrapper').css('left', '0%');
            }
        }

        /**
         * add slides to array and then
         * prepend all but the first
         * one to the front
         */
        function addCopiedSlides() {
            slides = $(sliderWrapper + ' .slide');
            // copy slides
            slides.each(function () {
                slidesCopy = slides;
            });

            // delete any duplicates
            // this is to ensure that 
            // copies aren't being 
            // duplicated more than 
            // necessary
            for (let i = 0; i < slides.length; i++) {
                if (i > initialSlideLength) {
                    slides[i].remove();
                }
            }

            // copies for mobile
            if ($(window).outerWidth() < 768) {
                for (let i = 1; i < slidesCopy.length; i++) {
                    slides.first().before($(slidesCopy[i]).clone(true));
                }
            } else {
                // copies for tablet/desktop
                for (let i = 1; i < slidesCopy.length * 2; i++) {
                    slides.first().before($(slidesCopy[i]).clone(true));
                }
            }
            setLeftPosition();
        }

        // create dots and adds them to page
        function createDots() {
            $('#suiteTools .slider-dots').empty();
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
            if (dotIncrement !== initialSlideLength) {
                for (let i = 0; i < initialSlideLength; i += dotIncrement) {
                    // gives first dot class of active
                    if (i === 0) {
                        $('#suiteTools .slider-dots').append('<div class="slider-dot active" data-target="#slider1" data-selector="' + i + '"></div>');
                    } else {
                        $('#suiteTools .slider-dots').append('<div class="slider-dot" data-target="#slider1" data-selector="' + i + '"></div>');
                    }
                }
            }
        }

        // sets active dot that correlates to slide being displayed
        function activeDot(slideIndex) {
            let prev = $('#suiteTools .slider-dot.active');
            let currentSlide = $('#suiteTools .slider-dot[data-selector="' + slideIndex + '"]');
            prev.removeClass('active');
            currentSlide.addClass('active');
        }

        // sets active tab that correlates to slide being displayed
        function activeTab(slideIndex) {
            let prev = $('#suiteTools .slider-tab.active');
            let currentSlide = $('#suiteTools .slider-tab[data-selector="' + slideIndex + '"]');
            prev.removeClass('active');
            currentSlide.addClass('active');
        }

        // sets active image that correlates to slide being displayed
        function activeImage(slideIndex) {
            let prev = $('#suiteTools .slider-wrapper .slide.fadeIn');
            let currentSlide = $('#suiteTools .slider-wrapper .slide[data-slide="' + slideIndex + '"]');
            prev.removeClass('fadeIn').addClass('fadeOut');
            currentSlide.removeClass('fadeOut').addClass('fadeIn');
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