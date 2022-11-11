const collectAnswers = require("./lib/collectAnswers");

const questions = [
    'What is your name? ',
    'What is your powwer level? ',
    'What are you going to do? ',
];

const answerEvents = collectAnswers(questions, (answers) => {
    console.log("Thank you for your answers!");
    console.log(answers);
    process.exit();
});

answerEvents.on('answer', (answer) => {
    console.log(`answer is ${answer}`);
});
