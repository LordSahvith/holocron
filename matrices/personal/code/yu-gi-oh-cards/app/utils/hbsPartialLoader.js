import path from 'path';
import hbs from 'hbs';

module.exports = () => {
    hbs.registerPartials(path.join(__dirname, '../views/partials/'));
    hbs.registerPartials(path.join(__dirname, '../views/partials/cards/'));
}
