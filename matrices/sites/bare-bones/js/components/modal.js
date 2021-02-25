import { Toggle } from './modules/toggle.js';

const modals = document.querySelectorAll("[modal]");
const modalButtons = document.querySelectorAll("[modal-button]");

let modalsArray = [];
let modalButtonsArray = [];

class Modal extends Toggle {
    constructor(modal, button) {
        super(modal);
        this.modal = modal;
        this.button = button;
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