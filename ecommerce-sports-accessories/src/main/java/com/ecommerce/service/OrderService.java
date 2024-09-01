package com.ecommerce.service;

import com.ecommerce.enums.OrderStatus;
import com.ecommerce.model.Order;
import com.ecommerce.repository.OrderRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

   
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> findByEmail(String email) {
        return orderRepository.findByEmail(email);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + orderId));
    }

    public Optional<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findById(userId);
    }

    public Order updateOrder(Order order) {
        if (!orderRepository.existsById(order.getId())) {
            throw new EntityNotFoundException("Order not found with ID: " + order.getId());
        }
        return orderRepository.save(order);
    }

   
    public void deleteOrder(Long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new EntityNotFoundException("Order not found with ID: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }

   
    public Order confirmOrder(Long orderId) {
        return updateOrderStatus(orderId, OrderStatus.CONFIRMED);
    }

   
    public Order markOrderAsPending(Long orderId) {
        return updateOrderStatus(orderId, OrderStatus.PENDING);
    }

    
    public Order markOrderAsShipped(Long orderId) {
        return updateOrderStatus(orderId, OrderStatus.SHIPPED);
    }

    
    public Order markOrderAsDelivered(Long orderId) {
        return updateOrderStatus(orderId, OrderStatus.DELIVERED);
    }

   
    public Order markOrderAsCancelled(Long orderId) {
        return updateOrderStatus(orderId, OrderStatus.CANCELLED);
    }


    private Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = getOrderById(orderId); 
        order.setStatus(status); 
        return orderRepository.save(order); 
    }
}
