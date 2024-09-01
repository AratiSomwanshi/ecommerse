
import React, { useState } from 'react';
import { 
    updateOrder, 
    deleteOrder, 
    confirmOrder, 
    markOrderAsPending, 
    markOrderAsShipped, 
    markOrderAsDelivered, 
    markOrderAsCancelled 
  } from '../api/orderApi';
  

const OrderManagement = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState({});

  const handleUpdateOrder = async () => {
    try {
      const updatedOrder = await updateOrder(orderId, order);
      console.log('Order updated:', updatedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(orderId);
      console.log('Order deleted');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const confirmedOrder = await confirmOrder(orderId);
      console.log('Order confirmed:', confirmedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleMarkOrderAsPending = async () => {
    try {
      const updatedOrder = await markOrderAsPending(orderId);
      console.log('Order marked as pending:', updatedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleMarkOrderAsShipped = async () => {
    try {
      const updatedOrder = await markOrderAsShipped(orderId);
      console.log('Order marked as shipped:', updatedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleMarkOrderAsDelivered = async () => {
    try {
      const updatedOrder = await markOrderAsDelivered(orderId);
      console.log('Order marked as delivered:', updatedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleMarkOrderAsCancelled = async () => {
    try {
      const updatedOrder = await markOrderAsCancelled(orderId);
      console.log('Order marked as cancelled:', updatedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div  style={{
      backgroundColor: '#e1f5fe', 
      padding: '2rem', 
      borderRadius: '8px', 
  }}>
      <h1>Order Management</h1>
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Order ID"
      />
      <button onClick={handleUpdateOrder}>UpdateOrder</button>
      <button onClick={handleDeleteOrder}>Delete</button>
      <button onClick={handleConfirmOrder}>Confirm</button>
      <button onClick={handleMarkOrderAsPending}>Pending</button>
      <button onClick={handleMarkOrderAsShipped}>Shipped</button>
      <button onClick={handleMarkOrderAsDelivered}>Delivered</button>
      <button onClick={handleMarkOrderAsCancelled}>Cancelled</button>
    </div>
  );
};

export default OrderManagement;
