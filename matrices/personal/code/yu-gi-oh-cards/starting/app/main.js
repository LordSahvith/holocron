import './assets/sass/style.scss'

const CARD_API = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?name=';
const FULL_CARD_DATA = document.querySelector('.fullCardData');
const MATCHING_SET = document.querySelector('.matchingSet');

let cardName = document.querySelector('#cardName');
let cardId = document.querySelector('#cardId');
let cardNameButton = document.querySelector('#cardNameButton');

let fullCardData = {};
let cardSetMatchData = {};

function formatDisplay() {
    console.log('full data:', fullCardData);
    console.log('set data:', cardSetMatchData);
    let completeData = {
        name: fullCardData[0].name,
        type: fullCardData[0].type,
        description: fullCardData[0].desc,
        attack: fullCardData[0].atk ? fullCardData[0].atk : null,
        defense: fullCardData[0].def ? fullCardData[0].def : null,
        level: fullCardData[0].level ? fullCardData[0].level : null,
        race: fullCardData[0].race ? fullCardData[0].race : null,
        attribute: fullCardData[0].attribute ? fullCardData[0].attribute : null,
        code: cardSetMatchData.set_code ? cardSetMatchData.set_code : null,
        rarity: cardSetMatchData.set_rarity ? cardSetMatchData.set_rarity : null,
        price: cardSetMatchData.set_price ? cardSetMatchData.set_price : null
    };
    console.log('complete data: ', completeData);
}

function printToScreen(data, targetEl) {
    let cardHTML = `
            <pre>
                <code>
                    ${JSON.stringify(data)}
                </code>
            </pre>
            `;
    targetEl.innerHTML = cardHTML;
}

function getCardInfo() {
    let cardText = cardName.value;
    if (cardText.length > 0) {
        console.log('name: ', cardText);
        console.log('url: ', CARD_API + cardText);
        fetch(CARD_API + cardText)
            .then((cardData) => cardData.json())
            .then((cardData) => getCardData(cardData.data))
            .then((cardData) => getCardSetData(cardData))
            .then((cardSets) => getCardSetCodeData(cardSets))
            .then(() => formatDisplay());
    }
}

function getCardData(data) {
    fullCardData = data;
    printToScreen(fullCardData, FULL_CARD_DATA);
    return fullCardData;
}

function getCardSetData(data) {
    let cardSets = data.map((card) => card.card_sets);
    return cardSets;
}

function getCardSetCodeData(data) {
    for (let i = 0; i < data[0].length; i++) {
        if (data[0][i].set_code.toLowerCase() === cardId.value) {
            cardSetMatchData = data[0][i];
        }
    }
    printToScreen(cardSetMatchData, MATCHING_SET);
    return cardSetMatchData;
}

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
