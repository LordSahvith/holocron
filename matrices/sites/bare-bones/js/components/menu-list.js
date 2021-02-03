const menuListIdentifier = '.bb-menuList';
const menuListButton = '.bb-menuList-button';
const menuListContent = '.bb-menuList-contents';
const arrowButton = '.arrow.down';
const menuLists = document.querySelectorAll(menuListIdentifier);
let menuListsArray = [];

class MenuList {
    constructor(menuList) {
        this.button = menuList.querySelector(menuListButton);
        this.arrow = menuList.querySelector(arrowButton);
        this.content = menuList.querySelector(menuListContent);
    }

    toggle() {
        toggle(this.button);
        toggle(this.content);
    }

    isOpen() {
        return this.button.classList.contains('isOpen');
    }

    log() {
        console.log(this.button, this.arrow, this.content);
    }
}

function createMenuLists(menuList) {
    menuListsArray.push(new MenuList(menuList));
}

function setEventListeners() {
    for (let i = 0; i < menuListsArray.length; i++) {
        menuListsArray[i].button.addEventListener('click', () => menuListsArray[i].toggle());
    }
}

menuLists.forEach(menuList => createMenuLists(menuList));
setEventListeners();

window.addEventListener('click', function(e) {
    for (let i = 0; i < menuListsArray.length; i++) {
        if (e.target !== menuListsArray[i].button && menuListsArray[i].isOpen()) {
            menuListsArray[i].toggle();
        }
    }
});