import config from './config';
import apiRouter from './api';
import fs from 'fs';
import express from 'express';

const server = express();

server.get('/', (req, res) => {
    res.send('Hello Express');
});

server.use('/api', apiRouter);
// short hand - middleware - not for production env
server.use(express.static('public'));
// server.get('/about.html', (req, res) => {
//     fs.readFile('./about.html', (err, data) => {
//         res.send(data.toString());
//     });
// });

server.listen(config.port, () => {
    console.info(`Express is listening on port ${config.port}`);
});
