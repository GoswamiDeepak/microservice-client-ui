import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})

const ORDER_SERVICE_PREFIX = '/api/order';

export const getCustomer = async() => await api.get(`${ORDER_SERVICE_PREFIX}/customer`);
