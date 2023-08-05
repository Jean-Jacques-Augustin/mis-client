
import axios from 'axios';

/**
 * Create an Axios Client with defaults
 * @Usage: import api from 'path/to/apiService.ts'
 */

export const baseURL = 'http://localhost:4000';

const api = axios.create({
    baseURL: baseURL,
});

export default api;
