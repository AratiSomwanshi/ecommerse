package com.ecommerce.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ProductDto {
private Long id;
private String productName;


private String description;


private Double price;

private byte[]image;

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getProductName() {
	return productName;
}

public void setProductName(String productName) {
	this.productName = productName;
}

public String getDescription() {
	return description;
}

public void setDescription(String description) {
	this.description = description;
}

public Double getPrice() {
	return price;
}

public void setPrice(Double price) {
	this.price = price;
}

public byte[] getImage() {
	return image;
}

public void setImage(byte[] image) {
	this.image = image;
}
}
