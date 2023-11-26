
import axios from 'axios';

/**
 * Create an Axios Client with defaults
 * @Usage: import api from 'path/to/apiService.ts'
 */

//export const baseURL = 'http://localhost:4000';
export const baseURL = 'https://api.xn--ms-nja.com';

const api = axios.create({
    baseURL: baseURL,
});

export default api;
