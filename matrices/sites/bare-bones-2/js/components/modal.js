import { Toggle } from './modules/toggle.js';

const modals = document.querySelectorAll("[modal]");

let modalsArray = [];

class Modal extends Toggle {
    constructor(modal, buttonOpen) {
        super(modal);
        this.modal = modal;
        this.buttonClose = modal.querySelector('.bb-button--close');
        this.buttonOpen = buttonOpen;
    }

    log() {
        console.log(this.modal, this.buttonOpen);
    }
}

function createModals(modal, buttonOpen) {
    modalsArray.push(new Modal(modal, buttonOpen));
}

function setEventListeners() {
    for (let i = 0; i < modalsArray.length; i++) {
        modalsArray[i].buttonOpen.addEventListener('click', () => modalsArray[i].toggle());
        modalsArray[i].buttonClose.addEventListener('click', () => modalsArray[i].toggle());
    }
}

modals.forEach(modal => {
    let buttonOpen = document.querySelector(`[data-modal-id="${modal.id}"]`);
    createModals(modal, buttonOpen);
});
setEventListeners();