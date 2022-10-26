const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

const bodyParser = require('body-parser');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakerService('./data/speakers.json');

const routes = require('./routes');

const app = express();

app.locals.siteName = 'ROUX Meetups';

const port = 3000;

app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['123abc', '456efg']
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
    try {
        const names = await speakersService.getNames();
        response.locals.speakerNames = names;
        return next();
    } catch (error) {
        return next(error);
    }
});

app.use('/', routes({
    feedbackService,
    speakersService
}));

app.use((request, response, next) => next(createError(404, 'File not found')));

app.use((error, request, response, next) => {
    response.locals.message = error.message;
    const status = error.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render('error');
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}.`);
});
