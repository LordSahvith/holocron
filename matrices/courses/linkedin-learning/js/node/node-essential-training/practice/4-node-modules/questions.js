const collectAnswers = require('./lib/collectAnswers');

const questions = [
    'What is your name? ',
    'What is your powwer level? ',
    'What are you going to do? '
];

collectAnswers(questions, answers => {
    console.log('Thank you for your answers. ');
    console.log(answers);
    process.exit();
});
