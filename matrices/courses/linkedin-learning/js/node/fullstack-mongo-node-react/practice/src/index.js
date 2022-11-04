import React from 'react';
import ReactDOM from 'react-dom';

import data from './testData';
console.log(data);

import App from './components/App';

ReactDOM.render(
    <React.StrictMode>
        <App contests={data.contests} />
    </React.StrictMode>,
    document.getElementById('root')
);
