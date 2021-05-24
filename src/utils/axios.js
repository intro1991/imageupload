import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  proxy: {
    host: '127.0.0.1',
    port: 5100
  }
});

export default instance;
