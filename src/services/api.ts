import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com',
});

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/account/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};