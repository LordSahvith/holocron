const daytime = {
    breakfast: 'bacon & eggs',
    lunch: 'pizza'
};

const nighttime = 'chicken alfredo';

const backpackingMeals = {
    ...daytime, // spread object into another one
    nighttime
}

console.log(backpackingMeals);
