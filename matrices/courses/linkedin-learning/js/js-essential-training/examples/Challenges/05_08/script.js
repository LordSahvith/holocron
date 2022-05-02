/**
 * Note: This file is intentionally empty.
 * You can use it to test your skills at adding, removing, or modifying
 * attributes, classes, and inline styles on elements.
 */

let backpacks = document.querySelectorAll('.backpack');

function addEventListeners(backpack) {
    let leftStrap = backpack.querySelector('[data-side="left"]');
    let rightStrap = backpack.querySelector('[data-side="right"]');

    let leftStrapLength = leftStrap.querySelector('span:first-child');
    let rightStrapLength = rightStrap.querySelector('span:first-child');

    let leftStrapInput = leftStrap.querySelector('.leftlength input');
    let rightStrapInput = rightStrap.querySelector('.rightlength input');

    let leftStrapButton = leftStrap.querySelector('.leftlength button');
    let rightStrapButton = rightStrap.querySelector('.rightlength button');

    let openLid = backpack.querySelector('.backpack__lid span');
    let openLidButton = backpack.querySelector('.lid-toggle');

    leftStrapButton.addEventListener('click', function (e) {
        e.preventDefault();
        let newValue = leftStrapInput.value;
        leftStrapLength.innerHTML = `${newValue} inches`;
        leftStrapLength.style.textDecoration = "underline";
    });

    rightStrapButton.addEventListener('click', function (e) {
        e.preventDefault();
        let newValue = rightStrapInput.value;
        rightStrapLength.innerHTML = `${newValue} inches`;
        rightStrapLength.style.textDecoration = "underline";
    });

    openLidButton.addEventListener('click', function () {
        let isLidOpen = openLid.innerHTML === 'closed' ? false : true;
        openLid.innerHTML = isLidOpen ? 'closed' : 'open';
        openLid.style.backgroundColor = "skyblue";
    });
}

backpacks.forEach(backpack => {
    addEventListeners(backpack);
});

const header = document.querySelector('header');

let nav = document.createElement('nav');

let navContent = `
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Page 1</a></li>
        <li><a href="#">Page 2</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
`;

nav.innerHTML = navContent;
header.append(nav);
