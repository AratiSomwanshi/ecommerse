import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={product.imageUrl || 'https://via.placeholder.com/150'}
                alt={product.productName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    ${product.price.toFixed(2)}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => onAddToCart(product.id, 1)} 
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
