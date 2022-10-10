const collectAnswers = require('./lib/collectAnswers');

const questions = [
    'What is your name? ',
    'What is your powwer level? ',
    'What are you going to do? ',
];

const answerEvents = collectAnswers(questions);

answerEvents.on('answer', (answer) => {
    console.log(`question answered: ${answer}`);
});

answerEvents.on('complete', (answers) => {
    console.log('Thank you for your answers. ');
    console.log(answers);
});

answerEvents.on('complete', () => process.exit());
