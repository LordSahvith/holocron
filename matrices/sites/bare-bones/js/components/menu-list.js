const menuListIdentifier = '.bb-menuList';
const menuListButton = '.bb-menuList-button';
const menuListContent = '.bb-menuList-contents';
const menuLists = document.querySelectorAll(menuListIdentifier);
let menuListsArray = [];

class MenuList {
    constructor(menuList) {
        this.menu = menuList;
        this.button = this.menu.querySelector(menuListButton);
        this.content = this.menu.querySelector(menuListContent);
    }

    toggle() {
        toggle(this.menu);
        toggle(this.button);
        toggle(this.content);
    }

    isOpen() {
        return this.button.classList.contains('isOpen');
    }

    log() {
        console.log(this.button, this.content);
    }
}

function createMenuLists(menuList) {
    menuListsArray.push(new MenuList(menuList));
}

function setEventListeners() {
    for (let i = 0; i < menuListsArray.length; i++) {
        menuListsArray[i].button.addEventListener('click', () => menuListsArray[i].toggle());
        menuListsArray[i].menu.addEventListener('mouseover', (e) => toggleOpen(e));
        menuListsArray[i].menu.addEventListener('mouseleave', (e) => toggleClosed(e));
    }
}

menuLists.forEach(menuList => createMenuLists(menuList));
setEventListeners();

window.addEventListener('click', function (e) {
    for (let i = 0; i < menuListsArray.length; i++) {
        if (e.target !== menuListsArray[i].button && menuListsArray[i].isOpen()) {
            menuListsArray[i].toggle();
        }
    }
});

function toggleOpen(e) {
    for (let i = 0; i < menuListsArray.length; i++) {
        if (e.target === menuListsArray[i].menu) {
            menuListsArray[i].toggle();
        }
    }
}

function toggleClosed(e) {
    for (let i = 0; i < menuListsArray.length; i++) {
        if ((e.target !== menuListsArray[i].menu || e.target !== menuListsArray[i].content) && menuListsArray[i].isOpen()) {
            menuListsArray[i].toggle();
        }
    }
}