const cp = require('child_process');

// cp.exec('start https://linkedin.com');

// cp.exec('ls', (error, data, stderror) => {
//     if (error || stderror) throw stderror;

//     console.log(data);
// });

cp.exec('node readStream', (error, data, stderror) => {
    if (error || stderror) throw stderror;

    console.log(data);
});
