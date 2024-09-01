import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { updateCategory, getCategoryById, getAllCategories } from '../../api/apiCalls';
import AdminNavbar from '../AdminNavbar'; 
const UpdateCategoryForm = () => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response); 
            } catch (error) {
                setError('Failed to fetch categories.');
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
       
        const fetchCategory = async () => {
            if (selectedCategoryId) {
                try {
                    const response = await getCategoryById(selectedCategoryId);
                    setCategoryName(response.categoryName || '');
                    setError('');
                } catch (error) {
                    setError('Failed to fetch category.');
                }
            }
        };
        fetchCategory();
    }, [selectedCategoryId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateCategory(selectedCategoryId, { categoryName });
            setSuccessMessage('Category updated successfully!');
            setError(''); 
        } catch (error) {
            setError('Failed to update category.');
            setSuccessMessage('');
        }
    };

    return (
        <>
        <AdminNavbar/>
        
        
        <Container  style={{
                    backgroundColor: '#e1f5fe', 
                    padding: '2rem', 
                    borderRadius: '8px', 
                }}>
            <Typography variant="h4" gutterBottom>Update Category</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-select-label">Select Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.categoryName} (ID: {category.id})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Category Name"
                    variant="outlined"
                    fullWidth
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    margin="normal"
                    required
                />
                {error && <Typography color="error">{error}</Typography>}
                {successMessage && <Typography color="success">{successMessage}</Typography>}
                <Button type="submit" variant="contained" color="primary">
                    Update Category
                </Button>
            </form>
        </Container>
        </>
    );
};

export default UpdateCategoryForm;
