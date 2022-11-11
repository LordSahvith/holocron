import express from 'express';
import config from './config';

const app = express();

app.listen(config.port, config.host, () => {
    console.log(`Express listening on port:${config.port}`);
});
