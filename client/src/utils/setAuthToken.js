import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply Auth token for every resquest if logged in
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delte auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;