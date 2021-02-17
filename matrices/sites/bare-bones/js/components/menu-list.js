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
    }

    open(e) {
        for (let i = 0; i < menuListsArray.length; i++) {
            if (e.target === menuListsArray[i].menu) {
                this.toggle();
            }
        }
    }

    close(e) {
        for (let i = 0; i < menuListsArray.length; i++) {
            if ((e.target !== menuListsArray[i].menu || e.target !== menuListsArray[i].content) && menuListsArray[i].isOpen()) {
                menuListsArray[i].toggle();
            }
        }
    }

    isOpen() {
        return this.menu.classList.contains('isOpen');
    }

    log() {
        console.log(this.menu, this.button, this.content);
    }
}

function createMenuLists(menuList) {
    menuListsArray.push(new MenuList(menuList));
}

function setEventListeners() {
    for (let i = 0; i < menuListsArray.length; i++) {
        menuListsArray[i].button.addEventListener('click', () => menuListsArray[i].toggle());
        menuListsArray[i].button.addEventListener('keydown', (e) => {
            let keyPressed = e.key || e.which;
            if (keyPressed === 'Enter' || keyPressed === 13) {
                menuListsArray[i].toggle();
            }
        });
        menuListsArray[i].menu.addEventListener('mouseover', (e) => menuListsArray[i].open(e));
        menuListsArray[i].menu.addEventListener('mouseleave', (e) => menuListsArray[i].close(e));
    }

    window.addEventListener('click', function (e) {
        for (let i = 0; i < menuListsArray.length; i++) {
            if (e.target !== menuListsArray[i].button && menuListsArray[i].isOpen()) {
                menuListsArray[i].toggle();
            }
        }
    });
}

menuLists.forEach(menuList => createMenuLists(menuList));
setEventListeners();