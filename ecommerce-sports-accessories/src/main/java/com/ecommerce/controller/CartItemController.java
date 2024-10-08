package com.ecommerce.controller;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.User;
import com.ecommerce.response.ApiResponse;
import com.ecommerce.service.CartItemService;
import com.ecommerce.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/user/cart_items")
public class CartItemController {

    private final CartItemService cartItemService;
    private final UserService userService;

    public CartItemController(CartItemService cartItemService, UserService userService) {
        this.cartItemService = cartItemService;
        this.userService = userService;
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItemHandler(@PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt) throws CartItemException, UserException {
        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);
        ApiResponse response = new ApiResponse("Item Removed From Cart", true);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemHandler(@PathVariable Long cartItemId,
            @RequestBody CartItem cartItem, @RequestHeader("Authorization") String jwt)
            throws CartItemException, UserException {
        User user = userService.findUserProfileByJwt(jwt);
        CartItem updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
        return new ResponseEntity<>(updatedCartItem, HttpStatus.ACCEPTED);
    }
}
