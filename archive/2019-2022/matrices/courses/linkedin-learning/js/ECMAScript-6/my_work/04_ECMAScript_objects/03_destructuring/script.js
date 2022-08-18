const {title, ingredients} = {
    title: 'Rueben',
    price: 10,
    description: 'A classic',
    ingredients: [
        'bread',
        'corned beef',
        '1000 island',
        'sauerkraut',
        'swiss'
    ]
}

console.log(title);
console.log(ingredients);

const vacation = {
    destination: 'Chile',
    travelers: 1,
    activity: 'beach',
    cost: 1000
}

function marketing({destination, activity}) {
    return `Come to ${destination} and enjoy the ${activity}!`;
}

console.log(marketing(vacation));
