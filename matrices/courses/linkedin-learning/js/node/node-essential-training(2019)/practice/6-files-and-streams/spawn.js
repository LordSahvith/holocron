const cp = require('child_process');

const questionApp = cp.spawn('node', ['questions.js']);

questionApp.stdin.write('Bob\n');
questionApp.stdin.write('over 9000\n');
questionApp.stdin.write('conquer myself.\n');

questionApp.stdout.on('data', (data) => {
    console.log(`from the questinos app: ${data}`);
});

questionApp.on('close', () => {
    console.log(`questionApp process exited.`);
});
