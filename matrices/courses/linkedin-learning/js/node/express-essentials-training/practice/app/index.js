// package.json "type": "module" allows for "import" syntax over "require"
import express from 'express';
// assert type needed for experimental json
import data from './data/mock.json' assert { type: 'json' };

const app = express();
const PORT = 3000;

// using the public 'static' folder at root
app.use(express.static('public'));

// I feel this is redundant since you'd need to do this for each folder
// when above seems to dynamically use the folder name within /public/*
// ex: ./public/images/* -> http://localhost:3000/images/mountains_2.jpeg
// app.use('/images', express.static('images'));

// router for root '/' - get(path, handler)
app.get('/', (request, response) => {
    response.json(data);
});

// router for create '/create' - post(path, handler)
app.post('/create', (request, response) => {
    response.send('This is a POST request at /create');
});

// router for edit '/edit' - post(path, handler)
app.put('/edit', (request, response) => {
    response.send('This is a PUT request at /edit');
});

// router for delete '/delete' - post(path, handler)
app.delete('/delete', (request, response) => {
    response.send('This is a DELETE request at /delete');
});

// starts server
app.listen(PORT, () => {
    console.log(`Express Server running on port:${PORT} `);
    console.log('data: ', data);
});
