import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
    <React.StrictMode>
        <App initialData={window.initialData} />
    </React.StrictMode>,
    document.getElementById('root')
);
