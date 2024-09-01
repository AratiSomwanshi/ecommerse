import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../../api/productApi';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar'; 
const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            console.log('Fetched products:', data);
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts(); 
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (<> <AdminNavbar/>
        <Container  style={{
                    backgroundColor: '#e1f5fe', 
                    padding: '2rem', 
                    borderRadius: '8px', 
                }}>
            <Typography variant="h4" gutterBottom>
                Product Table
            </Typography>
            <Button component={Link} to="/products/new" variant="contained" color="primary" style={{ marginBottom: '16px' }}>
                Create New Product
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    <img src={product.imageUrl || 'default-image-url'} alt={product.productName} width={50} />
                                </TableCell>
                                <TableCell>
                                    <Button component={Link} to={`/products/edit/${product.id}`} variant="contained" color="primary" style={{ marginRight: '8px' }}>
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(product.id)} variant="contained" color="secondary">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container></>
    );
};

export default ProductTable;
