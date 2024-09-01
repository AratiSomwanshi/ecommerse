// src/api/paymentApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin/payments';

// Get All Payments
export const getAllPayments = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch payments');
  }
};

// Get Payment by ID
export const getPaymentById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch payment');
  }
};

// Create Payment
export const createPayment = async (newPayment) => {
  try {
    const response = await axios.post(BASE_URL, newPayment, {
      headers: {
        'Content-Type': 'application/json',
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create payment');
  }
};

// Update Payment
export const updatePayment = async (id, updatedPayment) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedPayment, {
      headers: {
        'Content-Type': 'application/json',
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update payment');
  }
};

// Update Payment Status
export const updatePaymentStatus = async (id, status) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/status`, null, {
      params: { status },
      headers: {
        'Content-Type': 'application/json',
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update payment status');
  }
};

// Delete Payment
export const deletePayment = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        // Add necessary headers, e.g., Authorization
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete payment');
  }
};
