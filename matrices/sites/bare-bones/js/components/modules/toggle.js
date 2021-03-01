import { toggle, hasClass } from '../../utils/dom.js';

class Toggle {
    /**
     * Element to be toggled
     * @param {*} element 
     */
    constructor(element) {
        this.el = element;
    }

    /**
     * Toggles CSS Class
     * @param {string} cssClass 
     * CSS Class as a string
     */
    toggle(cssClass) {
        toggle(this.el, cssClass);
    }

    /**
     * Checks if element has isOpen class applied to it
     */
    isOpen() {
        return hasClass(this.el, 'isOpen');
    }

    /**
     * Checks if this element has 
     * @param {string} cssClass 
     */
    hasClass(cssClass) {
        return hasClass(this.el, cssClass);
    }

    log() {
        console.log(this.el);
    }
}

export { Toggle };