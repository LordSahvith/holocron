// console.log(process.pid);
// console.log(process.versions.node);

// console.log(process.argv);

// const [,, firstName, lastName] = process.argv;

// console.log(`${firstName} ${lastName} - ruler of shadows.`);

const grab = flag => {
    let indexAfterFlag = process.argv.indexOf(flag) + 1;
    return process.argv[indexAfterFlag];
};

const msg = grab('--msg');
const user = grab('--user');

console.log(`${user} ${msg}`);
