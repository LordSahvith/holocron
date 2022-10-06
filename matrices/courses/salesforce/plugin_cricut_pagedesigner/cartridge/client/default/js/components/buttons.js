'use strict';

// eslint-disable-next-line require-jsdoc
function someFunction() {
    // console.log('clicked:', el);
}

$(document).ready(function () {
    let buttons = document.querySelectorAll('[data-target]');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            someFunction(this);
        });
    });
});
