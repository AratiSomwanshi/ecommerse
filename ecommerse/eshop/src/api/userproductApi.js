import api from './api';

// Fetch all products
export const getAllProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Search products by name
export const searchProducts = async (name) => {
    try {
        const response = await api.get('/products/search', { params: { name } });
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};
