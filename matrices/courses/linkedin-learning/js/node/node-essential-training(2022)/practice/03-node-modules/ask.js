const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const collectAnswers = (questions, done) => {
    const answers = [];
    const [firstQuestion] = questions;

    const questionAnswered = (answer) => {
        answers.push(answer.trim());
        if (answers.length < questions.length) {
            rl.question(
                questions[answers.length],
                questionAnswered
            );
        } else {
            return done(answers);
        }
    };

    rl.question(firstQuestion, questionAnswered);
};

const questions = [
    'What is your name? ',
    'What is your powwer level? ',
    'What are you going to do? ',
];

collectAnswers(questions, (answers) => {
    console.log("Thank you for your answers!");
    console.log(answers);
    process.exit();
});
