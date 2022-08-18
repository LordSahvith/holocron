function Slider(sliderContainer, mobileOnly, autoPlay) {
    this.sliderContainer = sliderContainer;
    this.mobileOnly = mobileOnly;
    this.autoPlay = autoPlay;
    this.sliderIndex = 1;
    this.listeners = function () {
        $(this.sliderContainer + ' .slider-selector').on('click', { sliderObj: this }, function (event) {
            let slide = Number($(event.target).attr('data-selector'));
            let target = $(event.target).attr('data-target');
            if (!$(event.target).hasClass('slider-selector')) {
                let currentIndex = event.data.sliderObj.setIndex(slide);
                event.data.sliderObj.showSlide(target, currentIndex, false);
                event.data.sliderObj.startInterval();
            }
        });

        $(this.sliderContainer + ' .slider-switch').on('click', { sliderObj: this }, function (event) {
            let slide = Number($(event.target).attr('data-switch'));
            let target = $(event.target).attr('data-target');
            console.log(event.target);
            if (!$(event.target).hasClass('slider-switch')) {
                let currentIndex = event.data.sliderObj.getIndex();
                let newIndex = currentIndex += slide;
                event.data.sliderObj.setIndex(newIndex);
                event.data.sliderObj.showSlide(target, newIndex, false);
                event.data.sliderObj.startInterval();
            }
        });
    };
    this.getIndex = function () {
        return this.sliderIndex;
    };
    this.setIndex = function (slide) {
        this.sliderIndex = slide;
    };
    this.showSlide = function (target, index, start) {
        var i;
        var myIndex = index;
        var images = $(target + " .slider-content.slider-images").children();
        var text = $(target + " .slider-content.slider-text-wrapper").children();
        var dots = $(target + " .slider-selector.slider-dots").children();
        var tabs = $(target + " .slider-selector.slider-tabs").children();
        // console.log(target, $(target + " .slider-content.slider-images"));
        // console.log(this.sliderIndex, myIndex, target, $(target));
        if (start) {
            myIndex++;
        } else {
            myIndex = this.sliderIndex;
        }
        if (myIndex > images.length) { this.sliderIndex = 1; }
        if (myIndex < 1) { this.sliderIndex = images.length; }
        for (i = 0; i < images.length; i++) {
            $(images[i]).removeClass('fadeIn').addClass('fadeOut');
            $(text[i]).removeClass('fadeIn').addClass('fadeOut');
        }
        for (i = 0; i < dots.length; i++) {
            $(dots[i]).removeClass('active');
            $(tabs[i]).removeClass('active');
        }
        // console.log("myIndex=" + myIndex, "sliderIndex=" + this.sliderIndex);
        $(images[this.sliderIndex - 1]).removeClass('hide fadeOut').addClass('fadeIn');
        $(text[this.sliderIndex - 1]).removeClass('hide fadeOut').addClass('fadeIn');
        // console.log(this.sliderContainer, content[this.sliderIndex - 1]);
        $(dots[this.sliderIndex - 1]).addClass('active');
        $(tabs[this.sliderIndex - 1]).addClass('active');
    };
    this.stopInterval = function () {
        clearInterval(this.interval);
    };
    this.startInterval = function () {
        this.stopInterval();
        if (this.autoPlay) {
            this.interval = setInterval(function (t) { t.showSlide(t.sliderContainer, t.sliderIndex++, false); }, 3000, this);
        }
    };
    this.init = function () {
        this.listeners();
        this.startInterval();
        this.showSlide(this.sliderContainer, this.sliderIndex, false);
    };
}



// class Slider {
//     constructor(sliderContainer, mobileOnly, autoPlay) {
//         this.sliderContainer = sliderContainer;
//         this.mobileOnly = mobileOnly;
//         this.autoPlay = autoPlay;
//         this.sliderIndex = 1;

//         $(this.sliderContainer + ' .slider-selector').on('click', {sliderObj:this}, function (event) {
//             let slide = Number($(event.target).attr('data-selector'));
//             let target = $(event.target).attr('data-target');
//             if (!$(event.target).hasClass('slider-selector')) {
//                 let currentIndex = event.data.sliderObj.index = slide;
//                 event.data.sliderObj.index = currentIndex;
//                 event.data.sliderObj.showSlide(target, currentIndex, false);
//                 event.data.sliderObj.startInterval();
//             }
//         });

//         $(this.sliderContainer + ' .slider-switch').on('click', {sliderObj:this}, function (event) {
//             let slide = Number($(event.target).attr('data-switch'));
//             let target = $(event.target).attr('data-target');
//             // console.log(target);
//             if (!$(event.target).hasClass('slider-switch')) {
//                 let currentIndex = event.data.sliderObj.index += slide;
//                 event.data.sliderObj.index = currentIndex;
//                 event.data.sliderObj.showSlide(target, currentIndex, false);
//                 event.data.sliderObj.startInterval();
//             }
//         });
//     }

//     get index() {
//         return this.sliderIndex;
//     }

//     set index(slide) {
//         this.sliderIndex = slide;
//     }

//     showSlide(target, index, start) {
//         var i;
//         var myIndex = index;
//         var images = $(target + " .slider-content.slider-images").children();
//         var text = $(target + " .slider-content.slider-text-wrapper").children();
//         var dots = $(target + " .slider-selector.slider-dots").children();
//         var tabs = $(target + " .slider-selector.slider-tabs").children();
//         // console.log(target, $(target + " .slider-content.slider-images"));
//         // console.log(this.sliderIndex, myIndex, target, $(target));
//         if (start) {
//             myIndex++;
//         } else {
//             myIndex = this.sliderIndex;
//         }
//         if (myIndex > images.length) { this.sliderIndex = 1; }
//         if (myIndex < 1) { this.sliderIndex = images.length; }
//         for (i = 0; i < images.length; i++) {
//             $(images[i]).removeClass('fadeIn').addClass('fadeOut');
//             $(text[i]).removeClass('fadeIn').addClass('fadeOut');
//         }
//         for (i = 0; i < dots.length; i++) {
//             $(dots[i]).removeClass('active');
//             $(tabs[i]).removeClass('active');
//         }
//         // console.log("myIndex=" + myIndex, "sliderIndex=" + this.sliderIndex);
//         $(images[this.sliderIndex - 1]).removeClass('hide fadeOut').addClass('fadeIn');
//         $(text[this.sliderIndex - 1]).removeClass('hide fadeOut').addClass('fadeIn');
//         // console.log(this.sliderContainer, content[this.sliderIndex - 1]);
//         $(dots[this.sliderIndex - 1]).addClass('active');
//         $(tabs[this.sliderIndex - 1]).addClass('active');
//     }

//     // setEventListeners() {

//     // }

//     stopInterval() {
//         clearInterval(this.interval);
//     }

//     startInterval() {
//         // setEventListeners();
//         this.stopInterval();
//         this.showSlide(this.sliderContainer, this.sliderIndex, false);
//         if (this.autoPlay) {
//             this.interval = setInterval(function (t) { t.showSlide(t.sliderContainer, t.sliderIndex++, false); }, 3000, this);
//         }
//     }
// }