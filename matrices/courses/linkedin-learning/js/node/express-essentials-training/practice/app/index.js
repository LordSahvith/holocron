// "import" syntax comes from package.json "type": "module" to allow over "require"
import express from 'express';
// assert type needed for experimental json
import studentData from './data/mockStudents.json' assert { type: 'json' };

const app = express();
const PORT = 3000;

// route using the public 'static' folder at root
app.use(express.static('public'));

// I feel this is redundant since you'd need to do this for each folder
// when above seems to dynamically use the folder name within /{folder}/*
// ex: ./public/images/* -> http://localhost:3000/images/mountains_2.jpeg
// app.use('/images', express.static('images'));

// route for root '/' - get(path, handler)
app.get('/', (request, response) => {
    response.json(studentData);
});

// GET with routing parameters
// ex. use: /class/:{param} -> http://localhost:3000/class/4 -> { {param}: '4' }
// ex. output: /class/:userId -> http://localhost:3000/class/4 -> { userId: '4' }
app.get('/class/:userId', (request, response) => {
    // get userId from the request parameters
    const studentId = Number(request.params.userId);

    // filter student where studentData.id === studentId
    const student = studentData.filter((student) => {
        return student.id === studentId;
    });

    // send response data
    response.send(student);
});

// route for create '/create' - post(path, handler)
app.post('/create', (request, response) => {
    response.send('This is a POST request at /create');
});

// route for edit '/edit' - post(path, handler)
app.put('/edit', (request, response) => {
    response.send('This is a PUT request at /edit');
});

// route for delete '/delete' - post(path, handler)
app.delete('/delete', (request, response) => {
    response.send('This is a DELETE request at /delete');
});

// starts server
app.listen(PORT, () => {
    console.log(`Express Server running on port:${PORT} `);
});
