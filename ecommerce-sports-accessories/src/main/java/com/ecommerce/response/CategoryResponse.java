package com.ecommerce.response;

import com.ecommerce.model.Category;

public class CategoryResponse {
    private Category category;
    private String message;

    public CategoryResponse(Category category, String message) {
        this.category = category;
        this.message = message;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
