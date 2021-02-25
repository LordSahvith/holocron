import { toggle } from '../../utils/dom.js';

class Toggle {
    constructor(element) {
        this.el = element;
    }

    toggle() {
        toggle(this.el);
    }

    isOpen() {
        return this.el.classList.contains('isOpen');
    }

    log() {
        console.log(this.el);
    }
}

export { Toggle };