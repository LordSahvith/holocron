import http from 'http';

const server = http.createServer((req, res) => {
    res.write('hello HTTP!\n');
    setTimeout(() => {
        res.write('I can stream!\n');
        res.end();
    }, 200);
});

server.listen(8080);
