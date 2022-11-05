import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
    <React.StrictMode>
        <App initialContests={window.initialData.contests} />
    </React.StrictMode>,
    document.getElementById('root')
);



