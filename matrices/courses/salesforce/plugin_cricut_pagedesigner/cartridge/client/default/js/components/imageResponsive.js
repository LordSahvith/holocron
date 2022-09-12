'use strict';



$(document).ready(function () {

    const responsiveImageWrappers = document.querySelectorAll('.js-responsive-image-wrapper');
    responsiveImageWrappers.forEach(wrapper => {
        if(!wrapper.closest('.editorial-gallery-item')) {
            $(wrapper).addClass('js-image-position-relative');
        }
    });
});
