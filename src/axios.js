import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://185.233.39.236:8080',
});

export default instance;
