const events = require('events');

const emitter = new events.EventEmitter();

emitter.on('customEvent', (message, user) => {
    console.log(`${user}: ${message}`);
});

// emitter.emit('customEvent', 'Hello Worlld', 'Computer');
// emitter.emit('customEvent', 'this is pretty cool', 'Lord Savith');

process.stdin.on('data', data => {
    const input = data.toString().trim();

    if (input === 'exit') {
        emitter.emit('customEvent', 'Goodbye!', 'proceess');
        process.exit();
    }

    emitter.emit('customEvent', input, 'terminal');
});
