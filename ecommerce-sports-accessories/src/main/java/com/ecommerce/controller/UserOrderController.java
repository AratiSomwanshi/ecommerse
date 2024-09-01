package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.service.OrderService;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/user/orders")
public class UserOrderController {

    private final OrderService orderService;

    public UserOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order, @AuthenticationPrincipal UserDetails userDetails) {
        order.setEmail(userDetails.getUsername()); 
        return orderService.createOrder(order);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Order order = orderService.getOrderById(id);
        if (!order.getEmail().equals(userDetails.getUsername())) {
            throw new AccessDeniedException("You do not have permission to access this order");
        }
        return order;
    }

    @GetMapping
    public List<Order> getOrdersByUser(@AuthenticationPrincipal UserDetails userDetails) {
        return orderService.findByEmail(userDetails.getUsername());
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder, @AuthenticationPrincipal UserDetails userDetails) {
        Order existingOrder = orderService.getOrderById(id);
        if (!existingOrder.getEmail().equals(userDetails.getUsername())) {
            throw new AccessDeniedException("You do not have permission to update this order");
        }
        updatedOrder.setId(id); // Ensure the ID is set correctly
        return orderService.updateOrder(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Order order = orderService.getOrderById(id);
        if (!order.getEmail().equals(userDetails.getUsername())) {
            throw new AccessDeniedException("You do not have permission to delete this order");
        }
        orderService.deleteOrder(id);
    }
}
