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

// using express.json and express.urlencoded
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route for root '/' - get(path, handler)
app.get('/', (request, response) => {
    response.json(studentData);
});

// POST - express.json and express.urlencoded
app.post('/item', (request, response) => {
    console.log(request.body);
    response.send(request.body);
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
        // Middleware: access the routing parameters
        const student = getStudentInfo(request.params);

        // everything above this line is Middleware
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

// ERROR - gracefully handle http errors
// app.use((err, req, res, next) => {
//     if (res.statusCode !== 200) {
//         console.error('STACK TRACE: ', err.stack);
//         res.send('Something is broken!');
//     }

//     next();
// });

// starts server
app.listen(PORT, () => {
    console.log(`Express Server running on port:${PORT} `);
});
