
import axios from 'axios';

/**
 * Create an Axios Client with defaults
 * @Usage: import api from 'path/to/apiService.ts'
 */

const api = axios.create({
    baseURL: 'http://localhost:4000',
});

export default api;
