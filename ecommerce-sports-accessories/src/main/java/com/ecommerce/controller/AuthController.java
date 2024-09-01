package com.ecommerce.controller;


import com.ecommerce.model.User;
import com.ecommerce.request.LoginRequest;
import com.ecommerce.request.RegisterRequest;
import com.ecommerce.service.UserService;
import com.ecommerce.util.JwtUtil;

import jakarta.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        logger.info("Registering user: {}", registerRequest.getUsername());
        
        User registeredUser = userService.registerUser(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                registerRequest.getRole(),
                registerRequest.getAddress(),
                passwordEncoder.encode(registerRequest.getPassword())
        );
        
        logger.info("User registered successfully: {}", registerRequest.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }


    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("User login attempt: {}", loginRequest.getUsername());
        
        User user = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            String token = jwtUtil.generateToken(user.getUsername());
            logger.info("Login successful for user: {}", loginRequest.getUsername());
            return ResponseEntity.ok(token);
        }
        
        logger.warn("Login failed for user: {}", loginRequest.getUsername());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
    @DeleteMapping("/logout")
    public ResponseEntity<String> logoutUser() {
       
        logger.info("User logged out successfully.");
        return ResponseEntity.ok("Logout successful. Please remove token from client.");
    }

}
