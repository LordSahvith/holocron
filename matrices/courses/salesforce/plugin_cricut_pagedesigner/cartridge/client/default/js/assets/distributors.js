'use-strict';

const COUNTRY_CARD = document.querySelector('.cwg-card');
const COUNTRY_SECTION_TOGGLE_BUTTON = document.querySelector('.cwg-toggle-button');
let showHideButton = COUNTRY_SECTION_TOGGLE_BUTTON.querySelector('.showAllHideAll');
const COUNTRY_CODE = $('.cwg-vendorList-wrapper').data('country-code');
const accordionComponent = {

    /**
     * Animates slide functionality on given element
     * @param {Event} evt event to prevent certain default functionality
     * @param {Element} accordion Parent element of slidable content
     * @param {Element} button element to trigger accordion
     */
    accordionToggle: function (evt, accordion, button) {
        // prevent a tags for cwg-accordion elements
        if (accordion.nodeName.toLowerCase() === 'a') {
            evt.preventDefault();
            return;
        }
        let accordionFirstChild = accordion.firstElementChild;
        let containerContent = accordion.querySelector('.cwg-accordion-content');
        let caret = accordionFirstChild.querySelector('svg.caret');

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

/**
 * Toggles hide / show text
 */
function toggleHideShowText() {
    let showHideCopy = showHideButton.innerHTML.toLowerCase() === 'hide' ? 'Show' : 'Hide';

    showHideButton.innerHTML = showHideCopy;
}

/**
 * Toggles hide / show text
 */
function setEventListeners() {
    COUNTRY_SECTION_TOGGLE_BUTTON.addEventListener('click', () => toggleHideShowText());
    COUNTRY_SECTION_TOGGLE_BUTTON.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            if (e.key === ' ') {
                e.preventDefault();
            }
            toggleHideShowText();
        }
    });
}

/**
 * Displays the list of regions / distributors if the current region isn't WO
 */
function showCountries() {

    if(!COUNTRY_CODE || COUNTRY_CODE === 'WO') {
        accordionComponent.accordionToggle(null, COUNTRY_SECTION_TOGGLE_BUTTON.parentElement, showHideButton.parentElement);
        COUNTRY_SECTION_TOGGLE_BUTTON.classList.add('hidden');
        COUNTRY_CARD.classList.add('hidden');
        toggleHideShowText();
    }
}

$(document).ready(function () {
    setEventListeners();
    accordionComponent.setEventListeners();
    showCountries();
});
