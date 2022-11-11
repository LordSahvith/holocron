import express from 'express';
import config from './config';
import path from 'path';
import hbs from 'hbs';
import hbsPartialLoader from './utils/hbsPartialLoader';

// routes
import indexRouter from './routes/indexRouter';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

hbsPartialLoader();

app.use('/', indexRouter);

app.listen(config.port, config.host, () => {
    console.log(`Express listening on port:${config.port}`);
});
