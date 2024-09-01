import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardActions, TextField, Grid } from '@mui/material';
import { getCart, addItemToCart, updateCartItem, removeItemFromCart, clearCart } from '../api/cartApi';

const Cart = ({ userId }) => {
    const [cart, setCart] = useState(null);
    const [quantity, setQuantity] = useState({});

    useEffect(() => {
        // Fetch the cart when the component mounts
        const fetchCart = async () => {
            try {
                const data = await getCart(userId);
                setCart(data);
                const initialQuantity = data.items.reduce((acc, item) => {
                    acc[item.id] = item.quantity;
                    return acc;
                }, {});
                setQuantity(initialQuantity);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            }
        };
        fetchCart();
    }, [userId]);

    const handleAddItem = async (productId, quantity) => {
        try {
            const updatedCart = await addItemToCart(userId, productId, quantity);
            setCart(updatedCart);
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    const handleUpdateItem = async (cartItemId) => {
        try {
            const updatedCart = await updateCartItem(userId, cartItemId, quantity[cartItemId]);
            setCart(updatedCart);
        } catch (error) {
            console.error('Failed to update cart item:', error);
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            const updatedCart = await removeItemFromCart(userId, cartItemId);
            setCart(updatedCart);
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

    const handleClearCart = async () => {
        try {
            const clearedCart = await clearCart(userId);
            setCart(clearedCart);
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    const handleBuyNow = () => {
        // Implement the logic for buying the cart items
        alert('Buy Now feature is not implemented yet.');
    };

    if (!cart) return <Typography>Loading...</Typography>;

    return (
        <Container  style={{
            backgroundColor: '#e1f5fe', 
            padding: '2rem', 
            borderRadius: '8px', 
        }}>
            <Typography variant="h4" gutterBottom>Your Cart</Typography>
            <Grid container spacing={3}>
                {cart.items.length === 0 ? (
                    <Typography>Your cart is empty.</Typography>
                ) : (
                    cart.items.map(item => (
                        <Grid item xs={12} md={6} key={item.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{item.product.name}</Typography>
                                    <Typography>Price: ${item.product.price}</Typography>
                                    <Typography>Total: ${item.product.price * (quantity[item.id] || item.quantity)}</Typography>
                                    <Typography>Quantity:
                                        <TextField
                                            type="number"
                                            value={quantity[item.id] || item.quantity}
                                            onChange={(e) => {
                                                const newQuantity = Math.max(1, Number(e.target.value));
                                                setQuantity({ ...quantity, [item.id]: newQuantity });
                                                handleUpdateItem(item.id); // Optionally update immediately or add a button for this
                                            }}
                                            InputProps={{ inputProps: { min: 1 } }}
                                        />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" onClick={() => handleUpdateItem(item.id)}>
                                        Update Quantity
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.id)}>
                                        Remove Item
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
            <Button variant="contained" color="error" onClick={handleClearCart} style={{ marginTop: '20px' }}>
                Clear Cart
            </Button>
            <Button variant="contained" color="success" onClick={handleBuyNow} style={{ marginTop: '20px' }}>
                Buy Now
            </Button>
        </Container>
    );
};

export default Cart;
