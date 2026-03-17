import axios from 'axios';

const API = axios.create({
  baseURL: 'https://militry-assets-managment.onrender.com/',
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const registerUser = (userData) => API.post('/api/auth/register', userData);
export const loginUser = (userData) => API.post('/api/auth/login', userData);

// dashbord api
export const commonDashbordApi = (params) => API.get('/api/dashboard', { params });
// admin module api
export const purchaseItem = (params)=> API.get("/api/purchases",{params});
export const transferItems = (params)=> API.get("/api/transfers",{params})
export const assignedItems = (params)=> API.get("/api/assignments",{params})
export const expendituresItems = (params)=> API.get("/api/expenditures",{params})

// logistic officer api

export const createPurchase = (data)=> API.post("/api/purchases", data)
export const createTransfer = (data)=> API.post("/api/transfers", data)
export const createAssignment = (data)=> API.post("/api/assignments", data)
export const createExpendature = (data)=> API.post("/api/expenditures", data)

// base commander
export const getTransferItems = (params)=> API.get("/api/transfers",{params})
export const getDashbordTransferItem = (params)=> API.get("/api/dashboard",{params})
export default API;
