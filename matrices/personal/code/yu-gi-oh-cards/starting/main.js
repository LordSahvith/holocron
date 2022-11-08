let cardName = document.querySelector('#cardName');
let cardId = document.querySelector('#cardSetCode');
let cardNameButton = document.querySelector('#cardNameButton');

cardNameButton.addEventListener('click', getCardInfo);
cardName.addEventListener('keyup', (e) => {
    let keyPressed = e.which || e.key;
    if (keyPressed === 'Enter' || keyPressed === 13) {
        getCardInfo();
    }
});
cardId.addEventListener('keyup', (e) => {
    let keyPressed = e.which || e.key;
    if (keyPressed === 'Enter' || keyPressed === 13) {
        getCardInfo();
    }
});
