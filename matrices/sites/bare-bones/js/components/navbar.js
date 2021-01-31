const mobileButton = document.querySelector('.bb-mobileIcon .toggle-button');
const mobileOverlay = document.querySelector('.bb-navbar-contents-links');

mobileButton.addEventListener('click', toggleMobile);

function toggleMobile() {
    toggle(this);
    toggle(mobileOverlay);
}