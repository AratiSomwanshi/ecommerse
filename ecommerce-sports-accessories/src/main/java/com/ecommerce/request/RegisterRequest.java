package com.ecommerce.request;

import com.ecommerce.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

//import com.ecommerce.enums.Role;
//
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotNull;
//
//public class RegisterRequest {
//    @NotNull(message = "Username is required")
//    private String username;
//
//    @NotNull(message = "Password is required")
//    private String password;
//
//    @NotNull(message = "Email is required")
//    @Email(message = "Invalid email format")
//    private String email;
//
//    @NotNull(message = "Address is required")
//    private String address;
//
//    @NotNull(message = "Role is required")
//    private Role role;
//
//    // Getters and Setters
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public Role getRole() {
//        return role;
//    }
//
//    public void setRole(Role role) {
//        this.role = role;
//    }
//}
//
//
public class RegisterRequest{
@NotNull(message = "Username is required")
private String username;

@NotNull(message = "Password is required")
private String password;

@NotNull(message = "Email is required")
@Email(message = "Invalid email format")
private String email;

@NotNull(message = "Address is required")
private String address;

@NotNull(message = "Role is required")
private Role role;

// Getters and Setters
public String getUsername() {
    return username;
}

public void setUsername(String username) {
    this.username = username;
}

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getAddress() {
    return address;
}

public void setAddress(String address) {
    this.address = address;
}

public Role getRole() {
    return role;
}

public void setRole(Role role) {
    this.role = role;
}
}