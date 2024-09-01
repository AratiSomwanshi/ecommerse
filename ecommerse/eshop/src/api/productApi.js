import api from './api';

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await api.get('/admin/products');
        return response.data; // Ensure this returns the list of products
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};


// Create or update a product
export const createOrUpdateProduct = async (product) => {
    try {
        const response = await api.post('/admin/products', product);
        return response.data;
    } catch (error) {
        console.error('Error creating or updating product:', error);
        throw error;
    }
};

// Get a product by ID
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/admin/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
    try {
        await api.delete(`/admin/products/${id}`);
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        throw error;
    }
};

// Search products by name
export const searchProducts = async (name) => {
    try {
        const response = await api.get('/admin/products/search', { params: { name } });
        return response.data;
    } catch (error) {
        console.error('Error searching products by name:', error);
        throw error;
    }
};
