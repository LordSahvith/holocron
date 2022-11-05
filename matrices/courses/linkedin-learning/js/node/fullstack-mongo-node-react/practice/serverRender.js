import config from './config';
import axios from 'axios';

axios.get(`${config.serverUrl}/api/contests`)
    .then(res => {
        console.log(res.data);
    })
    .catch(console.error);
