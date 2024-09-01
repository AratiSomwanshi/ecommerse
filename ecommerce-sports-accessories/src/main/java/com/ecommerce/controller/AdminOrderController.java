package com.ecommerce.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.ecommerce.model.Order;
import com.ecommerce.service.OrderService;
@CrossOrigin
@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order order) {
        order.setId(id);
        return orderService.updateOrder(order);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }

    @PutMapping("/{id}/confirm")
    @PreAuthorize("hasRole('ADMIN')")
    public Order confirmOrder(@PathVariable Long id) {
        return orderService.confirmOrder(id);
    }

    @PutMapping("/{id}/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public Order markOrderAsPending(@PathVariable Long id) {
        return orderService.markOrderAsPending(id);
    }

    @PutMapping("/{id}/shipped")
    @PreAuthorize("hasRole('ADMIN')")
    public Order markOrderAsShipped(@PathVariable Long id) {
        return orderService.markOrderAsShipped(id);
    }

    @PutMapping("/{id}/delivered")
    @PreAuthorize("hasRole('ADMIN')")
    public Order markOrderAsDelivered(@PathVariable Long id) {
        return orderService.markOrderAsDelivered(id);
    }

    @PutMapping("/{id}/cancelled")
    @PreAuthorize("hasRole('ADMIN')")
    public Order markOrderAsCancelled(@PathVariable Long id) {
        return orderService.markOrderAsCancelled(id);
    }
}