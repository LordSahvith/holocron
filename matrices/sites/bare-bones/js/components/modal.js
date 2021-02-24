const modals = document.querySelectorAll("[modal]");
const modalButtons = document.querySelectorAll("[modal-button]");

let modalsArray = [];
let modalButtonsArray = [];

class Modal {
    constructor(modal, button) {
        this.modal = modal;
        this.button = button;
    }

    toggle() {
        toggle(this.modal);
    }

    log() {
        console.log(this.modal);
    }
}

function createModals(modal) {
    modalsArray.push(new Modal(modal));
}

function setEventListeners() {
    for (let i = 0; i < modalsArray.length; i++) {
        modalsArray[i].addEventListener('click', () => modalsArray[i].toggle());
    }
}

modals.forEach(modal => createModals(modal));
// setEventListeners();