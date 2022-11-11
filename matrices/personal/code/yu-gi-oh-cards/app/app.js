import express from 'express';
import config from './config';
import path from 'path';
import hbs from 'hbs';

// routes
import indexRouter from './routes/indexRouter';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(config.port, config.host, () => {
    console.log(`Express listening on port:${config.port}`);
});
