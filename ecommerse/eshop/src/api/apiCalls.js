import api from './api'; // Import the Axios instance

// Auth API
export const registerUser = async (user) => {
    return api.post('/auth/register', user);
};

export const loginUser = async (credentials) => {
    return api.post('/auth/login', credentials);
};

// User-related API
export const getUserProfile = async (token) => {
    try {
        const response = await api.get('/api/admin/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Profile data:', response.data);
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};


export const getUserById = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await api.get(`/api/admin/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

export const getAllUsers = async (token) => {
    try {
        const response = await api.get('/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Ensure you're returning the data array
    } catch (error) {
        console.error('API call failed:', error);
        throw error; // Ensure errors are properly propagated
    }
};



// Category-related API
const CATEGORY_API_BASE_URL = '/api/admin/categories';
export const createCategory = async (category) => {
    return api.post(CATEGORY_API_BASE_URL, category);
};

export const updateCategory = async (id, category) => {
    try {
        const response = await api.put(`${CATEGORY_API_BASE_URL}/${id}`, category);
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    return api.delete(`${CATEGORY_API_BASE_URL}/${id}`);
};

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`${CATEGORY_API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const response = await api.get(CATEGORY_API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};