package com.ecommerce.controller;

import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.model.Category;
import com.ecommerce.response.CategoryResponse;
import com.ecommerce.service.CategoryService;

import jakarta.validation.Valid;
import jakarta.validation.ConstraintViolationException;
@CrossOrigin
@Validated
@RestController
@RequestMapping("/api/admin/categories")
public class CategoryController {

    private final CategoryService categoryService;

   
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody Category category) {
        Category createdCategory = categoryService.addCategory(category.getCategoryName());
        String message = "Category '" + createdCategory.getCategoryName() + "' has been created successfully.";
        CategoryResponse response = new CategoryResponse(createdCategory, message); // Use createdCategory
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @Valid @RequestBody Category category) {
        System.out.println("Received category: " + category);
        category.setId(id);
        Category updatedCategory = categoryService.updateCategory(category);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleValidationException(ConstraintViolationException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
