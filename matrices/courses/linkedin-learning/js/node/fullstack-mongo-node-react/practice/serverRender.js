import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const serverRender = async () => {
    await axios.get(`${config.serverUrl}/api/contests`)
        .then(res => {
            return ReactDOMServer.renderToString(
                <App initialContests={res.data.contests} />
            );
        });
}

export default serverRender;
