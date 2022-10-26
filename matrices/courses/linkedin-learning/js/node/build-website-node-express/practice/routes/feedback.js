const express = require('express');

const router = express.Router();

module.exports = () => {
    router.get('/', (request, response) => response.send('Feedback page'));

    router.post('/', (request, response) => response.send('Feedback form posted'));

    return router;
}
