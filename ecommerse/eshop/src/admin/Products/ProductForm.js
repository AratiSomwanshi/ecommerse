import React, { useState, useEffect } from 'react';
import { createOrUpdateProduct, getProductById } from '../../api/productApi';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar'; 

const ProductForm = () => {
    const [product, setProduct] = useState({
        productName: '',
        description: '',
        price: '',
        imageUrl: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchProductById(id);
        }
    }, [id]);

    const fetchProductById = async (productId) => {
        try {
            const data = await getProductById(productId);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createOrUpdateProduct(product);
            navigate('/products');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <>
            <AdminNavbar />
            <Container
                style={{
                    backgroundColor: '#e1f5fe', 
                    padding: '2rem', 
                    borderRadius: '8px', 
                }}
            >
                <Typography variant="h4" gutterBottom>
                    {id ? 'Edit Product' : 'Create Product'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Product Name"
                        name="productName"
                        variant="outlined"
                        fullWidth
                        value={product.productName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        variant="outlined"
                        fullWidth
                        value={product.description}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={product.price}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        variant="outlined"
                        fullWidth
                        value={product.imageUrl}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '2rem' }}>
                        {id ? 'Update Product' : 'Create Product'}
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default ProductForm;
