import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const getApiUrl = (contestId) => {
    if (contestId) {
        return `${config.serverUrl}/api/contests/${contestId}`;
    }

    return `${config.serverUrl}/api/contests`;
};

const getInitialData = (contestId, apiData) => {
    if (contestId) {
        return {
            currentContestId: apiData.id,
            contests: {
                [apiData.id]: apiData
            }
        };
    }

    return {
        contests: apiData.contests
    }
};

const serverRender = (contestId) => {
    const request = axios.get(getApiUrl(contestId));
    return request.then(res => {
        const initialData = getInitialData(contestId, res.data);
        return {
            initialMarkup: ReactDOMServer.renderToString(
                <App initialData={initialData} />
            ),
            initialData
        };
    });
}

export default serverRender;
