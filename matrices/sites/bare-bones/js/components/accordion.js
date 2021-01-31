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
        toggle(this.button);
        toggle(this.content);
    }

    log() {
        console.log(this.button, this.content);
    }
}

function createAccordions(accordion) {
    accordionsArray.push(new Accordion(accordion));
}

function setEventListeners() {
    for (let i = 0; i < accordionsArray.length; i++) {
        accordionsArray[i].button.addEventListener('click', () => accordionsArray[i].toggle());
    }
}

accordions.forEach(accordion => createAccordions(accordion));
setEventListeners();