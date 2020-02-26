import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d8085.firebaseio.com/'
});

export default instance;
