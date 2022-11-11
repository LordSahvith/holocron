const CARD_API = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?name=';
const FULL_CARD_DATA = document.querySelector('.fullCardData');
const MATCHING_SET = document.querySelector('.matchingSet');

let fullCardData = {};
let cardSetMatchData = {};

function getCardInfo() {
    let cardText = cardName.value;
    console.log('card: ', cardText);
    // if (cardText.length > 0) {
    //     console.log('name: ', cardText);
    //     console.log('url: ', CARD_API + cardText);
    //     fetch(CARD_API + cardText)
    //         .then((cardData) => cardData.json())
    //         .then((cardData) => getCardData(cardData.data))
    //         .then((cardData) => getCardSetData(cardData))
    //         .then((cardSets) => getCardSetCodeData(cardSets));
    // }
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

module.exports = getCardInfo;
