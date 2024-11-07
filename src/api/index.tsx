import axios from 'axios';

const apiCats = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'x-api-key': process.env.APP_CATS_KEY || 'DEMO-API-KEY',
  },
});

export default apiCats;
