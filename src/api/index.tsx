import axios from 'axios';

const apiCats = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'x-api-key': 'live_Cek4sP7B5064Il5Nsv9JsIrvjXSDpdGkusCv2TRxsYaZcgdVUyLysAftjm0QJoc7',
  },
});

export default apiCats;
