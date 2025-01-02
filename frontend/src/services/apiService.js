import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/'; // Base URL for your API

export const apiService = {
    signup(username, password, role) {
        return axios.post(`${API_URL}signup`, {
            username,
            password,
            role,
        });
    },
    login(username, password) {
        
        return axios.post(`${API_URL}login`, {
            username,
            password,
        });
    }
};
