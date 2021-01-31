const accordionIdentifier = '.bb-accordion';
const accordionButton = '.bb-accordion-button';
const accordionContent = '.bb-accordion-contents';
const accordions = document.querySelectorAll(accordionIdentifier);
let accordionsArray = [];

class Accordion {
    constructor(accordion) {
        this.button = accordion.querySelector(accordionButton);
        this.content = accordion.querySelector(accordionContent);
    }

    toggle() {
        toggle(this.content);
    }

    log() {
        console.log(this.button, this.content);
    }
}

function createAccordions(accordion) {
    accordionsArray.push(new Accordion(accordion));
}

function toggleAccordion(accordion) {
    accordion.toggle();
}

function init() {
    for (let i = 0; i < accordionsArray.length; i++) {
        accordionsArray[i].button.addEventListener('click', () => toggleAccordion(accordionsArray[i]));
    }
}

accordions.forEach(accordion => createAccordions(accordion));
init();