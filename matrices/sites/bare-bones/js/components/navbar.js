const mobileButton = document.querySelector('.bb-mobileIcon .toggle-button');
const mobileOverlay = document.querySelector('.bb-navbar-contents-links');

mobileButton.addEventListener('click', toggleMobile);

function toggleMobile() {
    toggle(mobileButton);
    toggle(mobileOverlay);
}

function isMenuOpen() {
    return mobileOverlay.classList.contains('isOpen');
}

function menuController() {
    if (window.innerWidth >= 640) {
        for (let i = 0; i < menuListsArray.length; i++) {
            if (menuListsArray[i].isOpen()) {
                menuListsArray[i].toggle();
            }
        }
        if (isMenuOpen()) {
            toggleMobile();
        }
    }
}

window.onresize = menuController;