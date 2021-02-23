class Toggle {
    constructor(element) {
        this.el = element;
    }

    toggle() {
        toggle(this.el);
    }
}

export {Toggle};