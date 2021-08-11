import axios from 'axios'
import authHeader from '../../services/auth-header';
import authService from '../../services/authService';

const api = axios.create({
    baseURL: 'http://localhost:8082/api/vendors/',
})


export const createVendor = payload => api.post(`/MakeVendor`, payload)
export const getAllVendors = () => api.get(`/allVendors`)


const apis = {
    createVendor,
    getAllVendors,
}

export default apis