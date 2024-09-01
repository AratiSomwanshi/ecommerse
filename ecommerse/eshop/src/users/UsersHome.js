import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard'; 
import { getAllProducts } from '../api/userproductApi'; 
import Grid from '@mui/material/Grid';
import Navbars from './Navbars'; 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { addItemToCart, getCart } from '../api/cartApi'; // Import API methods

const UsersHome = ({ userId, token }) => {
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Fetch cart count whenever userId changes
    useEffect(() => {
        if (userId) {
            const fetchCartCount = async () => {
                try {
                    const cart = await getCart(userId);
                    const count = cart.items.reduce((total, item) => total + item.quantity, 0);
                    setCartCount(count);
                } catch (error) {
                    console.error('Error fetching cart count:', error);
                }
            };

            fetchCartCount();
        }
    }, [userId]);

    const handleAddToCart = async (productId, quantity) => {
        try {
            await addItemToCart(userId, productId, quantity);
            // Update the cart count after adding item
            const cart = await getCart(userId);
            const count = cart.items.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
            setSnackbarMessage('Item added to cart!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setSnackbarMessage('Failed to add item to cart.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <div>
            <Navbars cartCount={cartCount} />
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <ProductCard 
                            product={product} 
                            onAddToCart={handleAddToCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default UsersHome;
