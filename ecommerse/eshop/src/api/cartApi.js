import api from './api'; // Import the Axios instance

// Get the cart for a specific user
export const getCart = async (userId) => {
    try {
        const response = await api.get(`/api/cart/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

// Add an item to the cart
export const addItemToCart = async (userId, productId, quantity) => {
    try {
        const response = await api.post(`/api/cart/${userId}/items`, null, {
            params: { productId, quantity }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
    }
};

// Update an item in the cart
export const updateCartItem = async (userId, cartItemId, quantity) => {
    try {
        const response = await api.put(`/api/cart/${userId}/items/${cartItemId}`, null, {
            params: { quantity }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};

// Remove an item from the cart
export const removeItemFromCart = async (userId, cartItemId) => {
    try {
        const response = await api.delete(`/api/cart/${userId}/items/${cartItemId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
};

// Clear the cart
export const clearCart = async (userId) => {
    try {
        const response = await api.delete(`/api/cart/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};
