import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const serverRender = () => {
    const request = axios.get(`${config.serverUrl}/api/contests`);
    return request.then(res => {
        return {
            initialMarkup: ReactDOMServer.renderToString(
                <App initialContests={res.data.contests} />
            ),
            initialData: res.data
        };
    });
}

export default serverRender;
