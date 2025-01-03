import axios from 'axios';
import { ICouponData } from '../types';

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
export const addAddress = (customerId:string, address:string) => api.patch(`${ORDER_SERVICE_PREFIX}/customer/address/${customerId}`,{address}); 
export const verfiyCoupon = (data : ICouponData) => api.post(`${ORDER_SERVICE_PREFIX}/coupon/verify`,data)