const questions = [
    'What is your name?',
    'What would you rather be doing?',
    'What is your preferred programming language?',
];

const ask = (i = 0) => {
    process.stdout.write(`\n\n\n ${questions[i]}`);
    process.stdout.write(` > `);
};

ask();

const answers = [];

process.stdin.on('data', (data) => {
    answers.push(data.toString().trim());

    if (answers.length < questions.length) {
        ask(answers.length);
    } else {
        process.exit();
    }
});

process.on('exit', () => {
    const [name, activity, language] = answers;
    console.log(`
    
Thank you for your answers.

Go ${activity} ${name}, you can write ${language} code later!!!!

    `);
});
