// "import" syntax comes from package.json "type": "module" to allow over "require"
import express from 'express';
// assert type needed for experimental json
import studentData from './data/mockStudents.json' assert { type: 'json' };

const app = express();
const PORT = 3000;

const getStudentInfo = (student) => {
    // get userId from the request parameters
    const studentId = Number(student.userId);

    // filter student from student data that matches the user id
    return studentData.filter((student) => student.id === studentId);
};

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

// GET with next()
app.get('/next', (request, response, next) => {
    console.log('The response will be sent by the next function.');
    next();
}, (request, response) => {
    response.send('This is a route with a second callback.');
});

// GET - redirect method
app.get('/redirect', (request, response) => {
    response.redirect('/');
});

// GET - download method
app.get('/download', (request, response) => {
    response.download('./public/images/mountains_2.jpeg');
});

// route chaining
app.route('/class')
    .get((request, response) => {
        response.send(['Retrieve class info', studentData]);
    })
    .post((request, response) => {
        response.send('Create class info');
    })
    .put((request, response) => {
        response.send('Update class info');
    })
    .delete((request, response) => {
        response.send('Delete class info');
    });

// GET with routing parameters
// ex. use: /class/:{param} -> http://localhost:3000/class/4 -> { {param}: '4' }
// ex. output: /class/:userId -> http://localhost:3000/class/4 -> { userId: '4' }
app.route('/class/:userId')
    .get((request, response) => {
        const student = getStudentInfo(request.params);

        // send response data
        response.send(student);
    })
    .post((request, response) => {
        const student = getStudentInfo(request.params);
        response.send(`Create class info for ${student[0].first_name}`);
    })
    .put((request, response) => {
        const student = getStudentInfo(request.params);
        response.send(`Update class info for ${student[0].first_name}`);
    })
    .delete((request, response) => {
        const student = getStudentInfo(request.params);
        response.send(`Delete class info for ${student[0].first_name}`);
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
