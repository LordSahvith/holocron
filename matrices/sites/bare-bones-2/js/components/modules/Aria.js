class Aria {
    constructor(element) {
        this.el = element;
    }

    makeExpanded() {
        let expanded = 'aria-expanded';
        if (this.hasAttribute(expanded) === null || this.hasAttribute(expanded) === undefined) {
            this.el.addAttribute(expanded, false);
        }
    }

    toggleAttribute(ariaAttribute) {
        this.hasAttribute() ?
            this.el.addAttribute(ariaAttribute, false) :
            this.el.addAttribute(ariaAttribute, true);
    }

    hasAttribute(ariaAttribute) {
        return this.el.getAttribute(ariaAttribute);
    }
}

export { Aria };