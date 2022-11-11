// console.log('process: ', process.argv);

// function grab(flag) {
//     let indexAfterFlag = process.argv.indexOf(flag) + 1;
//     return process.argv[indexAfterFlag];
// }

const grab = (flag) => {
    let indexAfterFlag = process.argv.indexOf(flag) + 1;
    return process.argv[indexAfterFlag];
};

let greeting = grab('--greeting').toUpperCase().trim();
let user = grab('--user');

console.log('greeting: ', greeting);
console.log('user: ', user.toUpperCase());
