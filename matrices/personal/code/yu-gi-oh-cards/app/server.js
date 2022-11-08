import express from 'express';

const server = express();

server.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000, 'localhost', () => {
    console.log('Express is listening on port 3000');
});
