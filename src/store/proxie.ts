import axios from 'axios';

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json'
  };
};

 const proxie = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { 'Content-Type': 'application/json' }
});

export default proxie;