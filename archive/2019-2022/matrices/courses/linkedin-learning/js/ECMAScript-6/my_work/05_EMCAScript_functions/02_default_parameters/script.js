function add(x = 4, y = 9) {
    console.log(x + y);
}

add();

function haveFun(activityName = 'sleep', time = 8) {
    console.log(`Today I will go ${activityName} for ${time} hours.`);
}

haveFun('gaming', 4);
haveFun();
