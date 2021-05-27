"use strict";

const accordionComponent = {
    /**
     * Animates slide functionality on given element
     * @param {*} evt 
     * event to prevent certain default functionality
     * @param {*} container 
     * Parent element of slidable content
     */
     accordionToggle: function (evt, accordion, button) {
        // prevent a tags for cwg-accordion elements
        if (accordion.nodeName.toLowerCase() === 'a') {
            console.error('Accordions should not be an <a> tag.', accordion);
            evt.preventDefault();
            return;
        }

        let containerContent = accordion.querySelector('.cwg-accordion-content');
        let caret = accordion.querySelector('svg.caret');
        if (caret !== null && caret !== undefined && caret !== '') {
            caret.classList.toggle('isOpen');
        }

        let height = '';

        if (!accordion.classList.contains('isOpen')) {
            accordion.classList.add('isOpen');
            button.setAttribute('aria-expanded', true);
            containerContent.style.height = 'auto';

            height = `${containerContent.clientHeight}px`;

            containerContent.style.height = '0px';

            setTimeout(() => {
                containerContent.style.height = height;
            }, 25);

            containerContent.addEventListener('transitionend', () => {
                containerContent.style.height = 'auto';
            }, {
                once: true
            });
        } else {
            height = `${containerContent.clientHeight}px`;
            containerContent.style.height = height;
            setTimeout(() => {
                containerContent.style.height = '0px';
            }, 25);

            containerContent.addEventListener('transitionend', () => {
                accordion.classList.remove('isOpen');
                button.setAttribute('aria-expanded', false);
            }, {
                once: true
            });
        }
    },

    setEventListeners: function () {
        const accordions = document.querySelectorAll('.cwg-accordion');

        accordions.forEach(accordion => {
            let accordionTitle = accordion.querySelector('.cwg-accordion-title');

            accordionTitle.addEventListener('click', (e) => {
                this.accordionToggle(e, accordion, accordionTitle);
            });

            accordionTitle.addEventListener('keydown', (e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    if (e.key === ' ') {
                        e.preventDefault();
                    }
                    this.accordionToggle(e, accordion, accordionTitle);
                }
            });
        });
    }
};
