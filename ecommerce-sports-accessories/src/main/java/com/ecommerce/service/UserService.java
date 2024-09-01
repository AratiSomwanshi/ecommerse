package com.ecommerce.service;

import com.ecommerce.enums.Role;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.exception.UserNotFoundException;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.util.JwtUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.logging.Logger;

@Service
public class UserService {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    private static final Logger logger = Logger.getLogger(UserService.class.getName());

    @Transactional
    public User registerUser(String username, String email, Role role, String address, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setRole(role);
        user.setAddress(address);
        user.setPassword(passwordEncoder.encode(password)); // Ensure password is encoded
        return userRepository.save(user);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
    }

    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null; 
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
    }

    @Transactional
    public User updateUser(User user) {
        userRepository.findById(user.getId())
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + user.getId()));
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        userRepository.deleteById(userId);
    }

    @Value("${jwt.secret}")
    private String secretKey;

    @Transactional
    public User findUserProfileByJwt(String jwt) throws UnauthorizedException {
        try {
            // Use JwtUtil to extract claims from the JWT
            Claims claims = jwtUtil.extractClaims(jwt);

            // Extract username from the 'sub' (subject) claim
            String username = claims.getSubject();
            if (username == null) {
                throw new UnauthorizedException("Invalid token: Subject is null");
            }

            return userRepository.findByUsername(username)
                                 .orElseThrow(() -> new UnauthorizedException("User not found"));
        } catch (JwtException e) {
            throw new UnauthorizedException("Invalid token: " + e.getMessage());
        }
    }

    public void validateUser(String jwt, String username) throws UnauthorizedException {
        User user = findUserProfileByJwt(jwt);
        if (!user.getUsername().equals(username)) {
            throw new UnauthorizedException("User is not authorized to perform this action");
        }
    }

    @Transactional
    public List<User> findAllUsers() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getRole() == null) {
                logger.warning("User with ID " + user.getId() + " has a null role.");
            }
        }
        return users;
    }

}
